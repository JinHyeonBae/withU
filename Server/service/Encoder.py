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
sys.path.append('/home/jetson/Desktop')


use_cuda = torch.cuda.is_available()

MAX_LENGTH = 50



class EncoderRNN(nn.Module):
    def __init__(self, input_size, hidden_size):
        super(EncoderRNN, self).__init__()
        self.hidden_size = hidden_size
        
        self.embedding = nn.Embedding(input_size, hidden_size)
        self.gru = nn.GRU(hidden_size, hidden_size)
        
    def forward(self, input, hidden):
        embedded = self.embedding(input).view(1, 1, -1)
        output = embedded
        output, hidden = self.gru(output, hidden)
        return output, hidden
    
    def initHidden(self):
        result = Variable(torch.zeros(1,1, self.hidden_size))
        if use_cuda:
            return result.cuda()
        else:
            return result