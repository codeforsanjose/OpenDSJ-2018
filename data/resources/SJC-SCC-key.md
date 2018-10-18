# Key for files downloaded for SJC and SCC candidates and measures
This key is from the [Santa Clara County Public Portal for Campaign Finance Disclosure](https://public.netfile.com/pub2/?aid=SCC&AspxAutoDetectCookieSupport=1) for bulk export files from that portal. 
Some of the files we retrieve will be from the SJC campaign data portal (hosted by South Tech Hosting). 

Since we are looking at the same files, Form 460, to get information about the candidate/measure/committee's expenses, loans, and contributions (donations received), we should be able to reference this key for files retrieve from SJC campaign data portal and SCC campaign data portal. 

However, some of the headers may not exist in the SJC files, but will exist in the SCC files (since this key was made for the SCC export files). Hopefully this key will help others interpret the data we are combining and analyzing.
(Source)[https://public.netfile.com/pub2/docs/Export_FAQ.txt]

## Export FAQ 
The "Export E-Filed FPPC Form 460 - 496 - 497 - 461 - 465 transactions by year to Excel" download
contains the e-filed transactions within the year selected from the drop-down. It is important to 
note the download covers the transactions in that year and not for filings in that year. Transactions
from Paper filings will not be represented here.

Each transaction in a specific filing will have a unique transaction ID which should be the same 
for the life of that transaction. If that filing is amended, the transaction ID should be the same 
in the amended version. The transaction ID is assigned by the vendor who provided the e-filing 
to the free e-filing system. Since the free e-filing system can accept a valid e-filing from any 
third party software provider, the data contained in the e-filing may be valid in its data layout,
but contain errors in the disclosed information. It is up to each filer to verify their filing is 
correct, both in data layout and in disclosed information, before e-filing. 

"Export Amended" contains the most recent versions of a filed transaction. It will only show the 
latest version of that transaction and not the previous iteration of the transaction. So if an
original filing contained a transaction, then an amendment to that original filing was filed,
only the amended version of the transaction will be shown.

"Export All" contains the original and amended versions of the transaction. Unlike the export 
amended report above, the Export All will show all transactions from the original filing as well
as the amended report.

Each report has a separate tab at the bottom of the page for each of the transaction types for 
the FPPC Forms that are e-filed: FPPC forms 460 (Summary page, schedules, A, B1, B2, C, D, E, 
F, G, H and I), 496, 496 part 3, 497, 465 part 3, and 461 part 5. Click each tab to see their 
respective transactions.

------------------------------------------------------------------------------------------------
Headings. The heading of each report consist of the raw e-filing data representation of the data
shown. Unless one is familiar with the CAL 2.01 e-filing specification, it may be a bit daunting
to read the data. Below is a brief description of what the headings represent. Some form types 
may contain only some of the data that other forms contain. For a complete list of all data types,
refer to the latest California Secretary of State E-Filing specifications, v2.01 from the CA SoS 
website: http://tinyurl.com/CALSPEC201
------------------------------------------------------------------------------------------------

### Filer_ID
The FPPC Filer ID associated with the filer of the report that contained the transaction.

### Filer_NamL
Name of filer of the report that contained the transaction.

### Report_Num
Sequence of the filing. 000 is an original filing, 001 is the first amendment, 002 second, etc.

### Rpt_ID_Num
Report Number on F465, F496, F497 & F498.

### Committee_Type
Three letter abbreviation describing the filer type:
*	CAO - Candidate/Office-holder (F460, F465, F470, F496, F497, F470S)
*	CTL - Controlled Committee (F460, F465, F496, F497, F410, F495)
*	RCP - Recipient Committee (F425, F450, F460, F465, F496, F497, F410, F495)
*	SMO - Slate Mailer Organization (F401, F498, F400, F402)
*	BMC - Ballot Measure Committee (F450, F460, F465, F496, F497, F410, F495)
*	MDI - Major Donor/Ind Expenditure (F461, F465, F496, F497)
	
### Rpt_Date
Date the report was created or filed.

### From_Date
If applicable, the start date of the reporting period covered by the report.

### Thru_Date
If applicable, the end date of the reporting period covered by the report.

### Date_Thru
End-date of date range for Items received (Form 497)

### Elect_Date
If applicable, the election date associated with the filer of the report.

### tblCover_Office_Cd
Office name associated with the filer on cover page of 460.

### tblCover_Offic_Dscr
Office description associated with the filer on cover page of 460.

### Rec_Type
Type of record:
*	RCPT - Receipt
*	EXPN - Expenditure
*	DEBT - Payable
*	LOAN - Loans
*	SMRY - Summary page totals
*	S496 - FPPC Form 496 transaction
*	S497 - FPPC Form 497 transaction

### Form_Type
Schedule where the transaction is found.

### Tran_ID
Unique transaction ID for the transaction.

### Entity_Cd
Type of entity the transaction is related to:
*	COM - Committee
*	RCP - Recipient Committee
*	IND - Individual
*	OTH - Other
*	PTY - Political Party
*	SCC - Small Contributor Committee

### Tran_NamL, Payee_NamL, Lndr_NamL, Enty_NamL
Last name or name on transaction.

### Tran_NamF, Payee_NamF, Lndr_NamF, Enty_NamF
First name on transaction (IND only).

### Tran_NamT, Payee_NamT, Lndr_NamT, Enty_NamT
Prefix of name on transaction (IND only).

### Tran_NamS, Payee_NamS, Lndr_NamS, Enty_NamS
Suffix of name on transaction (IND only).

### Tran_Adr1, Payee_Adr1, Loan_Adr1, Enty_Adr1
Address line #1 of entity on transaction. 
	(viewable only by obtaining report at the Kiosk of the filing authority and not on the public portal)
	
### Tran_Adr2, Payee_Adr2, Loan_Adr2, Enty_Adr2
Address line #2 of entity on transaction. 
	(viewable only by obtaining report at the Kiosk of the filing authority and not on the public portal)
	
### Tran_City, Payee_City, Loan_City, Enty_City
City of entity on transaction.

### Tran_State, Payee_State, Loan_State, Enty_State
State of entity on transaction.

### Tran_Zip4, Payee_Zip4, Loan_Zip4, Enty_Zip4
ZIP+4 of entity on transaction.

### Tran_Emp, Ctrib_Emp
Employer of IND types.

### Tran_Occ, Ctrib_Occ
Occupation of IND types.

### Tran_Self, Ctrib_Self
Is entity self employed? Y or N.

### Tran_Type
	Transaction Type:
*	F = Forgiven Loan
*	I = Intermediary
*	R = Returned (Negative Amount?)
*	T = Third Party Repayment
*	X = Transfer
	
### Expn_Code
Three character code representing expenditure types:
*	CMP - campaign paraphernalia/miscellaneous
*	CNS - campaign consultants
*	CTB - contribution
*	CVC - civic donations
*	FIL - candidate filing/ballot fees
*	FND - fundraising events
*	IND - independent expenditure supporting/opposing others
*	LEG - legal defense
*	LIT - campaign literature and mailings
*	MBR - member communications
*	MTG - meetings and appearances
*	OFC - office expenses
*	PET - petition circulating
*	PHO - phone banks
*	POL - polling and survey research
*	POS - postage, delivery and messenger services
*	PRO - professional services (legal, accounting)
*	PRT - print ads
*	RAD - radio airtime and production costs
*	RFD - returned contributions
*	SAL - campaign workers salaries
*	TEL - T.V. or cable airtime and production costs
*	TRC - candidate travel, lodging and meals
*	TRS - staff/spouse travel, lodging and meals
*	TSF - transfer between committees of the same candidate/sponsor
*	VOT - voter registration
*	WEB - information technology costs (Internet, e-mail)
	
### Tran_Date, Exp_Date, 
Date of transaction.

### Tran_Date1
Date of transfer.

### Tran_Amt1, Amount
Amount of transaction.

### Tran_Amt2, Cum_YTD
Cumulative amount received from entity shown on report.

### Tran_Dscr, Expn_Dscr
Description of transaction.

### Expn_ChkNo
Check number on expenditure.

### Beg_Bal	
Debt Outstanding balance at beginning of this period.

### Amt_Incur	
Debt Amount incurred this period.

### Amt_Paid	
Debt Amount paid this period.

### End_Bal
Debt Outstanding balance at close of this period.


### Cmte_ID
If entity is a committee, the committee ID is shown here.

### Tres_NamL
Certain types of transactions require the Treasurer Last name.

### Tres_NamF
Certain types of transactions require the Treasurer First name.

### Tres_NamT
Treasurer name Prefix.

### Tres_NamS
Treasurer name Suffix.

### Tres_Adr1
Treasurer Address line #1. 
	(viewable only by obtaining report at the Kiosk of the filing authority and not on the public portal)
	
### Tres_Adr2
Treasurer Address line #2. 
	(viewable only by obtaining report at the Kiosk of the filing authority and not on the public portal)
	
### Tres_City
Treasurer City.

### Tres_State
Treasurer State.

### Tres_Zip
Treasurer ZIP+4.

### Intr_NamL, Agent_NamL
Intermediary's/Transfer/Agent Last name.

### Intr_NamF, Agent_NamF
Intermediary's/Transfer/Agent First name.

### Intr_NamT,Agent_NamT
Intermediary's/Transfer name Prefix.

### Intr_NamS
Intermediary's/Transfer/Agent name Suffix.

### Intr_Adr1
Intermediary's/Transfer Address line #1. 
	(viewable only by obtaining report at the Kiosk of the filing authority and not on the public portal)
	
### Intr_Adr2
Intermediary's/Transfer Address line #2. 
	(viewable only by obtaining report at the Kiosk of the filing authority and not on the public portal)
	
### Intr_City
Intermediary's/Transfer City.

### Intr_State
Intermediary's/Transfer State.

### Intr_Zip4
Intermediary's/Transfer ZIP+4.

### Intr_Emp
Intermediary's/Transfer employer.

### Intr_Occ
Intermediary's/Transfer occupation.

### Intr_Self
Intermediary's/Transfer self employed? Y or N.

### Cand_NamL
Candidate Last name.

### Cand_NamF
Candidate First name.

### Cand_NamT
Candidate name prefix.

### Cand_NamS
Candidate name suffix.

### tblDetlTran_Office_Cd
Three letter abbreviation for Office candidate is seeking:
####  Statewide Offices
*	GOV - Governor
*	LTG - Lieutenant Governor
*	SOS - Secretary of State
*	CON - State Controller
*	ATT - Attorney General
*	TRE - State Treasurer
*	INS - Insurance Commissioner
*	SUP - Superintendent of Public Instruction
*	SPM - Supreme Court Justice

####  State District Offices
*	SEN - State Senator
*	ASM - State Assembly Person
*	BOE - Board of Equalization Member
*	PER - Public Employees Retirement System
*	APP - State Appellate Court Justice

#### City, County and Local Offices
*	ASR - Assessor
*	BED - Board of Education
*	BSU - Board of Supervisors
*	CAT - City Attorney
*	CCB - Community College Board
*	CCM - City Council Member
*	COU - County Counsel
*	CSU - County Supervisor
*	CTR - Local Controller
*	DAT - District Attorney
*	MAY - Mayor
*	PDR - Public Defender
*	PLN - Planning Commissioner
*	SHC - Sheriff-Coroner
*	SCJ - Superior Court Judge
*	TRS - Local Treasurer
* Miscellaneous / Other
*	OTH - Other

### tblDetlTran_Offic_Dscr
Description of office sought.

### Juris_Cd
Three letter abbreviation of Office Jurisdiction:
*	STW=Statewide
*	SEN=Senate District
*	ASM=Assembly District
*	BOE=Board of Equalization District
*	CIT=City
*	CTY=County
*	LOC=Local
*	OTH=Other

### Juris_Dscr
Jurisdiction description when office code is CIT, CYT, LOC or OTH.

### Dist_No
District Number for Candidate.

### Off_S_H_Cd
Office Sought or held? S or H.

### Bal_Name
Ballot measure name.

### Bal_Num
Ballot measure number.

### Bal_Juris
Ballot measure jurisdiction.

### Sup_Opp_Cd
Is Ballot measure supported or opposed? S or O.

### Memo_Code
Is this transaction a memo entry? (Only here for informational purposes and not counted toward any dollar value)? X=yes, blank=No.

### Memo_RefNo
The tran_ID of the Text file that is associated with the transaction (not shown in download, only on PDF of filing).

### BakRef_TID
Tran_ID of parent transaction of this child transaction. Generally used on intermediary types of transactions.

### XRef_SchNm
Referenced schedule where parent transaction can be found (Schedule name).

### XRef_Match
Related item on other Schedule has same Tran_ID. X=Yes, blank=No.

### Loan_Rate
Rate of loan.

### Int_CmteId
Committee Id for Transfer or Intermediary transaction (Required when Tran_Type = X).

### G_From_E_F
Schedule G transaction coming from a schedule E or F of form 460.

### EmplBus_CB
Employer / Business information included, X=Yes, blank=No.

### Bus_Name
Name of Employer / Business.

### Bus_Adr1	
Address line #2	of Employer / Business. 

### Bus_Adr2	
Address Line #2 of Employer / Business.	

### Bus_City	
City of Employer / Business.

### Bus_ST	
State of Employer / Business.

### Bus_ZIP4
ZIP+4 of Employer / Business.
	
### Bus_Inter
Interest of Employer / Business.

### BusAct_CB
Employer / Business activity included, X=Yes, blank=No.

### BusActvity
Employer / Business activity description.

### Assoc_CB
Association Interest activity included, X=Yes, blank=No.

### Assoc_Int
Association Interest description.

### Other_CB
Other entity interest included, X=Yes, blank=No.

### Other_Int
Other entity interest description.
