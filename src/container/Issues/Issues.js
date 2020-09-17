import React ,{ useState, useEffect } from 'react';

import axios from '../../axios';
import IssueSorter from '../../components/IssueSorter/IssueSorter';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Input from '../../components/Input/Input';
import Button from '../../components/CustomButtons/Button';
import './issues.css';


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
    root: {
          maxWidth: 250,
          width: '100%'
        }
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
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false)
    const [issues, setIssues] = useState({
        id: {
            elementType: "id",
            value: ''
        },
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
                  {value: 'done', name: 'Done'}
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
            .catch(err => {console.log(err)},setError(true))
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
        const backlog = [];
        const notAnIssue = [];
        const userInterface = [];
        const tested = [];
        const done = [];
        issuesArray.map(issue => {
            if(issue.type === "backlog"){
                backlog.push(<IssueSorter
                    key={issue._id}
                    type={issue.type}
                    issueName={issue.title}
                    issueNumber={issue.taskNumber}
                    clicked={() => editHandler(issue)}
                    ></IssueSorter>
                    )
            } else if(issue.type === "notAnIssue"){
                notAnIssue.push(<IssueSorter
                    key={issue._id}
                    id={issue._id}
                    type={issue.type}
                    issueName={issue.title}
                    issueNumber={issue.taskNumber}
                    clicked={() => editHandler(issue)}
                    ></IssueSorter>)
            } else if(issue.type === "UI/UX"){
                userInterface.push(<IssueSorter
                    key={issue._id}
                    id={issue._id}
                    type={issue.type}
                    issueName={issue.title}
                    issueNumber={issue.taskNumber}
                    clicked={() => editHandler(issue)}
                    ></IssueSorter>)
            } else if(issue.type === "tested"){
                tested.push(<IssueSorter
                    key={issue._id}
                    id={issue._id}
                    type={issue.type}
                    issueName={issue.title}
                    issueNumber={issue.taskNumber}
                    clicked={() => editHandler(issue)}
                    ></IssueSorter>)
            } else if(issue.type === "done"){
                done.push(<IssueSorter
                    key={issue._id}
                    id={issue._id}
                    type={issue.type}
                    issueName={issue.title}
                    issueNumber={issue.taskNumber}
                    clicked={() => editHandler(issue)}
                    ></IssueSorter>)
            }  
            setBacklog(backlog) 
            setNotAnIssue(notAnIssue) 
            setUserInterface(userInterface)
            setTested(tested)
            setDone(done)   
        })
    }, [issuesArray])

    const editHandler = (issue) => {
        handleOpen();
        setEdit(true)
            const updatedForm = {
            ...issues
            };
            updatedForm.id.value = issue._id;
            updatedForm.name.value = issue.name;
            updatedForm.projectId.value = issue.projectId;
            updatedForm.title.value = issue.type;
            updatedForm.type.value = issue.type;
            updatedForm.taskNumber.value = issue.taskNumber;
            updatedForm.severity.value = issue.severity;
            updatedForm.assignedTo.value = issue.assignedTo;
            updatedForm.attachment.value = issue.attachment;
            updatedForm.comment.value = issue.comment;
            setIssues(updatedForm);
    }

    const editSubmitHandler = async(e) => {
        e.preventDefault()
        let updatedIssue = {
            name: issues.name.value,
            projectId: issues.projectId.value,
            title: issues.title.value,
            type: issues.type.value,
            taskNumber: issues.taskNumber.value,
            severity: issues.severity.value,
            assignedTo: issues.assignedTo.value,
            attachment: issues.attachment.value,
            comment: issues.comment.value
            }
            console.log(updatedIssue,"aaaaaaaaa")
            await axios.put(`/issues/${issues.id.value}`, updatedIssue)
            .then( result => {
                console.log("Issue updated succefully");
                setOpen(false)
            })
            .catch(err => {console.log(err)})
    }

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
            comment: issues.comment.value
        }
        axios.post("/issues",issue)
        .then( result => {
            console.log("Issue created succsfully");
        })
        .catch(err => {console.log(err)})
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const defaultOpen = () => {
        const updatedForm = {
            ...issues
            };
        for(let key in updatedForm){
            const updatedFormElement = {
                ...updatedForm[key]
                };
            updatedFormElement.value = " ";
            updatedForm[key] = updatedFormElement;
            setIssues(updatedForm);
        }
        setOpen(true);
    }

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
    }

    const formElementArray = [];
    for( let key in issues){
        formElementArray.push({
            id: key,
          config: issues[key]
        });
      }

    const issueTable = 
    <div className={classes.root}>
      <div className="flex-container"> 
        <div className="element">Backlog{backlog}</div>
        <div className="element">Not an Issue{notAnIssue}</div>
        <div className="element">UI/UX{userInterface}</div>
        <div className="element">Tested{tested}</div>
        <div className="element">Done{done}</div>
      </div>
        <Button onClick={defaultOpen}>Add Issue</Button>    
    </div> 

    let form =( 
        <div style={modalStyle} className={classes.paper}> 
            <form onSubmit={submitHandler}>
                <h4>{edit ? "Issue Editing" : "Issue Creation"}</h4>
                    {formElementArray.map((formElement) =>(
                    <Input
                        key={formElement.id}
                        id={formElement.id}
                        label={formElement.config.name}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => inputChangeHandler(event, formElement.id)}
                    ></Input>
                    ))}
                    {edit ? <Button color="primary" onClick={(e)=>editSubmitHandler(e)}>Save</Button>:
                    <Button color="primary" type="submit" onClick={(e)=>editSubmitHandler(e)}>Save</Button>}
            </form>
        </div>)

    return(
    <div className="app">
        {error ? issueTable: <Spinner></Spinner>} 
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            {form}
        </Modal>     
    </div>
    )
}

export default Issues;