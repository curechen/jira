export const List = ({ list, setList }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {
          list.map(project => (
            <tr>
              <td>{project.name}</td>
              <td>{project.personName}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}