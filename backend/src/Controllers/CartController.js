import Cart from "../Models/CartModel.js";

// ============================
// ADD TO CART
// ============================

export const addToCart = async (req, res) => {

  try {

    const userId = req.user.id;

    const { productId } = req.body;

    // VALIDATION
    if (!productId) {

      return res.status(400).json({
        success: false,
        message: "Product ID required",
      });
    }

    let cart = await Cart.findOne({
      user: userId,
    });

    // CREATE NEW CART
    if (!cart) {

      cart = await Cart.create({
        user: userId,
        products: [
          {
            product: productId,
            quantity: 1,
          },
        ],
      });

      return res.status(201).json({
        success: true,
        message: "Product added to cart",
        data: cart,
      });
    }

    // CHECK PRODUCT EXISTS
    const existingProduct = cart.products.find(
      (item) =>
        item.product?._id?.toString() ===
          productId ||
        item.product?.toString() ===
          productId
    );

    // INCREASE QUANTITY
    if (existingProduct) {

      existingProduct.quantity += 1;

    } else {

      cart.products.push({
        product: productId,
        quantity: 1,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    });

  } catch (error) {

    console.log("CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ============================
// GET CART PRODUCTS
// ============================

export const getCartProducts = async (req, res) => {

  try {

    const userId = req.user.id;

    const cart = await Cart.findOne({
      user: userId,
    }).populate("products.product");

    // EMPTY CART
    if (!cart) {

      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: cart.products,
    });

  } catch (error) {

    console.log("GET CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ============================
// REMOVE FROM CART
// ============================

export const removeFromCart = async (req, res) => {

  try {

    const userId = req.user.id;

    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: userId,
    });

    // CART NOT FOUND
    if (!cart) {

      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.products = cart.products.filter(
      (item) =>
        item.product?._id?.toString() !==
          productId &&
        item.product?.toString() !==
          productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Removed from cart",
    });

  } catch (error) {

    console.log("REMOVE CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};