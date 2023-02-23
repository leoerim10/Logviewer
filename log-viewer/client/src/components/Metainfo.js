import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Stack, Chip} from '@mui/material'; 
import InfoIcon from '@mui/icons-material/Info';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// defines a style object to be used in the component
const style = {
  width: 'fit-content',
  maxWidth: 700,
  bgcolor: 'background.paper',
};


/**
 * returns the value of a given key from a nested json object
 * @param {*} obj the JSON object to search
 * @param {*} key the key to search for
 * @returns the value associated with the key, or null if not found
 */
const getValueFromNestedJSON = (obj, key) => {
  for (let i in obj) {
    if (i === key) return obj[i]; // if the key is found, return its value
    if (typeof obj[i] === 'object') {
      let result = getValueFromNestedJSON(obj[i], key); // recursively search nested objects
      if (result) return result; // if the key is found, return its value
    }
  }
  return null; // key not found
};


/**
 * returns text for given key from a nested json object
 * @param {*} obj the JSON object to search
 * @param {*} key the key to search for
 * @returns "yes" if found, or "no" if not found
 */
const getBooleanFromNestedJSON = (obj, key) => {
  for (let i in obj) {
    if (i === key) return obj[i]; // if the key is found, return its value
    if (typeof obj[i] === 'object') {
      let result = getValueFromNestedJSON(obj[i], key); // recursively search nested objects
      if (result) return "yes"; // if the key is found, return "yes""
    }
  }
  return "no"; // key not found
};


/**
 * Component that renders a card containing metadata information
 * @param {object} logObj - object containing log data
 */
export default function ListDividers(logObj) {

  // renders a card with an accordion component that displays metadata information
  return (
    <Card sx={{ width: 'fit-content', minWidth: '22%'}}>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {/* chip displaying the title of the metadata information section */}
          <Stack direction="row" spacing={1}>
                <Chip label="Meta information" icon={<InfoIcon />} variant="outlined" />
            </Stack>
        </AccordionSummary>
        <AccordionDetails>
            <CardContent>
               {/* list displaying the metadata information */}
              <List sx={style} component="nav" aria-label="mailbox folders">
                <ListItem button>
                  <ListItemText primary="RunID:"  />
                  {/* value of the run ID */}
                  <strong>
                  {getValueFromNestedJSON(logObj, "runId")} 
                  </strong>
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText primary="Const Data: " />
                  <strong>
                  {getValueFromNestedJSON(logObj, "constTags")}
                  </strong>
                </ListItem>
                <Divider light />
                <ListItem button>
                  <ListItemText primary="Tenant:" />
                  <strong>
                  {getValueFromNestedJSON(logObj, "tenant")}
                  </strong>
                </ListItem>
                <Divider light />
                <ListItem button>
                  <ListItemText primary="Flowpath:" />
                  <strong>
                  {getValueFromNestedJSON(logObj, "flowPath")}
                  </strong>
                </ListItem>
                <Divider light />
                <ListItem button>
                  <ListItemText primary="Testrun:" />
                  <strong>
                    {getBooleanFromNestedJSON(logObj, "dry-run")}
                  </strong>
                </ListItem>
                <Divider light />
                <ListItem button>
                  <ListItemText primary="Timestamp:" />
                  <strong>
                  {getValueFromNestedJSON(logObj, "timestamp")}
                  </strong>
                </ListItem>
                <Divider light />
              </List>
              </CardContent>
          </AccordionDetails>
      </Accordion>
    </Card>
  );
}
