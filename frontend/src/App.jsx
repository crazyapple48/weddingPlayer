import Dashboard from "./dashboard";
import Login from "./login";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLogin } from "./authentication/auth";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const loginMutation = useLogin(code);
  const queryClient = useQueryClient();

  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    const storedToken = localStorage.getItem("spotify-token");
    if (storedToken) {
      queryClient.setQueryData(["spotify-token"], JSON.parse(storedToken))
    }
    setHydrated(true)
  }, [queryClient])
  
  const cachedToken = queryClient.getQueryData(["spotify-token"]);
  
  useEffect(() => {
    if (code && !cachedToken) {
      loginMutation.mutate();
    }
  }, [code, queryClient]);

  if (!hydrated) {
    return <span>Loading app...</span>;
  }

  if (cachedToken) {
    return <Dashboard />;
  }
  if (code) {
    return <span>Loggin in....</span>;
  }
  
  return <Login />;
  
}

export default App;
