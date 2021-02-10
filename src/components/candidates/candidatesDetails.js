import React from 'react';


class CandidatesDetails extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="mb-2">
                    <h6 className="modal_header_title modal_title_card">Candidates Experience</h6>
                    <div className="row p-2">
                        <div className="col-sm-6">
                            <div className="modal_label">
                                Candidate Name
                            </div>
                            <div className="modal_value">
                                Surya
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="modal_label">
                                Candidate Age
                            </div>
                            <div className="modal_value">
                                20
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="modal_label">
                                Candidate Mobile Number
                            </div>
                            <div className="modal_value">
                                9043445678
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="modal_label">
                                Candidate Address
                            </div>
                            <div className="modal_value">
                                125, Villapuram Madurai-625008
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CandidatesDetails;