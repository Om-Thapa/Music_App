import mongoose from "mongoose";

const Userschema = new mongoose.Schema(
    {
        fullname: {
            type : String,
            require: true
        },
        imageUrl: {
            type: String,
            require: true
        },
        clerkId: {
            type: String,
            require: true,
            unique: true
        },
    },  { timestamps: true }
);

export const User = mongoose.model("User", Userschema);