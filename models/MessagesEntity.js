const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        user_id: {
            type: String,
            required: [true, "Please enter a user_id"]
        },
        sender_id: {
            type: String,
            required: [true, "Please enter a user_id"]
        },
        messageSent: {
            type: String,
        },
        content: {
            data: Buffer,
            contentType: String,
        }
    },
    {
        timestamps: true,
    },
    {
        collection: 'Users'
    }
)

const MessageEntity = mongoose.model("Message", messageSchema);

module.exports = MessageEntity;