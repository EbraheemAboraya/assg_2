const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.juz4b4y.mongodb.net/?retryWrites=true&w=majority`

        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {connectDB};