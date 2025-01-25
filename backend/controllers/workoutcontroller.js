const Workout = require('../models/workoutmodel');
const mongoose = require('mongoose');   

// Get all workouts
const getWorkouts = async (req,res)=>{
    try{
        const workouts = await Workout.find({}).sort({createdAt:-1})
        res.status(200).json(workouts)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}


// Get a single workout
const getWorkout= async (req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    { 
        return res.status(404).json({message:'No workout with that id'});
    }
    try{
        const workout = await Workout.findById(req.params.id)
        res.status(200).json(workout)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}


//create a new workout


const createWorkout = async (req,res)=>{
    const {title,reps,load} = req.body
    let emptyFields = [];
    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(emptyFields.length>0){
        return res.status(400).json({message:`Please fill in the following fields: ${emptyFields.join(', ')}`})
    }

    try{
        const workout= await Workout.create({title,reps,load})
        res.status(200).json(workout)

    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}




//delete a workout
const deleteWorkout = async (req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    { 
        return res.status(404).json({message:'No workout with that id'});
    }
    try{
        const workout = await Workout.findByIdAndDelete(req.params.id);
        if(!workout){
            return res.status(404).json({message:'No workout with that id'});
        }
        res.status(200).json(workout)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }

}

//update a workout
const updateWorkout = async (req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    { 
        return res.status(404).json({message:'No workout with that id'});
    }
    try {
        const workout = await Workout.findByIdAndUpdate(
            { _id: req.params.id },  // Filter by ID
            req.body,                // Update fields
            { new: true, runValidators: true } // Return updated document and validate
        );
    
        if (!workout) {
            return res.status(404).json({ message: 'No workout with that id' });
        }
    
        res.status(200).json(workout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    
}

module.exports  ={
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}