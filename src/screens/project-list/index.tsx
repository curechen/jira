import { List } from "./list"
import { SearchPanel } from "./search-pannel"
import { useEffect, useState } from 'react';
import { cleanObject, useDebounce, useMount } from "utils";
import qs from "qs"

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 2000) // 对 param 的更新进行防抖设置

  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
      if (response.ok) {
        setList(await response.json()) // 为什么要用 await
      }
    })
  }, [debouncedParam]) // 当 param 发生变化时就去执行查询

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })

  return (
    <>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </>
  )
}