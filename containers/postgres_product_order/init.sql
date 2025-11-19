CREATE DATABASE product;

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price NUMERIC(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZOE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZOE NOT NULL DEFAULT NOW()
);

INSERT INTO products(name, description, price, stock) VALUES 
  ('Wireless Mouse', 'Ergonomic wireless mouse with USB receiver', 999.00, 40),
  ('Gaming Headset', 'Surround sound gaming headset with mic', 2499.00, 30),
  ('USB-C Charger 65W', 'Fast charging USB-C adapter for laptops and phones', 1799.00, 50),
  ('27-inch Monitor', 'Full HD IPS monitor for work and gaming', 12999.00, 12),
  ('External SSD 1TB', 'Portable high-speed USB-C SSD 1TB', 7499.00, 18),
  ('Laptop Stand', 'Aluminium adjustable laptop stand', 1499.00, 35),
  ('Webcam 1080p', 'Full HD webcam with built-in microphone', 1999.00, 20),
  ('Bluetooth Speaker', 'Portable Bluetooth speaker with deep bass', 2299.00, 28),
  ('Office Chair', 'Ergonomic office chair with lumbar support', 8999.00, 7),
  ('Smartwatch', 'Water-resistant smartwatch with heart-rate monitor', 5999.00, 22),
  ('Power Bank 20000mAh', 'Fast-charging power bank with dual output', 1999.00, 45),
  ('Noise Cancelling Earbuds', 'True wireless earbuds with ANC', 3999.00, 25),
  ('Portable Hard Disk 2TB', '2TB external hard disk USB 3.0', 5499.00, 16),
  ('Mechanical Gaming Mousepad', 'Large RGB gaming mousepad', 1299.00, 30),
  ('4K Smart TV 43-inch', 'Android-powered 4K UHD Smart TV', 25999.00, 6),
  ('Router Dual Band', 'Dual band Wi-Fi router with high coverage', 2499.00, 20),
  ('RGB PC Cabinet', 'ATX mid-tower PC case with RGB fans', 4599.00, 10),
  ('Graphic Tablet', 'Drawing tablet for designers and artists', 6999.00, 9),
  ('Tripod Stand', 'Adjustable tripod stand for mobile and camera', 999.00, 27),
  ('Ring Light 18-inch', 'LED ring light with adjustable brightness', 1799.00, 15);