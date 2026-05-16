import { useState, useEffect } from 'react';
import { ClipboardList, Check, Trash2 } from 'lucide-react';

const Packing = () => {
  const [inputVal, setInputVal] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('manzil_todos');
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('manzil_todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputVal.trim()) {
      const newTodo = { id: Date.now(), text: inputVal.trim(), done: false };
      setTodos([...todos, newTodo]);
      setInputVal('');
    }
  };

  const toggleDone = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const updated = { ...todo, done: !todo.done };
        if (updated.done) {
          setTimeout(() => {
            setTodos(prev => prev.filter(t => t.id !== id));
          }, 1200);
        }
        return updated;
      }
      return todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const pending = todos.filter(t => !t.done).length;
  const done = todos.filter(t => t.done).length;

  return (
    <div className="page-container">
      <h1 className="page-title">Packing List</h1>
      <p className="page-subtitle">Organize your travel essentials</p>

      {/* Add task row */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          maxWidth: '600px',
        }}
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add item to pack..."
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'white',
            fontSize: '1rem',
            fontFamily: 'DM Sans,sans-serif',
          }}
        />
        <button
          onClick={addTodo}
          className="btn-primary"
          style={{
            padding: '12px 20px',
            fontSize: '1rem',
          }}
        >
          + Add
        </button>
      </div>

      {/* Task count summary */}
      <div
        style={{
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.6)',
          marginBottom: '20px',
        }}
      >
        {pending} items to pack · {done} packed
      </div>

      {/* Task list */}
      <div
        style={{
          maxWidth: '600px',
        }}
      >
        {todos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🧳</div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem' }}>Nothing to pack yet</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', marginTop: '8px' }}>Add your first item above to get started</p>
          </div>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '16px 20px',
                marginBottom: '12px',
                background: todo.done ? 'rgba(45,106,79,0.15)' : 'rgba(255,255,255,0.15)',
                border: todo.done ? '1px solid rgba(45,106,79,0.3)' : '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.2s ease',
              }}
            >
              <button
                onClick={() => toggleDone(todo.id)}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: todo.done ? 'none' : '2px solid rgba(255,255,255,0.4)',
                  background: todo.done ? 'var(--primary-green)' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}
              >
                {todo.done && <Check size={14} color="white" />}
              </button>
              <span
                style={{
                  flex: 1,
                  fontSize: '1rem',
                  color: todo.done ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.9)',
                  textDecoration: todo.done ? 'line-through' : 'none',
                  transition: 'all 0.3s ease',
                  fontFamily: 'DM Sans,sans-serif',
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  color: 'rgba(255,100,100,0.6)',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.color = 'rgba(255,100,100,0.9)'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,100,100,0.6)'}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Packing;