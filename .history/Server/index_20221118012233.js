const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mainRoute = require('./routes/main.route');
const cookieParser = require('cookie-parser')
const session = require('express-session') 
const MysqlStore = require('express-mysql-session')(session);
const multer = require('multer');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });
const path = require('path');

const sessionStoreOptions = {
        host:"corumed-db.mysql.database.azure.com",
        user:"corumedbe", 
        password: "c0rum3dAdm!n",
        database: 'ordering_pos_db',
        port:3306, 
        ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem"),
        createDatabaseTable: true,
        schema: {
        tableName: 'user_sessions',
    }
}}
const  mySQLSessionStore = new MysqlStore(sessionStoreOptions);

app.use(cors({credentials: true, origin: 'https://corumed-ad.azurewebsites.net/'}));

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
        expires:86400 * 1000,
    },
    secure: true,
    store:  mySQLSessionStore
}))

app.use(bodyParser.urlencoded({extended: true}))
app.use('/', mainRoute);
app.all('*', (req, res)=>res.send('page not found'));

app.listen(3001, () => {
    console.log('listening to port 3001');
});