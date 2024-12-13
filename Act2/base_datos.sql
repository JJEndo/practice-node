CREATE DATABASE crud_example;

USE crud_example;

CREATE TABLE
    users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        age INT
    );

CREATE TABLE
    orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        product VARCHAR(100),
        price DECIMAL(10, 2),
        FOREIGN KEY (user_id) REFERENCES users (id)
    );

INSERT INTO
    users (name, email, age)
VALUES
    ('Alice', 'alice@example.com', 30);

INSERT INTO
    orders (user_id, product, price)
VALUES
    (1, 'Laptop', 1200.50);