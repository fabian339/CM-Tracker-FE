const buttonStyles = {
    width: "200px",
    bottom: "45px",
    marginLeft: "50px",
    color: "white",
    borderRadius: "20px"
    }

export default {
        pageTitle: {
        marginTop: "-10px",
        textAlign: "center"
    },
    container: {
        marginTop: "-10px",
    },
    personIcon: {
        height: "100%",
        width: "100%",
        color: "lightseagreen",
    },
    adminBtn: {
        ...buttonStyles,
        backgroundColor: "darkblue",
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