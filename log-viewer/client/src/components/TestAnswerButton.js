import { useState, useEffect } from "react"
import Button from '@mui/material/Button';
import './table.css'

//for testing weather the data can be parsed from backend to frontend

//reslove the stream content into string
function streamToString (stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    })
  }

const AnswerButton = (props) =>{
    // const [logFileContent, setLogFileContent] = useState()
    //const result = await streamToString(stream)
    const [answer, setAnswer] = useState()
    //setAnswer = props.jsons
    return(<>
        <Button> Response from backend </Button>
          {/*   {
           props.jsons.map(elem =>{
            return(
              <p>
              {elem}
              </p>
            )
          }) 
        }    */} 
      
        </>)
        
}



function printValues(obj) {
  for(var k in obj) {
      if(obj[k] instanceof Object) {
          printValues(obj[k]);
      } else {
          document.write(obj[k] + "<br>");
      };
  }
};

export default AnswerButton