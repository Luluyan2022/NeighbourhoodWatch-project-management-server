# Description

This project is used to sharing informations and selling second-hand-goods for the people who live not far away.\
This repo is the backend (built in Express + MongoDB)\
The repo for the Frontend (React) is [here](https://github.com/Luluyan2022/neighbourhood_watch-project-management-client)

## Available Scripts

To run in your computer, follow these steps:
- clone 
- install dependencies: `npm install`
    "bcrypt": "^5.0.1",
    "cloudinary": "^1.33.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-jwt": "^8.3.0",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^6.8.4",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "multer-storage-cloudinary": "^4.0.0"
- create a `.env` file with the following environment variables
  - ORIGIN, with the location of your frontend app (example, `ORIGIN=http://localhost:3000`)
  - TOKEN_SECRET: used to sign auth tokens (example, `TOKEN_SECRET=ilovepizza`)
  - You need also have an account in [cloudinary](https://cloudinary.com/)
    - CLOUDINARY_NAME
    - CLOUDINARY_API_KEY
    - CLOUDINARY_API_SECRET
- run the application: `npm run dev` 

## API Endpoints

<br/>

**Auth endpoints**

| HTTP verb   | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST  | /api/auth/signup  | –  | { email: String, name: String,password: String }  | Create an account  |
| POST  | /api/auth/login  | –  | { email: String, password: String }  | Login  |
| GET  | /api/auth/verify  | Authorization: Bearer `<jwt>`  | –  | Verify jwt  |


<br/>

**Discovery**

| HTTP verb   | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST  | /api/discoveries  | Authorization: Bearer `<jwt>`  | { title, description, imageUrl, author }  | Create new discovery  |
| GET  | /api/discoveries  | Authorization: Bearer `<jwt>`  | –  | Get all discoveries  |
| GET  | /api/discoveries/:discoveryId  | Authorization: Bearer `<jwt>`  | – | Get discovery details  |
| PUT  | /api/discoveries/:discoveryId  | Authorization: Bearer `<jwt>`  | –  | Update a discovery  |
| DELETE  | /api/discoveries/:discoveryId  | Authorization: Bearer `<jwt>`  | – | Delete a discovery  |


<br/>

**SecondHandGoods**

| HTTP verb   | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST  | /api/secondHandGoods  | Authorization: Bearer `<jwt>`  | { name, price, variety, description, imageUrl, contact, author }  | Create new secondHandGood  |
| GET  | /api/secondHandGoods | Authorization: Bearer `<jwt>`  | –  | Get all secondHandGood |
| GET  | /api/secondHandGoods/:secondHandGoodId | Authorization: Bearer `<jwt>`  | – | Get secondHandGood details |
| PUT  | /api/secondHandGoods/:secondHandGoodId  | Authorization: Bearer `<jwt>`  | –  | Update a secondHandGood  |
| DELETE  | /api/secondHandGoods/:secondHandGoodId  | Authorization: Bearer `<jwt>`  | – | Delete a secondHandGood  |

<br/>

**Uploading files**
| HTTP verb   | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST  | /api/upload  | – | –  | upload files  |

## Demo

A demo of the REST API can be found here: https://community-project-api-2.adaptable.app/

