const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

//README format that you are returning
const generateREADME = (answers) =>
  `# ${answers.title}
## Description
${answers.description}.
Link to the Github repository: ${answers.repo}
Deployed application: ${answers.deployed}
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Contact Information](#contact)
## Installation
${answers.install}.
## Usage
${answers.usage}.
## License
${answers.license}
## Contributing
${answers.contribute}
## Tests
${answers.test}
## Contact
GitHub profile: https://github.com/${answers.github}
Email: ${answers.email}
`;

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Project Title:",
    },
    {
      type: "input",
      name: "description",
      message: "Summarize what your project does",
    },
    {
      type: "input",
      name: "install",
      message: "Installation instructions, packages, or command lines used:",
    },
    {
      type: "input",
      name: "usage",
      message: "Describe how this is used:",
    },
    {
      type: "input",
      name: "repo",
      message: "Link to Github repository:",
    },
    {
      type: "input",
      name: "deployed",
      message: "Deployed Link:",
    },
    {
      type: "input",
      name: "contribute",
      message: "Allow others to contribute?",
      choices: ["Yes", "No"],
    },
    {
      type: "list",
      name: "license",
      message: "License:",
      choices: ["MIT", "GNU GPLv3", "Apache License 2.0", "ISC"],
    },
    {
      type: "input",
      name: "test",
      message: "Test files if applicable:",
    },
    {
      type: "input",
      name: "github",
      message: "GitHub username:",
    },
    {
      type: "input",
      name: "email",
      message: "Email contact:",
    },
  ]);
};

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

// Bonus using writeFileAsync as a promise
const init = () => {
  promptUser()
    .then((answers) => {
      writeFileAsync("README.md", generateREADME(answers));
      console.log("Successfully wrote to README.md");
    })
    .catch((err) => console.error(err));
};

init();
