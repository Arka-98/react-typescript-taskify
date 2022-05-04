import { useEffect, useReducer, useState } from "react";
import Todo from "../Models";

export enum ACTION_TYPE {
    ADD,
    UPDATE,
    DELETE,
    TOGGLE_COMPLETE,
    SET
}

export type ACTION =
| {type: ACTION_TYPE.ADD, payload: Todo}
| {type: ACTION_TYPE.UPDATE, payload: { id: number, text: string }}
| {type: ACTION_TYPE.DELETE, payload: { id: number }}
| {type: ACTION_TYPE.TOGGLE_COMPLETE, payload: { id: number }}
| {type: ACTION_TYPE.SET, payload: Todo[]}

function getItems(key: string, initialValue: Todo[]): Todo[] {
    const savedValue: Todo[] = JSON.parse(localStorage.getItem(key) || '')
    if(!savedValue) return initialValue
    return savedValue
}

function reducer(state: Todo[], action: ACTION): Todo[] {
    switch(action.type) {
        case ACTION_TYPE.ADD:
            return [ ...state, { ...action.payload } ]
        case ACTION_TYPE.DELETE:
            return state.filter(todo => todo.id !== action.payload.id)
        case ACTION_TYPE.UPDATE:
            return state.map(todo => todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo)
        case ACTION_TYPE.TOGGLE_COMPLETE:
            return state.map(todo => todo.id === action.payload.id ? { ...todo, complete: !todo.complete } : todo)
        case ACTION_TYPE.SET:
            return action.payload    
        default:
            return state
    }
}

function useLocalStorage(key: string, initialValue: Todo[]): [Todo[], React.Dispatch<ACTION>] {
    const [state, dispatch] = useReducer(reducer, initialValue, (initialValue) => getItems(key, initialValue))

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state])

    return [state, dispatch]
}

export default useLocalStorage