import React, { useState } from 'react'

const RowData = ({row, calculateByPercentage, calculateByValue}) => {

    const [inputVal, setInputVal] = useState(0)

    const onChangeInput = (id, value)=>{
        setInputVal(value)
    }

  return (
      <>
          <tr key={row.id} className='table-row'>
              <td className="table-data">{row.label}</td>
              <td className="table-data">{row.value}</td>
              <td>
                  <input type="number" className="table-data" min={0} value={inputVal} onChange={(e)=> onChangeInput(row.id, e.target.value)}/>
              </td>
              <td>
                  <button className="table-data" onClick={()=> calculateByPercentage(row.id, inputVal)}>Calculate %</button>
              </td>
              <td>
                  <button className="table-data" onClick={()=>calculateByValue(row.id, inputVal)}>Calculate Value</button>
              </td>
              <td className="table-data">{row.variance || 0}%</td>
          </tr>
      </>
  )
}

export default RowData