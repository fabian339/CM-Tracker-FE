import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import AppIcon from '../images/ori_logo.png';
import Typography from '@material-ui/core/Typography';
import appLogo from '../../../../../images/ori_logo.png';
import styles from '../styles';
import { Bounce, Shake, FadeIn, FadeOut, Flash } from 'react-motions' //https://github.com/raphamorim/react-motions
import MyAutocomplete from '../../../../../util/MyAutocomplete'
import axios from 'axios';


//mui studd
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiPhoneNumber from "material-ui-phone-number";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Autocomplete from '@material-ui/lab/Autocomplete';

//Redux stuf
import { connect } from 'react-redux';
import { 
    registerOrg,
    getOrgToMerge, 
    getOrganizations, 
     } from '../../../../../redux/actions/userActions'

const Link = require("react-router-dom").Link


class orgRegister extends Component {

    constructor(){
        super();
        this.state = {
            //ORGANIZATION INFO
            orgName: '',
            orgPhone: '',
            orgAddress: '',
            orgType: '',
            orgExist: false,
            orgFound: false,
            loadingAdmins: false,
            adminsLoaded: false,
            //organizations
            organizations: [],
            orgAdmin: '',
            //orgAdministrators
            orgAdministrators: [],
            //errors
            errors: {}
        }
    }

    componentDidMount(){
        const {match : { params : { fullname } }} = this.props;
        this.props.getOrganizations(fullname);
        // console.log("ORG Register",this.props.match.params.fullname)
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
    }

    handleSubmit = (event) => {

        event.preventDefault();

        this.setState({
            loading: true
        });
        
        const { orgName, orgPhone, orgAddress, orgType,orgAdmin, orgExist, organizations } = this.state;
        let delay = 0;
        if(organizations) {
            let org = organizations.find(org => org === orgName);
            console.log("THIS ORGGGG", org === undefined)
            const orgFound = !(org === undefined)
            this.setState({orgFound});
            delay = orgFound ? 4000 : 0;
        }

        const newOrgData = { orgName, orgPhone, orgAddress, orgType };
        const mergeOrgData = {orgName, orgAdmin}
        
        //call to add the new organization and redirect to new path
        //set timeout for emotion when finding organizations
        setTimeout(() => { 
        if(orgExist && orgName){
                this.props.getOrgToMerge(mergeOrgData ,this.props.history, localStorage.fullname);
            } else {
                this.props.registerOrg(newOrgData ,this.props.history, localStorage.fullname);
            }
        }, delay);

    }

    handleSarchOrganizationBarChange = (event) => {
        // console.log(event.target.name, event.target.value)

        const { user : { organizations } } = this.props;
        this.setState({ orgExist: !this.state.orgExist });

        if(organizations === undefined){
            const errors = {};
            errors.orgName = "Organizations not fetched, please reload and try again!"
            this.setState({ errors })
        } else if(!this.state.organizations.lenght){
            this.setState({ organizations });
        }   
     }


    handleChange = (event) => {
        // console.log(event.target.name, event.target.value)
            this.setState({
                [event.target.name]: event.target.value
            })
    }

    handleOrganizationChangeOnSearchBar = (event, value) => {
        const {match : { params : { fullname } }} = this.props;
        if(!(value.trim() === '')){
            console.log("IM HEREE")
            this.setState({loadingAdmins: !this.state.loadingAdmins})
                // dispatch( { type: LOADING_DATA });
            axios.get(`/admin/${fullname}/${value}/admins`)
            .then((res) => {
                this.setState({
                    orgAdministrators: res.data,
                    loadingAdmins: !this.state.loadingAdmins,
                    adminsLoaded: res.data ? true:false
                })
            })
            .catch(err => {
                this.setState({
                    orgAdministrators: [],
                    loadingAdmins: !this.state.loadingAdmins 
                })
            });
        // }
            // this.props.getAdminsFromOrganization(value);
        }
        this.setState({orgName: value})
    }

    handleAdminChangeOnSearchBar = (event, value) => {
        this.setState({orgAdmin: value})
    }


    handleOrganizationPhoneChange = (value) => {
        if (value) {
          this.setState({ orgPhone: value });
        }
      }

    render() {
        // const { user : { organizations } } = this.props;

        const { UI: { loading } } = this.props;
        const { organizations, errors, loadingAdmins, orgAdministrators, adminsLoaded } = this.state;
        console.log("orgREgister", orgAdministrators);
        return (
        <Shake>
            <Grid >
            <header>
                <div style={styles.logoContainer}>
                    <img src={appLogo} alt="icon" style={{width: 250}}/>
                </div>                    
                <Typography variant="h4" style={styles.pageTitle} >
                    Yaiiiiii, keep it going for the last step
                </Typography>
            </header>
            <Grid container>
                <Grid item sm />
                <Grid item sm={6}>
                    <form noValidate onSubmit={this.handleSubmit} style={styles.form} >

                        <Typography variant="h6" style={{margin: "20px auto 10px auto"}}>
                            ORGANIZATION
                        </Typography>

                        <div>
                            <Typography variant="subtitle1">
                                Is your organization already registered with us?
                            </Typography>
                            <div >
                                <Grid 
                                component="label" 
                                container 
                                alignItems="center"
                                style={{margin: "auto 40%"}}
                                >
                                    <Grid item>No</Grid>
                                        <Grid item>
                                            <Switch
                                                name="orgExist"
                                                checked={this.state.orgExist}
                                                onChange={this.handleSarchOrganizationBarChange}
                                                value={this.state.orgExist}
                                                color="primary"
                                            />
                                        </Grid>
                                    <Grid item>Yes</Grid>
                                </Grid>
                                {this.state.orgExist && (
                                    <small>
                                        Switch to No to register organization
                                    </small>
                                )}
                            </div>
                        </div>
                        {this.state.orgExist ? (
                            <Grid>

                                <MyAutocomplete
                                    options={organizations}
                                    value={this.state.orgName}
                                    onInputChange={this.handleOrganizationChangeOnSearchBar}
                                    name='orgName'
                                    label="Search for an organizations"
                                    style={styles.textField}
                                    helperText={errors.orgName}
                                    error={errors.orgName ? true : false}
                                >
                                </MyAutocomplete>
                                
                                {(this.state.orgExist && this.state.orgFound) && (
                                    <Bounce duration={2.5}> 
                                        <Grid>
                                            <Typography variant="body2" style={styles.orgFound}>
                                                Organization and Administrator found! 
                                            </Typography>
                                            <Typography variant="body2">
                                                <EmojiEmotionsIcon style={{color: "royalblue"}} /> 
                                            </Typography>
                                        </Grid>
                                    </Bounce>
                                )}

                            </Grid>
                        ) : (
                            <Grid >
                                <Typography variant="subtitle1">
                                    Great, lest register your Organization/Business
                                </Typography>
                                <TextField
                                    id='organization'
                                    name='orgName'
                                    type="text"
                                    label="Organization/Business Name"
                                    style={styles.textField}
                                    variant="outlined" 
                                    required
                                    helperText={errors.orgName}
                                    error={errors.orgName ? true : false}
                                    value={this.state.orgName}
                                    onChange={this.handleChange}
                                    fullWidth 
                                    /> 

                                <TextField
                                    id='addrees'
                                    name='orgAddress'
                                    type="text"
                                    label="Main Address: 123 Street Ave, New York, NY, 10022"
                                    style={{width:"80%", marginTop:"-7px"}}
                                    required
                                    helperText={errors.orgAddress}
                                    error={errors.orgAddress ? true : false}
                                    value={this.state.orgAddress}
                                    onChange={this.handleChange}
                                    fullWidth 
                                    /> 
                                
                                <FormControl style={styles.orgTypes} >
                                    {errors.orgType ? (
                                        <InputLabel>{errors.orgType}</InputLabel>  
                                    ) : (
                                        <InputLabel>Organization Type</InputLabel>
                                    )}
                                    <Select
                                        native
                                        value={this.state.orgType}
                                        onChange={this.handleChange}
                                        // helperText={errors.orgType}
                                        error={errors.orgType ? true : false}
                                        inputProps={{
                                            name: 'orgType',
                                            id: 'age-native-simple',
                                        }}
                                        >
                                        <option value="" />
                                        <option value="Educational">Educational</option>
                                        <option value="Merchandise Business">Merchandise Business</option>
                                        <option value="Manufacture Business">Manufacture Business</option>
                                        <option value="Non-Profit">Non-Profit</option>
                                        <option value="Insurance">Insurance</option>
                                        <option value="Service Business">Service Business</option>
                                        <option value="Other">Other</option>
                                    </Select>
                                    
                                </FormControl>

                                <MuiPhoneNumber
                                name="orgPhone"
                                label="Organization Phone#"
                                data-cy="user-phone"
                                defaultCountry={"us"}
                                style={{
                                    width: "37.5%", 
                                    margin: "15px 0 15px 2.5%",
                                }}
                                helperText={errors.orgPhone}
                                error={errors.orgPhone ? true : false}
                                value={this.state.orgPhone}
                                onChange={this.handleOrganizationPhoneChange}
                                />
                            </Grid>
                            )
                        }

                        {errors.general && (
                            <Typography variant="body2" style={styles.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        
                        {loadingAdmins && (
                            <Grid item>
                                <CircularProgress size={50} 
                                    style={{      
                                    position: 'relative',
                                    color: "brown",
                                    width: "40px",
                                    height: "40px"
                                }} />
                            </Grid>
                        )}

                        {/* //HEREEEEEEEEEEEEEEEEEEE */}
                        {adminsLoaded && (
                            <MyAutocomplete
                                options={orgAdministrators}
                                value={this.state.orgAdmin}
                                onInputChange={this.handleAdminChangeOnSearchBar}
                                name='orgAdmin'
                                label="Search for an administrator"
                                style={styles.textField}
                                helperText={"Please select an administrator"}
                                error={errors.orgAdmin ? true : false}
                            >
                            </MyAutocomplete>
                        )}

                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        disabled={false}
                        > 
                        register organization
                        {loading && (
                            <CircularProgress size={30} style={styles.progress} />
                        )}
                        </Button>
                        <br/>
                        <footer style={{margin: "20px auto"}}>
                            <small>
                                Already have an account? Log In <Link to="/login">Here</Link>
                            </small>
                        </footer>
                    </form>
                </Grid>
                <Grid item sm/>

            </Grid>
        </Grid>
        </Shake>
        )
    }
}

orgRegister.propTypes = {
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    registerOrg: PropTypes.func.isRequired,
    getOrgToMerge: PropTypes.func.isRequired,
    getOrganizations: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = { 
    registerOrg, 
    getOrgToMerge,
    getOrganizations
};


export default connect(mapStateToProps, mapActionsToProps)(orgRegister);
