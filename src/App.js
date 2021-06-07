import React,{useState,useEffect, useRef} from 'react'
import './App.css';
import axios from 'axios'
import FlashcardList from './FlashcardList'
function App() {
  const [flashcards,setFlashCards]=useState(flashcard_object)
  const [category,setCategory]=useState([])
  const categoryEl=useRef()
  const amountEl=useRef()
  useEffect(()=>{
      axios.get('https://opentdb.com/api.php?amount=10')
      .then((response)=>{
        // console.log(response.data)
        //iterate in the results
        setFlashCards(response.data.results.map((questionPaper,index)=>{
          const answer=decodeString(questionPaper.correct_answer);
          const options=[...questionPaper.incorrect_answers.map(a=>decodeString(a))
            ,answer]
          return{
            id:index,
            question:decodeString(questionPaper.question),
            answer:answer,
            options:options.sort(()=> Math.random()-0.5)
          }
        }))
        // console.log(response.data.results[0].correct_answer)
      })
  },[])
  useEffect(()=>{
    axios.get('https://opentdb.com/api_category.php')
    .then(response=>{
      setCategory(response.data.trivia_categories.map((arrElem,index)=>{
        return{
          id:arrElem.id,
          category:arrElem.name
        }
      }))
    })
  },[])

  //to convert the html into human readable format
  function decodeString(str){
    var textArea=document.createElement('textarea')
    textArea.innerHTML=str
    return textArea.value
  }
  function handleSubmit(e){
    e.preventDefault() 
    axios.get('https://opentdb.com/api.php',{
      params:{
        amount:amountEl.current.value,
        category:categoryEl.current.value
      }
    })
    .then((response)=>{
      // console.log(response.data)
      //iterate in the results
      setFlashCards(response.data.results.map((questionPaper,index)=>{
        const answer=decodeString(questionPaper.correct_answer);
        const options=[...questionPaper.incorrect_answers.map(a=>decodeString(a))
          ,answer]
        return{
          id:index,
          question:decodeString(questionPaper.question),
          answer:answer,
          options:options.sort(()=> Math.random()-0.5)
        }
      }))
      // console.log(response.data.results[0].correct_answer)
    })
  }
  return (
    <>
    <div className="container">
      <form onSubmit={handleSubmit} className="form-control">
        <div className="form-group">
        <label htmlFor="category">Category:</label><br/>
        <select id="category" ref={categoryEl}>
         {category.map((cat,index)=>{
           return <option value={cat.id} key={index}>{cat.category}</option>
         })}
        </select></div>
        <div className="form-group">
        <label htmlFor="nquestions">Number of questions:</label><br/>
        <input type="number" min="1" id="amount" ref={amountEl}/></div>
        <div className="form-group">
        <button className="btn" type="submit">Generate</button></div>
      </form>
      <FlashcardList flashcard_object={flashcards} /></div>
    </>
  );
}

const flashcard_object=[
  {
    id:1,
    question:"what is your name ",
    answer:"shilp",
    options:["shilp","chavi","dj","parul"]
  },
  {
    id:2,
    question:"what is your surname ",
    answer:"patel",
    options:["shilp","patel","dj","parul"]
  }
]
export default App;
