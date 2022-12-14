const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect('mongodb+srv://simmmer:snoops22@cluster0.34ahm.mongodb.net/experiment?retryWrites=true&w=majority'
            //  || 'http://localhost:3000/api/users'
             , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        // process.exit(1);
    }
}

module.exports = connectDB