export const UserProfileStyles = (theme) => ({
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
      },
      userTextField: {
        margin: '10px 0 10px 0',
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
})