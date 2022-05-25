// 引用各种库,生成各种实例
const express = require('express')

// 用于读取POST指令的req.body
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()

const path = require('path')
const app = express()

// 引用我自己写的Repository库,四个API
let Handler = require('./repository.js')
let theHandler = new Handler()

// 我的Token
const myToken = 'DSBUACMMOUNJVICVPKZFOQYBZI'

// 显示静态页面:即读取我静态文件夹view里的所有内容并且显示
app.use(express.static(path.join(__dirname, 'view')))

// 处理请求1
app.post('/api/compute', multipartMiddleware, function (req, res, next) {
  // 判断hw-token是否一致
  let reqToken = req.get('hw-token')
  if (reqToken !== myToken) {
    res.status(403).send('403 Forbidden!')
  } else if (!req.is('multipart/form-data')) {
    // 判断content-type是否一致
    res.status(400).send('400 Bad Request!')
  } else {
    // 获取参数
    let firstParam = parseInt(req.body.firstParam)
    let secondParam = parseInt(req.body.secondParam)
    let type = req.body.type
    let calculation
    if (type === 'ADD') {
      calculation = 1
    } else if (type === 'SUB') {
      calculation = 2
    } else if (type === 'MUL') {
      calculation = 3
    } else if (type === 'DIV') {
      calculation = 4
    } else {
      res.status(404).send('404 Not Found!')
    }
    if (calculation !== undefined) {
      // 如果没有异常,就调用库里的API处理函数进行处理
      let answer = theHandler.ComputeNumber(firstParam, secondParam, calculation)

      // 发送结果
      res.type('application/json').send({ ans: answer })
    }
  }
})

// 处理请求2
app.post('/api/pair', multipartMiddleware, function (req, res, next) {
  // 判断hw-token是否一致
  let reqToken = req.get('hw-token')
  if (reqToken !== myToken) {
    res.status(403).send('403 Forbidden!')
  } else if (!req.is('multipart/form-data')) {
    // 判断content-type是否一致
    res.status(400).send('400 Bad Request!')
  } else {
    // 获取参数
    let name = req.body.name
    let key = req.body.key

    // 如果没有异常,就调用库里的API处理函数进行处理
    theHandler.AddNewKey(name, key)

    // 返回200的正常状态码
    res.status(200).send('successful')
  }
})

// 处理请求3
app.get('/api/pair', function (req, res, next) {
  // 判断hw-token是否一致
  let reqToken = req.get('hw-token')
  if (reqToken !== myToken) {
    res.status(403).send('403 Forbidden!')
  } else {
    // 获取参数
    let name = req.query.name

    // 调用库API,判断是否能找到,没有就404,否则就正常
    let key = theHandler.FindKey(name)
    if (key === undefined) {
      res.status(404).send('404 Not Found!')
    } else {
      res.type('application/json').send({ key: key })
    }
  }
})

// 处理请求4
app.delete('/api/pair', function (req, res, next) {
  // 判断hw-token是否一致
  let reqToken = req.get('hw-token')
  if (reqToken !== myToken) {
    res.status(403).json('403 Forbidden!')
  } else {
    // 获取参数
    let name = req.query.name

    console.log('test 4')
    console.log(name)

    // 调用库API,判断是否能找到,没有就404,否则就正常返回200
    let key = theHandler.DeleteKey(name)
    if (key === undefined) {
      res.status(404).send('404 Not Found!')
    } else {
      res.status(200).send('successful')
    }
  }
})

// 监听端口8000
app.listen(8000, () => {
  console.log(`App listening at port 8000`)
})
