CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id),
    order_id BIGINT REFERENCES orders(id),
    quantity INTEGER NOT NULL
)