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

### 树莓派使用samba共享文件夹
首先在树莓派上安装samba软件
```sh
sudo apt-get install samba samba-common-bin
```
安装完成后，修改配置文件/etc/samba/smb.conf
```sh
sudo vim /etc/samba/smb.conf
```
把[home]打开，做如下配置
```sh
[home]
    comment = Home Directories
    browseable = yes
    read only = 0
    create mask = 0777
    directory mask = 0777
    valid users = %S
    guest ok = yes
    path = /home/xiaxiaowen
```
然后重启samba服务
```sh
sudo /etc/init.d/samba restart
```
为samba设置用户
```sh
sudo smbpasswd -a xiaxiaowen
```
然后在电脑端挂载即可
```sh
win+R
\\192.168.1.14\xiaxiaowen
或者
mount -t cifs //192.168.1.14/xiaxiaowen /mnt/raspberrypi/ -o username=xiaxiaowen
```
### 为树莓派安装tensorflow
该安装方法参照 https://github.com/samjabrahams/tensorflow-on-raspberry-pi
首先安装python pip
```sh
# For Python 2.7
sudo apt-get install python-pip python-dev

# For Python 3.3+
sudo apt-get install python3-pip python3-dev
```
获取tensorflow的wheel文件
```sh
# For Python 2.7
wget https://github.com/samjabrahams/tensorflow-on-raspberry-pi/releases/download/v1.0.1/tensorflow-1.0.1-cp27-none-linux_armv7l.whl
pip install --user tensorflow-1.0.1-cp27-none-linux_armv7l.whl

# For Python 3.4
wget https://github.com/samjabrahams/tensorflow-on-raspberry-pi/releases/download/v1.0.1/tensorflow-1.0.1-cp34-cp34m-linux_armv7l.whl
pip3 install --user tensorflow-1.0.1-cp34-cp34m-linux_armv7l.whl
```
重装mock，否则可能会报异常
```sh
# For Python 2.7
pip uninstall mock
pip install --user mock

# For Python 3.3+
pip3 uninstall mock
pip3 install --user mock
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


## 命令别名alias

```sh
#alias语法
alias [alias-name[=string]...]

# 列出所有的命令别名
alias

#删除别名
unalias aliasname

# 编辑~/.bashrc 重启生效
alias c = 'clear'
```

```sh
alias c = 'clear'
alias update='sudo apt-get upgrade'
# 让 mount 命令的输出更漂亮，更方便人类阅读
alias mount = 'mount |column -t'
alias h = 'history'
# 获取时间
alias now = 'date +"%T"'
# 获取日期
alias nowdate = 'date +"%d-%m-%Y"'
# 快速列出服务区中所有的 TCP/UDP 端口
alias ports = 'netstat -tulanp'
## pass options to free ##
alias meminfo = 'free -m -l -t' 
## get top process eating memory
alias psmem = 'ps auxf | sort -nr -k 4' 
alias psmem10 = 'ps auxf | sort -nr -k 4 | head -10'
## get top process eating cpu ##
alias pscpu = 'ps auxf | sort -nr -k 3'
alias pscpu10 = 'ps auxf | sort -nr -k 3 | head -10' 
## Get server cpu info ##
alias cpuinfo = 'lscpu'
## older system use /proc/cpuinfo ##
##alias cpuinfo='less /proc/cpuinfo' ##
## get GPU ram on desktop / laptop##
alias gpumeminfo = 'grep -i --color memory /var/log/Xorg.0.log'

alias df = 'df -H'
alias du = 'du -ch'
```
### 在 Linux 中自定义 bash 命令提示符

[在 Linux 中自定义 bash 命令提示符](https://linux.cn/article-10280-1.html)
vim ~/.bashrc，添加如下字符：
```sh
PS1="\[\e[31m\]~>\[\e[m\] "
```

就只会显示`~> `
