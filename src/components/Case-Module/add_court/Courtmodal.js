import React from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

class Courtmodal extends React.Component {

    state={
        open:true
      }

      handleClose = () => {
        this.setState({open:!this.state.open});
      };

    render(){
     const {classes} = this.props  

  return (
    <div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={this.state.open}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={this.Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Court_Name</h2>
            <p id="transition-modal-description">{this.props.courtname}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
}

export default withStyles(useStyles)(Courtmodal)