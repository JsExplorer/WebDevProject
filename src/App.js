import './App.css';
import {useState} from 'react';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function App() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const [databaseList, setDatabaseList] = useState([]);

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const addEntry = () => {
    Axios.post('http://localhost:3006/create', {
      name: name, 
      text: text
    }).then(() => {
      setDatabaseList([...databaseList, {
        name: name,
        text: text,
      },
      ]);
      console.log("Entry saved in")
    });
  };

  const getDataBase = () => {
    Axios.get('http://localhost:3006/read').then((response) => {
      setDatabaseList(response.data);
    });
  };

  // const handleClick = () => {
  //   addEntry();
  //   handleShow();
  

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input 
        type="text" 
        onChange={(event) => {
          setName(event.target.value);
          }} />
        <label> Text:</label>
        <input 
        type="text"
         onChange={(event) => {
          setText(event.target.value);
          }}/>
          <div className="modal-button"> 
            <button  onClick={addEntry}>
              Add Data
            </button>
          </div>
      </div>
      <div className="Database">
        <button onClick={getDataBase}>Show Database</button><br></br>
        {databaseList.map((val, key) => {
          return <div className="database-css" key={key}> 
            <h3>Name: {val.name}</h3>
            <h3>Text: {val.text}</h3>
          </div>;
        })}
      </div>
    </div>
    )
}

export default App;
