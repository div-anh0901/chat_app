const Message = require('../model/Message');
const Conversation = require('../model/Convesation');

const chatController = {
    newMessage: async (req, res) => {
        const newMessage = new Message(req.body);
        try {
            const savedMessage = await newMessage.save();
            res.status(200).json(savedMessage);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    //get message with conversationId
    getConversationId: async (req, res) => {
        try {
            const messages = await Message.find({
                conversationId: req.params.conversationId
            });
            res.status(200).json(messages);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // new conversataion schema
    newConversation: async (req, res) => {
        const newConversation = await Conversation({
            members: [
                req.body.senderId,
                req.body.receiverId
            ]
        });

        try {
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // get conversation of a user
    getConversationOneUser: async (req, res) => {
        try {
            const conversation = await Conversation.find({
                members: { $in: [req.params.userId] }
            });
            return res.status(200).json(conversation);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    //check conversation
    checkConversation: async (req, res) => {
        try {

        } catch (err) {

        }
    },
    getConversationAllUser: async (req, res) => {
        try {
            const conversation = await Conversation.findOne({
                members: { $all: [req.params.firstUserId, req.params.secondUserId] }
            });
            return res.status(200).json(conversation)
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = chatController;