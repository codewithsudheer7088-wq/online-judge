const { Testcase } = require("../models");

exports.createTestcase = async (req, res) => {
  try {
    const { problemId, input, output } = req.body;

    const testcase = await Testcase.create({
      problemId,
      input,
      output
    });

    res.status(201).json({
      message: "Testcase created successfully",
      data: testcase
    });

  } catch (error) {
    console.error("❌ ERROR:", error);

    res.status(500).json({
      error: error.message
    });
  }
};