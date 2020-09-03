import React from 'react';
import { Grid } from '@material-ui/core';


const IssueSorter = (props) => {

    return (
        <div>
        
            <Grid key={props.id}>
            <strong>{props.head}</strong>
                {props.issues}
            </Grid>
        </div>
    )
}
export default IssueSorter;