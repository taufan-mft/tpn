import * as React from "react";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import CustomCheckbox from "./CustomCheckbox";

const rows = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 35
  },
  {
    id: 3,
    firstName: "Jo",
    lastName: "Doe",
    age: 35
  },
  {
    id: 4,
    firstName: "Jon",
    lastName: "Doe",
    age: 35
  },
  {
    id: 5,
    firstName: "ohn",
    lastName: "Doe",
    age: 35
  },
  {
    id: 6,
    firstName: "Joh",
    lastName: "Doe",
    age: 35
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    age: 27
  }
];

const columns = [
  { field: "firstName", headerName: "First Name", flex: 1 },
  { field: "lastName", headerName: "Last Name", flex: 1 },
  { field: "age", headerName: "Age", flex: 1 }
];

export default function App() {
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection.rows);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGridPro
        rows={rows}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={handleSelectionChange}
        selectionModel={selectedRows}
        components={{
          Toolbar: GridToolbar,
          BaseCheckbox: React.forwardRef((props, ref) => (
            <CustomCheckbox {...props} ref={ref} />
          ))
        }}
      />
    </div>
  );
}
