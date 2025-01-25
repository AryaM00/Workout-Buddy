import React from 'react'
import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useworkoutsContext'
import { set } from 'mongoose'

const WorkoutForm = () => {
    const {dispatch}=useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields,setEmptyFields]=useState([])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = {title, load, reps}
        const res=await fetch('http://localhost:5000/api/workouts',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(workout)
        })
        const data=await res.json()
        if(!res.ok){
            setError(data.message)  
            setEmptyFields(data.emptyFields)

        }
        else{
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('workout created', data)
            dispatch({type:'CREATE_WORKOUT',payload:data})
        }
    }
    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Create Workout</h3>
            <label>Title:</label>
            <input 
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            className={(emptyFields && emptyFields.includes('title'))?'error':''}

            ></input>
            <label>Load:</label>
            <input
            type="number"
            onChange={(e)=>setLoad(e.target.value)}
            value={load}
            className={(emptyFields && emptyFields.includes('load'))?'error':''}
            ></input>
            <label>Reps:</label>
            <input
            type="number"
            onChange={(e)=>setReps(e.target.value)}
            value={reps}
            className={(emptyFields && emptyFields.includes('reps'))?'error':''}
            ></input>
            <button>Create</button>
            {error && <div className='error'>{error}</div>}



        </form>
    )
}

export default WorkoutForm