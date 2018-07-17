import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import axios from 'axios'
import Sidebar from './sidebar'
import MatchList from './matchlist'

export default withRouter(class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            summonerData: {}
        }
        axios.get(`/api/search/${props.match.params.summonerName}`).then(res => {
            console.log(res.data)
            this.setState({ summonerData: res.data })
            if ('status_code' in res.data.summoner)
                this.props.history.push({
                    pathname: '/',
                    state: { error: res.data.summoner }
                })
        }).catch(error => {
            console.log(error)
            this.props.history.push({
                pathname: '/',
                state: { error: { message: 'Failed to complete request' } }
            })
        })
    }
    render() {
        const { summonerData, summonerData: { positions }, summonerData: { summoner }, summonerData: { version } } = this.state
        const { path } = this.props.match
        return (
            <div className="summoner">
                <Grid container>
                    <Grid item xs={2}>
                        <Sidebar
                            positions={positions}
                            summoner={summoner}
                            version={version}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Switch>
                            <Route
                                path={`${path}/matches`}
                                render={props => <MatchList {...props} summonerData={summonerData}/>}
                            />
                        </Switch>
                    </Grid>
                </Grid>
            </div>
        )
    }
})
