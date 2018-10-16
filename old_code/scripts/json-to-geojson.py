#! usr/bin/env python

from sys import argv
from os.path import exists
import simplejson as json 

# To run the JSON --> GeoJSON converter, run the script in the command-line using 

#     $ python json-to-geojson.py input_file.json output_file.json


script, in_file, out_file = argv

data = json.load(open(in_file))

geojson = {
    "type": "FeatureCollection",
    "features": [
    {
        "type": "Feature",
        "geometry" : {
            "type": "Point",
            "coordinates": [d["lon"], d["lat"]],
            },
        "properties" : d,
     } for d in data]
}


output = open(out_file, 'w')
json.dump(geojson, output)

print geojson