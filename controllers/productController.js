const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body); // Creates a new instance of the Product model using the data provided in the request body
        await newProduct.save(); // saves the new product to db
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all products, fetching all products from database
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // fetches all products from db
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId); // uses findById to fetch a product by the ID provided in the req.params
        if (!product) { // if block to catch errors if product not found
            return res.status(404).json({ message: 'Product not found. '});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true }); // Updates product using findbyidandupdate, updates data and an option that returns the updated document
        if (!updateProduct) {
            return res.status(404).json({ message: 'Product not found '});
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId); // deletes product using ID
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully '});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};