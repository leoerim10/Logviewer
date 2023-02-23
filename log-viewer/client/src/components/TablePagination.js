import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

/**
 * A simple table pagination component.
 */
export default function TablePaginationD() {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  /**
   * Handles page change event.
   * @param {object} event - Event object.
   * @param {number} newPage - New page value.
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Handles change in rows per page.
   * @param {object} event - Event object.
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
