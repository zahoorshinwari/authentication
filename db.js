
require('dotenv').config();

const mongoose = require('mongoose');
// const dbHOST = process.env.DBHOST;

mongoose.connect('mongodb+srv://khanzshinwari5371:tNNof9i3VTfPw1iF@user.9keyw.mongodb.net/?retryWrites=true&w=majority&appName=user')
    .then(() => {
        console.log('MongoDB Connnected...')
    }).catch((err) => {
        console.log('Error while Mongo Conn..', err);
    })