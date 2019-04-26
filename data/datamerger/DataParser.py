from pathlib import Path
import pandas as pd

#go to path and grab all excel files
excelFiles = list(Path("primary652018thesiliconvalleyorganizationpacgeneralpurposesupportballotmeasure").glob("*.xls"))
maindf = pd.DataFrame()

#adding data to maindf
for items in excelFiles:
    tempdf = pd.read_excel(items)
    maindf = pd.concat([maindf, tempdf])

#filtering only by F496P3
filterdf = maindf.loc[maindf['Form_Type'] == 'A']
maindf = filterdf[['Entity_Nam L', 'Tran_Date', 'Amount']]
maindf.to_csv('worksofar.csv', index=False)

