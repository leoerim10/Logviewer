import React, {useCallback, createRef, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Card } from '@mui/material'
import {FcUpload} from "react-icons/fc"
import {LinearProgress} from '@mui/material'


/**
 * MyDropzone component that enables drag and drop of log files and provides the file contents to the parent component
 *
 * @param {Object} props - React props object
 * @param {Function} props.getAnswer - Function to receive the contents of the file dropped
 *
 * @returns {JSX.Element} React component with a Card and drag and drop functionality
 */
function MyDropzone(props) {
  const [progress, setProgress] = useState(0) // Define a state variable for the upload progress and initialize it to zero.
  const onDrop = useCallback((acceptedFiles) => { // Define a callback function that is invoked when a file is dropped in the dropzone.
    acceptedFiles.forEach((file) => { // Iterate through each accepted file and read its content using FileReader.
      const reader = new FileReader()

      reader.onabort = () => alert('file reading was aborted') // Set up event listeners for FileReader to handle errors and progress.
      reader.onerror = () => alert('file reading has failed')
      reader.onprogress = (data) => {
        console.log("loading")
        let pr = Math.ceil(data.loaded / data.total * 100) // Calculate the upload progress and update the state.
        console.log(pr)
        setProgress(pr)
      }
      
     file.text().then( // Read the text content of the file and pass it to the parent component using a prop.
        (ans)=>{
          props.getAnswer(ans)
        }
      )
    })
    
  }, [progress])
  const {getRootProps, getInputProps} = useDropzone({onDrop}) // Use the useDropzone hook to get props for the dropzone area.

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Card elevation={"20"} variant="outlined" alignItems="center" sx={{ width:'50%', margin: '0 auto'}}>{
        <div style={{"text-align": "center"}}>
          <h3>Drag and drop a log file here, or click to select files</h3>
          <FcUpload size="100" />  {/* Render an icon for uploading files. */}
          <LinearProgress variant="determinate" value={progress} /> {/* Render a progress bar to show the upload progress. */}
        </div>
      }</Card>
      
    </div>
  )
}

export default MyDropzone

