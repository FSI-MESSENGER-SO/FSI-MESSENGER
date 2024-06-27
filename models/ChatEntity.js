const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema(
    {
        user_id_1: {
            type: String,
            required: [true, "Please enter a user_id_1"]
        },
        user_id_2: {
            type: String,
            required: [true, "Please enter a user_id_2"]
        },
        messages: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true,
    },
    {
        collection: 'Chats'
    }
)

const ChatEntity = mongoose.model("Chat", chatSchema);

module.exports = ChatEntity;