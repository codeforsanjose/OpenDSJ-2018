import pandas as pd

# filenames
file_names = [
  "../11:6:2018-General-Election-SJC-candidate-campaign-data/SJC_D9_PamFoley/PF_460 Recipient Committee Campaign Statement 7:31:2018 6:4:2018 - 6:30:2018.xls",
  "../11:6:2018-General-Election-SJC-candidate-campaign-data/SJC_D9_PamFoley/PF_460 Recipient Committee Campaign Statement 1:31:2018 1:1:2017 - 12:31:2017.xls",
  "../11:6:2018-General-Election-SJC-candidate-campaign-data/SJC_D9_PamFoley/PF_460 Recipient Committee Campaign Statement 4:26:2018 1:1:2018 - 4:21:2018.xls",
  "../11:6:2018-General-Election-SJC-candidate-campaign-data/SJC_D9_PamFoley/PF_460 Recipient Committee Campaign Statement 5:24:2018 4:22:2018 - 5:19:2018.xls",
  "../11:6:2018-General-Election-SJC-candidate-campaign-data/SJC_D9_PamFoley/PF_460 Recipient Committee Campaign Statement 6:4:2018 5:20:2018 - 6:3:2018.xls",
  "../11:6:2018-General-Election-SJC-candidate-campaign-data/SJC_D9_PamFoley/PamFoley-460RecipientCommitteeCampaignStatement-FilingDate-10:24:2018-FilingPeriod-9:23:2018-10:20:2018.xls",
  "../11:6:2018-General-Election-SJC-candidate-campaign-data/SJC_D9_PamFoley/PamFoley-460-ARecipientCommitteeCampaignStatement-Amendment-FilingDate-10:31:2018-FilingPeriod-7:1:2018-9:22:2018.xls",
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
combined.to_excel("../combined-data-11-6-2018-General-Election-SJC-candidates/combined-PF-460.xls", header=False, index=False)
