function setupForm() {
  document
    .getElementById("health-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const weight = parseFloat(document.getElementById("weight").value);
      const height = parseFloat(document.getElementById("height").value);

      const bmiDiv = document.getElementById("bmi-result");
      const suggestionDiv = document.getElementById("bmi-suggestions");
      const resultSection = document.getElementById("result-section");

      if (weight && height) {
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

        document.getElementById(
          "bmi-value"
        ).innerHTML = `<strong>Your BMI:</strong> ${bmi}`;

        const ctx = document.getElementById("bmi-chart").getContext("2d");
        new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["BMI", "Remaining"],
            datasets: [
              {
                data: [bmi, 40],
                backgroundColor: ["#28a745", "#ddd"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            cutoutPercentage: 60,
            legend: { display: false },
            maintainAspectRatio: false,
          },
        });

        let suggestions = "";
        if (bmi < 18.5) {
          suggestions = `<p><strong>Suggestion:</strong> You are underweight...`;
        } else if (bmi >= 18.5 && bmi < 24.9) {
          suggestions = `<p><strong>Suggestion:</strong> You are at a healthy weight...`;
        } else if (bmi >= 25 && bmi < 29.9) {
          suggestions = `<p><strong>Suggestion:</strong> You are overweight...`;
        } else {
          suggestions = `<p><strong>Suggestion:</strong> You are in the obese range...`;
        }

        suggestionDiv.innerHTML = suggestions;

        resultSection.style.display = "block";
        bmiDiv.style.display = "block";
        suggestionDiv.style.display = "block";

        setTimeout(() => {
          suggestionDiv.style.opacity = 1;
        }, 100);
      } else {
        resultSection.style.display = "none";
      }
    });
}

module.exports = { setupForm };
