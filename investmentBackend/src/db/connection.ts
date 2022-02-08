// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const connectDB = async function(){
	const conn = await mongoose.connect(
    process.env.DB! || "mongodb://localhost/enWhealtyDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );
	console.log('DB is connected')
	// conn.connection.db.dropDatabase();
}; 

export default connectDB;