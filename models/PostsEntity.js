const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        user_id: {
            type: String,
            required: [true, "Please enter a user_id"]
        },
        message: {
            type: String,
        },
        content: {
            data: Buffer,
            contentType: String,
            filename: String,
        },
        likes : {
            type: Number,
        },
        dislikes: {
            type: Number,
        },
    },
    {
        timestamps: true,
    },
    {
        collection: 'Posts'
    }
)

const PostEntity = mongoose.model("Post", postSchema);

module.exports = PostEntity;