from socket import *



class socketServer:
    
    def __init__(self):
        self.serverSock = socket(AF_INET, SOCK_STREAM)
        # address family '' ==  INADDR_ANY
        self.serverSock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
        self.serverSock.bind(('', 1129))

        self.connectionSock = ""
        self.recvData = ""
        self.mesg = ""
    
    def listen(self):
        self.serverSock.listen(1)

    def accept(self):
        self.connectionSock, addr = self.serverSock.accept()
        print(str(addr),'에서 접속이 확인되었습니다.')

    def receive(self):
        data = self.connectionSock.recv(1024)
        self.recvData = data.decode('utf-8')
        print('받은 데이터 : ', self.recvData)

    def send(self):
        print("보낸 메시지 :", self.mesg)
        self.connectionSock.send(self.mesg.encode('utf-8'))
        print('메시지를 보냈습니다.')

    def close(self):
        self.connectionSock.close()

    def get(self):
        return self.recvData

    def set(self, result):
        self.mesg = result

# if __name__ =='__main__' :
#     serverSocket = socketServer()

#     serverSocket.listen()
#     serverSocket.accept()
    
#     while True:
#         serverSocket.receive()
#         serverSocket.send()