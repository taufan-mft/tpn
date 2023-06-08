import * as React from "react";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CustomCheckboxProps extends CheckboxProps {
  indeterminate: boolean;
}

const CustomCheckbox = React.forwardRef<HTMLButtonElement, CustomCheckboxProps>(
  ({ indeterminate, ...props }, ref) => {
    const icon = indeterminate ? <RemoveIcon /> : <AddIcon />;
    return (
      <Checkbox
        ref={ref}
        disableRipple
        color="primary"
        indeterminate={indeterminate}
        icon={icon}
        checkedIcon={icon}
        {...props}
      />
    );
  }
);

export default CustomCheckbox;
