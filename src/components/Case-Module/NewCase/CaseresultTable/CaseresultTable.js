import React from 'react';
import EnhancedTable from './casetable/DynTable'
import CaseresultSchema from './CaseresultSchemaTable.json';
import { FiUpload} from "react-icons/fi";
import './CaseresultTable.css';
import Casedetails from '../Casedetails'
import { Modal } from 'antd';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CaseresultView from './CaseresultView'

class CaseresultTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userdata:null,
            edituserdata:null,
            modalvisible:false,
            usertabledata:[],
            edit:null,
            visible: false,
            visibleresult:false
        };
      }
   

      ViewDataview = (data) => {
        this.setState({
          viewdata:data,
          visible: true,
        });
      };

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

      resultviewmodal = () => {
        this.setState({
          visibleresult: true,
        });
      };
      handleOkview = e => {
        console.log(e);
        this.setState({
          visibvisibleresultle: false,
        });
      };
    
      handleCancelview = e => {
        console.log(e);
        this.setState({
          visibleresult: false,
        });
      };
    
    

      componentDidMount(){
        this.setState({
          usertabledata:
          [{
          "fieldsArray":[{"name":"id","value":1},{"name":"agendaID","value":201},
          {"name":"casetype","value":"CC"},
          {"name":"clientname","value":"L&T"},
          {"name":"clientindustry","value":"Construction"},
          {"name":"nexthearing","value":"03 Aug 2020"},
          {"name":"casestatus","value":"open"},
          {"name":"result","value":<div className ="casedownload_icon"><FiUpload/>  <VisibilityIcon onClick ={this.resultviewmodal}/></div>}
          ]
        },
        {
          "fieldsArray":[{"name":"id","value":2},{"name":"agendaID","value":202},
          {"name":"casetype","value":"OS"},
          {"name":"clientname","value":"Wipro"},
          {"name":"clientindustry","value":"IT"},
          {"name":"nexthearing","value":"10 Aug 2020"},
          {"name":"casestatus","value":"close"},
          {"name":"result","value":<div className ="casedownload_icon"><FiUpload/>   <VisibilityIcon onClick ={this.resultviewmodal}/></div>}
          ]
        },
        {
          "fieldsArray":[{"name":"id","value":3},{"name":"agendaID","value":203},
          {"name":"casetype","value":"CC"},
          {"name":"clientname","value":"TCS"},
          {"name":"clientindustry","value":"IT"},
          {"name":"nexthearing","value":"16 Aug 2020"},
          {"name":"casestatus","value":"open"},
          {"name":"result","value":<div className ="casedownload_icon"><FiUpload/>   <VisibilityIcon onClick ={this.resultviewmodal}/></div>}
        
          ]
        },
        {
          "fieldsArray":[{"name":"id","value":4},{"name":"agendaID","value":204},
          {"name":"casetype","value":"OS"},
          {"name":"clientname","value":"Paladin"},
          {"name":"clientindustry","value":"IT"},
          {"name":"nexthearing","value":"20 July 2020"},
          {"name":"casestatus","value":"close"},
          {"name":"result","value":<div className ="casedownload_icon"><FiUpload/>   <VisibilityIcon onClick ={this.resultviewmodal}/></div>}
          ]
        },
        {
          "fieldsArray":[{"name":"id","value":5},{"name":"agendaID","value":205},
          {"name":"casetype","value":"CC"},
          {"name":"clientname","value":"TCL"},
          {"name":"clientindustry","value":"IT"},
          {"name":"nexthearing","value":"26 July 2020"},
          {"name":"casestatus","value":"close"},
          {"name":"result","value":<div className ="casedownload_icon"><FiUpload/>    
          <VisibilityIcon onClick ={this.resultviewmodal}/></div>}
          ]
        }
       

      ],
        })
          }
    render(){
        return(
            <>
            <div className="table_x_scroll caseresult_table_cardalign">
            <EnhancedTable 
            editData={(data)=>this.editData(data)} 
            deleteData={(data)=>this.deleteData(data)} 
            tabledata={this.state.usertabledata} 
            primaryKey="userId" 
            tableschema={CaseresultSchema.fields} 
            multideleteData={(data)=>this.multideleteData(data)}
            editclose={"editicon"}
            viewopen={this.ViewDataview}
            mainclassName={"userwidth"}
            tablehead={"Case"}
            />
    </div>
   
    <Modal   className ="caselist_modal_width"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}  className ="caselist_modal_width"
          
        >

         <Casedetails />

        </Modal>

        <Modal

         visible={this.state.visibleresult}
          onOk={this.handleOkview}
          onCancel={this.handleCancelview}
          footer={null}
        >
        <CaseresultView/>
        </Modal>
    </>
        )
    }
}
export default CaseresultTable;