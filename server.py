from socketserver import ThreadingMixIn
from http.server import BaseHTTPRequestHandler, HTTPServer
import threading
import RPi.GPIO as GPIO
from os import path
from sched import scheduler
from time import time, sleep

HOST_NAME = ''
PORT_NUMBER = 8080
PATH = path.dirname(path.abspath(__file__)) + "/"
UPDATE_DELAY = 30

"""Banheiro Recepção"""
def sensorEvent1(channel=0):
	global wc_busy 
	wc1_busy = GPIO.input(17)

"""Banheiro Principal"""
def sensorEvent2(channel=0):
	global wc_busy 
	wc2_busy = GPIO.input(27)	

def timedUpdate1():
	global wc_busy1
	wc_busy1 = GPIO.input(17)
	threading.Timer(UPDATE_DELAY, timedUpdate, ()).start()
	
def timedUpdate2():
	global wc_busy2
	wc_busy2 = GPIO.input(27)
	threading.Timer(UPDATE_DELAY, timedUpdate, ()).start()

def isWCBusy1():
	return not wc_busy1

def isWCBusy2():
	return not wc_busy2

class RequestHandler(BaseHTTPRequestHandler):
	def do_HEAD(s):
		print("HEAD")
		pass

	def do_GET(s):
		"""Respond to a GET request"""
		s.send_response(200)
		if s.path == "/api":
			s.send_header("Content-type", "text/plain")
			s.end_headers()
			s.wfile.write(bytes("{}{}".format(isWCBusy1(),isWCBusy2()), "UTF-8"))
			
		if s.path.endswith(("/", ".html", "css", ".js", ".png")):
			if s.path == "/":
				s.path = "/index.html"
			elif s.path.endswith((".png", ".js")):
				s.send_header("Cache-Control", "max-age=86400, must-revalidate")
			s.end_headers()
			f = open(PATH + s.path[1:], 'rb')
			s.wfile.write(f.read())
			f.close()

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
	pass

if __name__ == '__main__':
	global wc_busy1
	global wc_busy2
	try:
		GPIO.setmode(GPIO.BCM)
		
		GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_UP)	     
		GPIO.add_event_detect(17, GPIO.BOTH, callback=sensorEvent1)
		
		GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)	     
		GPIO.add_event_detect(27, GPIO.BOTH, callback=sensorEvent2)

		wc_busy1 = GPIO.input(17)
		wc_busy2 = GPIO.input(27)
	
		threading.Timer(UPDATE_DELAY, timedUpdate, ()).start()
		httpd = ThreadedHTTPServer((HOST_NAME, PORT_NUMBER), RequestHandler)

		try:
			httpd.serve_forever()
		except KeyboardInterrupt:
			pass
		httpd.server_close()
	finally:
		GPIO.cleanup()
