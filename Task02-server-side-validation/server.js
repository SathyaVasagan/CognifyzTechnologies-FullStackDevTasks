const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Temporary storage (for demonstration)
let userData = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Route to render the form
app.get('/', (req, res) => {
    res.render('index');
});

// Route to handle form submission with server-side validation
app.post('/submit', (req, res) => {
    const { name, email, phone, age } = req.body;
    let errors = {};

    if (!name || name.length < 3) {
        errors.name = "Name must be at least 3 characters long.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        errors.email = "Invalid email format.";
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phone || !phonePattern.test(phone)) {
        errors.phone = "Phone number must be 10 digits.";
    }

    if (!age || age < 18 || age > 100) {
        errors.age = "Age must be between 18 and 100.";
    }

    if (Object.keys(errors).length > 0) {
        return res.render('index', { errors });
    }

    // Store validated data in temporary storage
    userData.push({ name, email, phone, age });

    res.redirect('/success');
});

// Route to display success message
app.get('/success', (req, res) => {
    res.render('success', { userData });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
