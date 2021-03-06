import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Paper, Typography, Grid } from '@material-ui/core'
import { Consumer } from '../context'
import {
    championMastery4,
    championMastery5,
    championMastery6,
    championMastery7
} from '../../images/champion-mastery'

const getMasteryImage = mastery => {
    if (mastery === '7') return <Avatar src={championMastery7}/>
    else if (mastery === '6') return <Avatar src={championMastery6}/>
    else if (mastery === '5') return <Avatar src={championMastery5}/>
    else if (mastery === '4') return <Avatar src={championMastery4}/>
}

export default withStyles((theme) => ({
    title: {
        textAlign: 'center',
        paddingBottom: 10
    },
    paper: {
        minWidth: theme.spacing.unit * 40,
        maxWidth: theme.spacing.unit * 40,
        padding: theme.spacing.unit * 5
    }
}))(({ champions, championMasteries, classes }) => (
    <Consumer>
        {({ state: { version, champions }, baseUrl }) => (
            <Fragment>
                <Paper className={classes.paper}>
                    <Typography variant="headline" className={classes.title}>
                        Champion Mastery
                    </Typography>
                    <Grid
                        container
                        direction="column"
                        justify="space-between"
                        spacing={8}
                    >
                        {championMasteries.slice(0,5).map(championMastery => (
                            <Grid item key={championMastery.championId}>
                                {(championMastery.championLevel > 3) ? (
                                    <Grid
                                        alignItems="center"
                                        container
                                        direction="row"
                                        justify="space-between"
                                        spacing={32}
                                    >
                                        <Grid item xs={2}>
                                            {getMasteryImage(
                                                `${championMastery.championLevel}`
                                            )}
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Avatar
                                                src={`${baseUrl}/cdn/${version}/img/champion/${champions[championMastery.championId].image.full}`}
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography variant="subheading">
                                                {champions[championMastery.championId].name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="subheading">
                                                {championMastery.championPoints}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ) :<Fragment/>}
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Fragment>
        )}
    </Consumer>
))
