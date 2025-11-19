CREATE DATABASE customer;

CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZOE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZOE NOT NULL DEFAULT NOW()
);

INSERT INTO customers(name, password, email, address) VALUES 
('User 1', "1234", "user1@gmail.com", 'Kolkata India'), 
('User 2', "1234", "user2@gmail.com", 'Bangalore India'), 