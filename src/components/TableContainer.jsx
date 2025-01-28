import React, { useState } from 'react';
import TableConfig from '../config/tableConfig';
import RowData from './RowData';


const ColumnConfig = ["Label", "Value", "Input", "Allocation %", "Allocation Value", "Variance %"];

const TableContainer = () => {

    const [TableData, setTableData] = useState(TableConfig.rows);

    
    
    const calculateByPercentage = (id, percentage)=>{
        percentage = parseInt(percentage)
        const updatedRows = TableData.map((row) => {
            let requiredParentIdToChange;
            row.children.map((childRow)=>{
                if(childRow.id == id){
                    requiredParentIdToChange = row.id
                    const newValue = childRow.value + (childRow.value * percentage) / 100;
                    childRow["variance"] = calculateVariance(newValue, childRow.value)
                    childRow.value = newValue
                }
                return childRow;
            })
            
           if(requiredParentIdToChange == row.value){
                let Total = calculateTotals(row);
                row["variance"] = calculateVariance(Total, row.value)
                row.value = Total
           }
            
            return row
           
        });

        setTableData(updatedRows);
      
    }

    const calculateTotals = (row) => {
          const updatedValue = row.children.reduce(
            (sum, child) => sum + child.value,
            0
          );
          return updatedValue;
    };

    const calculateByValue = (id, val)=>{
        val = parseInt(val)
        const updatedRows = TableData.map((row) => {
            let requiredParentId ;
            row.children.map((childRow)=>{
                if(childRow.id == id){
                    requiredParentId = row.id
                    childRow["variance"] = calculateVariance(val, childRow.value)
                    childRow.value = val
                }
                return childRow;
            })

            if(requiredParentId == row.id){
                let Total = calculateTotals(row);
                row["variance"] = calculateVariance(Total, row.value)
                row.value = Total;

                requiredParentId = ""
            }
            
            
            return row
           
        });

        setTableData(updatedRows);
    }

    const calculateVariance = (newValue, oldaValue)=> {
        let calc= newValue-oldaValue
        return parseInt(calc / oldaValue*100)
    }

return (
    
    <table id="table-container">
        <thead>

            <tr className='table-header-row'>
                    {
                        ColumnConfig.map((column, i)=>(
                            <th key={i} className="border border-black p-2">{column}</th>
                        ))
                    }
            </tr>
        </thead>
        <tbody>
            {
                TableData.map((row, i)=>{
                    return (
                       <React.Fragment key={`parent-${row.id || row.label}-${i}`}>
                            <RowData key={`parent-${row.label}-${i}`} row={row} calculateByPercentage={calculateByPercentage}  calculateByValue={calculateByValue}/>
                            {
                                row.children.map((child , j)=>(
                                    <RowData key={`child-${child.label}-${i}-${j}`}  row={child} calculateByPercentage={calculateByPercentage}  calculateByValue={calculateByValue}/>
                                ))
                            }
                       </React.Fragment>
                    )
                })
            }
        </tbody>
    </table>
)
}

export default TableContainer