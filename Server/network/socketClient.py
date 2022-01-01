
from socket import *
import traceback

class socketClient:

    def __init__(self):
        self.clientSock = socket(AF_INET, SOCK_STREAM)
        
    def connect(self):
        self.clientSock.connect(('jetson nano ip', 1129))

    def send(self, data):
        print('연결 확인 됐습니다.')
        # 여기에 
        try:
            self.clientSock.send(data.encode('utf-8'))
            print('메시지를 전송했습니다.')
        except IOError as e:
            print(traceback.format_exc())

    def receive(self):
        data = self.clientSock.recv(1024)
        print('받은 데이터 : ', data.decode('utf-8'))



# receive()하지 않아도 넘어가야 함
if __name__ == '__main__':
    csocket = socketClient()
    csocket.connect()

    for i in range(100):
        print(i)
        print("connect!")
        a = input()
        csocket.send(a)
        csocket.receive()    

