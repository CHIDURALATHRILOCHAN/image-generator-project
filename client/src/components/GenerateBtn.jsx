import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
const GenerateBtn = () => {
  const {user,setShowLogin} = useContext(AppContext)
  const navigate = useNavigate();
  const onClickHandler = () => {
    if(user){
      navigate('/result');
    }
    else{
      setShowLogin(true);
    }
  }
  return (
    <motion.div
    initial={{opacity:0.2, y:50}}
      transition={{duration:1}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
       className='pb-16 text-center'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neural-800 py-6 md:py-16'>See the magic. Try now</h1>
      <button className='sm:text-lg text-white bg-black flex items-center gap-2 rounded-full px-12 py-2.5 m-auto transition-all hover:scale-105 duration-500' onClick={onClickHandler}>Generate Images
        <img className='h-6' src={assets.star_group}/>
      </button>
    </motion.div>
  )
}

export default GenerateBtn
