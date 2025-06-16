// TodoItem 컴포넌트를 불러옵니다.
import TodoItem from "./TodoItem";
// App.css에서 스타일을 불러옵니다.
import "../App.css";

// TodoList 컴포넌트를 정의합니다. props는 부모(App)에서 전달받는 값입니다.
function TodoList(props) {
    // 이름으로 필터링합니다. searchUser가 있으면 해당 이름만, 없으면 전체를 사용합니다.
    const filteredTodos = props.searchUser
        ? props.todos.filter(todo => todo.user === props.searchUser)
        : props.todos;

    // 이름(user) 기준으로 오름차순 정렬합니다.
    const sortedTodos = [...filteredTodos].sort((a, b) => {
        if (!a.user) return 1; // a에 이름이 없으면 뒤로 보냄
        if (!b.user) return -1; // b에 이름이 없으면 앞으로 보냄
        return a.user.localeCompare(b.user, 'ko'); // 한글 기준 가나다순 정렬
    });

    // 실제로 화면에 보이는 부분(JSX)
    return (
        // 리스트 전체를 감싸는 div
        <div className="todo-list-container">
            {/* 할 일 목록을 ol(순서 있는 리스트)로 만듭니다. */}
            <ol className="todo-list">
                {/* 정렬된 할 일 배열을 하나씩 꺼내서 TodoItem으로 만듭니다. */}
                {sortedTodos.map((todo, index) => (
                    // 각 할 일을 li로 감싸고, key는 index로 지정합니다.
                    <li key={index} className="todo-list-item">
                        {/* TodoItem에 할 일 정보와 수정/삭제 함수 전달 */}
                        <TodoItem
                            todo={todo}
                            onUpdate={props.onUpdate}
                            onDelete={props.onDelete}
                        />
                    </li>
                ))}
            </ol>
        </div>
    )
}

// TodoList 컴포넌트를 다른 파일에서 쓸 수 있게 내보냅니다.
export default TodoList;