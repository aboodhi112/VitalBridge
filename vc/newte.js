const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');
const oxygenSaturationCtx = document.getElementById('oxygenSaturationChart').getContext('2d');
const bloodPressureCtx = document.getElementById('bloodPressureChart').getContext('2d');
const temperatureCtx = document.getElementById("temperatureChart").getContext("2d");

// Initialize Chart.js for Heart Rate (1-minute intervals)
const heartRateChart = new Chart(heartRateCtx, {
  type: 'line',
  data: {
    labels: ['0m', '1m', '2m', '3m', '4m', '5m'],
    datasets: [{
      label: 'Heart Rate (bpm)',
      data: [72, 75, 80, 85, 78, 90],
      borderColor: '#1abc9c',
      backgroundColor: 'rgba(26, 188, 156, 0.2)',
      fill: true,
      tension: 0.4,
    }],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Heart Rate Over 1-Minute Intervals' },
    },
    scales: {
      x: { beginAtZero: true },
    },
  },
});
const oxygenSaturationChart = new Chart(oxygenSaturationCtx, {
    type: 'line',
    data: {
      labels: ['0m', '1m', '2m', '3m', '4m', '5m'],  // 1-minute intervals
      datasets: [{
        label: 'Oxygen Saturation (%)',
        data: [98, 97, 95, 96, 98, 97],  // Example data for 1-minute intervals
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        fill: true,
        tension: 0.4,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Oxygen Saturation Over 1-Minute Intervals' },
      },
      scales: {
        x: {
          beginAtZero: true,
        },
      },
    },
  });
  
  // Initialize Chart.js for Blood Pressure (1-minute intervals)
  const bloodPressureChart = new Chart(bloodPressureCtx, {
    type: 'line',
    data: {
      labels: ['0m', '1m', '2m', '3m', '4m', '5m'],  // 1-minute intervals
      datasets: [{
        label: 'Blood Pressure (mmHg)',
        data: [120, 122, 118, 125, 130, 128],  // Example data for 1-minute intervals
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.2)',
        fill: true,
        tension: 0.4,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Blood Pressure Over 1-Minute Intervals' },
      },
      scales: {
        x: {
          beginAtZero: true,
        },
      },
    },
  });
  
  // Initialize Chart.js for Temperature (1-minute intervals)
  const temperatureChart = new Chart(temperatureCtx, {
    type: 'line',
    data: {
      labels: ['0m', '1m', '2m', '3m', '4m', '5m'],  // 1-minute intervals
      datasets: [{
        label: 'Temperature (°C)',
        data: [36.6, 36.7, 36.5, 36.8, 36.9, 37.0],  // Example data for 1-minute intervals
        borderColor: '#f39c12',
        backgroundColor: 'rgba(243, 156, 18, 0.2)',
        fill: true,
        tension: 0.4,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Temperature Over 1-Minute Intervals' },
      },
      scales: {
        x: {
          beginAtZero: true,
        },
      },
    },
  });

// Initialize other charts (Oxygen Saturation, Blood Pressure, Temperature) here
// Similar to heartRateChart initialization...

// Function to show alert
function showAlert(message, type = "info") {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerText = message;
  document.body.appendChild(alertDiv);
  setTimeout(() => alertDiv.remove(), 5000);  // Remove alert after 5 seconds
}

// Random value generation and chart update function
function updateVitals() {
  const heartRate = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
  const oxygenSaturation = Math.floor(Math.random() * (100 - 85 + 1)) + 85;
  const systolicBP = Math.floor(Math.random() * (180 - 90 + 1)) + 90;
  const diastolicBP = Math.floor(Math.random() * (120 - 60 + 1)) + 60;
  const temperature = (Math.random() * (0.2) + 36.5).toFixed(1);

  // Update values on page
  document.getElementById("heartRateValue").innerText = heartRate + " bpm";
  document.getElementById("oxygenSaturationValue").innerText = oxygenSaturation + "%";
  document.getElementById("bloodPressureValue").innerText = systolicBP + "/" + diastolicBP;
  document.getElementById("temperatureValue").innerText = temperature + " °C";

  // Check for low oxygen saturation and low blood pressure
  if (oxygenSaturation < 90) {
    showAlert("Low Oxygen Saturation! Please check your oxygen levels.", "danger");
  }

  if (systolicBP < 90 || diastolicBP < 60) {
    showAlert("Low Blood Pressure! Please check your blood pressure levels.", "danger");
  }

  // Update chart data
  updateChart(heartRateChart, heartRate);
  updateChart(oxygenSaturationChart, oxygenSaturation);
  updateChart(bloodPressureChart, systolicBP);
  updateChart(temperatureChart, temperature);

  // Remove the oldest data when it exceeds the limit
  if (heartRateChart.data.datasets[0].data.length > 6) {
    heartRateChart.data.datasets[0].data.shift();
    oxygenSaturationChart.data.datasets[0].data.shift();
    bloodPressureChart.data.datasets[0].data.shift();
    temperatureChart.data.datasets[0].data.shift();
  }

  // Update the charts
  heartRateChart.update();
  oxygenSaturationChart.update();
  bloodPressureChart.update();
  temperatureChart.update();
}

// Function to update the chart with new data
function updateChart(chart, newData) {
  chart.data.datasets[0].data.push(newData);  // Add new data to the chart
  chart.data.labels.push(chart.data.labels.length);  // Add a new label
}

// Set the interval to update every 3 seconds (3000ms)
setInterval(updateVitals, 3000);