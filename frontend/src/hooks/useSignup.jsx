import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useSignup = () => {
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const signup = async (displayName, email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ displayName, email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setLoading(false);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setLoading(false);
    }
  };

  return { signup, error, loading };
};
