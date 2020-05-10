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
import { getActivities } from '../../redux/actions/userActions'
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
            completed: [],
            pending: [],
            filtered: [],
            filterBy: '',
            filterName: '',
            filterDate: '',
          }
    }

    componentDidMount(){
      const { history, match : { params : { fullname }}} = this.props;
      // console.log(this.props)
      this.props.getActivities(fullname, history);
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
      const { data: {activities : { completed, pending, loading }}} = nextProps;
      if(completed && pending) {
          this.setState({ completed, pending })
      }
  }

    onDownloadClick = () => {
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



    onReportClick = (e) => {
      let hourCounted = 0;

      if(this.state.filterName) {
        this.state.completed.forEach(record => {
          if(record.name === this.state.filterName){
            // console.log(record.duration)
            hourCounted = hourCounted + parseFloat(record.duration);
          }
        });
    
        alert(`${this.state.filterName}  have worked ${hourCounted.toFixed(1)} hours.`)
      } else {
        alert("Please select a name!")
      }
    }


    handleFilterDate = (e) => {
      this.setState({filterDate: moment(e.target.value).format("MMMM D YYYY")})
    }


    handleSelectName = (event, value) => {
      this.setState({filterName: value})
    }

    handleFilterBy= (event, value) => {
      this.setState({filterBy: value})
    }


    render() {
        const {  data : { loading } } = this.props;
        const { completed, pending, filterBy, filterName, filterDate } = this.state;
        
        // console.log(filterDate)
        
        return (
            <TableContainer component={Paper} style={{margin: "4.5% auto", width: 1100, display: "table"}}>
              {loading ? (
                  <CircularProgress size={100}  style={{margin: "auto 50%"}} />
                ) : ( 
                  <Fragment >

                    <CSVLink
                      data={completed}
                      filename={`timesheet-${moment().tz('America/New_York').format('L')}.csv`}
                      target="_blank"
                      onClick={this.onDownloadClick}
                      >
                      <p style={{textAlign: "center"}}> Delete DB </p>
                    </CSVLink>

                    <MyAutocomplete
                        options={["Name","Date"]}
                        onInputChange={this.handleFilterBy}
                        name='filterBy'
                        label="FILTER BY"
                        style={{width: "30%", margin: "10px 35%"}}
                        value={this.state.filterBy}
                    >
                    </MyAutocomplete>

                    {filterBy === "Name" && (
                      <Fragment>
                        <MyAutocomplete
                            options={participantList}
                            onInputChange={this.handleSelectName}
                            name='filterName'
                            label="Select participant name."
                            style={{width: "30%", margin: "10px 35%"}}
                            value={this.state.name}
                        >
                        </MyAutocomplete>
                      
                        {filterName != "" && (
                          <Fragment>
                            <Button 
                              variant="outlined"
                              color="primary"
                              onClick={this.onReportClick}  
                              style={{width: "15%", margin: "10px 42.5%"}} >
                                  Report
                            </Button> 

                            <Typography 
                            variant="h4" 
                            style={{
                              marginTop: "40px",
                              marginBottom: "40px",
                              textAlign: "center"
                              }} >
                                FILTERED TIMESHEET ({moment().tz('America/New_York').format('L')})
                            </Typography>

                            <CSVLink
                              data={completed.filter(word => (word.name === filterName))}
                              filename={`timesheet-${filterName}`}
                              target="_blank"
                              >
                              <p style={{textAlign: "center"}}>Download Participant Report</p>
                            </CSVLink>

                            <Table aria-label="simple table" style={{backgroundColor: "lightsteelblue"}}>
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
                              {completed.filter(word => (word.name === filterName)).map(row => 
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
                              )}
                            </TableBody>
                          </Table>
                        </Fragment>
                        )}
                    
                      </Fragment>
                    )}
                    
                    {filterBy === "Date" && (
                      <Fragment>
                        <TextField
                            id="date"
                            label="Choose Date"
                            type="date"
                            name='filterDate'
                            onChange={this.handleFilterDate}
                            variant="outlined"
                            style={{width: "20%", margin: "10px 40%"}}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />

                        {filterDate != "" && (
                          <Fragment>
                            <Typography 
                            variant="h4" 
                            style={{
                              marginTop: "40px",
                              marginBottom: "40px",
                              textAlign: "center"
                              }} >
                                FILTERED TIMESHEET ({moment().tz('America/New_York').format('L')})
                            </Typography>

                            <CSVLink
                              data={completed.filter(word => (word.date === filterDate))}
                              filename={`timesheet-${filterDate}`}
                              target="_blank"
                              >
                              <p style={{textAlign: "center"}}>Download {filterDate} Report</p>
                            </CSVLink>

                            <Table aria-label="simple table" style={{backgroundColor: "lightsteelblue"}}>
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
                              {completed.filter(word => (word.date === filterDate)).map(row => 
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
                              )}
                            </TableBody>
                          </Table>
                        </Fragment>
                        )}

                      </Fragment>
                    )}

                    <Typography 
                      variant="h4" 
                      style={{
                      marginTop: "40px",
                      marginBottom: "40px",
                      textAlign: "center"
                      }} >
                      NDA REPORT TIMESHEET ({moment().tz('America/New_York').format('L')})
                    </Typography>

                    <CSVLink
                      data={completed}
                      filename={`timesheet-${moment().tz('America/New_York').format('L')}.csv`}
                      target="_blank"
                      >
                      <p style={{textAlign: "center"}}>Download Timesheets</p>
                    </CSVLink>

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
                        {completed.map(row => 
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
                        )}
                      </TableBody>
                    </Table>
                      <Typography variant="h4" style={styles.pageTitle} >
                        TIMESHEET LOGS
                    </Typography>
                    
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
  data: state.data,
  UI: PropTypes.object.isRequired,
  UI: state.UI
});


export default connect(mapStateToProps, {getActivities})(timesheetForm);
