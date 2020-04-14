import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function AppBarSelect(props) {
  const { label, value, onValueChange, options } = props;
  const classes = useStyles();

  const handleChange = (e) => {
    onValueChange(e.target.value);
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
      >
        {options.map(option => 
          <MenuItem value={option[0]}>{option[1]}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};
