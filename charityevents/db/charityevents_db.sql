
DROP DATABASE IF EXISTS charityevents_db;
CREATE DATABASE charityevents_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE charityevents_db;

CREATE TABLE organisations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  contact_email VARCHAR(120),
  contact_phone VARCHAR(40),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO organisations (name, description, contact_email, contact_phone) VALUES
('Perth Cares', 'Local charity supporting health, education and environment initiatives.', 'hello@perthcares.org', '+61 8 6000 0000');

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE
);

INSERT INTO categories (name) VALUES
('Fun Run'), ('Gala Dinner'), ('Concert'), ('Silent Auction');

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  description TEXT,
  event_date DATETIME NOT NULL,
  location VARCHAR(160) NOT NULL,
  price DECIMAL(10,2) DEFAULT 0.00,
  goal INT DEFAULT 0,
  progress INT DEFAULT 0,
  image_url VARCHAR(255),
  status ENUM('active','suspended','past') DEFAULT 'active',
  category_id INT NOT NULL,
  organisation_id INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (organisation_id) REFERENCES organisations(id)
);

INSERT INTO events
(name, description, event_date, location, price, goal, progress, image_url, status, category_id)
VALUES
('Swan River Fun Run', '5km/10km charity run along the Swan River.', DATE_ADD(CURDATE(), INTERVAL 10 DAY), 'Perth, WA', 20.00, 10000, 3200, 'https://picsum.photos/seed/run/800/400', 'active', 1),
('Spring Gala Dinner', 'Black-tie dinner to support youth programs.', DATE_ADD(CURDATE(), INTERVAL 25 DAY), 'Perth Convention Centre', 120.00, 50000, 18000, 'https://picsum.photos/seed/gala/800/400', 'active', 2),
('Music for Good Concert', 'Local artists performing to raise mental health awareness.', DATE_ADD(CURDATE(), INTERVAL 5 DAY), 'Northbridge Piazza', 35.00, 20000, 9500, 'https://picsum.photos/seed/concert/800/400', 'active', 3),
('Art & Hearts Auction', 'Silent auction of donated art pieces.', DATE_ADD(CURDATE(), INTERVAL 18 DAY), 'Fremantle Arts Centre', 0.00, 15000, 4200, 'https://picsum.photos/seed/auction/800/400', 'active', 4),
('City Lights Fun Run (Past)', 'Annual city loop run.', DATE_ADD(CURDATE(), INTERVAL -30 DAY), 'Perth CBD', 15.00, 8000, 8000, 'https://picsum.photos/seed/past1/800/400', 'past', 1),
('Harbour Gala (Past)', 'Dinner by the water for local schools.', DATE_ADD(CURDATE(), INTERVAL -10 DAY), 'Elizabeth Quay', 100.00, 30000, 27500, 'https://picsum.photos/seed/past2/800/400', 'past', 2),
('Acoustic Night', 'An intimate evening with acoustic sets.', DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'Subiaco Theatre', 40.00, 12000, 2500, 'https://picsum.photos/seed/acoustic/800/400', 'active', 3),
('Bid for Books', 'Silent auction to fund libraries.', DATE_ADD(CURDATE(), INTERVAL 60 DAY), 'UWA Winthrop Hall', 0.00, 10000, 1200, 'https://picsum.photos/seed/books/800/400', 'active', 4);
