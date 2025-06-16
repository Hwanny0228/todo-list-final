// TodoItem 컴포넌트를 정의합니다. props는 부모 컴포넌트에서 전달받는 값입니다.
function TodoItem(props) {
    // 삭제 버튼을 눌렀을 때 실행되는 함수입니다.
    function handleDelete() {
        // 부모에게 이 할 일의 id를 전달해서 삭제를 요청합니다.
        props.onDelete(props.todo.id);
    }

    // 완료/미완료 버튼을 눌렀을 때 실행되는 함수입니다.
    function handleToggle() {
        // 현재 완료 상태를 반전시킵니다.
        const newCompleted = !props.todo.completed;
        // 부모에게 id와 변경된 완료 상태를 전달해서 업데이트를 요청합니다.
        props.onUpdate(props.todo.id, { completed: newCompleted });
    }

    // 실제로 화면에 보이는 부분(JSX)
    return (
        // 한 할 일을 감싸는 div입니다. inline-block으로 옆으로 정렬됩니다.
        <div style={{ display: 'inline-block'}}>
            {/* 할 일 작성자 이름을 보여줍니다. */}
            <span style={{margin: '10px'}}>이름 : {props.todo.user}</span>
            {/* 할 일 내용을 보여줍니다. */}
            <span>할 일 : {props.todo.text}</span>
            {/* 완료 여부를 색상과 굵기로 표시합니다. */}
            <span style={{
                color: props.todo.completed ? 'green' : 'red', // 완료면 초록, 아니면 빨강
                fontWeight: props.todo.completed ? 'bold' : 'normal', // 완료면 굵게
                margin: '10px'
            }}>
                완료 여부: {props.todo.completed ? '완료' : '미완료'}
            </span>
            {/* 완료/미완료 토글 버튼 */}
            <button onClick={handleToggle}>
                {props.todo.completed ? '미완료로 변경' : '완료로 변경'}
            </button>
            {/* 삭제 버튼 */}
            <button onClick={handleDelete} style={{margin: '10px'}}>삭제</button>
        </div>
    )
}

// TodoItem 컴포넌트를 다른 파일에서 쓸 수 있게 내보냅니다.
export default TodoItem;