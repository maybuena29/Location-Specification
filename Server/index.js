const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mainRoute = require('./routes/main.route');
const http = require('http');
const server = http.createServer(app);
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MysqlStore = require('express-mysql-session')(session);
const multer = require('multer');
const fs = require('fs');
const port = process.env.PORT || 3001;
require('dotenv').config();
const { Server } = require("socket.io");
var CronJob = require('cron').CronJob;

const path = require('path');

const sessionStoreOptions = {
    host:"localhost", //corumed-db.mysql.database.azure.com
    user:"root", //corumedbe
    password: "", //c0rum3dAdm!n
    database: 'locator_db',
    port:3306, //3306
    // ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")},
    createDatabaseTable: true,
    schema: {
        tableName: 'user_sessions',
    }
}
const  mySQLSessionStore = new MysqlStore(sessionStoreOptions);

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.static(__dirname));
app.use(express.json({limit: '50mb'}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    key:"userID",
    secret:"corumed_pharmacy",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:86400 * 1000*365,
    },
    secure: true,
    store:  mySQLSessionStore
}))

app.use(bodyParser.urlencoded({extended: true}))
app.use('/', mainRoute);
app.all('*', (req, res)=>res.send('page not found'));

server.listen(port, () => {
    console.log(`listening to port ${port}`);
});

module.exports = app;