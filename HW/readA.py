import serial
import requests
import json
import base64

port = '/dev/ttyACM0'
brate = 9600 #boudrate
cmd = 'temp'
url="http://3.36.136.26:4000/setHouseInfo"

seri = serial.Serial(port, baudrate = brate, timeout = None)
print(seri.name)

seri.write(cmd.encode())

a = 1

while a:
    if seri.in_waiting != 0 :
        humi = seri.readline()
        temp = seri.readline()
        pir=seri.readline()
        print(humi[:-2].decode())
        print(temp[:-2].decode())
        print(pir[:-2].decode())
    
        datas = {
            "humidity": humi[:-2].decode('utf-8'),
            "temperature": temp[:-2].decode('utf-8')
            "PIR": pir[:-2].decode('utf-8')
        }
        
    
        response=requests.post(url,  headers={'Content-Type': 'application/json'}, data=json.dumps(datas))
        print("status code :", response.status_code)

        #a = 0


