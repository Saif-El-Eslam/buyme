import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: "Title is required",
    },
    description: {
      type: String,
      // required: "Description is required",
    },
    price: {
      type: Number,
      enum: ["S", "M", "L", "XL", "XXL"],
      required: "Price is required",
    },
    category: {
      type: String,
      enum: ["T-shirts", "shirts", "pants", "shorts", "jackets", "hoodies"],
      required: "Category is required",
    },
    images: {
      type: [String],
      required: "Image is required",
    },
    sizes: {
      type: [
        {
          size: {
            type: String,
            required: "Size is required",
          },
          quantity: {
            type: Number,
            default: 0,
            required: "Quantity is required",
          },
        },
      ],
      default: [],
      required: "Size is required",
    },
    quantity: {
      type: Number,
      default: 0,
      required: "Quantity is required",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

// create a new product
export const createProduct = async (product) => {
  try {
    const newProduct = new Product(product);
    const result = await newProduct.save();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get all products
export const getProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get n products after skipping m products
export const getProductsByPage = async (n, m) => {
  try {
    const products = await Product.find().limit(n).skip(m);
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get an product by id
export const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get products by category
export const getProductsByCategory = async (category) => {
  try {
    const products = await Product.find({ category });
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get product by size and id
export const getProductBySizeAndId = async (id, size) => {
  try {
    const product = await Product.findOne({ _id: id, "sizes.size": size });
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

// update an product
export const updateProduct = async (id, product) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return updatedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

// delete an product
export const deleteProduct = async (id) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return deletedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};
