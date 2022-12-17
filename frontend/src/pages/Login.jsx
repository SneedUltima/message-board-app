import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    navigate("/");
  };

  return (
    <div className="w-screen h-screen bg-background-grey flex justify-center items-center">
      <form
        className="flex flex-col py-8 px-8 justify-center gap-2  bg-background-lightgrey mb-20 rounded-2xl drop-shadow-md"
        onSubmit={handleSubmit}
      >
        <h3 className="text-white flex justify-center font-bold text-3xl">
          Login
        </h3>

        <label className="text-2xl text-white">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded"
        />

        <label className="text-2xl text-white">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded"
        />

        <button
          disabled={loading}
          className="bg-nomad-red font-bold text-2xl rounded mt-2 transition duration-150 hover:bg-nomad-red/75 text-nomad-black"
        >
          Login
        </button>
        {error && <div className="text-nomad-red">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
