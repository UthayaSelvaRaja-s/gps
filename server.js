// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // const db = mysql.createConnection({
// //   host: process.env.DB_HOST,
// //   user: process.env.DB_USER,
// //   password: process.env.DB_PASSWORD,
// //   database: process.env.DB_NAME,
// //   port: process.env.DB_PORT || 3306,
// //   ssl: { rejectUnauthorized: false }, // Needed for some cloud MySQL providers
// // });
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT || 3306,
//     ssl: false, // Disable SSL
//   });
  

// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err);
//   } else {
//     console.log("Connected to database");
//   }
// });

// app.get("/update-location", (req, res) => {
//   const { lat, lon } = req.query;

//   if (!lat || !lon) {
//     return res.status(400).json({ error: "Latitude and Longitude required" });
//   }

//   const sql = "INSERT INTO locations (latitude, longitude) VALUES (?, ?)";
//   db.query(sql, [lat, lon], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.json({ message: "Location saved successfully", lat, lon });
//   });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(express.json()); // Middleware to parse JSON
// app.use(cors()); // Handle CORS issues

// // 🔗 Configure MySQL Database Connection
// const db = mysql.createConnection({
//     host: process.env.DB_HOST, 
//     user: process.env.DB_USER, 
//     password: process.env.DB_PASSWORD, 
//     database: process.env.DB_NAME
// });

// // 🌐 Connect to MySQL
// db.connect(err => {
//     if (err) {
//         console.error("Database connection failed:", err);
//         return;
//     }
//     console.log("Connected to MySQL Database");
// });

// // 📌 API Endpoint to Get All GPS Data
// app.get("/api/gps_data", (req, res) => {
//     db.query("SELECT * FROM gps_data", (err, results) => {
//         if (err) {
//             console.error("Error fetching data:", err);
//             res.status(500).json({ error: "Database query failed" });
//             return;
//         }
//         res.json(results);
//     });
// });

// // 📌 API Endpoint to Add GPS Data
// app.post("/api/gps_data", (req, res) => {
//     const { latitude, longitude, altitude } = req.body;
//     const query = "INSERT INTO gps_data (latitude, longitude, altitude) VALUES (?, ?, ?)";
    
//     db.query(query, [latitude, longitude, altitude], (err, result) => {
//         if (err) {
//             console.error("Error inserting data:", err);
//             res.status(500).json({ error: "Failed to insert data" });
//             return;
//         }
//         res.json({ message: "Data inserted successfully", id: result.insertId });
//     });
// });

// // 🌍 Start the Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     console.log( process.env.DB_HOST,"host name")
// });


const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests

// ✅ MySQL Database (InfinityFree)
const db = mysql.createConnection({
    host: "sql311.infinityfree.com",  // InfinityFree Hostname
    user: "if0_38298795",             // MySQL Username
    password: "X4BnuSOskcobS",        // MySQL Password
    database: "if0_38298795_gps_tracker_db",     // Database Name
});

// ✅ Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
        return;
    }
    console.log("✅ Connected to MySQL!");
});

// 📌 Save GPS data to MySQL
app.post("/gps", (req, res) => {
    const { device_id, latitude, longitude, altitude } = req.body;
    
    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude & Longitude required!" });
    }

    const query = "INSERT INTO gps_data (device_id, latitude, longitude, altitude) VALUES (?, ?, ?, ?)";
    db.query(query, [device_id, latitude, longitude, altitude], (err, result) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ success: true, message: "GPS data stored!" });
    });
});

// ✅ Start Server (Deploy to Render/Railway)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
