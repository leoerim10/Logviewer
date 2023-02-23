import './table.css'

const MyTable = (props) => {
 // console.log("output from table component")
// console.log(props.logObj)
    return (
         props.logObj.map(e =>{
          return(
            visualizeJSON(e)
          )
        })
     )  
}

const visualizeJSON = (json) =>{
  return(
    <div>
    <table>
      <thead>
        <tr>
          {
            Object.keys(json).map(e =>{
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
           Object.values(json).map(e =>{
            {
              if(typeof e == "object"){
                return<td>
                 {JSON.stringify(e)} 
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
  )
}

export default MyTable