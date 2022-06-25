// import { React, Fragment } from "react";
// // import axios from 'axios'
// // import Config from '../../config'

// const User = () => {
//   // const [isLoading, setIsLoading] = useState(false)
//   // const [data, setData] = useState([])
//   // const userURL = `${Config.drupal_live_url}/rest/user`
//   // useEffect(()=>{
//   //   axios.get(userURL).then((userResponse)=>{

//   //   })
//   // },[])
//   const userName = sessionStorage.getItem("username");
//   return (
//     <Fragment>
//       <div>
//         <h1>Username = {userName}</h1>
//       </div>
//     </Fragment>
//   );
// };

// export default User;

import React, { useState } from 'react'

const App = () => {

    const [formValues, setFormValues] = useState([{ name: "", email : ""}])

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, { name: "", email: "" }])
      }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }

    return (
        <form  onSubmit={handleSubmit}>
          {formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              <label>Name</label>
              <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
              <label>Email</label>
              <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                : null
              }
            </div>
          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
              <button className="button submit" type="submit">Submit</button>
          </div>
      </form>
    )
}

export default App