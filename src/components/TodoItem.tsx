import React, { useEffect, useRef, useState } from 'react'
import Todo from './Models'
import { FaCheck, FaPen, FaTrash, FaCheckCircle, FaRegTimesCircle, FaTimes, FaPlus } from 'react-icons/fa'
import Input from './layout/Input'
import { ACTION, ACTION_TYPE } from './hooks/useLocalStorage'
import { Draggable } from 'react-beautiful-dnd'

interface Props {
    todo: Todo
    index: number
    dispatch: React.Dispatch<ACTION>
}

function TodoItem({ todo, index, dispatch }: Props) {
  const [editInput, setEditInput] = useState<string>(todo.text)
  const [edit, setEdit] = useState<boolean>(false)

  const disabled = useRef<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(edit) inputRef.current?.focus()
  }, [edit])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEditInput(e.target.value)
    if(!e.target.value.trim()) disabled.current = true
    else disabled.current = false
  }

  const handleSubmit = () => {
    if(!editInput.trim()) {
      return
    }
    dispatch({ type: ACTION_TYPE.UPDATE, payload: { id: todo.id, text: editInput.trim() } })
    setEdit(false)
  }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided) => (
          <div
            className='flex justify-between items-center w-full px-5 py-3 gap-5 rounded-lg bg-white border-2 border-slate-300 shadow-slate-300 duration-200 hover:shadow-md hover:-translate-y-0.5'
            { ...provided.dragHandleProps }
            { ...provided.draggableProps }
            ref={provided.innerRef}
          >
              {
                edit ?
                <Input name='editInput' inputRef={inputRef} value={editInput} onChange={handleChange} /> :
                <p className={`font-semibold ${todo.complete && 'line-through'}`}>{todo.text}</p>
              }
              <div className="flex gap-1 items-center">
                {
                  edit ?
                  <>
                    <FaCheckCircle onClick={handleSubmit} className={`icon text-green-500 ${disabled.current && 'opacity-50'}`} />
                    <FaRegTimesCircle onClick={() => setEdit(false)} className='icon text-red-500' />
                  </> :
                  <>
                    <FaPen className='icon text-green-500' onClick={() => setEdit(true)} />
                    <FaTrash className='icon text-red-500' onClick={() => dispatch({ type: ACTION_TYPE.DELETE, payload: { id: todo.id } })} />
                    {
                      todo.complete ?
                      <FaTimes className='icon' onClick={() => dispatch({ type: ACTION_TYPE.TOGGLE_COMPLETE, payload: { id: todo.id } })} /> :
                      <FaCheck className='icon' onClick={() => dispatch({ type: ACTION_TYPE.TOGGLE_COMPLETE, payload: { id: todo.id } })} />
                    }
                  </>
                }
              </div>
          </div>
        )
      }
    </Draggable>
  )
}

export default TodoItem