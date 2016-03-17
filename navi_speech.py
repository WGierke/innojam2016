import speech_recognition as sr
import os
import time

recognizer = sr.Recognizer()
recognizer.energy_threshold = 3100

def say(s):
    os.system("say {} -v rachel".format(s))

def ask_take(name, demo=False):
    say("{} is traveling to a location on your route. Do you want to pick {} up".format(name, name))
    time.sleep(3)
    say("Great, please follow the new route and pick him up")
    return True
    # if said_yes(demo=demo) or demo:
    #     say("Great, please follow the new route and pick him up")
    #     return True
    # else:
    #     say("Ok, have a nice trip")
    #     return False

def get_audio():
    with sr.Microphone() as source:
        audio = recognizer.listen(source)
    return audio

def said_yes(tried=0, demo=False):
    try:
        return ("yes" in recognizer.recognize_google(get_audio()))
    except:
        if tried < 2 and not demo:
            say("I could not understand you. Please repeat.")
            return said_yes(tried+1)
        else:
            return True
        return False

