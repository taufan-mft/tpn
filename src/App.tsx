import { useState } from "react";
import { Box } from "@mui/material";
import {
  DataGridPro,
  useGridApiRef,
  GridRowTreeNodeConfig
} from "@mui/x-data-grid-pro";
import { difference } from "lodash-es";
import { gridData } from "./data";
import { checkboxColumn } from "./checkboxColumn";

const App = () => {
  const apiRef = useGridApiRef();
  const disableSelectionList = [496, 5, 10];
  const selectedRows = [5003];

  const [selectionModel, setSelectionModel] = useState(selectedRows);

  const columns = [
    { ...checkboxColumn },
    { field: "title", headerName: "Title", width: 200 },
    {
      field: "updateDate",
      headerName: "Updated Date",
      type: "date",
      width: 150
    }
  ];

  // set custom header name
  const groupingColDef = {
    headerName: "Group Name"
  };

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSelectionModelChange = (newSelectionModel, param) => {
    if (newSelectionModel.length === 0) {
      setSelectionModel(newSelectionModel);
    } else if (newSelectionModel.length > selectionModel.length) {
      // when a checkbox is checked

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const newSelectedItem = difference(newSelectionModel, selectionModel);
      const selectedItemChildren = apiRef.current.getRowGroupChildren({
        groupId: newSelectedItem[0]
      });

      setSelectionModel([...newSelectionModel, ...selectedItemChildren]);
    } else if (selectionModel.length > newSelectionModel.length) {
      // when a checkbox is unchecked

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const unselectedItem = difference(selectionModel, newSelectionModel);
      const allUnselectedItems = [
        ...apiRef.current.getRowGroupChildren({
          groupId: unselectedItem[0]
        }),
        ...unselectedItem
      ];

      // const unselectionModel = remove(
      //   selectionModel,
      //   item => item !== unselectedItem[0]
      // );
      const unselectionModel = selectionModel.filter(
        (id) => id !== unselectedItem[0]
      );

      const newModel = unselectionModel.filter(
        (id) => !allUnselectedItems.includes(id)
      );
      setSelectionModel(newModel);
    }
  };

  const getTreeDataPath = (row) => row.hierarchy;

  const isRowSelectable = (params) =>
    !disableSelectionList.includes(params.row.id as number);

  const isGroupExpandedByDefault = (node: GridRowTreeNodeConfig) => {
    // eslint-disable-next-line no-console
    console.log(node);

    return node.groupingKey === "top-level-two";
  };

  return (
    <Box sx={{ height: 800, pt: 1 }}>
      <DataGridPro
        treeData
        rows={gridData}
        columns={columns}
        getTreeDataPath={getTreeDataPath}
        groupingColDef={groupingColDef}
        defaultGroupingExpansionDepth={0}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={onSelectionModelChange}
        isRowSelectable={isRowSelectable}
        selectionModel={selectionModel}
        isGroupExpandedByDefault={isGroupExpandedByDefault}
        apiRef={apiRef}
      />
    </Box>
  );
};
export default App;
