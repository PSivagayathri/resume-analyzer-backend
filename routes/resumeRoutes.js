const express = require("express");

const router = express.Router();

const axios = require("axios");

const upload = require("../middleware/upload");

const {
  analyzeResume
} = require("../controllers/resumeController");

// =========================
// Analyze Resume
// =========================

router.post(
  "/analyze",
  upload.single("resume"),
  analyzeResume
);

// =========================
// Fetch Jobs Dynamically
// =========================

router.post("/jobs", async (req, res) => {

    try {

        const { roles, location } = req.body;

        const results = await Promise.all(

            roles.map(async (role) => {

                const response = await axios.get(
                    "https://resume-analyzer-ai-3.onrender.com/fetch-jobs",
                    {
                        params: {
                            role,
                            location
                        }
                    }
                );

                return {
                    role,
                    jobs: response.data.jobs
                };
            })
        );

        const jobs = {};

        results.forEach((item) => {
            jobs[item.role] = item.jobs;
        });

        res.json({ jobs });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to fetch jobs"
        });
    }
});

module.exports = router;