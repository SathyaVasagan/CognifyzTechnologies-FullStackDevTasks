const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Route to render the form
app.get('/', (req, res) => {
    res.render('index', { submittedData: null });
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const submittedData = {
        name: req.body.name,
        email: req.body.email
    };

    res.render('index', { submittedData });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
