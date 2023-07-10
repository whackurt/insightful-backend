require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB and listening on port 4000!!!');
        })
    })
    .catch((error) =>{
        console.log(error)
    });

    //middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/posts', postRoutes);


