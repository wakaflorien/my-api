import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    roles: {
        User: {
         type: Number, 
         default: 1
        },
        Admin: {
         type: Number, 
         default: 0
        }
    },
    password: {
     type: String, 
     required: true
    },
    firstname: {
     type: String, 
     required: true
    },
    lastname: {
     type: String, 
     required: true
    },
    refreshToken: String,
    dateCreated: { type: Date, default: Date.now },
})

export default mongoose.model('User', userSchema)