import React, { useContext } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";

function PrivateRoute(props) {
  const { user } = useContext(UserContext);
  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>Oh snap ! You got an error</Alert.Heading>
          <p>You don't have permission to acsess this route</p>
        </Alert>
      </>
    );
  }
  return <>{props.children}</>;
}

export default PrivateRoute;
