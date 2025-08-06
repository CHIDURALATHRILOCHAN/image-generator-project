import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
function Header() {
  const {user,setShowLogin} = useContext(AppContext);
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
    <motion.div className='flex flex-col justify-center items-center my-20'
     initial={{opacity:0.2,y:100}}
     transition={{duration:1}}
     whileInView={{opacity:1,y:0}}
     viewport={{once:true}}>
      <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500' initial={{opacity:0,y:-20}}
     transition={{dealy:0.2,duration:0.8}}
     animate={{opacity:1,y:0}}>
        <p>TEXT TO IMAGE GENERATOR</p>
        <img src={assets.star_icon}/>
     </motion.div>
     <motion.h1 className='text-5xl max-w-[400px] sm:7xl  mx-auto mt-10 text-center' initial={{opacity:0}} transition={{dealy:0.4,duration:2}}
     animate={{opacity:1,y:0}} >Turn Text to <span className='text-blue-600'>Image</span>,
         In Seconds
    </motion.h1>
    <motion.p className='text-center max-w-xl mx-auto mt-5' initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{dealy:0.6,duration:0.8}}> Unleash your creativity with AI. Turn your imagination into visual art in seconds -  just type, and watch the magic happen.</motion.p>
    <motion.button onClick={onClickHandler} className='sm:text-lg text-white bg-black flex items-center gap-2 rounded-full px-12 py-2.5 mt-8' whileHover={{scale:1.05}} whileTap={{scale:0.95}} initial={{opacity:0}} animate={{opacity:1}} transition={{default:{duration:0.5 },opacity:{delay:0.5,duration:2}}}>Generate Images <img className='h-6'src={assets.star_group}/></motion.button>
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{dealy:1,duration:1}} className='flex justify-center gap-3 mt-16 flex-wrap'>
        {Array(6).fill('').map((item,index)=>(
            <img className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"key={index} src={index%2==0?assets.sample_img_1:assets.sample_img_2} width={70}/>
        ))}
        
    </motion.div>
    <p className='mt-1 text-neutral-600'>Generated Images from Imagify </p>
    </motion.div>
  )
}

export default Header
