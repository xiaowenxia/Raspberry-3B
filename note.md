### likely和unlikely
```c
/* linux-2.6.38.8/include/linux/compiler.h */
# define likely(x)  __builtin_expect(!!(x), 1)  
# define unlikely(x)    __builtin_expect(!!(x), 0)  
```

_builtin_expect 是GCC的内置函数，用来对选择语句的判断条件进行优化，常用于一个判断条件经常成立（如likely）或经常不成立（如unlikely）的情况。
    __builtin_expect的函数原型为long  __builtin_expect (long exp, long c)，返回值为完整表达式exp的值，它的作用是期望表达式exp的值等于c（注意，如果exp == c条件成立的机会占绝大多数，那么性能将会得到提升，否则性能反而会下降）。
    
### strdup
> c语言中常用的一种字符串拷贝库函数，一般和free（）函数成对出现。
### pthread_cond_init()
> 是一条用来初始化的条件变量。
### alloca
与malloc,calloc,realloc类似. 但是注意一个重要的区别,_alloca是在栈(stack)上申请空间,用完马上就释放.
### strcat
将两个char类型连接。
char d[20]="GoldenGlobal"; char *s="View"; strcat(d,s);
d和s所指内存区域不可以重叠且d必须有足够的空间来容纳s的字符串。
返回指向d的指针。

### stdin,stdout和stderr
stdin:文件标识符为0
stdout:文件标识符为1
stderr:文件标识符为2

```sh
./a.out 1>log.txt 2>error.txt
```

把stdout重定向到log.txt,把stderr重定向到error.txt

### pthread_join
等待一个线程的结束,线程间同步的操作。
### 
### 树莓派
1. Raspbian 默认没有开启ssh，要开启分区需要在sd卡的root分区建一个ssh的文件。
2. 添加用户：
```sh
$sudo adduser xiaxiaowen
$sudo passwd xiaxiaowen
$passwd
```

用useradd会导致不能自动补全，adduser会新建/home/xiaxiaowen，并能够自动补全

3. xiaxiaowen is not in the sudoers file 解决:
```sh
$su -
$visudo
```
在最后一行加入：
xiaxiaowen ALL=(ALL)  ALL
然后保存退出。
4. 树莓派 国内源：
```sh
deb http://mirrors.aliyun.com/raspbian/raspbian/ wheezy main non-free contrib
deb-src http://mirrors.aliyun.com/raspbian/raspbian/ wheezy main non-free contrib
```

5. 树莓派 SPI
    sudo raspi-config 配置打开spi接口
    查看spi驱动是否加载：lsmod:中是否有spi_bcm2835,或者find /dev/ -name "spi*"是否有设备/dev/spidev0.1 /dev/spidev0.0
6. nc指令
    nc -u 192.168.0.117 50001 建立udp client
    
7. raspberry 内核、工具链：https://github.com/raspberrypi
8. 
(1)lsmod(list module,将模块列表显示)，功能是打印出当前内核中已经安装的模块列表

(2)insmod（install module，安装模块），功能是向当前内核中去安装一个模块，用法是insmod xxx.ko

(3)modinfo（module information，模块信息），功能是打印出一个内核模块的自带信息。，用法是modinfo xxx.ko，注意要加.ko，也就是说是一个静态的文件形式。

(4)rmmod（remove module，卸载模块），功能是从当前内核中卸载一个已经安装了的模块，用法是rmmod xxx.ko  rmmod xxx都可以

(5)剩下的后面再说，暂时用不到（如modprobe、depmod等）

9. wiringPi
安装： 
```sh
git clone git://git.drogon.net/wiringPi
cd wiringPi
./build
```
读取当前引脚配置：
```sh
gpio readall
 +-----+-----+---------+------+---+---Pi 3---+---+------+---------+-----+-----+
 | BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
 +-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
 |     |     |    3.3v |      |   |  1 || 2  |   |      | 5v      |     |     |
 |   2 |   8 |   SDA.1 |   IN | 1 |  3 || 4  |   |      | 5v      |     |     |
 |   3 |   9 |   SCL.1 |   IN | 1 |  5 || 6  |   |      | 0v      |     |     |
 |   4 |   7 | GPIO. 7 |   IN | 1 |  7 || 8  | 1 | ALT5 | TxD     | 15  | 14  |
 |     |     |      0v |      |   |  9 || 10 | 1 | ALT5 | RxD     | 16  | 15  |
 |  17 |   0 | GPIO. 0 |   IN | 0 | 11 || 12 | 0 | IN   | GPIO. 1 | 1   | 18  |
 |  27 |   2 | GPIO. 2 |   IN | 0 | 13 || 14 |   |      | 0v      |     |     |
 |  22 |   3 | GPIO. 3 |   IN | 0 | 15 || 16 | 0 | IN   | GPIO. 4 | 4   | 23  |
 |     |     |    3.3v |      |   | 17 || 18 | 0 | IN   | GPIO. 5 | 5   | 24  |
 |  10 |  12 |    MOSI |   IN | 0 | 19 || 20 |   |      | 0v      |     |     |
 |   9 |  13 |    MISO |   IN | 0 | 21 || 22 | 0 | IN   | GPIO. 6 | 6   | 25  |
 |  11 |  14 |    SCLK |   IN | 0 | 23 || 24 | 1 | IN   | CE0     | 10  | 8   |
 |     |     |      0v |      |   | 25 || 26 | 1 | IN   | CE1     | 11  | 7   |
 |   0 |  30 |   SDA.0 |   IN | 1 | 27 || 28 | 1 | IN   | SCL.0   | 31  | 1   |
 |   5 |  21 | GPIO.21 |   IN | 1 | 29 || 30 |   |      | 0v      |     |     |
 |   6 |  22 | GPIO.22 |   IN | 1 | 31 || 32 | 0 | IN   | GPIO.26 | 26  | 12  |
 |  13 |  23 | GPIO.23 |   IN | 0 | 33 || 34 |   |      | 0v      |     |     |
 |  19 |  24 | GPIO.24 |   IN | 0 | 35 || 36 | 0 | IN   | GPIO.27 | 27  | 16  |
 |  26 |  25 | GPIO.25 |   IN | 0 | 37 || 38 | 0 | IN   | GPIO.28 | 28  | 20  |
 |     |     |      0v |      |   | 39 || 40 | 0 | IN   | GPIO.29 | 29  | 21  |
 +-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
 | BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
 +-----+-----+---------+------+---+---Pi 3---+---+------+---------+-----+-----+
```
linux查看硬件信息及驱动设备相关整理
查看声卡设备：cat /proc/asound/cards

查看USB设备：cat /proc/bus/usb/devices


常用命令整理如下：
用硬件检测程序kuduz探测新硬件：service kudzu start ( or restart)
查看CPU信息：cat /proc/cpuinfo
查看板卡信息：cat /proc/pci
查看PCI信息：lspci (相比cat /proc/pci更直观）
查看内存信息：cat /proc/meminfo
查看USB设备：cat /proc/bus/usb/devices
查看键盘和鼠标:cat /proc/bus/input/devices
查看系统硬盘信息和使用情况：fdisk & disk - l   & df
查看各设备的中断请求(IRQ):cat /proc/interrupts
查看系统体系结构：uname -a
dmidecode查看硬件信息，包括bios、cpu、内存等信息
dmesg | more 查看硬件信息

10. 树莓派3B内核编译
参考：https://www.raspberrypi.org/documentation/linux/kernel/building.md

```sh
#安装依赖
sudo apt-get install git bc
#下载交叉编译环境
git clone https://github.com/raspberrypi/tools ~/tools
#把`tools/arm-bcm2708/gcc-linaro-arm-linux-gnueabihf-raspbian/bin` 加入到环境变量中
echo PATH=\$PATH:~/tools/arm-bcm2708/gcc-linaro-arm-linux-gnueabihf-raspbian-x64/bin >> ~/.bashrc
source ~/.bashrc
#获取raspberrypi的内核源码
git clone --depth=1 https://github.com/raspberrypi/linux

#使用默认的配置文件
cd linux
KERNEL=kernel7
make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- bcm2709_defconfig
#开始编译内核
make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- zImage modules dtbs
```

11. 烧录raspbain到sd中：
```sh
sudo dd if='/media/xiaxiaowen/document/development/raspberry/2017-11-29-raspbian-stretch-lite.img' of=/dev/sdc bs=512
#开启ssh登陆：把sd卡插到电脑上，在分区boot中新建一个ssh的文件就行了
#设置eth0静态ip地址：sdka插到ubuntu中，在rootfs分区中的文件：/etc/dhcpcd.conf末尾增加：
interface eth0
static ip_address=192.168.0.215/24
static routers=192.168.0.1
static domain_name_servers=192.168.0.1 8.8.8.8

13. printk级别

```c
#define KERN_EMERG     "<0>"
#define KERN_ALERT     "<1>"
#define KERN_CRIT      "<2>"
#define KERN_ERR       "<3>"
#define KERN_WARNING   "<4>"
#define KERN_NOTICE    "<5>"
#define KERN_INFO      "<6>"
#define KERN_DEBUG     "<7>"
```
12. THIS_MODULE
定义如下：
```c
#define THIS_MODULE (&__this_module)
```
__this_module是一个struct module变量

查看树莓派gpio的物理地址：

cat /proc/iomem | grep gpio

set -e
你写的每个脚本都应该在文件开头加上set -e,这句语句告诉bash如果任何语句的执行结果不是true则应该退出。这样的好处是防止错误像滚雪球般变大导致一个致命的错误，而这些错误本应该在之前就被处理掉。如果要增加可读性，可以使用set -o errexit，它的作用与set -e相同。



1.autoscan (autoconf): 扫描源代码以搜寻普通的可移植性问题，比如检查编译器，库，头文件等，生成文件configure.scan,它是configure.ac的一个雏形。
2.aclocal (automake):根据已经安装的宏，用户定义宏和acinclude.m4文件中的宏将configure.ac文件所需要的宏集中定义到文件 aclocal.m4中。aclocal是一个perl 脚本程序，它的定义是：“aclocal - create aclocal.m4 by scanning configure.ac”
 
user input files   optional input     process          output files
================   ==============     =======          ============
 
                    acinclude.m4 - - - - -.
                                          V
                                      .-------,
configure.ac ------------------------>|aclocal|
                 {user macro files} ->|       |------> aclocal.m4
                                      `-------'
3.autoheader(autoconf): 根据configure.ac中的某些宏，比如cpp宏定义，运行m4，声称config.h.in
 
user input files    optional input     process          output files
================    ==============     =======          ============
 
                    aclocal.m4 - - - - - - - .
                                             |
                                             V
                                     .----------,
configure.ac ----------------------->|autoheader|----> autoconfig.h.in
                                     `----------'
4.automake: automake将Makefile.am中定义的结构建立Makefile.in，然后configure脚本将生成的Makefile.in文件转换为Makefile。如果在configure.ac中定义了一些特殊的宏，比如AC_PROG_LIBTOOL，它会调用libtoolize，否则它会自己产生config.guess和config.sub
 
user input files   optional input   processes          output files
================   ==============   =========          ============
 
                                     .--------,
                                     |        | - - -> COPYING
                                     |        | - - -> INSTALL
                                     |        |------> install-sh
                                     |        |------> missing
                                     |automake|------> mkinstalldirs
configure.ac ----------------------->|        |
Makefile.am  ----------------------->|        |------> Makefile.in
                                     |        |------> stamp-h.in
                                 .---+        | - - -> config.guess
                                 |   |        | - - -> config.sub
                                 |   `------+-'
                                 |          | - - - -> config.guess
                                 |libtoolize| - - - -> config.sub
                                 |          |--------> ltmain.sh
                                 |          |--------> ltconfig
                                 `----------'
5.autoconf:将configure.ac中的宏展开，生成configure脚本。这个过程可能要用到aclocal.m4中定义的宏。
 
user input files   optional input   processes          output files
================   ==============   =========          ============
 
                   aclocal.m4 - - - - - -.
                                         V
                                     .--------,
configure.ac ----------------------->|autoconf|------> configure ----->autoconfig.h,Makefile


使用树莓派的ttl:
sudo nano /boot/config.txt
增加下面一行代码:
dtoverlay=pi3-miniuart-bt
ls -l /dev 看看是不是以下对应关系:
serial0  -> ttyAMA0
serial1  -> ttyS0
如果是的话,就是对了.


ubuntu core 更改静态ip地址:
auto eth0
iface eth0 inet static
address 192.168.0.215
netmask 255.255.255.0
gateway 192.168.0.1


tcpdump使用
从所有网卡中捕获数据包

```sh
$ tcpdump -i any
```

将捕获的包写入文件

```sh
$ tcpdump -i eth1 -w packets_file
```

读取之前产生的 tcpdump 文件
```sh
$ tcpdump -r packets_file
```

获取更多的包信息，并且以可读的形式显示时间戳
```sh
$ tcpdump -ttttnnvvS
```

查看整个网络的数据包
```sh
$ tcpdump net 192.168.1.0/24
```

根据 IP 地址查看报文
```sh
$ tcpdump host 192.168.1.100
$ tcpdump src 192.168.1.100
$ tcpdump dst 192.168.1.100
```

查看某个协议或端口号的数据包
```sh
$ tcpdump ssh
$ tcpdump port 22
$ tcpdump portrange 22-125
```

使用与或非
“与” （and，&&）、“或” （or，|| ) 和“非”（not，!） 
$ tcpdump src 192.168.1.100 && port 22 -w ssh_packets
$ tcpdump src 192.168.1.100 or dst 192.168.1.50 && port 22 -w ssh_packets
$ tcpdump port 443 or 80 -w http_packets
$ tcpdump -i eth0 src port not 22

