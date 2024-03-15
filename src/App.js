//Tenzies Game
import React,{useState,useEffect, useContext} from 'react';
import Die from './components/Die';
import {nanoid} from 'nanoid';
import { BsToggleOn } from "react-icons/bs";
import { BsToggleOff } from "react-icons/bs";
import {ThemeProvider, ThemeContext} from './components/ThemeContext';
import './App.css';
import Confetti from 'react-confetti';
export default function App(){
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [isMoblie, setisMobile] = useState(false);
  const {theme, toggleTheme} = useContext(ThemeContext);
  useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true);
    }
  },[dice])
  useEffect(()=>{
    const handleResize = () =>{
      setisMobile(window.innerWidth <=768);
    };
    handleResize();
    window.addEventListener('resize',handleResize);
    return() =>{
      window.removeEventListener("resize", handleResize);
    }
  },[])
const rootStyle = {
  '--bg-light': theme === 'dark' ? 'black' : 'white',
  '--color-light': theme === 'dark' ? 'white' : 'black'
};
  function generateNewDie(){
      return {
      value: Math.ceil(Math.random()*6),
      isHeld: false,
      id: nanoid()
      }
}
  function rollDice(){
    if(!tenzies){ 
    (setDice(oldDice => oldDice.map(die => {
     return die.isHeld ? die : generateNewDie() })))
    }
    else{
      setTenzies(false);
      setDice(allNewDice());
    }
}
  function holdDice(id){
       setDice(oldDice => oldDice.map(die => {
        return die.id===id ? {...die,isHeld: !die.isHeld} : {...die}
  }))
}
  function allNewDice(){
    const arr =[];
    for(let i=0;i<10;i++){
    arr.push({
      value: Math.ceil(Math.random()*6),
      isHeld: false,
      id: nanoid()});
  }
  return arr;
}
const diceElements = dice.map(die => <Die key={die.id} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)} value={die.value}/>)

return (
  <ThemeProvider>
    <div style={rootStyle} className='container'>
    <div style={rootStyle} className='main'>
      {tenzies && <Confetti style={{width:"100%", height:"850"}}/>}
      <h1>Tenzies</h1>
      {isMoblie ? 
      <div className='toggle'>
          {theme==="light" ? <><span>Dark</span> 
          <BsToggleOn className='icon' onClick={toggleTheme} /></> :
          <><span>Light</span>
          <BsToggleOff className='icon' onClick={toggleTheme}/></>}
      </div> : 
      <div className='toggle'>
        <span>Darks</span>
        {theme==="light" ? <BsToggleOn className='icon' onClick={toggleTheme} /> :
        <BsToggleOff className='icon' onClick={toggleTheme}/>}
        <span>Lights</span>
      </div> }
      <p>Roll until all dice are the same.</p>
      <div className='dice'>
        {diceElements}
      </div>
      <div className='btn'>
        <button onClick={rollDice}>{tenzies ? "Restart Game" : "Roll"}</button>
      </div>
    </div>
    </div>
    </ThemeProvider>
  )
}












































//Forms
// import React from 'react';
// import "./App.css";
// export default function App(){
//   const [formData, setformData] = React.useState({
//     email: "",
//     password:"",
//     confirm_password:"",
//     checked: false
//   })
//   function handleDisplay(){
//     if(formData.password===formData.confirm_password){
//       console.log("success")
//     }
//     else{
//       console.log("not")
//     }
//   }
//   function handleChange(event){
//     const {name, value, type,checked} = event.target;
//     setformData(prevData => ({
   
//         ...prevData, 
//         [name]: type==="checkbox" ? checked: value
//   }))
// }
//   function handleClick(event){
//     event.preventDefault();
//   }
//   return (
//     <div className='form-container'>
//       <form onSubmit={handleClick}>
//         <input type="email" 
//                placeholder='Email address'
//                name="email"
//                value={formData.email}
//                onChange={handleChange}/>
//         <input type='password' 
//                placeholder='password'
//                name="password"
//                value={formData.password}
//                onChange={handleChange}></input>
//         <input type='password' 
//                placeholder='confirm password'
//                name="confirm_password"
//                value={formData.confirm_password}
//                onChange={handleChange}></input>
//         <div><input type='checkbox' id="check" name='checked' checked={formData.checked} onChange={handleChange}/><label htmlFor='check'>I want to join the news letter</label></div>
//         <button onClick={handleDisplay}>Sign Up</button>
//       </form>

//     </div>
//   )
// }
// import React from 'react';
// import "./App.css"
// import Card1 from './components/Card1';
// export default function App(){
//   return (
//     <div>
//       <header>
//         <nav>
//           <h2>My Travel Journal</h2>
//         </nav>
//       </header>
//       <Card1 />
//     </div>
//   )
// }
// import React,{useEffect,useState} from 'react';
// export default function App(){
//   const [apiData, setapiData] = useState();
//   const [count, setCount] = useState(1);
//   useEffect(()=>{
//     console.log("effect ran")
//     fetch(`https://swapi.dev/api/people/${count}`)
//     .then(res=>res.json())
//     .then(data=> setapiData(data))
//   },[count])
//   return (
//     <div>
//       <pre>{JSON.stringify(apiData)}</pre>
//     <h1>count:{count}</h1>
//     <button onClick={()=>setCount(count+1)}>Add</button>
//     </div>
//   )

// }
//UseEffects
// import React,{useState, useEffect} from 'react';
// export default function App(){
//   const [windowWidth, setwindowWidth] = useState(window.innerWidth);
//   useEffect(()=>{
//     window.addEventListener('resize', function(){
//       setwindowWidth(window.innerWidth)
//     })
//   })
//   return (
//     <div className='container'>
//       <button>Toggle window tracker</button>
//       <h1>Window tracker: {windowWidth}</h1>
//     </div>
//   )
// }






















// import { ReactDOM } from 'react';
// import React from 'react';

// const SimpleCounter = () => {
//   let count = 0;

//   const handleIncrement = () => {
//     count++;
//     renderCount();
//   };

//   const renderCount = () => {
//     const countElement = (
//       <div>
//         <p>Count: {count}</p>
//         <button onClick={handleIncrement}>Increment</button>
//       </div>
//     );

//     ReactDOM.render(countElement, document.getElementById('counter-root'));
//   };

//   return <div id="counter-root">{renderCount()}</div>;
// };

// export default SimpleCounter;


























    

// import React, { useState } from 'react';

// const MyComponent = () => {
//   const [content, setContent] = useState('');

//   const handleInputChange = (event) => {
//     // Update the content state with the edited content
//     setContent(event.target.textContent);
//   };

//   const performCalculation = () => {
//     // Perform your calculation on the content (e.g., converting to a number)
//     const numberValue = parseFloat(content);
//     if (!isNaN(numberValue)) {
//       // Perform the calculation (e.g., adding 10 to the number)
//       const result = numberValue + 10;

//       // Update the contenteditable element with the result
//       const editableElement = document.getElementById('editableElement');
//       editableElement.textContent = result;
//     }
//   };

//   return (
//     <div>
//       <div
//         id="editableElement"
//         suppressContentEditableWarning
//         contentEditable
//         style={{
//           border: '1px solid black',
//           padding: '5px',
//           minHeight: '30px',
//         }}
//         onInput={handleInputChange} // Listen for input changes
//         onBlur={performCalculation} // Perform calculation when the element loses focus
//       >
//         {content}
//       </div>
//     </div>
//   );
// };

// export default MyComponent;
// import React, { useState, useEffect } from 'react';

// const EditableTable = ({ data }) => {
//   const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     if (Array.isArray(data) && data.length > 0) {
//       setTableData(data);
//     }
//   }, [data]);

//   const handleCellEdit = (event, rowIndex, playerIndex) => {
//     const newValue = event.target.textContent;
//     setTableData((prevTableData) => {
//       const updatedData = [...prevTableData];
//       updatedData[rowIndex][`player${playerIndex + 1}`] = newValue;
//       return updatedData;
//     });
//   };

//   if (!Array.isArray(tableData) || tableData.length === 0) {
//     return <p>No data to display.</p>;
//   }

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Round</th>
//           <th>Player 1</th>
//           <th>Player 2</th>
//           <th>Player 3</th>
//         </tr>
//       </thead>
//       <tbody>
//         {tableData.map((rowData, rowIndex) => (
//           <tr key={rowIndex}>
//             <td>{rowIndex + 1}</td>
//             {Object.keys(rowData).map((key, playerIndex) => (
//               <td
//                 key={key}
//                 contentEditable={true}
//                 onBlur={(event) => handleCellEdit(event, rowIndex, playerIndex)}
//                 suppressContentEditableWarning={true}
//               >
//                 {rowData[key]}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default EditableTable;



























// import {useEffect,useState} from 'react';

// export default function App(){
//   const [count, setCount] = useState(0);
//   useEffect(()=>{
//     console.log(count);
//   },[count]);

//   return (
//     <div>
//     <h1>Count: {count}</h1>
//     <button onClick={()=> setCount(count+1)}>Increment</button>
//     <button onClick={()=> setCount(count-1)}>Decrement</button>
//     </div>
//   )
// }
// import React, { useState } from 'react';

// const DynamicTable = () => {
//   const initialData = [
//     { id: 1, name: 'John Doe', age: 30, score: 90 },
//     { id: 2, name: 'Jane Smith', age: 25, score: 80 },
//     // Add more initial rows if needed
//   ];

//   const [data, setData] = useState(initialData);
//   const [editingRowId, setEditingRowId] = useState(null);

//   const handleAddRow = () => {
//     const newRow = { id: data.length + 1, name: '', age: '', score: 0 };
//     setData((prevData) => [...prevData, newRow]);
//   };

//   const handleEditCell = (rowId, field, value) => {
//     setData((prevData) =>
//       prevData.map((row) => {
//         if (row.id === rowId) {
//           return { ...row, [field]: value };
//         }
//         return row;
//       })
//     );
//   };

//   // Calculate the total scores
//   const totalScores = data.reduce((acc, row) => acc + row.score, 0);

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Age</th>
//             <th>Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row) => (
//             <tr key={row.id}>
//               <td>{row.id}</td>
//               <td>
//                 {editingRowId === row.id ? (
//                   <input
//                     type="text"
//                     value={row.name}
//                     onChange={(e) => handleEditCell(row.id, 'name', e.target.value)}
//                   />
//                 ) : (
//                   row.name
//                 )}
//               </td>
//               <td>
//                 {editingRowId === row.id ? (
//                   <input
//                     type="number"
//                     value={row.age}
//                     onChange={(e) => handleEditCell(row.id, 'age', e.target.value)}
//                   />
//                 ) : (
//                   row.age
//                 )}
//               </td>
//               <td>
//                 {editingRowId === row.id ? (
//                   <input
//                     type="number"
//                     value={row.score}
//                     onChange={(e) => handleEditCell(row.id, 'score', parseInt(e.target.value))}
//                   />
//                 ) : (
//                   row.score
//                 )}
//               </td>
//               <td>
//                 <button onClick={() => setEditingRowId(row.id)}>Edit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td colSpan="3">Total Scores:</td>
//             <td>{totalScores}</td>
//           </tr>
//         </tfoot>
//       </table>
//       <button onClick={handleAddRow}>Add Row</button>
//     </div>
//   );
// };

// export default DynamicTable;


























// import React, { useEffect, useState } from "react";
// // import "./styles.css";

// export default function App() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     setCount(JSON.parse(window.localStorage.getItem('count')));
//   }, []);

//   useEffect(() => {
//     window.localStorage.setItem('count', count);
//   }, [count]);

//   const increaseCount = () => {
//     return setCount(count + 1);
//   }
//   const decreaseCount = () => {
//     return setCount(count - 1)
//   }

//   return (
//     <div className="App">
//       <h1> Count {count} </h1>
//       <button onClick={increaseCount}>+</button>
//       <button onClick={decreaseCount}>-</button>
//     </div>
//   );
// }


// App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// import { legacy_createStore } from 'redux';
// import { Provider } from 'react-redux';
// import rootReducer from './components/reducer';
// import ListPage from './components/ListPage';
// import ActionPage from './components/ActionPage';

// const store = legacy_createStore(rootReducer);

// const App = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <div>
//           <nav>
//             <ul>
//               <li>
//                 <Link to="/">List Page</Link>
//               </li>
//               <li>
//                 <Link to="/action">Action Page</Link>
//               </li>
//             </ul>
//           </nav>
//           <Routes>
//             <Route exact path="/" component={ListPage} />
//             <Route path="/action" component={ActionPage} />
//           </Routes>
//         </div>
//       </Router>
//     </Provider>
//   );
// };

// export default App;


























// import React from 'react';
// import './App.css';
// import Navbar from './components/Navbar';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Reports from './pages/Reports';
// import Products from './pages/Products';

// function App() {
//   return (
//     <>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path='/' exact component={Home} />
//           <Route path='/reports' component={Reports} />
//           <Route path='/products' component={Products} />
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Home from './pages/Home';
// import Products from './pages/Products';
// import Reports from './pages/Reports';
// function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//       <div className="hamburger" onClick={toggleMenu}>
//         <div className={`line ${isOpen ? 'line-open' : ''}`}></div>
//         <div className={`line ${isOpen ? 'line-open' : ''}`}></div>
//         <div className={`line ${isOpen ? 'line-open' : ''}`}></div>
//       </div>
//       <ul className={`menu ${isOpen ? 'menu-open' : ''}`}>
//         <li>
//           <Link to="/" onClick={toggleMenu}>Home</Link>
//         </li>
//         <li>
//           <Link to="/Products" onClick={toggleMenu}>About</Link>
//         </li>
//         <li>
//           <Link to="/Reports" onClick={toggleMenu}>Contact</Link>
//         </li>
//       </ul>
//     </div>
//   );
// }

// // Rest of the code remains the same

// function App() {
//   return (
//     <Router>
//       <div className="app">
//         <Sidebar />
//         <div className="content">
//           <Routes>
//             <Route exact path="/" Component={Home} />
//             <Route path="/Products" Component={Products} />
//             <Route path="/Reports" Component={Reports} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;












// import {useState} from 'react';

// export default function App(){
//   const [userInfo, setUserInfo] = useState({
//     name: " ",
//     email: " "
//   })
//   // const [submitForm, setSubmitForm] = useState(false);
//   const makePost = async () => {
//     return {ok:200}
//   }
//   function handleUpdateUser(e){
//     setUserInfo((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value
//     }))
//   }
//   const handleSubmit =(e)=>{
//     e.preventDefault();
//     makePost().then((response) => {
//         if (response.ok){
//           setUserInfo({name:" ", email:" "})
//         }
//       })
//     }
//   return (
//     <>
//     <p>Name</p>
//     <input type='text' value = {userInfo.name} name="name" onChange={e => handleUpdateUser(e)}></input>
//     <p>Email</p>
//     <input type="text" value = {userInfo.email} name="email" onChange={e => handleUpdateUser(e)}></input>
//     <button type='submit' onClick={handleSubmit}>Submit</button>
//     </>
//   )
// }
// import React, { useState, useEffect } from "react";

// function App() {
//   const [displaySuccess, setDisplaySuccess] = useState("");
//   const [sendMessage, setSendMessage] = useState("");

//   useEffect(() => {
//     let timer = setTimeout(() => {
//       setDisplaySuccess(sendMessage);
//     }, 1000);
//     return ()=> clearTimeout(timer);
//   }, [sendMessage]);

//   return (
//     <main>
//       <h1>Home Page</h1>
//       <section>
//         {displaySuccess && (
//           <p>This is the button you clicked: {displaySuccess}</p>
//         )}
//         <form>
//           <p>Click a button</p>
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               setSendMessage("Button#1");
//             }}
//           >
//             Button#1
//           </button>
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               setSendMessage("Button#2");
//             }}
//           >
//             Button#2
//           </button>
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               setSendMessage("Button#3");
//             }}
//           >
//             Button#3
//           </button>
//         </form>
//       </section>
//     </main>
//   );
// }

// export default App;
// import { useState, useEffect } from "react";
// import AlertStatus from "./components/AlertStatus";

// export default function App(){
//   const [alertDetails, setAlertDetails] = useState({
//     alertName: "temperature",
//     status: "clear"
//   })

//   useEffect(() => {
//     const timeOut = setTimeout(() => {
//       setAlertDetails({alertName: "temperature", status: "clear"})
//     },5000)
//   },[])
//   return (
//     <>
//     <h3>Alert status</h3>
//     <AlertStatus alertDetails={alertDetails} />
//     </>
//   )
// }























// import AddTask from "./components/AddTask";
// import TaskList from "./components/TaskList";
// import { TasksProvider } from "./components/TasksContext";

// export default function App(){
//   return (
//     <TasksProvider>
//         <h1>ToDo</h1>
//         <AddTask />
//         <TaskList />
//     </TasksProvider>
//     )
//     }
// import {useState, useRef} from 'react';
// export default function App(){
//   const [startTime, setStartTime] = useState(null);
//   const [now, setNow] = useState(null);
//   const intervalRef = useRef(null);

//   function handleStart(){
//     setStartTime(Date.now());
//     setNow(Date.now());

//     clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(()=> {
//       setNow(Date.now());
//     }, 10);
//   }
//   function handleStop(){
//     clearInterval(intervalRef.current);
//   }
//   let secondsPassed = 0;
//   if(startTime!=null && now!=null){
//     secondsPassed = (now-startTime)/1000;
//   }
//   return (
//     <>
//     <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
//     <button onClick={handleStart}>start</button>
//     <button onClick={handleStop}>stop</button>
//     </>
//   )
// }
// import {useRef} from 'react';

// export default function App(){
  
//   const ref = useRef(null);

//   function handleClick(){
//     ref.current.focus();
//   }
//     return (
//       <>
//         <nav>
//           <button onClick={handleClick}>Search</button>
//         </nav>
//         <input ref={ref}
//           placeholder="Looking for something?"
//         />
//       </>
//     );
//   }
// import {useState} from 'react';
// import axios from 'axios';

// export default function App(){
//   const [name, setName] = useState('');
//   const [data, setData] = useState('');
//   const url = `https://api.github.com/users/${name}`
  
//   const getProfile = () => {
//     if(name!==" "){
//       axios.get(url).then((response)=> {
//         setData(response.data)
//         console.log(response.data)
//       })
//       setName("");

//       }
//     }
//     return (
//       <>
//       <div>
//         <input type="text" placeholder='Search by name' value={name} onChange={e => setName(e.target.value)}></input>
//         <button onClick={getProfile}>Search</button>
//         <div>
//           {data.login ? <img src={data.avatar_url} alt={data.name}></img> : "" }
//         </div>
//         <div>{data.followers}</div>
//         <span><div>{data.following}</div></span>
//       </div>
//       </>
//     )
//   }























// import {useState} from 'react';
// import axios from 'axios';

// export default function App(){
//   const [data, setData] = useState({});
//   const [loc, setLoc] = useState('');
//   const accessKey = 'd0bff837f4b0860c413eba5614c7a079';

//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${accessKey}`;
//   const searchLocation = () => {
//     if(loc!==''){
//       axios.get(url).then((response) => {
//         setData(response.data)
//         console.log(response.data)
//       })
//       setLoc('');
//     }
//   }
//   return (
//     <div>
//       <input type="text" placeholder='search by location' value={loc}
//       onChange={e => setLoc(e.target.value)}></input>
//       <button onClick={searchLocation}>Search</button>
//       <div>
//         {data.main ? <h2>{(data.main.temp - 273.15).toFixed()}°C</h2> : null}
//       </div>
//     </div>
//   )
// }
// import React, { useState } from 'react';
// import { useForm } from './components/Formuse';
// import { getRandomChar, getSpecialChar } from './components/utils';

// function App() {
//   const [values, setValues] = useForm({
//     length: 6,
//     capital: true,
//     small: true,
//     number: false,
//     symbol: false,
//   });
//   const [result, setResult] = useState('');

//   const fieldsArray = [
//     {
//       field: values.capital,
//       getChar: () => getRandomChar(65, 90),
//     },
//     {
//       field: values.small,
//       getChar: () => getRandomChar(97, 122),
//     },
//     {
//       field: values.number,
//       getChar: () => getRandomChar(48, 57),
//     },
//     {
//       field: values.symbol,
//       getChar: () => getSpecialChar(),
//     },
//   ];

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     let generatedPassword = '';
//     const checkedFields = fieldsArray.filter(({ field }) => field);

//     for (let i = 0; i < values.length; i++) {
//       const index = Math.floor(Math.random() * checkedFields.length);
//       const letter = checkedFields[index]?.getChar();

//       if (letter) {
//         generatedPassword += letter;
//       }
//     }
//     if (generatedPassword) {
//       setResult(generatedPassword);
//     }
//   };

//   return (
//     <section>
//       <div className="container">
//         <form id="pg-form" onSubmit={handleOnSubmit}>
//           <div className="result">
//             <input
//               type="text"
//               id="result"
//               placeholder="Min 6 Char"
//               readOnly
//               value={result}
//             />
//           </div>
//           <div>
//             <div className="field">
//               <label htmlFor="length">Length</label>
//               <input
//                 type="number"
//                 id="length"
//                 min={6}
//                 max={20}
//                 name="length"
//                 value={values.length}
//                 onChange={setValues}
//               />
//             </div>
//             <div className="field">
//               <label htmlFor="capital">Capital</label>
//               <input
//                 type="checkbox"
//                 id="capital"
//                 name="capital"
//                 checked={values.capital}
//                 onChange={setValues}
//               />
//             </div>
//             <div className="field">
//               <label htmlFor="small">Small</label>
//               <input
//                 type="checkbox"
//                 id="small"
//                 name="small"
//                 checked={values.small}
//                 onChange={setValues}
//               />
//             </div>
//             <div className="field">
//               <label htmlFor="number">Number</label>
//               <input
//                 type="checkbox"
//                 id="number"
//                 name="number"
//                 checked={values.number}
//                 onChange={setValues}
//               />
//             </div>
//             <div className="field">
//               <label htmlFor="symbol">Symbol</label>
//               <input
//                 type="checkbox"
//                 id="symbol"
//                 name="symbol"
//                 checked={values.symbol}
//                 onChange={setValues}
//               />
//             </div>
//           </div>
//           <button type="submit">Generate Password</button>
//         </form>
//       </div>
//     </section>
//   );
// }

// export default App;



































// import {useState} from 'react';
// import ContactList from './components/ConatctList';
// import Chat from './components/Chat';

// export default function App(){
//   const [to,setTo] = useState(contacts[0]);
//   return (
//     <div>
//       <ContactList contacts={contacts}
//       selectedContact={to}
//       onSelect={contact => setTo(contact)}/>
//       <Chat key={to.id} contact={to}/>
//     </div>

//   )
// }
// const contacts = [
//   { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
//   { id: 1, name: 'Alice', email: 'alice@mail.com' },
//   { id: 2, name: 'Bob', email: 'bob@mail.com' }
// ];

// import { useState } from 'react'
// import './App.css';

// const quiz =[
//   {
//     id:0,
//     question: 'What is the Capital of US?',
//     choices: ['New york', 'New jersey','Washington DC'],
//     correctAnswer: 'Washington DC',
//   },
//   {
//     id:1,
//     question: 'What is the Capital of UK?',
//     choices: ['London','Paris','Germany'],
//     correctAnswer: 'London',
//   },
//   {
//     id:2,
//     question:
//       'What is the Capital of Virginia?',
//     choices: ['Richmond','Charlotte','Pitsburg'],
//     correctAnswer: 'Richmond',
//   },
//   {
//     id:3,
//     question: 'What is the Capital of Germany?',
//     choices: ['Berlin','Hamburg','Munich'],
//     correctAnswer: 'Berlin',
//   }]

// const Quiz = () => {
//   const [index, setIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState([]);
//   const [score, setScore] = useState(0);
//   const [showResults, setShowResults] = useState(false);

//   const { question, choices} = quiz[index];

  // const onAnswerSelected = (answer) => {
  //   const updatedAnswers = [...selectedAnswer];
  //   updatedAnswers[index] = answer;
  //   setSelectedAnswer(updatedAnswers);
  //   console.log(updatedAnswers);
  // }
//   const onClickNext = () => {
//     if(index <= quiz.length){
//     setIndex((i) => i + 1)
//     }
//   }
//   const onSubmit =() =>{
//     setShowResults(true);
//     let score=0;
//     for(let i=0; i<= quiz.length-1; i++){
//       if(selectedAnswer[i] === quiz[i].correctAnswer){
//         score+=1;
//       }
//     }
//     setScore(score);
//   }
//   const onPrevClick = () => {
//     setIndex(index-1);
//   }
//   const restartGame = () =>{
//     setIndex(0);
//     setSelectedAnswer('');
//     setShowResults(false);
//     setScore(0);
//   }
//   return (
//     <div className="main">
//       {!showResults ? (
//         <div className='quiz-container'>
//           <h2>{question}</h2>
//           {choices.map((answer, id) => (
//               <div className='buttons'>
//               <button
//                 onClick={() => onAnswerSelected(answer)}
//                 key={id}>
//                 {answer}
//               </button>
//               </div>
//             ))}
//           <div className="nxtbtn">
//             <button onClick={onPrevClick} disabled={index===0}>Previous</button>
//             <span><button onClick={onClickNext} disabled={index===(quiz.length-1)}>Next
//             </button></span>
//             <span><button onClick={onSubmit} disabled={index<(quiz.length-1)}>Submit</button></span>
//           </div>
//         </div>
//       ) : (
//         <div className="result">
//           <h3>Result</h3>
//           <h4>
//             Total Score:<span> {score}</span>
//           </h4>
//           <button onClick={restartGame}>Restart game</button>
//         </div>
//       )}
//     </div>
//   )
// }
// export default Quiz;

// import {useState} from 'react';
// import './App.css';

// export default function App(){
//   const [list,setList] = useState([]);
//   const [newList, setNewList] = useState('');
  
//   const onAdd = () => {
//       if (newList.trim() !== '') {
//         const newListItem = {
//           id: Date.now(),
//           name: newList.trim(),
//         };
//           setList([...list, newListItem]);
//           setNewList('');
//           }
//         };
//   const onDelete =(i) => {
//     const newList = [...list];
//     newList.splice(i,1);
//     setList(newList);
//   }
// const handleEditTodo = (id, updatedContent) => {
//   const updatedTodos = list.map((i) => {
//     if (i.id === id) {
//       return { ...list, name: updatedContent};
//     }
//     return list;
//   });
//   setList(updatedTodos);
//   };

//   return(
//     <>
//     <h1>ToDo App</h1>
//     <input type='text' placeholder='add new todo' value={newList} onChange={e => setNewList(e.target.value)}></input>
//     <span><button onClick={onAdd}>Add</button></span>
//     {/* {error === null? (<p>Enter the new todo</p>):('')} */}
//     <ul>
//       {list.map(i => (
//         <li key={i.id}>{i.name}{' '}<button onClick={onDelete}>Delete</button>
//         <span><button onClick={()=>handleEditTodo(list.id, prompt('Enter updated content:', list.name))}>Edit</button></span>
//          </li> 
//       ))}
//     </ul>
//     </>
//   )
// // }
// import React, { useState } from 'react';
// import './App.css';
// const TodoList = () => {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState('');
//   const [editTodoId, setEditTodoId] = useState(null);
//   const [editTodoContent, setEditTodoContent] = useState('');

//   const handleInputChange = (e) => {
//     setNewTodo(e.target.value);
//   };

//   const handleAddTodo = () => {
//     if (newTodo.trim() !== '') {
//       const newTodoItem = {
//         id: Date.now(),
//         content: newTodo.trim(),
//       };
//       setTodos([...todos, newTodoItem]);
//       setNewTodo('');
//     }
//   };

//   const handleEdit = (id, content) => {
//     setEditTodoId(id);
//     setEditTodoContent(content);
//   };

//   const handleCancelEdit = () => {
//     setEditTodoId(null);
//     setEditTodoContent('');
//   };

//   const handleUpdateTodo = (id) => {
//     const updatedTodos = todos.map((todo) => {
//       if (todo.id === id) {
//         return { ...todo, content: editTodoContent };
//       }
//       return todo;
//     });
//     setTodos(updatedTodos);
//     setEditTodoId(null);
//     setEditTodoContent('');
//   };

//   const handleDeleteTodo = (id) => {
//     const updatedTodos = todos.filter((todo) => todo.id !== id);
//     setTodos(updatedTodos);
//   };

//   return (
//     <div>
//       <h1>Todo List</h1>
//       <input
//         type="text"
//         value={newTodo}
//         onChange={handleInputChange}
//         placeholder="Add a new todo"
//       />
//       <button onClick={handleAddTodo}>Add</button>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             {editTodoId === todo.id ? (
//               <div>
//                 <input
//                   type="text"
//                   value={editTodoContent}
//                   onChange={(e) => setEditTodoContent(e.target.value)}
//                 />
//                 <button onClick={() => handleUpdateTodo(todo.id)}>Update</button>
//                 <button onClick={handleCancelEdit}>Cancel</button>
//               </div>
//             ) : (
//               <div>
//                 {todo.content}
//                 <button onClick={() => handleEdit(todo.id, todo.content)}>Edit</button>
//                 <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;


// // import { useState } from "react"; 
// // export default function App(){

// // const [text, setText] = useState('');
// // const [sent,setIsSent] = useState(false);
// // const [sending, setIsSending] = useState(false);
// // const [typing,setIsTyping] = useState(false);


// async function handleSubmit(e){
//   e.preventDefault();
//   setIsTyping(false);
//   setIsSending(true);
//   await sendMessage(text);
//   setIsSending(false);
//   setIsSent(true);
// }
// if(sent){
//   return <h1>Cool Thankyou</h1>
// }
// return (
//   <form onSubmit={handleSubmit}>
//     <p>How was your day today?</p>
//     <textarea disabled={sending} value={text} onChange={(e) => setText(e.target.value)}></textarea>
//     <br></br>
//     {typing && <p>Typing...</p>}
//     <button disabled={sending}>Submit</button>
//     {sending && <p>Sending</p>}
//   </form>
//   );
// }
// function sendMessage(text){
//   return new Promise(resolve => {
//     setTimeout(resolve, 1000);
//   });
// }
// import { useState } from 'react';
// const initialItems = [
//   { title: 'pretzels', id: 0 },
//   { title: 'crispy seaweed', id: 1 },
//   { title: 'granola bar', id: 2 },
// ];

// export default function App(){
//   const [items, setItems] = useState(initialItems);
//   const [selectedId, setselectedId] = useState(0);

//   const selectedItem = items.find(item=> 
//     item.id === selectedId);

//   function handleChange(id,e){
//     setItems(items.map(item => {
//       if(item.id===id){
//         return {
//           ...item,
//           title: e.target.value,
//         };
//       }
//       else{
//         return item;
//       }
//     }))
//   }
//   return (
//     <>
//     <h2>What's your travel snack?</h2>
//     <ul>
//       {items.map((item) => (
//         <li key={item.id}>
//           <input value = {item.title} onChange={e => {handleChange(item.id,e)}} />
//           {' '}
//           <button onClick={e => setselectedId(item.id)}>Choose</button>
//         </li>
//       ))}
//     </ul>
//     <p>you picked {selectedItem.title}</p>

//     </>
//   )
// }




























// import {useState} from 'react';
// export default function App(){
//   const [index,setIndex] = useState(0);
//   const [answer, setAnswer] = useState(' ');
//   // const [status, setStatus] = useState("empty");
//   const [score,setScore] = useState(0);
//   const [showResults, setShowResults] = useState(false);

//   const questionList =[{id:1,
//     question:"in which city is there a billboard that turns air into drinkable water?",
//     answer:"lima"},{
//     id:2,
//     question:"capital of America?",
//   answer: "new york"}];

//   let hasPrev = index>0;
//   let hasNext = index < questionList.length-1;

//   // if(status==="success"){
//   //   return <h1>That's right</h1>
//   // }

//   function handleChange(e){
//     setAnswer(e.target.value);

//   }
//   function handlePrevClick(){
//     if(hasPrev){
//     setIndex(index-1);
//     }
//   }
//   function handleNextClick(){
//     if(hasNext){
//     setIndex(index+1);
//     }
//     else{
//       setShowResults(true);
//     }
//   }
//   const restartGame = () => {
//     setScore(0);
//     setIndex(0);
//     setShowResults(false);
// }

// function handleSubmit(answer){
//   if(answer===questionList[index].answer){
//     setScore(score+1);
//   }
// }
//   // async function handleSubmit(e){
//   //   e.preventDefault();
//   //   setStatus('submitting');
//   //   try{
//   //     await submitForm(answer);
//   //     setStatus('success');
//   //   }catch(err){
//   //     setStatus('typing');
//   //     setError(err);
//   //   }
//   // }
//   let q = questionList[index];
//   return (
//   <>
//     <h1>city quiz</h1>
//     {showResults ? (
//       <>
//       <h1>You scored {score}</h1>
//       <button onClick={restartGame}>Restart Game</button>
//       </>):
//       (
//       <>
//       <p>{q.question}</p>
//       <form>
//         <textarea value={answer} onChange={handleChange}></textarea>
//         <br></br>
//         <button onSubmit={handleSubmit} disabled={answer.length===0}>Submit</button>
//       </form>
//       <h3>({index+1} of {questionList.length})</h3>
//       <button onClick={handlePrevClick} disabled={!hasPrev}>Previous</button>
//       <button onClick={handleNextClick} disabled={!hasNext}>Next</button>
//       </>)}
    
//   </>
//   );
// }
// function submitForm(answer){
//   return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         let shouldError = answer.toLowerCase()!=='lima';
//         if(shouldError){
//           reject();
//         }
//         else{
//           resolve();
//         }
//       }, 1500);
//     });
// }

// import React,{Component} from 'react';
// import LifeCycleA from './components/LifecycleA';
// class App extends Component{
//   render(){
//     return (
//       <div className='App'>
//         <LifeCycleA />
//       </div>
//     )
//   }
// }
// export default App;





































// import {useState} from 'react';
// export default function App(){
//   const [person, setPerson] = useState({
//     firstName: "sravya",
//     lastName: "dfghj",
//     email: "fgh@gmail.com"
//   });
//   function handleFirstName(e){
//     setPerson({
//       firstName: e.target.value
//     });
//   }
//   function handleLastName(e){
//     setPerson({
//       ...person,
//       lastName: e.target.value
//     });
//   }
//   function handleEmail(e){
//     setPerson({
//       ...person,
//       email: e.target.value
//     });
//   }
//   return (
//     <>
//     <label>
//       First name: <input value={person.firstName} onChange={handleFirstName}></input>
//     </label>
//     <label>
//       Last name: <input value={person.lastName} onChange={handleLastName}></input>
//     </label>
//     <label>
//       Email: <input value={person.email} onChange={handleEmail}></input>
//     </label>
//     <p>
//       {person.firstName}{" "}
//       {person.lastName}{" "}
//       {person.email}

//     </p>
//     </>
//   )
// }
// import {useState} from 'react';

// export default function App(){
//   const [name,setName]=useState('');
//   const [artists,setArtists] = useState([]);
//   return (
//     <>
//     <h1>list</h1>
//     <input value={name}
//     onChange={e => setName(e.target.value)}></input>
//     <button onClick={()=> {
//       setArtists([
//         ...artists,{name: name}
//       ]);
//     }}>add</button>
//     <ul>
//       {artists.map(artist => (
//         <li>{artist.name}</li>
//       ))}
//     </ul>
//     </>
//   )

// }

































// const sculptureList = [{
//   name: 'Homenaje a la Neurocirugía',
//   artist: 'Marta Colvin Andrade',
//   description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
//   url: 'https://i.imgur.com/Mx7dA2Y.jpg',
//   alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
// }, {
//   name: 'Floralis Genérica',
// //   artist: 'Eduardo Catalano',
// //   description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
// //   url: 'https://i.imgur.com/ZF6s192m.jpg',
// //   alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
// // }, {
// //   name: 'Eternal Presence',
// //   artist: 'John Woodrow Wilson',
// //   description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
// //   url: 'https://i.imgur.com/aTtVpES.jpg',
// //   alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
// // }, {
// //   name: 'Moai',
// //   artist: 'Unknown Artist',
// //   description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
// //   url: 'https://i.imgur.com/RCwLEoQm.jpg',
// //   alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
// // }];
// // export default function App(){
// //   const [index,setIndex] = useState(0);
// //   const [showMore,setshowMore] = useState(false);

// //   let hasprev= index >0;
// //   let hasnext = index < sculptureList.length-1;
// //   function handlePrevClick(){
// //     if(hasprev){
// //     setIndex(index-1);
// //   }}
// //   function handleNextClick(){
// //     if(hasnext){
// //     setIndex(index+1);
// //   }}
// //   function handleShowbar(){
// //     setshowMore(!showMore);
// //   }
// //   let sculpture = sculptureList[index]
// //   return (
// //     <>
// //     <button onClick={handlePrevClick}
// //     disabled={!hasprev}>
// //       previous
// //     </button>
// //     <button onClick={handleNextClick}
// //     disabled={!hasnext}>
// //       next
// //     </button>
// //     <h2>
// //       {sculpture.name}
// //     </h2>
// //     <button onClick={handleShowbar}>
// //       {showMore ? 'hide' : 'show'}
// //     </button>
// //     {showMore && <p>{sculpture.description}</p>}
// //     </>
// //   )
// export default function App(){
//   // const [isSent, setIsSent] =useState(false);
//   // const [message, setMessage] = useState('hi');
//   // if(isSent){
//   //   return <h1>hi</h1>
//   // }
//   // return (
//   //   <form onSubmit ={(e) => {
//   //     e.preventDefault();
//   //     setIsSent(true);
//   //   }}>
//   //      <textarea
//   //       placeholder="Message"
//   //       value={message}
//   //       onChange={e => setMessage(e.target.value)}
//   //     />
//   //     <button type="submit">Send</button>
//   //   </form>
//   // )
// //   const [number, setNumber] = useState(0);
// //   return (
// //     <>
// //     <h1>{number}</h1>
// //     <button onClick={() => {
// //       setNumber(number+2);
// //     }}> click
// //     </button>
// //     </>
// //   )
// // }
// const [to,setTo]= useState('alice');
// const [message,setmessage] = useState('hello');
// function handleSubmit(e){
//   e.preventDefault();
//   setTimeout(() =>{
//     alert(`${message} to ${to}`);
//   },5000);
// }
// return (
//   <form onSubmit={handleSubmit}>
//     <label>
//         To:{' '}
//         <select
//           value={to}
//           onChange={e => setTo(e.target.value)}>
//           <option value="Alice">Alice</option>
//           <option value="Bob">Bob</option>
//         </select>
//       </label>
//       <textarea
//         placeholder="Message"
//         value={message}
//         onChange={e => setmessage(e.target.value)}
//       />
//       <button type="submit">Send</button>
//   </form>
// )
// }






























































































// export default function App(){
//   return (
//     <div className="Toolbar" onClickCapture={() => {
//       alert("you clicked on parent")
//     }}>
//       <Button onClick={() => alert("clicked on child1")}>
//         child1
//       </Button>
//       <Button onClick={() => alert("clicked on child2")}>
//         child2
//       </Button>
//     </div>
//   );
// }
// function Button({onClick, children}){
//   return (
//     <button onClick={e => {
//       e.stopPropagation();
//       onClick();
//     }}>
//       {children}
//     </button>

//   )
// // }
// function example(){
//   console.log("clicked")
// }
// export default function App(){
//   return (
//   <button onClick={example()}>click me</button>
//   )
// }
























// const people = 
//   [{
//     id: 0,
//     name: 'Creola Katherine Johnson',
//     profession: 'mathematician',
//   }, {
//     id: 1,
//     name: 'Mario José Molina-Pasquel Henríquez',
//     profession: 'chemist',
//   }, {
//     id: 2,
//     name: 'Mohammad Abdus Salam',
//     profession: 'physicist',
//   }, {
//     name: 'Percy Lavon Julian',
//     profession: 'chemist',  
//   }, {
//     name: 'Subrahmanyan Chandrasekhar',
//     profession: 'astrophysicist',
//   }];
// export default function App(){
//   const chemists = people.filter(person => person.profession==='chemist')
//   const listItems = chemists.map((person) => 
//   <li>
//     <p>
//       {person.name} : {person.profession}
//     </p>
//   </li>)
//   return (
//     <ul>{listItems}</ul>
//   )
// }

//let guest = 0;

// function Cup() {
//   // Bad: changing a preexisting variable!
//   guest = guest + 1;
//   return <h2>Tea cup for guest #{guest}</h2>;
// }
// function Button({onSmash, children}){
//   return (
//     <button onClick={onSmash}>
//       {children}
//     </button>
//   )
// }
// function PlayButton({movieName}){
//   function handlePlay(){
//     alert(`playing ${movieName}`);
//   }
//   return (
//     <Button onClick={handlePlay}>
//       play "{movieName}"
//     </Button>
//   )
// }
// function UploadButton(){
//   return (
//     <Button onClick={() => alert("uploading")}>
//       upload image
//     </Button>
//   )
// }
// export default function App() {
//   return (
//     <div>
//       <PlayButton movieName="delivery service" />
//       <UploadButton />
//     </div>
//   );
// }
// export default function App(){
//   return (
//     <div>
//       <Button onSmash={() => alert("playing!")}>
//         play movie
//       </Button>
//       <Button onSmash={() => alert("uploading")}>
//         upload image
//       </Button>
//     </div>
//   )
// }
// import React from 'react';

// export default function App() {

//   function sayHello() {
//     alert('Hello!');
//   }
  
//   return (
//     <button onClick={sayHello}>
//       Click me!
//     </button>
//   );
// }
// import React from 'react';

// function App() {
//   return (
//     <button onClick= {() => alert('hello')}>
//       Click me!
//     </button>
//   );
// }

// export default App;
