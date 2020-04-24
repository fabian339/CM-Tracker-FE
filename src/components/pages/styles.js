const buttonStyles = {
    width: "200px",
    bottom: "45px",
    marginLeft: "50px",
    color: "white",
    borderRadius: "20px"
    }

export default {
    pageTitle: {
        marginTop: "90px",
        marginBottom: "40px",
        textAlign: "center"
    },
    container: {
        marginTop: "-10px",
    },
    adminBtn: {
        ...buttonStyles,
        backgroundColor: "darkblue",
    },
    progress: {
        position: 'absolute',
        color: "chartreuse",
        width: "40px",
        height: "40px"
    },
    userBtn: {
        ...buttonStyles,
        backgroundColor: "darkmagenta",
    },
    clientBtn: {
        ...buttonStyles,
        backgroundColor: "darkgoldenrod",
    },
    onBtnHover: {
        ...buttonStyles,
        backgroundImage: "linear-gradient(to bottom right, red, yellow)",
        color: "black"
    },
    btnDetails: {
        width: "200px",
        marginLeft: "50px",
        marginTop: "-30px"
    },
    logoContainer: {
        marginTop: '80px',
        textAlign: "center"
    }
}