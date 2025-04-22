// payment-service/index.js
const express = require("express");
const app = express();
const PORT = 5001;

app.use(express.json());
app.get("/api/payment", (req, res) => {
  res.status(500).send("Internal Server Error");
});
app.post("/pay", (req, res) => {
  res.json({ message: "💸 Payment successful!" });
});


// app.post('/pay', (req, res) => {
//     setTimeout(() => {
//       res.json({ message: "💸 Payment successful! (Delayed)" });
//     }, 5000); // delay 5 giây
//   });

// app.post("/pay", (req, res) => {
//     console.log("❌ Simulating payment failure...");
//     res.status(500).send("Simulated failure");
//   });

app.listen(PORT, () => {
  console.log(`✅ Payment Service running at http://localhost:${PORT}`);
});
