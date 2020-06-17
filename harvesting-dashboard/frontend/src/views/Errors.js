import React, {useState} from "react";
import { Container, Button } from "shards-react";
import { Redirect } from 'react-router-dom'

const Errors = () => {
  const [redirect, setredirect] = useState(false);
  if(redirect) return  <Redirect to="/"/>;
  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <div className="error">
        <div className="error__content">
          <h2>500</h2>
          <h3>Something went wrong!</h3>
          <p>There was a problem on our end. Please try again later.</p>
          <Button pill onClick={()=> setredirect(true)}>&larr; Main page</Button>
        </div>
      </div>
    </Container>
  )
};

export default Errors;
