import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import {motion} from "motion/react";
import { AppContext } from "../context/AppContext";

function Result() {;

    const [image, setImage] = useState(assets.sample_img_1)
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState(false); // FIX: Initialize to false to allow animation from w-0
    const [input,setInput]= useState("");
    const [isImageReady, setIsImageReady] = useState(false); // NEW STATE: To control post-generation buttons


const  {generateImage} = useContext(AppContext);
    const OnSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true); // Start loading animation/text
        setLoadingText(true); // FIX: Start the blue bar animation
        setIsImageReady(false); // Hide previous image actions
        if(input){
            const generatedImage = await generateImage(input) // Renamed 'image' to 'generatedImage' to avoid conflict
            if(generatedImage){
                setImage(generatedImage);
                setIsImageReady(true); // Show post-generation buttons
            }  
        }
        setLoading(false); // Stop "Loading..." text
        setLoadingText(false); // FIX: Reset the blue bar after loading is complete
    }

    const handleGenerateAnother = () => {
        setLoading(false); // Ensure loading is false
        setIsImageReady(false); // Hide post-generation buttons
        setInput(""); // Clear the input field
        setImage(assets.sample_img_1); // Optionally reset to a default image
        setLoadingText(false); // Ensure bar is reset when generating another
    }

    return (
     <motion.form
        initial={{opacity:0.2,y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
            className="flex flex-col min-h-[90vh] items-center " onSubmit={OnSubmitHandler}>
            <div>
                <div className="relative">
                    <img src={image} className="max-w-sm rounded " />
                    {/* FIX: Ensure the span's width is controlled by loadingText */}
                    <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loadingText ? 'w-full transition-all duration-[10s]':'w-0'}`} />
                </div>
                {/* FIX: "Loading..." text should only show when 'loading' is true */}
                {loading && <p>Loading...</p>}
            </div>
            {/* Conditional rendering based on loading and isImageReady */}
            {(!loading && !isImageReady) &&  
                <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Describe what you want to generate "  className="placeholder flex-1 bg-transparent outline-none ml-8 max-sm:w-20"/> 
                    <button type="submit" className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full">Generate </button>        
                </div>
            }
            {isImageReady && 
                <div className="flex gap-2 flex-wrap justify-center mt-10 text-white rounded-full text-sm p-0.5 ">
                    <p onClick={handleGenerateAnother} className="bg-transparent border border-zince-900 text-black px-8 py-3 rounded-full cursor-pointer">Generate Another</p>
       <a href={image} download className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer">Download</a>
              </div>
            }
             </motion.form>
    )
};



export default Result;
