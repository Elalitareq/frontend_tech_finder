import { Switch } from "@mui/material";
import { useEffect, useState } from "react";

const ReusableTable = ({ columns, data, handleSwitchChange, isLoading }) => {
  useEffect(() => {}, [data]);
  return (
    <table className="w-full border-collapse bg-gray-500  table-auto overflow-scroll">
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
      <tbody className="max-h-[500px]">
        {isLoading ? (
          <tr>
            <td>Loading...</td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex % 2 === 0 ? "bg-gray-500 text-text" : "  bg-gray-300"
              }
            >
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} className="py-2 px-4 border-b">
                  {column.type === "boolean" ? (
                    <CustomSwitch
                      id={row._id}
                      checked={row[column.accessor]}
                      handleSwitchChange={handleSwitchChange}
                    />
                  ) : (
                    row[column.accessor]
                  )}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ReusableTable;

const CustomSwitch = ({ checked, handleSwitchChange, id }) => {
  const [sure, setSure] = useState(checked);

  useEffect(() => {
    setSure(checked);
  }, [checked]);

  useEffect(() => {
    setSure(checked); // Update the switch state when the checked prop changes
  }, [checked]);

  const handleChange = (e, value) => {
    setSure(value);
    handleSwitchChange(id, value);
  };

  return <Switch checked={sure} onChange={handleChange} />;
};
