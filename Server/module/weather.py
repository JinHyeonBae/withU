import requests
from bs4 import BeautifulSoup as bs

def crolling(address):
    html = requests.get(
    'https://search.naver.com/search.naver?sm=top_hty&fbm=0&ie=utf8&query='+address+' 날씨'
    )

    #html를 text로 변환 요청
    soup = bs(html.text, 'html.parser')
    tmr_morning = soup.select('.morning_box > .info_temperature > .todaytemp ')
    tmr_info = soup.find_all('p', 'cast_txt')
    tmr_indicator = soup.select('.detail_box > .indicator > span')