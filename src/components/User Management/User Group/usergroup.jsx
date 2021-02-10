import React from "react";
import EnhancedTable from "./table/DynTable";
import { Modal } from 'antd';
import UsergroupSchema from "./UsergroupSchema.json";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './usergroup.css'
import { connect } from 'react-redux';
import axios from 'axios';
import Usergroupmodal from "./Usergroupmodal";
import { apiurl } from "../../../App";

class UserGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      usertableDataState: [],
      userdata: null,
      edituserdata: null,
      modalvisible: false,
      edit: false,
      modalShow: false,
      modalShowsms: false,
      visible: false,
    };
  }

  componentDidMount(){
    this.getUserGroup()
  }

  getUserGroup = () => {
    var self = this
    axios({
      method: 'GET',
      url: apiurl + '/getAllGroup',
      Header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      var usertabledata = []
      response.data.data.map((val,index)=>{
        console.log(val,"sdsdfsdf")
        usertabledata.push({group:val.group_name,id:val.id})
      })
      self.setState({usertableDataState:usertabledata})
      self.setState({})
    }).catch((error) => {
      console.error(error)
    })
  }

  editClick=(data)=>{
    this.setState({
      visible:true,
      editClick:data
    })
    console.log(data,"editdata")
  }



  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  setModalShow = (e) => {
    this.setState({
      modalShow: e
    })
  }

  ViewDataview = (data) => {
    this.setState({
      viewdata: data,
      visible: true,
    });
  };

  setModalShowsms = (e) => {
    this.setState({
      modalShowsms: e
    })
  }


  changeDynamic = (data, key, event) => {
    // event.stopPropagation();

  }

  deleteData = (e) => {
    this.setState({ usertabledata: this.state.usertabledata })
  }


  check = () => {
    this.setState({ visible: true, edit: false })
  }


  render() {
    console.log(this.state.usertableDataState, "interimId")

    return (
      <div>

        <div className="">
          <AddCircleOutlineIcon className="usergrp_addicon" onClick={() => this.check()} />
        </div>

        <div className="table_x_scroll">
          <EnhancedTable
            deleteData={(data) => this.deleteData(data)}
            getUserGroup={()=>this.getUserGroup()}
            tabledata={this.state.usertableDataState}
            primaryKey="userId"
            tableschema={UsergroupSchema.fields}
            multideleteData={(data) => this.multideleteData(data)}
            editOpen={(id, rowdata) => this.editClick(id, rowdata)}
            mainclassName={"userwidth"}
            tablehead={"User Group"}
          />
        </div>

        {this.state.visible && <Usergroupmodal getUserGroup={()=>this.getUserGroup()} visible={this.state.visible} onclickok={this.handleOk} dispatch={this.props.dispatch} edit={this.state.edit} />}

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  usertabledata: state.userGroup.userGroup
})


export default connect(mapStateToProps)(UserGroup);