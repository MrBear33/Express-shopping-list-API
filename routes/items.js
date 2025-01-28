const express = require("express");
const router = new express.Router();
const items = require("../fakeDb");

// GET /items - Get all items
router.get("/", (req, res) => {
  return res.json(items);
});

// POST /items - Add a new item
router.post("/", (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: "Name and price are required" });
  }
  const newItem = { name, price };
  items.push(newItem);
  return res.status(201).json({ added: newItem });
});

// GET /items/:name - Get a single item by name
router.get("/:name", (req, res) => {
  const item = items.find(i => i.name === req.params.name);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  return res.json(item);
});

// PATCH /items/:name - Update an item by name
router.patch("/:name", (req, res) => {
  const item = items.find(i => i.name === req.params.name);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  const { name, price } = req.body;
  if (name !== undefined) item.name = name;
  if (price !== undefined) item.price = price;
  return res.json({ updated: item });
});

// DELETE /items/:name - Delete an item by name
router.delete("/:name", (req, res) => {
  const itemIdx = items.findIndex(i => i.name === req.params.name);
  if (itemIdx === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  items.splice(itemIdx, 1);
  return res.json({ message: "Deleted" });
});

module.exports = router;
