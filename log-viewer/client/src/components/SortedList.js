import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// Style to be applied to the list component
const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

/**
 * This function takes an array of log objects and returns a dictionary with the count
 * of each unique 'step' value in the array.
 * 
 * @param {Object[]} arr - An array of log objects.
 * @param {string} arr[].step - A 'step' value in the log object.
 * 
 * @returns {Object} - A dictionary with the count of each unique 'step' value in the array.
 */
function collectStepValues(arr) {
  let counts = {};
  arr.map((el) => {
    // If the 'step' value is already in the dictionary, increment its count by 1.
    // Otherwise, create a new entry for the 'step' value with a count of 1.
    if (counts[el.step]) {
      counts[el.step] = counts[el.step] + 1;
    } else {
      counts[el.step] = 1;
    }
  });

  // Calculate the total count of all 'step' values.
  let tot = Object.values(counts).reduce(function (a, b) {
    return a + b;
  }, 0);
  return counts;
}

// A functional component that renders a list of 'step' values with their counts and
// allows the user to filter the log data based on a selected 'step' value.
export default function SortedList(props) {
  // Get the count of each 'step' value in the log data.
  let valCounts = collectStepValues(props.logObj);
  // Calculate the total count of all 'step' values.
  const totaldata = Object.values(valCounts).reduce(function (a, b) {
    return a + b;
  }, 0);
  // A state variable to hold the color of the list items.
  const [color, setColor] = useState('#' + Math.floor(Math.random() * 16777215).toString(16));

  return (
    <div>
      {/* Display the total count of all 'step' values. */}
      <p>
        <Box display="inline-flex">
          <Stack direction="row" spacing={1}>
            <Chip label={'Total log data: ' + totaldata} color="success"></Chip>
          </Stack>
        </Box>
      </p>
      {/* Render a list of 'step' values with their counts. */}
      <List sx={style} component="nav" aria-label="mailbox folders">
        {Object.keys(valCounts).map((e) => {
          return (
            <>
              <ListItem
                button
                style={{ color: color }}
                onClick={() => {
                  // Call the 'filterAttr' function passed as a prop to filter the log data by 'step' value.
                  props.filterAttr(e);
                  // Update the color of the list item to a random color.
                  setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
                }}
              >
                <ListItemText primary={e + ':  ' + valCounts[e]} />
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    </div>
  );
}
