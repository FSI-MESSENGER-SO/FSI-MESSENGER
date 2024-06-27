const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//Web Application Security
const cors = require("cors");

const allowedOrigins = ['https://meek-cucurucho-7a3448.netlify.app', 'http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//Express for the API
app.use(express.urlencoded({extended: false}))
app.use(express.json());

//Services
const postRoutes = require('./services/PostService');
const userRoutes = require('./services/UserService');
const messageRoutes = require('./services/MessageService');
const contactRoutes = require('./services/ContactService');
const chatRoutes = require('./services/ChatService');

//Endpoints
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);
app.use('/contacts', contactRoutes);
app.use('/chats', chatRoutes);


// Using Node.js `require()`
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://20.51.216.44:27017/FSI-MESSENGER",
    {useNewUrlParser:true})
    .then(() => {
        app.listen(
            PORT,
            () => console.log(`running in http://localhost:${PORT}`)
        )
        console.log('Connected to the FSI-MESSENGER Data Base!')
    })
    .catch((error) => {
        console.log(error);
    });

