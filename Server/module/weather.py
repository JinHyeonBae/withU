import requests
from bs4 import BeautifulSoup as bs

def crawling(address):
    html = requests.get('https://search.naver.com/search.naver?sm=top_hty&fbm=0&ie=utf8&query='+address+' 날씨')

    #html를 text로 변환 요청
    soup = bs(html.text, 'html.parser')
    data1 = soup.find('div', {'class' : 'weather_box'})
    find_address = data1.find('span', {'class':'btn_select'}).text
    print('현재 위치: '+find_address)

    find_currenttemp = data1.find('span',{'class': 'todaytemp'}).text
    print('현재 온도: '+find_currenttemp+'℃')

    