import {ComposedChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip,ReferenceLine } from 'recharts';
import React,{useState,useEffect} from 'react'

const Graph = ({data,currentproduct}) => {
    const [graphdata,setGraphData] = useState(data)
    useEffect(() => {
        setGraphData(data)
        return () => {
            setGraphData([])
        }
    }, [data])
    return (
        <div>
            {(currentproduct === 'product1&2') ?
            <ComposedChart  data={graphdata} width={600} height={500} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Legend />
            <Line type="monotone" dataKey="prod0_posValue" stroke="#8884d8" strokeWidth={2}/>
            <Line type="monotone" dataKey="prod0_negValue" stroke="#e228e8" strokeWidth={2} />
            <Line type="monotone" dataKey="prod1_posValue" stroke="#3fc438" strokeWidth={2}/>
            <Line type="monotone" dataKey="prod1_negValue" stroke="#e8285b" strokeWidth={2}/>
            <ReferenceLine x="today" stroke="orange" label="Today" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            </ComposedChart>
            : 
            (currentproduct === 'product1') ?
            <ComposedChart  data={data} width={600} height={500} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Legend />
            <Line type="monotone" dataKey="prod0_posValue" stroke="#8884d8" strokeWidth={2}/>
            <Line type="monotone" dataKey="prod0_negValue" stroke="#e228e8" strokeWidth={2} />
            <ReferenceLine x="today" stroke="orange" label="Today" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            </ComposedChart>
            :
            <ComposedChart  data={data} width={600} height={500} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Legend />
            <Line type="monotone" dataKey="prod1_posValue" stroke="#3fc438" strokeWidth={2}/>
            <Line type="monotone" dataKey="prod1_negValue" stroke="#e8285b" strokeWidth={2}/>
            <ReferenceLine x="today" stroke="orange" label="Today" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            </ComposedChart>
            }
        </div>
    )
}

export default Graph
