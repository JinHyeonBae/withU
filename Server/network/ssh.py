import paramiko, time
import socket
import traceback

from paramiko import transport

from paramiko.client import AutoAddPolicy


#path = "C:\\Users\\BJH\\.ssh\\JH_hanium_pre.pem"
webpath = "C:\\Users\\BJH\\.ssh\\web_RSA_puttygen.pem"

clientPath = 'C:/Users/BJH/Desktop/21_withU/App/Server/index.js'
serverPath = '/home/ec2-user/AppServer/index.js'
fileName =  'flaskr.py'

class ssh:

    def __init__(self):
        self.ssh_client = paramiko.SSHClient()
        self.key = paramiko.RSAKey.from_private_key_file(webpath)
        self.ssh_client.set_missing_host_key_policy(AutoAddPolicy())
        self.userSentence = ""

    def connect(self):
        self.ssh_client.connect(hostname='14.44.60.129', username='jetson', pkey=self.key, port=824)
        print("connected")
    
    def set(self, data):
        self.userSentence = data

    def get(self):
        return self.userSentence

    def waitStrems(chan): 
        time.sleep(1) 
        outdata = errdata = "" 
        while chan.recv_ready(): 
            outdata += str(chan.recv(1000))      
        while chan.recv_stderr_ready(): 
            errdata += str(chan.recv_stderr(1000)) 

        return outdata, errdata
    
    # 파일로 하자
    def send(self):
        data = self.get()

        channel = self.ssh_client.invoke_shell()
        channel.settimeout(9999)

        channel.send(f"echo {data} > question.txt")
        outdata, errdata = self.waitStrems(channel)
        print(outdata)

        channel.send("python printing.py\n")
        status='Normal'
        while status!='End':
            time.sleep(1)
            resp = str(channel.recv(9999))
            print(resp)
            if resp.count('termination')>0:
                status='End'

        print('Thank you!')
        

    def close(self):
        self.ssh_client.close()



if __name__ == '__main__':

    try:
        key = paramiko.RSAKey.from_private_key_file(webpath)
        _transport = paramiko.Transport(('3.36.126.196', 22))
        _transport.connect(username='jetson', pkey=key)

        sftp = paramiko.SFTPClient.from_transport(_transport)

        sftp.put(clientPath,serverPath)
    except Exception as e:
        print(traceback.format_exc())

    finally:
        sftp.close()
        _transport.close()