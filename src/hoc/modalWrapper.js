import React from 'react';
import { Modal, ModalHeader,ModalBody,ModalFooter, Button } from 'reactstrap';
import { modalAction } from './modalAction';
import './modalWrapper.css';

export default function modalWrapper(WrapperComponent){
    class ModalWrapper extends React.Component{
        toggle = () => {
            const { name,dispatch } = this.props;
            dispatch(modalAction({[name]:false}));
        }
        render(){
            const { isOpen,toggle,className,backdrop, modalClassName, modalHeader, modalFooter, title, btnName } = this.props;
            return(
                <React.Fragment>
                    <Modal
                        isOpen={isOpen}
                        toggle={this.toggle}
                        className={className}
                        backdrop={backdrop}
                        modalClassName={modalClassName}
                    >
                        {
                            modalHeader &&
                            <ModalHeader>
                                <div className="modal_header_title">{title}</div>
                            </ModalHeader>

                        }
                        <ModalBody>{<WrapperComponent toggle={toggle} {...this.props}/>}</ModalBody>
                        {
                            modalFooter &&
                            <ModalFooter>
                                <Button className="">{btnName}</Button>
                                <Button className="">Cancel</Button>
                            </ModalFooter>
                        }
                    </Modal>
                </React.Fragment>
            )
        }
    }
    return ModalWrapper;
}