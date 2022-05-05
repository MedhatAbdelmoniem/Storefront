# Storefront Backend Project

## Getting Started

To start first install the dep by npm i or npm install
second migrate the database bu db_migrate up
now to start the server just run npm run watch
now the server is running on localhost/3000
in the env this is the variables{

POSTGRES_HOST=localhost
POSTGRES_DB=postgres
POSTGRES_USER=udacity
POSTGRES_PASSWORD=123
BCRYPT_PASSWORD=testings
SALT_ROUNDS=8
TOKEN_SECRET=test
POSTGRES_TEST_DB=postgrestest
ENV=dev

}

first to create a user you access this link
localhost/3000/create/user/{your firstname}/{your lastname}/{your password}
you will get a token
then to access this user you must attach this token and access this link
localhost/3000/user/{the id}
also to access all the users
localhost/3000/users
also needs the token

now for the products:
to create a product you access
localhost/3000/create/product/{name}/{price}
also with the token
to get the product you access
localhost/3000/product/{the id}
to acccess all the products 
localhost/3000/products

to start the tests for the database and the endpoints
you type npm run test

the endpoint for the user is tested in the productSpec just to access the token generated
