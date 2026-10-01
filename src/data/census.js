// Literacy rate (%) by state / UT, Census of India 2011.
export const INDIA_LITERACY = 74.04

export const literacy = Object.freeze([
  ['Kerala', 94.0], ['Lakshadweep', 91.85], ['Mizoram', 91.33], ['Goa', 88.7],
  ['Tripura', 87.22], ['Daman & Diu', 87.1], ['Andaman & Nicobar', 86.63], ['Delhi', 86.21],
  ['Chandigarh', 86.05], ['Puducherry', 85.85], ['Himachal Pradesh', 82.8], ['Maharashtra', 82.34],
  ['Sikkim', 81.42], ['Tamil Nadu', 80.09], ['Nagaland', 79.55], ['Uttarakhand', 78.82],
  ['Gujarat', 78.03], ['Manipur', 76.94], ['West Bengal', 76.26], ['Dadra & Nagar Haveli', 76.24],
  ['Punjab', 75.84], ['Haryana', 75.55], ['Karnataka', 75.36], ['Meghalaya', 74.43],
  ['Odisha', 72.87], ['Assam', 72.19], ['Chhattisgarh', 70.28], ['Madhya Pradesh', 69.32],
  ['Uttar Pradesh', 67.68], ['Jammu & Kashmir', 67.16], ['Andhra Pradesh', 67.02], ['Jharkhand', 66.41],
  ['Rajasthan', 66.11], ['Arunachal Pradesh', 65.38], ['Bihar', 61.8],
].map(([state, rate]) => Object.freeze({ state, rate })))
