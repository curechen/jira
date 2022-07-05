import { List } from "./list"
import { SearchPanel } from "./search-pannel"
import { useEffect, useState } from 'react';
import { cleanObject } from "utils";
import qs from "qs"

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
      if (response.ok) {
        setList(await response.json()) // 为什么要用 await
      }
    })
  }, [param]) // 当 param 发生变化时就去执行查询

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  }, []) // 传空数组那么只会执行一次

  return (
    <>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} setList={setList} />
    </>
  )
}