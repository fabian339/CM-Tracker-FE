import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// import AppIcon from '../images/ori_logo.png';
import Typography from '@material-ui/core/Typography';
// import appLogo from '../../../../images/ori_logo.png';
import styles from './styles';
import { Shake } from 'react-motions' //https://github.com/raphamorim/react-motions
// import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

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

import {CSVLink} from 'react-csv';
import { getActivities } from '../../redux/actions/userActions'
// var moment = require('moment-timezone');
import moment from 'moment-timezone';

//redux stuff
//Redux stuf
import { connect } from 'react-redux';

// const Link = require("react-router-dom").Link


class timesheetForm extends Component {

    constructor(){
        super();
        this.state = {
            completed: [],
            pending: [],
            filter: ''
        }
    }

    componentDidMount(){
      this.props.getActivities();
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
      const { data: {activities : { completed, pending }}} = nextProps;
      if(completed && pending) {
          this.setState({ completed, pending })
      }
  }

    onDownloadClick() {
      let deleteDb = window.confirm("Are you sure you want to delete this database?");
      if(deleteDb){
          axios.delete(`/cleanDatabase`)
          .then(res => {
            setInterval(() => {
              window.location.reload()

              }, 3000);
          })
          .catch(err => {
              console.log(err)
          });
      }
    }

    handleChange = event => {
      this.setState({ filter: event.target.value });
    };
  

    render() {
        const {  data : { loading } } = this.props;
        const { completed, pending, filter } = this.state;

        let filteredData = completed;
        if(filter){
          filteredData = completed.filter(word => word.name === filter);          
        }
        
        
        return (
            <TableContainer component={Paper} style={{margin: "4.5% auto", width: 1100, display: "table"}}>
              <Typography variant="h4" style={styles.pageTitle} >
                NDA REPORT TIMESHEET ({moment().tz('America/New_York').format('L')})
              </Typography>
              
              {loading ? (
                  <CircularProgress size={100}  style={{margin: "auto 50%"}} />
                ) : ( 
                // <Shake duration={2.5}>     
                  <Fragment >
                  <CSVLink
                    data={completed}
                    filename={`timesheet-${moment().tz('America/New_York').format('L')}.csv`}
                    target="_blank"
                    onClick={this.onDownloadClick}
                    >
                    <p style={{textAlign: "center"}}>Download</p>
                  </CSVLink>
                  <TextField
                    id='filter'
                    name='filter'
                    type="name"
                    inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
                    variant="outlined"
                    label="Search by name"
                    style={{margin: "10px 37.5%", width: "25%"}}
                    onChange={this.handleChange}
                    />
                  <Table aria-label="simple table" style={{backgroundColor: "darkseagreen"}}>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{fontWeight: "bolder", fontSize: "20px"}}>Name</TableCell>
                        <TableCell align="right"  style={{fontWeight: "bolder", fontSize: "20px"}}>Date</TableCell>
                        <TableCell align="right"  style={{fontWeight: "bolder", fontSize: "20px"}}>Time-in</TableCell>
                        <TableCell align="right"  style={{fontWeight: "bolder", fontSize: "20px"}}>Time-out</TableCell>
                        <TableCell align="right"  style={{fontWeight: "bolder", fontSize: "20px"}}>Duration</TableCell>  
                        <TableCell align="right"  style={{fontWeight: "bolder", fontSize: "20px"}}>#Calls</TableCell>  
                        <TableCell align="right"  style={{fontWeight: "bolder", fontSize: "20px"}}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.date}</TableCell>
                          <TableCell align="right">{row.timeIn}</TableCell>
                          <TableCell align="right">{row.timeOut}</TableCell>
                          <TableCell align="right">{row.duration}</TableCell>
                          <TableCell align="right">{row.numberofCalls}</TableCell>
                          <TableCell align="right">{row.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                    <Typography variant="h4" style={styles.pageTitle} >
                      TIMESHEET LOGS
                  </Typography>
                  {/* style={{margin: "2.5% auto", width: 1000}} */}
                  <Table aria-label="simple table" >
                    <TableHead>
                      <TableRow>
                        <TableCell style={{fontWeight: "bolder", fontSize: "20px"}}>Name</TableCell>
                        <TableCell align="right"  style={{fontWeight: "bolder", fontSize: "20px"}}>Date</TableCell>
                        <TableCell align="right"  style={{fontWeight: "bolder", fontSize: "20px"}}>Time</TableCell>
                        <TableCell align="right"  style={{fontWeight: "bolder", fontSize: "20px"}}>Type</TableCell>
                        <TableCell align="right"  style={{fontWeight: "bolder", fontSize: "20px"}}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pending.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.date}</TableCell>
                          <TableCell align="right">{row.time}</TableCell>
                          <TableCell align="right">{row.actType}</TableCell>
                          <TableCell align="right">{row.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Fragment>
                // </Shake>

              )}
          </TableContainer>
        )
    }
}

timesheetForm.propTypes = {
  data: PropTypes.object.isRequired,
  getActivities: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data
});


export default connect(mapStateToProps, {getActivities})(timesheetForm);
// export default (timesheetForm);
