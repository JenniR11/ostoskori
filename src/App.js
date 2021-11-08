import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const URL = 'http://localhost/ostoslista/index.php'

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');

  function add(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item})
    axios.post(URL + 'add.php', json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setItems(items => [...items, response.data]);
      setItem('');
    }).catch (error => {
      alert(error.response.data.error)
    });
  }
  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      const newListWithoutRemoved = item.filtter((item) => item.id !== id);
      setItem(newListWithoutRemoved);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    });
  }
  useEffect(()=> {
    axios.get(URL)
    .then((response)=> {
        setItems(response.data);
    }).catch (error => {
      alert(error.response)
    })
  },[])

  return (
    <div className="container">
      <h3>Shopping list</h3>
      <form onSubmit={add}>
        <label>New Item</label>
        <input value={item} onChange={e => setItem(e.target.value)} />
        <input value={amount} onChange={e => setAmount(e.target.value)} />
        <button>Add</button>
      </form>
      <ol>
   {items?.map(item => (
     <li key={item.id}>{item.description}</li>
   ))}
   <li key={item.id}>
     {item.description}&nbsp;
     <a href="#" className="delete" onClick={() => removeEventListener(task.id)}>
       Delete
     </a>
   </li>
 </ol>
 </div>
  );
}
export default App;


