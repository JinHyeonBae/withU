# CRUD가 이뤄지는 규칙
# view 혹은 controller에 대한 정보 가지면 x

from .dbConnection import dbConnection
from ..service.manufactor import manufacture

class findData :

    def __init__(self):
        self.sentimental = "알 수 없음"
        self.connection = dbConnection().db

    def emotion(self, user_word):
        print(self)
        print("enter")
        collectionList = list(self.connection.list_collection_names())
        
        lemma = manufacture(user_word)
        for _list in collectionList:
            for lem in lemma:
                result = list(self.connection.get_collection(_list).find({'synonyms' : lem}))
                print("result :",result)
                if(result != []):
                    self.sentimental = _list
        
        # 현재 사용자의 감정
    
        return self.sentimental
