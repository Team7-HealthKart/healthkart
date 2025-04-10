const request = require("supertest");
const fs = require("fs");
const path = require("path");
const app = require("../server"); // Assuming the file is called 'server.js'

describe("Express Server Tests", () => {
let server;

beforeAll(async () => {
  // Start the server and wait for it to start
  server = app.listen(0, () => {
    const port = server.address().port;
    console.log(`Test server running on port ${port}`);
  });
});

afterAll(async () => {
  // Ensure the server is closed after tests to free up the port
  server.close();
});

   it("should return health insights data in JSON format", async () => {
    const res = await request(app).get("/health-insights");
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });
  // Test Case 1: Check if the root route serves the index.html file correctly
  it("should serve the index.html file on the root route", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.type).toBe("text/html");
    expect(res.text).toContain("<!DOCTYPE html>"); // Assuming it's an HTML document
  });

  // Test Case 2: Check if static files (like images or CSS) are being served correctly
  it("should serve static files from the root directory", async () => {
    const filePath = path.join(__dirname, "index.html"); // Example static file
    const res = await request(app).get("/index.html");

    expect(res.status).toBe(200);
    expect(res.type).toBe("text/html");
    expect(res.text).toContain("<!DOCTYPE html>"); // Assuming this file contains an HTML structure
  });

  // Test Case 3: Verify the server starts up correctly
  it("should respond with a success message when the server starts", async () => {
    // We can't directly test console logs, but we can check for the server response
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });
});
