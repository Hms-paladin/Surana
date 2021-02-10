import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Inputantd from '../../../../formcomponent/inputantd';
import Dropdownantd from '../../../../formcomponent/dropdownantd';
import Textareaantd from '../../../../formcomponent/textareaantd';
import Grid from '@material-ui/core/Grid';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CancelIcon from '@material-ui/icons/Cancel';
import ValidationLibrary from "../../../../validationlibrary/validation.js";
import "./Sendemail.css"
import Uploadfile from "../../create_resume/uploadfile";
import { apiurl } from "../../../../App";


const axios = require('axios');

    class MyVerticallyCenteredModal extends React.Component{

        state={
            openinputcc:false,
            closeaddcc:true,
            openinputbcc:false,
            sendmaildata:
                {
                'tomail':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }, { name: 'email' }],
                    error: null,
                    errmsg: null
                },
                'message':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },

                },
        }

        openbox=()=>{
            this.setState({
                openinputcc:!this.state.openinputcc,
                closeaddcc:!this.state.closeaddcc
            })
        }

        bccupdate=()=>{
            this.setState({
            openinputbcc:!this.state.openinputbcc,
            })
        }

        openaddbcc=()=>{
            this.setState({
                openinputbcc:!this.state.openinputbcc,
                })
        }

        sendSMS=()=>{
            
        }

        checkValidation = () => {
            var sendmaildata = this.state.sendmaildata;
            var targetkeys = Object.keys(sendmaildata);
            console.log(targetkeys);
            for (var i in targetkeys) {
              var errorcheck = ValidationLibrary.checkValidation(sendmaildata[targetkeys[i]].value, sendmaildata[targetkeys[i]].validation);
              console.log(errorcheck);
              sendmaildata[targetkeys[i]].error = !errorcheck.state;
              sendmaildata[targetkeys[i]].errmsg = errorcheck.msg;
            }
            var filtererr = targetkeys.filter((obj) =>
              sendmaildata[obj].error === true);
            console.log(filtererr.length)
            if (filtererr.length > 0) {
              this.setState({ error: true })
        
            } else {
              this.setState({ error: false })
              var self = this
              axios({
                  method: 'post',
                  url: apiurl + "/candidatemail",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
                  data:{
                      mail:this.state.sendmaildata.tomail.value,
                      text:this.state.sendmaildata.message.value
                  }
              })
                  .then(function (response) {
                    console.log(response, "responseresponse");
                    self.state.sendmaildata.tomail.value=""
                    self.state.sendmaildata.message.value=""
                    self.props.showclose && self.props.showclose()
                    self.setState({})
                  })
                  .catch(function (error) {
                  console.log(error, "error");
                  });
        
            }
            this.setState({ sendmaildata })
          }
        
        
          changeDynamic = (data, key) => {
            console.log("key", key);
            console.log("data", data);
            var sendmaildata = this.state.sendmaildata;
            var targetkeys = Object.keys(sendmaildata);
        
            var errorcheck = ValidationLibrary.checkValidation(data, sendmaildata[key].validation);
            sendmaildata[key].value = data;
            sendmaildata[key].error = !errorcheck.state;
            sendmaildata[key].errmsg = errorcheck.msg;
            this.setState({ sendmaildata });
            var filtererr = targetkeys.filter((obj) =>
              sendmaildata[obj].error === true || sendmaildata[obj].error === null);
            if (filtererr.length > 0) {
              this.setState({
                error: true,
                errordummy: false
              })
            } else {
              this.setState({ error: false })
            }
          }

          emailcancel=()=>{
            this.state.sendmaildata.tomail.value=""
            this.state.sendmaildata.tomail.error=null
            this.state.sendmaildata.tomail.errmsg=null

            this.state.sendmaildata.message.value=""
            this.state.sendmaildata.message.error=null
            this.state.sendmaildata.message.errmsg=null

            this.props.showclose && this.props.showclose()
            this.setState({})
          }

        render(){
            return (
                <Modal
                // backdrop={true}
                  {...this.props}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  className=""
                  className="sendmail"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Email
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/* <h4>Centered Modal</h4> */}



                    <Grid container spacing={2} className="mt-2">
                  <Grid item md={2} sm={6}>
                  </Grid>
                      <Grid item md={8} sm={6}>
                          <div className="flex w-100">
                          <div className="sidelabelfrom">From:</div>
                          <div className="w-100">
                          <Inputantd className="w-100"/>
                          </div>
                          </div>
                      </Grid>
                  <Grid item md={2} sm={6}>
                  </Grid>   

                  <Grid item md={2} sm={6}>
                  </Grid>
                      <Grid item md={8} sm={6}>
                          <div className="flex w-100">
                          <div className="sidelabelto">To:</div>
                          <div className="w-100">
                          <Inputantd className="w-100" 
                          changeData={(data) => this.changeDynamic(data, 'tomail')}
                          value={this.state.sendmaildata.tomail.value}
                          error={this.state.sendmaildata.tomail.error}
                          errmsg={this.state.sendmaildata.tomail.errmsg}
                          />
                          </div>
                          </div>
                      </Grid>
                  <Grid item md={2} sm={6}>
                  </Grid>  

                  {this.state.openinputcc ? 
                <React.Fragment>
                  <Grid item md={2} sm={6}>
                  </Grid>
                      <Grid item md={8} sm={6}>
                      <div className="flex w-100">
                          <div className="sidelabelcc">Cc:</div>
                          <div className="w-100">
                          <Inputantd className="w-100"/>
                          </div>
                          <div className="crosscc">
                          <CancelIcon onClick={this.openbox}/>
                          </div>
                          </div>
                      </Grid>
                  <Grid item md={2} sm={6}>
                  </Grid> 
                  </React.Fragment>
                  :null}

            {this.state.openinputbcc ? 
                <React.Fragment>
                  <Grid item md={2} sm={6}>
                  </Grid>
                      <Grid item md={8} sm={6}>
                      <div className="flex w-100">
                          <div className="sidelabelcc">Bcc:</div>
                          <div className="w-100">
                          <Inputantd className="w-100"/>
                          </div>
                          <div className="crosscc">
                          <CancelIcon onClick={this.openaddbcc}/>
                          </div>
                          </div>
                      </Grid>
                  <Grid item md={2} sm={6}>
                  </Grid> 
                  </React.Fragment>
                  :null}

               
                  <Grid item md={2} sm={6}>
                  </Grid>
                      <Grid item md={8} sm={6}>
                          <div className="ml_addcc mt-2 flex">
                          {this.state.closeaddcc ?  
                              <div onClick={this.openbox} >
                          <AddBoxIcon /><span className="ml-2">Add Cc</span>
                          </div>
                          :null}
                          {this.state.openinputbcc===false ?  
                          <div onClick={this.bccupdate}>
                          <AddBoxIcon className={`${this.state.closeaddcc?"ml-3":""}`}/>
                          <span className="ml-2">Add Bcc</span>
                          </div>
                          :null}
                          </div>
                      </Grid>
                  <Grid item md={2} sm={6}>
                  </Grid>  
                  
                  <Grid item md={7} sm={6}>
                  </Grid>
                      <Grid item md={3} sm={6}>
                          <div>
                              <Dropdownantd className="w-100" placeholder="Use a Template" />
                          </div>
                      </Grid>
                  <Grid item md={2} sm={6}>
                  </Grid>  

                  <Grid item md={2} sm={6}>
                  </Grid>
                      <Grid item md={8} sm={6}>
                          <div>
                           <Textareaantd className="w-100" label="Message:" 
                           changeData={(data) => this.changeDynamic(data, 'message')}
                           value={this.state.sendmaildata.message.value}
                           error={this.state.sendmaildata.message.error}
                           errmsg={this.state.sendmaildata.message.errmsg}
                           />
                          </div>
                      </Grid>
                  <Grid item md={2} sm={6}>
                  </Grid> 
                  
                  <Grid item md={2} sm={6}>
                  </Grid>  

                      <Grid item md={8} sm={6}>
                          <div className="flex j_c_space_bt">
                          <div >
                           <Uploadfile/>
                          </div>
                          <div className="flex">
                          <div >
                        <Button size="sm" className="emailbtnclr" onClick={this.checkValidation}>Send</Button>
                     </div>
                       <div className="ml-1">
                  <Button size="sm" className=" emailbtnclr_outline"
                  onClick={this.emailcancel}
                  >Close</Button>
                    </div>
                    </div>
                    </div>
                      </Grid>
                  <Grid item md={2} sm={6} className="mb-5">
                  </Grid> 

                 

                  </Grid>



                  </Modal.Body>
                  {/* <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                  </Modal.Footer> */}
                </Modal>
              )
        }
    }
  
    // class Emailmodel extends React.Component{
    //     state={
    //         modalShow:false
    //     }

    //     setModalShow=(e)=>{
    //         this.setState({
    //             modalShow:e
    //         })
            
    //     }

    //     render(){
    //         return (
    //             <ButtonToolbar>
    //               <Button variant="primary" onClick={() => this.setModalShow(true)}>
    //                 Launch vertically centered modal
    //               </Button>
            
    //               <MyVerticallyCenteredModal
    //                 show={this.state.modalShow}
    //                 onHide={() => this.setModalShow(false)}
    //               />
    //             </ButtonToolbar>
    //           );
    //     }
    // }
  
    
export default MyVerticallyCenteredModal;