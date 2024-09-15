import React from 'react';
import { MaterialReactTable } from 'material-react-table';

type TableComponentProps = {
  data: any[];
  rowsToShow: number;
};

const TableComponent: React.FC<TableComponentProps> = ({ data, rowsToShow }) => {
  const strikeThreshold = 214.29;

  // Function to filter data based on the slider value
  const filteredData = () => {
    const greaterThan = data.filter(row => row.strike > strikeThreshold);
    const lessThanOrEqual = data.filter(row => row.strike <= strikeThreshold);
    return [
      ...greaterThan.slice(0, Math.floor(rowsToShow / 2)),
      ...lessThanOrEqual.slice(0, Math.ceil(rowsToShow / 2))
    ];
  };

  // Extract column keys from the first row of data
  const columnKeys = Object.keys(data[0] || {});
  
  // Define columns dynamically based on the data
  const columns = columnKeys.map(key => {
    return {
      accessorKey: key,
      header: key,
      Cell: ({ cell }: any) => {
        const value = cell.getValue();
        
        // Example of applying custom formatting
        if (key === '%Return 1σ/%Max Risk') {
          const maxValue = Math.max(...data.map(d => d[key]));
          const percentage = (value / maxValue) * 100;
          let backgroundColor = '';
          
          if (percentage <= 10) backgroundColor = 'red';
          else if (percentage <= 50) backgroundColor = 'yellow';
          else backgroundColor = 'green';
          
          return <div style={{ backgroundColor, width: `${percentage}%` }}>{value}</div>;
        }
        
        if (key === 'percent_in_out_money') {
          let backgroundColor = '';
          if (value >= 0) backgroundColor = '#ffdbbb';
          else backgroundColor = '#ffffc5';
          
          return <div style={{ backgroundColor }}>{value}</div>;
        }

        return <div>{value}</div>;
      }
    };
  });

  return <MaterialReactTable columns={columns} data={filteredData()} />;
};

export default TableComponent;

