import { connect, Mongoose } from 'mongoose';

const connectDB = async () => {
  try {
    const conn: Mongoose = await connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
