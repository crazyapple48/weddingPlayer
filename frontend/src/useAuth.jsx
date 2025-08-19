import { useEffect, useState } from "react";
import axios from "axios";

function UseAuth(initialAccess, refreshToken, expiresIn){
  const [accessToken, setAccessToken] = useState(initialAccess);
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    // refresh 1 min before expiry
    const interval = setInterval(async () => {
      try {
        const { data } = await axios.post("https://192.168.0.39:3000/refresh", { refreshToken });
        console.log("hi")
        setAccessToken(data.accessToken);
      } catch (err) {
        console.error("Failed to refresh token", err);
      }
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}

export default UseAuth;
