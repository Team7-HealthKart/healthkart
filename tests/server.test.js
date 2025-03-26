const request = require("supertest");
const fs = require("fs");
const app = require("../server");

jest.mock("fs");

describe("GET /", () => {
  it("should return a welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("HealthKart API is running.");
  });
});

describe("GET /health-insights", () => {
  it("should return health data JSON", async () => {
    const mockData = JSON.stringify({ key: "value" });
    fs.readFile.mockImplementation((filePath, encoding, callback) => {
      callback(null, mockData);
    });

    const res = await request(app).get("/health-insights");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(JSON.parse(mockData));
  });

  it("should return 500 if there is an error reading the file", async () => {
    fs.readFile.mockImplementation((filePath, encoding, callback) => {
      callback(new Error("Error reading data."));
    });

    const res = await request(app).get("/health-insights");
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({ message: "Error reading data." });
  });
});
