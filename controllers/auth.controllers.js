const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/users.model.js")

const login = async (req, res)=>{
    const {email: login, password} = req.body;
    const user = await User.findOne({email: login})
    if(!user) return res.status(404).send({message: "email/password incorrect"});
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) return res.status(404).send({message: "email/password incorrect"});
    const {password: hashedPassword, name, email, _id, ...userInfo} = user.toJSON();
    const token = jwt.sign({name, email, _id}, process.env.JWT_SECRET)
    res.send({
        token,
        user: userInfo
    })
}
const register = async (req, res) => {
    console.log('req.body:', req.body);
    const { password } = req.body;
    if (!password) {
      return res.status(400).send({ message: 'Password is missing' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            ...req.body,
            password: hashedPassword
        });
        await user.save();
        res.send(user);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ message: 'Registration failed' });
    }
}
const verify = (_, res)=>{
    res.send("Verfied")
}
module.exports = {login, register, verify}