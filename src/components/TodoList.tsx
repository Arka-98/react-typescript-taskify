import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { ACTION } from './hooks/useLocalStorage'
import Todo from './Models'
import TodoItem from './TodoItem'

interface Props {
    completedList: Todo[]
    todoList: Todo[]
    dispatch: React.Dispatch<ACTION>
}

function TodoList({ completedList, todoList, dispatch }: Props) {
    return (
        <div className="flex flex-col lg:flex-row w-full gap-5 justify-between">
            <Droppable droppableId='todoList'>
                {
                    (provided, snapshot) => (
                        <div className={`flex flex-col h-fit gap-4 basis-1/2 p-5 border-2 border-dashed rounded-xl duration-200 ${snapshot.isDraggingOver ? 'border-green-700' : 'border-transparent'}`} ref={provided.innerRef} { ...provided.droppableProps }>
                            <p className='text-3xl font-semibold'>To Do</p>
                            {todoList.map((todo, index) => !todo.complete && <TodoItem key={todo.id} index={index} todo={todo} dispatch={dispatch} /> )}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId='completedList'>
                {
                    (provided, snapshot) => (
                        <div className={`flex flex-col h-fit gap-4 basis-1/2 p-5 border-2 border-dashed rounded-xl duration-200 ${snapshot.isDraggingOver ? 'border-green-700' : 'border-transparent'}`} ref={provided.innerRef} { ...provided.droppableProps }>
                            <p className='text-3xl font-semibold'>Completed</p>
                            {completedList.map((todo, index) => todo.complete && <TodoItem key={todo.id} index={index} todo={todo} dispatch={dispatch} /> )}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    )
}

export default TodoList