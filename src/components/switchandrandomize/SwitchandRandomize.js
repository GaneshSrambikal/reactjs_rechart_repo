import React from 'react'

const SwitchandRandomize = (props) => {
    let {displayin,
        currentproduct,
        handleDisplay,
        handleProductSelector} = props
    
    const handleSelector =(e)=>{
        handleProductSelector(e.target.value)
    }
    return (
        <div className="sw-rd-container">
            <div className="switch-btn-container">
                {/*btn to show graph  */}
                <label htmlFor="switchdata">show data in:</label>
                {(displayin === 'graph') ? 
                <input type="button" className="show-graph-btn" value="graph" disabled style={{cursor:'not-allowed'}}/>
                :
                <input type="button" className="show-graph-btn" onClick={ () =>handleDisplay('graph')} value="graph" style={{backgroundColor:'#333',color:'#fff'}}/>
                }
                {/* btn to show table */}
                
                {(displayin === 'table') ?
                <input type="button" className="show-table-btn" value="table" disabled style={{cursor:'not-allowed'}}/>
                :
                <input type="button" className="show-table-btn" onClick={() => handleDisplay('table')} value="table" style={{backgroundColor:'#333',color:'#fff'}}/>
                }
                
            </div>
            <div className="select-product-container">
            <label htmlFor="product">product: </label>
                <select name="select-product" id="select-product" onChange={handleSelector} vlaue={currentproduct}>
                    <option value="product1&2">Product 1 & 2</option>
                    <option value="product1" style={{color:'#8884d8'}}>Product 1</option>
                    <option value="product2" style={{color:'#3fc438'}}>Product 2</option>
                </select>
            </div>
            
        </div>
    )
}

export default SwitchandRandomize
