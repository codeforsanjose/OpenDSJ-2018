# utils

This directory contains python utilities. It uses a python virtual environment for managing dependencies.

## Setting up a virtual environment

### Instructions for Mac and Unix

Go to the project's root directory:

`cd <path_to_OpenDSJ-2018>`

Create a virtual environment at the `utils` directory:

`python3 -m venv utils`

Install dependencies:

`pip install -r requirements.txt`

Activate virtual environment:

`source bin/activate`

## Unit tests

Unit tests are in `utils/unittests/` directory. To run a test, activate the virtual environment, then run the test as a python script. As in `python <test_script>`
