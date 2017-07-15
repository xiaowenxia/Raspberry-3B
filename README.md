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

#### 如何更改树莓派的主机名称
编辑如下两个文件（2个文件都需要更改）
```sh
sudo vim /etc/hostname
sudo vim /etc/hosts
```

### 树莓派搭建git服务器
添加一个git系统账户：
```sh
adduser --system --shell /bin/bash --gecos 'git version control by pi' --group --home /home/git git
```
设置git账户的密码：
```sh
passwd git
```
建立git仓库
```sh
cd /home/git
mkdir -p workspace/zephyr.git
cd workspace/zephyr.git
git --bare init
```
把本地仓库加入到一个新的远程主机
```sh
git remote add pi git@[IP]:/home/git/workspace/zephyr.git
```
这时候只需要push一下即可
```sh
echo "### zephyr project" > README.md
git add .
git commit -m "first commit"
git push pi master
```
git 

