import pandas as pd

def xls_to_csv(xls_path, dest_path):
    """
    Convert an xls file to csv.

    @param String xls_path: path to xls file
    @param String dest_path: full path of the converted csv
    """
    data_xls = pd.read_excel(xls_path, 0, index_col=None)
    data_xls.to_csv(dest_path, encoding='utf-8')
