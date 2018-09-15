# OpenDSJ-2018
Campaign finance data should be easy to access, and simple to understand. The goal of this project is to help San José, California voters make more informed decisions by understanding local candidates' campaign contributions.

## Why Open Disclosure?
The goal of this web app is to help inform voters about local candidates' campaign contributions. Our previous web app outlined raw information about the 2014 San José California Mayoral race contributions. The app displays a heat map that visualizes the source of contributions--were candidates getting their donations from local or external donors? This app was inspired by opendisclosure.io. 

Ask: We need help to get the project to the next level, with updated 2018 data, and two formats: data visualization AND dashboard. This should be completed ASAP before the November 2018 election (October 2018 would be ideal, so there is still time to publicize the web app/map visualization tool to the public *before* the November 2018 election).

Why does this matter? Campaign finance information is public information. However, it's difficult to access the data and to make sense of the data.  

## How to Contribute
Check out the GitHub issues, view the [Project onboarding document and Roadmap](https://docs.google.com/document/d/1MqNJvUsFl7uOKNnHXM6VDQi0RmF-bKhCz9fZYq1ROm4/edit?usp=sharing) and join our [Code for San Jose Slack](https://slackin-c4sj.herokuapp.com/) channel #open-disclosure. Ping myra or psithara on our Slack. 

### Generating a geoJSON file for the candidate
The following python packages are required for running the zip_code_extractor file.
```
>>> conda install geopandas
>>> conda install structlog
```
Once the installations are complete, try running the python file using the following command.
```
python zip_code_extractor.py --input ../input/ --zip_data ../../cb_2017_us_zcta510_500k/cb_2017_us_zcta510_500k.shp
```
