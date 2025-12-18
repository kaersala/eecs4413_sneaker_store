USE sneaker_store;

-- Seed customers (two fully populated example customers)
INSERT INTO customers (
    first_name, last_name, email, password_hash,
    phone_number, address_line1, address_line2,
    city, province, postal_code, country
)
VALUES
    ('Alice','Wong','alice@example.com','$2a$10$fakehash1','416-555-0001','123 King St','Unit 905','Toronto','ON','M5H1A1','Canada'),
    ('Bob','Chen','bob@example.com','$2a$10$fakehash2','647-555-0002','456 Queen St','Apt 1203','Markham','ON','L3R2Y8','Canada'),
    ('Chris','Lee','chris@example.com','$2a$10$fakehash3','416-555-0003','89 Yonge St',NULL,'Toronto','ON','M5E1A1','Canada'),
    ('Diana','Xu','diana@example.com','$2a$10$fakehash4','416-555-0004','12 Bay St','Suite 400','Toronto','ON','M5J2X2','Canada'),
    ('Evan','Park','evan@example.com','$2a$10$fakehash5','647-555-0005','77 Finch Ave',NULL,'North York','ON','M2N6Z8','Canada'),
    ('Fiona','Li','fiona@example.com','$2a$10$fakehash6','416-555-0006','33 Bloor St','Unit 210','Toronto','ON','M4W1A9','Canada'),
    ('George','Zhao','george@example.com','$2a$10$fakehash7','647-555-0007','9 Highway 7',NULL,'Richmond Hill','ON','L4B3P4','Canada'),
    ('Helen','Sun','helen@example.com','$2a$10$fakehash8','416-555-0008','101 College St',NULL,'Toronto','ON','M5G1L7','Canada'),
    ('Ian','Kim','ian@example.com','$2a$10$fakehash9','647-555-0009','55 Sheppard Ave','Unit 1601','Toronto','ON','M2N2Z8','Canada'),
    ('Jenny','Liu','jenny@example.com','$2a$10$fakehash10','416-555-0010','88 Dundas St',NULL,'Toronto','ON','M5B1C6','Canada');
-- Seed products
INSERT INTO products (sku, name, brand, description, price, stock_quantity, image_url)
VALUES
    ('SKU-001','Air Max 90','Nike','Classic running shoe',129.99,50,'https://example.com/airmax90.jpg'),
    ('SKU-002','Ultraboost','Adidas','Boost running shoe',180.00,40,'https://example.com/ultraboost.jpg'),
    ('SKU-003','Air Jordan 1','Nike','Iconic basketball shoe',170.00,30,'https://example.com/aj1.jpg'),
    ('SKU-004','Air Force 1','Nike','Everyday lifestyle sneaker',120.00,60,'https://example.com/af1.jpg'),
    ('SKU-005','Stan Smith','Adidas','Classic tennis shoe',110.00,45,'https://example.com/stansmith.jpg'),
    ('SKU-006','Yeezy 350','Adidas','Kanye West collaboration',220.00,20,'https://example.com/yeezy350.jpg'),
    ('SKU-007','Gel-Kayano','ASICS','Stability running shoe',160.00,35,'https://example.com/kayano.jpg'),
    ('SKU-008','New Balance 990','New Balance','Made in USA runner',195.00,25,'https://example.com/nb990.jpg'),
    ('SKU-009','Puma Suede','Puma','Retro suede sneaker',95.00,55,'https://example.com/pumasuede.jpg'),
    ('SKU-010','Reebok Classic','Reebok','Timeless leather sneaker',100.00,50,'https://example.com/reebokclassic.jpg');
-- Seed sneakers (front-end catalog)
INSERT INTO sneakers (name, brand, colorway, price, stock, description, image_url)
VALUES
    ('Air Max 90','Nike','Infrared',129.99,50,'Classic Nike Air Max','https://example.com/airmax90.jpg'),
    ('Ultraboost','Adidas','Triple White',180.00,40,'Adidas running shoe','https://example.com/ultraboost.jpg'),
    ('Air Jordan 1','Nike','Bred',170.00,30,'Jordan basketball icon','https://example.com/aj1.jpg'),
    ('Air Force 1','Nike','White',120.00,60,'Nike lifestyle sneaker','https://example.com/af1.jpg'),
    ('Stan Smith','Adidas','Green Heel',110.00,45,'Adidas tennis classic','https://example.com/stansmith.jpg'),
    ('Yeezy 350','Adidas','Zebra',220.00,20,'Yeezy collaboration','https://example.com/yeezy350.jpg'),
    ('Gel-Kayano','ASICS','Blue/White',160.00,35,'Stability runner','https://example.com/kayano.jpg'),
    ('NB 990','New Balance','Grey',195.00,25,'Premium runner','https://example.com/nb990.jpg'),
    ('Puma Suede','Puma','Black/White',95.00,55,'Retro suede','https://example.com/pumasuede.jpg'),
    ('Reebok Classic','Reebok','White',100.00,50,'Classic leather','https://example.com/reebokclassic.jpg');
INSERT INTO sneaker_sizes (sneaker_id, size)
VALUES
    (1,'8'),(1,'9'),(1,'10'),
    (2,'8.5'),(2,'9.5'),
    (3,'9'),(3,'10.5'),
    (4,'8'),(4,'9'),
    (5,'9'),(5,'10'),
    (6,'9.5'),(6,'10.5'),
    (7,'8'),(7,'9'),
    (8,'9'),(8,'10'),
    (9,'8.5'),(9,'9.5'),
    (10,'9'),(10,'10');
-- Sample cart for Alice (customer id 1)
INSERT INTO carts (customer_id)
VALUES (1);

INSERT INTO cart_items (cart_id, product_id, quantity, size)
VALUES
    (1, 1, 1, '9'),
    (1, 2, 2, '9.5');

-- Sample paid order for Alice
INSERT INTO orders (order_number, customer_id, order_date, status, total_amount, shipping_address, billing_address)
VALUES
    ('ORD-1001', 1, NOW(), 'PAID', 129.99, '123 King St, Unit 905, Toronto, ON M5H 1A1, Canada',
     '123 King St, Unit 905, Toronto, ON M5H 1A1, Canada');

INSERT INTO order_items (order_id, product_id, quantity, size, unit_price, line_total)
VALUES
    (1, 1, 1, '9', 129.99, 129.99);


