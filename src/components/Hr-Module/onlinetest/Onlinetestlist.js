import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import AddQuestions from './AddQuestions';
import PostQuestions from './PostQuestions'
import Onlineinstructionlist from './Onlineinstructionlist';
import { getQuestionCategory, getQuestionSubCategory, getQuestionType, getQuestionDetails, getQuestions } from './Action';
import { connect } from 'react-redux';
import QuestionView from './QuestionView/QuestionView'
class Onlinetestlist extends React.Component{


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
        const { questionCategory, questionSubCategory, questionType, questionDetails, questions, dispatch } = this.props;
        return(
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="Add Questions"
                    tabtwolabel="Questions View"
                    tabthreelabel="Test Template"
                    tabcontrol={this.state.tabcontrol}

                    componentone={<AddQuestions dispatch={dispatch} questionCategory={questionCategory} questionSubCategory={questionSubCategory} questionType={questionType} setTabControl={this.setTabControl} />}
   componenttwo={<QuestionView/>}
                    componentthree={
                     <PostQuestions dispatch={dispatch} questions={questions} questionCategory={questionCategory} questionSubCategory={questionSubCategory} questionType={questionType}/>}

                    // componentthree={<Onlineinstructionlist dispatch={dispatch} questionDetails={questionDetails} questions={questions} />}
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

export default connect(mapStateToProps)(Onlinetestlist);