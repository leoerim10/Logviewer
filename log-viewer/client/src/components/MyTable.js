import './table.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import JSONPretty from 'react-json-pretty';

/**
 * Function to create a data object based on individualJSON object
 * @param {Object} individualJSON - The JSON object for which we want to create a data object
 * @returns {Object} Returns a new data object created using individualJSON
 */
function createData(individualJSON) {
  return individualJSON
  }


  /**
 * The row component of the table
 * @param {Object} props - The props passed to the row component
 * @param {Object} props.row - The data for the row component
 * @returns {JSX.Element} Returns the JSX element for the row component
 */
function Row(props) {
  const { row } = props;

  // State to keep track of whether the row is open or close
  const [open, setOpen] = React.useState(false);


  return (
    <React.Fragment>
      {/* Main row */}
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {/* Display the value of the "step" key for the current row */}
        <TableCell component="th" scope="row">
          {row.step}
        </TableCell>
        {/* Display the value of the "tags" key for the current row, if it exists */}
        <TableCell align="right">
          {row.tags?.toString()}
          </TableCell>
           {/* Display the value of the "msg" key for the current row */}
        <TableCell align="right">{row.msg}</TableCell>
           {/* Display the value of the "msg" key for the current row */}
         <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* Display the value of the "srcRow" key for the current row, if it exists */}
        <TableCell>
          {
            row.keyValues.srcRow?.toString()
          }
        </TableCell>
           {/* Nested row to display the contents of the "keyValues" key */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                KeyValues
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                
                   <p>
                    {/* {JSON.stringify(row.keyValues)}  */}

                    {/* seperate table for the information inside keyValues */}
                    <div>
                      <table>
                        <thead>
                          <tr>
                            {
                              Object.keys(row.keyValues).map(e =>{
                                return<th>
                                  {e}
                                </th>
                              })
                            }
                          </tr>
                        </thead>
                      <tbody>
                          <tr>
                            {
                              Object.values(row.keyValues).map(e =>{
                                {
                                  if(typeof e == "object"){
                                    return<td>
                                    {/* shows json object in organised manner if there is still an object inside the keyvalues tables */} 
                                    {<JSONPretty data={e}></JSONPretty>}
                                    {/* with theme <JSONPretty data={e} theme={JSONPrettyMon}></JSONPretty>*/}
                                  </td>
                                  }else{
                                    return<td>
                                    {e.toString()}
                                  </td>
                                  }
                                }
                            })
                            }
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                   </p>
                
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function MyTable(props) {
  let allRows = []

  // use the built-in filter function to filter out those objects from the
  // logObj array which have the value of "step" key as provided by parent 
  // component (App.js) in prop filterAttr.
  // contains only objects whose value of "step" match the filterAttr
  let filteredList = props.logObj.filter(el => el.step===props.filterAttr)

  // if filteredList doesn't provide any result, i.e, empty, then there was no
  // filterAttr provided from App.js, then display the whole logObj array, else keep
  // filteredList as computed above as is (see tertiary expressions in JS)
  filteredList.length ===0?filteredList=props.logObj:filteredList=filteredList

  //populate allRows array using the filtered list from above.
  filteredList.forEach(el => {
    allRows.push(createData(el))
  })



  //console.log(allRows)
  return (
    props.logObj.length !== 0 && <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead style={{backgroundColor:'green', color: 'white',}}>
          <TableRow>
            {/* <TableCell /> */}
             {
              Object.keys(props.logObj[0]).map((el) => (
                <th>   
               {/* <TableCell> */}
                 {el}   
               {/* </TableCell> */}
               </th>
             ))

             } 
             {
              <th>
                SrcRow
              </th>
             }
          </TableRow>
        </TableHead>
        <TableBody>
          {allRows.map((row) => (
            <Row key={row.name} row={row} />
          ))
          }         
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}