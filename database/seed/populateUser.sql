-- the password for these users is mypassword123

INSERT INTO users (email, password_hash, name, account_type, created_at) VALUES
('customer1@example.com', '$2a$10$e3.Taqjoo/k5wYZ9WKejuO4RN.jlMv7zinHhRNCvRVFn.jbBQX4mW', 'Customer One', 'customer', NOW()),
('seller1@example.com', '$2a$10$l95vPhj5321kbcg/42sFpOYfnTw.u3YlKjJkar20eccw6yCErUBxK', 'Seller One', 'seller', NOW());
