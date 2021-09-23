from keras import models
from keras import layers
from keras import optimizers, losses, metrics
from keras import preprocessing
from tensorflow.keras.models import load_model

import tensorflow as tf


# forward pass 정의해서 완전히 커스터마이징 된 모델을 만들 수 있음
class Encoder(tf.keras.Model):


    # layer 생성
    def __init__(self, vocab_size, embedding_dim, time_steps):
        super(Encoder, self).__init__()
        self.embedding = layers.Embedding(vocab_size, embedding_dim, input_length=time_steps, name='Embedding')
        self.dropout = layers.Dropout(0.1, name='Dropout')
        # (attention) return_sequences=True 추가
        self.lstm = layers.LSTM(64, recurrent_dropout=0.5, return_state=True, return_sequences=True, name='LSTM')
        

    # 정방향패스. 최종 hidden state를 돌려줌
    def call(self, inputs):
        x = self.embedding(inputs)
        x = self.dropout(x)

        print(x)
        x, hidden_state, cell_state = self.lstm(x)
        # (attention) x return 추가
        return x, [hidden_state, cell_state]

