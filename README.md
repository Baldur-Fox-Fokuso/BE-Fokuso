# Back End for Fokuso application

This server functions as a back end server for the [Fokuso](https://github.com/Baldur-Fox-Fokuso/FE-Fokuso) mobile app, using ExpressJS framework with MongoDB Atlas database

Set the database url [(connection string)](https://www.mongodb.com/basics/mongodb-connection-string) for MongoDB Atlas in .env

```env
MONGO_URI = "mongodb+srv://<username>:<password>@<mongodb atlas domain>"
```

Server can be run locally, or on a VPS  
Run the server using npm

```sh
npm run dev
```

For running endpoint test (using Jest and Supertest)

```sh
npm run test
```

API Documentation can be accessed [here](apidocs.md)
