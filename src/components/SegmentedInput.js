import { useState, useEffect, useRef, createRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import './SegmentedInput.css'

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    segmentedInput: {
        marginLeft: 5,
        marginRight: 5,
    }
}));

const SegmentedInput = ({ value, onChange, maxLength }) => {
    const classes = useStyles();

    // Create an array of length maxLength, and fill it with the current code input
    const initialSegmentedInput = new Array(maxLength).fill(null);
    const initialSegmentedInputValues = value.split('').slice(0, maxLength);
    Array.prototype.splice.apply(
        initialSegmentedInput,
        [0, initialSegmentedInputValues.length].concat(initialSegmentedInputValues),
    );

    const [segmentedValue, setSegmentedValue] = useState(initialSegmentedInput);
    const inputRefs = useRef(segmentedValue.map(() => createRef()));

    useEffect(() => {
        // Create an array of length maxLength, and fill it with the current code input
        const newSegmentedInput = new Array(maxLength).fill(null);
        const newSegmentedInputValues = value.split('').slice(0, maxLength);

        Array.prototype.splice.apply(
            newSegmentedInput,
            [0, newSegmentedInputValues.length].concat(newSegmentedInputValues),
        );

        const currentActiveIndex = value.length < maxLength ? value.length : maxLength - 1;
        inputRefs.current[currentActiveIndex].current.focus();

        setSegmentedValue(newSegmentedInput);
    }, [value, maxLength, setSegmentedValue]);

    const getNewValue = (newDigit, index) => {
        const newSegmentedValue = segmentedValue;
        newSegmentedValue[index] = newDigit;

        return newSegmentedValue.join('');
    };

    const handlePaste = event => {
        // Stop data actually being pasted
        event.stopPropagation();
        event.preventDefault();

        // Get pasted data via clipboard API
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData('Text');
        const sanitizedData = pastedData.replace(/\D/g,'');

        onChange((value + sanitizedData).slice(0, maxLength));
    }

    const handleChange = (event, index) => {
        if (event.target.value && event.target.value.length > 1) return;

        onChange(getNewValue(event.target.value, index));
    }

    return (
        <div className={classes.container}>
            {segmentedValue.map((digit, index) => {
                const isCurrentDigit = value.length < maxLength ? value.length === index : maxLength - 1 === index;
                return (
                    <TextField
                        id={`segmented-input-${index}`}
                        inputRef={inputRefs.current[index]}
                        classes={classes.segmentedInput}
                        key={`segmented-input-${index}`}
                        variant="outlined"
                        margin="normal"
                        required
                        name={`segmented-input-${index}`}
                        type="number"
                        autoFocus={isCurrentDigit}
                        error = {!digit || !parseInt(digit)}
                        value={digit || ''}
                        inputProps={{
                            maxLength: 1,
                            onPaste: e => handlePaste(e),
                        }}
                        onChange={event => handleChange(event, index)}
                    />
                );
            })}
        </div>
    );
}

export default SegmentedInput;
