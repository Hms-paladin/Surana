import React from 'react';
import InternationalFiling from '../ApplicationTradeMark/InternationalFiling';
import FiledOpposition from '../OppositionTradeMark/FiledOpposition';
import './TradeMarkMain.css';
import Grid from '@material-ui/core/Grid';
import Dropdownantd from '../../../../formcomponent/dropdownantd';
import IndiaFiling from '../ApplicationTradeMark/IndiaFiling'
import TMDefendedOpposition from '../OppositionTradeMark/DefendedOpposition';



class TradeMark extends React.Component{

    state={
        TrademarkMain:null,
        TrademarkSub:null,
    }

    DropdownChange=(data,key)=>{
        this.props.history.push("/Home/Trademark")
        this.setState({
            [key]:data
        })
    }

    componentDidMount(){
        const params = new URLSearchParams(window.location.search)
        const trademark = params.get("trademark")
        this.setState({
            TrademarkMain:trademark==="domestic"?1:trademark==="international"?1:trademark==="filed"?2:trademark==="defended"?2:"",
            TrademarkSub:trademark==="domestic"?2:trademark==="international"?1:trademark==="filed"?1:trademark==="defended"?2:""
        })
    }

    render(){
            console.log(this.state.TrademarkMain,"editable")
        return(
            <>
            {/* Head Edit start */}
            <div className="card InterFiling_main">
                    <div className="card card-body">
                        <div className="interfil_shade">
                        <Grid container spacing={1}>
                            <Grid item md={6} sm={5}>   
                                <div className="head_text_edit">
                                    <h5>Trade Mark</h5>                        
                                </div>
                            </Grid>
                            <Grid item md={6} sm={6} className="interfil_dropdown">
                                <Grid container spacing={1}>
                                    <Grid item md={5} sm={6} className="interfil_label">
                                        <Dropdownantd className="w-100"
                                        changeData={(data) => this.DropdownChange(data, 'TrademarkMain')}
                                        value={this.state.TrademarkMain}
                                        option={["Application","Opposition"]}
                                        placeholder="Application"/>
                                    </Grid>
                                    <Grid item md={5} sm={6}>
                                        <Dropdownantd className="w-100"
                                        changeData={(data) => this.DropdownChange(data, 'TrademarkSub')}
                                        value={this.state.TrademarkSub}
                                        placeholder="International Filing"
                                        option={this.state.TrademarkMain=== 1 ? ["International Filing","India Filing"] :["Filed","Defended"]}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        </div>
                {/* Head Edit end */}


           {this.state.TrademarkMain===1 && this.state.TrademarkSub === 1 &&
            
            <InternationalFiling/>
            
            }
             {this.state.TrademarkMain===1 && this.state.TrademarkSub === 2 &&
            
            <IndiaFiling/>
            
            }


            {this.state.TrademarkMain===2 && this.state.TrademarkSub ===1 &&
            
            <FiledOpposition/>
            
            }

            {this.state.TrademarkMain===2 && this.state.TrademarkSub ===2 &&
            
            <TMDefendedOpposition/>
            
            }

            </div>
            </div>

            </>
        )
    }
}
export default TradeMark;