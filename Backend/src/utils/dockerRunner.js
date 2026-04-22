import { exec } from "child_process";

export const runCodeInDocker = (code, language) => {
  return new Promise((resolve, reject) => {
    const imageMap = {
      python: "judge-python",
      cpp: "judge-cpp",
      java: "judge-java"
    };

    const image = imageMap[language];

    const command = `echo "${code}" | docker run -i ${image}`;

    exec(command, { timeout: 2000 }, (error, stdout, stderr) => {
      if (error) {
        if (error.killed) return resolve("Time Limit Exceeded");
        return resolve(stderr || "Runtime Error");
      }
      resolve(stdout);
    });
  });
};