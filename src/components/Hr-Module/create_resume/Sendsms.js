import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from 'react-bootstrap/Modal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button'
import Inputantd from '../../../formcomponent/inputantd';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Textareaantd from '../../../formcomponent/textareaantd';
import Grid from '@material-ui/core/Grid';
import "./Sendemail.css"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ValidationLibrary from "../../../validationlibrary/validation.js";

import { apiurl } from "../../../App";

const axios = require('axios');


    class SMSsend extends React.Component{

        state={
            openinputcc:false,
            closeaddcc:true,
            openinputbcc:false,
            sendsmsdata:
                {
                'tosms':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }, { name: 'mobile' }],
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


        checkValidation = () => {
            var sendsmsdata = this.state.sendsmsdata;
            var targetkeys = Object.keys(sendsmsdata);
            console.log(targetkeys);
            for (var i in targetkeys) {
              var errorcheck = ValidationLibrary.checkValidation(sendsmsdata[targetkeys[i]].value, sendsmsdata[targetkeys[i]].validation);
              console.log(errorcheck);
              sendsmsdata[targetkeys[i]].error = !errorcheck.state;
              sendsmsdata[targetkeys[i]].errmsg = errorcheck.msg;
            }
            var filtererr = targetkeys.filter((obj) =>
              sendsmsdata[obj].error == true);
            console.log(filtererr.length)
            if (filtererr.length > 0) {
              this.setState({ error: true })
        
            } else {
              this.setState({ error: false })
              var self = this
              axios({
                  method: 'post',
                  url: apiurl + "/candidatesms",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
                  data:{
                    "mobileno":this.state.sendsmsdata.tosms.value
                  }
              })
                  .then(function (response) {
                    console.log(response, "responseresponse");
                    self.state.sendsmsdata.tosms.value=""
                    self.props.showclose && self.props.showclose()
                    self.setState({})
                  })
                  .catch(function (error) {
                  console.log(error, "error");
                  });
        
            }
            this.setState({ sendsmsdata })
          }
        
        
          changeDynamic = (data, key) => {
            console.log("key", key);
            console.log("data", data);
          //   if(key === 'uploaddoc'){
          //     this.handleChange(data)
          //     // this.state.imageUrl=this.state.imageUrl
          // }
            var sendsmsdata = this.state.sendsmsdata;
            var targetkeys = Object.keys(sendsmsdata);
        
            var errorcheck = ValidationLibrary.checkValidation(data, sendsmsdata[key].validation);
            sendsmsdata[key].value = data;
            sendsmsdata[key].error = !errorcheck.state;
            sendsmsdata[key].errmsg = errorcheck.msg;
            this.setState({ sendsmsdata });
            var filtererr = targetkeys.filter((obj) =>
              sendsmsdata[obj].error == true || sendsmsdata[obj].error == null);
            if (filtererr.length > 0) {
              this.setState({
                error: true,
                errordummy: false
              })
            } else {
              this.setState({ error: false })
            }
          }

          smscancel=()=>{
            this.state.sendsmsdata.tosms.value=""
            this.state.sendsmsdata.tosms.error=null
            this.state.sendsmsdata.tosms.errmsg=null
            this.props.showclose && this.props.showclose()
            this.setState({})
          }

        render(){
            return (
                <Modal
               
                  {...this.props}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  className=""
                  className="sendmail"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      SMS
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/* <h4>Centered Modal</h4> */}



                    <Grid container spacing={2} className="mt-2">
                  <Grid item md={2} sm={6}>
                  </Grid>
                      <Grid item md={8} sm={6}>
                          <div className="flex w-100">
                          {/* <div className="sidelabelfrom">From:</div> */}
                          <div className="w-100">
                          <Inputantd className="w-100" label="From:"/>
                          </div>
                          </div>
                      </Grid>
                  <Grid item md={2} sm={6}>
                  </Grid>   

                  <Grid item md={2} sm={6}>
                  </Grid>
                      <Grid item md={8} sm={6}>
                          <Inputantd className="w-100" label="To:" 
                            changeData={(data) => this.changeDynamic(data, 'tosms')}
                            value={this.state.sendsmsdata.tosms.value}
                            error={this.state.sendsmsdata.tosms.error}
                            errmsg={this.state.sendsmsdata.tosms.errmsg}
                          />
                      </Grid>
                  <Grid item md={2} sm={6}>
                  </Grid>    
                  
                  <Grid item md={2} sm={6}>
                  </Grid>

                  <Grid item md={5} sm={6}>
                  <FormControlLabel
                    value="end"
                    control={<Checkbox color="primary" />}
                    label="Send to All Contacts"
                    labelPlacement="end"
                    className="mt-2"
                    />
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
                           <Textareaantd className="w-100" label="Message:" />
                          </div>
                      </Grid>
                  <Grid item md={2} sm={6}>
                  </Grid> 
                  
                  <Grid item md={2} sm={6}>
                  </Grid>  

                      <Grid item md={8} sm={6}>
                          <div className="flex j_c_fl_end">
                          <div className="flex">
                          <div >
                        <Button size="sm" className="emailbtnclr" onClick={this.checkValidation}>Send</Button>
                     </div>
                       <div className="ml-1">
                  <Button size="sm" className=" emailbtnclr_outline"
                  onClick={this.smscancel}
                  >Close</Button>
                    </div>
                    </div>
                    </div>
                      </Grid>
                  <Grid item md={2} sm={6} className="mb-5">
                  </Grid> 
                 
                  </Grid>

                  </Modal.Body>
                </Modal>
              )
        }
    }

  
export default SMSsend;