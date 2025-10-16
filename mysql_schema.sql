-- Create schema (database) first if needed
-- CREATE DATABASE IF NOT EXISTS sih CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE sih;

SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  phone VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id VARCHAR(64) NOT NULL UNIQUE,
  customer_id INT NOT NULL,
  package_name VARCHAR(255) NOT NULL,
  price_per_person INT NOT NULL,
  guests INT NOT NULL,
  extras_total INT NOT NULL DEFAULT 0,
  total INT NOT NULL,
  payment_method VARCHAR(32) NOT NULL,
  requirements TEXT,
  check_in DATE,
  check_out DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bookings_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS booking_addons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  CONSTRAINT fk_addons_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NULL,
  name VARCHAR(255),
  location VARCHAR(255),
  rating INT NOT NULL,
  text TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reviews_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
) ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS=1;

