const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mainRoute = require('./routes/main.route');
const cookieParser = require('cookie-parser')
const session = require('express-session') 
const MysqlStore = require('express-mysql-session')(session);
const multer = require('multer');
const path = require('path');


app.use(express.static(__dirname))


 const sessionStoreOptions ={
    password: '',
    user: 'root',
    database: 'ordering_pos_db',
    host:'localhost',
    port: 3306,
    createDatabaseTable: true,
    schema: {
        tableName: 'user_sessions',
    }
}
const  mySQLSessionStore = new MysqlStore(sessionStoreOptions);

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


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
//app.all('*', (req, res)=>res.send('page not found'));

app.listen(3001, () => {
    console.log('listening to port 3001');
    console.log(__dirname+ '/uploads')
});