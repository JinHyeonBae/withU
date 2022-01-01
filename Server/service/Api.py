from bs4 import BeautifulSoup as bs

import requests
import json
import uuid
import os



class Weather:

    def __init__(self):
        self.response = ""

        self.address = ""

    def getUser():
        requests.post('http://3.36.136.26:4000/getAddr')

    def crawling(self):
        html = requests.get('https://search.naver.com/search.naver?sm=top_hty&fbm=0&ie=utf8&query='+address+' 날씨')

        #html를 text로 변환 요청
        soup = bs(html.text, 'html.parser')
        data1 = soup.find('div', {'class' : 'weather_box'})
        find_address = data1.find('span', {'class':'btn_select'}).text
        print('현재 위치: '+find_address)

        find_currenttemp = data1.find('span',{'class': 'todaytemp'}).text
        print('현재 온도: '+find_currenttemp+'℃')

    def set(self, data):
        self.response = data 