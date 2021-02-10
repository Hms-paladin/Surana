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
import './DynTable.css';
import dateFormat from 'dateformat';
import ViewModel from "./Viewmodel"
import ReactModal from "../Usermastermodal"

import { Input, Row } from 'antd';
import { Modal } from 'antd';
import Deletemodal from './deletemodel';
import Toaster from '../../../../toaster/toaster';
import { apiurl } from '../../../../App';
import axios from 'axios';
import Usermastermodal from "../Usermastermodal"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
      <TableCell
      key={"sno"}
      sortDirection={orderBy === "sno" ? order : false}
      >
      {/* <Tooltip
      title="Sort"
      placement={'bottom-end'}
      enterDelay={300}
      >
      <TableSortLabel
      active={orderBy === 'sno'}
      direction={order}
      onClick={createSortHandler('sno')}
      > */}
      S.No.
      {/* </TableSortLabel>
      </Tooltip>
       */}
      </TableCell>

      {/* <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell> */}

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
      <Tooltip
      title="Sort"
      placement={'bottom-end'}
      enterDelay={300}
      >
      <TableSortLabel
      
      >
      Action
      </TableSortLabel>
      </Tooltip>
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

class DynTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order:'asc',
      orderBy:'calories',
      selected:[],
      page:0,
      dense:false,
      rowsPerPage:5,
      tabledata:this.props.tabledata,
      tableschema:props.tableschema,
      data:[],
      viewdata:"",
      editdata:"",
      addusermodal:false,
      addusergroup:false,
      deleteok:"",
      data2:"",
      filteropen:false,
      opendelete:false,
      onclickdata:"",
      Rowdatas:"",
      editClick:"",
      editopen:false,
      opentoaster:false,
      row:this.props.tabledata,
      viewRow:false,
      show:false,
      interimData:[],
      interimId:"",
      dayReportData:"",
      dayCounselData:"",
      dayOppositeData:""
    };
  }

  componentWillReceiveProps(props){
    console.log(this.props.tabledata,"propsrowdata")
    this.setState({row:this.props.tabledata})
    // this.setState({tabledata:props.tabledata});
    // this.setState({tableschema:props.tableschema});
    // var  mydata=[];
    // var count=0;
    // if(props.tabledata){
    //   for(var m in props.tabledata){
    //     var groupingheader={};
    //     for(var k in props.tabledata[m].fieldsArray){
    //       groupingheader[props.tabledata[m].fieldsArray[k].name]=props.tabledata[m].fieldsArray[k].value;
    //     }
    //     groupingheader['sno']=count+1;
    //     count+=1;
    //     mydata.push(groupingheader);
    //   }
    //   }
    //   this.setState({data:mydata});
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

    
    handleClick = (event, id) => {
      
      const { selected } = this.state;
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      this.setState({ selected: newSelected });
      // alert(JSON.stringify(this.state.selected),"newSelected")
    };

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


  editclickOpen=(data)=>{
    this.setState({
      editopen:true,
      editClick:data
    })
    console.log(data,"editdata")
  }

  setdeletemodelfalse=()=>{
    this.setState({
      opendelete:false
    })
  }

  setdeletemodelTrue = (id) => {
    this.setState({
      onclickdata:id,
      opendelete:true
    })
  }

  deleteData=(id)=>{
    axios({
      method: 'delete',
      url: apiurl + "/deleteUser",
      data:{
        "user_id":id
        }
    })
      .then( (response)=>{
          this.props.onclickok()
          this.setdeletemodelfalse()
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

 
  editOpen=(data)=>{
    this.setState({
      editdata:data
    })
    
  }

  adduseropen =(data)=>{
   
this.setState({
      // viewdata:data,
      addusermodal:true
    })
   
}

  setviemodelfalse=()=>{
    this.setState({
      addusermodal:false,
      addusergroup:false
    })
  }

  addgroupopen =(data)=>{
   
 this.setState({
       // viewdata:data,
       addusergroup:true
     })
    
 }
 


  isSelected = id => this.state.selected.indexOf(id) !== -1;


  


render(){
  console.log(this.state.tabledata,"vbmcvbfkjghkfhit")
  console.log(this.state.dayCounselData,"vbmcvbfkjghkfhit")
 
  return (
    <div className="tableMaxWidth">
    {/* <Search 
    className="w-25"
    placeholder="Search.." 
    onSearch={value => console.log(value)} 
    enterButton 
    onChange={this.searchdata}
    /> */}

    <div className={`margin_left ${this.props.mainclassName}`} style={{marginTop:"1%"}}>
    <div className="heading_left" >
    {/* <AddCircleOutlineIcon className="usergrp_addicon" onClick={()=>this.addgroupopen()}/> */}

      <Paper className="paper">
      <EnhancedTableToolbar numSelected={this.state.selected.length} 
      sendcallback={()=>this.deleteselectedcheckbox(this.state.selected)}
      headprops={this.props.tablehead}
         />
        <div className="tableWrapper">
          <Table
            className="table Table_Align"
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
                  const isSelected = this.isSelected(row.id);
                  console.log(row.id,"isSelected")
                  return (
                    <>
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      selected={isSelected}
                    >
                      
                      <TableCell className="Createres_tablecell">
                        {this.state.rowsPerPage * this.state.page -1 +index +2}
                      </TableCell>



                      {[row].map(((data,index)=>{
                          console.log(data,"tyu")
                          var keys=Object.keys(data)

                          var arrval=[]
                          for(var m=0;m<keys.length-1;m++){
                            arrval.push(<TableCell key={data.id+""+m} onClick={()=>this.checkdata(row.id)}>{data[keys[m]]}</TableCell>)
                          }
                          return arrval
                        })
                        )}


                     {/* <TableCell align="left" >
                      <Tooltip title="view" placement="right" enterDelay={300}>
                        <VisibilityIcon className="sethover_background" 
                        onClick={(e)=>this.viewopen(row.id)}
                        />
                        </Tooltip>
                      </TableCell> */}
                      <TableCell align="left" style={{paddingLeft:"10px"}}>{
                        <div className={"dis_flex"}>
                          {this.props.editclose==="editicon"?null:
                          <Tooltip title="Edit" placement="left" enterDelay={300}>
                        <EditIcon className="sethover_background"                     
                        // onClick={(e)=>this.adduseropen(row.id,row)}
                        onClick={(e)=>this.props.editOpen(row.id,row)}
                        />
                        </Tooltip>}
                        {this.props.deleteclose==="deleteicon"?null:
                        <Tooltip title="Delete" placement="right" enterDelay={300}>
                        <DeleteIcon className="sethover_background"
                        onClick={(e)=>this.setdeletemodelTrue(row.id,row)}
                        />
                        </Tooltip>
                        }
                        </div>
                        }</TableCell>
                      </TableRow>
                      <TableRow className="w-100 Dayreport_tablerow">
                          <TableCell colSpan={12}>
                            {row.id === this.state.viewRow }
                          </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              
            </TableBody>
          </Table>
        

          {this.state.addusermodal?
          <ViewModel modalopen={true}
          onclickok={this.setviemodelfalse}
          viewdata={this.state.viewdata}
          modelclassName={"nonebtnmodel unblockView"}
          />
          :null}
          
          {this.state.opendelete?
          <Deletemodal modalopen={true}
          onCancel={this.setdeletemodelfalse}
          deleterow={()=>this.deleteData(this.state.onclickdata)}
          />
          :null}

          {/* {this.state.editopen?
           <ViewModel modalopen={true} editData={this.state.editClick} />
          :null
          } */}

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

export default DynTable;