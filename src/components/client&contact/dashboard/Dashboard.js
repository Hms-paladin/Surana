import React from 'react';
import EnhancedTable from './table/DynTable';
import tableschema from './Dashboard.json';
import './Dashboard.css';
import { Button } from '@material-ui/core';
import Dashboard_img from "../../../images/pinfill.png";

class DashboardClient extends React.Component{
    state={
        usertabledata:[],
    }
    componentDidMount(){
        this.setState({
          usertabledata:
          [{
          "fieldsArray":[
          {"name":"invoice_no","value":"ss/23"},
          {"name":"date","value":"12 Sep 2019"},
          {"name":"amount","value":"12000"},                
          {"name":"status","value":"Paid"},
          ]
        },
        {"fieldsArray":[
            {"name":"invoice_no","value":"ss/26"},
            {"name":"date","value":"12 Sep 2019"},
            {"name":"amount","value":"12000"},
            {"name":"status","value":"Pay"}, 
            ]
        },   
        {"fieldsArray":[
          {"name":"invoice_no","value":"ss/26"},
          {"name":"date","value":"12 Sep 2019"},
          {"name":"amount","value":"12000"},
          {"name":"status","value":"Pay"}, 
          ]
      }, 
         {"fieldsArray":[
            {"name":"invoice_no","value":"ss/26"},
            {"name":"date","value":"12 Sep 2019"},
            {"name":"amount","value":"12000"},
            {"name":"status","value":"Pay"}, 
            ]
        },     
      ],
        })
          }
    render(){
        return(
            <React.Fragment>
              <div className ="card mt-5">
                <div className ="card-body">
                    <div className="dash_feedback">
                        <a style={{color:' blue'}} >FeedBack</a>
                    </div>
                    
                    <div className="d-flex">
                       <div style={{width:"50%"}}> 
                         <div className="card"  style={{marginBottom:"15px"}} >
                             <div className="card-body">
                                 <span style={{color:'blue', fontSize:15}}>Invoice</span>
                         
                             <div className="dash_tab_align ">
                                <EnhancedTable 
                                    tabledata={this.state.usertabledata} 
                                    // tabledata={searchdata}
                                    // primaryKey="userId" 
                                    tableschema={tableschema.fields}
                                    // editOpen={(id,rowdata)=>this.editClick(id,rowdata)}
                                    // deleterow={(id)=>this.deleterow(id)} 
                                    // deleteSuccessClose={this.state.deleteSuccessClose}
                                    />
                            </div>
                            <Button>View</Button>
                            </div>
                         </div>
                         <div className="card" >
                            <div className="card-body">
                            <p style={{color:'blue', fontSize:15}}>Documents</p>
                              <div className="card">
                                <div className="d-flex" style={{justifyContent:'space-between',padding:'9px'}}>
                                    <p>1. Agreement</p>
                                    <div>
                                      <a style={{color:'green'}}>Download</a>
                                    </div>
                                </div>
                              </div>  

                              <div className="card mt-3">
                                <div className="d-flex" style={{justifyContent:'space-between',padding:'9px'}}>
                                    <p>2. Lease Deed</p>
                                    <div>
                                      <a style={{color:'green'}}>Pay</a>
                                    </div>
                                </div>
                              </div> 
                            </div>
                         </div>

                         
                       </div>
                       
                       <div style={{width:"50%", marginLeft:'10px'}} > 
                       <span style={{fontSize:13}}>Key Expectations From 37th GST Council Meet</span>

                       <div className="card" >
                             <div className="card-body">
                               <div   style={{justifyContent:'center',display:'flex',marginTop:'20px'}}>
                                 <img src={Dashboard_img} style={{width:350, height:150}}></img>
                               </div>
                            </div>
                         </div>
                         <div className="d-flex" style={{justifyContent:'space-between'}}>
                            <div>
                              <p>Dr.V.Surana</p>
                            </div>
                            <div>
                              <p>14 Sep 2019</p>
                            </div>
                            
                         </div>
                     
                       <div>
                         <div className="card mt-3" >
                            <div className="card-body">
                            <p style={{color:'blue', fontSize:15}}>News</p>
                              <div className="card">
                                <div style={{justifyContent:'space-between',padding:'9px'}}>
                                    <p>Trademark Registration in Germany</p>
                                   
                                </div>
                              </div>  

                              <div className="card mt-3">
                                <div className="d-flex" style={{justifyContent:'space-between',padding:'9px'}}>

                                    <div>
                                      <p>Geo yag given to the Tanjore dolls</p>
                                    </div>
                                </div>
                              </div> 
                            </div>
                         </div>

                         </div>
                       </div>

                    </div>
                
                 
                </div>
              </div>

            </React.Fragment>
        )
    }
}
export default DashboardClient;