import React,{useState} from 'react'
import Datepicker from '../datepicker/Datepicker'
import Graph from '../graphs/Graph'
import SwitchandRandomize from '../switchandrandomize/SwitchandRandomize'
import Table from '../tables/Table'

const Main = () => {
    const [data,setData] = useState(null)
    const [displayin,setDisplayIn]=useState('graph')
    const [currentproduct,setCurrentProduct] = useState('product1&2')

    const handleNewData =(data)=>{
        setData(data)
    }
    const handleDisplay =(status)=>{
        
        setDisplayIn(status)
    }
    const handleProductSelector =(product)=>{
        setCurrentProduct(product)
    }
    return (
        <div className='mains'>
            <div className="dynamic-showcase">
            
                <div className="graph-and-table">
                    {(displayin === 'graph') ?
                    <Graph data={data} currentproduct={currentproduct}/>
                    :
                    <Table data={data}/>
                    }
                </div>

                <div className="switch-and-select">
                    <SwitchandRandomize 
                    displayin={displayin}
                    currentproduct={currentproduct} 
                    handleDisplay={handleDisplay}
                    handleProductSelector={handleProductSelector}
                    />
                </div>
            </div>
            <div className="date-selectors">
                <Datepicker handleNewData={handleNewData}/>
            </div>  
        </div>
    )
}

export default Main
