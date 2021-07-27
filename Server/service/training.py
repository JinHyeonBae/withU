
import json
import pandas as pd
import openpyxl as op

from conDialogflow import connect

location = 'C:\\Users\\BJH\\Desktop\\sentimental_Dataset\\Validation\\validation_old.xlsx'

def training():

    #workbook 객체 생성
    count = 0
    wb = op.load_workbook(location)
    #worksheet 객체 생성
    ws = wb.active
    load_ws = wb['Sheet1']
    
    for cell in load_ws['I']:
        count+=1
        connect(cell.value)
        if(count is 50):
            break



training()