import React, {useEffect, useState} from 'react';
import NeonBorderButton from "../../UIElems/NeonBorderButton/NeonBorderButton";
import DateInput from "../../UIElems/DateInput/DateInput";
import FlyPlaceholder from "../../UIElems/FlyPlaceholder/FlyPlaceholder";



const names: string[] = [
    'Emily',
    'Ethan',
    'Olivia',
    'Liam',
    'Ava',
    'Noah',
    'Sophia',
    'Mason',
    'Isabella',
    'Aiden',
    'Mia',
    'Caden',
    'Charlotte',
    'Jackson',
    'Harper',
    'Grayson',
    'Amelia',
    'Lucas',
    'Abigail',
    'Oliver'
];

const surnames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Jackson", "Martin", "Lee", "Walker", "Clark", "Robinson", "Young", "Allen", "King"];


const hobbiesArray = [
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
];



const Constructor = () => {
    const [arr, setArr] = useState<any[]>([])
    const [arrProperties, setArrProperties] = useState<string[]>([])
    const [ arrLength, setArrLength] = useState<number>(0)

    const [acceptChanges, setAcceptChanges] = useState(false)
    const [accept, setAccept] = useState(false)
    const [showWarning, setShowWarning] =useState(false)

    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')

    const [minNum, setMinNum] = useState(0)
    const [maxNum, setMaxNum] = useState(0)
    const [valueName, setValueName] =useState('')

    const [booleanName, setBooleanName] = useState('')

    const [stringName, setStringName] = useState('')
    const [stringArrValue, setStringArrValue] =useState('')
    const [stingArr, setStringArr] = useState<string[]>([])


    const [showOne, setShowOne] = useState(false)



    const setLength = () => {

        setArr( [])

        for(let i = 0; i < arrLength; i++){
            setArr((prev)=>[...prev, {}])
        }

        setArrProperties(prev=> [])
    }

    
    const addId = () => {

        setArr((prev: any) => prev.map((obj: any, index: any) => {
            return { ...obj, id: index + 1 };
        }))

        setArrProperties((prev: string[])=> [...prev, 'id'])
    }


    const addSometing = (arg: any[], argName: string) => {

        setArr((prev: any[])=> prev.map((obj : any) => {
            return {...obj, [argName]: arg[Math.floor(Math.random() * arg.length)]}
        }))

        setArrProperties((prev: string[])=> [...prev, argName])
    }


    const addSomethId = (smth : string) => {
        setArr((prev: any[])=> prev.map((obj : any) => {
            return {...obj, [`${smth}Id`]: Math.floor(Math.random() * arrLength)}
        }))

        setArrProperties((prev: string[])=> [...prev, `${smth}Id`])
    }

    const addFullName = () => {
        setArr((prev: any[])=> prev.map((obj : any) => {
            if(obj.name && obj.surname){
                return {...obj, fullName: `${obj.name} ${obj.surname}`}
            }
            return obj
        }))

        setArrProperties((prev: string[])=> [...prev, 'fulName'])
    }

    const addRandomFullName = () => {

        setArr((prev: any[])=> prev.map((obj : any) => {
            return {...obj, fullName: `${names[Math.floor(Math.random() * names.length)]} ${surnames[Math.floor(Math.random() * names.length)]}`}
        }))


        setArrProperties((prev: string[])=> [...prev, 'fullName'])
    }

    const addHobbiesArray = ( array: any[], arrayName: string ) => {

        setArr((prev: any[])=> prev.map((obj : any) => {

            return {...obj, [arrayName]: array[Math.floor(Math.random() * array.length)]}

        }))

        setArrProperties((prev: string[])=> [...prev, 'hobbies'])

    }






    const deleteProperty = (property: string) => {



        setArrProperties((prev: string[])=> {
            const [property, ...rest] = prev
            return rest
        })


        setArr((prev: any[]) => prev.map(obj=> {
            const {property, ...rest} = obj
            return rest
        }))
    }





    const formateDateString = (date: string) =>{
        if(date){
            const newDate = date.split('-').reverse()
            return newDate.join('.')
        }
        return ''

    }

    const addRandomDate=(from: string, to: string, format = 'dd.mm.yyyy', dateName : string = 'date')=> {

        const fromDate = new Date(from.split('.').reverse().join('-'));
        const toDate = new Date(to.split('.').reverse().join('-'));
        if (toDate.getTime() < fromDate.getTime()) {
            throw new Error('Invalid date range. To date cannot be earlier than from date.');
        }

        const timeDiff = toDate.getTime() - fromDate.getTime();


        if (format === 'dd.mm.yyyy') {
            setArr((prev : any[]) => prev.map((obj:any) => {
                    const randomTime = Math.floor(Math.random() * timeDiff);
                    const randomDate = new Date(fromDate.getTime() + randomTime);
                    const day = String(randomDate.getDate()).padStart(2, '0');
                    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
                    const year = String(randomDate.getFullYear()).substr(2, 2).padStart(2, '0');
                    return {...obj, date: `${day}.${month}.${year}`}
                })
            ) ;
        } else {
            throw new Error(`Invalid date format: ${format}.`);
        }

        setArrProperties((prev: string[])=> [...prev, 'date'])
    }


    const addRandomNumber = (min: number, max: number, valueName: string = 'Number' ) => {
        min= Math.ceil(min);
        max = Math.floor(max);
        setArr((prev: any[])=> prev.map((obj : any) => {
            return {...obj, [valueName] : Math.floor(Math.random() * (max - min + 1)) + min}}))

        setArrProperties((prev: string[])=> [...prev, valueName])
    }


    const addRandomBoolean =(valueName:string)=>{

        setArr((prev:any[])=> prev.map((obj: any)=> {
            return {...obj, [valueName] : !!Math.round(-0.5 + Math.random() * 1.5)}
        }))

        setArrProperties((prev: string[])=> [...prev,  valueName])

    }

    const addRandomString = (stringArr: string[], valueName: string) => {
        setArr((prev:any[])=> prev.map((obj: any)=> {
            return {...obj, [valueName] : stringArr[Math.floor(Math.random() * (stringArr.length -  1) )]}
        }))

        setArrProperties((prev: string[])=> [...prev, valueName])
    }

    const addUniquePropertyToArray = (prop: string) => {
        if (!stingArr.includes(prop)) {
            setStringArr((prev: any) => [...prev, stringArrValue])}
        setStringArrValue('')
    }


    useEffect(()=>{
        console.log(arr)
    }, [arr])





    return (
        <div className='constructor'>
            <div className='options'>
                <h2>What to add to JSON</h2>
                <div className='changeLength'>
                    <input type="text" value={arrLength}
                          onChange={e => setArrLength(Number.isNaN(Number(e.target.value)) ? 0 : Number(e.target.value))}/>
                    <div className='buttonLength' >
                        <NeonBorderButton onClick={setLength} text={'Change length'}/>
                    </div>
                    <div>
                        <p>Are you sure? this will delete previous array!</p>
                        <input type="radio" name="access" value='true'  onChange={event => setAccept(!!event.target.value)}/>
                        <input type="radio" name="access" value=''  onChange={event => setAccept(!!event.target.value)}/>


                    </div>
                </div>
                <div className='buttonsBucket'>
                    <h2>What to add?</h2>
                    <div className='addBucket'>
                        <button onClick={() => addSometing(names, 'name')}>Name</button>
                        <button onClick={() => addSometing(surnames, 'surname')}>Surname</button>
                        <button onClick={() => addFullName()}>Fullname</button>
                        <button onClick={() => addRandomFullName()}>random Fullname</button>
                        <button onClick={() => addSomethId('users')}>SomethId</button>
                        <button onClick={() => addId()}>Id</button>
                        <button onClick={() => addHobbiesArray(hobbiesArray, 'hobbies')}>Hobbies</button>
                         </div>
                    <h2 style={{color: 'red'}}>What to delete?</h2>
                    <div className='deleteBuckets'>
                        {arrProperties.map(el =><button onClick={() => deleteProperty(el)}>delete {el}</button>)}
                    </div>
                </div>



                <div className='customAdd'>
                    <h2>Customize adds</h2>

                    <div>
                        <h3>Add random date:</h3>
                        <div className='addDate'>
                            <div className='dates'>
                                <div>
                                    <div>From Date:</div>
                                    <div><DateInput value={fromDate} onChange={e => setFromDate(e.target.value)}/></div>
                                </div>
                                <div>
                                    <div>To Date:</div>
                                    <div>
                                        <DateInput value={toDate} onChange={e => setToDate(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className='dateButton'>
                                <NeonBorderButton
                                    onClick={() => addRandomDate(formateDateString(fromDate), formateDateString(toDate))}
                                    text={'Add random date'}/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3>Add random number:</h3>
                        <div className='addNumber'>

                            <div className='numbersFlex'>
                                <div className='numbers'>
                                    <input type="number" value={minNum} onChange={e => setMinNum(+e.target.value)}/>
                                    <input type="number" value={maxNum} onChange={e => setMaxNum(+e.target.value)}/>
                                </div>
                                <div className='addNumberInput'>
                                    <FlyPlaceholder placeholder={'Name value'} value={valueName}
                                                    onChange={e => setValueName(e.target.value)}/>
                                </div>
                            </div>
                            <div className='addNumberButton'>
                                <NeonBorderButton onClick={() => addRandomNumber(minNum, maxNum, valueName)}
                                                  text={'Add random number'}/>
                            </div>
                        </div>
                    </div>


                    <div>
                        <h3>Add random boolean</h3>
                        <div className='addBoolean'>
                            <div className='booleanInput'>
                                <FlyPlaceholder placeholder={'Name boolean'} value={booleanName}
                                                onChange={e => setBooleanName(e.target.value)}/>
                            </div>
                            <div className='booleanButton'>
                                <NeonBorderButton onClick={() => addRandomBoolean(booleanName)}
                                                  text={'Add true or false value'}/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3>Add random property</h3>
                        <div className='addString'>

                            <div className='inputValueName'>
                                <h4>Property name:</h4>
                                <FlyPlaceholder placeholder={'Give Name to property'} value={stringName} onChange={e => setStringName(e.target.value)} />
                            </div>
                            <div className='randomisedProperties'>
                                <h4>Add properties that will be randomized</h4>
                                <div className='randomisingInputs'>
                                    <div className='randomisingInput'>
                                        <FlyPlaceholder placeholder={'add string value to array'}
                                                       value={stringArrValue}
                                                       onChange={e => setStringArrValue(e.target.value)}/>
                                    </div>
                                    <div className='randomisingButton'>
                                        <NeonBorderButton onClick={() => addUniquePropertyToArray(stringArrValue)}
                                                         text={'Add random property to list'}/>
                                    </div>
                                </div>
                            </div>
                            <div className='propertiesBucket'>
                                {(stingArr as Array<string>)
                                    .map((el: string)=> <span key={el} onClick={()=> setStringArr((prev: string[]) => prev
                                        .filter((elem:string)=> elem !== el)) }>{el}</span>)}
                            </div>


                            <div className='propertiesButton'>
                                <NeonBorderButton onClick={() => addRandomString(stingArr, stringName)} text={'Add random property'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='result'>
                <h2>Result</h2>
                <div className='result__buttons'>
                    <div>
                        <NeonBorderButton onClick={() => setShowOne(true)} text={'Only one element'}/>
                    </div>
                    <div>
                        <NeonBorderButton onClick={() => setShowOne(false)} text={'Whole array'}/>
                    </div>
                </div>
                
                <p>{showOne? JSON.stringify(arr[0]): JSON.stringify(arr)}</p>
            </div>
        </div>



    );
};

export default Constructor;