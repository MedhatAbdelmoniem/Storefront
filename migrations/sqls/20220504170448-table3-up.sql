CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id),
    user_id BIGINT REFERENCES users(id),
    quantity INTEGER NOT NULL,
    status_order BOOLEAN NOT NULL
)