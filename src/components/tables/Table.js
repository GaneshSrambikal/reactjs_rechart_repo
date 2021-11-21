import React,{useState,useEffect} from 'react'

const Table = ({data}) => {
    const[product1,setProduct1] = useState(null)
    const[product2,setProduct2] = useState(null)

    useEffect(()=>{
        if(data !== null){
            setProduct1(getProduct1Details(data))
            setProduct2(getProduct2Details(data))
        }
    },[data])
    function getProduct1Details(graphData){
        let productA =[]
        for(let i=0;i<graphData.length;i++){
            let obj ={}
            obj['date'] = graphData[i].date
            obj['prod0_posValue'] = graphData[i].prod0_posValue
            if(graphData[i].prod0_negValue === undefined){
                obj['prod0_negValue'] = 'N/A'
            }else{
                obj['prod0_negValue'] = graphData[i].prod0_negValue
            }
            if(graphData[i].prod0_diff === undefined){
                obj['prod0_diff'] = 'N/A'
            }else{
                obj['prod0_diff'] = graphData[i].prod0_diff
            }
            productA.push(obj)
        }
        return productA
    }
    
    function getProduct2Details(graphData){
        let productB =[]
        for(let i=0;i<graphData.length;i++){
            let obj ={}
            obj['date'] = graphData[i].date
            obj['prod1_posValue'] = graphData[i].prod1_posValue
            if(graphData[i].prod1_negValue === undefined){
                obj['prod1_negValue'] = 'N/A'
            }else{
                obj['prod1_negValue'] = graphData[i].prod1_negValue
            }
            if(graphData[i].prod1_diff === undefined){
                obj['prod1_diff'] = 'N/A'
            }else{
                obj['prod1_diff'] = graphData[i].prod1_diff
            }
            productB.push(obj)
        }
        return productB
    }
    return (
        <div className="table-container">
        <table id="data-table">
            <thead>
            <tr><th>Date</th><th>Product</th><th>Up Value</th><th>Down Value</th></tr>
            </thead>
            {(data === null) ?
            <tbody>
                <tr>
                    <td colSpan='4'>No data To show</td>            
                </tr>
            </tbody>
            :
            <tbody>
                
                {product1 && product1.map((x,index) => {
                    return <tr key={index}>
                                <td>{x.date}</td>
                                <td>Product 1</td>
                                <td>{x.prod0_posValue}</td>
                                <td>{x.prod0_negValue}</td>
                            </tr>
                })}
                {product2 && product2.map((x,index) => {
                    return <tr key={index}>
                                <td>{x.date}</td>
                                <td>Product 2</td>
                                <td>{x.prod1_posValue}</td>
                                <td>{x.prod1_negValue}</td>
                            </tr>
                })}
                </tbody> 
            }
                
            </table>
        </div>
            
       
    )
}

export default Table
