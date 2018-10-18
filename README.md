# Open Disclosure San José
[![Build Status](https://travis-ci.org/codeforsanjose/OpenDSJ-2018.svg?branch=develop)](https://travis-ci.org/codeforsanjose/OpenDSJ-2018)
[![Coverage Status](https://coveralls.io/repos/github/codeforsanjose/OpenDSJ-2018/badge.svg?branch=develop)](https://coveralls.io/github/codeforsanjose/OpenDSJ-2018?branch=develop)

Inform voters about the 2018 General Election San José, California and Santa Clara County local candidates' and measures' campaign finance data. 

We want to highlight the following with data visualizations or a dashboard: 
- Who is donating the money -- individuals? PACs? 
- Are the donors from the same jurisdiction, outside of jurisdiction but in California, or live outside of California? 

This information might help voters make more informed decisions.

## Tools
- Node.js v8.30+
- Express
- [React](https://reactjs.org/)
- npm 
- yarn
- [Anaconda](https://www.anaconda.com) or [Miniconda](https://conda.io/miniconda.html)
- [Panda](https://pandas.pydata.org/)
- Python v2.7+

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

## How to run the python scripts in ```data``` folder 
Before you run the scripts:
1. Install Python
2. Install Anaconda or Miniconda
3. If you use Anaconda, ```conda install -c anaconda pandas```
4. If you use Miniconda, view [instructions here](https://pandas.pydata.org/pandas-docs/stable/install.html)
must have Python installed, and either Anaconda or Miniconda. 

After you install the necessary libraries: 
1. ```cd data/scripts```
2. ```python``` one of the files in that folder
3. If running the convert script, ```cd ../json-11-6-2018-General-Election-SJC-candidates/" to find the output file
4. If running the combine script, ```cd ../combined-data-11-6-2018-General-Election-SJC-candidates/" to find the output file

## Resources
Go to ```cd data/resources```
Use the key for questions about the data headers. The source of this key is the [Santa Clara County Public Portal for Campaign Finance Disclosure](https://public.netfile.com/pub2/?aid=SCC&AspxAutoDetectCookieSupport=1). Some of the header information in the key should apply to both SJC and SCC data for Form 460 files (the files that detail contributions, loans and expenses).

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
