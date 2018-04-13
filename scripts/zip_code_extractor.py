import numpy
import pprint
import pandas
import geopandas
import structlog

def run():

    logger = structlog.get_logger()
    pp = pprint.PrettyPrinter(indent=4)

    # This file has two different important columns.
    # ZCTA5CE10 is the zip code itself <str>
    # geometry is the geometric shape of the zone as a POLYGON type.
    zip_file = geopandas.read_file('cb_2017_us_zcta510_500k.shp')
    zip_file['ZIP'] = zip_file['ZCTA5CE10'].astype(numpy.int64)
    zip_file = zip_file.set_index('ZIP')
    zip_file_dictionary = zip_file.to_dict(orient='index')

    # This file should have a whole bunch of fields. The
    # interesting ones are:
    # Filer_ID: This apears to be the ID number for the Filer.
    # Tran_ID: Possibly unique ID for the individual transaction?
    # Amount: Looks like hte actual amount being paid.
    # Entity_ZIP4: Zip code?
    candidate_file = pandas.read_csv('transactionExportGrid.csv')

    zip_codes_actual = candidate_file['Entity_ZIP4'].unique()
    filer_id = candidate_file['Filer_ID'].unique()[0]

    data = []
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

    df = geopandas.GeoDataFrame(data)
    df.to_file(filename='outfile.geojson', driver='GeoJSON')
    

if __name__ == '__main__':
    run()
