import React from 'react'
import { Modal, } from 'antd';
import AppraisalForm from './ApprasialForm'
import './Appraiser.css';

class AppraisalModal extends React.Component {
    state = { visible: true };

    showModal = () => {
        this.setState({
            visible: false,
        });
    };
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        return (
            <React.Fragment>
                <Modal
                    visible={this.state.visible}
                    footer={null}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    className="apprasial_modal"
                >
                    <div >
                        <h5 className="online_heading"><b>Modalities for filling up of this report: </b></h5>
                    </div>
                    <div className="contents">
                        <p>1. The HR Department will initiate this report, 15/30 days prior to the due date. </p>
                        <p>2. Part II is to be filled up by the appraisee and submitted to the appraiser.
</p>
                        <p>3. Appraiser, on completing the Part II, may meet / speak to the appraisee and, then send it to the Managing Partner
only in a closed envelope. This method is to be followed in all subsequent steps as well. </p>
                        <p>4. If the appraisee is other than the HOD, The HOD will also meet the appraisee</p>
                        <p>5. Managing Partner will go through entire appraisal & approve / offer his comments, duly conveying same to the appraisee.</p>
                        <p>6. Appropriate remedial action must be suggested in writing wherever, necessary. </p>
                        <p>7. Appraisers as well as the appraisees may feel free to give feedback on the appraisal format / process at any point of time. </p>
                    </div>

                    {/* <Grid container spacing={3}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    > */}
                    {/* <Grid item >
                            <Button onClick={this.showModal} className="mt-3 btn_space_polls">Start Test</Button>
                        </Grid> */}

                    {/* </Grid> */}
                </Modal>
                {this.state.visible === false ?
                    <AppraisalForm /> : null}
            </React.Fragment>
        )
    }
}
export default AppraisalModal;