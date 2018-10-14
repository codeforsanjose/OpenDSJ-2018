"""
This is a script for turning a series of input files into
a geojson object that combines their data with the data from
the US Census's census tract information.

Census Zip Code Information:
 https://www.census.gov/geo/maps-data/data/cbf/cbf_zcta.html

The Candidate information is downloaded as XLS files from:
https://www.southtechhosting.com/SanJoseCity/CampaignDocsWebRetrieval/Search/SearchByBallotItem.aspx
"""

import os
import numpy
import pandas
import os.path
import argparse
import geopandas
import structlog

def run(settings):

    logger = structlog.get_logger()

    # This file has two different important columns.
    # ZCTA5CE10 is the zip code itself <str>
    # geometry is the geometric shape of the zone as a POLYGON type.
    zip_file = geopandas.read_file(settings.zip_data)
    zip_file['ZIP'] = zip_file['ZCTA5CE10'].astype(numpy.int64)
    zip_file = zip_file.set_index('ZIP')
    zip_file_dictionary = zip_file.to_dict(orient='index')

    data = []

    for csv_file in os.listdir(settings.input):
        # This file should have a whole bunch of fields. The
        # interesting ones are:
        # Filer_ID: This apears to be the ID number for the Filer.
        # Tran_ID: Possibly unique ID for the individual transaction?
        # Amount: Looks like hte actual amount being paid.
        # Entity_ZIP4: Zip code?
        actual_path = os.path.join(settings.input, csv_file)
        candidate_file = pandas.read_csv(actual_path)

        zip_codes_actual = candidate_file['Entity_ZIP4'].unique()
        filer_id = candidate_file['Filer_ID'].unique()[0]
        
        data = process_file(zip_file_dictionary=zip_file_dictionary,
                            candidate_file=candidate_file,
                            zip_codes_actual=zip_codes_actual,
                            data=data,
                            logger=logger,
                            filer_id=filer_id,
        )

    df = geopandas.GeoDataFrame(data)
    df.to_file(filename=settings.outfile, driver='GeoJSON')

def process_file(zip_file_dictionary, candidate_file,
                 zip_codes_actual, data, logger, filer_id):
    for zip_code in zip_codes_actual:
        if zip_code not in zip_file_dictionary:
            # This is a major problem because it means
            # that the US thinks the zip code doesn't exist.
            logger.info(event='invalid zip code',
                        zip_code=zip_code,
                        zip_class=type(zip_code),
            )
            continue

        geometry = zip_file_dictionary[zip_code]['geometry']
        total = candidate_file[
            candidate_file['Entity_ZIP4'] == zip_code
        ]['Amount'].sum()
        data.append({'zip_code': zip_code,
                     'geometry': geometry,
                     'total_amount': total,
                     'filer_ID': filer_id,
        })
    return data

    

if __name__ == '__main__':

    parser = argparse.ArgumentParser(
        description='Combine zip code data and campaign contribution data'
    )
    parser.add_argument('--outfile', default='outfile.geojson', type=str,
                        help='destination GeoJSON file')
    parser.add_argument(
        '--input', type=str,
        help='Directory holding CSV files for campaign information'
    )
    parser.add_argument('--zip_data', type=str,
                        help='Input Shapefile with zip data')

    settings = parser.parse_args()

    if not settings.zip_data or not os.path.isfile(settings.zip_data):
        raise FileNotFoundError(settings.zip_data)
    if not settings.input or not os.path.isdir(settings.input):
        raise NotADirectoryError(settings.input)
    if os.path.isfile(settings.outfile):
        raise FileExistsError(settings.outfile)

    run(settings=settings)
