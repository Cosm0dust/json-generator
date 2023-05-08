import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {buildObject, RandomProps} from "../../typescripUtils/model";


export interface DB {
    names: string[],
    surnames: string[],
    hobbiesArray: Array<string[]>
}

export interface builderState {
    workingArr : Array<buildObject & RandomProps>;
    propertiesArr: string[]
    arraysDB: DB
}

const initialState: builderState = {
    workingArr: [],
    propertiesArr: [],
    arraysDB: {
        names: ['Emily', 'Ethan', 'Olivia', 'Liam', 'Ava', 'Noah', 'Sophia', 'Mason', 'Isabella', 'Aiden', 'Mia', 'Caden', 'Charlotte', 'Jackson', 'Harper', 'Grayson', 'Amelia', 'Lucas', 'Abigail', 'Oliver'],
        surnames: ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Jackson", "Martin", "Lee", "Walker", "Clark", "Robinson", "Young", "Allen", "King"],
        hobbiesArray: [
            ['reading', 'writing', 'painting'],
            ['soccer', 'basketball', 'swimming'],
            ['cooking', 'dancing', 'traveling'],
            ['photography', 'hiking', 'gardening'],
            ['singing', 'playing video games', 'learning languages'],
            ['fishing', 'playing chess', 'woodworking'],
            ['yoga', 'meditation', 'running'],
            ['knitting', 'crocheting', 'sewing'],
            ['surfing', 'skateboarding', 'snowboarding'],
            ['watching movies', 'binge-watching TV shows', 'listening to music'],
            ['playing guitar', 'playing drums', 'singing karaoke'],
            ['cycling', 'jogging', 'walking'],
            ['scuba diving', 'skydiving', 'bungee jumping']
        ]
    },
}

const builderSlice = createSlice({
    name: "builder",
    initialState,
    reducers: {

        changeLength(state, action: PayloadAction<{ length: number }>){
            state.workingArr = [];

            for(let i = 0; i < action.payload.length; i++){
                state.workingArr.push({})
            }

            state.propertiesArr = [];
        },
        addSomething(state, action: PayloadAction<{ arg: string, argName: string }>){

            const selectArr = state.arraysDB[action.payload.arg]

            state.workingArr = state.workingArr.map((obj: buildObject & RandomProps) => {
                return {...obj, [action.payload.argName]: selectArr[Math.floor(Math.random() * selectArr.length)]}
            })

            if(!state.propertiesArr.includes(action.payload.argName) && state.workingArr.length> 0){
                state.propertiesArr.push(action.payload.argName)
            }

        },
        addSomethId (state, action: PayloadAction<{ smth: string }>)  {
            state.workingArr = state.workingArr.map((obj : buildObject & RandomProps) => {
                return {...obj, [`${action.payload.smth}Id`]: Math.floor(Math.random() * state.workingArr.length)}
            })


            if(!state.propertiesArr.includes(`${action.payload.smth}Id`)){
                state.propertiesArr.push(`${action.payload.smth}Id`)
            }
        },
        addFullName (state)  {
            state.workingArr = state.workingArr.map((obj : buildObject & RandomProps) => {
                if(obj.name && obj.surname){
                    return {...obj, fullName: `${obj.name} ${obj.surname}`}
                }
                return obj
            })

            if(!state.propertiesArr.includes(`fullName`) && state.workingArr.length> 0){
                state.propertiesArr.push(`fullName`)
            }
        },
        addRandomFullName(state){

            state.workingArr = state.workingArr.map((obj : buildObject & RandomProps) => {
                return {...obj, fullName: `${state.arraysDB.names[Math.floor(Math.random() * state.arraysDB.names.length)]} ${state.arraysDB.surnames[Math.floor(Math.random() * state.arraysDB.names.length)]}`}
            })

            if(!state.propertiesArr.includes(`fullName`)){
                state.propertiesArr.push(`fullName`)
            }
        },
        addId(state){
            state.workingArr = state.workingArr.map((obj: buildObject & RandomProps, index: number) => {
                return { ...obj, id: index + 1 };
            })

            if(!state.propertiesArr.includes(`id`) && state.workingArr.length> 0){
                state.propertiesArr.push(`id`)
            }
        },
        addHobbiesArray(state){
            state.workingArr = state.workingArr.map((obj : buildObject & RandomProps) => {
                return {...obj, hobbies: state.arraysDB.hobbiesArray[Math.floor(Math.random() * state.arraysDB.hobbiesArray.length)]}

            })
            if(!state.propertiesArr.includes(`hobbies`) && state.workingArr.length> 0){
                state.propertiesArr.push(`hobbies`)
            }
        },
        addRandomArray(state, action: PayloadAction<{ arr: Array<string[]>, arrayName: string }>){
            state.workingArr = state.workingArr.map((obj : buildObject & RandomProps) => {
                return {...obj, [action.payload.arrayName]: action.payload.arr[Math.floor(Math.random() * action.payload.arr.length)]}

            })


            if(!state.propertiesArr.includes(action.payload.arrayName)){
                state.propertiesArr.push(action.payload.arrayName)
            }
        },
        addRandomBirthDate(state){
            const start = new Date('1990-01-01').getTime();
            const end = new Date('2010-12-31').getTime();


            state.workingArr = state.workingArr.map((obj : buildObject & RandomProps) => {

                return {...obj, birthDate: new Date(start + Math.random() * (end - start))  }})

            if(!state.propertiesArr.includes('birthDate') && state.workingArr.length> 0){
                state.propertiesArr.push('birthDate')
            }
        },
        deleteProperty(state, action: PayloadAction<{ prop: string }>){

            for (let i = 0; i < state.workingArr.length; i++) {
                delete state.workingArr[i][action.payload.prop];
            }

            state.propertiesArr= state.propertiesArr.filter(el => el !== action.payload.prop)
        },
        addRandomDate(state, action: PayloadAction<{ from: string, to: string, format: string, dateName : string }>){
            const fromDate = new Date(action.payload.from.split('.').reverse().join('-'));
            const toDate = new Date(action.payload.to.split('.').reverse().join('-'));
            if (toDate.getTime() < fromDate.getTime()) {
                throw new Error('Invalid date range. To date cannot be earlier than from date.');
            }

            const timeDiff = toDate.getTime() - fromDate.getTime();

            if (action.payload.format === 'dd.mm.yyyy') {
                state.workingArr = state.workingArr.map((obj:any) => {
                        const randomTime = Math.floor(Math.random() * timeDiff);
                        const randomDate = new Date(fromDate.getTime() + randomTime);
                        const day = String(randomDate.getDate()).padStart(2, '0');
                        const month = String(randomDate.getMonth() + 1).padStart(2, '0');
                        const year = String(randomDate.getFullYear()).substr(2, 2).padStart(2, '0');
                        return {...obj, [action.payload.dateName ||'date']: `${day}.${month}.${year}`}
                    }
                ) ;
            } else {
                throw new Error(`Invalid date format: ${action.payload.format}.`);
            }

            if(!state.propertiesArr.includes(action.payload.dateName || 'date') && state.workingArr.length> 0){
                state.propertiesArr.push(action.payload.dateName || 'date')
            }
        },
        addRandomNumber(state, action: PayloadAction<{ min: number, max: number, valueName: string }>){
            action.payload.min= Math.ceil(action.payload.min);
            action.payload.max = Math.floor(action.payload.max);
            state.workingArr = state.workingArr.map((obj : buildObject & RandomProps) => {
                return {...obj, [action.payload.valueName] : Math.floor(Math.random() * (action.payload.max - action.payload.min + 1)) + action.payload.min}})


            if(!state.propertiesArr.includes(action.payload.valueName) && state.workingArr.length> 0){
                state.propertiesArr.push(action.payload.valueName)
            }
        },
        addRandomBoolean(state, action: PayloadAction<{ valueName:string }>){
            state.workingArr = state.workingArr.map((obj: buildObject & RandomProps)=> {
                return {...obj, [action.payload.valueName] : !!Math.round(-0.5 + Math.random() * 1.5)}
            })

            if(!state.propertiesArr.includes(action.payload.valueName) && state.workingArr.length> 0) {
                state.propertiesArr.push(action.payload.valueName)
            }
        },
        addRandomString (state, action: PayloadAction<{ stringArr: string[], valueName: string }>){
            state.workingArr = state.workingArr.map((obj: buildObject & RandomProps)=> {
                return {...obj, [action.payload.valueName] : action.payload.stringArr[Math.floor(Math.random() * (action.payload.stringArr.length -  1) )]}
            })

            if(!state.propertiesArr.includes(action.payload.valueName) && state.workingArr.length> 0) {
                state.propertiesArr.push(action.payload.valueName)
            }
        },
        setWorkingArray(state, action: PayloadAction<{ savedArr: (buildObject & RandomProps)[]}>){

            state.workingArr =  action.payload.savedArr
            if(state.workingArr.length > 0){
                state.propertiesArr = Object.keys(state.workingArr[0])
            } else {
                state.propertiesArr = []
            }

        }


    }
})

export const selectAuth = (state: RootState) => state.builder

export const {changeLength, addSomething, addSomethId, addFullName, addRandomFullName, addId, addHobbiesArray, addRandomBirthDate, deleteProperty, addRandomBoolean, addRandomNumber, addRandomString, addRandomDate, setWorkingArray} = builderSlice.actions

export default builderSlice.reducer