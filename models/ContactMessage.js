const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    // Add timestamps or other fields as needed
});

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
