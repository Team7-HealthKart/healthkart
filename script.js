// Static health data
const healthData = [
  {
    age: 30,
    weight: 70,
    height: 175,
    bloodPressure: "120/80",
    heartRate: 75,
    healthInsights: {
      bmi: 22.86,
      hydration: "Ensure to stay hydrated. Aim for 2-3 liters of water daily.",
      exercise:
        "Maintain a healthy routine of 30 minutes of moderate exercise most days.",
      stress:
        "Keep stress levels low through relaxation techniques like meditation.",
    },
  },
  {
    age: 45,
    weight: 85,
    height: 168,
    bloodPressure: "130/85",
    heartRate: 80,
    healthInsights: {
      bmi: 30.1,
      hydration:
        "Make sure to hydrate well, especially after physical activities.",
      exercise:
        "Consider incorporating strength training and cardio for overall fitness.",
      stress:
        "Monitor stress levels and engage in stress-relief activities like yoga.",
    },
  },
  {
    age: 25,
    weight: 60,
    height: 180,
    bloodPressure: "115/75",
    heartRate: 72,
    healthInsights: {
      bmi: 18.5,
      hydration:
        "Drink enough water to maintain energy levels throughout the day.",
      exercise: "Continue staying active with a balanced exercise routine.",
      stress:
        "Engage in mindfulness and relaxation exercises to prevent stress buildup.",
    },
  },
];

// Event listener for form submission
document
  .getElementById("health-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting to the server

    // Collect the form data
    const formData = {
      age: parseInt(document.getElementById("age").value),
      weight: parseInt(document.getElementById("weight").value),
      height: parseInt(document.getElementById("height").value),
      bloodPressure: document.getElementById("bloodPressure").value,
      heartRate: parseInt(document.getElementById("heartRate").value),
    };

    // Filter health data based on the form data
    const filteredData = healthData.filter((user) => {
      return (
        (user.age === formData.age || !formData.age) &&
        (user.weight === formData.weight || !formData.weight) &&
        (user.height === formData.height || !formData.height) &&
        (user.bloodPressure === formData.bloodPressure ||
          !formData.bloodPressure) &&
        (user.heartRate === formData.heartRate || !formData.heartRate)
      );
    });

    // Display filtered health insights
    const insightsDiv = document.getElementById("health-insights");
    insightsDiv.innerHTML = ""; // Clear any previous results

    if (filteredData.length > 0) {
      filteredData.forEach((user) => {
        insightsDiv.innerHTML += `
                <h3>Health Insights for Age: ${user.age}</h3>
                <p><strong>BMI:</strong> ${user.healthInsights.bmi}</p>
                <p><strong>Hydration Advice:</strong> ${user.healthInsights.hydration}</p>
                <p><strong>Exercise Advice:</strong> ${user.healthInsights.exercise}</p>
                <p><strong>Stress Tips:</strong> ${user.healthInsights.stress}</p>
                <hr>
            `;
      });
    } else {
      insightsDiv.innerHTML = `<p>No matching data found. Please check your inputs.</p>`;
    }
  });
