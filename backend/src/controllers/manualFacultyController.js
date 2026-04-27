const ManualFaculty = require("../models/ManualFaculty");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ManualQuestion = require("../models/ManualQuestion");


// helper to generate random credentials
const generateCredentials = () => {
    const userId = "FAC_" + Math.random().toString(36).substring(2, 8);
    const password = Math.random().toString(36).slice(-8);
    return { userId, password };
};

exports.createManualFaculty = async (req, res) => {
    try {
        // const { subject } = req.body;
        const { subject, name, department, email, phone } = req.body;

        if (!subject) {
            return res.status(400).json({ message: "Subject is required" });
        }

        // generate credentials
        const { userId, password } = generateCredentials();

        // hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // save in DB
        const faculty = new ManualFaculty({
            userId,
            passwordHash,
            subject,
            name,
            department,
            email,
            phone,
            createdBy: req.user.id
        });

        await faculty.save();

        res.status(201).json({
            message: "Manual faculty created successfully",
            credentials: {
                userId,
                password // ⚠️ send only once
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};




exports.loginManualFaculty = async (req, res) => {
    try {
        const { userId, password } = req.body;

        // check input
        if (!userId || !password) {
            return res.status(400).json({ message: "UserId and password required" });
        }

        // find faculty
        const faculty = await ManualFaculty.findOne({ userId });

        if (!faculty) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        if (!faculty.isActive) {
            return res.status(403).json({ message: "Account inactive" });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, faculty.passwordHash);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // generate JWT
        const token = jwt.sign(
            {
                userId: faculty.userId,
                role: "MANUAL_FACULTY",
                subject: faculty.subject
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};






exports.addManualQuestion = async (req, res) => {
    try {
        const {
            unit,
            co,
            type,
            part,
            question,
            questionImage,
            marks,
            bloomsTaxonomy,
            level
        } = req.body;

        // validation
        if (!question && !questionImage) {
            return res.status(400).json({
                message: "Either question text or image is required"
            });
        }

        const newQuestion = new ManualQuestion({
            subject: req.user.subject,
            createdBy: req.user.userId,

            unit,
            co,
            type,
            part,
            question,
            questionImage,
            marks,
            bloomsTaxonomy,
            level
        });

        await newQuestion.save();

        res.status(201).json({
            message: "Question added successfully",
            data: newQuestion
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};