import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

import Input from '../../components/Input/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    minWidth: 200 
  }
}));

export default function RecipeReviewCard(props) {
  
  const classes = useStyles();
  const [expanded] = useState(false);
  const [dropDown, setDropdown] = useState({
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

const inputChangeHandler = (e, inputIdentifier) => {
    e.preventDefault()
    const updatedForm = {
    ...dropDown
    };
    const updatedFormElement = {
    ...updatedForm[inputIdentifier]
    };
    updatedFormElement.value = e.target.value;
    updatedForm[inputIdentifier] = updatedFormElement;
    setDropdown(updatedForm);
}

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
        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
        </Typography>
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
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
