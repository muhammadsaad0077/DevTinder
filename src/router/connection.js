const express = require('express')
const connectionRouter = express.Router();
const {userAuth} = require('../middlewares/authAdmin')


connectionRouter.post('/connection', userAuth, (req, res)=>{

    const user = req.user;
  
    res.send(`${user.firstName} Connection Request Send`);
  
  })

  module.exports = connectionRouter;