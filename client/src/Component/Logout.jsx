import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { LogoutUser } from "../utils/AuthSlice";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LogoutUser());
  }, [dispatch(LogoutUser())]);
  return <Navigate to={"/login"} />;
};

export default Logout;
