import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Message = ({ message }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="border-4 border-nomad-red hover:border-nomad-red/75 rounded-xl py-4 px-5 text-white cursor-pointer mx-8 bg-background-lightgrey lg:w-[1000px] md:w-[700px] w-[300px]">
      <h1 className="font-bold mb-2 border-2 w-fit px-1 rounded-lg">
        Topic: {message.topic}
      </h1>
      <h2 className="mb-2">{message.message}</h2>
      <h2>
        Posted by{" "}
        {user ? (
          <span className="font-bold">{message.author}</span>
        ) : (
          <span className="font-bold">Anonymous</span>
        )}
      </h2>
      <h2 className="italic">
        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
      </h2>
    </div>
  );
};

export default Message;
