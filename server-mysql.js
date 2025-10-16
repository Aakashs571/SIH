const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

async function createPool() {
  const pool = await mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DB || 'sih',
    connectionLimit: 10
  });
  return pool;
}

let poolPromise = createPool();

// Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    const pool = await poolPromise;
    const [rows] = await pool.query('SELECT id FROM customers WHERE email = ?', [email.toLowerCase()]);
    if (rows.length) return res.status(409).json({ error: 'account exists' });
    const [r] = await pool.query('INSERT INTO customers (email, password, first_name, last_name, phone) VALUES (?,?,?,?,?)', [email.toLowerCase(), password, firstName || '', lastName || '', phone || '']);
    res.json({ id: r.insertId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const pool = await poolPromise;
    const [rows] = await pool.query('SELECT id, email, first_name, last_name, phone FROM customers WHERE email = ? AND password = ?', [email.toLowerCase(), password]);
    if (!rows.length) return res.status(401).json({ error: 'invalid credentials' });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { bookingId, email, firstName, lastName, phone, packageName, pricePerPerson, guests, extrasTotal, total, paymentMethod, requirements, checkIn, checkOut, addons, password } = req.body;
    const pool = await poolPromise;
    const [custRows] = await pool.query('SELECT id, password FROM customers WHERE email = ?', [email.toLowerCase()]);
    let customerId;
    if (!custRows.length) {
      if (!password) return res.status(400).json({ error: 'password required for new customer' });
      const [r] = await pool.query('INSERT INTO customers (email, password, first_name, last_name, phone) VALUES (?,?,?,?,?)', [email.toLowerCase(), password, firstName || '', lastName || '', phone || '']);
      customerId = r.insertId;
    } else {
      customerId = custRows[0].id;
    }
    const [br] = await pool.query(`INSERT INTO bookings (booking_id, customer_id, package_name, price_per_person, guests, extras_total, total, payment_method, requirements, check_in, check_out)
                                   VALUES (?,?,?,?,?,?,?,?,?,?,?)`, [bookingId, customerId, packageName, pricePerPerson, guests, extrasTotal, total, paymentMethod, requirements || '', checkIn || null, checkOut || null]);
    const bookingRowId = br.insertId;
    if (Array.isArray(addons)) {
      for (const a of addons) {
        if (!a || !a.name) continue;
        await pool.query('INSERT INTO booking_addons (booking_id, name, price) VALUES (?,?,?)', [bookingRowId, a.name, a.price || 0]);
      }
    }
    res.json({ id: bookingRowId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const { email } = req.query;
    const pool = await poolPromise;
    const [rows] = await pool.query(`SELECT b.*, c.email FROM bookings b JOIN customers c ON c.id=b.customer_id WHERE c.email = ? ORDER BY b.id DESC`, [email.toLowerCase()]);
    for (const r of rows) {
      const [addons] = await pool.query('SELECT name, price FROM booking_addons WHERE booking_id = ?', [r.id]);
      r.addons = addons;
    }
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const { email, name, location, rating, text } = req.body;
    const pool = await poolPromise;
    let customerId = null;
    if (email) {
      const [r] = await pool.query('SELECT id FROM customers WHERE email = ?', [email.toLowerCase()]);
      if (r.length) customerId = r[0].id;
    }
    const [ins] = await pool.query('INSERT INTO reviews (customer_id, name, location, rating, text) VALUES (?,?,?,?,?)', [customerId, name || '', location || '', rating || 5, text]);
    res.json({ id: ins.insertId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/reviews', async (_req, res) => {
  try {
    const pool = await poolPromise;
    const [rows] = await pool.query('SELECT id, name, location, rating, text, created_at FROM reviews ORDER BY id DESC');
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`MySQL API running on http://localhost:${PORT}`);
});


