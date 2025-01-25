require('dotenv').config();
const express= require('express');
const mongoose= require('mongoose');
const workoutRoutes= require('./routes/workout.js');
const cors = require('cors');




// express app
const app = express();
app.use(express.json());
app.use(cors());

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})
//routes
app.use('/api/workouts',workoutRoutes);

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then((result)=>{
        // listen for requests
        app.listen(process.env.PORT,()=>{
            console.log('server is running on port 5000');
        })
        
    })
    .catch((err)=>console.log(err));




