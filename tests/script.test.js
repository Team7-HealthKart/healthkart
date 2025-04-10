/**
 * @jest-environment jsdom
 */

const { setupForm } = require("../script");

// Mock Chart.js globally
global.Chart = jest.fn();

describe("Health Form Submission", () => {
  beforeEach(() => {
    // Recreate full DOM based on index.html
    document.body.innerHTML = `
      <div class="container">
        <div class="form-section">
          <form id="health-form">
            <input type="number" id="age" name="age" required />
            <input type="number" id="weight" name="weight" required />
            <input type="number" id="height" name="height" required />
            <input type="text" id="bloodPressure" name="bloodPressure" required />
            <input type="number" id="heartRate" name="heartRate" required />
            <button type="submit">Get Health Insights</button>
          </form>
        </div>

        <div class="result-section" id="result-section" style="display: none">
          <div id="bmi-result" class="bmi-result">
            <canvas id="bmi-chart" width="200" height="200"></canvas>
            <p id="bmi-value"></p>
          </div>
          <div id="bmi-suggestions" class="bmi-suggestions"></div>
        </div>
      </div>
    `;

    // Mock canvas context
    const canvas = document.getElementById("bmi-chart");
    canvas.getContext = jest.fn(() => ({}));

    setupForm();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("calculates and displays correct BMI for valid input", () => {
    document.getElementById("weight").value = 70;
    document.getElementById("height").value = 170;

    const form = document.getElementById("health-form");
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    const bmiText = document.getElementById("bmi-value").innerHTML;
    const bmi = parseFloat(bmiText.match(/(\d+\.\d+)/)[0]);

    expect(bmi).toBeCloseTo(24.22, 1); // 70kg / 1.7^2 = 24.22
    expect(document.getElementById("result-section").style.display).toBe(
      "block"
    );
    expect(document.getElementById("bmi-suggestions").innerHTML).toContain(
      "healthy weight"
    );
  });

  test("hides result section when input is missing", () => {
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";

    const form = document.getElementById("health-form");
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(document.getElementById("result-section").style.display).toBe(
      "none"
    );
  });

  test("creates Chart with correct configuration", () => {
    document.getElementById("weight").value = 60;
    document.getElementById("height").value = 165;

    const form = document.getElementById("health-form");
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(global.Chart).toHaveBeenCalledTimes(1);

    const chartArgs = global.Chart.mock.calls[0][1];

    expect(chartArgs).toMatchObject({
      type: "doughnut",
      data: {
        labels: ["BMI", "Remaining"],
        datasets: [
          expect.objectContaining({
            data: [expect.anything(), 40],
            backgroundColor: ["#28a745", "#ddd"],
          }),
        ],
      },
      options: expect.objectContaining({
        responsive: true,
        cutoutPercentage: 60,
      }),
    });
  });

  test("displays correct suggestions for underweight BMI", () => {
    document.getElementById("weight").value = 45;
    document.getElementById("height").value = 170;

    const form = document.getElementById("health-form");
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    const suggestions = document.getElementById("bmi-suggestions").innerHTML;
    expect(suggestions).toContain("underweight");
  });

  test("displays correct suggestions for overweight BMI", () => {
    document.getElementById("weight").value = 80;
    document.getElementById("height").value = 165;

    const form = document.getElementById("health-form");
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    const suggestions = document.getElementById("bmi-suggestions").innerHTML;
    expect(suggestions).toContain("overweight");
  });

  test("displays correct suggestions for obese BMI", () => {
    document.getElementById("weight").value = 100;
    document.getElementById("height").value = 160;

    const form = document.getElementById("health-form");
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    const suggestions = document.getElementById("bmi-suggestions").innerHTML;
    expect(suggestions).toContain("obese range");
  });
});
