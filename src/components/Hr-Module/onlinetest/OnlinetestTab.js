import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import Onlineinstructionlist from './Onlineinstructionlist';
import OnlineTestCandidates from './OnlineTestCandidates';
import { getQuestionCategory, getQuestionSubCategory, getQuestionType, getQuestionDetails, getQuestions } from './Action';
import { connect } from 'react-redux';
import CandidateTestList from './CandidateTestList.js';

class OnlinetestTab extends React.Component{


    state = {
        tabcontrol:false
    }


    setTabControl = (data) => {
        this.setState({
            tabcontrol:data
        })
    }

    componentDidMount(){
        this.props.dispatch(getQuestionCategory());
        this.props.dispatch(getQuestionSubCategory());
        this.props.dispatch(getQuestionType());
        this.props.dispatch(getQuestionDetails());
        this.props.dispatch(getQuestions());
    }

    render(){
        console.log("sfjsdhfjsdhfjsdhf",this.props)
        const { questionCategory, questionSubCategory, questionType, questionDetails, questions, dispatch,history } = this.props;
        return(
            <React.Fragment>
                <CenteredTabs
                    // tabonelabel="Add Questions"
                    // tabtwolabel="Post Questions"
                    // tabonelabel="Online Test"
                    tabonelabel="Online Test"
                    tabtwolabel="Online Test List"

                    tabcontrol={this.state.tabcontrol}

                    // componentone={<AddQuestions dispatch={dispatch} questionCategory={questionCategory} questionSubCategory={questionSubCategory} questionType={questionType} setTabControl={this.setTabControl} />}

                    // componenttwo={
                    //  <PostQuestions dispatch={dispatch} questions={questions} questionCategory={questionCategory} questionSubCategory={questionSubCategory} questionType={questionType}/>}

                    
                    componentone = {<OnlineTestCandidates dispatch={dispatch} history={history} />}
                     componenttwo={<CandidateTestList dispatch={dispatch} questionDetails={questionDetails} questions={questions} history={history} />}
                />
            </React.Fragment>
              )
            }
        }
        
        
        
        const mapStateToProps = (state) =>  ({
            
            questionCategory: state.onlineTest.questionCategory,
            questionSubCategory: state.onlineTest.questionSubCategory,
            questionType: state.onlineTest.questionType,
            questionDetails:state.onlineTest.questionDetails,
            questions:state.onlineTest.questions
        });
        
        
export default connect(mapStateToProps)(OnlinetestTab);