
const jwt = require('jsonwebtoken');

const createToken = require('./utils/utils')
const PlayerModel = require('../models/Player')



module.exports.signup = async (req, res) => {
    try {
        const {Email, Password,Name} = req.body;
        
        const player = await PlayerModel.findByEmail(Email);
        if(player) {
            res.json({
                status: 410,
                error: "Tai khoan da ton tai !!"
            })
        }

        // const salt = await bcrypt.genSalt();
        // let hashPassword = await bcrypt.hash(Password, salt);

        const rad = Math.floor(Math.random()*51);
        const linkAvt = "images/"+rad+".png";


        
        const playerId = await PlayerModel.create({
            email: Email,
            password: Password,
            avatar: linkAvt,
            username: Name,
            status: 0,
        });
        res.status(200).json({
            status: 'success',
        });
    }
    catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
}

module.exports.login = async (req, res) => {
    try {
        const {Email, Password} = req.body;
        if(!Email || !Password) {
            return res.status(400).json({
                status: "error",
                nessage: "Authentication is incorrect",
                errors: {
                    Email: !Email && "Email is required",
                    Password: !Password && "Password is required",
                },
            })
        }
        const player = await PlayerModel.findByEmail(Email);
        if(!player) {
            return res.status(400).json({
                status: "error",
                message: "Authentication is incorrect",
                errors: {
                    Email: "Email is incorrect",
                }
            })
        }


        if(Password != player.password) {
            return res.status(400).json({
                status: "error",
                message: "Authentication is incorrect",
                errors: {
                    Password: "Password is incorrect",
                }
            })
        }

        delete player.Password;

        const token = createToken(player, 60*60*24);

        res.status(200).json({
            status: 'success',
            data: {
                token,
                playerInfo: player,
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message,
        })
    }
}