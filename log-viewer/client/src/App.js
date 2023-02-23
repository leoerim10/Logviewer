import './App.css';
import React, {useEffect, useState} from 'react';
import MyDropzone from './components/MyDropzone';
import MyTable from './components/MyTable';
import Metainfo from './components/Metainfo';
import SortedList from './components/SortedList';
import Navbar from './components/Navbar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

/**
 * The main component for the React app.
 *
 * @returns {JSX.Element} The rendered JSX element.
 */
function App() {
     const [answer, setAnswer] = useState(null); //stores the provided log data

     const [filterVal, setFilterVal] = useState("") // filtered value from sorted list to my table

     const [query, setQuery] = useState(""); // query for search

     const [filteredResults, setFilteredResults] = useState([]); // result for sorted list

     const [searched, setSearched] = useState(false); // searched results

  /*
  a callback function to be sent to the child component "Aggregation" to fetch back
  the name of item to be filtered in the table
  
  @params: childData: data to be sent by child upon some event
  @return : -

  the functions sets the filter term to filterVal which in turn can be sent to 
  another child component "CollpsibleTable" as an attribute. 
  */
  function getFilterValFromChild(childData){
   // console.log(childData)
    setFilterVal(childData)
  }

  /**
 * Handles the file upload functionality by converting the dropped file to JSON and updating the answer state
 *
 * @param {Object} childFileData - the data object containing the dropped file
 * @returns {void}
 */
  function getFileFromDropZone(childFileData){
    //console.log(childFileData)
    setAnswer(convertFileToJson(childFileData))
  }

  /**
 * Handles the search functionality by filtering the answer array based on the search query (q)
 *
 * @param {string} q - the search query to filter the answer array
 * @returns {void}
 */
  const handleSearch = (q) => {
    setQuery(q); // Update the state with the current search query
    const results = answer.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(q.toLowerCase())
    ); // Filter the answer array based on the search query (q)
    setFilteredResults(results); // Update the state with the filtered results
  };

 /**
 * Handles the clear functionality by resetting the search query and searched state
 *
 * @returns {void}
 */
const handleClear = () => {
  setQuery(""); // Reset the search query to an empty string
  setSearched(false); // Reset the searched state to false
};


/**
 * Maps and displays the filtered results in a table format with highlighting of searched query
 *
 * @returns {JSX.Element[]} An array of JSX elements representing the filtered results in a table format
 */
  const results = filteredResults.map((item, index) => (
    <table key={index}>
      <tbody>
        {Object.entries(item).map(([key, value]) => (
          <tr key={key}>
            <th>{key}</th>
            <td>
              {typeof value === "string" &&
                value.split(new RegExp(`(${query})`, "gi")).map((part, i) => (
                  <span
                    key={i}
                    style={
                      part.toLowerCase() === query.toLowerCase()
                        ? { backgroundColor: "yellow" }
                        : {}
                    }
                  >
                    {part}
                  </span>
                ))}
              {typeof value !== "string" && Array.isArray(value) && value.map((val, i) => (
                  <div key={i}>
                    {typeof val === "string" ? (
                      val.split(new RegExp(`(${query})`, "gi")).map((part, j) => (
                        <span
                          key={j}
                          style={
                            part.toLowerCase() === query.toLowerCase()
                              ? { backgroundColor: "yellow" }
                              : {}
                          }
                        >
                          {part}
                        </span>
                      ))
                    ) : (
                      JSON.stringify(val)
                    )}
                  </div>
                ))}
              {typeof value !== "string" && !Array.isArray(value) && value !== null && typeof value === "object" && Object.entries(value).map(([k, v]) => (
                  <div key={k}>
                    <strong>{k}: </strong>
                    {typeof v === "string" ? (
                      v.split(new RegExp(`(${query})`, "gi")).map((part, j) => (
                        <span
                          key={j}
                          style={
                            part.toLowerCase() === query.toLowerCase()
                              ? { backgroundColor: "yellow" }
                              : {}
                          }
                        >
                          {part}
                        </span>
                      ))
                    ) : (
                      JSON.stringify(v)
                    )}
                  </div>
                ))}
              {typeof value !== "string" && !Array.isArray(value) && (value === null || typeof value !== "object") && JSON.stringify(value)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ));
  
  
  
  
  /**
 * Converts a string of newline separated JSON objects into an array of JavaScript objects.
 * 
 * @param {string} fileContent - The string to convert.
 * @returns {Array} An array of JavaScript objects.
 */
 function convertFileToJson(fileContent){
    const value = fileContent; // Store the file contents in a variable.
    const jsonArr = [] // Initialize an empty array to store the JSON objects.
  
    // Split the file contents into an array of lines, and iterate through each line.
    value.split("\n").forEach(function(line) {
      try{
        const jsonObj = JSON.parse(line); // Parse the line as a JSON object.
        jsonArr.push(jsonObj) // Add the JSON object to the array.
      }catch(error){
        // If a line is not valid JSON, ignore it and move on to the next line.
      }
    }
    )
    return jsonArr; // Return the array of JSON objects.
  }
 
  /////////////////////////////////////////////////////////////////////
        ////////// DONT DELETE this useEffect() comment //////////
  ////////////////////////////////////////////////////////////////////

  // fetch the log files from backend as string and parse it later as an json object
  const api = '/getLogData';
  const [file, setFile] = useState()
  useEffect(() => {
/*     const getData = async () => {
      const jsonArr = []
      const response = await fetch(api);
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    
    while (true){
      const {value, done} = await reader.read();
      if (done) break;
      value.split("\n").forEach(function(line) {
        try{
          const jsonObj = JSON.parse(line);
          jsonArr.push(jsonObj)
          //console.log(jsonObj)
        }catch(error){
          //console.log("End of log files");
        }
      }
      )
    }
    return jsonArr;
  }
  getData().then(elem => {
    //console.log(JSON.stringify(elem))
    setAnswer(elem)
    
  }) */
 
},[answer]); 


return (
  <div className='App'>
    <div>
      {/* The Navbar component */}
      {<Navbar handleSearch={handleSearch}/>} 
    </div>
    <div>
      {/* The MyDropzone component with a prop of getAnswer */}
      {<MyDropzone getAnswer={getFileFromDropZone} />}
    </div>
    <div>
    {/* <Button onClick={handleClear}>Clear Search Results</Button> */}
     {/* result of searched term */}
      {results}
    </div>
    
    <Paper style={{ marginBottom: 25}}></Paper>
    { /* A conditional rendering based on the existence of the "answer" state. If "answer" is truthy, display the following subcomponents */}
    {
      answer?

      <div>
        {/* The Metainfo component with a prop of logObj set to the "answer" state */}
        {<Metainfo logObj={answer}/>}
        <Paper style={{ marginBottom: 50}}></Paper>
        <Box display="flex" style={{ flexDirection: 'row' }}>
          {/* A Paper component containing the SortedList component with props of logObj and filterAttr */}
          <Paper style={{ flex: 1 }}>{<SortedList logObj={answer} filterAttr={getFilterValFromChild} />}</Paper>
          {/* A Paper component containing the MyTable component with props of logObj and filterAttr */}
          <Paper style={{ flex: 1 }}>{<MyTable logObj={answer} filterAttr={filterVal} />}</Paper>
        </Box>
        
        
        {/* !file?<ComponentWithoutFile />: <ComponentWithFile />
            or
            file?<ComponentWithFile />: <ComponentWithoutFile> */}
        { /* If "answer" is falsy, display the following subcomponents */}
      </div>:
      <div>
        <h1 style={{ fontSize: 50, fontFamily: 'Arial, sans-serif' }}>Welcome to Quentic Logviewer</h1>
        <img src="./quenticlogohq.png" style={{ width: '300px', height: '300px' }} />
      </div>
    }
  </div>
);
}

export default App;