import React from 'react';
import ForeignDesignApplication from '../DesignApplication/ForeignDesignApplication';
import FiledRectification from '../DesignRectification/FiledRectification';
import DefendedRectification from '../DesignRectification/DefendedRectification';
import FiledCancellation from '../DesignCancellation/FiledCancellation';
import DefendedCancellation from '../DesignCancellation/DefendedCancellation';
import Grid from '@material-ui/core/Grid';
import './designmain.css';
import DomesticDesignApplication from '../DesignApplication/DomesticDesignApplication';
import Dropdownantd from '../../../../formcomponent/dropdownantd';

class DesignMain extends React.Component{
    state={
        applicationdesign:"",
        applicationdomestic:"",

    }

    DropdownChange=(data,key)=>{
        this.props.history.push("/Home/design")
        this.setState({
            [key]:data
        })
    }

    componentDidMount(){
        const params = new URLSearchParams(window.location.search)
        const trademark = params.get("trademark")
        this.setState({
            applicationdesign:trademark==="designAppInter"?1:trademark==="designAppDomestic"?1:trademark==="designRectFil"?2:trademark==="designRectDef"?2:trademark==="designCanFil"?3:trademark==="designCanDef"?3:"",
            applicationdomestic:trademark==="designAppInter"?2:trademark==="designAppDomestic"?1:trademark==="designRectFil"?1:trademark==="designRectDef"?2:trademark==="designCanFil"?1:trademark==="designCanDef"?2:""
        })
    }

    render(){
        return(
            <>
            {/* Head Edit start */}
            <div className="card DomApp_main">
                    <div className="card card-body">
                        <div className="interfil_shade">
                        <Grid container spacing={1}>
                            <Grid item md={6} sm={5}>   
                                <div className="head_text_edit">
                                    <h5>Design</h5>                        
                                </div>
                            </Grid>
                            <Grid item md={6} sm={6} className="interfil_dropdown">
                                <Grid container spacing={1}>
                                    <Grid item md={6} sm={6} className="interfil_label">
                                        <Dropdownantd className="w-75"
                                        changeData={(data) => this.DropdownChange(data, 'applicationdesign')}
                                        value={this.state.applicationdesign}
                                        option={["Application","Rectification","Cancellation"]}
                                        />
                                    </Grid>
                                    <Grid item md={6} sm={6}>
                                        <Dropdownantd className="w-75"
                                        changeData={(data) => this.DropdownChange(data, 'applicationdomestic')}
                                        value={this.state.applicationdomestic}                            
                                        option={this.state.applicationdesign=== 1 ? ["IndiaFilling","InternationalFilling"]:["Filed","Defended"]}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        </div>
                {/* Head Edit end */}


            {
               this.state.applicationdesign=== 1 && this.state.applicationdomestic===1 &&
                    <DomesticDesignApplication/>
            }

            {
                this.state.applicationdesign=== 1 && this.state.applicationdomestic===2 &&
                <ForeignDesignApplication/>
            }

            {
                this.state.applicationdesign===2 && this.state.applicationdomestic ===1 &&
                <FiledRectification/>
            }

            {
                this.state.applicationdesign===2 && this.state.applicationdomestic === 2 &&
                <DefendedRectification/>
            }

            {
                this.state.applicationdesign=== 3 && this.state.applicationdomestic === 1 &&
                <FiledCancellation/> 
            }

            {
                this.state.applicationdesign === 3 && this.state.applicationdomestic === 2 &&
                <DefendedCancellation/>
            }


    </div>
    </div>

            </>
        )
    }
}
export default DesignMain;