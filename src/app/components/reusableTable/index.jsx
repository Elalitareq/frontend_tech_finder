import { Switch } from '@mui/material';
import React from 'react';

const ReusableTable = ({ columns, data, handleSwitchChange,isLoading }) => {
  return (
    <table className="w-full border-collapse bg-gray-500 h-full">
      <thead>
        <tr className="bg-gray-200">
          {columns.map((column, index) => (
            <th
              key={index}
              className="py-2 px-4 border-b text-left font-medium"
            >
              {column.heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='h-full'>
        {isLoading?<>Loading...</>:data.map((row, rowIndex) => (
          <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-100' : ''}>
            {columns.map((column, columnIndex) => (
              <td
                key={columnIndex}
                className="py-2 px-4 border-b"
              >
                {column.type === 'boolean' ? (
                  <Switch
                    checked={row[column.accessor]}
                    onChange={e =>
                      handleSwitchChange(row._id, e.target.value)

                    }
                  />
                ) : (
                  row[column.accessor]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReusableTable;
