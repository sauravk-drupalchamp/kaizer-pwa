import React from "react";
import { Row, Col } from "antd";
import UserForm from "../Forms/UserForm";

const User = (props) => {

  
  return (
    <Row>
      <Col span={8} offset={4}>
        <UserForm onLogout={props.onLogout}/>
      </Col>
    </Row>
  );
};

export default User;

// const handleChange = async (e)=>{
  //   console.log(e.target.files[0])
  //   const file = e.target.files[0];
  //   const base64 = await convertbase64(file)
  //   console.log("base64",base64)
  // }

  // const convertbase64 = (file)=>{
  //   return new Promise((resolve, reject)=>{
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file)

  //     fileReader.onload = ()=>{
  //       resolve(fileReader.result)
  //     }

  //     fileReader.onerror = (error)=>{
  //       reject(error)
  //     }
  //   })
  // }

//     const [formValues, setFormValues] = useState([{ name: "", email : ""}])

//     let handleChange = (i, e) => {
//         let newFormValues = [...formValues];
//         newFormValues[i][e.target.name] = e.target.value;
//         setFormValues(newFormValues);
//       }

//     let addFormFields = () => {
//         setFormValues([...formValues, { name: "", email: "" }])
//       }

//     let removeFormFields = (i) => {
//         let newFormValues = [...formValues];
//         newFormValues.splice(i, 1);
//         setFormValues(newFormValues)
//     }

//     let handleSubmit = (event) => {
//         event.preventDefault();
//         alert(JSON.stringify(formValues));
//     }

//     return (
//         <form  onSubmit={handleSubmit}>
//           {formValues.map((element, index) => (
//             <div className="form-inline" key={index}>
//               <label>Name</label>
//               <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
//               <label>Email</label>
//               <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
//               {
//                 index ?
//                   <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
//                 : null
//               }
//             </div>
//           ))}
//           <div className="button-section">
//               <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
//               <button className="button submit" type="submit">Submit</button>
//           </div>
//       </form>
//     )
// }

// export default User
