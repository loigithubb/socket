// src/index.js
const express = require('express');
const rateLimit = require('express-rate-limit');
const gatewayRoutes = require('./routers/gatewayRoutes');

const app = express();

// Cài đặt express-rate-limit
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 phút
  max: 5, // giới hạn 5 request/phút
  message: 'Too many requests, please try again later.',
});

app.use(limiter); // Áp dụng cho tất cả route
app.use(express.json());    
app.use('/api', gatewayRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running at http://localhost:${PORT}`);
});
