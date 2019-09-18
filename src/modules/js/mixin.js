let mixin = {
  filters: {//过滤器
    twoNum: (n) => {
      if (n)
        return n.toFixed(2)
    },
    time: (n) => {
      if (n) {
        let date = new Date(n),
          Y = date.getFullYear() + '-',
          M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
          D = date.getDate() + ' ',
          h = date.getHours() + ':',
          m = date.getMinutes() + ':',
          s = date.getSeconds();
        return M + D + h + m + s
      }
    }
  },
}

export default mixin
