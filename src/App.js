import './App.css';
import {useState} from 'react';
import Axios from 'axios';
import './components/Modal.css';

function App() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const [databaseList, setDatabaseList] = useState([]);

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

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleClick = () => {
    addEntry();
    toggleModal();
  }

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
            <button  onClick={handleClick} className="btn-modal">
              Add Data
            </button>
                      {modal && (
                      <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-content">
                          <h2>Data inserted to database:</h2>
                          <p>
                            <h3>Name: {name}</h3>
                            <h3>Text: {text}</h3>
                          </p>
                          <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                          </button>
                        </div>
                      </div>
                    )}
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
