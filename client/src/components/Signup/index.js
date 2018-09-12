import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    Button,
    FormHelperText,
    Grid,
    Paper,
    TextField
} from '@material-ui/core'
import axios from 'axios'

export default withStyles(theme => ({
    button: {
        marginTop: theme.spacing.unit * 2
    },
    paper: {
        minWidth: theme.spacing.unit * 40,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    signup: {
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 56px)'
        } ,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100vh - 64px)'
        }
    }
}))(class extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        summonerName: '',
        signedUp: false,
        error: ''
    }
    onClick = () => {
        const {
            username,
            password,
            email,
            summonerName
        } = this.state
        console.log('username', username)
        console.log('password', password)
        console.log('email', email)
        console.log('summonerName', summonerName)
        axios.post('/api/signup', {
            username,
            password,
            email,
            summonerName: summonerName.toLowerCase()
        }).then(({ data }) => {
            console.log(data)
            data.summoner
            ? this.setState({ signedUp: true })
            : this.setState({ error: data })
        }).catch(error => console.log(error))
    }
    render() {
        const { classes } = this.props
        const { summonerName, signedUp, error } = this.state
        if (signedUp) return <Redirect to={`/${summonerName}`} />
        return (
            <Grid
                alignItems="center"
                className={classes.signup}
                container
                direction="column"
                justify="center"
            >
                <Grid item>
                    <Paper className={classes.paper}>
                        <Grid
                            alignItems="center"
                            container
                            direction="column"
                            justify="center"
                        >
                            <Grid item>
                                <TextField
                                    label="Username"
                                    onChange={e =>
                                        this.setState({
                                            username: e.target.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Password"
                                    onChange={e =>
                                        this.setState({
                                            password: e.target.value
                                        })
                                    }
                                    type="password"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Email"
                                    onChange={e =>
                                        this.setState({
                                            email: e.target.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Summoner name"
                                    onChange={e =>
                                        this.setState({
                                            summonerName: e.target.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    className={classes.button}
                                    color="primary"
                                    onClick={this.onClick}
                                    variant="contained"
                                >
                                    SIGN UP
                                </Button>
                            </Grid>
                            {error && (
                                <FormHelperText>
                                    {error}
                                </FormHelperText>
                            )}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
})
