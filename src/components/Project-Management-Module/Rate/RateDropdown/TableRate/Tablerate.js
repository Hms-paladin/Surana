import React from 'react';
import { Modal, Select} from 'antd';
import EnhancedTable from './table/DynTable';
import tableschema from './Tablerate.json';
const { Option } = Select;


class TableRate extends React.Component{

    state={
        usertabledata:[],
    }
    componentDidMount(){
        this.setState({
          usertabledata:
          [{
          "fieldsArray":[
          {"name":"resource","value":"Kavya"},
          {"name":"activity","value":"Hearing"},
          {"name":"court","value":"Tribunals"},                
          {"name":"hearing","value":"Effective"},
          {"name":"casevalue","value":"Above-20000"},    
          {"name":"minrate","value":"-"}, 
          {"name":"maxrate","value":"5,000"}, 
          {"name":"uom","value":"Fixed"},   
          ]
        },
        {"fieldsArray":[
            {"name":"resource","value":"Kavin"},
            {"name":"activity","value":"Filing"},
            {"name":"court","value":"Tribunals"},
            {"name":"hearing","value":"Effective"}, 
            {"name":"casevalue","value":"Above-20000"}, 
            {"name":"minrate","value":"-"}, 
            {"name":"maxrate","value":"7000"}, 
            {"name":"uom","value":"Fixed"},      
            ]
        },     
        {"fieldsArray":[
            {"name":"resource","value":"Kavin"},
            {"name":"activity","value":"Conference"},
            {"name":"emacourtil","value":"Tribunals"},
            {"name":"hearing","value":"Non-Effective"}, 
            {"name":"casevalue","value":"Above-20000"}, 
            {"name":"minrate","value":"2500"}, 
            {"name":"maxrate","value":"15,000"}, 
            {"name":"uom","value":"Per Hour"},      
            ]
        },         
      ],
        })
          }

   
    render(){

        return(
          <React.Fragment>
              <div className="assing_rate_head">
                  <h5>Assign rate</h5>
              </div>
              <div style={{margin:'20px'}}>
                  <p className="client_name_head_rate">Client Name</p>
                  <p className="client_name_rate">L&T</p>
              </div>
              <div>
                  <p className="client_name_head_rate">Rate Type</p>
                <Select style={{ width: '35%' }}>
                    <Option value="1" onClick={this.clickFunction}>Sign Up</Option>
                    <Option value="2" onClick={this.retainerFunction}>Sign In</Option>
                    <Option value="3" onClick={this.HoursFunction}>3</Option>
                    <Option value="4" onClick={this.LumpFunction}>3</Option>
                    <Option value="5" onClick={this.TableFunction}>3</Option>
                </Select>
                
              </div>

              <div className=" table_x_scroll">
                         <EnhancedTable 
                            tabledata={this.state.usertabledata} 
                            tableschema={tableschema.fields}
                        />
                    </div>

             
          </React.Fragment>
        )
    }
}
export default TableRate;