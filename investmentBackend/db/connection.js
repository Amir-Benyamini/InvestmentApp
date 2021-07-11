const mongoose = require('mongoose');

const uri = "mongodb+srv://bini:dn278dn278@investmentappcluster.1jghv.mongodb.net/investmentsDB?retryWrites=true&w=majority";

const connectDB = async function(){
	await mongoose.connect(`${uri}`, { useNewUrlParser: true }, { useUnifiedTopology: true })
	console.log('DB is connected')
};

module.exports = connectDB;