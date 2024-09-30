import React, { useEffect } from 'react';
import { useState } from 'react';
import { ChromePicker } from 'react-color';
import { TextField, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    padding: 0,
    width: '100%',
    border: 'none',
    margin: 0,
    marginTop: 7,
    position: 'relative',
    background: 'transparent',
  },
  input: {
    background: 'rgba(255, 255, 255, 0.14)',
    borderRadius: '10px',
    fontSize: '16px',
    padding: '12px',
    margin: 0,
    color: 'white',
  },
});

const useLabelStyles = makeStyles({
  root: {
    color: 'rgb(128,128,128)',
  },
  formControl: {
    fontSize: '18px',
    borderRadius: '100px',
    paddingLeft: '0px',
    paddingTop: '3px',
    marginBottom: '3px',
    position: 'relative',
    left: '-12px',
  }, // a style rule
});

export type ToolbarTextInput = {
  prefix?: string;
  label?: string;
  type: string;
  onChange?: (value: any) => void;
  value?: any;
  minRows?: number;
};
export const ToolbarTextInput = ({
  onChange,
  value,
  prefix,
  label,
  type,
  ...props
}: ToolbarTextInput) => {
  const [internalValue, setInternalValue] = useState(value);
  const [active, setActive] = useState(false);
  const classes = useStyles({});
  const labelClasses = useLabelStyles({});
  useEffect(() => {
    // if (value !== internalValue) {
    let val = value;
    if (type == 'color' || type == 'bg') val = `rgba(${Object.values(value)})`;
    setInternalValue(val);
    // }
  }, [value]);

  return (
    <div
      style={{ width: '100%', position: 'relative' }}
      onClick={() => {
        setActive(true);
      }}
    >
      {/* {(type == 'color' || type == 'bg') && active ? (
        <div
          className="absolute"
          style={{
            zIndex: 99999,
            top: 'calc(100% + 10px)',
            left: '-5%',
          }}
        >
          <div
            className="fixed top-0 left-0 w-full h-full cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActive(false);
            }}
          ></div>
          <ChromePicker
            color={value}
            onChange={(color: any) => {
              onChange(color.rgb);
            }}
          />
        </div>
      ) : null} */}
      {type == 'color' || type == 'bg' ? (
        <ChromePicker
          color={value}
          onChange={(color: any) => {
            onChange(color.rgb);
          }}
        />
      ) : (
        <TextField
          multiline={true}
          minRows={3}
          label={label}
          style={{ margin: 0, width: '100%' }}
          value={internalValue || ''}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              onChange((e.target as any).value);
            }
          }}
          onChange={(e) => {
            setInternalValue(e.target.value);
            onChange(e.target.value);
          }}
          margin="dense"
          variant="filled"
          InputProps={{
            classes,
            disableUnderline: true,
          }}
          InputLabelProps={{
            classes: {
              ...labelClasses,
            },
            shrink: true,
          }}
          {...props}
        />
      )}
    </div>
  );
};
