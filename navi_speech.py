import speech_recognition as sr
import os

recognizer = sr.Recognizer()

def say(s):
    os.system("say {} -v rachel".format(s))

def ask_take(name):
    say("{} is traveling to a location on your route. Do you want to take him".format(name))

def get_audio():
    with sr.Microphone() as source:
        audio = recognizer.listen(source)
    return audio

def said_yes(tried=0):
    try:
        return ("yes" in recognizer.recognize_google(get_audio()))
    except:
        if tried < 2:
            say("I could not understand you. Do you want to take him?")
            return said_yes(tried+1)
        return False

ask_take("willi")
if said_yes():
    say("Great, please pick him up")
else:
    say("Ok, have a nice trip")