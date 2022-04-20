import {v4 as uuid} from "uuid"
import {useLocalStorage} from 'react-use'
import {useCallback, useReducer} from "react";

export class Event {
    ID: string;
    startTime: Date = new Date();
    endTime: Date | undefined;

    constructor(ID: string) {
        this.ID = ID
    }
}

export class Category {
    ID: string;
    name: string;
    active: boolean = true;

    constructor(name: string) {
        this.ID = uuid()
        this.name = name
    }
}

const LOCAL_STORAGE_KEY = "data-key-local-storage"

class State {
    categories: Category[] | undefined
    events: Event[] | undefined
    error: string | boolean | undefined
}

export const initialState: State = {
    categories: [],
    events: [],
    error: false
}

// @ts-ignore
export const reducer = (state, action) => {
    function addCategory() {
        if (state.categories.find((cat: { name: any; }) => cat.name === action.name) !== undefined) {
            state.error = `Category with name ${action.name} already exists`
            return state;
        }
        const cat = new Category(action.name)
        return {
            ...state,
            categories: [...state.categories, cat]
        }
    }

    function addEvent() {
        let category = state.categories.find((cat: { ID: any; }) => cat.ID === action.ID)
        if (category === undefined) {
            state.error = `Category with ID ${action.ID} could not be found`
            return state;
        }
        const event = new Event(action.ID)
        return {
            ...state,
            event: [...state.event, event]
        }
    }

    switch (action.type) {
        case "addCategory":
            return addCategory();
        case "dismissError":
            state.error = initialState.error
            return state;
        case "addEvent":
            return addEvent();
        default:
            return state;
    }
};

export const usePersistReducer = () => {
    const [savedState, saveState] = useLocalStorage(
        LOCAL_STORAGE_KEY,
        initialState,
    )

    const reducerLocalStorage = useCallback(
        (state, action) => {
            const newState = reducer(state, action)

            saveState(newState)

            return newState
        },
        [saveState],
    )

    return useReducer(reducerLocalStorage, savedState)
}