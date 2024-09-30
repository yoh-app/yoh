import React from 'react';
import { FormControl, InputLabel, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    padding: 0,
    width: '100%',
    border: 'none',
    margin: 0,
    marginTop: 7,
    position: 'relative',
    background: "transparent",
    borderRadius: '10px',
  },
  select: {
    background: 'rgba(255, 255, 255, 0.14)',
    borderRadius: '10px',
    fontSize: '16px',
    padding: '12px',
    margin: 0,
    color: 'white',
    "&:focus": {
      borderRadius: '10px',
    }
  },
});

export const ToolbarDropdown = ({ title, value, onChange, children, disabled, ...props }: any) => {
  const classes = useStyles({});
  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel>{title}</InputLabel>
      <Select native value={value} onChange={(e) => onChange(e.target.value)} {...props}
        inputProps={{
          disabled,
          classes
        }}
        sx={{
          fieldset: {
            border: 'none'
          },
          "&:hover": {
            background: 'rgba(255, 255, 255, 0.13)' 
          }
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
};
