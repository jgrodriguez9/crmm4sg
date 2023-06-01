import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import withRouter from "../../Components/Common/withRouter";

const Logout = (props) => {

  useEffect(() => {
    localStorage.removeItem("authenticatication-crm");
  }, []);


  return <Navigate to="/login" />;
};

export default withRouter(Logout);