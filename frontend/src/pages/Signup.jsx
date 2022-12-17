import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, loading, error } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(displayName, email, password);
    navigate("/");
  };

  return (
    <div className="w-screen h-screen bg-background-grey flex justify-center items-center">
      <form
        className="flex flex-col py-8 px-8 justify-center gap-2  bg-background-lightgrey mb-20 rounded-2xl drop-shadow-md"
        onSubmit={handleSubmit}
      >
        <h3 className="text-white flex justify-center font-bold text-3xl">
          Signup
        </h3>

        <label className="text-2xl text-white">Display Name:</label>
        <input
          type="display-name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="p-2 rounded"
        />

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
          Signup
        </button>
        {error && <div className="text-nomad-red">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
