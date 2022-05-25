"use strict"
function handleTime (input) {
  let date

  // 切分日期和时间
  let day_and_time = new Array()
  day_and_time = input.split(' ')

  // 切分日期
  let day = new Array()
  day = day_and_time[0].split('-')

  // 切分时间
  let time = new Array()
  time = day_and_time[1].split(':')

  date = new Date(parseInt(day[0]), parseInt(day[1]) - 1, parseInt(day[2]), parseInt(time[0]) + 8, parseInt(time[1]), parseInt(time[2]), 0)
  return date
}

function datetimeSort (ddl, arr) {
  let i = 0
  const ans = new Array()

  // 处理ddl
  const ddl_date = handleTime(ddl)

  const time_interval = new Array()

  while (typeof (arr[i]) === 'string') {
    ans[i] = {}
    ans[i].datetime = arr[i]

    const arr_date = handleTime(arr[i])

    time_interval[i] = arr_date.getTime() - ddl_date.getTime()
    let delay_day = Math.floor(1 + time_interval[i] / 86400000)
    if (delay_day <= 0 || time_interval[i] === 0) delay_day = 0
    ans[i].lateDays = delay_day
    i++
  }

  //升序排序,按照的是转化成毫秒的time_interval
  for (let j = 0; j <= i - 1; j++) {
    for (let k = j + 1; k <= i; k++) {
      if (time_interval[k] < time_interval[j]) {
        const temp = time_interval[j]
        time_interval[j] = time_interval[k]
        time_interval[k] = temp
        const temp_ans = ans[j]
        ans[j] = ans[k]
        ans[k] = temp_ans
      }
    }
  }

  // console.log(ans);
  return ans
}

const ddl = '2018-05-05 11:22:33'
const arr = ['2018-05-04 11:22:33', '2017-05-05 11:22:33', '2018-05-05 11:22:33', '2018-05-06 11:22:32', '2018-05-06 11:22:33', '1999-02-08 11:21:35', '2019-08-10 11:45:14']
datetimeSort(ddl, arr)
