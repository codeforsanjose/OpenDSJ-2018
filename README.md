# Open Disclosure San José
[![Build Status](https://travis-ci.org/codeforsanjose/OpenDSJ-2018.svg?branch=develop)](https://travis-ci.org/codeforsanjose/OpenDSJ-2018)

Inform voters about the 2018 General Election San José, California and Santa Clara County local candidates' and measures' campaign finance data. 

We want to highlight the following with data visualizations or a dashboard: 
- Who is donating the money -- individuals? PACs? 
- Are the donors from the same jurisdiction, outside of jurisdiction but in California, or live outside of California? 

This information might help voters make more informed decisions.

## Tools
- Node.js
- Express
- [React](https://reactjs.org/)

Before you run the development server, you will want to have the following installed:
- [Node.js](https://nodejs.org/en/)
- [Git for version control](https://git-scm.com/)
- [npm - which should be installed with Node](https://www.npmjs.com/get-npm)
 
## How to run the development server
1. Git clone the repository and cd the repository
2. ```cd nov_2018_code``` 
3. ```cd react-frontend```
4. ```yarn install``` or ```npm install```
5. Open a terminal and run ```yarn run server:dev``` or ```npm run server:dev```
6. Open another terminal and run ```yarn run build:dev``` or ```npm run server:dev```
7. Open ```localhost:8080``` in a browser

## How to Contribute
Please assign yourself one of "Find data" GitHub issues here:
https://github.com/codeforsanjose/OpenDSJ-2018/issues

Communicate with us on Slack (channel: #open-disclosure). 
[Join our Slack](https://slackin-c4sj.herokuapp.com/) or [Log onto our Slack](https://codeforsanjose.slack.com)

If you find a great source to get campaign finance data on candidates:
1. Please message the team group chat about the source you found.
2. Download the XSL/CSV files, add them to the git repository on a new branch and then create a pull request (let me know if you need help with this)
3. Extract the important information from the XSL/CSV files you found by extracting the important information to another XSL/CSV

## Made with <3 by Code for San José