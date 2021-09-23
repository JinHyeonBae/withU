
import numpy as np
import warnings
import tensorflow as tf
import re
import pandas as pd

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from konlpy.tag import Okt


# WARNING 무시
warnings.filterwarnings('ignore')

MAX_LENGTH = 30

# 전처리
class Preprocessing:

    def __init__(self):
        self.tokenizer = Tokenizer(filters='', lower=False, oov_token='<OOV>')
        self.okt = Okt()
    
        self.texts = []
        self.pairs = []

    # 데이터셋 
    def append(self, question, answer):
        for q in question:
            self.texts.append(q)
        
        for a in answer:
            self.pairs.append(a)


    def tokenify(self, all_sentences):
        self.tokenizer.fit_on_texts(all_sentences)

        for word, idx in self.tokenizer.word_index.items():
            print(f'{word}\t\t => \t{idx}')
            if idx > 10:
                break


    # 추출
    def substitution(self,questions,answer_in,answer_out) :

        question_sequence = self.tokenizer.texts_to_sequences(questions)
        answer_in_sequence = self.tokenizer.texts_to_sequences(answer_in)
        answer_out_sequence = self.tokenizer.texts_to_sequences(answer_out)

        return question_sequence, answer_in_sequence, answer_out_sequence


    def clean_sentence(self,sentence):
        # 한글, 숫자를 제외한 모든 문자는 제거합니다.
        sentence = re.sub(r'[^0-9ㄱ-ㅎㅏ-ㅣ가-힣<>A-Za-z]',r'', sentence)
        return sentence
    
    # 형태소 변환에 활용하는 함수
    # morphs 함수 안에 변환한 한글 문장을 입력 합니다.
    def process_morph(self, sentence):

      return ' '.join(self.okt.morphs(sentence))

    #type을 바꾸자
    def clean_and_morph(self,sentence, is_question=True):
        # 한글 문장 전처리
        sentence = self.clean_sentence(sentence)
        # 형태소 변환
        sentence = self.process_morph(sentence)
        # Question 인 경우, Answer인 경우를 분기하여 처리합니다.
        if is_question:
            return sentence
        else:
            # START 토큰은 decoder input에 END 토큰은 decoder output에 추가합니다.
            return ('<START> ' + sentence, sentence + ' <END>')

    def preprocess(self):
        questions = []
        answer_in = []
        answer_out = []

        # 질의에 대한 전처리
        for text in self.texts:
            # 전처리와 morph 수행
            question = self.clean_and_morph(text, is_question=True)
            questions.append(question)

        # 답변에 대한 전처리
        for pair in self.pairs:
            # 전처리와 morph 수행
            in_, out_ = self.clean_and_morph(pair, is_question=False)
            answer_in.append(in_)
            answer_out.append(out_)
        
        return questions, answer_in, answer_out


    def sequence_pad(self, question_sequence, answer_in_sequence,answer_out_sequence):
        
        question_padded = pad_sequences(question_sequence, maxlen=MAX_LENGTH, truncating='post', padding='post')
        answer_in_padded = pad_sequences(answer_in_sequence, maxlen=MAX_LENGTH, truncating='post', padding='post')
        answer_out_padded = pad_sequences(answer_out_sequence, maxlen=MAX_LENGTH, truncating='post', padding='post')

        return question_padded, answer_in_padded,answer_out_padded

    def convert_to_one_hot(self,padded, vocab_size):
        # 원핫인코딩 초기화
        one_hot_vector = np.zeros((len(padded), MAX_LENGTH, vocab_size))

        # 디코더 목표를 원핫인코딩으로 변환
        # 학습시 입력은 인덱스이지만, 출력은 원핫인코딩 형식임
        for i, sequence in enumerate(padded):
            for j, index in enumerate(sequence):
                one_hot_vector[i, j, index] = 1

        return one_hot_vector

    def convert_index_to_text(self, indexs, end_token): 
    
        sentence = ''
        
        # 모든 문장에 대해서 반복
        for index in indexs:
            if index == end_token:
                # 끝 단어이므로 예측 중비
                break
            # 사전에 존재하는 단어의 경우 단어 추가
            if index > 0 and self.tokenizer.index_word[index] is not None:
                sentence += self.tokenizer.index_word[index]
            else:
            # 사전에 없는 인덱스면 빈 문자열 추가
                sentence += ''
                
            # 빈칸 추가
            sentence += ' '
            
        return sentence

    def getToken(self):
      START_TOKEN = self.tokenizer.word_index['<START>']
      END_TOKEN = self.tokenizer.word_index['<END>']

      return START_TOKEN,END_TOKEN

# if __name__ == '__main__':

#     print("instance can if")

#     train_data = pd.read_csv('old_train.csv', sep='\t', engine='python', encoding='utf-8', error_bad_lines=False)
#     train_question = train_data['person']
#     train_answer = train_data['response']

#     pre = Preprocessing()

#     pre.append(train_question,train_answer)

#     # 한글 문장을 품사에 따라 나눔
#     questions, answer_in, answer_out = pre.preprocess()
#     all_sentences = questions + answer_in + answer_out

#     a = (' '.join(questions) + ' '.join(answer_in) + ' '.join(answer_out)).split()
#     vocab_size = len(set(a))

#     # 토큰화하여 단어사전 만듦
#     pre.tokenify(all_sentences)

#     pre.substitution(a)

#     question_sequence, answer_in_sequence, answer_out_sequence = pre.substitution(questions,answer_in,answer_out)

#     question_padded,answer_in_padded,answer_out_padded = pre.sequence_pad(question_sequence, answer_in_sequence, answer_out_sequence)
    
#     print(question_padded.shape)

#     answer_in_one_hot = pre.convert_to_one_hot(answer_in_padded)
#     answer_out_one_hot = pre.convert_to_one_hot(answer_out_padded)

# if __name__ == '__main__':

#     print("instance can if")

#     train_data = pd.read_csv('old_train.csv', sep='\t', engine='python', encoding='utf-8', error_bad_lines=False)
#     train_question = train_data['person']
#     train_answer = train_data['response']

#     pre = Preprocessing()

#     pre.append(train_question,train_answer)

#     # 한글 문장을 품사에 따라 나눔
#     questions, answer_in, answer_out = pre.preprocess()
#     all_sentences = questions + answer_in + answer_out

#     a = (' '.join(questions) + ' '.join(answer_in) + ' '.join(answer_out)).split()
#     vocab_size = len(set(a))

#     # 토큰화하여 단어사전 만듦
#     pre.tokenify(all_sentences)

#     pre.substitution(a)

#     question_sequence, answer_in_sequence, answer_out_sequence = pre.substitution(questions,answer_in,answer_out)

#     question_padded,answer_in_padded,answer_out_padded = pre.sequence_pad(question_sequence, answer_in_sequence, answer_out_sequence)
    
#     print(question_padded.shape)

#     answer_in_one_hot = pre.convert_to_one_hot(answer_in_padded)
#     answer_out_one_hot = pre.convert_to_one_hot(answer_out_padded)