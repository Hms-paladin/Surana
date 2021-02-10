import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { lighten, makeStyles,fade } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import '../../../Hr-Module/knowledge_mangement/knowledgemgmt.css'
import dateFormat from 'dateformat';
import Modalreact from "./viewmodel"
import { Input,notification,message } from 'antd';
import { Modal } from 'antd';
import Deletemodal from './deletemodel'
import Toaster from '../../../../toaster/toaster'
import { Button } from "@material-ui/core";
import './DynTable.css'
import axios from 'axios';
import { apiurl } from "../../../../App";
import {Upload} from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import ResultView from '../ResultView'
import uploadfile from '../../../../images/uploadfile.png'
import { RepeatRounded } from '@material-ui/icons';

const { confirm } = Modal;
const { Search } = Input;


let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter,name, calories, fat, carbs, protein };
}

const rows = [
   
 
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}



function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,primaryKey } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
      <TableHead>
      <TableRow>
      {/* <TableCell
      key={"sno"}
      sortDirection={orderBy === "sno" ? order : false}
      >
      <Tooltip
      title="Sort"
      placement={'bottom-end'}
      enterDelay={300}
      >
      <TableSortLabel
      active={orderBy === 'sno'}
      direction={order}
      onClick={createSortHandler('sno')}
      >
      S.No.
      </TableSortLabel>
      </Tooltip>
      
      </TableCell> */}

      <TableCell padding="checkbox">
            {/* <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            /> */}
          </TableCell>

      {props.tableHead.length>0&&props.tableHead.filter((row) =>row.visible===true).map(row => {
        return (

          <TableCell
          key={row.key}
          numeric={row.numeric}
          padding={row.disablePadding ? 'none' : 'default'}
          sortDirection={orderBy === row.key ? order : false}
          >{row.key!=primaryKey &&
          <Tooltip
          title="Sort"
          placement={row.numeric ? 'bottom-end' : 'bottom-start'}
          enterDelay={300}
          >
          <TableSortLabel
          active={orderBy === row.key}
          direction={order}
          onClick={createSortHandler(row.key)}
          >
          {row.alias}
          </TableSortLabel>
          </Tooltip>
        }
          </TableCell>
          );
      }, this)}
      <TableCell
      key={"actions"}
      
      >
      {/* <Tooltip
      title="Sort"
      placement={'bottom-end'}
      enterDelay={300}
      >
      <TableSortLabel
      
      > */}
      Result
      {/* </TableSortLabel>
      </Tooltip> */}
      </TableCell>
      <TableCell
      key={"actions"}
      
      >
      {/* <Tooltip
      title="Sort"
      placement={'bottom-end'}
      enterDelay={300}
      >
      <TableSortLabel
      
      > */}
      View
      {/* </TableSortLabel>
      </Tooltip> */}
      </TableCell>
      <TableCell
      key={"actions"}
      
      >
      {/* <Tooltip
      title="Sort"
      placement={'bottom-end'}
      enterDelay={300}
      >
      <TableSortLabel
      
      > */}
      Action
      {/* </TableSortLabel>
      </Tooltip> */}
      </TableCell>
      </TableRow>
      </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes,headprops } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {headprops}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon onClick={props.sendcallback} />
            </IconButton>
          </Tooltip>
        ) : null
        // (
        //   <Tooltip title="Filter list">
        //     <IconButton aria-label="Filter list">
        //       <FilterListIcon />
        //     </IconButton>
        //   </Tooltip>
        // )
        }
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

class CaseTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order:'asc',
      orderBy:'calories',
      selected:[],
      page:0,
      imageUrl:"",
      dense:false,
      rowsPerPage:5,
      tabledata:props.tabledata,
      tableschema:props.tableschema,
      data:[],
      viewdata:"",
      resultId:'',
      caseDataView:"",
      counselDataView:[],
      resultScreen:"",
      viewmodel:false,
      resultmodal:false,
      deleteok:"",
      data2:"",
      filteropen:false,
      opendelete:false,
      onclickdata:"",
      opentoaster:false,
      row:this.props.tabledata,
      modalShow: false,
      fileData:"",
      closeCase:[],
      caseid:"",
      disposalNo:""
    };
  }

  componentWillReceiveProps(props){
    console.log(props.tabledata,"props.rowdata")
    this.setState({row:props.tabledata})
    }

    handleRequestSort = (event, property) => {
      const orderBy = property;
      let order = 'desc';
  
      if (this.state.orderBy === property && this.state.order === 'desc') {
        order = 'asc';
      }
  
      this.setState({ order, orderBy });
    };
  
    handleSelectAllClick = event => {
      if (event.target.checked) {
        this.setState(state => ({ selected: state.row.map(n => n.id) }));
        return;
      }
      this.setState({ selected: [] });
    };

    handleClick = (event, id,data) => {
     console.log(id,data ,"fnsjJDBvB")
      const { selected } = this.state;
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
     
     
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
        console.log(selectedIndex,id,"newSelected1")
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
        console.log(newSelected,"newSelected12")
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      if(newSelected && id){
        console.log(newSelected , id,"xcvcxbvnv")
    
        
     
        if(data=="Close"){
        this.prompting("Case Already Closed")
        newSelected=[]
        console.log(data,"cnbdfksdfsl")
        }
      }
      console.log(this.state.closeCase,id,"thisstatecloseCasepush")
      if(this.state.closeCase.find(item=> item.caseId==id)){
      // alert("")
        const filteredcase = this.state.closeCase.filter(close => close.caseId !== id)
        this.setState({closeCase:filteredcase})
        console.log(filteredcase,"thisstatecloseCasefilter")
        console.log(this.state.disposalNo,"thisstatedisposalNo")

      }else{
      
        // const min = 1;
        var max = 5000;
        var rand="";
        for(var i = 0;i<max ; i++){
          var rand= Math.floor(Math.random()*max);
          
      }

        // const rand = Math.floor(Math.random()*(max-min+1)+min);
        // alert(rand)
        // this.setState({disposalNo :rand})
      this.state.closeCase.push({"caseId":id ,"disposalNo": rand})
     
      console.log(this.state.disposalNo,"thisstatedisposalNo")

      console.log(this.state.closeCase,id,"thisstatecloseCasepush")
      }

      this.setState({ selected: newSelected ,});
     console.log(this.state.selected,"newSelected")
    };

    prompting=(description)=>{
      notification.warning({
        message: "Warning",
        description,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    };
    
    generateAlert = (description) => {
      notification.success({
        message: "Success",
        description,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    };
    alertGenerate = (description) => {
      notification.warning({
        message: "Failed",
        description,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    };

    handleSelected=(data)=>{
   
      console.log(this.state.closeCase,"thisstatecloseCaseapi")
   

      axios({
        method: 'put',
        url: apiurl+'/closecase',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
          closecase:this.state.closeCase
        }
    }).then((response) => {
     console.log(response,"ekfmknncvmbvmcxbm")
     
      if(response.data.status=="0"){
        this.generateAlert("Case Status Updated")
        this.state.selected=[]
        this.props.getCase()
      }
      if(response.data.status=="1"){
        this.generateAlert("Case Status Cannot Be Updated")
        this.props.getCase()
      }
    }).catch((error) => {
        console.log(error)
    })
      console.log(data)
      
    }
    
  handleChangePage=(event, newPage)=>{
    this.setState({page:newPage});
  }

  handleChangeRowsPerPage=(event)=>{
    this.setState({rowsPerPage:+event.target.value});
    this.setState({page:0})
  }

  handleChangeDense(event) {
    this.setState({dense:event.target.checked})
  }

  opendeletemodel=(data)=>{
    console.log(data,"CaseIdCaseId11111")
    this.setState({
      opendelete:true,
      onclickdata:data,
      // Rowdatas:fullrow
    })
  }

  setdeletemodelfalse=()=>{
    this.setState({
      opendelete:false
    })
  }

  deleterow=(data)=> {
    console.log(data,"CaseIdCaseId")
  
    axios({
      method: 'delete',
      url: apiurl+'/deletecase',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      data: {
           caseId:data
      }
  }).then((response) => {
    if(response.data.status=="1"){
      this.generateAlert("Case Deleted")
      this.props.getCase()
      this.setState({
          opendelete:false,
          
        })
    }
    if(response.data.status=="0"){
      this.alertGenerate("Case Cannot Be Deleted, As It's Marked Important")

      this.props.getCase()
      this.setState({
          opendelete:false,
          
        })
    }
  
    
     
  }).catch((error) => {
      console.log(error)
  })
   
  }



  bindDate=(date,format)=>{
    if(Number(date.getTime())) {
      return dateFormat(date,format);
    }else{
      return "Invalid Date";
    }
  }

  deleteselectedcheckbox =(e)=>{
    this.props.multideleteData&&this.props.multideleteData(e);
    this.setState({
      selected:[],
    })
  }

  viewopen=(data)=>{
    // this.getcaseDataView(data.id);
    
    console.log(data.id,"please open")
    axios({
      method: 'post',
      url: apiurl+'/viewcase',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      data: {
           caseId:data.id
      }
  }).then((response) => {
    let  CaseView=[]
    CaseView = response.data.data[0]
           console.log(response.data.data,"ekfmknncvmbvmcxbm")
           console.log(response.data.data[0].counsel,"ekfmknncvmbvmcxbm")
      this.setState({
        viewdata:data,
        viewmodel:true,
        caseDataView:CaseView,
        counselDataView:response.data.data[0].counsel,
        resultId:data.id,
        // caseDataView:response.data.data.filter((alldata)=>{return alldata.caseId===data.id })[0]
      })
     
  }).catch((error) => {
      console.log(error)
  })
    console.log(data)
    
  }

  resultview=(data)=>{
   
    console.log(data,"ncvmbmcvnbmvcn")
  
    this.setState({
      resultId:data,
      resultmodal:true

    })
  
  }




  setviemodelfalse=()=>{
    this.setState({
      viewmodel:false
    })
  }
  setresultmodal=()=>{
    this.setState({
      resultmodal:false
    })
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  dummyfunc =(id)=>{
    // alert("dummy",id)
    console.log(id,"dummyfunc")
    this.setState({
      caseid:id
    })
  }
  
  uploadFile=(e,id)=> {
    // alert("uploadfilee",id)
    console.log(e,id,"kgdjfglrjou")

    if(e.target.files.length !== 0){

    
    if ( e.target.files[0].type == "application/pdf" ) {
      console.log(e.target.files, "clinicclinicclinic");
    this.setState({
        fileData: e.target.files[0],
      
      },()=>this.resultUpload());
    }
    else {
      this.prompting("Upload File With .Pdf Format")
    }
  }
 }

 resultUpload=(data)=>{
  console.log(data,"vbmcvbfkjghkfhitsdsd")
  var formdata = new FormData();
  formdata.append("Uploadfile",this.state.fileData)
  formdata.set("case_id",this.state.caseid)
  formdata.set("upload_date",dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"))
  formdata.set("upload_time",dateFormat(new Date(), "HH:MM"))

  this.uploading(formdata)
 }

  uploading =(data)=>{
  axios({
    method: 'post',
    url: apiurl+'/uploadcaseResult',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    data: data
    
}).then((response) => {
 console.log(response,"vbmcvbfkjghkfhit")
 if(response.data.status==1){
   this.generateAlert("Case File Uploaded")
 }
   
}).catch((error) => {
    console.log(error)
})
  
}
 

render(){
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },

  };
  console.log("valuechck",this.state.selected)
  // console.log(this.state.disposalNo,"thisstatedisposalNo")
  console.log(this.state.caseid,"rennewSelected")
  console.log(this.props,"propsSelected")
  const datachange=this.state.filteropen?this.state.data2:this.state.data
  return (
    <div>
    {/* <Search 
    className="w-25"
    placeholder="Search.." 
    onSearch={value => console.log(value)} 
    enterButton 
    onChange={this.searchdata}
    /> */}

    <div className={`margin_left ${this.props.mainclassName}`} style={{marginTop:"1%"}}>
    <div className="heading_leftt" >
   
      <Paper className="paper">
      <EnhancedTableToolbar 
    
      headprops={this.props.tablehead}
         />
        <div className="tableWrapper">
          <Table
            className="table"
            aria-labelledby="tableTitle"
            size={this.state.dense ? 'small' : 'medium'}
          >
            
            <EnhancedTableHead
              tableHead={this.state.tableschema}
              numSelected={this.state.selected.length}
              order={this.state.order}
              orderBy={this.state.orderBy}
              primaryKey={this.props.primaryKey}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.row.length}

            />
            <TableBody>
              {stableSort(this.state.row, getSorting(this.state.order, this.state.orderBy))
                .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                .map((row, index) => {
                  const isSelected = this.isSelected(row.id,row.Status);
                  console.log(row.id,row.Status,"isSelectedcsdf")
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      selected={isSelected}
                    >
                      
               
                      <TableCell padding="checkbox"
                      onChange={event => this.handleClick(event, row.id,row.Status)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isSelected}
                      >
                        <Checkbox checked={isSelected} />
                      </TableCell>


                      {[row].map(((data,index)=>{
                          console.log(data,"tyu")
                          var keys=Object.keys(data)

                          var arrval=[]
                          for(var m=0;m<keys.length-1;m++){
                            arrval.push(<TableCell className="empMaster_tablecell" key={data.id+""+m}>{data[keys[m]]}</TableCell>)
                          }
                          return arrval
                        })
                        )}
                       <TableCell align="left" className="empMaster_tablecell">
                         
                      <Tooltip title="Result" placement="right" enterDelay={300}>
                      <div className="d-flex">
    
                      <div class="image-upload">
                        
                      <label for="file-input">
                          <img src={uploadfile}  onClick={() => this.dummyfunc(row.id)}/>
                      </label>
                      
                      <input id="file-input" type="file"  accept="application/pdf"
                      // onClick={()=>this.dummyfunc(row.id)} 
                      onChange={(e)=> this.uploadFile(e,row.id)} />
                  </div>



                    

                      
                        <VisibilityIcon className="sethover_background" 
                        onClick={(e)=>this.resultview(row.id)}
                        />
          
                        </div>
                        </Tooltip>
                      </TableCell>

                     <TableCell align="left" className="empMaster_tablecell">
                      <Tooltip title="view" placement="right" enterDelay={300}>
                        <VisibilityIcon className="sethover_background" 
                        onClick={(e)=>this.viewopen(row)}
                        />
                        </Tooltip>
                      </TableCell>
                      <TableCell className="empMaster_tablecell" align="left" style={{paddingLeft:"10px"}}>{
                        <div>
                          
                          {this.props.editclose==="editicon"?null:
                          <Tooltip title="Edit" placement="left" enterDelay={300}>
                        <EditIcon className="sethover_background"/>
                        </Tooltip>}
                        {this.props.deleteclose==="deleteicon"?null:
                        <Tooltip title="Delete" placement="right" enterDelay={300}>
                        <DeleteIcon className="sethover_background"
                        onClick={(e)=>this.opendeletemodel(row.id)}
                        />
                        </Tooltip>
                        }
                        </div>
                        }</TableCell>
                      </TableRow>
                  );
                })}
              
            </TableBody>
          </Table>

          {this.state.selected.length > 0 ? 
         <div style={{textAlign:"right",margin:"25px"}}>
            <Button className="case_close" onClick={event=>this.handleSelected(this.state.closeCase)}>Close Case</Button> 
            </div>: ""}

          {this.state.viewmodel?
          <Modalreact modalopen={true}
          onclickok={this.setviemodelfalse}
          viewmodel={this.state.viewmodel}
          viewdata={this.state.viewdata}
          caseDataView={this.state.caseDataView}
          counselDataView={this.state.counselDataView}
          modelclassName={"nonebtnmodel"}
          caseId={this.state.resultId}
          />:null}
          {this.state.resultmodal?
          <ResultView modalopen={true}
          generateAlert={this.generateAlert}
          onclickok={this.setresultmodal}
          caseId={this.state.resultId}
          resultScreen={this.state.resultScreen}
          modelclassName={"nonebtnmodel"}
          />
          
          :null}
          
          {this.state.opendelete?
          <Deletemodal modalopen={true}
          onclickok={this.setdeletemodelfalse}
          viewdata={this.state.viewdata}
          deleterow={()=>this.deleterow(this.state.onclickdata)}
          />
          :null}

          {this.state.opentoaster 
          && 
          <Toaster opentoaster="true" 
          vertical="top"
          horizontal="right"
          variant="success"
          message="Deleted successfully"
          delay={2000}
          
          />}
         
        </div>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.row.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActionsWrapped}
        />

      </Paper>
    </div>
    </div>
    </div>
  )
}
}

export default withStyles(styles)(CaseTable);