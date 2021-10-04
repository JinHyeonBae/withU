from socket import *



class socketServer:

    def __init__(self):
        self.serverSock = socket(AF_INET, SOCK_STREAM)
        # address family '' ==  INADDR_ANY
        self.serverSock.bind(('', 8080))
        self.serverSock.listen(1)
        self.connectionSock = ""
    
    def accept(self):
        self.connectionSock, addr = self.serverSock.accept()
        print(str(addr),'에서 접속이 확인되었습니다.')

    def receive(self):
        data = self.connectionSock.recv(1024)
        print('받은 데이터 : ', data.decode('utf-8'))

    def send(self):
        self.connectionSock.send('I am a server.'.encode('utf-8'))
        print('메시지를 보냈습니다.')