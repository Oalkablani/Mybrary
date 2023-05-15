const  mongoose  = require('mongoose')



const authorSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    }
})



const authorConnection = mongoose.createConnection(process.env.DATABASE_URL);

const Author= authorConnection.model('Author', authorSchema);

module.exports = Author

