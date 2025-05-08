-- Select database
USE `user_db`;

-- Creating the products table
CREATE TABLE IF NOT EXISTS `products` (
 `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 `name` VARCHAR(255) NOT NULL,
 `price` DECIMAL(10, 2) NOT NULL,
 `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Inserting test data into products table
INSERT INTO `products` (`name`, `price`)
VALUES
  ('Laptop', 999.99),
  ('Smartphone', 499.49),
  ('Headphones', 89.99),
  ('Smartwatch', 149.99),
  ('Keyboard', 49.99);
