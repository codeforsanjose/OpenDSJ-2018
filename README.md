# OpenDSJ-2018
This is a project to look at campaign contributions and participations in elections in the City of San Jose.

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
