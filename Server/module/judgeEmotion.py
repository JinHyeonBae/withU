import pymongo

client = pymongo.MongoClient("주소")
db = client.dialog


def Manufacture(sentence):
    morp = sentence['morp']
    lemma = list()

    for m in morp:
        lemma.append(m['lemma'])
    
    return lemma


def judgeEmotion(sentence):

    lemma = Manufacture(sentence)
    collectionList = list(db.list_collection_names())
    
    print("collection :",collectionList)
    for _list in collectionList:
        for lem in lemma:
            result = list(db.get_collection(_list).find({'value' : lem}))
            if(result != []):
                sentimental = _list
    
    # 현재 사용자의 감정
    print(sentimental)

    print("mongo :",db)

