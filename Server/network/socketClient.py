from socket import *


class socketClient:

    def __init__(self):
        self.clientSock = socket(AF_INET, SOCK_STREAM)
        
    def connect(self):
        self.clientSock.connect(('127.0.0.1', 8080))

    def send(self):
        print('연결 확인 됐습니다.')
        self.clientSock.send('I am a client'.encode('utf-8'))

        print('메시지를 전송했습니다.')

    def receive(self):
        data = self.clientSock.recv(1024)
        print('받은 데이터 : ', data.decode('utf-8'))

if __name__ == '__main__':
    csocket = socketClient()
    csocket.connect()
    csocket.send()
    
    csocket.receive()