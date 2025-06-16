// React와 useState(상태 관리 함수)를 불러옵니다.
import React, { useState } from "react";

// TodoForm 컴포넌트를 정의합니다. props는 부모 컴포넌트(App)에서 전달받는 값입니다.
function TodoForm(props) {
    // 할 일 내용 상태를 저장하는 변수와 그 값을 바꾸는 함수를 만듭니다.
    const [newTodoText, setNewTodoText] = useState('');
    // 사용자 이름 상태를 저장하는 변수와 그 값을 바꾸는 함수를 만듭니다.
    const [newTodoUser, setNewTodoUser] = useState('');

    // 할 일 입력창의 값이 바뀔 때마다 실행되는 함수입니다.
    function handleChange(event) {
        setNewTodoText(event.target.value); // 입력값을 newTodoText에 저장합니다.
    }
    // 이름 입력창의 값이 바뀔 때마다 실행되는 함수입니다.
    function handleChangeUser(event) {
        setNewTodoUser(event.target.value); // 입력값을 newTodoUser에 저장합니다.
    }
    // 폼이 제출(추가 버튼 클릭)될 때 실행되는 함수입니다.
    function handleSubmit(event) {
        event.preventDefault(); // 폼의 기본 동작(새로고침)을 막습니다.
        const data = {
            user: newTodoUser, // 입력한 이름
            text: newTodoText, // 입력한 할 일
            completed: false   // 처음엔 완료가 아니므로 false로 설정
        }
        props.onCreate(data); // 부모(App)에게 새 할 일 추가 요청
        // 입력창 초기화(선택)
        setNewTodoText('');
        setNewTodoUser('');
    }
    // 실제로 화면에 보이는 부분(JSX)
    return (
        <div className="todo-form-container"> {/* 폼을 감싸는 div */}
            <form onSubmit={handleSubmit} className="todo-form-row"> {/* 폼, 제출 시 handleSubmit 실행 */}
                <input
                    type="text"
                    value={newTodoUser}
                    onChange={handleChangeUser}
                    className="todo-input"
                    placeholder="이름"
                />
                <input
                    type="text"
                    value={newTodoText}
                    onChange={handleChange}
                    className="todo-input"
                    placeholder="할 일"
                />
                <button type="submit" className="todo-btn">추가</button> {/* 추가 버튼 */}
            </form>
        </div>
    )
}

// TodoForm 컴포넌트를 다른 파일에서 쓸 수 있게 내보냅니다.
export default TodoForm;