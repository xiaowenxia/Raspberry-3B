#!/usr/bin/env python2
import sys
import os
import time
import psutil

from bottle import get,route,post,run,request,template,static_file
@get("/")
def index():
	return template("index")
@route("/assert/css/<filename>")
def css(filename):
	return static_file(filename, root='./assert/css/')
@route("/assert/js/<filename>")
def css(filename):
	return static_file(filename, root='./assert/js/')
@route("/<filename>")
def css(filename):
	return static_file(filename, root='./')
@get("/cmd")
def cmd():
	cpu_percent = psutil.cpu_percent(0)
	cpu_freq    = psutil.cpu_freq().current

	#print "CPU:" + str(psutil.cpu_percent(1)) + "%"
	#print "button:" + request.body.read()
	return template('{"percent":{{per}},"freq":{{frq}}}', per=cpu_percent, frq=cpu_freq)

run(host="192.168.9.18")
