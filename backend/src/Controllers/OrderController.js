import Order from "../Models/OrderModel.js";

// ✅ TRACK ORDER (FINAL VERSION)
export const trackOrder = async (req, res) => {
  try {
    let { orderId, email } = req.body;

    //  VALIDATION
    if (!orderId) {
      return res.status(400).json({
        message: "Order ID is required"
      });
    }

    //  CLEAN INPUT
    orderId = orderId.trim();
    email = email ? email.trim().toLowerCase() : null;

    //  SEARCH LOGIC (SMART)
    let order;

    if (email) {
      // search with email + orderId
      order = await Order.findOne({
        orderId,
        email
      });
    }

    //  fallback (only orderId)
    if (!order) {
      order = await Order.findOne({ orderId });
    }

    //  NOT FOUND
    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    //  SUCCESS
    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};