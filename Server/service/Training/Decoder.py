from keras import models
from keras import layers
from keras import optimizers, losses, metrics
from keras import preprocessing
from tensorflow.keras.models import load_model

import tensorflow as tf


class Decoder(tf.keras.Model):
    def __init__(self, vocab_size, embedding_dim, time_steps):
        super(Decoder, self).__init__()
        self.embedding = layers.Embedding(vocab_size, embedding_dim, input_length=time_steps, name='Embedding')
        self.dropout = layers.Dropout(0.1, name='Dropout')
        self.lstm = layers.LSTM(embedding_dim = 64, 
                        recurrent_dropout=0.5, 
                        return_state=True, 
                        return_sequences=True, 
                        name='LSTM'
                        )
        # attention은 모든 hidden state를 넘겨준다.                
        self.attention = layers.Attention(name='Attention')
        self.dense = layers.Dense(vocab_size, activation='softmax', name='Dense')
    
    def call(self, inputs, initial_state):
        # (attention) encoder_inputs 추가
        encoder_inputs, decoder_inputs = inputs
        # x로 처리 가능?
        x = self.embedding(decoder_inputs)
        x = self.dropout(x)
        x, hidden_state, cell_state = self.lstm(x, initial_state=initial_state)
        
        # (attention) key_value, attention_matrix 추가
        # 이전 hidden_state의 값을 concat으로 만들어 vector를 생성합니다.        
        key_value = tf.concat([initial_state[0][:, tf.newaxis, :], x[:, :-1, :]], axis=1)        
        # 이전 hidden_state의 값을 concat으로 만든 vector와 encoder에서 나온 출력 값들로 attention을 구합니다.
        attention_matrix = self.attention([key_value, encoder_inputs])
        # 위에서 구한 attention_matrix와 decoder의 출력 값을 concat 합니다.
        x = tf.concat([x, attention_matrix], axis=-1)
        
        x = self.dense(x)
        return x, hidden_state, cell_state