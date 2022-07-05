export const isFalsy = (val) => val === 0 ? false : !val

// 若为空值则在传参时不传该属性
export const cleanObject = (object) => {
  const result = {...object} // 浅拷贝，若有引用类型的值那么浅拷贝是会相互影响的
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) { // 这里把 0 这种情况认为是 false，即不会执行删除该属性
      delete result[key]
    }
  })
  return result
}