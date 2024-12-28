import pandas as pd
from sklearn.preprocessing import StandardScaler
import joblib
file_path = 'C:/Users/abood/Downloads/qt_dataset.csv'
data = pd.read_csv(file_path)
data = data.drop('ID', axis=1)
data['Result'] = data['Result'].map({'Negative': 0, 'Positive': 1})
X = data.drop('Result', axis=1)  
y = data['Result']  


scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

preprocessed_data = pd.DataFrame(X_scaled, columns=['Oxygen', 'PulseRate', 'Temperature'])
preprocessed_data['Result'] = y
preprocessed_data.to_csv('preprocessed_dataset.csv', index=False)


joblib.dump(scaler, 'scaler.pkl')
print("Preprocessing completed. Preprocessed dataset saved as 'preprocessed_dataset.csv' and scaler as 'scaler.pkl'.")
