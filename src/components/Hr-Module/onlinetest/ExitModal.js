
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Redirect} from 'react-router-dom';


export default class ExitModal extends React.Component{
 
    constructor(props){
        super(props)
        this.state = {

        }
      console.log("sdfjhsdfjhdsfjhdsfjsldhkfjsdf",this.props)   
    }



  
    

     
    
    render(){
        const {buttonLabel,className} = this.props
        return(
            <div>
      <Button color="danger" onClick={""}>{buttonLabel}</Button>
      <Modal isOpen={this.props.visible} modalTransition={{ timeout: 400 }} backdropTransition={{ timeout: 400 }}
        toggle={this.props.onCloseModal} className={className}>
        <ModalHeader toggle={this.props.onCloseModal}>Exit OnlineTest</ModalHeader>
        <ModalBody>
            Do You Really Want to Exit this Online Test?This Process cannot be undone
        </ModalBody>
        <ModalFooter>
          <Button style={{backgroundColor:'rgb(15, 62, 176)',color:"#fff"}} onClick={() => this.props.history.push('/Home')} >Yes</Button>{' '}
          <Button style={{backgroundColor:'rgb(15, 62, 176)',color:"#fff"}} onClick={this.props.onCloseModal}>No</Button>
        </ModalFooter>
      </Modal>
    </div>
        )
    }
}