
from keras import models
from keras import layers
from keras import optimizers, losses, metrics
from keras import preprocessing
from keras.callbacks import ModelCheckpoint
from tensorflow.keras.models import load_model

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
import re
import time
import sys
#sys.path.append('/content/drive/MyDrive/AI')

print(os.getcwd())
from konlpy.tag import Okt

from Training.Preprocessing import Preprocessing
from Training.Seq2Seq import Seq2Seq



# # 태그 단어
# PAD = "<PADDING>"   # 패딩
# STA = "<START>"     # 시작
# END = "<END>"       # 끝
# OOV = "<OOV>"       # 없는 단어(Out of Vocabulary)

# 태그 인덱스
PAD_INDEX = 0
STA_INDEX = 1
END_INDEX = 2
OOV_INDEX = 3

# 데이터 타입
ENCODER_INPUT  = 0
DECODER_INPUT  = 1
DECODER_TARGET = 2

# 한 문장에서 단어 시퀀스의 최대 개수
max_sequences = 30
# 임베딩 벡터 차원
embedding_dim = 100
# LSTM 히든레이어 차원
lstm_hidden_dim = 128

time_steps = 10

# 모든 자연어 처리를 하는 곳으로 단어 사전
class NLP:

    def __init__(self):

        self.train_data = pd.read_csv('/content/drive/My Drive/AI/old_train.csv', sep='\t', engine='python', encoding='utf-8', error_bad_lines=False)
        self.train_question = self.train_data['person'][:2000]
        self.train_answer = self.train_data['response'][:2000]

        self.preprocessing = Preprocessing()
        #self.seq = Seq2Seq()

    def append(self):
        self.preprocessing.append(self.train_question, self.train_answer)

    def preprocess(self):
        questions, answer_in, answer_out = self.preprocessing.preprocess()
        return questions, answer_in, answer_out

    def tokenizer(self, all_sentences):
        self.preprocessing.tokenify(all_sentences)

    def substitution(self, questions,answer_in,answer_out):
        question_sequence, answer_in_sequence, answer_out_sequence = self.preprocessing.substitution(questions,answer_in,answer_out)
        return question_sequence, answer_in_sequence, answer_out_sequence

    def sequence_pad(self, questions,answer_in,answer_out):
        question_padded,answer_in_padded,answer_out_padded = self.preprocessing.sequence_pad(questions,answer_in,answer_out)
        return question_padded,answer_in_padded,answer_out_padded

    def len(self):
        pass

    def convert_to_one_hot(self, answer_in_padded, answer_out_padded, vocab_size):
        _in = self.preprocessing.convert_to_one_hot(answer_in_padded,vocab_size)
        _out = self.preprocessing.convert_to_one_hot(answer_out_padded,vocab_size)

        return _in,_out

    def convert_index_to_text(self, results, end_tag):
        sentence = self.preprocessing.convert_index_to_text(results, end_tag)

        return sentence

    def attach(self, a,b,c):        
        return ' '.join(a)+' '.join(' ')+' '.join(b)+' '.join(' ')+' '.join(c) 

    def make_prediction(self,model, question_inputs):
        results = model(inputs=question_inputs, training=False)
        # 변환된 인덱스를 문장으로 변환
        results = np.asarray(results).reshape(-1)
        return results

    def getToken(self):
      START_TOKEN,END_TOKEN = self.preprocessing.getToken()
      return START_TOKEN,END_TOKEN

if __name__ == '__main__':

    nlp = NLP()
    nlp.append()

    questions, answer_in, answer_out = nlp.preprocess()

    print("q :",type(questions))
    print("a_i :",type(answer_in))
    print("a_o :",type(answer_out))
    
    all_sentence = questions + answer_in +answer_out

    vocab_size = len(set(all_sentence))

    nlp.tokenizer(all_sentence)

    question_sequence, answer_in_sequence, answer_out_sequence = nlp.substitution(questions,answer_in,answer_out)

    print("q :",type(question_sequence))
    print("a_i :",type(answer_in_sequence))
    print("a_o :",type(answer_out_sequence))

    #seq_sentences = nlp.attach(question_sequence, answer_in_sequence, answer_out_sequence)

    question_padded,answer_in_padded,answer_out_padded = nlp.sequence_pad(question_sequence, answer_in_sequence, answer_out_sequence)

    # 출력 형식은 원핫
    answer_in_one_hot, answer_out_one_hot = nlp.convert_to_one_hot(answer_in_padded,answer_out_padded, vocab_size)

    STA, END = nlp.getToken()

    seq2seq = Seq2Seq(vocab_size, embedding_dim, time_steps, STA, END)
    seq2seq.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['acc'])

    checkpoint_path = 'model/training_checkpoint-6.ckpt'
    checkpoint = ModelCheckpoint(filepath=checkpoint_path, 
                             save_weights_only=True,
                             save_best_only=True, 
                             monitor='loss', 
                             verbose=1
                            ) 

    for epoch in range(35):
        seq2seq.fit([question_padded, answer_in_padded],
                    answer_out_one_hot,
                    epochs=10,
                    batch_size=8, 
                    callbacks=[checkpoint]
                )
        # 랜덤한 샘플 번호 추출
        samples = np.random.randint(len(questions), size=10)

        # 예측 성능 테스트
        for idx in samples:
            question_inputs = question_padded[idx]
            # 문장 예측
            results = nlp.make_prediction(seq2seq, np.expand_dims(question_inputs, 0))
            
            # 변환된 인덱스를 문장으로 변환
            results = nlp.convert_index_to_text(results, END)
            
            print(f'Q: {questions[idx]}')
            print(f'A: {results}\n')
            print()
        
        





