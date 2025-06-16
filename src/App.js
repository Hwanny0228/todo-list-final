// React와 useState, useEffect 훅을 불러옵니다.
import React, { useState, useEffect } from 'react';
// 할 일 입력 폼 컴포넌트를 불러옵니다.
import TodoForm from './components/TodoForm';
// 할 일 목록 컴포넌트를 불러옵니다.
import TodoList from './components/TodoList';
// CSS 스타일을 불러옵니다.
import './App.css';

// App 컴포넌트 정의
function App() {
  // todos 상태: 할 일 목록을 저장합니다. localStorage에서 불러오거나, 없으면 빈 배열로 시작합니다.
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos'); // localStorage에서 'todos' 키로 저장된 값 불러오기
    return saved ? JSON.parse(saved) : [];       // 값이 있으면 파싱, 없으면 빈 배열
  });
  // searchUser 상태: 이름으로 검색할 때 사용합니다.
  const [searchUser, setSearchUser] = useState('');

  // todos가 바뀔 때마다 localStorage에 저장합니다.
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 새 할 일을 추가하는 함수입니다.
  function createTodoItem(data) {
    if (!data.text.trim()) { // 할 일 내용이 비어있으면
      alert('할 일을 입력하세요.');
      return;
    }
    data.id = Date.now(); // 고유한 id 생성(현재 시간 사용)
    setTodos([...todos, data]); // 기존 할 일에 새 할 일을 추가
  }

  // 할 일을 삭제하는 함수입니다.
  function deleteTodoItem(id) {
    const newTodos = todos.filter((todo) => todo.id !== id); // id가 일치하지 않는 것만 남김
    setTodos(newTodos); // 상태 업데이트
  }

  // 할 일을 수정(완료/미완료 등)하는 함수입니다.
  function updateTodoItem(id, data) {
    const todoIndex = todos.findIndex((todo) => todo.id === id); // 해당 id의 할 일 찾기
    if (todoIndex === -1) {
      alert('해당하는 할 일이 없습니다.');
      return;
    }
    todos[todoIndex] = { ...todos[todoIndex], ...data, id }; // 해당 할 일을 수정
    setTodos([...todos]); // 상태 업데이트
  }

  // 전체 할 일을 삭제하는 함수입니다.
  function clearAllTodos() {
    setTodos([]); // todos를 빈 배열로 만듦
  }

  // 실제로 화면에 보이는 부분(JSX)
  return (
    <div className="App">
      {/* 이름으로 검색하는 입력창 */}
      <input
        type="text"
        placeholder="이름으로 검색"
        value={searchUser}
        onChange={e => setSearchUser(e.target.value)}
        className="todo-input"
        style={{ margin: '24px 0', maxWidth: 200 }}
      />
      {/* 전체 삭제 버튼 */}
      <button
        onClick={clearAllTodos}
        className="todo-btn"
        style={{ marginBottom: '16px', background: '#ff6b6b' }}
      >
        전체 삭제
      </button>
      {/* 할 일 추가 폼 */}
      <TodoForm onCreate={createTodoItem} />
      {/* 할 일 목록 */}
      <TodoList
        todos={todos}
        onUpdate={updateTodoItem}
        onDelete={deleteTodoItem}
        searchUser={searchUser}
      />
    </div>
  );
}

// App 컴포넌트를 다른 파일에서 쓸 수 있게 내보냅니다.
export default App;