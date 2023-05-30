# CALCULATOR API Documentation

## CALCULATOR API

**Description:** The CALCULATOR API is a simple back-end for a calculator application that performs basic mathematical operations such as addition, subtraction, multiplication, division, and square root. It also includes a feature to generate random strings with a length of 14 characters. The API is built using Node.js version 16.16 with the Express framework, TypeScript, and utilizes Postgres as the relational database management system (RDBMS).

## Usage

The CALCULATOR API is a RESTful API with version 1. You can test all the available operations using the Swagger documentation. To access the documentation, please visit [this page](http://www.decooliveira.com.br/v1/api-docs). Most of the features require authentication. You can either create a new user account using the "Create User" section in Swagger or use the following credentials:

- **Username:** admin@admin.com

- **Password:** admin

Make sure to provide a valid email address as the username and a password with a minimum of four characters.

## Performing Operations

To perform operations using the CALCULATOR API, users need to have available credits. When a new account is created, the user receives 200 credits. As users utilize the calculator for mathematical operations or generating random strings, credits are deducted accordingly. The table below illustrates the credit cost for each operation type:

| Operation | Credit Cost |

| -------------- | ----------- |

| Addition | 2 |

| Subtraction | 4 |

| Multiplication | 6 |

| Division | 8 |

| Square Root | 12 |

| Random String | 20 |

## Getting Additional Credits

The Balances endpoint supports two HTTP methods. By making a GET request to this endpoint, authenticated users can retrieve their current balance in the following format:

{ "amount": 434 }

If you run out of credits, you can request more by making a POST call to the Balances endpoint with a valid access token. Provide a value between 100 and 900 in the "amount" field of the payload body. For example:

{ "amount": 100 }

## Operation Records

Every performed operation is recorded and can be retrieved using the Records endpoint. You can define specific criteria such as filters and sorting options to retrieve the desired records. Pagination options are available to control the number of records retrieved per API call and the specific page number.

Filters can be applied based on the operation type, including addition, subtraction, multiplication, division, square root, and random string. Sorting options include operation type, date, and result, with the default sorting field set as date. If no sorting direction is specified, the default direction is descending (DESC). Additionally, you can include deleted records by setting the "includeDeleted" parameter to true. The default value is false.

To delete a specific record, use the DELETE method on the Records endpoint and provide the record ID as a URL parameter. For example: `DELETE /api/v1/records/{id}`.

## User Accounts and Authentication

You can create a new user account or use the built-in account with the following credentials:

- **Username:** admin@demo.com

- **Password:** admin

To create a new account, make a POST request to the `/api/v1/users` endpoint with the following request body payload:

{ "email": "johndoe@example.com", "password": "pass123" }

After creating an account, you will need a JWT authentication token to make API calls. You can obtain the access token by making a POST request to the `/api/v1/auth` endpoint with the following request body payload:

{ "email": "john@doe.com", "password": "pass123" }

## Access

The CALCULATOR API is live and can be accessed at [http://calc.decooliveira.com.br/](http://appcalc.decooliveira.com.br). The API documentation is available at [http://www.decooliveira.com.br/v1/api-docs/](http://www.decooliveira.com.br/v1/api-docs). The application is deployed on AWS Cloud.

## Running the Application Locally

To run the CALCULATOR API locally using a Docker container, follow these steps:

1. Make sure you have Docker Desktop installed, preferably version 4.16.2 (95914) or above.

2. For Linux or macOS environments, execute the following scripts sequentially:

`db.sh`
`migrate.sh`
`app.sh`

Those scripts are located in the scripts folder of the application. Ensure that they have execution privileges by running the following command: `chmod +x db.sh`, `chmod +x migrate.sh` and `chmod +x app.sh`.

3. Once the application is up and running, you can access the API at [http://localhost:3000/api/v1](http://localhost:3000/api/v1). For detailed API documentation, visit [http://localhost:3000/api/v1/api-docs](http://localhost:3000/api/v1/api-docs).

Please note that this documentation provides an overview of the CALCULATOR API based on the provided information. The actual API documentation may contain additional details and endpoints specific to the implementation of the Calculator API.
