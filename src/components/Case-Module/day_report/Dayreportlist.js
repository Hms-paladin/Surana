import React from "react";
import DayreportSchema from "./DayreportSchema.json";
import EnhancedTable from "./table/DynTable";
import Dropdownantd from '../../../formcomponent/dropdownantd';
import { Modal } from 'antd';
import DayreportModal from "./DayreportModal";
import axios from 'axios';
import { apiurl } from '../../../App';
import { getEmployees } from '../../../fixers/fixersAction';
import { connect } from "react-redux";

class Dayreportlist extends React.Component{

    constructor(props) {
        super(props);
      
        this.state = {
          userdata:null,
          edituserdata:null,
          modalvisible:false,
          usertabledata:[],
          edit:null,
          modalShow:false,
          modalShowsms:false,
          visible:false,
          councel:null,
          interimId:[]
        };
      }

      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      setModalShow=(e)=>{
        this.setState({
            modalShow:e
        })
    }

    ViewDataview = (data) => {
      this.setState({
        viewdata:data,
        visible: true,
      });
    };

    setModalShowsms=(e)=>{
      this.setState({
        modalShowsms:e
      })
  }

  ViewData=(data)=>{
    return (
      <div>
    <button onClick={()=>{}}>view</button>
    <button onClick={()=>{}}>hiii</button></div>)};
  
    deleteData=(e)=>{
        this.state.usertabledata.splice(e.sno-1,1)
        var i
        for (i = 0; i < this.state.usertabledata.length; i++){
          this.state.usertabledata[i].sno=i+1
        }
        this.setState({usertabledata:this.state.usertabledata})
      }

      multideleteData=(e)=>{
        let storearr=e
        let sortvalue=storearr.sort(function(a, b){
          return a - b;
      });
        console.log(sortvalue)
        
        let i=1
        for(i=1;i<storearr.length+1;i++){
          this.state.usertabledata.splice(sortvalue[storearr.length-i]-1,1)
        }
    
        let j
        for (j = 0; j < this.state.usertabledata.length; j++){
          this.state.usertabledata[j].sno=j+1
        }
    
        this.setState({
          selected:[],
          usertabledata:this.state.usertabledata
        })
      }
      
      changeDynamic=(data,key,event)=>{
        event.stopPropagation();
        console.log(key,"key")
        this.setState({
          [key]:data
        })
        this.getmethod()
      }

      async componentWillMount(){
        await this.props.getEmployees();         
      }

      componentDidMount(){
        this.getmethod()
      }
      getmethod=()=>{
      var self = this
      axios({
        method: 'get',
        url: apiurl + "/viewdayreport",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          console.log(response.data.data,"resdata")
          var usertabledata = []
          response.data.data.map((data,index)=>{
            console.log(self.state["client_name"+index],"clientinside")
            usertabledata.push({
              courtcaseno:(<div className="dayreport_caseno" >{data.CourtCaseNo}</div>),
              clientname:data.ClientName,
              dra:data.DRAname,
              ddra:data.DDRA1name,
              councelassigned:(<Dropdownantd className="w-50 dayreport_dropdown" 
              value={self.state["client_name"+index]?self.state["client_name"+index]:data.CounselAssigned}
              changeData={(data) => self.changeDynamic(data, "client_name"+index)}
              option={self.props.counselassigned && self.props.counselassigned.map((val)=>val.EmpFirstName)}
              />),                
              id:data.DayreportId
              // id:data.InterimId,
             
           
              
            })  
            self.setState({interimId:response.data.data})
           

          })

          self.setState({usertabledata:usertabledata})
         
         
        })
        .catch(function (error) {
          console.log(error, "error");
        });
       
         }

  

    render(){
      console.log(this.state.usertabledata,"interimId")
    
        return(
            <div>

              <div className="table_x_scroll">
                        <EnhancedTable 
                        editData={(data)=>this.editData(data)} 
                        deleteData={(data)=>this.deleteData(data)} 
                        tabledata={this.state.usertabledata} 
                        primaryKey="userId" 
                        tableschema={DayreportSchema.fields} 
                        multideleteData={(data)=>this.multideleteData(data)}
                        editclose={"editicon"}
                        mainclassName={"userwidth"}
                        tablehead={"Day Report View"}
                        interimIdData={this.state.interimId}

                        />

            </div>  
            <Modal   className ="dayreportmodal_width"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          
        >

         < DayreportModal/>

        </Modal>              
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  console.log("stateeee", state);
  return {    
    counselassigned:state.fixers.employees,
  };
};
export default connect(mapStateToProps, {  
  getEmployees
})(Dayreportlist);