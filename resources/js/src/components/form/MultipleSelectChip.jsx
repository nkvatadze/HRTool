import React from "react";
import {
    Box,
    OutlinedInput,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Chip,
    FormHelperText,
} from "@mui/material";

export default function MultipleSelectChip({
    disabled,
    value,
    label,
    name,
    options,
    onChange,
    error,
    helperText,
}) {
    return (
        <FormControl
            sx={{ m: 1 }}
            fullWidth
            disabled={disabled || false}
            style={{ margin: 0 }}
        >
            <InputLabel id={name}>{label}</InputLabel>
            <Select
                labelId={name}
                id={name}
                name={name}
                multiple
                value={value || []}
                onChange={onChange}
                error={error}
                input={<OutlinedInput id={`select-${name}`} label={label} />}
                renderValue={(selected) => {
                    return (
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                            }}
                        >
                            {selected.map((id) => (
                                <Chip
                                    key={id}
                                    color="secondary"
                                    label={
                                        options.find(
                                            (option) => option.id === id
                                        ).name
                                    }
                                />
                            ))}
                        </Box>
                    );
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText error={Boolean(error)}>{helperText}</FormHelperText>
        </FormControl>
    );
}
