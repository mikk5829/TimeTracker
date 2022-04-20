import {v4 as uuid} from "uuid"
import {useLocalStorage} from 'react-use'
import {useCallback, useReducer} from "react";

export class Event {
    id: string;
    categoryId: string;
    startTime: Date = new Date();
    endTime: Date | undefined;

    constructor(categoryId: string) {
        this.id = uuid()
        this.categoryId = categoryId
    }

    endEvent(endTime: Date) {
        if (this.startTime > endTime) throw new Error("End Time is before Start Time")
        this.endTime = endTime
    }
}

export class Category {
    id: string;
    name: string;
    active: boolean = true;
    currentEvent: Event | null = null;

    constructor(name: string) {
        this.id = uuid()
        this.name = name
    }

    endCurrentEvent() {
        console.log("ending");
        if (this.currentEvent) {
            this.currentEvent.endEvent(new Date())
            this.currentEvent = null
        } else throw new Error("No current event")
    }

    rename(name: string) {
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

export enum Actions {
    AddEvent = 'addEvent',
    StopEvent = 'stopEvent',
    RenameCategory = 'renameCategory',
    DismissError = 'dismissError',
    AddCategory = 'addCategory'
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
        console.log("add");
        let category: Category = state.categories.find((cat: { id: any; }) => cat.id === action.id)
        if (category === undefined) {
            state.error = `Category with id ${action.id} could not be found`
            return state;
        }
        category.currentEvent = new Event(action.id)
        return state
    }

    function stopEvent() {
        console.log("stop");
        console.log(action.id);
        let category: Category = state.categories.find((cat: { id: any; }) => cat.id === action.id)
        if (category === undefined) {
            state.error = `Category with id ${action.id} could not be found`
            return state;
        }
        console.log(category);
        const event = category.currentEvent
        category.endCurrentEvent()
        return {
            ...state,
            events: [...state.events, event]
        }
    }

    function renameCategory() {
        let category = state.categories.find((cat: { id: any; }) => cat.id === action.id)
        if (state.categories.find((cat: { name: any; }) => cat.name === action.name) !== undefined) {
            state.error = `Category with name ${action.name} already exists`
            return state;
        }
        category.rename(action.name)
        return {
            ...state,
            categories: [...state.categories, category]
        }
    }

    switch (action.type) {
        case Actions.AddCategory:
            return addCategory();
        case Actions.DismissError:
            state.error = initialState.error
            return state;
        case Actions.RenameCategory:
            return renameCategory();
        case Actions.AddEvent:
            return addEvent();
        case Actions.StopEvent:
            return stopEvent();
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