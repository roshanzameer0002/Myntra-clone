// const express = require("express");
// const bodyParser = require("body-parser");

// const { getStoredItems, storeItems } = require("./data/items");

// const app = express();

// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// app.get("/items", async (req, res) => {
//   const storedItems = await getStoredItems();
//   await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
//   res.json({ items: storedItems });
// });

// app.get("/items/:id", async (req, res) => {
//   const storedItems = await getStoredItems();
//   const item = storedItems.find((item) => item.id === req.params.id);
//   res.json({ item });
// });

// app.post("/items", async (req, res) => {
//   const existingItems = await getStoredItems();
//   const itemData = req.body;
//   const newItem = {
//     ...itemData,
//     id: Math.random().toString(),
//   };
//   const updatedItems = [newItem, ...existingItems];
//   await storeItems(updatedItems);
//   res.status(201).json({ message: "Stored new item.", item: newItem });
// });

// app.listen(8080);
// const express = require("express");
// const bodyParser = require("body-parser");

// const { getStoredItems, storeItems } = require("./data/items");

// const app = express();

// app.use(bodyParser.json());

// // CORS middleware
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// // Route to get all items
// app.get("/items", async (req, res) => {
//   try {
//     const storedItems = await getStoredItems();
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating delay for demonstration
//     res.json({ items: storedItems });
//   } catch (error) {
//     console.error("Error retrieving items:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Route to get a specific item by ID
// app.get("/items/:id", async (req, res) => {
//   try {
//     const storedItems = await getStoredItems();
//     const item = storedItems.find((item) => item.id === req.params.id);
//     if (item) {
//       res.json({ item });
//     } else {
//       res.status(404).json({ error: "Item not found" });
//     }
//   } catch (error) {
//     console.error("Error retrieving item:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Route to store a new item
// app.post("/items", async (req, res) => {
//   try {
//     const existingItems = await getStoredItems();
//     const itemData = req.body;
//     const newItem = {
//       ...itemData,
//       id: Math.random().toString(),
//     };
//     const updatedItems = [newItem, ...existingItems];
//     await storeItems(updatedItems);
//     res.status(201).json({ message: "Stored new item.", item: newItem });
//   } catch (error) {
//     console.error("Error storing item:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// const PORT = process.env.PORT || 8080; // Use environment port or default to 8080
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });


const express = require("express");
const bodyParser = require("body-parser");

const { getStoredItems, storeItems } = require("./data/items");

const app = express();

app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Route to get all items
app.get("/items", async (req, res) => {
  try {
    const storedItems = await getStoredItems();
    res.json({ items: storedItems });
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get a specific item by ID
app.get("/items/:id", async (req, res) => {
  try {
    const storedItems = await getStoredItems();
    const item = storedItems.find((item) => item.id === req.params.id);
    if (item) {
      res.json({ item });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error("Error retrieving item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to store a new item
app.post("/items", async (req, res) => {
  try {
    const itemData = req.body;
    const newItem = {
      ...itemData,
      id: Math.random().toString(),
    };
    const updatedItems = await storeItems([
      ...(await getStoredItems()),
      newItem,
    ]);
    res.status(201).json({ message: "Stored new item.", item: newItem });
  } catch (error) {
    console.error("Error storing item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 8080; // Use environment port or default to 8080
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
