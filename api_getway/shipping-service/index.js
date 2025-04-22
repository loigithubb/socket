// shipping-service/index.js
const express = require('express');
const app = express();
const PORT = 5003;

app.use(express.json());

app.post('/ship', (req, res) => {
  res.json({ message: '🚚 Shipping in progress...' });
});

app.listen(PORT, () => {
  console.log(`✅ Shipping Service running at http://localhost:${PORT}`);
});
