import { List } from "./list"
import { SearchPanel } from "./search-pannel"
import { useEffect, useState } from 'react';
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from '../../utils/http';

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 2000) // 对 param 的更新进行防抖设置

  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  const client = useHttp()

  useEffect(() => {
    client('projects', {data: cleanObject(debouncedParam)}).then(setList)
  }, [debouncedParam]) // 当 param 发生变化时就去执行查询

  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  )
}