import React from 'react';
import RecipeReviewCard from "../../components/CustomCard/Card";

const IssueSorter = (props) => {

    return (
    <div style={{margin : "10px"}}>
            <RecipeReviewCard clicked={props.clicked} key={props.id} type={props.type} issueName={props.issueName} issueNumber={props.issueNumber} ></RecipeReviewCard>
        </div>
    )
}
export default IssueSorter;