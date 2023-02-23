import * as React from 'react';
import Box from '@mui/material/Box';

export default function MyBox() {
  return (
    <Box component="span" sx={{ p: 30, border: '1px dashed grey' }}>
      Drag and drop your log file here
    </Box>
  );
}