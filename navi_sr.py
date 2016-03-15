__author__ = 'Aron'
import sphinxbase
import pocketsphinx
import speech_recognition as sr

recognizer = sr.Recognizer()

def get_audio():
    with sr.Microphone() as source:
        audio = recognizer.listen(source)
    return audio

def get_word():
    word = recognizer.recognize_sphinx(get_audio())
    print word
    return word


get_word()