// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const uri = "mongodb+srv://bini:dn278dn278@investmentappcluster.1jghv.mongodb.net/investmentsDB?retryWrites=true&w=majority";

const connectDB = async function(){
	const conn = await mongoose.connect(`${uri}`, { useNewUrlParser: true, useUnifiedTopology: true  })
	console.log('DB is connected')
	// conn.connection.db.dropDatabase();
};

export default connectDB;