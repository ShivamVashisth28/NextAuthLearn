import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true
    },
    email : {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    password : {
        type: String,
        required: [true, 'Please provide a password'],
    },
    isVerified : {
        type: Boolean,
        default: false,
    },
    isAdmin : {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date, 
    verifyToken: String,
    verifyTokenExpiry: Date   
})

// nextjs runs on edge, so next doest know whether it is already connected to mongoose or not 
const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User