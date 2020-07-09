const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Variables
const teamMembers = [];

function teamBuilder() {
    function createManager() {
      console.log("Build your Team!!");
      inquirer.prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is your manager's name?",
        },

        {
          type: "input",
          name: "managerId",
          message: "What is your manager's id?",
          
        },

        {
          type: "input",
          name: "managerEmail",
          message: "What is your manager's email?",
        },

        {
          type: "input",
          name: "managerOfficeNumber",
          message: "What is your manager's office number?",
         
        }
      ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        teamMembers.push(manager);
        // calls a function to create a team
        createTeam();
      });
    }

    // create a function to create rest of team
      // function must also take user to appropriate class for next set of questions
      function createTeam() {

        inquirer.prompt([
          {
            type: "list",
            name: "memberChoice",
            message: "Which type of team member would you like to add?",
            choices: [
              "Engineer",
              "Intern",
              "No more Team Members"
            ]
          }
          // use a switch statement to perform proper action based on user choice
        ]).then(userChoice => {
          switch(userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
          }
        });
      }


  // initializes the create manager function
  createManager();
}

// initialize program
teamBuilder ();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
