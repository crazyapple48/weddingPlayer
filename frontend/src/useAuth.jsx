import { useEffect, useState } from "react";
import axios from "axios";

function UseAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("https://192.168.0.39:3000/login", {
        code,
      })
      .then((res) => {
        console.log(res.data.accessToken)
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.setExpiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch((err) => {
        console.error(err);
        window.location = "/login";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken && !expiresIn) return;

    const interval = setInterval(() => {
      axios
        .post("https://192.168.0.39:3000/refresh", {
          refreshToken,
        })
        .then((res) => {
          console.log(res.data.accessToken)
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch((err) => {
          console.error(err);
          window.location = "/login";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);
}

export default UseAuth;
