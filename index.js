const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your Github Username"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address"
    },
    {
      type: "input",
      name: "project",
      message: "What is your project's name"
    },
    {
      type: "input",
      name: "description",
      message: "Please write a short description of your project"
    },
    {
      type: "input",
      name: "license",
      message: "What kind of license should your project have"
    },
    {
      type: "input",
      name: "contributors",
      message: "Who is Contributing"
    },
    {
      type: "input",
      name: "test",
      message: "What are you testing"
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
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });
