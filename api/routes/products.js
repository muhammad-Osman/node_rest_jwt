const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const productController = require("../controller/products");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
const Product = require("../models/product");

router.get("/", checkAuth, productController.getAllProducts);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  productController.createProduct
);

router.get("/:productId", checkAuth, productController.getProductById);

router.patch("/:productId", checkAuth, productController.updateProductById);

router.delete("/:productId", checkAuth, productController.deleteProduct);

module.exports = router;
