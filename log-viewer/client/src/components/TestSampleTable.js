import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const rows = [
];

// prop [json1, json2, json3]
// column headers: Object.keys(json1).map

const SampleTable = (logObj) =>{
//console.log("logobject")
//console.log(logObj)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    // check if empty array was passed, render only if not the case
    logObj.logObj.length !== 0 && <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {
              
               Object.keys(logObj.logObj[0]).map((el) => (
                <TableCell
                   /* key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}  */
                >
                  {el}
                </TableCell>
              ))}
              

{
    
}

        </TableRow>
          </TableHead>
          <TableBody>
            {logObj.logObj
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((obj) => {
                const colkeys = Object.keys(logObj.logObj[0])
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} >
                    {colkeys.map((key) => {
                      const value = obj[key]?.toString()
                      return (
                        <TableCell >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default SampleTable