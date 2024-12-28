from flask import Flask, request, jsonify
from sklearn.ensemble import IsolationForest
import numpy as np
import pandas as pd
import joblib

app = Flask(__name__)

# Load the preprocessed data and scaler
data = pd.read_csv('preprocessed_dataset.csv')
scaler = joblib.load('scaler.pkl')

# Prepare features for training the model
X = data.drop('Result', axis=1)  # Features
y = data['Result']  # Target (0: Normal, 1: Anomaly)

# Train the IsolationForest model
model = IsolationForest(contamination=0.1, random_state=42)  # Adjust contamination as needed
model.fit(X)

# Save the trained model
joblib.dump(model, 'anomaly_model.pkl')

@app.route('/anomaly', methods=['POST'])
def check_anomaly():
    # Get input data
    data = request.get_json()
    features = np.array([[data['Oxygen'], data['PulseRate'], data['Temperature']]])

    # Simulate temperature for Kochi
    city_temperature = 28  # Kochi temperature in Celsius

    # Compare the input temperature with the simulated Kochi temperature
    temp_diff = abs(city_temperature - data['Temperature'])  # Difference between input and assumed temperature

    # If temperature difference is large, flag as an anomaly
    if temp_diff > 2:  # Set a threshold for temperature difference, e.g., 2°C
        anomaly_reason = 'Temperature difference anomaly'
    else:
        anomaly_reason = 'Normal temperature'

    # Scale the input features
    features_scaled = scaler.transform(features)

    # Predict anomaly
    prediction = model.predict(features_scaled)
    is_anomalous = prediction[0] == -1  # -1 indicates anomaly

    return jsonify({
        'isAnomalous': is_anomalous,
        'anomalyReason': anomaly_reason if is_anomalous else 'Normal behavior'
    })

if __name__ == '__main__':
    app.run(debug=True)
