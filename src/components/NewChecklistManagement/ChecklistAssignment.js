import React from 'react';
import './ChecklistAssignment.css';
import Dropdownantd from '../../formcomponent/dropdownantd';
import { Grid } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Select, Table,DatePicker  } from 'antd';

const { Option } = Select;
const { Column } = Table;

class ChecklistAssignment extends React.Component{
    state={
        data :[{key:1,sno:1}],
    }

    updatedata=()=>{
        if(this.state.data.length<2){
            this.setState({
                data:[{key:1,sno:1}]
               })
        }
        if(this.state.data.length>=1){
        var storevalue=this.state.data[this.state.data.length-1].key+1
        this.setState({
         data:[...this.state.data,{key:storevalue,sno:storevalue}]
        })
    }
    }
    

    deletedata=(key)=>{
        const dataSource = [...this.state.data];
        var datavalue=dataSource.filter(item => item.key !== key) 
            var i
              for (i = 0; i < datavalue.length; i++){
                datavalue[i].sno=i+1
              }
             this.setState({ data:datavalue })
            }

    render(){
        const classes = this.props;
        return(
            <React.Fragment>
                <div className ="card card_responsive mt-5">
                    <div className ="card-body">
    {/*Heading for checklist assignment  */}
                        <div>
                           <h5>Check List Assignment</h5>
                      </div>
     {/* dropdown and plus grid continer  */}

                      <Grid container spacing ={2} className ="mt-4 ml-2"> 
                        <Grid md={3} sm={5}>
                            <Dropdownantd label ="Employee" className="w-100"/>
                        </Grid>
                        <Grid md={1} sm={1}/>
                        <Grid md={3} sm={5}>
                            <Dropdownantd label ="Project / Case" className="w-100"/>
                        </Grid>
                        <Grid md={3} sm={1}/>
                        <Grid md={2} sm={1} className ="plus_icon_grid_assignment">
                           <div className = "plus_div_assignment">
                            <AddIcon onClick={this.updatedata} />
                            </div>
                        </Grid>
                    </Grid>
    {/* Table Assignment */}
               <div className="checklist_table">

                    <Table dataSource={this.state.data} pagination={false}>
                    <Column title="S.No" dataIndex="sno" key="1"/>
                    <Column
                        title="Check List Activity"
                        key="2"
                        render={()=>(
                            <Select  style={{width:200}}>                             
                    
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                            </Select>
                        )} 
                    />
                    <Column
                        title="Start Date"
                        key="3"
                        render={(index)=>(
                            <DatePicker  style={{width:200}}/>
                        )}
                    />
                    <Column
                        title="End Date"
                        key="4"
                        render={()=>(
                            <DatePicker type="number" style={{width:200}}/>
                        )}
                    />
                    <Column
                        title="View"
                        key="5"
                        render={(record)=>(
                            <>
                              <EditOutlinedIcon/>
                              <Fab aria-label="delete" className={"del_btn_kra"}>
                                    <DeleteIcon onClick={()=>this.deletedata(record.key)} />
                              </Fab>
                            </>
                      
                        )}
                    />
                </Table>
                </div>

                
                    </div>

                </div>          
            </React.Fragment> 
        )
    }
}
export default ChecklistAssignment