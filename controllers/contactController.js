const ContactMessage = require('../models/ContactMessage');

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Create a new contact message document
        const newMessage = await ContactMessage.create({ name, email, subject, message });

        res.status(201).json({ success: true, data: newMessage });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};