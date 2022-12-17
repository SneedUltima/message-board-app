import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { MessagesContext } from "../context/MessageContext";
import { AuthContext } from "../context/AuthContext";

const MesssageForm = ({ modal, onClose }) => {
  const { dispatch } = useContext(MessagesContext);
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  let author;

  if (user) {
    author = user.displayName;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fact = { topic, message, author };

    const response = await fetch("/messages", {
      method: "POST",
      body: JSON.stringify(fact),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      dispatch({ type: "CREATE_MESSAGE", payload: json });
      setTopic("");
      setMessage("");
      setError("");
      onClose();
    }
  };

  if (!modal) return null;
  return (
    <div className="fixed top-1/5 left-2/4 -translate-x-2/4 w-3/4 sm:w-96">
      <form
        className=" bg-background-grey px-6 rounded-xl border-2"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between">
          <span></span>
          <p onClick={onClose} className="cursor-pointer text-white pt-2">
            <XMarkIcon className="w-5 text-white font-bold" />
          </p>
        </div>
        <div className="flex flex-col pb-6 gap-4">
          <div className="flex justify-center">
            <h1 className="text-3xl font-bold text-white">Add a Fact</h1>
          </div>
          <label className="text-2xl text-white">Topic:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="p-2 rounded"
            placeholder="Eg. History or Science"
          />
          <label className="text-2xl text-white">Fact Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 rounded resize-none"
            rows="4"
            cols="4"
            placeholder="Eg. The tallest living man is 39-year-old Sultan Kosen, from Turkey, who is 8 feet, 2.8 inches, who set the record in 2009. His growth is also due to a pituitary issue."
          />
          <div className="flex flex-col justify-center items-center">
            <button className="bg-nomad-red font-bold text-2xl rounded mt-2 transition duration-150 hover:bg-nomad-red/75 text-nomad-black w-40">
              Submit
            </button>
            {error && <div className="text-nomad-red">{error}</div>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MesssageForm;
