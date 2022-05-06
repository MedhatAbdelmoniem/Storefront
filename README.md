# Storefront Backend Project

## Getting Started

To start first install the dep by npm i or npm install <br />
second migrate the database bu db_migrate up <br />
now to start the server just run npm run watch <br />
now the server is running on localhost/3000 <br />
in the env this is the variables{ <br />

POSTGRES_HOST=localhost <br />
POSTGRES_DB=postgres <br />
POSTGRES_USER=udacity <br />
POSTGRES_PASSWORD=123 <br />
BCRYPT_PASSWORD=testings <br />
SALT_ROUNDS=8 <br />
TOKEN_SECRET=test <br />
POSTGRES_TEST_DB=postgrestest <br />
ENV=dev <br />

} <br />

now to create the database <br />
first create a user udacity with the password 123 <br />
to do this first we run this command in psql <br />
CREATE USER udacity WITH PASSWORD '123'; <br />
second we create two databases one to use and the other for testing <br />
to do this we run those commands in psql <br />
CREATE DATABASE postgres; <br />
CREATE DATABASE postgrestest; <br />
last we grant them permissions <br />
GRANT ALL PRIVILEGES ON DATABASE postgres TO udacity <br />
GRANT ALL PRIVILEGES ON DATABASE postgrestest TO udacity <br />



first to create a user you access this link  <br />
localhost/3000/create/user/{your firstname}/{your lastname}/{your password} <br />
you will get a token <br />
then to access this user you must attach this token and access this link <br />
localhost/3000/user/{the id} <br />
also to access all the users <br />
localhost/3000/users <br />
also needs the token <br />

now for the products: <br />
to create a product you access <br />
localhost/3000/create/product/{name}/{price} <br />
also with the token <br />
to get the product you access <br />
localhost/3000/product/{the id} <br />
to acccess all the products  <br />
localhost/3000/products <br />

to start the tests for the database and the endpoints <br />
you type npm run test <br />

the endpoint for the user is tested in the productSpec just to access the token generated <br />


# other info

port number = 3000 <br />
