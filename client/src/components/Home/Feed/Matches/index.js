import React from 'react'
import { CircularProgress, Grid } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroller'
import { Consumer } from '../../../context'
import Match from './match'

export default () => (
    <Consumer>
        {({
            state: {
                matches,
                matchlist,
                matchlist: { endIndex, totalGames },
                moreMatches,
                summoner,
                summoner: { accountId }
            },
            getMatch,
            getMatches
        }) => (
            <InfiniteScroll
                loadMore={() =>
                    getMatches(
                        accountId,
                        endIndex,
                        endIndex + 10 > totalGames ? totalGames : endIndex + 10
                    )
                }
                hasMore={moreMatches}
                initialLoad={false}
                loader={(
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                        key={matches.length}
                    >
                        <CircularProgress />
                    </Grid>
                )}
            >
                {matches.map(match => (
                    <Match
                        key={match.gameId}
                        getMatch={getMatch}
                        match={match}
                        summoner={summoner}
                    />
                ))}
            </InfiniteScroll>
        )}
    </Consumer>
)
