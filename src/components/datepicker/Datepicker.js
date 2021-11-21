import React,{useRef,useState,useEffect} from 'react'


const Datepicker = ({handleNewData}) => {
    const [startingDate,setStartingDate] = useState('')
    const [endingDate,setEndingDate] = useState('')
    const [graphData,setGraphData] = useState([])
    let startDate, endDate = useRef()
   
    useEffect(()=>{
        setGraphData(graphData)
    },[graphData])
    const getMinDate =()=>{
        let todaysDate = new Date()
        todaysDate.setDate(todaysDate.getDate() - 2)
        return todaysDate.toISOString().slice(0,10)
        
    }
    const getMaxDate =()=>{
        let todaysDate = new Date()
        todaysDate.setDate(todaysDate.getDate() + 2)
        
        return todaysDate.toISOString().slice(0,10)
    }
    const handlesdChange =(e)=>{
        setStartingDate(new Date(e.target.value))
    }

    const handleedChange =(e)=>{
        setEndingDate(new Date(e.target.value))
    }

    const handleFormSubmit =(e)=>{
        e.preventDefault()
        let dateArr = [];
        
        let noOfDaysSelected = countDays(startingDate,endingDate)
        let selectedDates = populateDates(dateArr,noOfDaysSelected,startingDate)
        setGraphData(createRandomData(selectedDates,generateRandomValues(selectedDates.length)))
        handleNewData(graphData)
        
    }
    // eslint-disable-next-line no-extend-native
    Date.prototype.addDays = function addDays(days){
    let sd = new Date(startingDate)
    sd.setDate(sd.getDate() + days)
    return sd.toLocaleDateString()
    }
    function countDays(start,end){
        let diffTime = Math.abs(end - start);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
    function populateDates(arr,arrSize,start){
        let firstDate = start.toLocaleDateString()
        arr.push(firstDate)
        for(let i=1;i<=arrSize;i++){
            if(arr[i]){
                arr.push(start)
            }
            arr.push(start.addDays(i))

        }
    return arr
    }
    // creates random values for resp dates
    function generateRandomValues(length){
        let randomValues = []
        for(let i=0;i<length;i++){
            randomValues.push(Math.floor(Math.random() * 100) + 10)
        }
        return randomValues
    }
    // lookup for todays date in dates array
    function findToday(arr,today){
        if(arr.includes(today)){
            return arr.indexOf(today)
        }

        return false
    }
    // creates graph data
    function createRandomData(dates,values){
    let data = []
    
    let today = new Date().toLocaleDateString()
    let includesToday = findToday(dates,today)
    if(includesToday === false){
        
            for(let i=0;i<dates.length;i++){
                if(dates[i] === today){
                    data.push({date:'today',posValue: values[i]})
                    i++
                }
                data.push({date:dates[i],posValue: values[i]})
                
            }
            
    } else{
            for(let p=0;p<1;p++){
                let posValue = `prod${p}_posValue`
                let negValue = `prod${p}_negValue`
                let diff = `prod${p}_diff`
                for(let i=0;i<dates.length;i++){
                    
                    if(i < includesToday){
                        let obj = {
                        date: dates[i]
                        }
                        obj[posValue] = values[i]
                        data.push(obj)
                    }
                    
                    if(dates[i] === today){
                        let obj = {
                        date: 'today'
                        }
                        obj[posValue] = values[i]
                        obj[negValue] = values[i]
                        obj[diff] = values[i]
                        data.push(obj)
                        i++
                        
                    }
                    if(i > includesToday){
                        let obj = {
                        date: dates[i]
                        
                        }
                        // console.log(i);
                        obj[posValue] = data[i-1][`prod${p}_posValue`] + 5
                        obj[negValue] = (data[i-1][`prod${p}_negValue`] - 5 < 0 ? 0 : data[i-1][`prod${p}_negValue`] - 5 )
                        obj[diff] = data[i-1][`prod${p}_posValue`] + 5 
                        data.push(obj)
       
                    }
        
                }   
            }
            for(let x=0;x<1;x++){
                let posValue = `prod${x+1}_posValue`
                let negValue = `prod${x+1}_negValue`
                let diff = `prod${x+1}_diff`
                let randomValues = generateRandomValues(dates.length)
                for(let j=0;j<dates.length;j++){
                    
                    if(j < includesToday){
                        let res  = data.map(x => x).filter(data => data.date === dates[j])
                        res[0][posValue] = randomValues[j]
                    }
                    
                    if(dates[j] === today){
                        let res  = data.map(x => x).filter(data => data.date === 'today')
                        res[0][posValue] = randomValues[j]
                        res[0][negValue] = randomValues[j]
                        res[0][diff] = randomValues[j]
                        
                    }
                    if(j > includesToday){
                        let res  = data.map(x => x).filter(data => data.date === dates[j])
                        
                        res[0][posValue] = data[j-1][`prod${x+1}_posValue`] + 5
                        res[0][negValue] = (data[j-1][`prod${x+1}_negValue`] - 5 < 0 ? 0 : data[j-1][`prod${x+1}_negValue`] - 5 )
                        res[0][diff] = data[j-1][`prod${x+1}_posValue`] + 5 
       
                    }
        
                }   
            }
               
    }
    
    return data
    }

    return (
        <div className="data-picker">
             <h3>Date Range</h3>
             <form id="date-form">
                <div className="form-group">
                <label htmlFor="start-date">Start Date A</label>
                <input type="date" ref={startDate} name="startDate" onChange={handlesdChange}id="start-date" max={getMinDate()}/>
                </div>
                <div className="form-group">
                <label htmlFor="end-date">End Date B</label>
                <input type="date" ref={endDate} name="endDate" onChange={handleedChange} id="end-date" min={getMaxDate()}/>
                </div>
                {(startingDate === '' || endingDate === '' ) ?
                <input type="submit" value="Submit" onClick={handleFormSubmit} disabled style={{cursor:'not-allowed' ,opacity: '0.5'}}/>
                :
                <input type="submit" value="Submit" onClick={handleFormSubmit} />
                }
                
            </form>
            <div className="randomize-btn-container">
            {(graphData.length === 0) ?
            <input type="button" className="randomize-btn" value="randomize" disabled style={{cursor:'not-allowed'}}/>
            :
            <input type="button" className="randomize-btn" onClick={handleFormSubmit} value="randomize" />
            }
                
            </div>
        </div>
    )
    
}


export default Datepicker
