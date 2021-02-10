import React from 'react';
import RecruiteTable from "./Recruitetable.js";
import EnhancedTable from "../../../table/DynTable";
import Recruitmentschema from  './Recruitmentschema.json';
class RecruitmentList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userdata:null,
            edituserdata:null,
            modalvisible:false,
            usertabledata:[],
            edit:null
        };
      }
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

      componentDidMount(){
      this.setState({
        usertabledata:
        [{
        "fieldsArray":[{"name":"id","value":1},{"name":"agendaID","value":201},
        {"name":"form","value":"Candidate 1"},
        {"name":"candidateName","value":"Spriya"},
        {"name":"qualification","value":"B.A,B.L"},
        {"name":"experience","value":"6"},
        ]
      },
      {
        "fieldsArray":[{"name":"id","value":2},{"name":"agendaID","value":202},
        {"name":"form","value":"Candidate 2"},
        {"name":"candidateName","value":"Suriya"},
        {"name":"qualification","value":"J.D"},
        {"name":"experience","value":"3"},
        ]
      },
      {
        "fieldsArray":[{"name":"id","value":3},{"name":"agendaID","value":203},
        {"name":"form","value":"Candidate 3"},
        {"name":"candidateName","value":"Saranya"},
        {"name":"qualification","value":"LLB"},
        {"name":"experience","value":"4"},
        ]
      },
      {
        "fieldsArray":[{"name":"id","value":4},{"name":"agendaID","value":204},
        {"name":"form","value":"Candidate 4"},
        {"name":"candidateName","value":"Ashwin"},
        {"name":"qualification","value":"S.S.M"},
        {"name":"experience","value":"5"},
        ]
      },
      {
        "fieldsArray":[{"name":"id","value":5},{"name":"agendaID","value":205},
        {"name":"form","value":"Candidate 5"},
        {"name":"candidateName","value":"Ranjith"},
        {"name":"qualification","value":"S.J.D"},
        {"name":"experience","value":"3"},
        ]
      },
   
    ],
      })
        }
    render(){
      console.log(this.props.tabledata,"tabledata")
        return(

        <div className="table_x_scroll">
          <RecruiteTable 
          // editData={(data)=>this.editData(data)} 
          // deleteData={(data)=>this.deleteData(data)} 
          tabledata={this.props.tabledata} 
          primaryKey="userId" 
          tableschema={Recruitmentschema.fields} 
          // multideleteData={(data)=>this.multideleteData(data)}
          editclose={"editicon"}
          tablehead={"Recruitment List"}
          />
          
</div>
		
        )
    }
  }
export default RecruitmentList;