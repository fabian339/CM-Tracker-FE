export default {
    palette: {
      primary: {
        light: '#ffc107',
        main: '#ff4400',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#ff9100',
        dark: '#ba000d',
        contrastText: '#000',
      }
    },
    spreadIt: {
      Typography: {
        useNextVariants: true
      },
      form: {
          textAlign : 'center'
      },
      image: {
          margin: '10px auto 10px auto',
          width: 300,
      },
      pageTitle: {
          margin: '-30px auto 10px auto'
      },
      textField: {
          margin: '10px auto 10px auto'
          // backgroundColor: 'black',
          // color: 'red'
      },
      button: {
          marginTop: 20,
          width: 200,
          position: 'relative'
      },
      customError: {
          color: 'red',
          fontSize: '1rem',
          marginTop: 10
      },
      progress: {
          position: 'absolute'
      },
      invisibleSeparator: {
        border: 'none',
        margin: 4,
      },
      visibleSeparator:  {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
      paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
    }
  }