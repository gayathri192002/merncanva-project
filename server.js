const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
const dotenv=require('dotenv').config();
const path=require('path');


const app = express();

// CORS Configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'local' ? 'http://localhost:3000' : '*',
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json()); // Middleware to parse JSON requests
if(process.env.NODE_ENV==='production')
{
    app.use(express.static(path.join(__dirname,"./Front1/dist")))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"./","front1","dist","Index.html"))
    })
}

// Database Connection Function
const dbConnect = async () => {
    try {
        const dbURI = process.env.NODE_ENV === 'local' ? process.env.LOCAL_DB_URI : process.env.MONGODB_URL;

        if (!dbURI) {
            throw new Error("❌ Database URI is missing. Check your .env file.");
        }

        console.log(`🔍 Connecting to database: ${dbURI}`);

        await mongoose.connect(dbURI, {
            useNewUrlParser: true, // ✅ Keep this
        });

        console.log(`✅ Database connected successfully (${process.env.NODE_ENV})`);
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1); // Exit the process if the database fails to connect
    }
};


// Connect to Database
dbConnect();

// Default Port
const PORT = process.env.PORT || 5000;

// Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}...`);
});
