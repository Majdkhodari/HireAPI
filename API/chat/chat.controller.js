// const Company = require("../../models/Company");
const User = require("../../models/User");
const Chat = require("../../models/Chat");
const Messages = require("../../models/Messages");

exports.createChat = async (req, res, next) => {
  try {
    // if (req.file) {
    //   req.body.image = `/${req.file.path}`;
    //   req.body.image = req.body.image.replace("\\", "/");
    // }
    //*create new company:
    // req.body.user = req.user._id;

    // console.log(req.body, "Hassan testing");
    const newChat = await Chat.create(req.body);
    // console.log(req.user, "hhhebfdjr");
    await User.findByIdAndUpdate(req.body.jobSeekerID, {
      $push: { chats: newChat._id },
    });
    await User.findByIdAndUpdate(req.body.companyID, {
      $push: { chats: newChat._id },
    });
    return res.status(201).json(newChat);
  } catch (error) {
    next(error);
  }
};

exports.ChatDelete = async (req, res, next) => {
  try {
    // const newChat = await Chat.create(req.body);
    // console.log(req.user, "hhhebfdjr");
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { chats: req.body._id } },
      { new: true }
    );
    return res.status(200).json(newChat);
  } catch (error) {
    next(error);
  }
};

exports.fetchOwnerChats = async (req, res, next) => {
  try {
    const allChats = await Chat.find().populate("messages");
    allChats.filter(
      (chat) =>
        chat.companyID === req.user._id || chat.jobSeekerID === req.user._id
    );

    return res.json(allChats);
  } catch (error) {
    next(error);
  }
};

exports.createMessage = async (req, res, next) => {
  try {
    req.body.sender = req.user._id;
    const newMessage = await Messages.create(req.body);
    await Chat.findByIdAndUpdate(
      req.body.chat,
      { $push: { messages: newMessage._id } },
      { new: true }
    );
    return res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

exports.fetchMessages = async (req, res, next) => {
  try {
    const allmessages = await Messages.find();

    return res.json(allmessages);
  } catch (error) {
    next(error);
  }
};
