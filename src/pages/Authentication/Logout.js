import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";

import withRouter from "../../Components/Common/withRouter";

const Logout = (props) => {
  const dispatch = useDispatch();

  const { isUserLogout } = useSelector((state) => ({
    isUserLogout: state.Login.isUserLogout,
  }));

  useEffect(() => {
    sessionStorage.removeItem("authUser");
  }, [dispatch]);

  if (isUserLogout) {
    return <Navigate to="/login" />;
  }

  return <></>;
};

export default withRouter(Logout);