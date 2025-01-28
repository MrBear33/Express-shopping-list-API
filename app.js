const express = require("express");
const app = express();
const itemsRoutes = require("./routes/items");

app.use(express.json());
app.use("/items", itemsRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  return res.status(404).json({ error: "Not Found" });
});

// Handle general errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  return res.status(status).json({ error: message });
});

module.exports = app;
