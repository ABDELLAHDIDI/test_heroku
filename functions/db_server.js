const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// Use the cors middleware
app.use(cors());

// Define a route to handle GET requests to /usernames
app.get('/usernames', (req, res) => {
    // Read the usernames.txt file and send its content as the response
    fs.readFile(path.join(__dirname, 'usernames.txt'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Send the content of the file as the response
        res.send(data);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
