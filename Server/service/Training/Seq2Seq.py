from Server.Training.Decoder import Decoder
from Server.Training.Encoder import Encoder

from keras import models
from keras import layers
from keras import optimizers, losses, metrics
from keras import preprocessing
from tensorflow.keras.models import load_model

import tensorflow as tf


class Seq2Seq(tf.keras.Model):
    def __init__(self, vocab_size, embedding_dim, time_steps, start_token, end_token):
        super(Seq2Seq, self).__init__()
        self.start_token = start_token
        self.end_token = end_token
        self.time_steps = time_steps
        
        self.encoder = Encoder(vocab_size, embedding_dim, time_steps)
        self.decoder = Decoder(vocab_size, embedding_dim, time_steps)
        
    # seq2seq를 부를 경우
    def call(self, inputs, training=True):
        if training:
            encoder_inputs, decoder_inputs = inputs
            # (attention) encoder 출력 값 수정
            encoder_outputs, context_vector = self.encoder(encoder_inputs)
            # (attention) decoder 입력 값 수정
            decoder_outputs, _, _ = self.decoder((encoder_outputs, decoder_inputs), initial_state=context_vector)
            return decoder_outputs
        else:
            x = inputs
            # (attention) encoder 출력 값 수정
            encoder_outputs, context_vector = self.encoder(x)
            target_seq = tf.constant([[self.start_token]], dtype=tf.float32)
            results = tf.TensorArray(tf.int32, self.time_steps)
            
            for i in tf.range(self.time_steps):
                decoder_output, decoder_hidden, decoder_cell = self.decoder((encoder_outputs, target_seq), initial_state=context_vector)
                decoder_output = tf.cast(tf.argmax(decoder_output, axis=-1), dtype=tf.int32)
                decoder_output = tf.reshape(decoder_output, shape=(1, 1))
                results = results.write(i, decoder_output)
                
                if decoder_output == self.end_token:
                    break
                    
                target_seq = decoder_output
                context_vector = [decoder_hidden, decoder_cell]
                
            return tf.reshape(results.stack(), shape=(1, self.time_steps))
