import React, { Component } from 'react';
import UsersTableSchema from  './TableLTRschema.json';
import EnhancedTable from './DynTable';


export default  class Users extends Component {
	constructor(props) {
    super(props);
  
    this.state = {userdata:null,edituserdata:null,modalvisible:false,
      usertabledata:[],
      edit:null};
  }
        showEdit=(alert1)=>{
          alert(JSON.stringify(alert1));
        }
        editData=(data)=>{
          return (
          <button onClick={()=>{
            const getData=data;
            alert(JSON.stringify(getData))
          }}>hiii</button>)};
          ViewData=(data)=>{
            return (
              <div>
            <button onClick={()=>{
              const getData=data;
              alert(JSON.stringify(getData))
            }}>view</button>  <button onClick={()=>{
              const getData=data;
              alert(JSON.stringify(getData))
            }}>hiii</button></div>)};
            

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
            {"name":"agendaTitle","value":"1"},
            {"name":"agendaDate","value":"2019-11-07"},
            {"name":"agendaFromTime","value":"2019-11-07 18:50:00"},
            {"name":"agendaToTime","value":"2019-11-07 19:50:00"},
            {"name":"empId","value":1},
            {"name":"mas_employee_empId","value":1},
            {"name":"mas_employee_empFirstName","value":"Sibin Antony"},
            {name:'Actions',value:this.ViewData({id:1})}]
          },
          {
            "fieldsArray":[{"name":"id","value":2},{"name":"agendaID","value":202},
            {"name":"agendaTitle","value":"2"},
            {"name":"agendaDate","value":"2019-11-07"},
            {"name":"agendaFromTime","value":"2019-11-07 18:50:00"},
            {"name":"agendaToTime","value":"2019-11-07 19:50:00"},
            {"name":"empId","value":1},
            {"name":"mas_employee_empId","value":1},
            {"name":"mas_employee_empFirstName","value":"Sibin Antony"},
            {name:'Actions',value:this.ViewData({id:1})}]
          },
          {
            "fieldsArray":[{"name":"id","value":3},{"name":"agendaID","value":203},
            {"name":"agendaTitle","value":"3"},
            {"name":"agendaDate","value":"2019-11-07"},
            {"name":"agendaFromTime","value":"2019-11-07 18:50:00"},
            {"name":"agendaToTime","value":"2019-11-07 19:50:00"},
            {"name":"empId","value":1},
            {"name":"mas_employee_empId","value":1},
            {"name":"mas_employee_empFirstName","value":"Sibin Antony"},
            {name:'Actions',value:this.ViewData({id:1})}]
          },
          {
            "fieldsArray":[{"name":"id","value":4},{"name":"agendaID","value":204},
            {"name":"agendaTitle","value":"4"},
            {"name":"agendaDate","value":"2019-11-07"},
            {"name":"agendaFromTime","value":"2019-11-07 18:50:00"},
            {"name":"agendaToTime","value":"2019-11-07 19:50:00"},
            {"name":"empId","value":1},
            {"name":"mas_employee_empId","value":1},
            {"name":"mas_employee_empFirstName","value":"Sibin Antony"},
            {name:'Actions',value:this.ViewData({id:1})}]
          },
          {
            "fieldsArray":[{"name":"id","value":5},{"name":"agendaID","value":205},
            {"name":"agendaTitle","value":"5"},
            {"name":"agendaDate","value":"2019-11-07"},
            {"name":"agendaFromTime","value":"2019-11-07 18:50:00"},
            {"name":"agendaToTime","value":"2019-11-07 19:50:00"},
            {"name":"empId","value":1},
            {"name":"mas_employee_empId","value":1},
            {"name":"mas_employee_empFirstName","value":"Sibin Antony"},
            {name:'Actions',value:this.ViewData({id:1})}]
          },
          {
            "fieldsArray":[{"name":"id","value":6},{"name":"agendaID","value":206},
            {"name":"agendaTitle","value":"6"},
            {"name":"agendaDate","value":"2019-11-07"},
            {"name":"agendaFromTime","value":"2019-11-07 18:50:00"},
            {"name":"agendaToTime","value":"2019-11-07 19:50:00"},
            {"name":"empId","value":1},
            {"name":"mas_employee_empId","value":1},
            {"name":"mas_employee_empFirstName","value":"Sibin Antony"},
            {name:'Actions',value:this.ViewData({id:1})}]
          },
          {
            "fieldsArray":[{"name":"id","value":7},{"name":"agendaID","value":201},
            {"name":"agendaTitle","value":"7"},
            {"name":"agendaDate","value":"2019-11-07"},
            {"name":"agendaFromTime","value":"2019-11-07 18:50:00"},
            {"name":"agendaToTime","value":"2019-11-07 19:50:00"},
            {"name":"empId","value":1},
            {"name":"mas_employee_empId","value":1},
            {"name":"mas_employee_empFirstName","value":"Sibin Antony"},
            {name:'Actions',value:this.ViewData({id:1})}]
          },
        ],
          })
			}
   

	render() {
console.log(JSON.stringify(this.state.usertabledata))
		return (
			<div className="table_x_scroll">
          <EnhancedTable 
          editData={(data)=>this.editData(data)} 
          deleteData={(data)=>this.deleteData(data)} 
          tabledata={this.state.usertabledata} 
          primaryKey="userId" 
          tableschema={UsersTableSchema.fields} 
          multideleteData={(data)=>this.multideleteData(data)}
          mainclassName={"userwidth"}
          tablehead={"User"}
          />
			</div>
		);
	}
}
