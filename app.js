// Destinations Data
	const DEFAULT_IMG = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&auto=format&fit=crop&q=80';
// Backend API base URL
	const API_BASE = 'http://localhost:4000';

	const destinations = [
	{
		name: "Betla National Park",
		desc: "Experience diverse wildlife in pristine forests",
		price: "₹3,500",
		tags: ["🦌 Wildlife", "🌲 Eco-Tourism"],
		category: "eco",
		image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop&q=80"
	},
	{
		name: "Hundru Falls",
		desc: "Marvel at the 98m cascade of natural beauty",
		price: "₹2,000",
		tags: ["💧 Waterfall", "📸 Photography"],
		category: "waterfall",
		image: "https://images.unsplash.com/photo-1504198266285-165a9f24db58?w=1200&auto=format&fit=crop&q=80"
	},
	{
		name: "Tribal Heritage Villages",
		desc: "Immerse in rich cultural traditions and art",
		price: "₹4,000",
		tags: ["🎨 Culture", "🏛️ Heritage"],
		category: "cultural",
		image: "https://images.unsplash.com/photo-1544739313-108b2f69f64b?w=1200&auto=format&fit=crop&q=80"
	},
	{
		name: "Dassam Falls",
		desc: "Discover hidden gems in lush green valleys",
		price: "₹2,500",
		tags: ["🏞️ Nature", "🥾 Trekking"],
		category: "adventure",
		image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&auto=format&fit=crop&q=80"
	},
	{
		name: "Baidyanath Dham",
		desc: "Sacred pilgrimage and spiritual heritage",
		price: "₹1,500",
		tags: ["🕉️ Spiritual", "🛕 Temple"],
		category: "spiritual",
		image: "https://images.unsplash.com/photo-1592329427206-f28ff2e2ca4e?w=1200&auto=format&fit=crop&q=80"
	},
	{
		name: "Netarhat Hill Station",
		desc: "Queen of Chotanagpur - Sunrise & Sunset views",
		price: "₹3,000",
		tags: ["⛰️ Hills", "🌅 Scenic"],
		category: "eco",
		image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80"
	},
	{
		name: "Jonha Falls",
		desc: "Serene waterfall with mythological significance",
		price: "₹1,800",
		tags: ["💧 Waterfall", "🏞️ Nature"],
		category: "waterfall",
		image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop&q=80"
	},
	{
		name: "Parasnath Hills",
		desc: "Jain pilgrimage site with stunning views",
		price: "₹2,800",
		tags: ["⛰️ Trekking", "🕉️ Spiritual"],
		category: "adventure",
		image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&auto=format&fit=crop&q=80"
	},
	{
		name: "Tagore Hill",
		desc: "Peaceful retreat in Ranchi with panoramic views",
		price: "₹1,200",
		tags: ["🏞️ Nature", "📸 Photography"],
		category: "eco",
		image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&auto=format&fit=crop&q=80"
	}
];

// Initialize destinations
function loadDestinations(filter = 'all') {
	const grid = document.getElementById('destinationsGrid');
	grid.innerHTML = '';
	
	const filtered = filter === 'all' ? destinations : destinations.filter(d => d.category === filter);
	
filtered.forEach(dest => {
		const card = document.createElement('div');
		card.className = 'destination-card';
		card.innerHTML = `
			<img src="${dest.image}" alt="${dest.name}" class="card-bg">
			<div class="card-content">
				<h3 class="card-title">${dest.name}</h3>
				<p class="card-desc">${dest.desc}</p>
				<div class="card-tags">
					${dest.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
				</div>
				<div class="card-price">${dest.price} per person</div>
				<button class="book-now-btn" onclick="openBooking('${dest.name}', '${dest.price}')">Book Now</button>
			</div>
		`;
		grid.appendChild(card);
		const img = card.querySelector('img');
		if (img) {
			img.addEventListener('error', () => {
				img.src = DEFAULT_IMG;
			});
		}
	});
}

// Page navigation
function navigateTo(pageName) {
	// Hide all pages
	document.querySelectorAll('.page').forEach(page => {
		page.classList.remove('active');
	});
	
	// Show selected page
	const targetPage = document.getElementById(pageName + 'Page');
	if (targetPage) {
		targetPage.classList.add('active');
		window.scrollTo({top: 0, behavior: 'smooth'});
	}
	
	// Update nav active state
	document.querySelectorAll('.nav-link').forEach(link => {
		link.classList.remove('active');
		if (link.dataset.page === pageName) {
			link.classList.add('active');
		}
	});
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
	loadDestinations();
	
	// Auth helpers
	function getCurrentUser() {
		try { return JSON.parse(localStorage.getItem('currentUser') || 'null'); } catch (_) { return null; }
	}
	function setCurrentUser(user) { localStorage.setItem('currentUser', JSON.stringify(user)); }
	function clearCurrentUser() { localStorage.removeItem('currentUser'); }
	function requireAuthFor(page) {
		const user = getCurrentUser();
		if (!user && page === 'profile') {
			navigateTo('login');
			return false;
		}
		return true;
	}
	
	// Set today's date as minimum for date inputs
	const today = new Date().toISOString().split('T')[0];
	document.querySelectorAll('input[type="date"]').forEach(input => {
		input.min = today;
	});
	
	// Navigation
	document.querySelectorAll('.nav-link').forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const page = link.dataset.page;
			if (!requireAuthFor(page)) return;
			navigateTo(page);
		});
	});
	
	document.querySelector('.logo').addEventListener('click', () => {
		navigateTo('home');
	});
	
	// Footer navigation
	document.querySelectorAll('.footer-section li[data-page]').forEach(item => {
		item.addEventListener('click', () => {
			const page = item.dataset.page;
			if (!requireAuthFor(page)) return;
			navigateTo(page);
		});
	});
	
	// Filter buttons
	document.querySelectorAll('.filter-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
			btn.classList.add('active');
			loadDestinations(btn.dataset.filter);
		});
	});
	
	// Package buttons
	document.querySelectorAll('.package-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			const pkgName = btn.dataset.package;
			const price = btn.dataset.price;
			openBooking(pkgName, price);
		});
	});

	// Service cards click -> open booking with corresponding addon preselected
	document.querySelectorAll('#servicesPage .service-card').forEach(card => {
		card.addEventListener('click', () => {
			document.getElementById('bookingModal').classList.add('active');
			// Map title to addon
			const title = card.querySelector('.service-title')?.textContent?.trim();
			// clear previous
			document.querySelectorAll('.addon-input').forEach(cb => { cb.checked = false; });
			if (title) {
				document.querySelectorAll('.addon-input').forEach(cb => {
					if (cb.dataset.name === title) cb.checked = true;
				});
			}
			// update summary after selection
			updateSummary();
		});
	});
	
	// Main book button
	document.getElementById('mainBookBtn').addEventListener('click', () => {
		document.getElementById('bookingModal').classList.add('active');
	});
	
	// Close modal
	document.getElementById('closeModal').addEventListener('click', () => {
		document.getElementById('bookingModal').classList.remove('active');
	});
	
	// Close modal on outside click
	document.getElementById('bookingModal').addEventListener('click', (e) => {
		if (e.target.id === 'bookingModal') {
			document.getElementById('bookingModal').classList.remove('active');
		}
	});
	
	// Payment tabs handling
	let paymentMethod = 'pay_resort';
	const paymentTabs = document.getElementById('paymentTabs');
	const paymentPanelOnline = document.getElementById('paymentPanelOnline');
	const paymentPanelUpi = document.getElementById('paymentPanelUpi');
	function setPaymentMethod(method) {
		paymentMethod = method;
		document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));
		const active = document.querySelector(`.payment-tab[data-method="${method}"]`);
		if (active) active.classList.add('active');
		if (paymentPanelOnline) paymentPanelOnline.style.display = method === 'online' ? 'block' : 'none';
		if (paymentPanelUpi) paymentPanelUpi.style.display = method === 'upi' ? 'block' : 'none';
		updateSummary();
	}
	if (paymentTabs) {
		paymentTabs.addEventListener('click', (e) => {
			const btn = e.target.closest('.payment-tab');
			if (!btn) return;
			setPaymentMethod(btn.dataset.method);
		});
	}
	
	// Profile bookings helpers (kept for compatibility where needed)
	function getBookings() {
		try {
			return JSON.parse(localStorage.getItem('bookings') || '[]');
		} catch (_) {
			return [];
		}
	}

	function setBookings(bookings) {
		localStorage.setItem('bookings', JSON.stringify(bookings));
	}

	// Customers helpers (local fallback)
	function getCustomers() {
		try {
			return JSON.parse(localStorage.getItem('customers') || '[]');
		} catch (_) {
			return [];
		}
	}

	function setCustomers(customers) {
		localStorage.setItem('customers', JSON.stringify(customers));
	}

	function refreshCustomerSelect() {
		const sel = document.getElementById('customerSelect');
		if (!sel) return;
		const customers = getCustomers();
		// reset options
		sel.innerHTML = '<option value="">New Customer</option>' + customers.map((c, idx) => `<option value="${idx}">${c.firstName} ${c.lastName} - ${c.email}</option>`).join('');
	}

	async function renderBookings() {
		const current = getCurrentUser();
		const listEl = document.getElementById('bookingsList');
		const emptyEl = document.getElementById('noBookings');
		if (!listEl || !emptyEl) return;

		listEl.innerHTML = '';
		if (!current) { emptyEl.style.display = 'block'; return; }
		try {
			const res = await fetch(`${API_BASE}/api/bookings?email=${encodeURIComponent(current.email)}`);
			const bookings = await res.json();
			if (!bookings.length) { emptyEl.style.display = 'block'; return; }
			emptyEl.style.display = 'none';
			bookings.forEach(b => {
				const card = document.createElement('div');
				card.className = 'booking-card';
				card.innerHTML = `
					<h4>${b.package_name || b.packageName}</h4>
					<div class="booking-meta">Booking ID: ${b.booking_id || b.bookingId}</div>
					<div class="booking-meta">Guest: ${current.firstName || ''} ${current.lastName || ''} (${current.email})</div>
					<div class="booking-meta">Dates: ${b.check_in || ''} → ${b.check_out || ''}</div>
					<div class="booking-meta">Guests: ${b.guests}</div>
					<div class="booking-meta">Payment: ${b.payment_method === 'online' ? 'Online Card' : (b.payment_method === 'upi' ? 'UPI' : 'Pay at Resort')}</div>
					<div class="booking-meta">Add-ons: ${(b.addons && b.addons.length) ? b.addons.map(a => a.name + ' (₹' + Number(a.price).toLocaleString() + ')').join(', ') : 'None'}</div>
					<div class="booking-meta">Extras Total: ₹${Number(b.extras_total || 0).toLocaleString()}</div>
					<div class="booking-total">Total Paid: ₹${Number(b.total).toLocaleString()}</div>
				`;
				listEl.appendChild(card);
			});
		} catch (e) {
			emptyEl.style.display = 'block';
		}
	}

	// Reviews helpers
	async function getReviews() {
		try {
			const res = await fetch(`${API_BASE}/api/reviews`);
			return await res.json();
		} catch (_) {
			return [];
		}
	}

	async function setReview(review) {
		await fetch(`${API_BASE}/api/reviews`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(review)
		});
	}

	async function renderReviews() {
		const container = document.getElementById('userReviews');
		if (!container) return;
		const reviews = await getReviews();
		container.innerHTML = '';
		reviews.forEach(r => {
			const div = document.createElement('div');
			div.className = 'testimonial';
			const stars = '⭐⭐⭐⭐⭐'.slice(0, r.rating);
			div.innerHTML = `
				<div class="stars">${stars}</div>
				<div class="testimonial-text">"${r.text}"</div>
				<div class="testimonial-author">${r.name}</div>
				<div class="testimonial-location">${r.location}</div>
			`;
			container.appendChild(div);
		});
	}

	// Booking submission -> backend
	document.getElementById('bookingForm').addEventListener('submit', async (e) => {
		e.preventDefault();
		const email = document.getElementById('email').value.trim();
		const passwordInput = document.getElementById('bookingPassword').value;
		const firstName = document.getElementById('firstName').value.trim();
		const lastName = document.getElementById('lastName').value.trim();
		const phone = document.getElementById('phone').value.trim();
		const checkIn = document.getElementById('checkIn').value;
		const checkOut = document.getElementById('checkOut').value;
		const guests = parseInt(document.getElementById('bookingGuests').value) || 1;
		const packageSelect = document.getElementById('packageSelect');
		const packageValue = parseInt(packageSelect.value) || 0;
		const packageName = packageSelect.options[packageSelect.selectedIndex]?.text?.split(' - ')[0] || '-';
		const requirements = document.getElementById('requirements').value.trim();
		// payment method from tabs validation (card/upI) kept as-is
		if (paymentMethod === 'online') {
			const num = document.getElementById('cardNumber').value.replace(/\s+/g,'');
			const nameOnCard = document.getElementById('cardName').value.trim();
			const exp = document.getElementById('cardExpiry').value.trim();
			const cvv = document.getElementById('cardCvv').value.trim();
			if (!(num && num.length >= 12 && nameOnCard && /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp) && cvv.length >= 3)) {
				alert('Please enter valid card details.');
				return;
			}
		}
		if (paymentMethod === 'upi') {
			const upiId = document.getElementById('upiId').value.trim();
			if (!/^[\w\.\-]+@[\w\-]+$/.test(upiId)) {
				alert('Please enter a valid UPI ID (e.g., name@bank).');
				return;
			}
		}
		const addons = Array.from(document.querySelectorAll('.addon-input:checked')).map(cb => ({ name: cb.dataset.name, price: parseInt(cb.dataset.price) || 0 }));
		const extrasTotal = addons.reduce((sum, a) => sum + a.price, 0);
		const total = packageValue * guests + extrasTotal;
		const bookingId = 'JH' + Math.random().toString(36).substr(2, 9).toUpperCase();
		try {
			const res = await fetch(`${API_BASE}/api/bookings`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					bookingId,
					email,
					password: passwordInput,
					firstName,
					lastName,
					phone,
					packageName,
					pricePerPerson: packageValue,
					guests,
					extrasTotal,
					total,
					paymentMethod,
					requirements,
					checkIn,
					checkOut,
					addons
				})
			});
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				alert('Booking failed: ' + (err.error || res.statusText));
				return;
			}
			setCurrentUser({ email, firstName, lastName, phone });
			alert('🎉 Booking Confirmed!\n\nBooking ID: ' + bookingId);
			document.getElementById('bookingModal').classList.remove('active');
			document.getElementById('bookingForm').reset();
			navigateTo('profile');
			renderBookings();
		} catch (_) {
			alert('Booking failed. Please try again.');
		}
	});
	
	// Update booking summary
	const guestsInput = document.getElementById('bookingGuests');
	const packageSelect = document.getElementById('packageSelect');
	const addonsInputs = Array.from(document.querySelectorAll('.addon-input'));
	
	function updateSummary() {
		const guests = parseInt(guestsInput.value) || 2;
		const price = parseInt(packageSelect.value) || 0;
		const packageText = packageSelect.options[packageSelect.selectedIndex].text;
		
		document.getElementById('summaryGuests').textContent = guests;
		document.getElementById('summaryPrice').textContent = '₹' + price.toLocaleString();
		document.getElementById('summaryPackage').textContent = packageText.split(' - ')[0] || '-';
		const extras = addonsInputs.filter(i => i.checked).map(i => ({ name: i.dataset.name, price: parseInt(i.dataset.price) || 0 }));
		const extrasTotal = extras.reduce((s, a) => s + a.price, 0);
		document.getElementById('summaryExtras').textContent = '₹' + extrasTotal.toLocaleString();
		document.getElementById('summaryAddons').textContent = extras.length ? extras.map(e => e.name).join(', ') : 'None';
		document.getElementById('summaryTotal').textContent = '₹' + (price * guests + extrasTotal).toLocaleString();
		let paymentText = 'Pay at Resort';
		if (paymentMethod === 'online') paymentText = 'Online Card';
		if (paymentMethod === 'upi') paymentText = 'UPI';
		document.getElementById('summaryPayment').textContent = paymentText;
	}
	
	if (guestsInput && packageSelect) {
		guestsInput.addEventListener('input', updateSummary);
		packageSelect.addEventListener('change', updateSummary);
		addonsInputs.forEach(i => i.addEventListener('change', updateSummary));
	}

	// Prefill customer fields (local fallback)
	const customerSelect = document.getElementById('customerSelect');
	if (customerSelect) {
		refreshCustomerSelect();
		customerSelect.addEventListener('change', () => {
			const idx = customerSelect.value;
			if (idx === '') {
				// clear
				document.getElementById('firstName').value = '';
				document.getElementById('lastName').value = '';
				document.getElementById('email').value = '';
				document.getElementById('phone').value = '';
				return;
			}
			const customers = getCustomers();
			const c = customers[Number(idx)];
			if (c) {
				document.getElementById('firstName').value = c.firstName || '';
				document.getElementById('lastName').value = c.lastName || '';
				document.getElementById('email').value = c.email || '';
				document.getElementById('phone').value = c.phone || '';
			}
		});
	}
	
	// Render bookings when visiting profile
	document.querySelectorAll('.nav-link').forEach(link => {
		link.addEventListener('click', () => {
			if (link.dataset.page === 'profile') {
				renderBookings();
			}
		});
	});

	// Also render if footer link used
	document.querySelectorAll('.footer-section li[data-page]').forEach(item => {
		item.addEventListener('click', () => {
			if (item.dataset.page === 'profile') {
				renderBookings();
			} else if (item.dataset.page === 'reviews') {
				renderReviews();
			}
		});
	});

	// Reviews form submit -> backend
	const reviewForm = document.getElementById('reviewForm');
	if (reviewForm) {
		reviewForm.addEventListener('submit', async (e) => {
			e.preventDefault();
			const current = getCurrentUser();
			if (!current) { alert('Please login to submit a review.'); navigateTo('login'); return; }
			const name = (document.getElementById('reviewName').value.trim()) || `${current.firstName || ''} ${current.lastName || ''}`.trim() || current.email;
			const location = document.getElementById('reviewLocation').value.trim();
			const rating = parseInt(document.getElementById('reviewRating').value) || 5;
			const text = document.getElementById('reviewText').value.trim();
			if (!text) { alert('Please write a review.'); return; }
			try {
				await setReview({ email: current.email, name, location, rating, text });
				await renderReviews();
				reviewForm.reset();
				alert('Thank you! Your review has been submitted.');
			} catch (_) {
				alert('Could not submit review, please try again.');
			}
		});
	}

	// Render reviews when visiting reviews
	document.querySelectorAll('.nav-link').forEach(link => {
		link.addEventListener('click', () => {
			if (link.dataset.page === 'reviews') {
				renderReviews();
			}
		});
	});

	// Scroll to top
	document.getElementById('scrollTop').addEventListener('click', () => {
		window.scrollTo({top: 0, behavior: 'smooth'});
	});
	
	// Navbar scroll effect
	window.addEventListener('scroll', () => {
		const nav = document.getElementById('navbar');
		if (window.scrollY > 50) {
			nav.classList.add('scrolled');
		} else {
			nav.classList.remove('scrolled');
		}
	});
	
	// Search tours
	document.getElementById('searchToursBtn').addEventListener('click', () => {
		navigateTo('destinations');
	});

	// Login / Signup -> backend
	const loginForm = document.getElementById('loginForm');
	const signupBtn = document.getElementById('signupBtn');
	if (loginForm) {
		loginForm.addEventListener('submit', async (e) => {
			e.preventDefault();
			const email = document.getElementById('loginEmail').value.trim().toLowerCase();
			const password = document.getElementById('loginPassword').value;
			try {
				const res = await fetch(`${API_BASE}/api/auth/login`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password })
				});
				if (!res.ok) { alert('Invalid email or password.'); return; }
				const user = await res.json();
				setCurrentUser({ email: user.email, firstName: user.first_name, lastName: user.last_name, phone: user.phone });
				alert('Logged in successfully.');
				navigateTo('profile');
				renderBookings();
			} catch (_) {
				alert('Login failed.');
			}
		});
	}
	if (signupBtn) {
		signupBtn.addEventListener('click', async () => {
			const email = document.getElementById('loginEmail').value.trim().toLowerCase();
			const password = document.getElementById('loginPassword').value;
			if (!email || !password || password.length < 6) { alert('Enter a valid email and a password (min 6 chars).'); return; }
			try {
				const res = await fetch(`${API_BASE}/api/auth/signup`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password })
				});
				if (!res.ok) {
					const err = await res.json().catch(() => ({}));
					alert(err.error || 'Signup failed');
					return;
				}
				setCurrentUser({ email, firstName: '', lastName: '', phone: '' });
				alert('Account created. You are now logged in.');
				navigateTo('profile');
				renderBookings();
			} catch (_) {
				alert('Signup failed.');
			}
		});
	}

	// Logout
	const logoutBtn = document.getElementById('logoutBtn');
	if (logoutBtn) {
		logoutBtn.addEventListener('click', () => {
			clearCurrentUser();
			alert('Logged out.');
			navigateTo('home');
		});
	}

	// Ensure logout on reload
	window.addEventListener('DOMContentLoaded', function() {
		// Remove login flag/token
		localStorage.removeItem('isLoggedIn');
		// Optionally, hide profile page if visible
		var profilePage = document.getElementById('profilePage');
		if (profilePage) profilePage.classList.remove('active');
	});
});

// Open booking with pre-filled data
function openBooking(name, price) {
	document.getElementById('bookingModal').classList.add('active');
	document.getElementById('summaryPackage').textContent = name;
	const priceNum = parseInt(price.replace(/[₹,]/g, ''));
	document.getElementById('summaryPrice').textContent = price;
	
	// Find matching package option
	const select = document.getElementById('packageSelect');
	for (let i = 0; i < select.options.length; i++) {
		if (select.options[i].value == priceNum) {
			select.selectedIndex = i;
			break;
		}
	}
	
	const guests = parseInt(document.getElementById('bookingGuests').value || '2') || 2;
	document.getElementById('summaryTotal').textContent = '₹' + (priceNum * guests).toLocaleString();
	// reflect current tab-based payment method
	let paymentText = 'Pay at Resort';
	if (typeof paymentMethod !== 'undefined') {
		if (paymentMethod === 'online') paymentText = 'Online Card';
		if (paymentMethod === 'upi') paymentText = 'UPI';
	}
	document.getElementById('summaryPayment').textContent = paymentText;
}

// === ADVANCED FEATURES ===

// --- AI Itinerary Planner Modal ---
const itineraryModal = document.getElementById('itineraryModal');
const closeItineraryModal = document.getElementById('closeItineraryModal');
const itineraryForm = document.getElementById('itineraryForm');
const itineraryResult = document.getElementById('itineraryResult');

// Open modal (add a floating button or trigger as needed)
// Example: document.getElementById('mainBookBtn').addEventListener('dblclick', () => itineraryModal.classList.add('active'));
closeItineraryModal.addEventListener('click', () => itineraryModal.classList.remove('active'));
itineraryModal.addEventListener('click', e => { if (e.target.id === 'itineraryModal') itineraryModal.classList.remove('active'); });

itineraryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const interests = document.getElementById('itineraryInterests').value.trim();
    const budget = parseInt(document.getElementById('itineraryBudget').value) || 10000;
    const duration = parseInt(document.getElementById('itineraryDuration').value) || 3;
    // Dummy AI response
    itineraryResult.innerHTML = `<div style='margin-top:20px;'><b>Recommended Plan:</b><br>
        <ul>
            <li><b>Day 1:</b> Visit Betla National Park for wildlife and nature.</li>
            <li><b>Day 2:</b> Explore Hundru Falls and enjoy photography.</li>
            <li><b>Day 3:</b> Immerse in Tribal Heritage Villages for culture.</li>
        </ul>
        <b>Budget:</b> ₹${budget.toLocaleString()}<br>
        <b>Interests:</b> ${interests || 'Nature, Adventure, Culture'}
    </div>`;
});

// --- Interactive Map ---
let map;
function initMap() {
    if (map) return;
    map = L.map('map').setView([23.3441, 85.3096], 7); // Ranchi center
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    // Add all destinations as markers
    destinations.forEach(dest => {
        // Example coordinates for demo; replace with real lat/lng for each destination
        const coords = {
            'Betla National Park': [23.867, 84.192],
            'Hundru Falls': [23.259, 85.441],
            'Tribal Heritage Villages': [23.5, 85.3],
            'Dassam Falls': [22.957, 85.397],
            'Baidyanath Dham': [24.03, 86.37],
            'Netarhat Hill Station': [23.3, 84.2],
            'Jonha Falls': [23.3, 85.4],
            'Parasnath Hills': [24.5, 85.8],
            'Tagore Hill': [23.4, 85.3]
        };
        const latlng = coords[dest.name] || [23.3441, 85.3096];
        const marker = L.marker(latlng).addTo(map);
        marker.bindPopup(`<b>${dest.name}</b><br>Type: Destination`);
        marker._type = 'destination';
    });
    // Add sample hotels
    const hotels = [
        { name: 'Hotel Ranchi', lat: 23.344, lng: 85.309 },
        { name: 'Hotel Netarhat', lat: 23.3, lng: 84.2 },
        { name: 'Hotel Deoghar', lat: 24.03, lng: 86.37 }
    ];
    hotels.forEach(h => {
        const marker = L.marker([h.lat, h.lng]).addTo(map);
        marker.bindPopup(`<b>${h.name}</b><br>Type: Hotel`);
        marker._type = 'hotel';
    });
    // Add sample attractions
    const attractions = [
        { name: 'Hundru Falls', lat: 23.259, lng: 85.441 },
        { name: 'Dassam Falls', lat: 22.957, lng: 85.397 },
        { name: 'Parasnath Hills', lat: 24.5, lng: 85.8 }
    ];
    attractions.forEach(a => {
        const marker = L.marker([a.lat, a.lng]).addTo(map);
        marker.bindPopup(`<b>${a.name}</b><br>Type: Attraction`);
        marker._type = 'attraction';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('map')) initMap();
    // Map filter buttons
    document.querySelectorAll('#mapFilters .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#mapFilters .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const type = btn.dataset.type;
            if (!map) return;
            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    layer.setOpacity(type === 'destination' || type === 'hotel' || type === 'attraction' ? (layer._type === type ? 1 : 0.2) : 1);
                }
            });
        });
    });
});

// --- Weather & Alerts Sidebar ---
const weatherInfo = document.getElementById('weatherInfo');
async function fetchWeather() {
    // OpenWeatherMap API (replace with your own API key)
    const API_KEY = 'b1b15e88fa797225412429c1c50c122a1'; // Demo key, replace for production
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Ranchi,IN&units=metric&appid=${API_KEY}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.main) {
            weatherInfo.innerHTML = `
                <b>${data.name}</b><br>
                ${data.weather[0].main} (${data.weather[0].description})<br>
                🌡️ ${data.main.temp}°C, Humidity: ${data.main.humidity}%<br>
                💨 Wind: ${data.wind.speed} m/s
            `;
        } else {
            weatherInfo.textContent = 'Weather info unavailable.';
        }
    } catch {
        weatherInfo.textContent = 'Weather info unavailable.';
    }
}
document.addEventListener('DOMContentLoaded', fetchWeather);

// --- Virtual Tour Modal ---
const virtualTourModal = document.getElementById('virtualTourModal');
const closeVirtualTourModal = document.getElementById('closeVirtualTourModal');
const virtualTourViewer = document.getElementById('virtualTourViewer');

closeVirtualTourModal.addEventListener('click', () => virtualTourModal.classList.remove('active'));
virtualTourModal.addEventListener('click', e => { if (e.target.id === 'virtualTourModal') virtualTourModal.classList.remove('active'); });

function openVirtualTour(imageUrl) {
    virtualTourModal.classList.add('active');
    virtualTourViewer.innerHTML = '';
    // Initialize PhotoSphere Viewer
    new PhotoSphereViewer.Viewer({
        container: virtualTourViewer,
        panorama: imageUrl || 'https://photo-sphere-viewer.js.org/assets/sphere.jpg',
        navbar: ['zoom', 'fullscreen'],
        defaultYaw: '130deg',
        loadingImg: 'https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif',
    });
}
// Example: openVirtualTour() can be called from a button or marker popup
