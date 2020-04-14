import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function AppBarMultiSelect(props) {
  const { label, value, onValueChange, options } = props;
  const classes = useStyles();

  const handleChange = (e) => {
    onValueChange(e.target.value);
  }

  const id = `${label}-multi-checkbox-label`
  const labelId = `${id}-label`

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={labelId}>{label}</InputLabel>

      <Select
        labelId={labelId}
        id={id}
        multiple
        value={value}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected) => selected.join(', ')}
        //MenuProps={MenuProps}
    >
      {options.map((o) => (
        <MenuItem key={o} value={o}>
          <Checkbox checked={value.includes(o)} />
          <ListItemText primary={o} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  );
};
