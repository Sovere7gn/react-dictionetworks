import Table from 'react-bootstrap/Table';

const CustomTable = ({tableData , setTitle , setFirstName , setLastName, setId}) => {
// console.log(tableData);
const handleItem = (id) => {
    const selectedItem = tableData.find( item => item.ID === id);

    setId(selectedItem.ID);
    setTitle(selectedItem.Personnel_T);
    setFirstName(selectedItem.Access);
    
}

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Personnel</th>
          <th>Access</th>
        </tr>
      </thead>
      <tbody>
    { tableData.length > 0 && tableData.map( item => 
        <tr key={item.ID}  onClick={ () => handleItem(item.ID) } >
        <td>{item.ID}</td>
        <td >{item.Personnel_T}</td>
        <td>{item.Access}</td>
      </tr>
      )
    }
        
      </tbody>
    </Table>
  );
}

export default CustomTable;