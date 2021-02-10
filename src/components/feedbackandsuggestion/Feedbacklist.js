
import React from 'react';
import EnhancedTable from "../../table/DynTable";
import Feedbackschema from './Feedbackschema.json';
class Feedbacklist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: null,
            edituserdata: null,
            modalvisible: false,
            usertabledata: [],
            edit: null
        };
    }
    componentDidMount() {
        this.setState({
            usertabledata:
                [{
                    "fieldsArray": [{ "name": "id", "value": 1 }, { "name": "agendaID", "value": 201 },
                    { "name": "name", "value": "Manivannan" },
                    { "name": "department", "value": "Admin" },
                    { "name": "subject", "value": "Cafeteria" },
                    { "name": "agendaToTime", "value": "2019-11-07 19:50:00" },
                    { "name": "empId", "value": 1 },
                    { "name": "mas_employee_empId", "value": 1 },
                    { "name": "mas_employee_empFirstName", "value": "Sibin Antony" },
                    ]
                },
                {
                    "fieldsArray": [{ "name": "id", "value": 2 }, { "name": "agendaID", "value": 202 },
                    { "name": "name", "value": "Bharathi" },
                    { "name": "department", "value": "Trademark" },
                    { "name": "subject", "value": "Stationery" },
                    { "name": "agendaToTime", "value": "2019-11-07 19:50:00" },
                    { "name": "empId", "value": 1 },
                    { "name": "mas_employee_empId", "value": 1 },
                    { "name": "mas_employee_empFirstName", "value": "Sibin Antony" },
                    ]
                },
                {
                    "fieldsArray": [{ "name": "id", "value": 3 }, { "name": "agendaID", "value": 203 },
                    { "name": "name", "value": "Vinay" },
                    { "name": "department", "value": "Admin" },
                    { "name": "subject", "value": "Attendance" },
                    { "name": "agendaToTime", "value": "2019-11-07 19:50:00" },
                    { "name": "empId", "value": 1 },
                    { "name": "mas_employee_empId", "value": 1 },
                    { "name": "mas_employee_empFirstName", "value": "Sibin Antony" },
                    ]
                },
                {
                    "fieldsArray": [{ "name": "id", "value": 4 }, { "name": "agendaID", "value": 204 },
                    { "name": "name", "value": "Sam" },
                    { "name": "department", "value": "Trademark" },
                    { "name": "subject", "value": "Stationery" },
                    { "name": "agendaToTime", "value": "2019-11-07 19:50:00" },
                    { "name": "empId", "value": 1 },
                    { "name": "mas_employee_empId", "value": 1 },
                    { "name": "mas_employee_empFirstName", "value": "Sibin Antony" },
                    ]
                },
                {
                    "fieldsArray": [{ "name": "id", "value": 5 }, { "name": "agendaID", "value": 205 },
                    { "name": "name", "value": "Kiruthika" },
                    { "name": "department", "value": "Admin" },
                    { "name": "subject", "value": "Attendance" },
                    { "name": "agendaToTime", "value": "2019-11-07 19:50:00" },
                    { "name": "empId", "value": 1 },
                    { "name": "mas_employee_empId", "value": 1 },
                    { "name": "mas_employee_empFirstName", "value": "Sibin Antony" },
                    ]
                },
                {
                    "fieldsArray": [{ "name": "id", "value": 6 }, { "name": "agendaID", "value": 206 },
                    { "name": "name", "value": "jefinson" },
                    { "name": "department", "value": "Admin" },
                    { "name": "subject", "value": "Attendance" },
                    { "name": "agendaToTime", "value": "2019-11-07 19:50:00" },
                    { "name": "empId", "value": 1 },
                    { "name": "mas_employee_empId", "value": 1 },
                    { "name": "mas_employee_empFirstName", "value": "Sibin Antony" },
                    ]
                }
                ],
        })
    }
    render() {
        return (
            <div>
                <EnhancedTable
                    tabledata={this.state.usertabledata}
                    primaryKey="userId"
                    tableschema={Feedbackschema.fields} />
            </div>
        )
    }
}
export default Feedbacklist;