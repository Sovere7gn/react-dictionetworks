import Table from 'react-bootstrap/Table';

const CustomTable = ({tableData}) => {
console.log(tableData)

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Office</th>
          <th>Email</th>
          <th>Term</th>
          <th>Definition</th>
          <th>Acronym</th>
          <th>Additional Information</th>
          <th>Document Title</th>
          <th>Document Code</th>
          <th>Document Link</th>
          <th>Note</th>
          <th>CUD</th>
          
        </tr>
      </thead>
      <tbody>
    { tableData.length > 0 && tableData.map( item => 
        <tr key={item.ID}>
        <td>{item.ID}</td>
        <td>{item.Name}</td>
        <td>{item.Office}</td>
        <td>{item.Email}</td>
        <td >{item.Term}</td>
        <td >{item.Definition}</td>
        <td >{item.Acronym}</td>
        <td >{item.Additional}</td>
        <td >{item.DocuTitle}</td>
        <td >{item.DocuCode}</td>
        <td >{item.DocuLink}</td>
        <td >{item.Note}</td>
        <td >{item.CUD}</td>

      </tr>
      )
    }
        
      </tbody>
    </Table>
  );
}

export default CustomTable;