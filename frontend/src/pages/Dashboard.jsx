import { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [purpose, setPurpose] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchTodos();
  }, []);


  const fetchTodos = async () => {
    try {
      const res = await API.get('/todo/all');
      setTodos(res.data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      navigate('/login');
    }
  };


  const addTodo = async () => {
    if (!title) return alert('Title required');
    try {
      await API.post('/todo/add', { title, description, purpose });
      setTitle('');
      setDescription('');
      setPurpose('');
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };
  const toggleTodo = async (id) => {
    await API.put(`/todo/toggle/${id}`);
    fetchTodos();
  };

const deleteTodo = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await API.delete(`/todo/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(todos.filter(todo => todo._id !== id));
  } catch (err) {
    console.error('Delete failed:', err.response?.data || err);
    alert(err.response?.data?.message || 'Delete failed');
  }
};
  const searchTodos = async () => {
    if (!search) return fetchTodos();
    const res = await API.get(`/todo/search?query=${search}`);
    setTodos(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

     <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Todos</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"className="p-3 rounded-lg border"/>
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="p-3 rounded-lg border"/>
        <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose" className="p-3 rounded-lg border"/>
        <button onClick={addTodo} className="bg-green-500 hover:bg-green-900 text-white px-4 py-2 rounded-lg">Add Todo</button>
      </div>
      <div className="mb-6 flex gap-2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or purpose" className="flex-1 p-3 rounded-lg border"/>
        <button onClick={searchTodos} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo._id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo._id)}/>
              <div>
                <p className={`font-semibold ${ todo.completed ? 'line-through text-gray-400' : ''}`}>{todo.title}</p>
                <p className="text-gray-500 text-sm">{todo.description}</p>
                <p className="text-gray-400 text-sm italic">{todo.purpose}</p>
              </div>
            </div>
            <button  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => deleteTodo(todo._id)>  Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
