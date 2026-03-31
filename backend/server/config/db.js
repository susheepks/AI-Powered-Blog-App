import mongoose from "mongoose"

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("database connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}/blogg`)
    } catch (error) {
        console.log("connectDB error:", error.message)
        process.exit(1)
    }
}

export default connectDB