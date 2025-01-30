const express = require('express');
const connectionRouter = express.Router();
const { userAuth } = require('../middlewares/authAdmin');
const ConnectionRequestModel = require('../models/connectionRequest');
const User = require('../models/user');

connectionRouter.post('/connection/send/:status/:toUserId', userAuth, async (req, res) => {
  try {
    const user = req.user;
    const fromUserId = user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status type" });
    }

    if (fromUserId == toUserId) {
      return res.status(400).json({ error: "You can't send a request to yourself" });
    }

    const receiverUser = await User.findById(toUserId);
    if (!receiverUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingRequest = await ConnectionRequestModel.findOne({
      $or: [
        { fromUserId: fromUserId, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    });

    if (existingRequest) {
      return res.status(400).json({ error: "Connection request already exists" });
    }

    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status
    });

    const data = await connectionRequest.save();

    return res.json({
      message: status === "interested"
        ? `${user.firstName} sent a request to ${receiverUser.firstName}`
        : `${user.firstName} is not interested in ${receiverUser.firstName}`,
      data
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

connectionRouter.post('/connection/review/:status/:requestId', userAuth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;
    const status = req.params.status;
    const requestId = req.params.requestId;

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status type" });
    }

    const requestExist = await ConnectionRequestModel.findById(requestId);
    if (!requestExist) {
      return res.status(404).json({ error: "Request does not exist" });
    }

    if (requestExist.toUserId.toString() !== userId.toString()) {
      return res.status(403).json({ error: "You are not authorized to review this request" });
    }

    requestExist.status = status;
    const data = await requestExist.save();

    const senderUser = await User.findById(requestExist.fromUserId);
    if (!senderUser) {
      return res.status(404).json({ error: "Sender user not found" });
    }

    return res.json({
      message: status === "accepted"
        ? `${user.firstName} accepted the request from ${senderUser.firstName}`
        : `${user.firstName} rejected the request from ${senderUser.firstName}`,
      data
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = connectionRouter;
