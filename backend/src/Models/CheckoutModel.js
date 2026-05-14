import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    customer: {
      firstName: String,
      lastName: String,
      company: String,
      country: String,
      address: String,
      apartment: String,
      city: String,
      state: String,
      zip: String,
      phone: String,
      email: String,
      notes: String,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        name: String,

        price: String,

        quantity: Number,

        image: String,
      },
    ],

    paymentMethod: {
      type: String,
      enum: ["bank", "cod"],
      default: "cod",
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Checkout = mongoose.model(
  "Checkout",
  checkoutSchema
);

export default Checkout;