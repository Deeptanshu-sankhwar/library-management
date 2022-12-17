const { User } = require('../models/user');
const { generateToken } = require('../utils/token');

async function signUpController(req, res) {
    const { first_name, last_name, email, password } = req.body;

    let user = new User({
        first_name,
        last_name,
        email,
        password,
    })

    user = await user.save();

    const token = await generateToken(user);

    return res.status(200).json({
        success: true,
        token: token,
        user: user,
        message: 'Successfully signed up',
    })
}

async function logInController(req, res)    {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email, password: password });

    if (user)   {
        const token = await generateToken(user);

        return res.status(200).json({
            success: true,
            token: token,
            user: user,
            message: 'Successfully logged up',
        })
    } else {
        return res.status(400).json({
            success: false,
            message: 'Invalid email or password',
        })
    }
}

module.exports = {
    signUpController,
    logInController,
}