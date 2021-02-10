import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import AddEmployee from './addEmployee';
import EmployeeList from './employeeList';
import { connect } from 'react-redux';
import { getDepartment } from '../../../fixers/fixersAction';


class AddEmployeeMaster extends React.Component{
    componentWillMount() {
        this.props.dispatch(getDepartment());
      }
    render(){
        return(
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="Employee List"
                    tabtwolabel="Add Employee"
                    componentone={<EmployeeList />}
                    componenttwo={<AddEmployee department={this.props.department} dispatch={this.props.dispatch}/>}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    department: state.fixers.department
})


export default connect(mapStateToProps)(AddEmployeeMaster);