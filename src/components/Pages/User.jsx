import { React, Fragment } from "react";
// import axios from 'axios'
// import Config from '../../config'

const User = () => {
  // const [isLoading, setIsLoading] = useState(false)
  // const [data, setData] = useState([])
  // const userURL = `${Config.drupal_live_url}/rest/user`
  // useEffect(()=>{
  //   axios.get(userURL).then((userResponse)=>{

  //   })
  // },[])
  const userName = sessionStorage.getItem("username");
  return (
    <Fragment>
      <div>
        <h1>Username = {userName}</h1>
      </div>
    </Fragment>
  );
};

export default User;
