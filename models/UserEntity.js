const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        first_name: {
            type: String,
            required: [true, "Please enter a first name"]
        },
        last_name: {
            type: String,
            required: [true, "Please enter a last name"]
        },
        user_name: {
            type: String,
            required: [true, "Please enter a user name"]
        },
        email: {
            type: String,
            required: [true, "Please enter a email"]
        },
        password: {
            type: String,
            required: [true, "Please enter a password"]
        }
    },
    {
        timestamps: true,
    },
    {
        collection: 'Users'
    }
)

const UserEntity = mongoose.model("User", userSchema);

module.exports = UserEntity;