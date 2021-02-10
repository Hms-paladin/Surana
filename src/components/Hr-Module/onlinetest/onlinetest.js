import React from 'react';
import "./onlinetest.css";
import {IoMdAdd} from 'react-icons/io';

import {question} from './question'
import Button from 'react-bootstrap/Button'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Card from 'react-bootstrap/Card';
import Grid from '@material-ui/core/Grid';
import {saveAnswers} from './Action'
import ExitModal from './ExitModal';
import { apiurl } from '../../../App';
import Timer from './Timer';


var testQuestions = [];
let options = [];
var choices = "";
var sliceEx = [];
class Onlinetest extends React.Component{
    constructor(props){  
        super(props);  
        this.state = {  
            current_question: 0,
            answer:null,
            testTempId:null,
            quesid:null,
            test:[],
            visited:false,
            postedDetails:[],
            questionBank:[],
            totalQuestions:"",
            testQuestions:[],   
            notanswered:false,
            visible:false,
            storeanswer:true,
            sendAnswerindex:[],
            increindex:[],
            checkedQuestion:false,
            answerArray:[],
            selectedAnswers:{},
            counter:0,
            choiceindex:[],
            finalAnswers:[]
          }  

        
      } 


      onCloseModal = () => {
        this.setState({
            visible:false
        })
    }



//  return unanswered question
    getUnAnsweredQuestion = (questionBank,userAnswers) => {

        const {choiceindex,testTempId} = this.state;

        const unanswered = [];
        let finalAnswers = [];

        console.log("sakjdfhlsjkadhfkjsdf",  choiceindex.length > 0 && choiceindex.map((c) => c.chosenanswer.length))

        // if user doesn't answered 
        choiceindex.length === 0 && questionBank.forEach(q => {
            finalAnswers.push({testTempId,"quesId":q.QuesId,"answer": " "})
        })

        // pushing the choiceindex array into finalAnswers
        choiceindex.length > 0 && choiceindex.map((c) => {
            finalAnswers.push({"testTempId":c.testTempId,"quesId":c.quesId,"answer": Array.isArray(c.chosenanswer) ? c.chosenanswer.join() : c.chosenanswer})
        })

    
        console.log("finalAnswers",finalAnswers)
         
       // loop through the questionBank and userAnswers to find unanswered question
        choiceindex.length > 0 && questionBank.forEach(el1 => {
            console.log("el",el1)
            let findUserUnAnswered = userAnswers.some(el2 => el2.quesId == el1.QuesId)

            if(!findUserUnAnswered) {
                unanswered.push({testTempId,"QuesId":el1.QuesId,"answer":""})
            }
        })

        unanswered.length > 0 && unanswered.map((v) => finalAnswers.push({"testTempId":v.testTempId,"quesId":v.QuesId,"answer":""}))

            {/* set the user answers */}
            this.setState({finalAnswers})
        
        console.log("final",finalAnswers)

    }

    

      increament=(qid,catid,increindex)=>{

        
        const {questionBank} = this.props;

        this.state.increindex.push(increindex-1)

     

        // this.setState({increindex:increindex})

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        console.log("askiiidsdsfsdf",date)


    

       console.log("answered",this.state.choiceindex)
       console.log("answeredquest",questionBank[0].testQuestionDetails)

  


       this.getUnAnsweredQuestion(questionBank[0].testQuestionDetails,this.state.choiceindex)

     


        if(this.state.current_question+1 < this.state.totalQuestions){

            this.setState({current_question:this.state.current_question+1})
        }
       




      }


      
      decrement = (index) => {
        this.state.increindex.push(index - 1)
        const counter = this.state.counter + 1;

        this.setState({counter})

          this.setState({
              current_question:this.state.current_question - 1
          })
      }


      sendDetails = () => {
          console.log("sdfjhsdjfhsdjkfhsdjf",this.state.finalAnswers)
          const {questionBank,history} = this.props;
         this.getUnAnsweredQuestion(questionBank[0].testQuestionDetails,this.state.choiceindex)
         this.props.dispatch(saveAnswers(this.state.finalAnswers,this.props.candidateId,this.props.designationId,history))
      }


      checkBoxAnswer = (answer,quesid,catid,sendAnswerindex,choiceindex,testTempId) => {

 
          


  

        if(this.state.choiceindex.length > 0 && sliceEx.some((c) => c.quesId === quesid && c.choiceindex === choiceindex)) {
           
      
    

        //    sliceEx.splice(choiceindex, 1)

           
         

           var filterAnswer = this.state.choiceindex[sendAnswerindex].chosenanswer.filter((a) => a !== answer)
           console.log("filansw",filterAnswer)

           this.state.choiceindex[sendAnswerindex].chosenanswer = [];

    
           filterAnswer.length > 0 ? filterAnswer.forEach((answer) => {
            this.state.choiceindex[sendAnswerindex].chosenanswer.push(answer)
           }) : this.state.choiceindex.splice(sendAnswerindex, 1)
       

           this.setState({})
       
         
            console.log("checkingbox",this.state.choiceindex)
        }else if(this.state.choiceindex.length === 0) {
        

            this.state.choiceindex.push({qusindex:sendAnswerindex,choiceindex:choiceindex,quesId:quesid,chosenanswer:[answer],testTempId})

            sliceEx.push({qusindex:sendAnswerindex,choiceindex:choiceindex,quesId:quesid,testTempId})

  
            console.log("checkingbox",this.state.choiceindex)
        }else if(this.state.choiceindex.length > 0 && sliceEx.some((c) => c.quesId === quesid && c.choiceindex !== choiceindex)) {
           
                this.state.choiceindex[sendAnswerindex].chosenanswer.push(answer)
                sliceEx.push({qusindex:sendAnswerindex,choiceindex:choiceindex,quesId:quesid,testTempId})
             
                console.log("checkingbox",this.state.choiceindex)
        }else if(this.state.choiceindex.length > 0 && sliceEx.map((c,index) => sendAnswerindex == index &&  c.quesId !== quesid ) ){
          
            this.state.choiceindex.push({qusindex:sendAnswerindex,choiceindex:choiceindex,quesId:quesid,chosenanswer:[answer],testTempId})

            sliceEx.push({qusindex:sendAnswerindex,choiceindex:choiceindex,quesId:quesid,testTempId})

  
            console.log("checkingbox",this.state.choiceindex)
        }

        // this.setState({})
    
    

     
        if(!this.state.sendAnswerindex.includes(sendAnswerindex)){
                this.state.sendAnswerindex.push(sendAnswerindex)
        }
    
          
       this.setState({})
      
      }



      sendAnswer = (answer,quesid,catid,sendAnswerindex,choiceindex,testTempId) => {
 
          this.state.choiceindex.splice(sendAnswerindex, 1,{qusindex:sendAnswerindex,choiceindex:choiceindex,quesId:quesid,chosenanswer:answer,testTempId} )

          if(!this.state.sendAnswerindex.includes(sendAnswerindex)){
                this.state.sendAnswerindex.push(sendAnswerindex)
          } 
            
               
          this.setState({})

    }


 
      componentWillMount(){

          const {questionBank} = this.props;

        //   set the maximumquestions and test templateid
          this.setState({totalQuestions:questionBank && questionBank[0].MaximumQuestions,testTempId:questionBank && questionBank[0].TestTempId})
       
      }
  


      redirect = (data) => {
        this.state.increindex.push(this.state.current_question)
        this.setState({current_question:data})
      }



      callChoices = () => {
          
        //   let i = 0;

        console.log("callchoiceindex",this.state.sendAnswerindex)
       
        console.log("callchoiceindex",this.state.increindex)
       
        
       
        var rows = [];
      
        
      
          for(let i=0;i<this.state.totalQuestions;i++){ 
           
       
            
        rows.push(
                  <div>
              <div className="card_body_align justify_content_spa_around">
              <span 
              
              onClick={() => this.redirect(i)}
              className={`dot ${this.state.sendAnswerindex.includes(i) ? "visitedans" : this.state.increindex.includes(i) ? "background_rose":this.state.current_question===i && "background_rose"}`

                  }
                  >{i+1}</span>
                  </div>
                  </div>
                )
            
          }
          console.log(rows,"rows")
          return(rows)

          
      }
   



      renderQuiz = () => {

        const {questionBank} = this.props;
   
          return(
            <div className="card-body">
 
            <div className="mt-4 label_text">
               <span className="clr_blue"> Q.{this.state.current_question + 1} |</span>
               <span className="clr_grey">Question {this.state.current_question + 1} of {questionBank[0].MaximumQuestions}</span>
            </div>
            <div className="flex">
            <div className="mt-4 ml-3 width_70">

                <FormControl component="fieldset" className={"container onlinetest"}>
                <FormLabel component="legend" className="mb-4">
               

                  {questionBank.length > 0 && questionBank[0].testQuestionDetails.map((question,qindex) => {
                      console.log("questioncheck",question)
                      return(
                          <div>
                              {this.state.current_question === qindex && question.Question}
                          </div>
                      )
                  })}
                  


                </FormLabel>

               

                    <RadioGroup aria-label="gender" name="gender1" className="mt-4 ml-5">

            {questionBank.length>0 && questionBank[0].testQuestionDetails.map((q,index) => {
                               console.log("choiceindex2",this.state.current_question,index)
                              var  choices = q.Choice.split(',')
                    
                              var quindex = index

                              return(
                                  <>
                    <div>
                        {q.QuesType === 2 && this.state.current_question === index && choices.map((c,index) => {
                          
                            var enableradio = this.state.choiceindex.map((choicedata)=>{
                                  
                                    return (choicedata.choiceindex===index && choicedata.qusindex===quindex ? true : false)})

                                   
                return(
                        <div>
                            <FormControlLabel 
                            checked={
                              this.state.current_question === quindex && enableradio[quindex]
                            }

                             style={{width:'100%'}}  value={c} name="answer"  onChange={() => this.sendAnswer(c,q.QuesId,q.QuesCatId,quindex,index,questionBank[0].TestTempId)} control={<Radio color="primary"/>} label={c}  className="background_label radio_btn mb-4" /> 
                        </div>

                        
                            )

                            
                        }) }
                    </div>



                    <div>
                         {q.QuesType === 1 && this.state.current_question === index && choices.map((c,index) => {

                            var chosenChoice = [];

                            if(this.state.choiceindex.length > quindex && 
                                    this.state.current_question == quindex ) {
                                    for(let i=0;i<choices.length;i++) {
                                        for(let j=0;j<this.state.choiceindex[quindex].chosenanswer.length;j++) {
                                            if(choices[i] == this.state.choiceindex[quindex].chosenanswer[j]) {
                                                
                                                chosenChoice.push(i)
                                            }
                                        }
                                    }
                                }
                            // var chosenChoice = this.state.choiceindex.length > quindex && 
                            //                    this.state.current_question == quindex && 
                            //                    this.state.choiceindex[quindex].chosenanswer.filter((ans) => choices.includes(ans) )
   
                            console.log("fshdakjlfhasdjkfhsadf",chosenChoice[index],index)
                        
                            
                             return(
                                 <div>
                                       <FormControlLabel
                                       style={{width:'100%'}}
                                       className="background_label radio_btn mb-4" 
                                        control={
                                        <Checkbox
                                            checked={ this.state.current_question == quindex && chosenChoice.length>0 && chosenChoice.includes(index)
                                            }
                                            name="checkedB"
                                            color="primary"
                                            value={c}
                                            onChange={() => this.checkBoxAnswer(c,q.QuesId,q.QuesCatId,quindex,index,questionBank[0].TestTempId)}
                                        />
                                        }
                                        label={c}
                                    />
                                     </div>
                             )
                         })}
                     </div>

                {/* Buttons */}
                <div className="prevbtn">
                     {this.state.current_question === index && this.state.current_question+1 >= 2 && 
                        <div className="mt-4 onlinetest_flexend">
                        <Button variant="primary" 
                        className="btn_height"
                        onClick={() => this.decrement(index)}
                        >Previous</Button>
                     </div>
                      }
                      {this.state.current_question === index && 
                       <div className="mt-4 onlinetest_flexend">
                       <Button variant="primary" onClick={(e) => this.state.current_question+1 <= this.state.totalQuestions ? this.increament(q.QuesId,q.QuesCatId,index) : null} 
                       className="btn_height"
                       >{this.state.current_question+1 < this.state.totalQuestions ? "Save&Next" : "Save"}</Button>
                      </div>
                      }
                      </div>

                                  

                    </>
                              )
            })}


                </RadioGroup>
                
                </FormControl>
            </div> 
              
            <div className="width_30">
                
            <Card className="card_align w-100">
                <Card.Body>

                <div style={{display:'inline-flex',flexWrap:'wrap'}}>
                      {this.callChoices()}
                </div>

                <div className="flex margin_top_dot">
                <div className="visited_crl ">
                </div>
                <span className="text_size ml-3">Visited</span>
                </div>

                <div className="flex mt-3">
                <div className="not_answered">
                </div>
                <span className="text_size ml-3">Not Answered</span>
                </div>

                <div className="flex mt-3">
                <div className="not_visited">
                </div>
                <span className="text_size ml-3">Not Visited</span>
                </div>

                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center" 
                    className="mt-3"
                    spacing={3}>
        <Grid item md={6} sm={12}>
               
                <Button className="mr-3 btnwidth" variant="warning" onClick={() => this.setState({visible:true})}>Exit</Button>
               
                </Grid>
        <Grid item md={6} sm={12}>

                <Button className="btnwidth" variant="warning" onClick={() => this.sendDetails()}>Submit</Button>
               
                </Grid>
                </Grid>
                

                </Card.Body>
                </Card>
            </div>
            </div>
            </div>
          )
      }



    render(){
        console.log(this.state.choiceindex,"choiceindexrender")
     
        const {questionBank} = this.props;

        return(
            <div className="card top_move">
               <div>
                   <Timer duration={questionBank[0].Duration} history={this.props.history}  sendDetails={this.sendDetails}/>
               </div>

               <div>
                   {this.renderQuiz()}
                </div>
              
                {this.state.visible && <ExitModal visible={this.state.visible} onCloseModal={this.onCloseModal} history={this.props.history} />}
            </div>
        )
    }
}

export default Onlinetest;