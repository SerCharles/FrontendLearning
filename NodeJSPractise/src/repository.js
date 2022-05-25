class Repository {
  constructor () {
    // 类中存储键值
    this.nameList = []
    this.keyList = []
  }

  // API 1:compute: 传入两个数和一个type,返回结果
  ComputeNumber (firstParam, secondParam, type) {
    let ans
    if (type === 1) {
      // 加
      ans = firstParam + secondParam
    } else if (type === 2) {
      // 减
      ans = firstParam - secondParam
    } else if (type === 3) {
      ans = firstParam * secondParam
    } else {
      ans = Math.floor(firstParam / secondParam)
    }
    return ans
  }

  // API 2:post: 传入name和key,如果name存在就替换key,否则就增加name与ke对
  AddNewKey (name, key) {
    let whereFind = -1
    for (let i = 0; i < this.nameList.length; i++) {
      if (name === this.nameList[i]) {
        whereFind = i
        break
      }
    }
    if (whereFind === -1) {
      this.nameList[this.nameList.length] = name
      this.keyList[this.keyList.length] = key
    } else {
      this.keyList[whereFind] = key
    }
  }

  // API 3:get: 输入name,返回对应的key,没有就是404,这里return undefined
  FindKey (name) {
    let whereFind = -1
    for (let i = 0; i < this.nameList.length; i++) {
      if (name === this.nameList[i]) {
        whereFind = i
        break
      }
    }
    if (whereFind === -1) {
      return undefined
    } else {
      return this.keyList[whereFind]
    }
  }

  // API 4:delete: 输入name,删除对应的键值对,如果没有404,这里return undefined
  DeleteKey (name) {
    let whereFind = -1
    for (let i = 0; i < this.nameList.length; i++) {
      if (name === this.nameList[i]) {
        whereFind = i
        break
      }
    }
    if (whereFind === -1) {
      return undefined
    } else {
      this.nameList.splice(whereFind, 1)
      this.keyList.splice(whereFind, 1)
      return 1
    }
  }
}

module.exports = Repository
