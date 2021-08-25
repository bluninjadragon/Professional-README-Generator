const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

//README format that you are returning
const generateREADME = (answers) =>
  `# ${answers.title}
## Description
${answers.description}.
Link to the Github repository:${answers.repo}
Deployed application ${answers.deployed}
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
      type: "confirm",
      name: "contribute",
      message: "Allow others to contribute?",
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
      if (answers.contribute === true) {
        answers.contribute =
          "Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please see linked contributor code of conduct. https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md";
      } else {
        answers.contribute = "We don't want contributors at this time.";
      }

      if ((answers.license = "MIT")) {
        answers.license = "[MIT](https://choosealicense.com/licenses/mit/)";
      } else if ((answers.license = "GNU GPLv3")) {
        answers.license =
          "[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)";
      } else if ((answers.license = "Apache License 2.0")) {
        answers.license =
          "[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)";
      } else {
        ("[ISC](https://choosealicense.com/licenses/isc/)");
      }
    })
    .catch((err) => console.error(err));
};

init();
