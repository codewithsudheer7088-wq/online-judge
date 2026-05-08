const Problem = require("./src/models/problem.model");

async function seed() {

  await Problem.create({
    title: "Add Two Numbers",
    description: "Add two integers",

    difficulty: "easy",

    testCases: [
      {
        input: "2 3",
        output: "5",
      },
      {
        input: "10 20",
        output: "30",
      },
    ],
  });

  await Problem.create({
    title: "Multiply Two Numbers",
    description: "Multiply two integers",

    difficulty: "medium",

    testCases: [
      {
        input: "2 3",
        output: "6",
      },
    ],
  });

  await Problem.create({
    title: "Factorial",
    description: "Find factorial",

    difficulty: "hard",

    testCases: [
      {
        input: "5",
        output: "120",
      },
    ],
  });

  console.log("Problems Added");

  process.exit();
}

seed();