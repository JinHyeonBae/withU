from __future__ import unicode_literals, print_function, division
from io import open
import pandas as pd

import torch
import torch.nn as nn
from torch.autograd import Variable
from torch import optim
import torch.nn.functional as F
# import konlpy

# from konlpy.tag import Mecab
# tokenizer = Mecab()

import pickle
import sys
import traceback
sys.path.append('/home/jetson/Desktop/')

from Server.service.Decoder import AttnDecoderRNN
from Server.service.Encoder import EncoderRNN
from Server.service.Lang import Lang

use_cuda = torch.cuda.is_available()

MAX_LENGTH = 50


SOS_token = 0
EOS_token = 1
UNKNOWN_token = 2




class evaluation:


    def __init__(self):
        self.input_lang = Lang('input')
        self.output_lang = Lang('output')
        self.encoder = torch.load('/home/jetson/Desktop/Server/service/data/no_tokenizer_50000_en.pt')
        self.decoder = torch.load('/home/jetson/Desktop/Server/service/data/no_tokenizer_50000_de.pt')


    def read(self):
        with open ('/home/jetson/Desktop/Server/service/data/encoder.pickle', 'rb') as fw:
            self.input_lang = pickle.load(fw)
        with open("/home/jetson/Desktop/Server/service/data/decoder.pickle", "rb") as fw:
            self.output_lang = pickle.load(fw)


    def indexesFromSentence(self, lang, sentence):
        return [lang.word2index[word] for word in sentence.split(' ')]


    def variableFromSentence(self, lang, sentence):
        indexes = self.indexesFromSentence(lang, sentence)
        indexes.append(EOS_token)
        result = Variable(torch.LongTensor(indexes).view(-1,1))
        if use_cuda:
            return result.cuda()
        else:
            return result


    def evaluate(self, encoder, decoder, sentence, max_length=MAX_LENGTH):
        input_variable = self.variableFromSentence(self.input_lang, sentence)
        input_length = input_variable.size()[0]
        encoder_hidden = encoder.initHidden()
        
        encoder_outputs = Variable(torch.zeros(max_length, encoder.hidden_size))
        encoder_outputs = encoder_outputs.cuda() if use_cuda else encoder_outputs
        
        for ei in range(input_length):
            encoder_output, encoder_hidden = encoder(input_variable[ei], encoder_hidden)
            encoder_outputs[ei] = encoder_outputs[ei] + encoder_output[0][0]
            
        decoder_input = Variable(torch.LongTensor([[SOS_token]])) #SOS
        decoder_input = decoder_input.cuda() if use_cuda else decoder_input
        
        decoder_hidden = encoder_hidden
        
        decoded_words = []
        decoder_attentions = torch.zeros(max_length, max_length)
        
        for di in range(max_length):
            decoder_output, decoder_hidden, decoder_attention = decoder(decoder_input, decoder_hidden, encoder_outputs)
            decoder_attentions[di] = decoder_attention.data
            topv, topi = decoder_output.data.topk(1)
            ni = topi.item()
       
            if ni == EOS_token:
                decoded_words.append('<EOS>')
                break
            else:
                decoded_words.append(self.output_lang.index2word[ni])
            
            decoder_input = Variable(torch.LongTensor([[ni]]))
            decoder_input = decoder_input.cuda() if use_cuda else decoder_input
            
        return decoded_words, decoder_attentions[:di +1]


    def evaluated(self, inp):
        for i in range(1):
            output_words, attentions = self.evaluate(self.encoder, self.decoder , inp)
            output_sentence = ' '.join(output_words)
            output_sentence = output_sentence.replace("<EOS>", "")
            print("생성된 메시지 :", output_sentence)
            return output_sentence

if __name__ == '__main__':
    try:
        eval = evaluation()
        eval.read()
        inp = "자식이 내 마음을 몰라줘"
        print(type(inp))
        eval.evaluated(inp)
        
    except Exception as e :
        print("e :", e.args)
        print("error name:",type(e).__name__)
        print(traceback.format_exc())