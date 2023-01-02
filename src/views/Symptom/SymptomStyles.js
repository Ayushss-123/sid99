export const SymptomStyles = (theme) => ({
    userTextField: {
        margin: '10px 0 10px 0',
    },
    paperStyle: {
        marginBottom: '10px',
        padding: '10px'
    },
    root: {
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: 'green'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green'
        },
        '& .MuiInputLabel-root': {
            color: 'green'
        }
    },
});