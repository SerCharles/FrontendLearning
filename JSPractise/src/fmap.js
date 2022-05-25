"use strict"
function a (i) {
  return i * 2
}
function fmap (f, functor) {
  let answer = new Array()
  let i = 0
  let length = functor.length
  for (i = 0; i < length; i++) {
    if (functor[i] === null) {
      answer[i] = null
    } else if (typeof (functor[i]) === 'number') {
      answer[i] = f(functor[i])
    } else {
      answer[i] = fmap(f, functor[i])
    }
  }
  // console.log(ans);
  return answer
}
var array = [1, [2, 3, [4]], [5, [6]], []]
fmap(a, array)
