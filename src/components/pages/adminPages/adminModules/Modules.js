import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const styles = {
    container: {
        border: "2px solid",
        // height: "500px",
        margin: "90px 10px"
    }
}

export class Modules extends Component {

    // componentDidMount() {
    //     console.log("Modulesss only", this.props)
        // const { match: { params } } = this.props;
        // this.props.getAdminData(params.fullname);
    //   }


    render() {
        console.log("Modulesss only", this.props)
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

// Modules.propTypes = {
//     admin: PropTypes.object.isRequired,
// }

const mapStateToProps = (state) => ({
    // admin: state.admin,
    organization: state.admin.organization
});


export default connect(mapStateToProps)(Modules);
// export default (adminModule);