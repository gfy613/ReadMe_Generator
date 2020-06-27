const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your Github Username?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?"
    },
    {
      type: "input",
      name: "project",
      message: "What is your project's name?"
    },
    {
      type: "input",
      name: "description",
      message: "Please write a short description of your project?"
    },
    {
      type: "checkbox",
      name: "license",
      choices: ['Apache License 2.0', 'GNU LGPLv3', 'GNU AGPLv3', 'MIT License'],
      message: "What kind of license should your project have?"
    },
    {
      type: "input",
      name: "contributors",
      message: "Who is Contributing?"
    },
    {
      type: "input",
      name: "test",
      message: "What tests did you run?"
    },
    {
      type: "input",
      name: "comment",
      message: "Is there anything you want a user to know before running your project?"
    },
    {
      type: "input",
      name: "questions",
      message: "Do you have any Questions?"
    }
  ]);
}

function generateReadMe(answers) {
  return `

 # ${answers.project.toUpperCase()}


 ## TABLE OF CONTENTS:
 * [USER INFO](#USERINFO)
 * [CONTRIBUTORS](#CONTRIBUTORS)
 * [PROJECT DESCRIPTION](#PROJECTDESCRIPTION)
 * [LICENSE](#LICENSE)
 * [TESTING](#TESTING)
 * [COMMENTS](#COMMENTS)
 * [QUESTIONS](#QUESTIONS)

 
 ## USER INFO
  USERNAME: ${answers.username.toUpperCase()}
  USER EMAIL: ${answers.email}

 ## CONTRIBUTORS:
 ${answers.contributors}


 ## PROJECT DESCRIPTION:
 ${answers.description}

 ## LICENSE:
 ${answers.license}

 ## TESTING:
 ${answers.test}

 ## COMMENTS:
 ${answers.comment}

 ## QUESTIONS:
 ${answers.questions}

![badmath](https://img.shields.io/github/languages/top/gfy613/code_quiz)


 `;
}

promptUser()
  .then(function(answers) {
    const readMe = generateReadMe(answers);

    return writeFileAsync("README.md", readMe);
  })
  .then(function() {
    console.log("Successfully wrote to readMe.md");
  })
  .catch(function(err) {
    console.log(err);
  });
