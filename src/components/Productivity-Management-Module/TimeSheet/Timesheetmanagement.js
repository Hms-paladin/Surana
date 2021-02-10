import React from 'react';
import Grid from '@material-ui/core/Grid';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Calenderbox from '../../../formcomponent/calenderbox';
// import EnhancedTable from '../../../table/DynTable'
import EnhancedTable from './table/DynTable'
import tableschema from "./Timemanagementschema.json";
import { Icon, Popconfirm, message } from 'antd';
import './timesheet.css';
import { Modal } from 'antd';
import { getDepartment } from '../../../fixers/fixersAction';
import { connect } from 'react-redux';
import { getEmployeeById } from '../../Hr-Module/severance/Action';


const text="Are you sure do you want to unsubmit the time sheet?"


class Timesheetmanagement extends React.Component{
    state={
        visible:false,
        viewVisible:false,
        usertabledata:[],
        department:'',
        employeeName:''
    }
    modalOpen=()=>{
        this.setState({
            visible:true
        })
    }
    viewModalopen=()=>{
        this.setState({
            viewVisible:true
        })
    }
    handleOk=()=>{
        this.setState({
            visible:false,
            viewVisible:false
        })
    }
    handleCancel=()=>{
        this.setState({
            visible:false,
            viewVisible:false
        })
    }

    componentWillMount(){
        this.props.dispatch(getDepartment())
    }

    changeDynamic = (data, key) => {
        this.setState({
            [key]:data
        })
        if(key === "department") {
            this.state.employeeName=''
            this.props.dispatch(getEmployeeById(data))
        }
    }
    

    componentDidMount(){
        this.setState({
          usertabledata:
          [{
          "fieldsArray":[
          {"name":"name","value":"Sara"},
          {"name":"submitted","value":"Yes"},
          {"name":"date","value":"16 Oct 2019"},                
          {"name":"unsubmit","value":<div><Icon type="reload" onClick={this.modalOpen}/></div>},
          {"name":"download","value":<div className="timeicon"><span className="text-danger"><Icon type="file-pdf" /></span><span className="text-success ml-2"><Icon type="file-excel"/></span></div>},        
          ]
          
        },
        {"fieldsArray":[
            {"name":"name","value":"Syed"},
            {"name":"submitted","value":"Yes"},
            {"name":"date","value":"16 Oct 2019"},
            {"name":"unsubmit","value":<div><Icon type="reload" onClick={this.modalOpen}/></div>},
            {"name":"download","value":<div className="timeicon"><span className="text-danger"><Icon type="file-pdf" /></span><span className="text-success ml-2"><Icon type="file-excel"/></span></div>},

            ]
          
        },
        {
            "fieldsArray":[
                {"name":"name","value":"Suriya"},
                {"name":"submitted","value":"Yes"},
                {"name":"date","value":"16 Oct 2019"},
                {"name":"unsubmit","value":<div><Icon type="reload" onClick={this.modalOpen}/></div>},
                {"name":"download","value":<div className="timeicon"><span className="text-danger"><Icon type="file-pdf" /></span><span className="text-success ml-2"><Icon type="file-excel"/></span></div>},

                ]
          
        },
        {
            "fieldsArray":[
                {"name":"name","value":"Spriya"},
                {"name":"submitted","value":"Yes"},
                {"name":"date","value":"15 Oct 2019"},
                {"name":"unsubmit","value":<div><Icon type="reload" onClick={this.modalOpen}/></div>},
                {"name":"download","value":<div className="timeicon"><span className="text-danger"><Icon type="file-pdf" /></span><span className="text-success ml-2"><Icon type="file-excel"/></span></div>},

                ]
          
        },
        {
            "fieldsArray":[
                {"name":"name","value":"Ram"},
                {"name":"submitted","value":"Yes"},
                {"name":"date","value":"15 Oct 2019"},
                {"name":"unsubmit","value":<div><Icon type="reload" onClick={this.modalOpen}/></div>},
                {"name":"download","value":<div className="timeicon"><span className="text-danger"><Icon type="file-pdf" /></span><span className="text-success ml-2"><Icon type="file-excel"/></span></div>},

                ]
          
        },
        {
            "fieldsArray":[
                {"name":"name","value":"Manivannan"},
                {"name":"submitted","value":"Yes"},
                {"name":"date","value":"16 Oct 2019"},
                {"name":"unsubmit","value":<div><Icon type="reload" onClick={this.modalOpen}/></div>},
                {"name":"download","value":<div className="timeicon"><span className="text-danger"><Icon type="file-pdf" /></span><span className="text-success ml-2"><Icon type="file-excel"/></span></div>},
                ]
          
        },
        {
            "fieldsArray":[
                {"name":"name","value":"Ashwin"},
                {"name":"submitted","value":"Yes"},
                {"name":"date","value":"15 Oct 2019"},
                {"name":"unsubmit","value":<div><Icon type="reload" onClick={this.modalOpen}/></div>},
                {"name":"download","value":<div className="timeicon"><span className="text-danger"><Icon type="file-pdf" /></span><span className="text-success ml-2"><Icon  type="file-excel" /></span></div>},

                ]          
        },
      ],
        })
          }
          confirm=()=>{
              message.info('Clicked on Confirm');
          }
    render(){
        const { department, employees } = this.props;
        return(
            <React.Fragment>     
                <div className="card top_move">
                    <div className="card-body">
                        <Grid container spacing={2}>
                            <Grid item md={3} sm={5}>
                                <Dropdownantd
                                className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'department')}
                                value={this.state.department}
                                option={department && department.map(val => val.DeptName)}
                                label="Department"
                                />
                            </Grid>
                            <Grid item md={3} sm={5}>
                                <Dropdownantd
                                className="w-100"
                                option={employees && employees.map(val => val.EmpFirstName)}
                                changeData={(data) => this.changeDynamic(data, 'employeeName')}
                                value={this.state.employeeName}
                                label="Employee"
                                />
                            </Grid>
                            <Grid item md={3} sm={5}>
                                <Calenderbox
                                className="w-100"
                                label="Date"
                                />
                            </Grid>
                            <Grid item md={3} sm={5}>
                                <Calenderbox
                                className="w-100"
                                label="To"
                                />
                            </Grid>
                        </Grid>
                        <div className="table_x_scroll">
                        <EnhancedTable
                        editData={(data)=>this.editData(data)} 
                        deleteData={(data)=>this.deleteData(data)} 
                        tabledata={this.state.usertabledata} 
                        primaryKey="userId" 
                        tableschema={tableschema.fields} 
                        multideleteData={(data)=>this.multideleteData(data)}
                        editclose={"editicon"}
                        mainclassName={"userwidth"}
                        viewopen={this.viewModalopen}
                        // tablehead={"Candidateview"}
                        />
                        </div>
                        <div className="unsubmitmodelwidth">
                            <Modal
                            title="Unsubmit"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            cancelText= 'Cancel'
                            okText= 'Ok'
                            // okType= 'danger'
                            className="unsubmitmodelwidth"
                            >
                            <div className={"unsubmitcontainermodel"}>
                            <p className="text-center">Are You Sure Do You Want to Unsubit the Timesheet?</p>
                            </div>
                            </Modal>
                        </div>

                        {/* <div className="viewmodelwidth">
                            <Modal
                            title="VIEW"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            className={"viewmodelwidth"}
                            // cancelText= 'No'
                            // okText= 'Yes'
                            // okType= 'danger'
                            >
                            <div className={"Timesheet_viewcontents"}>
                                <p>{this.props.viewdata}</p>
                                <div>
                                <p>Employee Name</p>
                                <p>Submitted</p>
                                <p>Date</p>
                                </div>
                                <div>
                                <p>:</p>
                                <p>:</p>
                                <p>:</p>
                                </div>
                                <div>
                                <p>Saranya</p>
                                <p>yes</p>
                                <p>16 oct 2019</p>
                                </div>

                            </div>
                            </Modal>
                        </div> */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    department:state.fixers.department,
    employees:state.severance.employees,
})

export default connect(mapStateToProps)(Timesheetmanagement);