import Checkout from "../Models/CheckoutModel.js";
import Cart from "../Models/CartModel.js";


// ===================================
// PLACE ORDER
// ===================================

export const placeOrder = async (
  req,
  res
) => {

  try {

    const userId = req.user.id;

    const {
      customer,
      paymentMethod,
      total,
    } = req.body;

    // =========================
    // GET USER CART
    // =========================

    const cart = await Cart.findOne({
      user: userId,
    }).populate("products.product");

    // =========================
    // EMPTY CART
    // =========================

    if (
      !cart ||
      !cart.products.length
    ) {

      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // =========================
    // FORMAT PRODUCTS
    // =========================

    const products =
      cart.products
        .filter(
          (item) => item.product
        )
        .map((item) => ({

          product:
            item.product._id,

          name:
            item.product.name,

          price:
            item.product.price,

          quantity:
            item.quantity,

          image:
            item.product.image,
        }));

    // =========================
    // CREATE ORDER
    // =========================

    const order =
      await Checkout.create({

        user: userId,

        customer,

        products,

        paymentMethod,

        total,
      });

    // =========================
    // CLEAR CART
    // =========================

    cart.products = [];

    await cart.save();

    // =========================
    // SUCCESS
    // =========================

    res.status(201).json({
      success: true,
      message:
        "Order placed successfully",
      order,
    });

  } catch (error) {

    console.log(
      "CHECKOUT ERROR:"
    );

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===================================
// GET MY ORDERS
// ===================================

export const getMyOrders = async (
  req,
  res
) => {

  try {

    const orders =
      await Checkout.find({
        user: req.user.id,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};