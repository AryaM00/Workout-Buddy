import React from 'react'
import { useWorkoutsContext } from '../hooks/useworkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const WorkoutDetails = ({workout}) => {
  const {dispatch}=useWorkoutsContext()
  const handleClick = async() => {
    const res = await fetch('http://localhost:5000/api/workouts/'+workout._id,{
      method:'DELETE'
    })
    const data = await res.json()
    if(res.ok){
      dispatch({type:'DELETE_WORKOUT',payload:data})
      console.log('workout deleted',data)
    }
  }
  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load (kg):</strong>{workout.load}</p>
        <p><strong>Reps (kg):</strong>{workout.reps}</p>
        <p >{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
        <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        

    </div>
  )
}

export default WorkoutDetails