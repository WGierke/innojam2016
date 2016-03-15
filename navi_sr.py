import speech_recognition as sr

recognizer = sr.Recognizer()

def get_audio():
    with sr.Microphone() as source:
        audio = recognizer.listen(source)
    return audio

def said_yes():
    return "yes" in recognizer.recognize_google(get_audio())


print said_yes()