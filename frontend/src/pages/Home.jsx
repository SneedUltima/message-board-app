import React, { useState, useEffect } from "react";
import { useContext } from "react";
import Message from "../components/Message";
import MesssageForm from "../components/MesssageForm";
import { MessagesContext } from "../context/MessageContext";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { messages, dispatch } = useContext(MessagesContext);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch("/messages");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_MESSAGES", payload: json });
      }
    };

    return () => {
      fetchMessages();
    };
  }, [dispatch]);

  return (
    <div className="w-screen h-full bg-background-grey flex py-10 sm:py-20 items-center flex-col">
      <div className={"flex flex-col gap-4 w-fit" + (openModal ? "blur" : "")}>
        {messages &&
          messages.map((message) => (
            <Message key={message._id} message={message} />
          ))}
      </div>
      <div className="flex flex-col justify-content items-center">
        {!user && (
          <p className="text-nomad-red font-bold mt-4">
            To add a fact, please login or signup
          </p>
        )}
        <button
          disabled={!user}
          className={
            "bg-nomad-red font-bold text-2xl rounded transition duration-150 hover:bg-nomad-red/75 text-nomad-black px-2 py-2 mt-4 " +
            (openModal ? "blur" : "")
          }
          onClick={() => setOpenModal(true)}
        >
          Add a Fact
        </button>
      </div>
      <MesssageForm modal={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Home;
