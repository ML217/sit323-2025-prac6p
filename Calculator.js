const express = require('express');
const app= express();
const port = 3000;

app.use(express.json());

// Error handling
function handleError(res, message) {
    res.status(400).json({ error: message });
}

// number validation
function isValidNumber(value) {
    return !isNaN(value) && typeof value === 'number';
}
//Parameter Validation
function validateParams(req, res, single = false) {
    const { num1, num2 } = req.query;
    if (single) {
        if (num1 === undefined) {
            return handleError(res, "num1 isn't found");
        }
        const con1 = parseFloat(num1);
        if (isNaN(con1)) {
            return handleError(res, "num1's type is number!");
        }
        return [con1];
    } else {
        if (num1 === undefined || num2 === undefined) {
            return handleError(res, "num1 & num2 aren't found");
        }
        const con1 = parseFloat(num1);
        const con2 = parseFloat(num2);
        if (isNaN(con1) || isNaN(con2)) {
            return handleError(res, "num1'& num2's type are number!");
        }
        return [con1, con2];
    }
}

// add endpoints
app.get('/add', (req, res) => {
    const [con1, con2] = validateParams(req, res);
    if (con1 === undefined || con2 === undefined) return;
    res.json({ result: con1 + con2 });
});

// minus endpoint
app.get('/minus', (req, res) => {
    const [con1, con2] = validateParams(req, res);
    if (con1 === undefined || con2 === undefined) return;
    res.json({ result: con1 - con2 });
});

// multiply endpoint
app.get('/multiply', (req, res) => {
    const [con1, con2] = validateParams(req, res);
    if (con1 === undefined || con2 === undefined) return;
    res.json({ result: con1 * con2 });
});

// divide endpoint
app.get('/divide', (req, res) => {
    const [con1, con2] = validateParams(req, res);
    if (con1 === undefined || con2 === undefined) return;
    if (con2 === 0) {
        return handleError(res, '0 cannot be divided');
    }
    res.json({ result: con1 / con2 });
});

// Exponential operation
app.get('/power', (req, res) => {
    const [con1, con2] = validateParams(req, res);
    if (con1 === undefined || con2 === undefined) return;
    res.json({ result: Math.pow(con1, con2) });
});

// Square root operation
app.get('/sqrt', (req, res) => {
    const [con1] = validateParams(req, res, true);
    if (con1 === undefined) return;
    if (con1 < 0) {
        return handleError(res, 'In square root calculation, param cannot be negative.');
    }
    res.json({ result: Math.sqrt(con1) });
});

// Modulo operation
app.get('/mod', (req, res) => {
    const [con1, con2] = validateParams(req, res);
    if (con1 === undefined || con2 === undefined) return;
    if (con2 === 0) {
        return handleError(res, 'num2 cannot be zero.');
    }
    res.json({ result: con1 % con2 });
});
// make the server start
app.listen(port, () => {
    console.log(`This microservice running at http://localhost:${port}`);
});
