const inquirer = require("inquirer");
const fs = require("fs");


// answers.title , answers.descriptionone, etc...
const generateREADME = (answers) =>
  `# ${answers.title}
## Description
${answers.descriptionone}. ${answers.descriptiontwo}. ${answers.descriptionthree}.
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
## Installation
Here is the link to the Github repository where the repo can be cloned (${answers.repolink}). Here is the link to the deployed application (${answers.deployedlink})
## Usage
${answers.usage}.
## License
${answers.license}
## Contributing
${answers.contribute}
## Tests
${answers.test}
## Questions
Here is a link to my GitHub profile https://github.com/${answers.github}. For additional questions, you can reach me via email at ${answers.email}
`;

inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?",
    },
    {
      type: "input",
      name: "descriptionone",
      message:
        "What was your motivation for creating this project? (HINT: Becuase it was a homework assignment is NOT a good answer.)",
    },
    {
      type: "input",
      name: "descriptiontwo",
      message: "What problem does this application solve?",
    },
    {
      type: "input",
      name: "descriptionthree",
      message: "What did you learn during this project?",
    },
    {
      type: "input",
      name: "usage",
      message:
        "Please breifly describe how to use your app/project. Ok to provide examples if necessary.",
    },
    {
      type: "input",
      name: "repolink",
      message: "Please enter the link to the Github repository.",
    },
    {
      type: "input",
      name: "deployedlink",
      message: "Please enter the link to the deployed application.",
    },
    {
      type: "confirm",
      name: "contribute",
      message: "Do you want others to contribute to this project?",
    },
    {
      type: "list",
      name: "license",
      message: "Please choose a license.",
      choices: ["MIT", "GNU GPLv3", "Apache License 2.0", "ISC"],
    },
    {
      type: "input",
      name: "test",
      message: "Please please provide any tests for your app.",
    },
    {
      type: "input",
      name: "github",
      message: "Please enter your GitHub username.",
    },
    {
      type: "input",
      name: "email",
      message: "Please enter your email address.",
    },
  ])
  .then((answers) => {
    if (answers.contribute === true) {
      answers.contribute =
        "Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please see linked contributor code of conduct. https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md";
    } else {
      answers.contribute = "We don't want contributors at this time.";
    }

    if (answers.license === "MIT") {
      answers.license = "[MIT](https://choosealicense.com/licenses/mit/)";
    } else if (answers.license === "GNU GPLv3") {
      answers.license =
        "[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)";
    } else if (answers.license === "Apache License 2.0") {
      answers.license =
        "[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)";
    } else {
      ("[ISC](https://choosealicense.com/licenses/isc/)");
      }

    const READMEPageContent = generateREADME(answers);

    fs.writeFile("README.md", READMEPageContent, (err) =>
      err ? console.log(err) : console.log("Successfully created README.md!")
    );
  });
