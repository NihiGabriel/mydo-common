const mongoose = require('mongoose');
const colors = require('colors');

const MONGODB_URI= 'mongodb+srv://Nihi:WZTgyfuOBPpOUVx6@devcamper.betl3.mongodb.net/mydoauth_db?retryWrites=true&w=majority'

let dbConn;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true,
}

const getRoleModel = async () => {
    await connectDB(); // connect to the DB
    const model = await dbConn.collection('roles');
    return model;
}

const connectDB = async () => {
    // use create connection to connect to an existing DB
    dbConn = mongoose.createConnection(MONGODB_URI, options);
    console.log('Auth database connected');
}

module.exports = {getRoleModel, connectDB};