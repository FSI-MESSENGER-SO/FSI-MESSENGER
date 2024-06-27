const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
        user_id: {
            type: String,
            required: [true, "Please enter a user_id"]
        },
        contacts: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true,
    },
    {
        collection: 'Contacts'
    }
)

const ContactEntity = mongoose.model("Contact", contactSchema);

module.exports = ContactEntity;