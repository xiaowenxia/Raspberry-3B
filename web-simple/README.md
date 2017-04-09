### 使用树莓派搭建简单的web服务器

#### python代码
```python
from bottle import route, run, template
from datetime import datetime
@route('/')
def index(name='time'):
     dt = datetime.now()
     time = "{:%Y-%m-%d %H:%M:%S}".format(dt)
     return template('<b>Pi think the date/time is:{{t}}</b>', t = time)
run(host='192.168.31.79',port = 8090)
``` 
其中使用了bottle这个简易的web server python 库。

