import React from "react";
import "./ChecklistModal.css";
import Button from 'react-bootstrap/Button' ;
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Dropdownantd from '../../formcomponent/dropdownantd';
import Calendarbox from "../../formcomponent/calenderbox";

class ChecklistModal extends React.Component{
    render(){
        return(
            <div className="top_move">
          <div className="">
               <FormControl component="fieldset">
                  <RadioGroup defaultValue="Daily" aria-label="gender" name="customized-radios">
              <div className="card-body flex font_bold">
                  <div className="w-50 ">
      
                   <FormControlLabel value="On Demand" control={<Radio color="primary"/>} 
                    label="On Demand" className="w-50" />

                    <FormControlLabel value="Daily" control={<Radio color="primary"/>} 
                    label="Daily" className="w-50"  />

                    <FormControlLabel value="Alternate Days" control={<Radio color="primary"/>} 
                    label="Alternate Days" className="w-50" />


                        {/* days start */}
                      <FormControl component="fieldset" className="day_checkbox">

                  <RadioGroup defaultValue="" aria-label="gender" name="customized-radios" 
                  className="checklist_ml" row>

                    <FormControlLabel value="Su" control={<Checkbox color="primary"/>} 
                    label="Su" labelPlacement="end"/>

                    <FormControlLabel value="Mo" control={<Checkbox color="primary"/>} 
                    label="Mo" labelPlacement="end"/>

                    <FormControlLabel value="Tu" control={<Checkbox color="primary"/>}
                    label="Tu" labelPlacement="end"/>


                    <FormControlLabel value="We" control={<Checkbox color="primary"/>}
                    label="We" labelPlacement="end"/>


                    <FormControlLabel value="Th" control={<Checkbox color="primary"/>}
                    label="Th" labelPlacement="end"/>


                   <FormControlLabel value="Monthly" control={<Checkbox color="primary"/>}
                  label="Fr" labelPlacement="end"/>

                    <FormControlLabel value="Sa" control={<Checkbox color="primary"/>}
                    label="Sa" labelPlacement="end"/>


                  </RadioGroup>
                </FormControl>

                {/* days end */}


                    <FormControlLabel value="Weekly" control={<Radio color="primary"/>}
                    label="Weekly" className="w-25" />

                    {/* days start */}

                    <FormControl component="fieldset" className="day_checkbox">

                    <RadioGroup defaultValue="" aria-label="gender" name="customized-radios" 
                    className="checklist_ml" row>
                      <FormControlLabel value="Su" control={<Checkbox color="primary"/>} 
                      label="Su" labelPlacement="end"/>

                      <FormControlLabel value="Mo" control={<Checkbox color="primary"/>} 
                      label="Mo" labelPlacement="end"/>

                      <FormControlLabel value="Tu" control={<Checkbox color="primary"/>}
                      label="Tu" labelPlacement="end"/>


                      <FormControlLabel value="We" control={<Checkbox color="primary"/>}
                      label="We" labelPlacement="end"/>


                      <FormControlLabel value="Th" control={<Checkbox color="primary"/>}
                      label="Th" labelPlacement="end"/>


                      <FormControlLabel value="Monthly" control={<Checkbox color="primary"/>}
                      label="Fr" labelPlacement="end"/>

                      <FormControlLabel value="Sa" control={<Checkbox color="primary"/>}
                      label="Sa" labelPlacement="end"/>


                    </RadioGroup>
                    </FormControl>

                    {/* days end */}


                    <FormControlLabel value="Fortnightly" control={<Radio color="primary"/>}
                    label="Fortnightly" className="w-25" />

                    <div className="flex checklist_ml">
                    <span className="mt-1 mr-2">Date:</span><Calendarbox breakclass="dis_none" className="w-100"
                     divclass="w-50"/>
                    </div>

                    <FormControlLabel value="Monthly" control={<Radio color="primary"/>}
                    label="Monthly" className="w-25"/>

                    <div className="flex checklist_ml">
                    <span className="mt-1 mr-2">Date:</span><Calendarbox breakclass="dis_none" className="w-100"
                     divclass="w-50"/>
                    </div>

                

                  {/* </RadioGroup>
                </FormControl> */}
                  </div>    
                  <div className="w-50 borderleft_checklistmanagement">
                  
                   
                    <FormControlLabel value="Alternate Month" control={<Radio color="primary"/>} 
                    label="Alternate Month" className=""/>

                    <div className="checklist_ml w-100 row">
                      <div className="flex w-50">
                    <span className="mt-1 mr-2">Start Month:</span>
                    <Dropdownantd breakclass="dis_none" className="w-100" divclass="w-50"/>
                    </div>
                    <div className="flex w-50">
                    <span className="mt-1 mr-2">Date:</span>
                    <Calendarbox breakclass="dis_none" className="w-100" divclass="w-50"/>
                    </div>
                    </div>


                    <FormControlLabel value="Quarterly" control={<Radio color="primary"/>} 
                    label="Quarterly" className="w-25"/>

                      <div className="checklist_ml w-100 row">
                      <div className="flex w-50">
                    <span className="mt-1 mr-2">Start Month:</span>
                    <Dropdownantd breakclass="dis_none" className="w-100" divclass="w-50"/>
                    </div>
                    <div className="flex w-50">
                    <span className="mt-1 mr-2">Date:</span>
                    <Calendarbox breakclass="dis_none" className="w-100" divclass="w-50"/>
                    </div>
                    </div>

                    <FormControlLabel value="Half yearly" control={<Radio color="primary"/>} 
                    label="Half yearly"/>

                    <div className="checklist_ml w-100 row">
                      <div className="flex w-50">
                    <span className="mt-1 mr-2">Start Month:</span>
                    <Dropdownantd breakclass="dis_none" className="w-100" divclass="w-50"/>
                    </div>
                    <div className="flex w-50">
                    <span className="mt-1 mr-2">Date:</span>
                    <Calendarbox breakclass="dis_none" className="w-100" divclass="w-50"/>
                    </div>
                    </div>

                    <FormControlLabel value="Annual" control={<Radio color="primary"/>} 
                    label="Annual" className="w-25"/>

                    <div className="checklist_ml w-100 row">
                      <div className="flex w-50">
                    <span className="mt-1 mr-2">Start Month:</span>
                    <Dropdownantd breakclass="dis_none" className="w-100" divclass="w-50"/>
                    </div>
                    <div className="flex w-50">
                    <span className="mt-1 mr-2">Date:</span>
                    <Calendarbox breakclass="dis_none" className="w-100" divclass="w-50"/>
                    </div>
                    </div>
                    
         

                    <Grid container direction="row"  justify="center"  alignItems="center"  className="mt-2 ml-2"
                spacing={3}>
                    <Grid item className="mt-4" >
                       <Button className="btnwidth btnclr">Submit</Button>
                    </Grid>
                    <Grid item className="mt-4">
                    <Button className="btnwidth btnclr_outline">Cancel</Button>
                    </Grid>
                </Grid>

                  </div>

              </div>
              </RadioGroup>
                    </FormControl>
          </div>
          </div>  
        )
    }
}

export default ChecklistModal;
