const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;

// Serve the health data JSON file
app.get("/health-insights", (req, res) => {
  fs.readFile(path.join(__dirname, "healthData.json"), "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Error reading data." });
    }
    res.json(JSON.parse(data)); // Return the JSON data
  });
});

// This serves everything in the root folder
app.use(express.static(path.join(__dirname)));

// Basic route for testing the server
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
if (require.main === module) {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
