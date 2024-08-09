// Update your server.js file with the following code:

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

const corsOptions = {
    origin: 'http://localhost:4200', // allow only this origin (your Angular app)
    optionsSuccessStatus: 200 // some legacy browsers (IE11) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Surya@123',
    database: 'complaints_db'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database');
});

// Define a basic route for GET requests to the root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to Complaints API');
});

// Endpoint to handle POST requests to insert complaints
app.post('/api/complaints', (req, res) => {
    const { name, phone, aadhaar, district, mandal, village, complaint_details, attachment } = req.body;

    // Validate required fields
    if (!name || !phone || !aadhaar || !district || !mandal || !village || !complaint_details) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const createdAt = new Date();
    const updatedAt = new Date();

    // Check if attachment is provided and handle appropriately
    const attachmentValue = attachment ? attachment : null;

    const query = 'INSERT INTO complaints (Name, Phone, Aadhaar, District, Mandal, Village, ComplaintDetails, Attachment, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, phone, aadhaar, district, mandal, village, complaint_details, attachmentValue, createdAt, updatedAt], (err, result) => {
        if (err) {
            console.error('Error saving complaint:', err);
            return res.status(500).json({ error: 'Failed to save complaint' });
        }

        const insertedId = result.insertId;
        const savedComplaint = {
            id: insertedId,
            Name: name,
            Phone: phone,
            Aadhaar: aadhaar,
            District: district,
            Mandal: mandal,
            Village: village,
            ComplaintDetails: complaint_details,
            Attachment: attachmentValue, // Use attachmentValue here
            createdAt: createdAt,
            updatedAt: updatedAt
        };

        console.log('Complaint saved:', savedComplaint);
        res.status(201).json({ message: 'Complaint received', complaint: savedComplaint });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
