import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const RadioStyled = withStyles({
    root: {
        color: 'darkorange',
        '&$checked': {
            color: 'darkorange',
        },
    },
})(props => <Radio color="default" {...props} />);

const RadioGroupStyled = withStyles({
    root: {
        flexDirection: 'row',
        margin: '0 !important',
        fontWeight: 'bold'
    }
})(RadioGroup);

export const RadioButton = ({values, setRadioResult}: any) => {
    const [value, setValue] = React.useState(null);

    const handleChange = (event: any) => {
        setValue(event.target.value);
        setRadioResult(event.target.value)
    };

    return (
        <RadioGroupStyled aria-label="gender" name="gender2" value={value} onChange={handleChange}>
            {values.map((item: any) => (
                <FormControlLabel
                    value={item.value}
                    control={<RadioStyled />}
                    label={item.label}
                    labelPlacement="start"
                />
            ))}
        </RadioGroupStyled>
    );
}
