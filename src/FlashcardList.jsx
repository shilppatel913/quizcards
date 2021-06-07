import React from 'react'
import Flashcard from './Flashcard'
function FlashcardList(props){
    const{
        flashcard_object
    }=props
    return(
        <>
        <div className="card-grid">
            {flashcard_object.map((flashcard,index)=>{
                return <Flashcard flashcard_object={flashcard} key={index} />
            })}
            </div>
        </>
    )
}
export default FlashcardList