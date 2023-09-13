### Examples

This directory contains a basic example to use sequelize with momento as a dialect. It does the following:

- Defines a model for a User with attributes and a primary key
- Creates a table or a Momento cache underneath for the User Model
- Inserts a User
- Selects the User inserted
- Deletes the User

### Pre-requisites

- Node version 12 or greater is required
- You will need a Momento Auth Token to run the example. You can get one from our [console](https://console.gomomento.com/)

### Running the examples

```bash
cd examples/momento
npm install
MOMENTO_AUTH_TOKEN="<your-auth-token>" npm run basic
```
