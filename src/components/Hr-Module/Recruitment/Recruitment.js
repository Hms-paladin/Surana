import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import RecruitmentList from './RecruitmentList';
import RecruitmentAddForm from './RecruitmentAddForm';
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

class Recruitment extends React.Component {
    state = {
        listdata: [],
        value:0
    }

    listdata = (data) => {

        console.log(data, "RecruitmentAddForm")
        var listarrval = []
        data.map((data, index) => {
            listarrval.push({ name: data.Name, age: data.Age, qualification: data.Qualifyname, experience: data.Experience, id: data.ResumeID })
        })
        this.setState({ listdata: listarrval })
    }
    propsFunc = (data) => {
        this.setState({value:data})
    }
    handleChange = (event, value) => {
        this.setState({ value, tabstate: true, addvalue: this.state.addvalue + value });
      };
    render() {
        const { value } = this.state;
        return (
            // <CenteredTabs

            //     tabonelabel="Recruitment"
            //     tabtwolabel="Recruitment List"
            //     componentone={<RecruitmentAddForm listdata={(data) => this.listdata(data)} />}
            //     componenttwo={<RecruitmentList tabledata={this.state.listdata} />}

            // />
            <div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Recruitment" />
                    <Tab label="Recruitment List" />
                </Tabs>
                {value === 0 &&
                    <TabContainer>
                        <RecruitmentAddForm  propsFunc={(data)=>this.propsFunc(data)} listdata={(data) => this.listdata(data)} />
                    </TabContainer>
                }
                 {value === 1 &&
                    <TabContainer>
                        <RecruitmentList tabledata={this.state.listdata} />
                    </TabContainer>
                }
            </div>


        )
    }

}

export default Recruitment;


