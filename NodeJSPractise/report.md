# 第四次作业报告

软73 沈冠霖 2017013569 shenguanlin1999@163.com

## 1.静态页面的显示

我参考了[这篇文章](https://blog.csdn.net/u010977147/article/details/60956502),使用express显示静态页面很简单,只需要一行代码

`app.use(express.static(path.join(__dirname, 'view')))`

这行代码的意思是读取项目中在view文件夹里的所有文件,用express.static这个中间件函数显示他们.

这样,打开对应的网页,就能看到我的index.html了,显示其他网页和图片也完全正常.

## 2.API的封装

大概可以把API封装分为两步:首先封装一个类,作为API的底层类.其次写四个中间件,分别处理四种url请求.

### 2.1 底层函数

我在repository.js里定义了一个底层类Repository,在里面,我用    this.nameList和

​    this.keyList储存(name,key)键值对,并且在里面封装了四个底层API函数

```javascript
ComputeNumber (firstParam, secondParam, type) //前两个参数分别是运算数1,2,type是运算种类,返回运算结果
AddNewKey (name, key) //判断输入的name是否重复,重复则用这个key替换,否则就添加这个键值对到内存
FindKey (name) //输入name,查找对应的key,找不到就返回undefined,便于异常处理
DeleteKey (name) //输入name,删除对应的键值对,找不到就返回undefined,便于异常处理
```

### 2.2 用中间件处理url指令

这是这次作业的核心,我写在app.js中.这里我参考了[这个文章](http://www.expressjs.com.cn/4x/api.html#res.set).

首先,我根据指令的类型(get,post,delete)和url链接(/api/compute等)设置中间件,大致如下面代码所示

`app.get('/api/pair', function (req, res, next)`

其次,我用`req.get('hw-token')`函数读取指令的hw-token头,验证是否符合,不符合就返回403,符合就继续操作.

之后,我用`req.is('multipart/form-data')`函数判断指令的content-type头是否符合要求,不符合就返回400,符合就继续操作.

之后,对于get和delete指令,我用`req.query`函数可以直接读取url中的变量,比如我要读取输入的name变量的值,只需要写`let theName = req.query.name`即可.

而对于post指令,则需要用req.body函数来读取表单中的变量值,和之前类似,想要读取表单的name的值,只需要写`let theName = req.body.name`.不过与之前不同的是,对于我们要求的multipart/form-data的形式,我们需要中间件multipart才能成功.因此,我们需要先注册这个中间件,并且在处理指令的中间件中用到它,大致代码如下:

```javascript
//引入multipart,并且实例化一个中间件multipartMiddleware
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()

//把这个中间件用于post指令处理的中间件中
app.post('/api/compute', multipartMiddleware, function (req, res, next) {
```

对于这个中间件的引入,我参考了[这篇文章.](https://blog.csdn.net/dreamer2020/article/details/52076391)

## 3.服务器的配置和运维

### 3.1 服务器的登录

我参考了[这篇文章](https://blog.csdn.net/u011054333/article/details/52443061).

因为我用的是ubantu16.04系统,因此我直接使用openssh进行服务器访问.访问的语句如下:

```
ssh 用户名@IP地址 -p 端口号
```

之后输入密码就可以访问成功了.

### 3.2 把代码加载到服务器上

使用如下两行语句即可上传单个文件和文件夹,我参考了[这个文章](https://blog.csdn.net/u013360850/article/details/79881168)

```
scp -p port source_dictionary_file user@ServerIp:target_dictionary_file //上传一个文件
scp -r source_dictionary user@ServerIp:target_dictionary //上传一个文件夹
```

上传所需的源代码,.json文件,静态文件view后,在服务器进行npm install,然后用node加载就可以了.此时,在浏览器打开http://62.234.128.178:8000/,就可以正确显示静态网页了,并且还可以正确接受url指令.但是一旦我关掉node就不行了.

### 3.3 让代码在服务器上稳定运行

我参考了[这篇文章](https://www.cnblogs.com/lwm-1988/archive/2011/09/13/2174538.html),使用tmux进行运行.它能保证我关掉控制台后还能让我的代码运行.

我先在服务器全局安装tmux,然后在tmux用命令

`tmux new -s NodeJS`

创建一个名字为NodeJS的会话,然后我在这个会话里执行我的代码即可.我退出后,仍然能正确显示网页.