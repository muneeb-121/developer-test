# Developer Test
Build with Nest.js
# How to Setup

`cd` into project root directory and do following steps

Create .env file in project's root directory.
Following environment variable keys which are required in order to run the app.

    DB_CONNECTION_URI_PROD=
    DB_CONNECTION_URI_DEV=
    DB_CONNECTION_URI_TEST=
    MAPBOX_API_TOKEN=

Run 

    npm install

then start server by running following command

    npm run start:dev // For development server
    npm run start:dev // For production server
    npm run test 	  // For test
# API
Resources

 1. Users `/users`
 2. Location `/location`

## Users
**UserSchema**

    {
	    _id: string,
	    name: string,
	    dob: Date,
	    description: string,
	    createdAt: Date,
	    updatedAt: Date
    }

**Routes**	
 
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id

 ## Location
 This uses mapbox [Geocoding api](https://docs.mapbox.com/api/search/geocoding/)

 **Routes**

    GET /location?address={string}
