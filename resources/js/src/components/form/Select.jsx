import {
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText,
    Select as MuiSelect,
} from "@mui/material";
import React from "react";

const Select = ({
    disabled,
    value,
    label,
    name,
    options,
    onChange,
    error,
    helperText,
}) => {
    return (
        <FormControl disabled={disabled || false} sx={{ m: 1 }} fullWidth>
            <InputLabel id={name}>{label}</InputLabel>
            <MuiSelect
                labelId={name}
                id={name}
                name={name}
                value={value || ""}
                onChange={onChange}
                label={name}
                error={error}
            >
                <MenuItem value="">
                    <em>Select {label}</em>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </MuiSelect>
            <FormHelperText error={Boolean(error)}>{helperText}</FormHelperText>
        </FormControl>
    );
};

export default Select;
