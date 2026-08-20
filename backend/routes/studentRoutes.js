const express = require("express");
const Student = require("../modules/student");
const authmiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authmiddleware, async (req, res) => {
    try {
        const students = await Student.find();

        console.log("Students from MongoDB:", students);

        res.status(200).json(students);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Error fetching students",
            error: err.message
        });
    }
});

router.post("/", authmiddleware, async (req, res) => {
    try {

        const { name, email, course } = req.body;

        const newStudent = new Student({
            name,
            email,
            course
        });

        const savedStudent = await newStudent.save();

        res.status(201).json(savedStudent);

    } catch (err) {

        res.status(500).json({
            message: "Error adding student",
            error: err.message
        });

    }
});

router.put("/:id", authmiddleware, async (req, res) => {
    try {

        const { name, email, course } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { name, email, course },
            { new: true }
        );

        res.status(200).json(updatedStudent);

    } catch (err) {

        res.status(500).json({
            message: "Error updating student",
            error: err.message
        });

    }
});

router.delete("/:id", authmiddleware, async (req, res) => {
    try {

        const deletedStudent =
            await Student.findByIdAndDelete(req.params.id);

        res.status(200).json(deletedStudent);

    } catch (err) {

        res.status(500).json({
            message: "Error deleting student",
            error: err.message
        });

    }
});

module.exports = router;