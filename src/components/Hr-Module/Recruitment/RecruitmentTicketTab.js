import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import RecruitmentTicketlist from './RecruitmentTicketList';
import RecruitmentTicket from './RecruitmentTicket';
import CandidateSearchList from './candidateSearchListTable/Candidateview';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

class RecruitmentTicketTab extends React.Component {

    state = {
        listdata: [],
        value: 0

    }

    listdata = (data) => {
        console.log(data, "RecruitmentAddForm")
        var listarrval = []
        data.map((data, index) => {
            listarrval.push({ resume: data.ResumeID, name:data.Name,
                gender:data.gender === '1' ? "Male" : 'Female',
                age:data.Age,
                experience: data.Experience, department: data.DeptName, designation: data.DesigName, id: data.ResumeID })
        })
        this.setState({ listdata: listarrval })
    }
    propsFunc = (data) => {
        this.setState({ value: data })
    }
    handleChange = (event, value) => {
        this.setState({ value, tabstate: true, addvalue: this.state.addvalue + value });
    };

    render() {
        const { value } = this.state;
        return (
            <div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Generate Ticket" />
                    <Tab label="Generate Ticket List" />
                    <Tab label="Candidate Search List" />

                </Tabs>
                {value === 0 &&
                    <TabContainer>
                        <RecruitmentTicket propsFunc={(data) => this.propsFunc(data)} />
                    </TabContainer>
                }
                {value === 1 &&
                    <TabContainer>
                        <RecruitmentTicketlist propsFunc={(data) => this.propsFunc(data)} listdata={(data) => this.listdata(data)} />
                    </TabContainer>
                }
                {value === 2 &&
                    <TabContainer>
                        <CandidateSearchList propsFunc={(data) => this.propsFunc(data)} listdata={this.state.listdata} />
                    </TabContainer>
                }
            </div>

            // <CenteredTabs
            //     tabonelabel="Generate Ticket"
            //     tabtwolabel="Generate Ticket List"
            //     tabthreelabel="Candidate Search List"
            //     componentone={<RecruitmentTicket />}
            //     componenttwo={<RecruitmentTicketlist listdata={(data)=>this.listdata(data)}/>}
            //     componentthree={<CandidateSearchList listdata={this.state.listdata}/>}
            // />

        )
    }

}

export default RecruitmentTicketTab;