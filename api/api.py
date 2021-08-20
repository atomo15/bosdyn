import json
import time
import subprocess, wave
from pydub import AudioSegment
from playsound import playsound
from gtts import gTTS
from flask import Flask,jsonify,request
from BD import Bosdyn
import bosdyn.client
import json
from bosdyn.client.spot_cam.audio import AudioClient
from bosdyn.client.spot_cam.ptz import PtzClient
from bosdyn.client import spot_cam
from bosdyn.api.spot_cam import ptz_pb2
from bosdyn.api.spot_cam import service_pb2_grpc
from bosdyn.api.spot_cam import audio_pb2
from bosdyn.api import data_chunk_pb2
from google.protobuf.wrappers_pb2 import FloatValue
from bosdyn.client.spot_cam.media_log import MediaLogClient
from bosdyn.api import image_pb2
from bosdyn.api.spot_cam import logging_pb2, camera_pb2
import os
import numpy as np
import wave
import contextlib
import speech_recognition as sr

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def main():
    current_wifi = getWifi()
    spot_status = False
    payload_status = False
    if current_wifi.find("spot-BD-") != -1:
        #print(current_wifi)
        spot = Bosdyn('atom','atom29589990','general')
        robot = spot.setup()
        battery,temperature = spot.getBatteryTemPercent(robot)
        payload_check = Bosdyn('atom','atom29589990','payload')
        payload_status = payload_check.setup()
        spot_status = True
    else:
        battery = int(99)
        temperature = int(37)
    #print(battery,temperature)
    return {'battery':battery,'temperature':temperature,'spot':spot_status,'wifi':current_wifi,'payload':payload_status}

def isSpotCon():
    current_wifi = getWifi()
    spot_status = False
    if current_wifi.find("spot-BD-") != -1:
        spot_status = True
    return spot_status
        
def getWifi():
    process = subprocess.Popen(['/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport','-I'], stdout=subprocess.PIPE)  
    out, err = process.communicate()
    process.wait()
    #print(out)
    result =out.decode("utf-8")

    wifi_name = result[(result.find(" SSID")+7):result.find("\n            MCS")]
    #print(wifi_name,len(wifi_name))
    if wifi_name == "t: Off":
        return ""
    return wifi_name

@app.route('/speak', methods=['POST'])
def speak():
    if request.method == 'POST':
        if request.get_json() != "":
            data = request.get_json()
            print(data['transcript'])
            if generateAiSound(data['transcript'],""):
                if isSpotCon():
                    spot = Bosdyn('atom','atom29589990','audio')
                    robot = spot.setup()
                    print("before load")
                    if load_sound(robot,"spot_real_time.wav") == True:
                        print("After load")
                        list_sound = robot.list_sounds()
                        print('test => ',list_sound)
                        sound = audio_pb2.Sound(name="spot_real_time")
                        robot.play_sound(sound,None)
                        # if len(list_sound) > 0:
                        #     new_sound_list = []
                        #     for y in range(len(list_sound)):
                        #         s = str(list_sound[y])
                        #         index = s.find('\"')+1
                        #         filename = s[index:]
                        #         file = filename[:filename.find('\"')]
                        #         new_sound_list.append(file)
                        #     if option in new_sound_list:
                        #         sound = audio_pb2.Sound("spot_real_time")
                        #         robot.play_sound(sound,None)
                    else:
                        print("Falied load sound")
                else:
                    print("Spot not connected")
            return 'OK'
    return 'Not OK'

def load_sound(robot,filename):
    name_val = filename.split(".")
    print("load sound ",filename)
    try:
        sound = audio_pb2.Sound(name=name_val[0])
    except:
        print("Error => sound = audio_pb2.Sound(name=options.name)")
        return False
    path = "/Users/thunnathorne/Documents/GitHub/bosdyn/bosdyn/public/"
    full_path = path + filename;
    
    print("read file")
    
    with open(full_path, 'rb') as fh:
        print("read")
        data = fh.read()
    
    if data is None:
        print("error data")
    else:
        print("read file end")
        
    try:
        robot.load_sound(sound, data)
    except:
        print("Load falied")
        return False
    print("Load successfully")
    return True

def generateAiSound(content,filename):
    if content != "":
        if filename == "":
            filename = "spot_real_time"
            
        text = content
        language = 'en'
        try:
            speech = gTTS(text = text, lang = language,tld='com',slow = False)
            save_mp3 = '/Users/thunnathorne/Documents/GitHub/bosdyn/bosdyn/public/'+filename+'.mp3'
            speech.save(save_mp3) # this will save the format
            sound = AudioSegment.from_mp3("/Users/thunnathorne/Documents/GitHub/bosdyn/bosdyn/public/"+filename+".mp3")
            sound.export("/Users/thunnathorne/Documents/GitHub/bosdyn/bosdyn/public/"+filename+".wav", format="wav")
            print("export successfully")
            #playsound('/Users/thunnathorne/Documents/GitHub/bosdyn/bosdyn/public/spot_real_time.wav')
        except:
            print("gTTs has problem")
            return False
        
    return True

def getDeviceAudio():
    filepath="/Users/thunnathorne/Documents/GitHub/bosdyn/bosdyn/public"
    wavelist=[]
    durationlist = []
    contentlist = []
    filenames=os.listdir(filepath)
    for filename in filenames:
        name,category = os.path.splitext(filepath+filename)#Split file extension
        if category=='.wav': #If the file is a wav audio file
            wavelist.append(filename)
    print(wavelist)
    r = sr.Recognizer()
    for wav in wavelist:
        with contextlib.closing(wave.open("/Users/thunnathorne/Documents/GitHub/bosdyn/bosdyn/public/"+wav,'r')) as f:
            frames = f.getnframes()
            rate = f.getframerate()
            duration = frames / float(rate)
            durationlist.append(round(duration, 2))
            #print(duration)     
             
        full_path = "/Users/thunnathorne/Documents/GitHub/bosdyn/bosdyn/public/"+wav
        #print(full_path)
        with sr.AudioFile(full_path) as source:
            # listen for the data (load audio to memory)
            try:
                #r.adjust_for_ambient_noise(source)
                audio_data = r.record(source)
            except:
                print('audio_data error')
            # recognize (convert from speech to text)
            # text = r.recognize_google(audio_data, language="en")
        try:
            text = r.recognize_google(audio_data, language="en")
            print('content = ',text) 
            contentlist.append(text)
        except:
            print('text error')
            contentlist.append('N/A')
    return wavelist,durationlist
     
@app.route('/audio_api', methods=['GET'])
def audio():
    wave_lsit = []
    wave_list,duration_list = getDeviceAudio()
    return {"wave_list":wave_list,"duration_list":duration_list}

@app.route('/get_spot_list', methods=['GET'])
def get_spot_list():
    sound_list = []
    if isSpotCon():
        print("get from spot list")
        spot = Bosdyn('atom','atom29589990','audio')
        robot = spot.setup()
        list_sound = robot.list_sounds()
        x =str(list_sound).replace("[",'{')
        x = x.replace("]",'}')
        count = int(0);
        temp = ""
        for i in x:
            print(i)
            if i == '\"':
                if count == 0:
                    count=1;
                elif count == 1:
                    count = 2;
            elif count == 1:
                temp= temp + i;
                
            if count==2:
                sound_list.append(temp);
                temp=''
                count = 0;
            
        print("\n\nlist_sound: ",sound_list,'\n\n')
        return {"spot_list":sound_list}
    else:
        sound_list.append('Spot realtime test list')
        sound_list.append('test')
        print("using tempate data")
        return {"spot_list":sound_list}
    return {"wave_list":wave_list,"duration_list":duration_list}

@app.route('/text2file', methods=['GET','POST'])
def text2file():
    if request.method == 'POST':
        if request.get_json() != "":
            data = request.get_json()['formInput']
            filename = data['filename']
            content = data['contents']
            if generateAiSound(content,filename) == True:
                print("success")
            print('content: ',data['filename'],data['contents'])
            return {"filename":'hello',"contents":'test'}
        else:
            print("no data")

@app.route('/upload_audio', methods=['GET','POST'])
def upload_audio_main():
    if request.method == 'POST':
        if request.get_json() != "":
            #data = request.get_json()['formInput']
            print("load ",request.get_json(),'to spot')
            #return {"filename":'work',"contents":'worktest'}
            if isSpotCon():
                spot = Bosdyn('atom','atom29589990','audio')
                robot = spot.setup()
                filename = request.get_json();
                print("before load")
                if load_sound(robot,filename) == True:
                    print("After load")
                    list_sound = robot.list_sounds()
                    print('test => ',list_sound)
                    # if list_sound.length > 0:
                    #     print("load successfully")
    return {"nodata":'error'}

@app.route('/play_spot_audio', methods=['GET','POST'])
def play_spot_audio():
    if request.method == 'POST':
        if request.get_json() != "":
            #data = request.get_json()['formInput']
            filename=request.get_json()
            print("play ",request.get_json(),'to spot')
            if isSpotCon():
                spot = Bosdyn('atom','atom29589990','audio')
                robot = spot.setup()
                list_sound = robot.list_sounds()
                print('test => ',list_sound)
                sound = audio_pb2.Sound(name=filename)
                robot.play_sound(sound,None)
                # if list_sound.length > 0:
                #     print("load successfully")
                #     sound = audio_pb2.Sound(name=filename)
                #     robot.play_sound(sound,None)
                # else:
                return {"nodata":'successful'}
    return {"nodata":'error'}

if __name__ == '__main__':
    app.run(debug=True)