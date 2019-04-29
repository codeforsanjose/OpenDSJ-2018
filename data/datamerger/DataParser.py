from pathlib import Path
import pandas as pd

#go to path and grab all excel files
excelFiles = list(Path("data").glob("*/*.xls"))
for paths in excelFiles:
    print(paths)
maindf = pd.DataFrame()

#adding data to maindf
for items in excelFiles:
    tempdf = pd.read_excel(items)
    maindf = pd.concat([maindf, tempdf])

#filtering only by F496P3
maindf.to_csv('ubertable.csv', index=False)
filterdf = maindf.loc[maindf['Form_Type'].isin(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'B1'])]
maindf = filterdf[['Form_Type', 'Entity_Nam L', 'Tran_Date', 'Amount']]
maindf.to_csv('filteredubertable.csv', index=False)

