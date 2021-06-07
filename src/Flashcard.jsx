import React,{ useState,useRef, useEffect } from 'react'
function Flashcard(props){
    const{
        flashcard_object
    }=props

    const [flip,setFlip]=useState(false)
    const [height,setHeight]=useState('')
    const frontEl=useRef()
    const backEl=useRef()
    function setMaxHeight(){
        const frontHeight=frontEl.current.getBoundingClientRect().height
        const backHeight=backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight,backHeight,100))
    }
    useEffect(setMaxHeight,[flashcard_object.question,flashcard_object.answer,flashcard_object.options])
    return(
        <>
            <div className={`card ${flip ? 'flip': ''}`}
             onClick={()=>{
                setFlip(!flip)
            }}
            style={{height:height}}>
                {/* {flip ? flashcard_object.answer:flashcard_object.question} */}

                <div className="front" ref={frontEl}>
                    {flashcard_object.question}
                    <div className="flashcard-options">
                        {flashcard_object.options.map((option,index)=>{
                            return <div className="flashcard-option" key={index}>{option}</div>
                        })}
                    </div>
                </div>
                    <div className="back" ref={backEl}>{flashcard_object.answer}</div> 
                 
            </div>
        </>
    )
}
export default Flashcard