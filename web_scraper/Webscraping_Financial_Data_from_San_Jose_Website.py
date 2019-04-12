#!/usr/bin/env python
# coding: utf-8

# Extract excel and pdf files from https://www.southtechhosting.com/SanJoseCity/CampaignDocsWebRetrieval/Search/SearchByElection.aspx

# In[1]:


from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from time import sleep
import os,sys
from os.path import isfile,join
from os import listdir
import re
import shutil


# In[2]:


def grab_form_text(top_form_xpath,bottom_form_xpath):
    '''
    scrape information from forms and save to list to use for naming folders or files
    '''
    data = []
    data_text = []

    for row in top_form_xpath:
        data.append(row)

    if bottom_form_xpath:
        data.append(bottom_form_xpath[0])
    
    for text_path in data:
        data_text.append(text_path.text)
        
    return data_text


def downloads_done():
    '''
    recursive function that checks to see if pdf is fully downloaded before proceeding to next pdf file
    '''
    for i in os.listdir(new_path):
        if ".crdownload" in i:
            sleep(0.5)
            downloads_done()


# In[3]:


# get current working directory --> change to data directory
path = os.getcwd()
create_data_folder = os.path.join(path,"data")
if not os.path.exists(create_data_folder):
    os.makedirs(create_data_folder)
folders = os.listdir(os.getcwd())
for folder in folders:
    if os.path.join(path,folder) == create_data_folder:
        abs_file_path = os.path.join(path,folder)
        os.chdir(abs_file_path)
new_path = abs_file_path


# In[4]:


# initiate selenium chrome webdriver
options = webdriver.ChromeOptions()
# remove window/browser features (can choose to remove in order to test program)
options.add_argument('headless')
options.add_argument("--ignore-certificate-errors")
options.add_argument("--test_type")
# set download path to "data" folder created in previous step (new_path), also disable default pdf viewer (easier downloading)
prefs = {"download.default_directory":new_path,"plugins.plugins_list":[{"enabled":False,"name":"Chrome PDF Viewer"}]}
options.add_experimental_option("prefs",prefs)
driver = webdriver.Chrome(options=options)

# initiate driver and call southtech url
driver.get("https://www.southtechhosting.com/SanJoseCity/CampaignDocsWebRetrieval/Search/SearchByElection.aspx")
# wait for page to respond before applying selenium actions via xpath
try:
    WebDriverWait(driver,10).until(EC.presence_of_element_located((By.ID,'ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers_CD')))
except TimeoutException:
    print("Loading took too long.")
    
# find "submit" button and click 
driver.find_element_by_xpath('//*[@id="ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers_CD"]').click()


# In[ ]:


# this works! Clean up code and add file downloader and file mover/creator
page_track = 0
while True:
    forms = driver.find_elements_by_xpath('//a[@class="dxbButton_Glass dxgvCommandColumnItem_Glass dxgv__cci dxbButtonSys"]')
    sleep(1)
    # grab and store form text on home page
    outer_top_table_rows = driver.find_elements_by_xpath('//tr[@class="dxgvDataRow_Glass"]')
    outer_bottom_table_row = driver.find_elements_by_xpath('//tr[@class="dxgvDataRow_Glass dxgvLVR"]')
    outer_form_text = grab_form_text(outer_top_table_rows,outer_bottom_table_row)
    
    # iterate through pdf and excel files then download
    for ind,form in enumerate(forms):
        sleep(2)
        forms = driver.find_elements_by_xpath('//a[@class="dxbButton_Glass dxgvCommandColumnItem_Glass dxgv__cci dxbButtonSys"]')
        forms[ind].click()
        sleep(2)
        forms = driver.find_elements_by_xpath('//table[@class="dxgvControl_Glass dxgv"]')
        # download excel files
        excel = driver.find_elements_by_xpath('//td[@class="dxgvCommandColumn_Glass dxgv"]//img[@title="Export Transaction Details To Excel"]')
        sleep(2)
        for file in excel:
            file.click()
        sleep(2)
        # download pdf files
        pdfs = driver.find_elements_by_xpath('//td[@class="dxgvCommandColumn_Glass dxgv"]//img[@title="View Form"]')
        for ind2 in range(0,len(pdfs)):
            driver.find_elements_by_xpath('//td[@class="dxgvCommandColumn_Glass dxgv"]//img[@title="View Form"]')[ind2].click()
            sleep(3)
            # switch to pdf window
            driver.switch_to.frame(driver.find_element_by_tag_name('iframe'))
            
            # wait for new page to load before finding "Click here" element
            delay = 10
            try:
                WebDriverWait(driver,delay).until(EC.presence_of_element_located((By.LINK_TEXT,"Click here")))
            except TimeoutException:
                print("Loading took too much time...")
            # press "click here" then download pdf
            a = driver.find_element_by_link_text("Click here")
            ActionChains(driver).key_down(Keys.CONTROL).click(a).key_up(Keys.CONTROL).perform()
            sleep(3)
            # switch back to pdf window 
            driver.switch_to.default_content()
            # click heading bar of window to allow "escape" action to be performed
            driver.find_elements_by_xpath("//div[@id='ctl00_GenericPopupSizeable_InnerPopupControl_PWH-1']")[0].click()
            webdriver.ActionChains(driver).send_keys(Keys.ESCAPE).perform()
            # recursive function to check if pdf is finished downloading before proceeding to next file
            downloads_done()
            sleep(3)

        # create new folder for storing pdfs/excel files for certain group
        raw_str = outer_form_text[ind]
        clean_str = re.sub('[^A-Za-z0-9]+','',raw_str)[:175].lower()
        add_new_folder = os.path.join(new_path,clean_str)

        if not os.path.exists(add_new_folder):
            os.makedirs(add_new_folder)

        # move files to new folder
        root_src_dir = new_path
        root_dst_dir = add_new_folder
        files = [f for f in listdir(new_path) if isfile(join(new_path,f))]

        for file in files:
            shutil.move(os.path.join(new_path,file), root_dst_dir)

        # click back button
        if driver.find_elements_by_xpath('//*[@id="ctl00_DefaultContent_buttonBack"]'):
            driver.find_elements_by_xpath('//*[@id="ctl00_DefaultContent_buttonBack"]')[0].click()
        else:
            driver.find_elements_by_xpath('//*[@id="ctl00_DefaultContent_buttonBack_CD"]')[0].click()
        sleep(1)

        '''
        Modify this next section of code so that it can be applied to different site (i.e. another city using south tech hosting)
        Currently set to length of pages on site containing files (9 different pages) with the last page having only 3 files
        Want to make more robust in case file or page numbers change with site updates...
        '''
        if page_track == 8 and ind == 2:
            ind = 9 
        # hitting back button makes pages reset, need to click pages to get back to relevant files (hacky)
        if page_track > 0 and ind < 9 :
            next_page = driver.find_elements_by_xpath('//a[@class="dxp-button dxp-bi"]')
            sleep(2)
            next_page[0].click()
            sleep(2)
            num = 1
            if page_track > 1:  
                while True:
                    sleep(1)
                    next_page = driver.find_elements_by_xpath('//a[@class="dxp-button dxp-bi"]')
                    sleep(2)
                    if num != page_track:
                        next_page[1].click()
                        num+=1
                        sleep(1)
                    else:
                        break
    # iterate through pages on site (hacky)      
    page_track += 1
    next_page = driver.find_elements_by_xpath('//a[@class="dxp-button dxp-bi"]')
    if page_track < 9:
        next_page[0].click()
        if page_track > 1:
        # create function to make page clicks 
            num = 1
            while True:
                sleep(1)
                next_page = driver.find_elements_by_xpath('//a[@class="dxp-button dxp-bi"]')
                sleep(2)
                if num != page_track:
                    next_page[1].click()
                    num+=1
                    sleep(1)
                else:
                    break
            sleep(1)
    else:
        break

'''
Some possible additions to the scraper include:
1) modifying "page_track" to find max number of pages on site and to stop when max has been reached
2) last page has less files to download than other pages (causes problems if scraper applied to other sites)
3) program is really slow, figure out ways to make faster (replacing nested for loops, etc.)
4) figure out how to update files by checking files alrdy downloaded and skipping to new files and creating new folder
(problem is currently need to restart program, delete files, and start over again when faced with an error...)
5) naming pdf and excel files
'''


# In[ ]:


# def insert_file(files):
#     for ind,file in enumerate(files):
#         if files[ind] == "PdfHandler.pdf":
#             files.insert(0,files.pop(ind))
#     return files

# # # sort list of strings containing numerical values
# # def atof(text):
# #     try:
# #         retval = float(text)
# #     except ValueError:
# #         retval = text
# #     return retval

# # def natural_keys(text):
# #     return [ atof(c) for c in re.split(r'[+-]?([0-9]+(?:[.][0-9]*)?|[.][0-9]+)', text) ]


# In[ ]:


# change name of pdf files (rough outline)
# grab form text
# inner_top_table_rows = driver.find_elements_by_xpath('//tr[@class="dxgvDataRow_Glass"]')
# inner_bottom_table_row = driver.find_elements_by_xpath('//tr[@class="dxgvDataRow_Glass dxgvLVR"]')
# inner_form_text = grab_form_text(inner_top_table_rows,inner_bottom_table_row)
# onlyfiles = [f for f in listdir(new_path) if isfile(join(new_path,f))]
# save copy for later
# file_copy = onlyfiles.copy()
# change to new folder directly
#         new_folder = os.listdir(os.getcwd())
#         for folder in new_folder:
#             if os.path.join(new_path,folder) == add_new_folder:
#                 new_dir_path = os.path.join(new_path,folder)
#                 os.chdir(new_dir_path)
#                 onlyfiles = [f for f in listdir(new_dir_path) if isfile(join(new_dir_path,f))]
        
#                 # sort and place first pdf file to front of list
#                 if len(onlyfiles) > 1:
#                     onlyfiles.sort(key=natural_keys)
#                     onlyfiles = insert_file(onlyfiles)
        
# #                 # rename file names
# #                 for ind3,file in enumerate(onlyfiles):
# #                     if ind3 == 12:
# #                         break
# #                     onlyfiles[ind3] = inner_form_text[ind3] + ".pdf"
# #                     onlyfiles[ind3] = onlyfiles[ind3].replace("/","").replace("-"," ").replace(" ","")
        
#                 # rename files in new folder with modified file names
#                 file_copy.sort(key=natural_keys)

#                 file_copy = insert_file(file_copy)
    
#                 for ind4,file in enumerate(onlyfiles):
#                     os.renames(file_copy[ind4],onlyfiles[ind4])


# In[ ]:


#driver.find_elements_by_xpath('//*[@id="ctl00_DefaultContent_buttonBack"]')[0].click()


# In[ ]:


# figure out how to get all excel & pdf files from all links on home page (1-9)
# click "Back" after downloading all pdf and excel files
# Click next number page on bottom of main page to get new campaign files 
# Repeat process until all files have been downloaded

