### 这是我个人学习树莓派过程中的一些心得和代码
#### 如何通过命令行连接指定的wifi
首先扫描可用的wifi
```` sh
iwlist scan
````
方法一：
编辑wifi文件
```` sh
sudo vim /etc/wpa_supplicant/wpa_supplicant.conf
````
在该文件最后添加下面的话：
```` c
network={
	ssid="wifi-name"
	psk="wifi-password"
}
````
引号部分分别为wifi的名字和密码
保存文件后几秒钟应该就会自动连接到该wifi
查看是否连接成功
```` sh
ifconfig wlan0
````
方法二：
修改/etc/network/interface文件
```` sh
auto lo

iface lo inet loopback

iface eth0 inet dhcp

auto wlan0

allow-hotplug wlan0

iface wlan0 inet dhcp

wpa-ssid   接入AP的名字

wpa－psk   接入AP的密码 
````
保存文件，然后运行如下命令重新启动网络！
```` sh
sudo /etc/init.d/networking restart
````
