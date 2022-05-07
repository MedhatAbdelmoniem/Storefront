## API Endpoints
#### Products
- Index (a get request) (a json respones) ( a response with the product with the specified id)
- Show (a get request) (a json respones) ( a response with all the products)
- Create [token required] (a post request with a authorization token in the headers) (a json respones) (a response with the created product)

#### Users
- Index [token required] (a get request with a authorization token in the headers) (a json respones) ( a response with the user with the specified id)
- Show [token required] (a get request with a authorization token in the headers) (a json respones) ( a response with all the users)
- Create N[token required] (a post request) (a json respones) (a response with the created user with a authorization token in the headers)

#### Orders
- Current Order by user (args: user id)[token required] (a get request with a authorization token in the headers) (a json respones) (a response with the created order)


## Data Shapes
#### Product
-  id PRIMARY KEY
- name NOT NULL
- price NOT NULL

#### User
- id PRIMARY KEY
- firstName NOT NULL
- lastName NOT NULL
- password NOT NULL

#### Orders
- id PRIMARY KEY
- user_id FOREIGN KEY
- status of order (active or complete) BOOLEAN NOT NULL

#### Order_Products
- id PRIMARY KEY
- product_id REFERENCES products(id) FOREIGN KEY
- order_id REFERENCES orders(id) FOREIGN KEY
- quantity NOT NULL