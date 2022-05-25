"use strict"
class Link {
  constructor (v) {
    this.value = v
    this.next = null
    this.previous = null
  }
}

function calculateOperator (defination, x, y) {
  let ans
  if (defination[1] === '+') {
    ans = x + y
  } else if (defination[1] === '*') {
    ans = x * y
  } else if (defination[1] === '-') {
    if (defination[0] === 'x') {
      ans = x - y
    } else {
      ans = y - x
    }
  } else if (defination[1] === '/') {
    if (defination[0] === 'x') {
      ans = Math.floor(x / y)
      //ans = x / y;
    } else {
      ans = Math.floor(y / x)
      //ans = y / x;
    }
  }
  return ans
}

// 表达式优先级高:1 低:0 等(左右括号,#):-1
function comparePriority (new_one, stack_top) {
  if (new_one === '&') {
    if (stack_top === '(' || stack_top === '#') {
      return 1
    } else return 0
  } else if (new_one === '(') {
    return 1
  } else if (new_one === ')') {
    if (stack_top === '#') {
      return 1
    } else if (stack_top === '(') {
      return -1
    } else return 0
  } else {
    if (stack_top === '#') {
      return -1
    } else {
      return 0
    }
  }
}

function operatorDefinition (defination, expression) {
  const stack = new Array()
  stack[0] = '#'
  const reversePoland = new Array()
  const length = expression.length
  let poland_length = 0
  let stack_size = 1
  let i = 0
  // console.log(length);
  // 转逆波兰式
  while (i < length) {
    // 处理运算符
    if (expression[i] === '(' || expression[i] === ')' || expression[i] === '&') {
      let stack_top
      stack_top = stack[stack_size - 1]
      let priority = comparePriority(expression[i], stack_top)
      while (priority === 0) {
        // 运算符优先级低,退栈进入逆波兰式
        if (stack_top === '&') {
          reversePoland[poland_length] = stack_top
          poland_length++
        }
        stack_size--
        stack_top = stack[stack_size - 1]
        priority = comparePriority(expression[i], stack_top)
      }
      // 运算符优先级高,进栈
      if (priority === 1) {
        stack[stack_size] = expression[i]
        i++
        stack_size++
      }

      // 特殊情况:表达式右括号,栈顶左括号:二者全都消失
      else {
        stack_size--
        stack_top = stack[stack_size - 1]
        i++
      }
      /* console.log(reversePoland);
            console.log(stack);
            console.log(i);
            console.log(stack_size); */
    }
    // 处理数
    else {
      // 运算数放到逆波兰式
      const new_expression = expression.substr(i, length - i)
      const current_num = parseInt(new_expression, 10)
      reversePoland[poland_length] = current_num
      poland_length++
      while (!(expression[i] === '(' || expression[i] === ')' || expression[i] === '&')) {
        if (i >= expression.length) break
        i++
      }
      /* console.log(reversePoland);
            console.log(stack);
            console.log(i);
            console.log(stack_size); */
    }
  }

  // 最后把栈退干净
  while (stack_size > 0) {
    const stack_top = stack[stack_size - 1]
    if (stack_top === '&') {
      reversePoland[poland_length] = stack_top
      poland_length++
    }
    stack_size--
  }

  //console.log(reversePoland)
  /* console.log(stack);
    console.log(i);
    console.log(stack_size); */

  // 计算逆波兰式

  // 建立链表
  let polandLink
  let top
  let previousOne
  for (i = 0; i < poland_length; i++) {
    polandLink = new Link(reversePoland[i])
    if (previousOne !== undefined) {
      previousOne.next = polandLink
      polandLink.previous = previousOne
    }
    if (i === 0) {
      top = polandLink
    }
    previousOne = polandLink
    polandLink = undefined
  }

  // 计算
  let current = top
  while (current !== null && current !== undefined) {
    if (current.value === '&') {
      const second = current.previous
      const first = second.previous
      const result = calculateOperator(defination, first.value, second.value)
      current.value = result
      const before = first.previous
      if (before !== undefined && before !== null) {
        before.next = current
        current.previous = before
      } else {
        top = current
        current.previous = null
      }

      //console.log(current)
      //console.log(top)
    }
    current = current.next
  }
  //const ans = Math.floor(top.value) + ''
  const ans = top.value + ''
  //console.log(ans)
  return ans
}
const defination = 'x-y'
const expression = '4&3&((43&19)&(4&3))&4'
operatorDefinition(defination, expression)
