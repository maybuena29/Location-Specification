const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mainRoute = require('./routes/main.route');
const cookieParser = require('cookie-parser')
const session = require('express-session') 

// app.use(cors({
//     origin:["http://localhost:3000/"],
//     methods:["GET","POST"],
//     credentials:true
// }));
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
app.use(cors({credentials: true, origin: 'http://localhost:3000',allowedHeaders:'*'}));

// app.use(cors({
//     origin:["http://localhost:3000/"],
//     methods:["GET","POST"],
//     credentials:true
// }));
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
// function setupCORS(req, res, next) {
//     // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     // res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
//     // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     // res.header('Access-Control-Allow-Credentials', true);
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     if (req.method === 'OPTIONS') {
//         res.status(200).end();
//     } else {
//         next();
//     }
// }
// app.all('/*', setupCORS);

app.use(express.json());
app.use(cookieParser());
app.use(session({
    key:"userID",
    secret:"corumed_pharmacy",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:30*60*1000,
    },
    secure: true
    
}))



app.use(bodyParser.urlencoded({extended: true}))
app.use('/', mainRoute);
app.all('*', (req, res)=>res.send('page not found'));

app.listen(3001, () => {
    console.log('listening to port 3001');
});