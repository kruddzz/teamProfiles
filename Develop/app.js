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
const idArray = [];
const emailArray = [];
const githubArray = [];


function teamBuilder() {
  // create a function that produces manager profile
    // the function uses inquirer to ask manager questions
    // then goes to a creatTeam() function to inquire on what type of team members to add
    function createManager() {
      console.log("Build your team!");
      inquirer.prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is your manager's name?",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "You have to enter at least one character!";
          }
        },
        {
          type: "input",
          name: "managerId",
          message: "What is your manager's id?",
          validate: answer => {
            const pass = answer.match(
              /^[1-9]\d*$/
            );
            if (pass) {
              return true;
            }
            return "You have to enter positive number greater than zero!";
          }
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What is your manager's email?",
          validate: answer => {
            const pass = answer.match(
              /\S+@\S+\.\S+/
            );
            if (pass) {
              return true;
            }
            return "Enter a valid email address!";
          }
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "What is your manager's office number?",
          validate: answer => {
            const pass = answer.match(
              /^[1-9]\d*$/
            );
            if (pass) {
              return true;
            }
            return "You have to enter a positive number greater than zero!";
          }
        }
      ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        emailArray.push(answers.managerEmail);
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

      // create a funtion that presents engineer options
        // must return to createTeam() function when done with answers
        function addEngineer() {
          inquirer.prompt([
            {
              type: "input",
              name: "engineerName",
              message: "What is your engineer's name?",
              validate: answer => {
                if (answer !== "") {
                  return true;
                }
                return "You have to enter at least one character!";
              }
            },
            {
              type: "input",
              name: "engineerId",
              message: "What is your engineer's id?",
              validate: answer => {
                const pass = answer.match(
                  /^[1-9]\d*$/
                );
                if (pass) {
                  if (idArray.includes(answer)) {
                    return "ID already taken. Enter a different number!";
                  } else {
                    return true;
                  }
                              
                }
                return "You have to enter a positive number greater than zero!";
              }
            },
            {
              type: "input",
              name: "engineerEmail",
              message: "What is your engineer's email?",
              validate: answer => {
                const pass = answer.match(
                  /\S+@\S+\.\S+/
                );
                if (pass) { 
                  if (emailArray.includes(answer)) {
                  return "Email already used. Please enter a different email!";
                } else {
                  return true;
                }
              }
                return "Please enter a valid email address!";
              }
            },
            {
              type: "input",
              name: "engineerGithub",
              message: "What is your engineer's GitHub username?",
              validate: answer => {
                if (answer !== "") {
                  if (githubArray.includes(answer)) {
                    return "GitHub username already used. Please enter a different GitHub username!";
                  } else {
                  return true;
                }
              }
                return "You have to enter at least one character!";
              }
            }
          ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            emailArray.push(answers.engineerEmail);
            githubArray.push(answers.engineerGithub);
            createTeam();
          });      
        } 
      // create an addIntern() function
        // must present intern questions
        // must return to create team() function when done with answers
        function addIntern() {
          inquirer.prompt([
            {
              type: "input",
              name: "internName",
              message: "What is your intern's name?",
            },

            {
              type: "input",
              name: "internId",
              message: "What is your intern's id?",
            },
            
            {
              type: "input",
              name: "internEmail",
              message: "What is your intern's email?",
              
            },

            {
              type: "input",
              name: "internSchool",
              message: "What is your intern's school?",
            }
            
          ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            // push the intern info to the teamMembers array
            teamMembers.push(intern);
            createTeam();
          });
        }

      // create a buildTeam(function)
        // function must create an output diectory folder if it already doesn't exist
        // writes the teamMembers array in a html file and renders it to the appropriate areas on the html
      function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
          }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
        }
      
  // initializes the create manager function
  createManager();
}

// initialize program
teamBuilder ();
