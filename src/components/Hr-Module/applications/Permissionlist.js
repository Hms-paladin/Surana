import React from 'react';
import { Grid } from '@material-ui/core';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Permissiontable from './Permissiontable';
import Leaveapplicationlist from './LeaveapplicationList';
import OnDutyList from './OnDutyList';
import CepList from './CepList';

class Permissionlist extends React.Component {

    state = {
        cardval: 1
    }

    handleChange = (data) => {
        this.setState({ cardval: data })
    }

    render() {
        return (
            <React.Fragment>
                <div className="card card-min-height mt-3">
                    <div className="card card-body">
                        <Grid container spacing={2}>
                            <Grid item md={3} sm={5}>
                                <Dropdownantd
                                    changeData={(data) => this.handleChange(data)}
                                    className="w-100 mb-3"
                                    option={["Leave","Permission","On Duty","Leave Application CEP"]}
                                    value={this.state.cardval}
                                />
                            </Grid>
                        </Grid>

                        {
                            this.state.cardval === 1 &&
                            <div>
                                <Leaveapplicationlist />
                            </div>
                        }
                        {
                            this.state.cardval === 2 &&
                            <div>
                                <Permissiontable />
                            </div>
                        }
                        {
                            this.state.cardval === 3 &&
                            <div>
                                <OnDutyList />
                            </div>
                        }
                        {
                            this.state.cardval === 4 &&
                            <div>
                                <CepList />
                            </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Permissionlist;