### Examples

This directory contains a basic example to use sequelize with momento as a dialect. It does the following:

- Defines a model for a User with attributes and a primary key
- Creates a table or a Momento cache underneath for the User Model
- Inserts a User
- Selects the User inserted
- Deletes the User

### Pre-requisites

- Node version 12 or greater is required

### Running the examples

```bash
cd examples/momento
npm install
npm run basic
```
