import { List } from "./list"
import { SearchPanel } from "./search-pannel"
import { useEffect, useState } from 'react';

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])

  useEffect(() => {
    fetch('').then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [param])
  return (
    <>
      <SearchPanel param={param} setParam={setParam} />
      <List list={list} setList={setList} />
    </>
  )
}