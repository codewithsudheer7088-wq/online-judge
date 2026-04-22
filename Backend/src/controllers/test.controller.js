const testController = (req, res) => {
  res.json({
    success: true,
    message: "API TEST OK ✅"
  });
};

module.exports = { testController };

