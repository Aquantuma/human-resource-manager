export const imgerr = {
  inserted: (el, option) => {
    // 当img标签的src属性为空时传递赋值
    el.src = el.src || option.value
    // 监听img元素的错误事件
    el.onerror = () => {
      console.log(el.src)
      el.src = option.value
    }
  }
}
