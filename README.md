# Plant Care App

This full-stack MVP is an interactive app where the user can find information about how to take care of a plant.

## Setup

### Node.js

Plant Care is built using Node.js. a server-side JavaScript runtime environment that makes possible the execution of JavaScript code outside a web browser. Make sure you have Node.js installed by writing `node -v` in your terminal. If you have it installed, you will see which version is it, otherwise, download it [here](https://nodejs.org/en).

### Dependencies

- Run `npm install` in the project directory to install dependencies related to the server like Express.
- `cd client`
- `npm install` to install the client dependencies like React.

### Database Prep

- Create a `.env`file in the project directory and add (replace YOUR PASSWORD with your actual password):

```
DB_HOST=localhost
DB_USER=root
DB_NAME=plant_care
DB_PASS=YOUR_PASSWORD
```

- Access MySQL in the terminal by running `mysql -u root -p`. Type your password.
- `CREATE DATABASE plant_care`
- Now open another terminal, **not in the MySQL CLI**, cd into the project folder and type `npm run migrate`. This will create the tables 'plants', 'users' and 'users_favourite_plants'.
- To check that the tables have been created, go to the MySQL CLI and type `USE plant_care` and then `SHOW TABLES`. You can also see the tables structure typying `DESCRIBE tablename` ('tablename' has to be replaced by the name of the table you want to look at).

This is the aspect of the [database](https://drawsql.app/teams/marias-team-14/diagrams/plant-care).

### Run Development Servers

- Run `npm start` in the project directory to start the Express server on port 4000.
- `cd client` and `npm run dev` to start the client server in development mode with hot reloading in port 5173.
- Client is configured so the API calls will be proxied to port 4000.
- The client app can be tested in `http://localhost:5173`
- The API can be tested in `http://localhost:4000/api`

### Perenual API

This project uses an external API. To communicate with the API you will need your own API KEY. To do so:

1. Go to [perenual](https://perenual.com/docs/api)
2. Click on GET API KEY.
3. Create an account or log in.
4. Once you are logged you should be inside **Developer**. Click on generate a new key.
5. On the purpose of use you can write "This API will be used for educational purposes."
6. Copy the key and add it to your `.env`file (replace YOUR_API_KEY with your actual key):

```
API_KEY=YOUR_API_KEY
```

This API is free to use but there are some limitations:

- First and most important, perenual API can only be called **100 times per day**. If we surpass that number, we would obtain a 429 error code. For this reason, there is a file in data called example_plants.js where there is a copy of the information of the first page (plantsPage) and the details of the first plant (speciesDetail). To use it, in the clinet > src folder there is a file called apiClient.js that manages the connection with the external API. There are instructions there on how to use the example data.
- Although perenual has information of 10000 plants, we can only **access to 3000**, so it is possible that some searches don't provide complete results. For example, if you look for a "monstera", you will see the name of the plant and you can click on it but there are no images available and the care details are not there. This is not an error, we are just being cheap.
