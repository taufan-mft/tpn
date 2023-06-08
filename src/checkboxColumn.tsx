import {
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridCellCheckboxRenderer,
  GridColDef,
  selectedIdsLookupSelector
} from "@mui/x-data-grid-pro";

export const checkboxColumn = {
  ...GRID_CHECKBOX_SELECTION_COL_DEF,
  renderCell: (params) => {
    const rowNode = params.rowNode;
    const selectionLookup = selectedIdsLookupSelector(
      params.api.state,
      params.api.instanceId
    );
    const indeterminate =
      rowNode.children != null &&
      rowNode.parent == null &&
      rowNode.children.some((child) => selectionLookup[child] === undefined) &&
      rowNode.children.some((child) => selectionLookup[child] !== undefined);
    return (
      <GridCellCheckboxRenderer
        {...params}
        // @ts-ignore
        indeterminate={indeterminate}
        size={rowNode.parent == null ? undefined : "medium"}
      />
    );
  }
};
