import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';


const styles = {
    container: {
        border: "2px solid",
        // height: "500px",
        margin: "90px 10px"
    }
}

export class Modules extends Component {

    render() {
        return (
            <div  style={styles.container} >
                <div>
                    <Typography variant="h4">RECENT ACTIVITIES</Typography> 
                    <Typography variant="body2">User: </Typography> 
                    <Typography variant="body2">Clients: </Typography> 

                </div>
                <div>
                    <Typography variant="h4">MODULES</Typography> 
                </div>
                <div>
                    <Typography variant="h4">ORGANIZATION</Typography> 
                </div>
            </div>
        )   
    }
}



export default (Modules);
// export default (adminModule);