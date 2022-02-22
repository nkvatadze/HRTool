import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

export default function MultipleSelectChip({
    value,
    label,
    name,
    options,
    onChange,
}) {
    return (
        <FormControl sx={{ m: 1 }} fullWidth>
            <InputLabel id={name}>{label}</InputLabel>
            <Select
                labelId={name}
                id={name}
                name={name}
                multiple
                value={value || []}
                onChange={onChange}
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
        </FormControl>
    );
}
