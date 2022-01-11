const express = require('express');
const cors = require('cors');
const app = express()

var corsOptions = {
   origin: "http://localhost:8081"
}

app.use( cors(corsOptions) );

// database connection
const db = require('./app/models');
db.mongoose.connect(db.url, {
 useNewUrlParser: true,
 useUnifiedTopology: true
})
.then(() => {
  console.log("connected to the database");
})
.catch(err => {
  console.log("cannot connect to the database!", err);
  process.exit();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content type - application/x-www-form-urlencoded
app.use( express.urlencoded({extended: true}) );

// simple route
app.get("/", (req, res)=> {
  res.json({message: "Welcome to bezKoder application"})
});

// ROUTES
require("./app/routes/tutorial.routes")(app);


// set port , listen for requests
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
})


