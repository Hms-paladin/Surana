import React from 'react'
import "./IpProject.css";
import Inputantd from '../../formcomponent/inputantd';
import Dropdownantd from '../../formcomponent/dropdownantd';
import Grid from '@material-ui/core/Grid';
// import Calenderbox from '../../formcomponent/calenderbox';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { IoMdInformationCircle } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import 'antd/dist/antd.css';
import { Popover,} from 'antd';
import {Upload,Icon} from 'antd';
import { Tooltip,} from 'antd';
// import './index.css';
// import { Upload,} from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import Upload from "../../../formcomponent/uploadAntd";
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';  
import { Table } from 'antd';
import Calenderbox from '../../formcomponent/calenderbox';
const text = <span>+ 4Days</span>;
const columns = [
    {
      title: 'Stages',
      dataIndex: 'stage',
    },
    {
      title: 'Sub Stages',
      dataIndex: 'substage',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
        title: 'Actual Date',
        dataIndex: 'actualdate',
      },
  ];
  const data = [
    {
      key: '1',
      stage: 'ER Received',
      substage: '-',
      date: '14 July 2020',
      actualdate:'14 July 2020',
    },
    {
      key: '2',
      stage: 'ER Reply',
      substage: 'Formality Check Fail Yes',
      date: '18 July 2020',
      actualdate:'18 July 2020',
    },

  ];

  const content = (
    <div>
      <p className="popover_content_edit">+ 4Days</p>
    </div>
  );
class IpProject extends React.Component{

    render(){
        return(
            <React.Fragment>
               <> 
    {/* Head Edit start */}
    <div className="card card-min-height mt-3">
        <div className="card card-body">
                    <div className="head_text_edit">
                        <h5>IP Project</h5>
                        {/* <div className="app_oppositon_edit">
                            <h6>Application</h6>
                            <h6>Opposition</h6>
                        </div> */}
                    </div>
    {/* Head Edit end */}

    {/* Grid content Start */}
    
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Dropdownantd value="Trade Mark Filing-India" className="w-25"></Dropdownantd>
                </Grid>
        </Grid>

        <Grid container spacing={2}>
                <Grid item md={4}>
                    <Inputantd label={"Client Name"} className="w-75"></Inputantd>
                </Grid>
                <Grid item md={4}>
                    <Inputantd label={"Application No"} value="8418894/79" className="w-75"></Inputantd>
                </Grid>
                <Grid item md={4}>
                    <Inputantd label={"Status"} className="w-75"></Inputantd>
                </Grid>
        </Grid>

        <Grid container spacing={2}>
                <Grid item md={4}>
                    <Inputantd label={"Mark"} className="w-75"></Inputantd>
                </Grid>
                <Grid item md={4}>
                    <Inputantd label={"Class"} className="w-75"></Inputantd>
                </Grid>

                <Grid item md={4}>
                {/* <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
                    <Inputantd label={"Upload Image"} placeholder="Upload Directory" className="upolad_text_edit"> <UploadOutlined/></Inputantd>
                </Upload> */}
                <Upload className="upload_edit">
                    <Inputantd label={"Upload Image"} placeholder="Choose File"  className="w-100 "></Inputantd>
                </Upload>
                </Grid>
        </Grid>
        <div className="border_edit"></div>
            <div className="circle_icon_par">
                    <Grid container spacing={2}>
                        <Grid item md={4}>
                            <Dropdownantd label={"Stages"} className="w-75" value="ER Reply"></Dropdownantd>
                        </Grid>
                        <Grid item md={4}>
                            <Dropdownantd label={"Sub Stages"} className="w-75" value="Formality check Fail Yes"></Dropdownantd>
                        </Grid>
                        <Grid item md={3}>
                            <Calenderbox label={"Date"} className="w-75"></Calenderbox>
                        </Grid>
                        <p className="circle_icon_edit"><AddCircleOutline className="icon_edit"/></p>
                    </Grid>
            </div>
    {/* Grid content End */}
    
    {/* Table content start */}
                <div className="table_info_par">
                    <div className="table_class">
                        <h5 className="previous_text_edit">Pervious Stages Items</h5>
                        <Table columns={columns} dataSource={data} bordered pagination={false}/>
                    </div>
                    {/* <Popover content={content}>
                        <div className="info_icon_edit"><IoMdInformationCircle></IoMdInformationCircle></div> 
                    </Popover> */}
                     {/* <div>
                            <a className="info_icon_edit" href="#" data-toggle="tooltip" data-placement="top" title="+ 4Days!"><IoMdInformationCircle /></a>
                        </div> */}
                        <div className="demo">
                            <div >
                            <Tooltip placement="topLeft" title={text} className="info_icon_edit">
                            <IoMdInformationCircle />
                            </Tooltip>
                            </div>
                            </div>
                    </div>
                </div>
    {/* Table content end */}

    </div>
        
        </>
        </React.Fragment>
        )
    }
}
export default IpProject;