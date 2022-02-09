const router = require('express').Router();
const chatController = require('../controller/chatController');

router.post('/new-message', chatController.newMessage);
router.get('/get-conversation-id/:conversationId', chatController.getConversationId);
router.post('/new-conversation', chatController.newConversation);
router.get('/get-conversation-one-user/:userId', chatController.getConversationOneUser);
router.get('/get-conversation-all-user/:firstUserId/:secondUserId', chatController.getConversationAllUser);


module.exports = router;