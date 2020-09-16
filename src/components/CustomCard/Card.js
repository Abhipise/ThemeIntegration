import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '../../components/CustomButtons/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    minWidth: 200 
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}));

export default function RecipeReviewCard(props) {
  
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [dropDown] = useState({
    changeTo: {
      name: "Changed To",
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
    }
  });

  const getProps = (() => {
        console.log(props,"from card")
  })

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

// const inputChangeHandler = (e, inputIdentifier) => {
//     e.preventDefault()
//     const updatedForm = {
//     ...dropDown
//     };
//     const updatedFormElement = {
//     ...updatedForm[inputIdentifier]
//     };
//     updatedFormElement.value = e.target.value;
//     updatedForm[inputIdentifier] = updatedFormElement;
//     setDropdown(updatedForm);
// }

const formElementArray = [];
    for( let key in dropDown){
        formElementArray.push({
          id: key,
          config: dropDown[key]
        });
      }

  return (
    <Card className={classes.root} key={props.id}>
      <CardContent className={classes.card}>
      <Typography paragraph>
            {props.issueNumber}
          </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        {props.issueName}
        </Typography>
        {/* {formElementArray.map(formElement =>{
            return <Input 
                key={formElement.id}
                changed={(event) => inputChangeHandler(event, formElement.id)}
                label={formElement.config.name}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
            ></Input>
          })} */}
      </CardContent>
      <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Issue Details</Typography>
          <Typography paragraph>
            {props.issueName}
          </Typography>
          <Button  color="primary" onClick={props.clicked}>Edit</Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}
