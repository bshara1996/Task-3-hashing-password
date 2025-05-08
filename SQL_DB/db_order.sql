-- Select database
USE `user_db`;

-- Creating the orders table
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Creating the order_items table
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Inserting sample orders data
INSERT INTO `orders` (`user_id`)
VALUES
  (1),  -- User ID 1 placed an order
  (2),  -- User ID 2 placed an order
  (3);  -- User ID 3 placed an order

-- Inserting sample order items data
INSERT INTO `order_items` (`order_id`, `product_id`, `quantity`)
VALUES
  (1, 1, 2),  -- Order 1, Product 1, Quantity 2
  (1, 3, 1),  -- Order 1, Product 3, Quantity 1
  (2, 2, 3),  -- Order 2, Product 2, Quantity 3
  (2, 4, 1),  -- Order 2, Product 4, Quantity 1
  (3, 5, 2);  -- Order 3, Product 5, Quantity 2
