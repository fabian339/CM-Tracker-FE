import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';


const styles = {
    container: {
        border: "2px solid",
        // height: "500px",
        margin: "75px 10px"
    }
}

export class Modules extends Component {

    render() {
        return (
            <Grid>
                <Grid style={styles.container}  container item sm={6} xs={12}>
                    <Typography variant="h3" align="center">ORGANIZATION</Typography> 
                    <div>
                        <p> Organization Name: </p>
                        <p> Users: </p>
                        <p> Clients: </p>
                    </div>
                </Grid>
                <Grid style={styles.container}  container item sm={6} xs={12}>
                    <Typography variant="h3" align="center">MODULES</Typography> 
                </Grid>
                <Grid style={styles.container}  container item sm={6} xs={12}>
                    <Typography variant="body2" align="center"></Typography> 
                </Grid>
            </Grid>
        )   
    }
}



export default (Modules);
// export default (adminModule);