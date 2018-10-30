import pandas as pd

#filename
file_name = [
  "../11:6:2018-General-Election-SCC-Board-of-Education-candidates/SCC-Board-of-Education-Area-2-candidates/KathleenKing-E-Expenditures-10302018.xls"
]

# read the file
excel_file = [pd.ExcelFile(name) for name in file_name]

# turn the excel_file into dataframes
frames = [x.parse(x.sheet_names[0], header=None,index_col=None) for x in excel_file]

# convert to JSON
[df.to_json("../json-11-6-2018-General-Election-SCC-Board-of-Education-candidates/Kathleen_King-E-Expenditures-data.json",orient="table") for df in frames]
