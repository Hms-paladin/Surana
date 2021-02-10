import React from "react";
import tableschema from "./selectedcandidateslist.json";
import CandidateDynTable from "./selectedCandidatesTable/DynTable";
import MyVerticallyCenteredModal from "../create_resume/Sendemail.js"
import SMSsend from "../create_resume/Sendsms";
import Grid from '@material-ui/core/Grid';
import "../create_resume/previewresume.css"
import { apiurl } from "../../../App";
import { Input } from 'antd';

const { Search } = Input;

const axios = require('axios');

class SelectedCandidatesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: null,
            edituserdata: null,
            modalvisible: false,
            usertabledata: [],
            edit: null,
            modalShow: false,
            modalShowsms: false,
            search: null,
        };
    }
    setModalShow = (e) => {
        this.setState({
            modalShow: e
        })
    }
    setModalShowsms = (e) => {
        this.setState({
            modalShowsms: e
        })
    }
    sendsms = () => {
        return (
            <button className="btn btn-sm btn-success" onClick={() => this.setModalShowsms(true)}
                variant="success">Send</button>
        )
    }
    sendemail = () => {
        return (
            <button className="btn btn-sm btn-success" onClick={() => this.setModalShow(true)}
                variant="success">Send</button>
        )
    }


    //   {/* ViewData=(data)=>{
    //     return (
    //       <div>
    //     <button onClick={()=>{
    //       const getData=data;
    //       alert(JSON.stringify(getData))
    //     }}>view</button>  <button onClick={()=>{
    //       const getData=data;
    //       alert(JSON.stringify(getData))
    //     }}>hiii</button></div>)}; */}

    multideleteData = (e) => {
        let storearr = e
        let sortvalue = storearr.sort(function (a, b) {
            return a - b;
        });
        console.log(sortvalue)
        let i = 1
        for (i = 1; i < storearr.length + 1; i++) {
            this.state.usertabledata.splice(sortvalue[storearr.length - i] - 1, 1)
        }
        let j
        for (j = 0; j < this.state.usertabledata.length; j++) {
            this.state.usertabledata[j].sno = j + 1
        }
        this.setState({
            selected: [],
            usertabledata: this.state.usertabledata
        })
    }
    componentDidMount() {
        this.getTableData()
    }

    getTableData = () => {
        var self = this
        axios({
            method: 'get',
            url: apiurl + "/getcandidatelist",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(function (response) {
                console.log(response, "resdata")
                var usertabledata = []
                response.data.data.map((data, index) => {
                    usertabledata.push({
                        candidateName: data.candidate_name,
                        designation: data.Designation,
                        status: data.status === 'S' && 'Selected' || data.status === 'P' && 'Pending' || data.status === 'R' && 'Rejected',
                        date:data.DateofTest,
                        id: data.ResId,
                    })
                })
                self.setState({ usertabledata: usertabledata })
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }

    searchdata = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    render() {
        const searchdata = this.state.usertabledata.filter((data) => {
            console.log(this.state.search,"search")
            if (this.state.search === null)
                return data
            else if (
                data.candidateName !== null && data.candidateName.toLowerCase().includes(this.state.search.toLowerCase())
                || data.designation !== null && data.designation.toLowerCase().includes(this.state.search.toLowerCase())
                || data.status !== null && data.status.toLowerCase().includes(this.state.search.toString())
                || data.date !== null && data.date.toLowerCase().includes(this.state.search.toString())
            ) {
                return data
            }
        })
        console.log(this.state.usertabledata, "dskfkjdshfk")
        return (
            <div>
                <div className=" cand_tablemain">
                    <Search
                        className="w-25 cand_search"
                        placeholder="Search.."
                        enterButton
                        onChange={this.searchdata}
                    />
                    <div className="table_x_scroll">
                        <CandidateDynTable
                            tabledata={searchdata}
                            primaryKey="userId"
                            tableschema={tableschema.fields}
                            multideleteData={(data) => this.multideleteData(data)}
                            mainclassName={"userwidth"}
                            tablehead={"Selected Candidate List"}
                        />
                        <MyVerticallyCenteredModal
                            show={this.state.modalShow}
                            onHide={() => this.setModalShow(false)}
                        />
                        <SMSsend
                            show={this.state.modalShowsms}
                            onHide={() => this.setModalShowsms(false)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default SelectedCandidatesList;
