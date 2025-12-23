const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors()); // Prevents connection errors between frontend and backend
app.use(express.json());

// Part 2 - Mandatory Exchange Rate Table
const exchange_rates = [
    { fromCurrency: "USD", toCurrency: "INR", rate: 83.00 },
    { fromCurrency: "INR", toCurrency: "USD", rate: 0.012 },
    { fromCurrency: "USD", toCurrency: "SGD", rate: 1.35 },
    { fromCurrency: "SGD", toCurrency: "USD", rate: 0.74 },
    { fromCurrency: "USD", toCurrency: "EUR", rate: 0.92 },
    { fromCurrency: "EUR", toCurrency: "USD", rate: 1.08 },
    { fromCurrency: "USD", toCurrency: "GBP", rate: 0.79 },
    { fromCurrency: "GBP", toCurrency: "USD", rate: 1.27 },
    { fromCurrency: "USD", toCurrency: "JPY", rate: 148.50 },
    { fromCurrency: "JPY", toCurrency: "USD", rate: 0.0067 },
    { fromCurrency: "INR", toCurrency: "EUR", rate: 0.011 },
    { fromCurrency: "EUR", toCurrency: "INR", rate: 89.0 },
    { fromCurrency: "SGD", toCurrency: "EUR", rate: 0.66 }
];

// Operation 2: exchangeRate(fromCurrency, toCurrency)
// Returns exact rate from the table with no hardcoded values
function getStoredRate(from, to) {
    const entry = exchange_rates.find(r => r.fromCurrency === from && r.toCurrency === to);
    return entry ? entry.rate : null;
}

// Operation 1: convertCurrency(fromCurrency, toCurrency, amount)
app.post('/convert', (req, res) => {
    const { fromCurrency, toCurrency, amount } = req.body;
    const rate = getStoredRate(fromCurrency, toCurrency);

    if (rate !== null) {
        // Calculation: convertedAmount = amount × rate(from → to)
        const convertedAmount = amount * rate;
        res.json({ 
            rate: rate,
            convertedAmount: convertedAmount.toFixed(2)
        });
    } else {
        res.status(404).json({ error: "Currency pair not found in table." });
    }
});

app.listen(PORT, () => {
    console.log(`Backend Service running at http://localhost:${PORT}`);
});