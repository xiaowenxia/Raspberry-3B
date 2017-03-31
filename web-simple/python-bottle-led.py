#!/usr/bin/env python2
from bottle import get,post,run,request,template
@get("/")
def index():
	return template("index")
@post("/cmd")
def cmd():
	print "button:" + request.body.read()
	return "OK"
run(host="192.168.0.131")
