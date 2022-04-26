import {v4 as uuid} from "uuid"
import {useLocalStorage} from 'react-use'
import {useCallback, useReducer} from "react";

interface CategoryNames {
    [categoryId: string]: string;
}

class State {
    categories: Category[]
    events: Event[]
    categoryNames: CategoryNames
    error: string | boolean

    public constructor(input: Partial<State> = {}) {
        this.categories = input.categories?.map((cat) => new Category(cat)) ?? []
        this.events = input.events?.map((event) => new Event(event)) ?? []
        this.categoryNames = input.categoryNames ?? {}
        this.error = input.error ?? false
    }
}

export class Event {
    id: string;
    categoryId: string;
    startTime: Date = new Date();
    endTime: Date | undefined;

    public constructor(input: Partial<Event> = {}) {
        this.id = input.id ?? uuid()
        Object.assign(this, input);
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
    currentEvent?: Event = undefined;

    public constructor(input: Partial<Category> = {}) {
        if (input.name === null || input.name === undefined) throw new Error("Category have no name")
        this.id = input.id ?? uuid();
        this.name = input.name
        this.active = input.active ?? true
        this.currentEvent = input.currentEvent === undefined ? undefined : new Event(input.currentEvent)
    }

    endCurrentEvent() {
        if (this.currentEvent) {
            this.currentEvent.endEvent(new Date())
            this.currentEvent = undefined
        } else throw new Error("No current event")
    };

    rename(name: string) {
        this.name = name
    }
}

const LOCAL_STORAGE_KEY = "data-key-local-storage"

export const initialState: State = {
    categories: [],
    events: [],
    categoryNames: {},
    error: false
}

export enum Actions {
    AddEvent = 'addEvent',
    StopEvent = 'stopEvent',
    DeleteEvent = 'deleteEvent',
    RenameCategory = 'renameCategory',
    DismissError = 'dismissError',
    AddCategory = 'addCategory',
    ToggleActiveCategory = 'toggleActiveCategory'
}

// @ts-ignore
export const reducer = (state, action) => {
    function addCategory() {
        if (state.categories.find((cat: { name: any; }) => cat.name === action.name) !== undefined) {
            state.error = `Category with name ${action.name} already exists`
            return state;
        }
        const cat = new Category({name: action.name})
        return {
            ...state,
            categories: [...state.categories, cat]
        }
    }

    function addEvent() {
        let category: Category = state.categories.find((cat: { id: any; }) => cat.id === action.id)
        if (category === undefined) {
            state.error = `Category with id ${action.id} could not be found`
            return state;
        }
        category.currentEvent = new Event({categoryId: action.id})
        return state
    }

    function stopEvent() {
        let category = state.categories.find((cat: { id: any; }) => cat.id === action.id) as Category
        if (category === undefined) {
            state.error = `Category with id ${action.id} could not be found`
            return state;
        }
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

    function deleteEvent() {
        if (!action.id) {
            state.error = `Event id is missing in dispatch`
            return state
        }
        return {
            ...state,
            events: state.events.filter((event: Event) => event.id !== action.id)
        }
    }

    function toggleActiveCategory() {
        if (!action.id) {
            state.error = `Category id is missing in dispatch`
            return state
        }
        let category = state.categories.find((cat: Category) => cat.id === action.id) as Category
        if (category === undefined) {
            state.error = `Category with id ${action.id} could not be found`
            return state;
        }
        const active = !category.active
        console.log(category.active)
        category.active = active
        console.log(category.active)

        return state;
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
        case Actions.DeleteEvent:
            return deleteEvent();
        case Actions.ToggleActiveCategory:
            return toggleActiveCategory();
        default:
            return state;
    }
};

export const usePersistReducer = () => {
    const [savedState, saveState] = useLocalStorage(
        LOCAL_STORAGE_KEY,
        initialState, {
            raw: false,
            serializer: (value: State) => JSON.stringify(value),
            deserializer: (value: string) => new State(JSON.parse(value))
        }
    )

    const reducerLocalStorage = useCallback(
        (state, action) => {
            const newState = reducer(state, action)

            newState?.categories.map((cat: { id: string | number; name: any; }) => newState.categoryNames[cat.id] = cat.name)

            saveState(newState)

            return newState
        },
        [saveState],
    )

    return useReducer(reducerLocalStorage, savedState)
}