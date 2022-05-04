import React, { useMemo, useRef, useState } from 'react'
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd'
import { FaPlus } from 'react-icons/fa'
import useLocalStorage, { ACTION_TYPE } from './hooks/useLocalStorage'
import Button from './layout/Button'
import Input from './layout/Input'
import Todo from './Models'
import TodoList from './TodoList'

function Body() {
  const [input, setInput] = useState<string>('')
  const [todos, dispatch] = useLocalStorage('todoList', [])

  const completedList = useMemo(() => todos.filter(todo => todo.complete), [todos])
  const todoList = useMemo(() => todos.filter(todo => !todo.complete), [todos])

  const disabled = useRef<boolean>(true)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value)
    if(!e.target.value.trim()) disabled.current = true
    else disabled.current = false
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if(!input.trim()) return
    dispatch({ type: ACTION_TYPE.ADD, payload: { id: todos.length + 1, text: input, complete: false } })
    setInput('')
    disabled.current = true
  }

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { source, destination } = result

    if(!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return

    let dragItem: Todo
    if(source.droppableId === 'todoList') {
      dragItem = todoList[source.index]
      todoList.splice(source.index, 1)
    } else {
      dragItem = completedList[source.index]
      completedList.splice(source.index, 1)
    }

    if(destination.droppableId === 'todoList') {
      dragItem.complete = false
      todoList.splice(destination.index, 0, dragItem)
    } else {
      dragItem.complete = true
      completedList.splice(destination.index, 0, dragItem)
    }

    dispatch({ type: ACTION_TYPE.SET, payload: todoList.concat(completedList) })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex flex-col gap-10 w-4/5 mx-auto my-12'>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input name='input' value={input} onChange={handleChange} />
          <Button type='submit' disabled={disabled.current}>
            <FaPlus className='text-white'/>
            <p>Add Todo</p>
          </Button>
        </form>
        <TodoList completedList={completedList} todoList={todoList} dispatch={dispatch} />
      </div>
    </DragDropContext>
  )
}

export default Body