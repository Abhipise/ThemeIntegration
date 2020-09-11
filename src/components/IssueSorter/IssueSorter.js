import React, { useState} from 'react';
import RecipeReviewCard from "../../components/CustomCard/Card";
import classes from "./IssueSorter.css";

const IssueSorter = (props) => {

    return (
    <div style={{margin : "10px"}}>
            <RecipeReviewCard clicked={props.clicked} id={props.id} type={props.type} issueName={props.issueName} issueNumber={props.issueNumber} ></RecipeReviewCard>
        </div>
    )
}
export default IssueSorter;