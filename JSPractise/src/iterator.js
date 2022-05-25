"use strict"

//递归求出先序遍历序列
function buildTreeRecur (tree, current) {
  if (tree === null) {
    return
  }
  let num = current.length
  current[num] = tree.val
  let length = tree.children.length
  // console.log(tree.val);
  for (let i = 0; i < length; i++) {
    buildTreeRecur(tree.children[i], current)
  }
}

class TreeIterator {
  constructor (tree) {
    //递归求出先序遍历序列
    this.sequence = new Array()
    buildTreeRecur(tree, this.sequence)
    this.current = 0
  }
  has_next () {
    //直接序列里找下一个
    let length = this.sequence.length
    if (this.current < length) {
      return 1
    } else {
      return 0
    }
  }
  next_value () {
    //直接序列里找下一个
    let ans = this.sequence[this.current]
    this.current++
    return ans
  }
}

const tree = {
  val: 1,
  children: [
    {
      val: 2,
      children: []
    },
    {
      val: 3,
      children: [
        {
          val: 4,
          children: []
        }
      ] },
    {
      val: 5,
      children: []
    }
  ]
}
const iterator = new TreeIterator(tree)
while (iterator.has_next()) {
  console.log(iterator.next_value())
}
