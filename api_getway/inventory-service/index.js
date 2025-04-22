// inventory-service/index.js
const express = require('express');
const app = express();
const PORT = 5002;

app.use(express.json());

app.post('/inventory/reserve', (req, res) => {
  res.json({ message: '📦 Inventory reserved!' });
});

app.listen(PORT, () => {
  console.log(`✅ Inventory Service running at http://localhost:${PORT}`);
});
