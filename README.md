This project wraps the rest api of the [IP-API](https://ip-api.com/) service. It has a single endpoint that returns the location of the ip address passed in the request. The response is in json format.

## Installation

1. Clone the repository
2. Run `yarn` to install the dependencies
3. Run `yarn dev` to start the server in development mode (with hot reloading)
4. Ryn `yarn build` to build the project
5. Run `yarn start` to start the server in production mode

## Usage

- The server runs on port 3001 by default. The location endpoint is /location. A GET request will respond with the location of the ip address used to make the request.
- When running locally, this will result in an error as it will receive the internal ip address, however, the integration tests show that this will work correctly in production.

## Testing

- The tests are written using jest. Run `yarn test` to run the tests.
- These include both unit tests and integration tests.
