import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Paper, Typography, Grid } from '@material-ui/core'
import { StaticDataContext } from '../../Context'
import Challenger from '../../../images/tier/challenger.png'
import Master from '../../../images/tier/master.png'
import Diamond from '../../../images/tier/diamond.png'
import Platinum from '../../../images/tier/platinum.png'
import Gold from '../../../images/tier/gold.png'
import Silver from '../../../images/tier/silver.png'
import Bronze from '../../../images/tier/bronze.png'
import Provisional from '../../../images/tier/provisional.png'
import Unranked from '../../../images/tier/unranked.png'

export default withStyles((theme) => ({
    title: {
        textAlign: 'center',
        paddingBottom: 10
    },
    paper: {
        width: theme.spacing.unit * 40,
        padding: theme.spacing.unit * 5
    }
}))(({
    positions,
    classes
}) => {
    const getTierImage = tier => {
        if (tier === 'CHALLENGER') {
            return <img src={Challenger}/>
        } else if (tier === 'MASTER') {
            return <img src={Master}/>
        } else if (tier === 'DIAMOND') {
            return <img src={Diamond}/>
        } else if (tier === 'PLATINUM') {
            return <img src={Platinum}/>
        } else if (tier === 'GOLD') {
            return <img src={Gold}/>
        } else if (tier === 'SILVER') {
            return <img src={Silver}/>
        } else if (tier === 'BRONZE') {
            return <img src={Bronze}/>
        } else if (tier === 'PROVISIONAL') {
            return <img src={Provisional}/>
        } else {
            return <img src={Unranked}/>
        }
    }
    return (
        <StaticDataContext.Consumer>
            {({ state: { version }, baseUrl }) => (
                <Fragment>
                <Paper className={classes.paper}>
                    <Typography variant="headline" className={classes.title}>Ranked Stats</Typography>
                    <Grid container direction="column" justify="space-between" alignItems="center" spacing={8}>
                        <Grid item>
                            {getTierImage(`${positions[0].tier}`)}
                        </Grid>
                        <Grid item>
                            {positions[0].tier
                                ? (<Typography variant="subheading">{positions[0].tier} {positions[0].rank}</Typography>)
                                : (<Typography variant="subheading">Unranked</Typography>)
                            }
                        </Grid>
                        <Grid item>
                            <Typography variant="subheading">{positions[0].leaguePoints} LP</Typography>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justify="space-between" spacing={40}>
                                <Grid item>
                                    <Grid container direction="column" alignItems="center">
                                        <Grid item>
                                            <Typography variant="subheading">Wins</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subheading">{positions[0].wins}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column" alignItems="center">
                                        <Grid item>
                                            <Typography variant="subheading">Losses</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subheading">{positions[0].losses}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Fragment>
        )}
    </StaticDataContext.Consumer>
)})
