Hook是React 16.8的新增特性，可以在不编写class的情况下使用state及React的特性



useEffect(() => {
    effect
    return () => {
        cleanup
    }
}, [input])

useEffect两个参数（默认每次渲染都会执行）
第一个 回调函数 若返回函数则组件销毁时调用
第二个 参数 数组 哪些state更新会调用



Hook规则
1. 只在最顶层使用hook(不要在循环、嵌套函数、条件中调用hook)
    确保Hook每次渲染中都按照同样的顺序被调用，保持Hook状态的正确

2. 不要在普通的函数中调用Hook
    确保组件的状态逻辑在代码中清晰可见

3. 自定义Hook必须以use开头
    不遵循的话，由于无法判断某个函数是否包含对其内部 Hook 的调用，React 将无法自动检查你
    的 Hook 是否违反了 Hook 的规则
