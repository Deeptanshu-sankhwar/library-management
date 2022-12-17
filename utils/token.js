const jwt = require('jsonwebtoken');

async function generateToken(user)   {
    let jwtSecretKey = 'secret-key';
    let data = {
        time: Date(),
        userId: user._id.toString(),
    }
    
    const token = jwt.sign(data, jwtSecretKey);
  
    return token;
}

async function validateToken(token)  {
    let jwtSecretKey = 'secret-key';
  
    try {
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return true;
        }else{
            // Access Denied
            return false;
        }
    } catch (error) {
        // Access Denied
        return false;
    }
}

module.exports = {
    generateToken,
    validateToken,
};