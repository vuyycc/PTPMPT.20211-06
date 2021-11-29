const express = require('express')
const router = express.Router();
const Player = require('../models/Player');
const bcrypt = require('bcrypt')

module.exports.getAllUsers = async (req, res) => {
    let searchText;
    
    if(Object.keys(req.query).length !== 0){
        searchText = JSON.parse(req.query.filter).searchText;
    }

    try {
        let listPlayers = [];

        if( searchText && searchText.trim().length > 0) {
            listPlayers = await Player.findBySearchText(searchText);
        } else {
            listPlayers.forEach((player) => {
                player.id = player.playerId;
            })

            return res.status(200).json(listPlayers)
        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

module.exports.updateUserInfo = async (req, res) => {
    try {
        const {Id, Email, Password, Avatar, Name, Gender, Score, MatchCount, Wincount, LoseCount, Rank } = req.body;
        await Player.update({ Email, Password, Avatar, Name, Gender, Score, MatchCount, Wincount, LoseCount, Rank}, {Id});

        res.status(200).json({
            status: "sucess",
            data: {
                message: "Update User Info Successfully"
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message,
        })
    }
}

module.exports.getPlayerById = async (req, res) => {
    try {
        const { playerId } = req.params;

        const player = await Player.findById(playerId);
        delete player.password;

        if (player) {

            return res.status(200).json(player);
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

module.exports.getTop10Player = async (req, res) => {
    try {
        const listPlayers = [];
        listPlayers = await Player.getTop10Player();
        return res.status(200).json(listPlayers)
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
}

