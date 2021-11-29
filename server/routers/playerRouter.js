const express = require('express');
const router = express.Router();

const PlayerController = require("../controllers/PlayerController");

router.get('/player/all',PlayerController.getAllUsers);
router.put('/player/update', PlayerController.updateUserInfo);
router.get('/player/:playerId', PlayerController.getPlayerById);
router.get('/get-top', PlayerController.getTop10Player);

module.exports = router;