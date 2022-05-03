import {v4 as uuid} from "uuid"
import {useLocalStorage} from 'react-use'
import {useCallback, useReducer} from "react";
import {createContainer} from 'react-tracked';
import {Color, ColorPicker, createColor} from "material-ui-color";


interface CategoryNames {
    [categoryId: string]: string;
}

class State {
    categories: Category[]
    events: Event[]
    categoryNames: CategoryNames
    error: string | boolean

    // Makes sure saved json is converted to classes
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
    color: Color

    public constructor(input: Partial<Category> = {}) {
        if (input.name === null || input.name === undefined) throw new Error("Category have no name")
        this.id = input.id ?? uuid();
        this.name = input.name
        this.active = input.active ?? true
        this.currentEvent = input.currentEvent === undefined ? undefined : new Event(input.currentEvent)
        this.color = input.color ?? createColor('#000000')
    }

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
    ToggleActiveCategory = 'toggleActiveCategory',
    AddEventWithStopTime = 'addEventWithStopTime',
    DeleteCategory = 'deleteCategory',
    ChangeCategoryColor = 'changeCategoryColor'
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

    function addEventToCategory() {
        let categories = state.categories
        let category: Category = categories.find((cat: { id: any; }) => cat.id === action.id)
        if (category === undefined) {
            const error = `Category with id ${action.id} could not be found`
            return {
                ...state,
                error: error
            }
        }
        const event = new Event({categoryId: action.id})
        return {
            ...state,
            categories: state.categories.map((cat: Category) => cat.id === action.id ? {
                ...cat, currentEvent: event
            } : cat)
        }
    }

    function addEventWithStopTime() {
        console.log("called");
        if (!action.id || !action.endTime || !action.startTime) {
            const error = `Category id or endTime or startTime is missing in dispatch`
            return {
                ...state,
                error: error
            }
        }
        let category: Category = state.categories.find((cat: { id: any; }) => cat.id === action.id)
        if (category === undefined) {
            const error = `Category with id ${action.id} could not be found`
            return {
                ...state,
                error: error
            }
        }
        let event = new Event({categoryId: action.id, startTime: action.startTime})
        try {
            event.endEvent(action.endTime)
        } catch (e: any) {
            const error = e.message
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            events: [event, ...state.events]
        }
    }

    function stopEvent() {
        if (!action.id) {
            const error = `Category id is missing in dispatch`
            return {
                ...state,
                error: error
            }
        }
        let category: Category = state.categories.find((cat: { id: any; }) => cat.id === action.id) as Category
        if (category === undefined) {
            const error = `Category with id ${action.id} could not be found`
            return {
                ...state,
                error: error
            }
        }
        const event = new Event(category.currentEvent)
        event.endEvent(new Date())
        return {
            ...state,
            events: [event, ...state.events],
            categories: state.categories.map((cat: Category) => cat.id === action.id ? {
                ...category, currentEvent: undefined
            } : cat)
        }
    }

    function changeCategoryColor() {
        if (!action.id || !action.color) {
            const error = `Category id or color is missing in dispatch`
            return {
                ...state,
                error: error
            }
        }
        let categories = state.categories
        let category = categories.find((cat: Category) => cat.id === action.id) as Category
        if (category === undefined) {
            const error = `Category with id ${action.id} could not be found`
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            categories: state.categories.map((cat: Category) => cat.id === action.id ? {
                ...cat, color: action.color
            } : cat)
        }
    }

    function renameCategory() {
        if (!action.id || !action.name) {
            const error = `Category id or name is missing in dispatch`
            return {
                ...state,
                error: error
            }
        }
        let categories = state.categories
        let category = categories.find((cat: { id: any; }) => cat.id === action.id)
        if (category === undefined) {
            const error = `Category with id ${action.id} could not be found`
            return {
                ...state,
                error: error
            }
        }
        if (categories.find((cat: { name: any; }) => cat.name === action.name) !== undefined) {
            const error = `Category with name ${action.name} already exists`
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            categories: state.categories.map((cat: Category) => cat.id === action.id ? {
                ...cat, name: action.name
            } : cat)
        }
    }

    function deleteEvent() {
        if (!action.id) {
            const error = `Event id is missing in dispatch`
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            events: state.events.filter((event: Event) => event.id !== action.id)
        }
    }


    function deleteCategory() {
        if (!action.id) {
            const error = `Category id is missing in dispatch`
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            categories: state.categories.filter((cat: Category) => cat.id !== action.id)
        }
    }

    function toggleActiveCategory() {
        if (!action.id) {
            const error = `Category id is missing in dispatch`
            return {
                ...state,
                error: error
            }
        }
        let categories = state.categories
        let category = categories.find((cat: Category) => cat.id === action.id) as Category
        if (category === undefined) {
            const error = `Category with id ${action.id} could not be found`
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            categories: state.categories.map((cat: Category) => cat.id === action.id ? {
                ...cat, active: !cat.active
            } : cat)
        }

    }

    switch (action.type) {
        case Actions.AddCategory:
            return addCategory();
        case Actions.DismissError:
            const error = initialState.error
            return {
                ...state,
                error: error
            }
        case Actions.RenameCategory:
            return renameCategory();
        case Actions.AddEvent:
            return addEventToCategory();
        case Actions.StopEvent:
            return stopEvent();
        case Actions.DeleteEvent:
            return deleteEvent();
        case Actions.ToggleActiveCategory:
            return toggleActiveCategory();
        case Actions.AddEventWithStopTime:
            return addEventWithStopTime();
        case Actions.DeleteCategory:
            return deleteCategory()
        case Actions.ChangeCategoryColor:
            return changeCategoryColor()
        default:
            return state;
    }
};

const usePersistReducer = () => {
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

const useValue = () => usePersistReducer()

export const {
    Provider,
    useTrackedState,
    useUpdate: useDispatch,
} = createContainer(useValue);
