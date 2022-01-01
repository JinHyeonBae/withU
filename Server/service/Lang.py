





class Lang :
    def __init__(self, name):
        self.name = name
        self.word2index = {}
        self.index2word = {}
        self.word2count = {0: "SOS", 1: "EOS", 2:"UNKNOWN"}
        self.n_words = 3 #count SOS and EOS and UNKWON
      
    # tokenizer 말고 차라리 처음처럼 띄어쓰기로 하는 게 더 나은듯
     # 띄어쓰기로 만든.. tokenizer로 바꾸자
    def addSentence(self, sentence):
        for word in sentence.split(' '):
            self.addWord(word)
    
    
    def addWord(self, word):
        if word not in self.word2index:
            self.word2index[word] = self.n_words
            self.word2count[word] = 1
            self.index2word[self.n_words] = word
            self.n_words += 1
        else:
            self.word2count[word] += 1
