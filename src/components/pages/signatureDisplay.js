import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// import AppIcon from '../images/ori_logo.png';
import Typography from '@material-ui/core/Typography';
// import appLogo from '../../../../images/ori_logo.png';
import styles from './styles';
import { Shake } from 'react-motions' //https://github.com/raphamorim/react-motions
// import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button';

import axios from 'axios';
//mui studd
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import participantList from './participantList';


import {CSVLink} from 'react-csv';
import { getSignatures } from '../../redux/actions/userActions'
// var moment = require('moment-timezone');
import moment from 'moment-timezone';
import MyAutocomplete from '../../util/MyAutocomplete'

//redux stuff
//Redux stuf
import { connect } from 'react-redux';

// const Link = require("react-router-dom").Link


class timesheetForm extends Component {

    constructor(){
        super();
        this.state = {
            signatures: []
          }
    }

    componentDidMount(){
      const { history, match : { params : { fullname }}} = this.props;
    //   console.log(this.props)
      this.props.getSignatures(fullname, history);
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
      const { data: { signatures } } = nextProps;
      if(signatures) {
          this.setState({ signatures })
      }
  }






    render() {
        const {  data : { loading } } = this.props;
        const { signatures } = this.state;
        
        // console.log(signatures)
        
        return (
            <TableContainer component={Paper} style={{margin: "4.5% auto", width: 1100, display: "table"}}>
              {loading ? (
                  <CircularProgress size={100}  style={{margin: "auto 50%"}} />
                ) : ( 
                  <Fragment >
                    <CSVLink
                      data={signatures}
                      filename={`Signatures-${moment().tz('America/New_York').format('L')}.csv`}
                      target="_blank"
                      >
                      <p style={{textAlign: "center"}}>Download Signatures</p>
                    </CSVLink>


                    <Typography 
                        variant="h4" 
                        style={{
                            marginTop: "40px",
                            marginBottom: "40px",
                            textAlign: "center"
                            }} >
                            Signatures ({moment().tz('America/New_York').format('L')})
                    </Typography>
                    <Table aria-label="simple table" style={{backgroundColor: "lightsteelblue"}}>
                            <TableHead>
                              <TableRow>
                                <TableCell style={{fontWeight: "bolder", fontSize: "20px"}}>Name</TableCell>
                                <TableCell align="center"  style={{fontWeight: "bolder", fontSize: "20px"}}>Date</TableCell>
                                <TableCell align="center"  style={{fontWeight: "bolder", fontSize: "20px"}}>Time</TableCell>
                                <TableCell align="center"  style={{fontWeight: "bolder", fontSize: "20px"}}>Terms and Conditions</TableCell>
                                <TableCell align="center"  style={{fontWeight: "bolder", fontSize: "20px"}}>Signature</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {signatures.map(row => 
                                <TableRow key={row.name}>
                                  <TableCell component="th" scope="row">
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="center">{row.date}</TableCell>
                                  <TableCell align="center">{row.time}</TableCell>
                                  <TableCell align="center">{row.conditions ? "Agreed" : "Disagreed"}</TableCell>
                                  <TableCell align="center" style={{width: "40%"}}> <img style={{width: "40%"}} src={row.signature} onclick="window.open(this.src)" /></TableCell>
    
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                </Fragment>
                )}          
          </TableContainer>
        )
    }
}

timesheetForm.propTypes = {
  data: PropTypes.object.isRequired,
  getSignatures: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data,
  UI: PropTypes.object.isRequired,
  UI: state.UI
});


export default connect(mapStateToProps, {getSignatures})(timesheetForm);
