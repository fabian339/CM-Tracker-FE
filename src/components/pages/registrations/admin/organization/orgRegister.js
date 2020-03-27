import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import AppIcon from '../images/ori_logo.png';
import Typography from '@material-ui/core/Typography';
import appLogo from '../../../../../images/ori_logo.png';
import styles from '../styles';
import { Bounce, Shake, FadeIn, FadeOut, Flash } from 'react-motions' //https://github.com/raphamorim/react-motions


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
import { registerOrg, getOrgToMerge, getOrganizations } from '../../../../../redux/actions/userActions'

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
            //organizations
            organizations: [],
            //errors
            errors: {}
        }
    }

    componentDidMount(){
        this.props.getOrganizations(this.props.match.params.fullname);
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
        
        const { orgName, orgPhone, orgAddress, orgType, orgExist, organizations } = this.state;
        let delay = 0;
        if(organizations) {
            const org = organizations.find(org => org.orgName === orgName);
            const orgFound = (org ? org.orgName === orgName : false)
            this.setState({orgFound});
            delay = orgFound ? 4000 : 0;
        }

        const newOrgData = { orgName, orgPhone, orgAddress, orgType };
        
        //call to add the new organization and redirect to new path
        //set timeout for emotion when finding organizations
        setTimeout(() => { 
        if(orgExist && orgName){
                this.props.getOrgToMerge(orgName ,this.props.history, localStorage.fullname);
            } else {
                this.props.registerOrg(newOrgData ,this.props.history, localStorage.fullname);
            }
        }, delay);

    }


    handleChange = (event) => {
        console.log(event.target.name)
        if (event.target.name === "orgExist"){
            console.log("HERREE")
            this.setState({
                orgExist: !this.state.orgExist,
                organizations: this.props.admin.organizations
            });
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    handleOrganizationChangeOnSearchBar = (event, value) => {
        this.setState({orgName: value})
    }


    handleOrganizationPhoneChange = (value) => {
        if (value) {
          this.setState({ orgPhone: value });
        }
      }

    render() {

        const { UI: { loading } } = this.props;
        const { organizations, errors } = this.state;
        const top100Films = [
            { title: 'The Shawshank Redemption', year: 1994 },
            { title: 'The Godfather', year: 1972 },
            { title: 'Apple', year: 1972 },
            { title: 'Monty Python and the Holy Grail', year: 1975 },
          ];
        // console.log(this.props);
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
                                Is your organization register with us?
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
                                                onChange={this.handleChange}
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

                                    <Autocomplete
                                        // freeSolo
                                        id="free-solo-2-demo"
                                        // disableClearable
                                        options={ organizations ? organizations.map(org => org.orgName) : ["Amazon"] }
                                        value={this.state.orgName}
                                        onInputChange={this.handleOrganizationChangeOnSearchBar}
                                        name='orgName'
                                        renderInput={params => (
                                        <TextField
                                            {...params}
                                            label="Search for an organization"
                                            margin="normal"
                                            variant="outlined"
                                            style={styles.textField}
                                            // helperText={errors.orgName}
                                            error={errors.orgName ? true : false}
                                            InputProps={{ ...params.InputProps, type: 'search' }}
                                        />
                                        )}
                                    />
                                
                                {(this.state.orgExist && this.state.orgFound) && (
                                    <Bounce duration={3}> 
                                        <Grid>
                                            <Typography variant="body2" style={styles.orgFound}>
                                                Organization found! 
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

                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        disabled={false}
                        > 
                        {}
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
    admin: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    registerOrg: PropTypes.func.isRequired,
    getOrgToMerge: PropTypes.func.isRequired,
    getOrganizations: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    admin: state.admin,
    UI: state.UI
});

const mapActionsToProps = { 
    registerOrg, 
    getOrgToMerge,
    getOrganizations
};


export default connect(mapStateToProps, mapActionsToProps)(orgRegister);
