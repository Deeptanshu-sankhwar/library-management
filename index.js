const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const bookRouter = require('./routes/book');

const PORT = process.env.PORT || 3001;

const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions))

const uri = 'mongodb+srv://user:admin@cluster0.tfse0ma.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connectection established with database ' + uri))
    .catch(err => console.error('Something went wrong connecting', err))



app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// api routes
app.use('/api/user', userRouter);
app.use('/api/book', bookRouter);
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});