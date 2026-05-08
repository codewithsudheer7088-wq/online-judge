const { Submission, Problem, User } = require("../models");
const runCode = require("../utils/runCode");

// ================= SUBMIT CODE =================
const submitCode = async (req, res) => {
  try {

    const { problemId, code, language } = req.body;

    // ================= VALIDATION =================
    if (!problemId || !code || !language) {

      return res.status(400).json({
        error: "Missing fields",
      });
    }

    const allowedLanguages = [
      "javascript",
      "python",
      "java",
      "c",
      "cpp",
    ];

    if (!allowedLanguages.includes(language)) {

      return res.status(400).json({
        error: "Invalid language",
      });
    }

    // ================= GET PROBLEM =================
    const problem = await Problem.findByPk(problemId);

    if (!problem) {

      return res.status(404).json({
        error: "Problem not found",
      });
    }

    // ================= FINAL RESULT =================
    let finalStatus = "Accepted";

    let finalOutput = "";

    let executionTime = "";
    let memory = "";

    let testCaseResults = [];

    // ================= RUN TEST CASES =================
    for (const test of problem.testCases) {

      const result = await runCode(
        code,
        test.input,
        language
      );

      const passed =
        result.success &&
        String(result.output).trim() ===
        String(test.output).trim();

      // ================= SAVE ONLY PUBLIC TEST CASE =================
      if (!test.hidden) {

        testCaseResults.push({

          input: test.input,

          expected: test.output,

          output: result.output,

          status: passed
            ? "Passed ✅"
            : "Failed ❌",

          executionTime:
            result.executionTime,

          memory:
            result.memory,
        });
      }

      // ================= SAVE LAST =================
      executionTime =
        result.executionTime;

      memory =
        result.memory;

      // ================= RUNTIME ERROR =================
      if (!result.success) {

        finalStatus = "Runtime Error";

        finalOutput = result.output;

        break;
      }

      // ================= WRONG ANSWER =================
      if (!passed) {

        finalStatus = "Wrong Answer";

        finalOutput = result.output;

        break;
      }

      // ================= ACCEPTED =================
      finalOutput = result.output;
    }

    // ================= SAVE SUBMISSION =================
    const submission = await Submission.create({

      problemId,

      userId:
        req.user?.id || null,

      language,

      code,

      status:
        finalStatus,

      output:
        finalOutput,

      executionTime,

      memory,

      testCases:
        testCaseResults,
    });

    // ================= RESPONSE =================
    return res.json({

      id:
        submission.id,

      status:
        finalStatus,

      output:
        finalOutput,

      executionTime,

      memory,

      testCases:
        testCaseResults,
    });

  } catch (error) {

    console.log(
      "SUBMIT ERROR:",
      error
    );

    return res.status(500).json({
      error:
        error.message,
    });
  }
};

// ================= GET RESULT =================
const getSubmissionById = async (req, res) => {
  try {

    const submission =
      await Submission.findByPk(
        req.params.id
      );

    if (!submission) {

      return res.status(404).json({
        error:
          "Submission not found",
      });
    }

    return res.json(submission);

  } catch (error) {

    return res.status(500).json({
      error:
        error.message,
    });
  }
};

// ================= LEADERBOARD =================
const getLeaderboard = async (req, res) => {
  try {

    const submissions =
      await Submission.findAll({

        where: {
          status: "Accepted",
        },

        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      });

    const map = {};

    submissions.forEach((s) => {

      const userId = s.userId;

      if (!map[userId]) {

        map[userId] = {

          userId,

          name:
            s.User?.name || "Unknown",

          score: 0,

          submissions: 0,
        };
      }

      map[userId].score += 1;

      map[userId].submissions += 1;
    });

    const leaderboard =
      Object.values(map)
        .sort(
          (a, b) =>
            b.score - a.score
        )
        .map((user, index) => ({

          rank:
            index + 1,

          ...user,
        }));

    return res.json(leaderboard);

  } catch (error) {

    return res.status(500).json({
      error:
        error.message,
    });
  }
};

// ================= USER HISTORY =================
const getUserHistory = async (req, res) => {
  try {

    const submissions =
      await Submission.findAll({

        where: {
          userId:
            req.user?.id,
        },

        include: [
          {
            model: Problem,
            attributes: ["title"],
          },
        ],

        order: [["id", "DESC"]],
      });

    const history =
      submissions.map((s) => ({

        id:
          s.id,

        problem:
          s.Problem?.title,

        status:
          s.status,

        language:
          s.language,

        output:
          s.output,

        executionTime:
          s.executionTime,

        memory:
          s.memory,
      }));

    return res.json(history);

  } catch (error) {

    return res.status(500).json({
      error:
        error.message,
    });
  }
};

// ================= USER STATS =================
const getUserStats = async (req, res) => {
  try {

    const submissions =
      await Submission.findAll({

        where: {
          userId:
            req.user?.id,
        },
      });

    const totalSubmissions =
      submissions.length;

    const accepted =
      submissions.filter(
        (s) =>
          s.status === "Accepted"
      ).length;

    const wrongAnswers =
      submissions.filter(
        (s) =>
          s.status === "Wrong Answer"
      ).length;

    const runtimeErrors =
      submissions.filter(
        (s) =>
          s.status === "Runtime Error"
      ).length;

    return res.json({

      totalSubmissions,

      accepted,

      wrongAnswers,

      runtimeErrors,
    });

  } catch (error) {

    return res.status(500).json({
      error:
        error.message,
    });
  }
};

module.exports = {

  submitCode,

  getSubmissionById,

  getLeaderboard,

  getUserHistory,

  getUserStats,
};