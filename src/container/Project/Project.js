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
import CustomInput from "components/CustomInput/CustomInput";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


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

  useEffect( () => {
    axios.get("/projects")
        .then( projects => {
            setProjects(projects.data);
        })
        .catch(err => {console.log(err)})     
}, []);

    useEffect( () => {
        projects.map( (project, index) =>{
            axios.get(`/companies/${project.comapanyId}`)
            .then(res => {
                var array = [];
                array.push([project.name,res.data.name,project.createdAt.slice(0,10),project.updatedAt.slice(0,10)])
                setTableData(array);
            })
            .catch(err => {console.log(err)})
        })
    }, [projects])

  const modalHandler = () => {
    setButtonClick(!buttonClick)
  }  

  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <Grid  container>
            <Grid xs={9}><h4 className={classes.cardTitleWhite}>Project List</h4>
            <p className={classes.cardCategoryWhite}>
            List of projects assigned.
            </p>
            </Grid>
            <Grid xs={3} container  direction="row"  justify="flex-end"alignItems="flex-start">
                <Button color="info" onClick={modalHandler}>Add</Button>
            </Grid>
            </Grid>   
          </CardHeader>
          { buttonClick ?
          <CardBody>
          <GridContainer   direction="column">
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Project Name"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />
                      <div className={classes.root}>
      <Autocomplete
        id="size-small-standard"
        size="small"
        options={[{ title: 'The Shawshank Redemption', year: 1994 }]}
        getOptionLabel={(option) => option.title}
        defaultValue={[{ title: 'The Shawshank Redemption', year: 1994 }][0]}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Size small" placeholder="Favorites" />
        )}
      />
      </div>
                </GridItem>
                <GridItem>
                <Button color="primary">Save</Button>
                </GridItem>
              </GridContainer>
              </CardBody>
              :
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name","Company Name" ,"Created At" ,"Created By"]}
              tableData={tableData}
            />
          </CardBody>}

        </Card>
      </GridItem>  
    </GridContainer>
  );
}
