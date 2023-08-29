const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // 1. Require the fs module

const app = express();
const port = 3000;

// 2. Use multer.diskStorage() to specify the storage location and filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Save to 'uploads' directory. Make sure this directory exists.
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save with current timestamp as prefix
    }
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, '.')));

app.post('/upload', upload.single('audio'), (req, res) => {
    // 3. The file is automatically saved to the specified location by multer
    console.log('Received audio file:', req.file.filename); // Log the saved filename
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
