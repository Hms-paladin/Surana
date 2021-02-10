import React from 'react';
import { Grid } from '@material-ui/core';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Inputnumberantd from '../../../formcomponent/inputnumberantd';
import Button from 'react-bootstrap/Button';
import ValidationLibrary from "../../../validationlibrary/validation.js";
import { apiurl } from "../../../App";
import { connect } from "react-redux";
import { getexpenseOptions, getexpenseDepartment } from "../Action/ExpenseAction";
import axios from "axios";
import {notification} from 'antd';
import './Expenseview.css';
import Inputantd from '../../../formcomponent/inputantd';

class Addexpense extends React.Component{

    constructor(props) {
        super(props);
      
        this.state = {
          changeval: true,
          expenseId:1,
          errordummy:true,
          addexpensedata:
          {'deptId':
          {'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },
        'empId':
          {'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },
        'amount':
          {'value':'',
          validation:[{'name':'required'},],
          error:null,
          errmsg:null
        },
      },
    };
    console.log("Expense", this.props);

      }
      async componentDidMount() {
        await this.props.getexpenseOptions();
        await this.props.getexpenseDepartment();

       }

       
  checkValidation=()=>{
    this.setState({ changeval: false });
    var addexpensedata=this.state.addexpensedata;
    var addexpensekeys=Object.keys(addexpensedata);
    console.log(addexpensekeys,"addexpensekeys");
    for(var i in addexpensekeys){
    var errorcheck=ValidationLibrary.checkValidation(addexpensedata[addexpensekeys[i]].value,addexpensedata[addexpensekeys[i]].validation);
    console.log(errorcheck,"errorcheck");
    addexpensedata[addexpensekeys[i]].error=!errorcheck.state;
    addexpensedata[addexpensekeys[i]].errmsg=errorcheck.msg;
    // mainvalue[addexpensekeys[i]] =addexpensedata[addexpensekeys[i]].value
    }
    var filtererr=addexpensekeys.filter((obj)=>
      addexpensedata[obj].error==true);
    console.log(filtererr.length)
    if(filtererr.length>0){
      this.setState({error:true})
    }else{
      this.setState({error:false})
      var self = this;
      console.log("fsdfjhdsfjhdsf",this.state.addexpensedata.deptId.value)

      let expData={
        "deptId":this.state.addexpensedata.deptId.value,
        "empId":this.state.addexpensedata.empId.value,
        "amount":this.state.addexpensedata.amount.value
      }

    

      axios({
        method: "post",
        url: apiurl + "/addexpense",
        data: expData
            
        
      })
        .then(function (response) {
          console.log(response.data.data, "responseresponse");
          notification.warning({
            message: `Expense Data submitted successfully`,
            duration: 3.5,
            placement: "topRight",
            className:"notification_expense"
          })
          // self.state.opemodaldata.amount.value=""
          // self.props.showclose && self.props.showclose()
          self.setState({});
        })
        .catch(function (error) {
          console.log(error, "error");
        });

    }
    this.setState({
      // mainvalue,
      addexpensedata
    })   
}

changeDynamic=(data,key)=>{
    console.log("key",key);   
    console.log("data",data);   
    var addexpensedata=this.state.addexpensedata;
     var addexpensekeys=Object.keys(addexpensedata);
     
       var errorcheck=ValidationLibrary.checkValidation(data,addexpensedata[key].validation);
        addexpensedata[key].value=data;
        addexpensedata[key].error=!errorcheck.state;
        addexpensedata[key].errmsg=errorcheck.msg;
        this.setState({addexpensedata});
         var filtererr=addexpensekeys.filter((obj)=>
        addexpensedata[obj].error==true || addexpensedata[obj].error==null );
        if(filtererr.length>0){
            this.setState({error:true,
                errordummy:false})
        }else{
            this.setState({error:false})
        }
  }

    render(){
      console.log("this.props.expense.getexpenseOpions",this.props);
      
    const { ExpenseOptions } = this.props;
        return(
            <div className ="card mt-4">
          <div className ="card-body">
          <Grid container spacing={3} className ="mt-4 m-3">
                  <Grid md={3} sm={5}>
                      <Dropdownantd className ="w-100" label="Department"
                       option={
                        this.props.expensedepartment &&
                        this.props.expensedepartment.map((val) => val.DeptName)
                      }
                        changeData={(data)=>this.changeDynamic(data,'deptId')} 
                        value={this.state.addexpensedata.deptId.value} 
                        error={this.state.addexpensedata.deptId.error} 
                        errmsg={this.state.addexpensedata.deptId.errmsg}
                        /> 
                  </Grid>
                  <Grid md={1} sm={5}/>
                  <Grid md={3} sm={5}>
                      <Dropdownantd className ="w-100" label="Name"
                       option={
                        this.props.expenseoption &&
                        this.props.expenseoption.map((val) => val.Name)
                      }
                        changeData={(data)=>this.changeDynamic(data,'empId')} 
                        value={this.state.addexpensedata.empId.value} 
                        error={this.state.addexpensedata.empId.error} 
                        errmsg={this.state.addexpensedata.empId.errmsg}
                        /> 
                  </Grid>
                  <Grid md={1} sm={5}/>
                  <Grid md={3} sm={5}>
                      <Inputantd className ="w-100" label="Amount"
                      changeData={(data)=>this.changeDynamic(data,'amount')} 
                      value={this.state.addexpensedata.amount.value} 
                      error={this.state.addexpensedata.amount.error} 
                      errmsg={this.state.addexpensedata.amount.errmsg}/> 
                  </Grid>
                </Grid>

                <Grid container  direction="row"  justify="center"  alignItems="center" className="mt-5" spacing={3}>
                    <Grid item >
                        <Button className="btnwidth btnclr" onClick={()=>this.checkValidation()}>Submit</Button>
                    </Grid>
                    <Grid item >
                        <Button className="btnwidth btnclr_outline">Cancel</Button>
                    </Grid>
                </Grid>
              </div>
              </div>
        )
    }
}
const mapStateToProps = (state) => {
  console.log("state in Expense", state);

  return {
    // addexpensedata: state.resumeReducer.addexpensedata,
    expenseoption:state.expense.getexpOptions,
    expensedepartment:state.expense.getexpDepartment
  };
};
export default connect(mapStateToProps, {
  getexpenseOptions,getexpenseDepartment
})(Addexpense);
