import { useEffect, useState } from "react"

export const isFalsy = (value: any) => value === 0 ? false : !value

// 若为空值则在传参时不传该属性
export const cleanObject = (object: object) => {
  const result = {...object} // 浅拷贝，若有引用类型的值那么浅拷贝是会相互影响的
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) { // 这里把 0 这种情况认为是 false，即不会执行删除该属性
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, []) // 传空数组那么只会执行一次
}

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout) // 清除副作用是在每次 Effect 前执行
  }, [value, delay])

  return debounceValue // 保留有对数组的引用
}