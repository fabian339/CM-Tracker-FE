import React from 'react'
// import Tooltip from '@material-ui/core/Tooltip';
// import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

// export default ({ children, onClick, tip, btnClassName, tipClassName }) => (
//     <Tooltip title={tip} className={tipClassName} placement="top">
//         <IconButton onClick={onClick} className={btnClassName}>
//             {children}
//         </IconButton>
//     </Tooltip>
// );

export default ({options, name, value, onInputChange, label, style, helperText, error }) => (
    <Autocomplete
        options={options}
        value={value}
        onInputChange={onInputChange}
        name={name}
        renderInput={params => (
        <TextField
            {...params}
            required
            label={label}
            margin="normal"
            variant="outlined"
            style={style}
            helperText={helperText}
            error={error}
            InputProps={{ ...params.InputProps, type: 'search' }}
            />
        )}
    />
);
