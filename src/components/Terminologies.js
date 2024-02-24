import Table from 'react-bootstrap/Table';

const Terminologies = ({tableData}) => {

  return (
    <Table style={{ width: '100vw' }}>
      <thead style={{ position: 'sticky', top: '0', backgroundColor: '#fff', zIndex: '10' }}>
        <tr>
          {/* <th>ID</th> */}
          <th>Term</th>
          <th>Definition</th>
          <th>Acronym</th>
          <th>Document Code</th>
          <th>Document Title</th>
          <th>Effectivity Date</th>
        </tr>
      </thead>
      <tbody>
    { tableData.length > 0 && tableData.map( item => 
        <tr key={item.ID}>
        {/* <td>{item.ID}</td> */}
        {/* term */}
        <td >{item.field_1}</td>
        {/* definition */}
        <td>{item.field_2}</td>
        {/* acronym */}
        <td>{item.field_4}</td>
        {/* document code */}
        <td>{item.field_8}</td>
        {/* document_title = Convert here field_10 to href for field_9 */}
        <td><a href={item.field_10}>{item.field_9}</a></td>
        {/* effectivity date */}
        <td>{item.field_11}</td>
      </tr>
      )
    }
        
      </tbody>
    </Table>
  );
}

export default Terminologies;