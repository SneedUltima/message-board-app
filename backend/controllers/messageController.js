const Message = require("../models/messageModel");
const mongoose = require("mongoose");

const createMessage = async (req, res) => {
  const { topic, message, author } = req.body;

  if (!topic || !message || !author) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    const createdMessage = await Message.create({ topic, message, author });
    res.status(200).json(createdMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  const messages = await Message.find({}).sort({ createdAt: -1 });

  res.status(200).json(messages);
};

const getMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such message" });
  }

  const message = await Message.findById(id);

  if (!message) {
    return res.status(404).json({ error: "No such message" });
  }

  res.status(200).json(message);
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such message" });
  }

  const message = await Message.findOneAndDelete({ _id: id });

  if (!message) {
    return res.status(404).json({ error: "No such message" });
  }
};

const updateMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such message" });
  }

  const message = await Message.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!message) {
    return res.status(404).json({ error: "No such message" });
  }

  res.status(200).json(message);
};

module.exports = {
  createMessage,
  getMessages,
  getMessage,
  deleteMessage,
  updateMessage,
};
