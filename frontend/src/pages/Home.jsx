import React from 'react'
import { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useworkoutsContext'
//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {

  const {workouts,dispatch}=useWorkoutsContext()
  useEffect(() => {
    const fecthworkout=async()=>{
      const res=await fetch('http://localhost:5000/api/workouts')
      const data=await res.json()
      if(res.ok)
      {
        dispatch({type:'SET_WORKOUTS',payload:data})
      }
      else
      {
        console.log(data)
      }
      
    }
    fecthworkout()
  }, [])
  return (
    <div className='home'>
        <div className="workouts">
          {workouts && workouts.map((workout)=>(
            <WorkoutDetails key={workout._id} workout={workout}/>
            
          ))}
        </div>
        <WorkoutForm/>

    </div>
  )
}

export default Home