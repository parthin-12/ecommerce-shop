import mongoose from "mongoose";

const connectDatabase = () => {
    mongoose.connect(process.env.DATABASE_URL).then((data) => {
        console.log(`MongoDB connected with server ${data.connection.name}`);
    })
};

export default connectDatabase;

