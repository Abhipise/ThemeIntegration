import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import axios from '../../axios';
import Button from '../../components/CustomButtons/Button';
import { Grid } from "@material-ui/core";
import Input from '../../components/Input/Input';


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function Project() {

  const [projects, setProjects] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [buttonClick, setButtonClick] = useState(false);
  const [projectObject, setProjectObject] =  useState({
    projectName: {
      elementType: "input",
      elementConfig: {
          type: "text",
          placeholder : "Project Name"
      },
      value: '' 
    }, 
  companyId: {
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: ''
    }
  });

  useEffect( () => {
    axios.get("/projects")
        .then( projects => {
            setProjects(projects.data);
        })
        .catch(err => {console.log(err)})  
    axios.get("/companies")
        .then( companies => {
            projectObject.companyId.elementConfig.options = companies.data;
        })
        .catch(err => {console.log(err)})  
}, []);

    useEffect( () => {
        projects.map( async(project) =>{
          await axios.get(`/companies/${project.comapanyId}`)
            .then(res => {                
                tableData.push([project.name,res.data.name,project.createdAt.slice(0,10),project.updatedAt.slice(0,10)])
                setTableData(tableData);
            })
            .catch(err => {console.log(err)})
        })
    }, [projects,tableData])

  const createProject = (e) =>{
    e.preventDefault()
    const formData = {};
    for(let formElementIdentifier in projectObject){
      formData[formElementIdentifier] = projectObject[formElementIdentifier].value;
    }
    console.log(formData);
    axios.post("/projects",{name: formData.projectName, id: formData.companyId})
  }

  const modalHandler = () => {
    setButtonClick(!buttonClick)
  }

  const inputChangeHandler = (e, inputIdentifier) => {
    e.preventDefault()
    const updatedForm = {
      ...projectObject
    };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier]
    };
    updatedFormElement.value = e.target.value;
    updatedForm[inputIdentifier] = updatedFormElement;
    setProjectObject(updatedForm)
  }

  const formElementArray = [];
  for( let key in projectObject){
    formElementArray.push({
      id: key,
      config: projectObject[key]
    });
  } 

  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <Grid container>
            <Grid xs={9}><h4 className={classes.cardTitleWhite}>Project List</h4>
            <p className={classes.cardCategoryWhite}>
            List of projects assigned.
            </p>
            </Grid>
            <Grid xs={3} container  direction="row"  justify="flex-end"alignItems="flex-start">
                <Button color="info" onClick={modalHandler}>{buttonClick ? "Back" : "Add" }</Button>
            </Grid>
            </Grid>   
          </CardHeader>
          {buttonClick ? 
          <CardBody>
  <GridContainer direction="column">
        <form onSubmit={createProject}>
          {formElementArray.map(formElement =>{
            return <Input 
                key={formElement.id}
                changed={(event) => inputChangeHandler(event, formElement.id)}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
            ></Input>
          })}
          <Button color="primary" type="submit">Save</Button>
        </form>
  </GridContainer>
  </CardBody>: 
  <CardBody>
    <Table
    tableHeaderColor="primary"
    tableHead={["Name","Company Name" ,"Created At" ,"Created By"]}
    tableData={tableData}
    />
  </CardBody>
  }
        </Card>
      </GridItem>  
    </GridContainer>
  );
}
