import React from 'react';
import './UploadDocBtn.css';

class UploadDocBtn extends React.Component {
    state = {
        open: false
    }
    uploadShow = () => {
        this.setState({ open: !this.state.open })
    }
    render() {
        return (
            <div className="rootdiv">
                <div className="wrapDiv">
                    <div className="wrapper" onClick={this.uploadShow}>
                        <h3 className="uploadtxt">Upload Documents</h3>
                    </div>
                    {
                        this.state.open === true &&
                        <div className="card">
                            <div className="card-body">
                                Check Data
                </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}


export default UploadDocBtn;