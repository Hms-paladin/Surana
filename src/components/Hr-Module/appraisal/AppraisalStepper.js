import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LoopIcon from '@material-ui/icons/Loop';
import CheckIcon from '@material-ui/icons/Check';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import './AppraisalStepper.css';
import Calenderbox from '../../../formcomponent/calenderbox';
import { Grid } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },

  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));
function getSteps() {
  return ['Initiation of process -HR Dept hands over to appraisee for self appraisal', 'Appraisee hands over to HOD for his appraisal'
  ,'HOD completes Appraisal and hands over to Managing Partner','Managing Partners Review' ,'Comments on Performance conveyed to Appraisee(Part 1V)',
  'Initiation of corrective action by Admin/HR','Action taken Report to Managing Partner','Managing Partner review'];
}
const QontoConnector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#784AF4',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#784AF4',
      },
    },
    line: {
      borderColor: '#EAEAF0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);
  
  const useQontoStepIconStyles = makeStyles({
    root: {
      color: 'red',
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    active: {
      color: 'red',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: 'red',
      zIndex: 1,
      fontSize: 18,
    },
  });
  
  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
      </div>
    );
  }
  
  QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
  };
  
  const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#EAEAF0',
      borderRadius: 1,
    },
  })(StepConnector);
  
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons = {
      1: < CheckIcon/>,
      2: <CheckIcon/>,
      3: < CheckIcon/>,
      4: <CheckIcon />,
      5: <LoopIcon />,
      6: <LoopIcon/>,
      7: <LoopIcon/>,
      8: <LoopIcon/>
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }
  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 35,
      height: 35,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundColor:
        '#46469B',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundColor:

        '#46469B'
    },
  });

  
  
  
  
export default function AppraisalStepper() { 
  
    

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(8);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  

  
  
  return (
      <div className ="card">
          <div className ="card-body">
          <div>
                <div className="d-flex appraisal_buttons_flex">
                    <h5>Appraisal</h5>
                    <div>
                    <Button className=" yearly_btn mr-2">Yearly</Button>
                    <Button className=" yearly_btn_bg btnclr mr-2">H-Yearly</Button>
                    <Button className=" yearly_btn_bg btnclr">Absorption</Button>
                    </div>
                   
                </div>
                <Grid container spacing={3} className ="mt-4 m-3">
                  <Grid md={2} sm={5}>
                      <Dropdownantd className ="w-100" label="Name"
                      option={["xx","yy"]}/> 
                  </Grid>
                  <Grid md={1} sm={5}/>
                  <Grid md={2} sm={5}>
                      <Dropdownantd className ="w-100" label="Department"
                      option={["xx","yy"]}/> 
                  </Grid>
                  <Grid md={1} sm={5}/>
                  <Grid md={2} sm={5}>
                      <Dropdownantd className ="w-100" label="Current Position"
                      option={["xx","yy"]}/> 
                  </Grid>
                  <Grid md={1} sm={5}/>
                  <Grid md={2} sm={5}>
                      <Dropdownantd className ="w-100" label="Since"
                      option={["xx","yy"]}/> 
                  </Grid>
                </Grid>
              </div>
          <div className="vertical_stepper d-flex">
      <div className={classes.root}>
          <div className ="time_dates_align d-flex mt-4">
            <h5 className ="ml-4">Time Lines</h5>
            <h5 className ="actual_right">Actual Dates</h5>
          </div>
          <div>
            <Stepper activeStep={activeStep} orientation="vertical" className ="mt-2">       
            {steps.map((label, index) => (
                <Step key={label} className="Stepper_align">
                <StepLabel className="Stepper_span"  StepIconComponent={ColorlibStepIcon}></StepLabel>
                <p className ="steeper_contnent_middle m-0">{label}</p>
                <div className="Stepper_Icon_view stepper_svg">
                    <div className="d-flex">
                        <div>
                        <Calenderbox placeholder={"dd-mm-yyyy"}/>
                        </div>
                    </div>
                </div>
                </Step>
            ))}
            </Stepper>
          </div>
          {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>

          </Paper>
        )}

      </div>
      
    </div>
    <div className ="submit_info_appraisal">
        <div appraisal_btn_submit >
            <Button className=" btnwidth btnclr">Submit</Button>
        </div>
        {/* <div>   
        <InfoIcon className ="icon_align_appraisal"/>

        </div> */}
    </div>             
          </div>
      </div>
 
  );
}