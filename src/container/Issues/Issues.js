import React ,{ useState, useEffect }from 'react';

import axios from '../../axios';
import { Grid } from '@material-ui/core';
import RecipeReviewCard from "../../components/CustomCard/Card";
import classes from './issues.css';
import IssueSorter from '../../components/IssueSorter/IssueSorter';


export default function Issues(props) {
    
    const[backlog, setBacklog]  = useState([]);
    const[notAnIssue, setNotAnIssue]  = useState([]);
    const[userInterface , setUserInterface ] = useState([]);
    const[done, setDone] = useState([]);
    const[tested, setTested] = useState([]);
    const[issuesArray, setIssuesArray] = useState([]);

    
    useEffect( () => {
        axios.get('/issues')
            .then( issues => {
                console.log(issues.data,"llll")
                setIssuesArray(issuesArray.concat(issues.data));
            })
            .catch(err => {console.log(err)})
    }, [issuesArray]);

    useEffect( () => {
                for( const key in issuesArray){
                    console.log(key , issuesArray[key])
                }
                issuesArray.forEach( issue => {
                    if(issue.type === "backlog"){
                        setBacklog(backlog.concat(<RecipeReviewCard id={issue._id} issueName={issue.title} issueNumber={issue.taskNumber} ></RecipeReviewCard>));
                    }
                    else if(issue.type === "notAnIssue"){
                        setNotAnIssue(notAnIssue.concat(<RecipeReviewCard id={issue._id} issueName={issue.title} issueNumber={issue.taskNumber}></RecipeReviewCard>));
                    }
                    else if(issue.type === "UI/UX"){
                        setUserInterface(userInterface.concat(<RecipeReviewCard id={issue._id} issueName={issue.title} issueNumber={issue.taskNumber}></RecipeReviewCard>)); 
                    }
                    else if(issue.type === "done"){
                        setDone(done.concat(<RecipeReviewCard id={issue._id} issueName={issue.title} issueNumber={issue.taskNumber}></RecipeReviewCard>)); 
                    }
                    else if(issue.type === "tested"){
                        setTested(tested.concat(<RecipeReviewCard id={issue._id} issueName={issue.title} issueNumber={issue.taskNumber}></RecipeReviewCard>)); 
                    }
            })
        }, [issuesArray, backlog, notAnIssue, userInterface, done, tested])

    const markAsNotAnIssue = ( id =>{
        const issue = issuesArray.filter(issue => issue._id === id);
        issue[0].type = 'notAnIssue';
        setIssuesArray(issuesArray.filter(issue => issue._id !== id).concat(issue[0]))
    })

    return(
        <div className={classes.app}>
        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <IssueSorter head="Backlog" issues={backlog[0]} ></IssueSorter>    
        <IssueSorter head="Not An Issue" issues={notAnIssue[0]}></IssueSorter>    
        <IssueSorter head="UI/UX" issues={userInterface[0]}></IssueSorter>    
        <IssueSorter head="Done" issues={done[0]}></IssueSorter>    
        <IssueSorter head="Tested" issues={tested[0]}></IssueSorter>    
        </Grid>        
 </div>
    )
}
