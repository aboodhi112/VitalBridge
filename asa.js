// Initialize the chart instances
const heartRateChart = new Chart(document.getElementById('heartRateChart').getContext('2d'), {
  type: 'line',
  data: {
      labels: [],
      datasets: [{
          label: 'Heart Rate (BPM)',
          borderColor: '#1abc9c',
          backgroundColor: 'rgba(26, 188, 156, 0.2)',
          data: [],
          fill: true,
          lineTension: 0.1,
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});

const oxygenSaturationChart = new Chart(document.getElementById('oxygenSaturationChart').getContext('2d'), {
  type: 'line',
  data: {
      labels: [],
      datasets: [{
          label: 'Oxygen Saturation (%)',
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          data: [],
          fill: true,
          lineTension: 0.1,
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});

const bloodPressureChart = new Chart(document.getElementById('bloodPressureChart').getContext('2d'), {
  type: 'line',
  data: {
      labels: [],
      datasets: [{
          label: 'Blood Pressure (mmHg)',
          borderColor: '#e74c3c',
          backgroundColor: 'rgba(231, 76, 60, 0.2)',
          data: [],
          fill: true,
          lineTension: 0.1,
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});

const temperatureChart = new Chart(document.getElementById('temperatureChart').getContext('2d'), {
  type: 'line',
  data: {
      labels: [],
      datasets: [{
          label: 'Temperature (°C)',
          borderColor: '#f39c12',
          backgroundColor: 'rgba(243, 156, 18, 0.2)',
          data: [],
          fill: true,
          lineTension: 0.1,
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});

// Function to update the chart data
function updateChart(chart, value) {
  // Get current time in minutes for the x-axis label
  const timeLabel = new Date().toLocaleTimeString();

  // Update the chart's labels and data
  chart.data.labels.push(timeLabel);
  chart.data.datasets[0].data.push(value);

  // Limit the data to the last 10 data points
  if (chart.data.labels.length > 10) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
  }

  chart.update();
}

// Function to check for anomalies and trigger alert
async function checkAnomaliesWithAI(heartRate, oxygenSaturation, bloodPressure, temperature) {
  let anomalyDetected = false;

  // Adjusted threshold for anomaly detection to make it more sensitive
  if (heartRate < 55 || heartRate > 105) {  // Heart rate is considered abnormal if it's below 55 or above 105
      anomalyDetected = true;
  }
  if (oxygenSaturation < 94) {  // Oxygen saturation considered abnormal if below 94%
      anomalyDetected = true;
  }
  if (bloodPressure < 100 || bloodPressure > 160) {  // Blood pressure considered abnormal if it's below 100 or above 160
      anomalyDetected = true;
  }
  if (temperature < 35.5 || temperature > 38) {  // Temperature considered abnormal if it's below 35.5 or above 38°C
      anomalyDetected = true;
  }

  // If an anomaly is detected, trigger the emergency alert
  if (anomalyDetected) {
      triggerEmergencyAlert();
  }
}

// Function to trigger the emergency alert
function triggerEmergencyAlert() {
  // Create an alert element
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerText = 'Anomaly detected! Please check the patient\'s health immediately.';
  
  // Append the alert to the body
  document.body.appendChild(alert);

  // Automatically remove the alert after 5 seconds
  setTimeout(() => {
      alert.remove();
  }, 5000);
}

// Function to update dashboard values and check for anomalies
async function updateDashboard() {
  // Simulating health data (you can replace this with real-time data)
  const heartRate = Math.round(Math.random() * 50 + 50);  // Random heart rate between 50 and 100, rounded to an integer
  const oxygenSaturation = Math.round(Math.random() * 10 + 90);  // Random oxygen saturation between 90 and 100, rounded to an integer
  const bloodPressure = Math.round(Math.random() * 60 + 90);  // Random blood pressure between 90 and 150, rounded to an integer
  const temperature = Math.round(Math.random() * 3 + 35);  // Random temperature between 35 and 38°C, rounded to an integer

  // Update the UI with the latest values along with units
  document.getElementById('heartRateValue').innerText = `${heartRate} BPM`;  // Adding BPM unit
  document.getElementById('oxygenSaturationValue').innerText = `${oxygenSaturation}%`;  // Adding % unit for oxygen saturation
  document.getElementById('bloodPressureValue').innerText = `${bloodPressure} mmHg`;  // Adding mmHg unit for blood pressure
  document.getElementById('temperatureValue').innerText = `${temperature} °C`;  // Adding °C unit for temperature

  // Update the charts with the latest data
  updateChart(heartRateChart, heartRate);
  updateChart(oxygenSaturationChart, oxygenSaturation);
  updateChart(bloodPressureChart, bloodPressure);
  updateChart(temperatureChart, temperature);

  // Call the anomaly detection function using AI
  await checkAnomaliesWithAI(heartRate, oxygenSaturation, bloodPressure, temperature);
}

// Start updating the dashboard every 5 seconds (or set the interval as per your requirement)
setInterval(updateDashboard, 5000);
