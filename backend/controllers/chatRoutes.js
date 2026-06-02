const express = require("express");
const router = express.Router();

const { iniciarChat } = require("./chatController");

router.post("/chat", iniciarChat);

module.exports = router;

