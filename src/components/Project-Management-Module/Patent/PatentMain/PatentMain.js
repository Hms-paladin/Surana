import React from 'react';
import './PatentMain.css';
import Grid from '@material-ui/core/Grid';
import Dropdownantd from '../../../../formcomponent/dropdownantd';
import DomesticPatentApplication from '../PatentApplication/DomesticPatentApplication';
import ForeignPatentApplication from '../PatentApplication/ForeignPatentApplication'
import FiledOppositionPatent from '../PatentOpposition/FiledOppositionPatent'
import PCTPatentApplication from '../PatentApplication/PCTPatentApplication'
import DefendedOppositionPatent from '../PatentOpposition/DefendedOppositionPatent'
class PatentMain extends React.Component {
    state = {
        PatentMain: "",
        PatentSub: "",
    }

    DropdownChange = (data, key) => {
        this.props.history.push("/Home/Patent")
        this.setState({
            [key]: data
        })
    }

    componentDidMount(){
        const params = new URLSearchParams(window.location.search)
        const trademark = params.get("trademark")
        this.setState({
            PatentMain:trademark==="PatentappDomestic"?1:trademark==="PatentappForeign"?1:trademark === "PatentappPCT"?1:"",
            PatentSub:trademark==="PatentappDomestic"?1:trademark==="PatentappForeign"?2:trademark === "PatentappPCT"?3:""
        })
    }

    render() {
        return (
            <>
                {/* Head Edit start */}
                <div className="card InterFiling_main">
                    <div className="card card-body">
                        <div className="interfil_shade">
                            <Grid container spacing={1}>
                                <Grid item md={6} sm={5}>
                                    <div className="head_text_edit">
                                        <h5>Patent</h5>
                                    </div>
                                </Grid>
                                <Grid item md={6} sm={6} className="interfil_dropdown">
                                    <Grid container spacing={1}>
                                        <Grid item md={5} sm={6} className="interfil_label">
                                            <Dropdownantd className="w-100"
                                                changeData={(data) => this.DropdownChange(data, 'PatentMain')}
                                                value={this.state.PatentMain}
                                                option={["Application", "Opposition"]}
                                                placeholder="Application"
                                            />
                                        </Grid>
                                        <Grid item md={5} sm={6}>
                                            <Dropdownantd className="w-100"
                                                changeData={(data) => this.DropdownChange(data, 'PatentSub')}
                                                value={this.state.PatentSub}
                                                placeholder="Domestic"
                                                option={this.state.PatentMain === 1 ? ["Domestic", "Foreign", "PCT"] : ["Filed", "Defended"]}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                        {/* Head Edit end */}


                        {this.state.PatentMain === 1 && this.state.PatentSub === 1 &&
                            <DomesticPatentApplication />
                        }
                        {
                            this.state.PatentMain === 1 && this.state.PatentSub === 2 &&
                            <ForeignPatentApplication />
                        }
                        {
                            this.state.PatentMain === 1 && this.state.PatentSub === 3 &&
                            <PCTPatentApplication />
                        }

                        {this.state.PatentMain === 2 && this.state.PatentSub === 1 &&
                            <FiledOppositionPatent />
                        }
                        {this.state.PatentMain === 2 && this.state.PatentSub === 2 &&
                            <DefendedOppositionPatent />
                        }

                    </div>
                </div>

            </>
        )
    }
}
export default PatentMain;