const mongoose = require('mongoose')

const db = async () => {
    try{

        const con = await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}
// mongoose.connect(process.env.DB, {
//     useNewUrlParser: true, 
//     useUnifiedTopology : true
// })
// const db = mongoose.connection
// db.on('error', console.log.bind(console, 'connection error'))
// db.once('open', (callback) => {
//     console.log('Connected to MongoDB #1.')
// })

module.exports = db