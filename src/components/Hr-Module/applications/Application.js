import React,{ Component } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Leaveapplication from './Leaveapplication';
import Permissionapplication from './PermissionApplication';
import Onduty from './OnDuty';
import Leaveapplication_cep from './Leaveapplication_cep';
import CenteredTabs from "../../../tabcomponent/tabs"
import Permissionlist from './Permissionlist';
import { getDepartment, getEmployees, getClient } from "../../../fixers/fixersAction";
import { connect } from 'react-redux';

class Application extends Component{

    constructor(props){  
        super(props);  
        this.state = {  
             currentcomponent:"leaveapplication"  
          }  
      } 
       
    componentWillMount(){
      this.props.dispatch(getDepartment())
      this.props.dispatch(getClient())
      this.props.dispatch(getEmployees())
    }

    render(){
        console.log(JSON.stringify(this.state.currentcomponent)+"currentcomponent")
        return (
            <div >
              <CenteredTabs 
              tabonelabel="Leave Application"
              tabtwolabel="Permission Application"
              tabthreelabel="On Duty Form"
              tabfourlabel="Leave Application(CEP)"
              tabfivelabel="leave and Permission List"
              componentone={<Leaveapplication dispatch={this.props.dispatch}  department={this.props.department}/>}
              componenttwo={<Permissionapplication dispatch={this.props.dispatch} />}
              componentthree={<Onduty dispatch={this.props.dispatch} clients={this.props.clients} employeeList={this.props.employees}/>}
              componentfour={<Leaveapplication_cep dispatch={this.props.dispatch} department={this.props.department}/>}
              componentfive={<Permissionlist/>}

              />
          </div>
          );
    }
   
  }

  const mapStateToProps = (state) => ({
    department: state.fixers.department,
    clients: state.fixers.clients,
    employees: state.fixers.employees
  });

  export default connect(mapStateToProps)(Application);
