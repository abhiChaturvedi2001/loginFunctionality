import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../utils/AuthSlice";

const Home = () => {
  const token = useSelector((store) => store.authSlice.token);
  const user = useSelector((store) => store.authSlice.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAuthentication();
  }, [token]);
  const fetchAuthentication = async () => {
    const data = await fetch(`http://localhost:4000/v1/auth/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await data.json();
    dispatch(getUser(response.user));
  };

  return <div>{user ? user.name : "please logged in first"}</div>;
};

export default Home;
