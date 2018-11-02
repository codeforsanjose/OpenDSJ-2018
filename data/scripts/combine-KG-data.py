import pandas as pd

# filenames
file_names = [
  "../11:6:2018-General-Election-SJC-candidate-campaign-data/SJC_D9_KalenGallagher/KG_460_RecipientCommitteeCampaignStatement_01:1:2017-06:30:2017.xls",
  "../11:6:2018-General-Election-SJC-candidate-campaign-data/SJC_D9_KalenGallagher/KG_460_RecipientCommitteeCampaignStatement_01:1:2018-04:21:2018.xls",
  "../11:6:2018-General-Election-SJC-candidate-campaign-data/SJC_D9_KalenGallagher/KG_460_RecipientCommitteeCampaignStatement_04:22:2018-05:19:2018.xls",
  "../11:6:2018-General-Election-SJC-candidate-campaign-data/SJC_D9_KalenGallagher/KG_460_RecipientCommitteeCampaignStatement_05:20:2018-06:3:2018.xls",
  "../11:6:2018-General-Election-SJC-candidate-campaign-data/SJC_D9_KalenGallagher/KG_460_RecipientCommitteeCampaignStatement_06:04:2018-06:30:2018.xls",
  "../11:6:2018-General-Election-SJC-candidate-campaign-data/SJC_D9_KalenGallagher/KG_460_RecipientCommitteeCampaignStatement_07:1:2017-12:31:2017.xls",
  "../11:6:2018-General-Election-SJC-candidate-campaign-data/SJC_D9_KalenGallagher/KG_460_RecipientCommitteeCampaignStatement_07:1:2018-09:22:2018.xls",
  "../11:6:2018-General-Election-SJC-candidate-campaign-data/SJC_D9_KalenGallagher/KalenGallagher-460RecipientCommitteeCampaignStatement-FilingDate-10:25:2018-FilingPeriod-9:23:2018-10:20:2018.xls",
]

# read the files
files = [pd.ExcelFile(name) for name in file_names]

# turn the files into dataframes
frames = [x.parse(x.sheet_names[0], header=None,index_col=None) for x in files]

# delete the first row for all frames except the first
frames[1:] = [df[1:] for df in frames[1:]]

# concatenate the files
combined = pd.concat(frames)

# write it out
combined.to_excel("../combined-data-11-6-2018-General-Election-SJC-candidates/combined-KG-460.xls", header=False, index=False)
