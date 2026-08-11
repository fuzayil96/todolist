import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [todoItems, setTodoItems] = useState([]);
  
  // Xatolikni ko'rsatish uchun state
  const [error, setError] = useState(false);
  
  // Tahrirlash uchun statelar
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Yangi vazifa qo'shish
  const handleSubmit = (e) => {
    e.preventDefault();

    // Agar input bo'sh bo'lsa, xatolikni yoqamiz va funksiyani to'xtatamiz
    if (inputValue.trim() === "") {
      setError(true);
      return;
    }

    const newTodo = {
      id: Date.now(), // Takrorlanmas ID
      title: inputValue,
      isCompleted: false
    };

    setTodoItems([...todoItems, newTodo]);
    setInputValue('');
    setError(false); // Xatolikni o'chiramiz
  };

  // Vazifani o'chirish
  const handleDelete = (id) => {
    const updatedTodos = todoItems.filter(todo => todo.id !== id);
    setTodoItems(updatedTodos);
  };

  // Bajarilgan qilib belgilash
  const handleToggleComplete = (id) => {
    const updatedTodos = todoItems.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoItems(updatedTodos);
  };

  // Tahrirlashni boshlash
  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  // Tahrirlangan vazifani saqlash
  const handleSaveEdit = (id) => {
    if (editValue.trim() === "") return;
    
    const updatedTodos = todoItems.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: editValue };
      }
      return todo;
    });
    
    setTodoItems(updatedTodos);
    setEditingId(null);
  };

  return (
    <div className='app-wrapper'>
      <div className='todo-container'>
        
        <div className='todo-header'>
          <div className='header-badge'>Vazifalar ro'yxati</div>
          <h1>Kuningizni Rejalashtiring</h1>
          <p className='header-sub'>Bugungi vazifalaringizni belgilang va kuzating</p>
          {todoItems.length > 0 && (
            <div className='stats-bar'>
              <span className='stat-chip'>{todoItems.length} ta vazifa</span>
            </div>
          )}
        </div>

        <form className='todo-form' onSubmit={handleSubmit}>
          <div className='input-wrapper'>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if(error) setError(false); // Yozishni boshlasa xatoni o'chirish
              }}
              className={error ? 'input-error' : ''}
              placeholder="Yangi vazifa qo'shing..." 
            />
            {error && <p className='error-text'>Iltimos, qiymat kiriting!</p>}
          </div>
          <button type="submit" className='add-btn'>Qo'shish</button>
        </form>

        <div className="todo-list">
          {todoItems.length > 0 ? (
            todoItems.map((value, index) => {
              return (
                <div className='todo-item' key={value.id}>
                  
                  {/* Agar tahrirlanayotgan bo'lsa input ko'rsatamiz */}
                  {editingId === value.id ? (
                    <div className='item-left' style={{ flex: 1, marginRight: '10px' }}>
                      <input 
                        type="text" 
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        className="edit-input"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div className='item-left'>
                      <span className='item-number'>{index + 1}</span>
                      <span className={`item-title ${value.isCompleted ? 'completed' : ''}`}>
                        {value.title}
                      </span>
                    </div>
                  )}

                  <div className='item-actions'>
                    {editingId === value.id ? (
                       <button className='btn-done' onClick={() => handleSaveEdit(value.id)}>✓</button>
                    ) : (
                      <>
                        <button className='btn-done' onClick={() => handleToggleComplete(value.id)}>✓</button>
                        <button className='btn-delete' onClick={() => handleDelete(value.id)}>✕</button>
                        <button className='btn-edit' onClick={() => handleStartEdit(value)}>✎</button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className='empty-state'>
              <div className='empty-icon'>📋</div>
              <h2>Hech qanday plan yo'q</h2>
              <p>Yuqoridagi formadan yangi vazifa qo'shing</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default App;