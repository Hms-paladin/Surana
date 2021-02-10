import React from 'react';
import EnhancedTable from "../../table/DynTable";
import Clientschema from  './Clientschema.json';

class ClientList extends React.Component{
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
      componentDidMount(){
      this.setState({
        usertabledata:
        [{
        "fieldsArray":[{"name":"id","value":1},{"name":"agendaID","value":201},
        {"name":"name","value":"Monish"},
        {"name":"designation","value":"Trainee"},
         {"name":"email","value":"monish@gmail.com"},
        {"name":"mobile","value":"9230522355"},
        {"name":"empId","value":1},
        {"name":"mas_employee_empId","value":1},
        {"name":"mas_employee_empFirstName","value":"Sibin Antony"},
        ]
      },
      {
        "fieldsArray":[{"name":"id","value":2},{"name":"agendaID","value":202},
        {"name":"name","value":"Ashwin"},
        {"name":"designation","value":"Trainee"},
        {"name":"email","value":"ashwin@gmail.com"},
        {"name":"mobile","value":"8561347801"},
        {"name":"empId","value":1},
        {"name":"mas_employee_empId","value":1},
        {"name":"mas_employee_empFirstName","value":"Sibin Antony"},
        ]
      },
      {
        "fieldsArray":[{"name":"id","value":3},{"name":"agendaID","value":203},
        {"name":"name","value":"Syed"},
        {"name":"designation","value":"Trainee"},
        {"name":"email","value":"syed@gmail.com"},
        {"name":"mobile","value":"7238130546"},
        {"name":"empId","value":1},
        {"name":"mas_employee_empId","value":1},
        {"name":"mas_employee_empFirstName","value":"Sibin Antony"},
        ]
      },
      {
        "fieldsArray":[{"name":"id","value":4},{"name":"agendaID","value":204},
        {"name":"name","value":"Ranjith"},
        {"name":"designation","value":"Trainee"},
        {"name":"email","value":"ranjith@gmail.com"},
        {"name":"mobile","value":"7152000045"},
        {"name":"empId","value":1},
        {"name":"mas_employee_empId","value":1},
        {"name":"mas_employee_empFirstName","value":"Sibin Antony"},
        ]
      },
      {
        "fieldsArray":[{"name":"id","value":5},{"name":"agendaID","value":205},
        {"name":"name","value":"Suriya"},
        {"name":"designation","value":"Trainee"},
        {"name":"email","value":"suriya@gmail.com"},
        {"name":"mobile","value":"8135496500"},
        {"name":"empId","value":1},
        {"name":"mas_employee_empId","value":1},
        {"name":"mas_employee_empFirstName","value":"Sibin Antony"},
        ]
      },
      {
        "fieldsArray":[{"name":"id","value":6},{"name":"agendaID","value":206},
        {"name":"name","value":"Priya"},
        {"name":"designation","value":"Trainee"},
        {"name":"email","value":"priya@gmail.com"},
        {"name":"mobile","value":"9982031722"},
        {"name":"empId","value":1},
        {"name":"mas_employee_empId","value":1},
        {"name":"mas_employee_empFirstName","value":"Sibin Antony"},
        ]
      }
    ],
      })
        }

    render(){
        return(
                <div className="mt-5">
                    <EnhancedTable 
                    tabledata={this.state.usertabledata} 
                    primaryKey="userId" 
                    tableschema={Clientschema.fields}  />
                </div>
        )
    }
  }

export default ClientList;