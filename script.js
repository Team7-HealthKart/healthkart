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
        suggestions = `
        <p><strong>Suggestion:</strong> You are underweight. Here's what you can do:</p>
        <ul>
          <li><strong>Diet:</strong> Focus on nutrient-dense, calorie-rich foods like lean proteins, whole grains, and healthy fats.</li>
          <li><strong>Exercise:</strong> Engage in strength training exercises like weight lifting to build muscle mass.</li>
          <li><strong>Health Tip:</strong> Being underweight can affect immune function and energy levels. Regular check-ups are recommended.</li>
        </ul>
      `;
      } else if (bmi >= 18.5 && bmi < 24.9) {
        suggestions = `
        <p><strong>Suggestion:</strong> You are at a healthy weight. Keep up the good work:</p>
        <ul>
          <li><strong>Diet:</strong> Maintain a balanced diet with a focus on fruits, vegetables, and lean proteins.</li>
          <li><strong>Exercise:</strong> Engage in at least 150 minutes of moderate-intensity exercise per week.</li>
          <li><strong>Health Tip:</strong> Ensure you are sleeping well and managing stress to maintain overall well-being.</li>
        </ul>
      `;
      } else if (bmi >= 25 && bmi < 29.9) {
        suggestions = `
        <p><strong>Suggestion:</strong> You are overweight. Consider taking the following steps:</p>
        <ul>
          <li><strong>Diet:</strong> Focus on reducing processed foods and increasing fiber intake through fruits, vegetables, and whole grains.</li>
          <li><strong>Exercise:</strong> Aim for at least 150 minutes of cardio exercise each week.</li>
          <li><strong>Health Tip:</strong> Gradual weight loss of 0.5–1 kg per week is considered healthy. Monitor your progress regularly.</li>
        </ul>
      `;
      } else {
        suggestions = `
        <p><strong>Suggestion:</strong> You are in the obese range. Consider taking the following steps:</p>
        <ul>
          <li><strong>Diet:</strong> Work with a healthcare provider to create a personalized eating plan, focusing on nutrient-dense foods.</li>
          <li><strong>Exercise:</strong> Start with low-impact activities like walking or swimming.</li>
          <li><strong>Health Tip:</strong> Obesity increases the risk of several health conditions. Regular check-ups are essential.</li>
        </ul>
      `;
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
