import React, { useState,useEffect} from 'react'
import "./style.css"


//function to get the local storage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);// to convert into array from string
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata,setInputData]=useState("");
  const [items,SetItems]=useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // adding items functions
  const addItem=()=>{
    if(!inputdata){
      alert("please fill the data")
    }else if(inputdata && toggleButton){
      SetItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    }
    else{
      const myNewInputData={
        id: new Date().getTime().toString(),
        name:inputdata,
      }
      SetItems([...items,myNewInputData])// using spread operator which means previous jo bhi data tha wo included,addind new data so jo naya data add hoga wo hamra inputdata hi hoga
      setInputData("");
    }
  }
 //edit the items
 const editItem = (index) => {
  const item_todo_edited = items.find((curElem) => {
    return curElem.id === index;
  });
  setInputData(item_todo_edited.name);
  setIsEditItem(index);
  setToggleButton(true);
};
  // delete item function
  const deleteItem=(index)=>{
const updatedItem=items.filter((curElem)=>{
return curElem.id !==index;
})
SetItems(updatedItem);
  }

  // function to remove all the elements
 const removeAll=()=>{
  SetItems([]);// deleting every elements
 }
 // adding local storage
 useEffect(()=>{
  localStorage.setItem("mytodolist",JSON.stringify(items))// to convert array into string
 },[items])

  return (
    <div className="main-div">
    <div className="child-div">
      <figure>
        {/* <img src="./images/todo.svg" alt="todologo" /> */}
        <figcaption>Add Your List Here ✌</figcaption>
      </figure>
      <div className="addItems">
        <input
          type="text"
          placeholder="✍ Add Item"
          className="form-control"
          value={inputdata}
          onChange={(event)=>setInputData(event.target.value)}
         
        />
        <i className='fa fa-plus add-btn'onClick={addItem}></i>

      
          </div>
          {/* show our items */}
          <div className='showItems'>
            { items.map((curElem)=>{
              return(
<div className='eachItem' key={curElem.id}>
              <h3>{curElem.name}</h3>
              <div className='todo-btn'>
              <i className='far fa-edit add-btn' onClick={()=>editItem(curElem.id)}></i>
              <i className='far fa-trash-alt add-btn'onClick={()=>
              deleteItem(curElem.id)}></i>

              </div>
            </div>
              )
            })}

          
            
          </div>


          {/* remove all buttons */}
          <div className='showItems'>  <button
              className="btn effect04"
              data-sm-link-text="Remove All" onClick={removeAll}>
              <span> CHECK LIST</span>
            </button></div>
          </div>
          </div>
  )
}

export default Todo
