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

//For Notification
const io = new Server(server, {
    cors:{
        origin:'http://localhost:3000'
    }
});

// var job = new CronJob(
// 	'* * * * *',
// 	function() {
//         console.log('cron job notif')
		
// 	},
// 	null,
// 	false,
// );

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('critical_notification', (item) => {
        // console.log(item.productName + ': ' + item.notifType);
        socket.emit('receive_critical_notif', item);
    })
    socket.on('near_expire_notification', (item) => {
        // console.log(item.productName + ': ' + item.notifType);
        socket.emit('receive_near_expire_notif', item);
    })
    socket.on('expire_notification', (item) => {
        // console.log(item.productName + ': ' + item.notifType);
        socket.emit('receive_expire_notification', item);
    })
});

// job.start();
//End for notification

const sessionStoreOptions = {
   host:"corumeddb.mysql.database.azure.com",
        user:"corumed_admin", 
        password: "Ph@rm4mediko",
        database: 'ordering_pos_db',
        port:3306, 
        ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")},
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