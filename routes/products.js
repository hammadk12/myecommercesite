const express = require('express');
const router = express.Router(); // Creates a new router instance for handling routes under a specifc path
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware')
// First argument in each route method is the path, the second is the controller function to handle the request
// Importing the product controller

// GET request to list all products
router.get('/', productController.getAllProducts);

// POST request to add a new product
router.post('/', authMiddleware, productController.addProduct);

// GET request to get a single product by ID
router.get('/:productId', productController.getProductById);

// PUT request to update a product by ID
router.put('/:productId', authMiddleware, productController.updateProduct);

// DELETE request to delete a product by ID
router.delete('/:productId', authMiddleware, productController.deleteProduct);

module.exports = router;

/*
GET:

Used to request data from a specified resource.
Generally used for retrieving data (e.g., getting a list of products).

POST:

Used to send data to a server to create/update a resource.
Typically used for submitting form data or uploading a file (e.g., creating a new user).

PUT:

Used to send data to a server to update/replace a resource.
Often used for updating an existing resource (e.g., updating a user's details).

DELETE:

Used to delete a specified resource.
As the name implies, it's used for deleting resources (e.g., removing a product from a catalog).
*/