import React ,{ useState, useEffect } from 'react';

import axios from '../../axios';
import { Grid } from '@material-ui/core';
import RecipeReviewCard from "../../components/CustomCard/Card";
import IssueSorter from '../../components/IssueSorter/IssueSorter';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Input from '../../components/Input/Input';
import Button from '../../components/CustomButtons/Button';


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Issues(props) {
  
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [backlog, setBacklog]  = useState([]);
    const [notAnIssue, setNotAnIssue]  = useState([]);
    const [userInterface , setUserInterface ] = useState([]);
    const [done, setDone] = useState([]);
    const [tested, setTested] = useState([]);
    const [issuesArray, setIssuesArray] = useState([]);
    const [open, setOpen] = useState(false);
    const [issues, setIssues] = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder : "Issue Name"
            },
            value: '' 
        },
        projectId: {
            name: "Project Name",
            elementType: "select",
            elementConfig: {
              options: []
            },
            value: ''
          },
        title:{
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder : "Title of issue"
            },
            value: '' 
        },
        type: {
            name: "Type of issue",
            elementType: "select",
            elementConfig: {
              options: [
                  {value: 'backlog', name: 'Backlog'},
                  {value: 'notAnIssue', name: 'Not An Issue'},
                  {value: 'UI/UX', name: 'UI/UX'},
                  {value: 'tested', name: 'Tested'},
            ]  
            },
            value: ''
          },
        taskNumber: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder : "TaskNumber"
            },
            value: '' 
        },
        severity: {
            name: "Type of severity",
            elementType: "select",
            elementConfig: {
              options: [
                  {value: "notset", name: "Notset"},
                  {value: "critical", name: "Critical"},
                  {value: "important", name: "Important"},
                  {value: "normal", name: "Normal"},
                ]
            },
            value: ''
        },
        assignedTo: {
            name: "Issue Assigned To ",
            elementType: "select",
            elementConfig: {
              options: []
            },
            value: ''
        },
        attachment: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder : "Attachment"
            },
            value: '' 
        },
        comment: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder : "Comment"
            },
            value: '' 
        }
    });

    useEffect(() => {
        axios.get('/issues')
            .then( issues => {
                setIssuesArray(issuesArray.concat(issues.data));
            })
            .catch(err => {console.log(err)})
        axios.get('/projects')
            .then( project => {
                project.data.map( (project,index) => {
                   issues.projectId.elementConfig.options[index] = { value: project._id, name: project.name}
                   return "";
                })
            })            
            .catch(err => {console.log(err)})
        axios.get('/users')
            .then( users => {
                users.data.map( (user,index) => {
                   issues.assignedTo.elementConfig.options[index] = { value: user._id, name: user.email}
                   return ""
                })
            })            
            .catch(err => {console.log(err)})
    }, []);

    useEffect(() => {
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
        }, [issuesArray])
    
    const submitHandler = (e) => {
        e.preventDefault();
        let issue = {
            name: issues.name.value,
            projectId: issues.projectId.value,
            title: issues.title.value,
            type: issues.type.value,
            taskNumber: issues.taskNumber.value,
            severity: issues.severity.value,
            assignedTo: issues.assignedTo.value,
            attachment: issues.attachment.value,
            comment: issues.comment.value,
        }
        console.log(issue,"aaaaaaaaaaaaa");
        axios.post("/issues",issue)
        .then( result => {
            console.log("Issue created succsfully");
        })
        .catch(err => {console.log(err)})
 
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const inputChangeHandler = (e, inputIdentifier) => {
        e.preventDefault()
        const updatedForm = {
        ...issues
        };
        const updatedFormElement = {
        ...updatedForm[inputIdentifier]
        };
        updatedFormElement.value = e.target.value;
        updatedForm[inputIdentifier] = updatedFormElement;
        setIssues(updatedForm);
        console.log(issues.projectId.value,e.target.value)
    }

    const formElementArray = [];
    for( let key in issues){
        formElementArray.push({
          id: key,
          config: issues[key]
        });
      }

    const issueTable = <div>
    <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
    <IssueSorter head="Backlog" issues={backlog[0]}></IssueSorter>    
    <IssueSorter head="Not An Issue" issues={notAnIssue[0]}></IssueSorter>    
    <IssueSorter head="UI/UX" issues={userInterface[0]}></IssueSorter>    
    <IssueSorter head="Done" issues={done[0]}></IssueSorter>    
    <IssueSorter head="Tested" issues={tested[0]}></IssueSorter>
    <Button onClick={handleOpen}>Add Issue</Button>    
    </Grid> 
    </div> 

    return(
        <div>
        {issuesArray === []? <Spinner></Spinner>:
        issueTable} 
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
        <div style={modalStyle} className={classes.paper}> 
            <form onSubmit={submitHandler}>
            <h4>Issue Creation</h4>
            {formElementArray.map(formElement =>{
            return <Input 
                key={formElement.id}
                changed={(event) => inputChangeHandler(event, formElement.id)}
                label={formElement.config.name}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
            ></Input>
          })}
            <Button color="primary" type="submit">Save</Button>
        </form>
        </div>
        </Modal>     
 </div>
    )
}

export default Issues;