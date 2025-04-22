// src/routers/gatewayRoutes.js
const express = require('express');
const axios = require('axios');
const { createBreaker } = require('../services/breakerClient');

const router = express.Router();

// ⚙️ Tạo các breaker riêng cho từng service
const paymentBreaker = createBreaker(() =>
  axios.post('http://localhost:5001/pay'), 'PaymentService');

const inventoryBreaker = createBreaker(() =>
  axios.post('http://localhost:5002/inventory/reserve'), 'InventoryService');

const shippingBreaker = createBreaker(() =>
  axios.post('http://localhost:5003/ship'), 'ShippingService');

// 📦 Route: Gọi payment-service qua breaker
router.post('/payment', async (req, res) => {
  try {
    const result = await paymentBreaker.fire();
    res.json(result.data);
  } catch (err) {
    console.error("Payment request failed:", err); // Log khi request thất bại
    res.status(503).json({ message: `Payment Error: ${err.message}` });
  }
});

// 📦 Route: Gọi inventory-service qua breaker
router.post('/inventory/reserve', async (req, res) => {
  try {
    const result = await inventoryBreaker.fire();
    res.json(result.data);
  } catch (err) {
    console.error("Inventory request failed:", err); // Log khi request thất bại
    res.status(503).json({ message: `Inventory Error: ${err.message}` });
  }
});

// 📦 Route: Gọi shipping-service qua breaker
router.post('/ship', async (req, res) => {
  try {
    const result = await shippingBreaker.fire();
    res.json(result.data);
  } catch (err) {
    console.error("Shipping request failed:", err); // Log khi request thất bại
    res.status(503).json({ message: `Shipping Error: ${err.message}` });
  }
});

module.exports = router;
