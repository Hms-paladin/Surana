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
import Card from 'react-bootstrap/Card';
import Grid from '@material-ui/core/Grid';
import {saveAnswers} from './Action'
import ExitModal from './ExitModal';
import { apiurl } from '../../../App';
import Timer from './Timer';


var testQuestions = [];
let options = [];
var choices = "";
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
            storeanswer:false,
            sendAnswerindex:[]
          }  

          console.log("virmaufasfsd0",this.props.totalquestions)
          console.log("sdfsadfasdfasdf",this.props)
      } 


      onCloseModal = () => {
        this.setState({
            visible:false
        })
    }

    

      increament=(qid,catid)=>{
        //   alert("test")
          
          
    
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        console.log("askiiidsdsfsdf",date)

     


        if(this.state.current_question+1 < this.state.totalQuestions){

            this.state.postedDetails&&this.state.postedDetails.map( quest =>  catid === quest.QuesCatId &&  this.setState({
                testTempId:quest.TestTempId
            }))

          

            this.setState({
                current_question:this.state.current_question+1,
                test:[...this.state.test,{"testTempId":this.state.testTempId ,"quesId":qid,"answer": this.state.storeanswer ? this.state.answer: " "}]   ,
                storeanswer:false   
            },() => console.log("sdfjshdfjsdhfjdshf",this.state.test) )

           
        }
        else{
          
            this.setState({
            //    visited:true,
                test:[...this.state.test,{"testTempId":this.state.testTempId,"quesId":this.state.quesid,"answer":this.state.answer}]      
            },() => this.state.answer === null ? this.setState({visited:false}) : this.setState({visited:true}))
        }
      }


      sendDetails = () => {
          console.log("sdfjhsdjfhsdjkfhsdjf",this.state.test)
          this.props.dispatch(saveAnswers(this.state.test))
      }




      sendAnswer = (answer,quesid,catid,sendAnswerindex) => {
     
          console.log("sdfjhsdflhdsjkfhsdkjf",quesid)
          console.log("sdfjhsdflhdsjkfhsdkjf",answer)

          if(!this.state.sendAnswerindex.includes(sendAnswerindex)){

          this.state.sendAnswerindex.push(sendAnswerindex)
          }

          
         this.setState({storeanswer:true})

        this.state.postedDetails&&this.state.postedDetails.map( quest =>  catid === quest.QuesCatId &&  this.setState({
            testTempId:quest.TestTempId
        },() => console.log("sdfjsdhfjdshfjsdhf",this.state.testTempId)))

        this.setState({
            answer,
            quesid
        })

      }


      componentDidMount(){
         
          this.getPostedQuestionDetails()
          this.questionBank()
         
      }

    

  

      getQuestions = () => {
         testQuestions = [];
         choices = [];
          console.log("sdfjhdsfjhsdjfkhsdf",this.state.postedDetails)
           this.state.postedDetails&&this.state.postedDetails.map((q,index) => {
                            return(
                            this.state.questionBank&&this.state.questionBank.map((val,index) => {
                               
                                if(q.QuesubcatId === val.QuesubcatId){
                                   
                                    console.log("dskfjhsdfhdslfjkhdsjfkdsf",q)
                                 
                                    testQuestions.push(val)
                                 
                                    //  choices = val.Choice.split(',')
                                     choices.push(val.Choice.split(','))
                                                                    
                                }
   
                            })
                            
                        )})

                        console.log("ohhhsdfhdfhdf",testQuestions)
      }




      callChoices = () => {
          
        //   let i = 0;

        var myquest = 0;
     
          var max_quest = this.props.questionDetails&&this.props.questionDetails.map((q) => { 
            myquest = myquest + q.MaximumQuestions 
            console.log(myquest,"myquest")       
            return myquest;
        })

       
        
        console.log("clsidfsdfjsdfsdfs",myquest)
        var rows = [];
        console.log("bro chill bro",max_quest)
        
      
          for(let i=0;i<=this.state.totalQuestions;i++){ 
            console.log("sdfsdfdsfdsf",this.state.test.length > 0 && this.state.test[this.state.test.length - 1].answer)
            
              rows.push(
                  <div>
              <div className="card_body_align justify_content_spa_around">
              <span 
                  className={this.state.sendAnswerindex.includes(i)&&"visited_crl"}

              className={`dot ${this.state.current_question===i ? "background_rose" : this.state.sendAnswerindex.includes(i)&&"visited_crl"}`
                //   `dot ${this.state.current_question === i ? "background_rose" :
                //    `${this.state.test.length > 0 && this.state.test[this.state.test.length-1].answer === "" ? "background_rose" : null}`}`
                  }
                  >{i+1}</span>
                  </div>
                  </div>
                )
            
          }
          console.log(rows,"rows")
          return(rows)

          
      }
   

      getPostedQuestionDetails = () => {
          fetch(apiurl+'/getpostquestions',{
              method:"GET",
              headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
              }
          }).then((response) => response.json()).then((responseJson) => {
              if(responseJson.data.length > 0){
                  this.setState({
                      postedDetails:responseJson.data
                  },() => this.getTotalQuestions())
              }else{
                //   
              }
          })
      }


      getTotalQuestions = () => {
          
          let totalQuestions = 0;
          for(let i=0;i<this.state.postedDetails.length > 0 && this.state.postedDetails.length;i++){
                   totalQuestions += this.state.postedDetails[i].NoOfQuestions
          }
          this.setState({totalQuestions})
        
      }

      questionBank = () => {
        fetch(apiurl+'/getaddquestions',{
            method:"GET",
            headers:{
              Accept:'application/json',
              'Content-Type':'application/json',
            }
        }).then((response) => response.json()).then((responseJson) => {
            if(responseJson.data.length > 0){
                this.setState({
                    questionBank:responseJson.data
                },() => this.getQuestions())
            }else{
                // 
            }
        })
      }


      decrement = () => {
          this.setState({
              current_question:this.state.current_question - 1
          })
      }



    render(){

        console.log(this.state.sendAnswerindex,"sendAnswerindex")
      
      

        return(
            <div className="card top_move">
               <div>
                   <Timer duration={this.props.duration} history={this.props.history}  sendDetails={this.sendDetails}/>
               </div>
                <div className="card-body">
 
                <div className="mt-4 label_text">
                   <span className="clr_blue"> Q.{this.state.current_question + 1} |</span>
                   <span className="clr_grey">Question {this.state.current_question + 1} of {this.state.totalQuestions}</span>
                </div>
                <div className="flex">
                <div className="mt-4 ml-3 width_70">

                    <FormControl component="fieldset" className={"container onlinetest"}>
                    <FormLabel component="legend" className="mb-4">
                        {this.getQuestions()}
                       



                      {testQuestions.length > 0 && testQuestions.map((question,index) => {
                          console.log("sdfjsdhfjlsdhfjksdhfdsf",question)
                          
                          return(
                            <div>
                            {this.state.current_question === index && question.Question }
                          </div>
                          )
                      })}
                      


                    </FormLabel>

                   

        <RadioGroup aria-label="gender" name="gender1" className="mt-4 ml-5">

                {testQuestions.length > 0 && testQuestions.map((question,index) => {
                          console.log("sdfjsdhfjlsdhfjksdhfdsf",question)
                          var  choices = question.Choice.split(',')
                          var quindex = index
                         
                          return(
                              <>
                           <div>
                            {this.state.current_question === index && choices.map((c,index) => {
                               
                                return(
                            <div>
                                <FormControlLabel style={{width:'100%'}} value={c}  onClick={() => this.sendAnswer(c,question.QuesId,question.QuesCatId,quindex)} control={<Radio color="primary"/>} label={c}  className="background_label radio_btn mb-4" /> 
                            </div>
                                )
                            }) }
                        </div>
                        <div className="prevbtn">
                         {this.state.current_question+1 === index && this.state.current_question+1 >= 2 && 
                            <div className="mt-4 onlinetest_flexend">
                            <Button variant="primary" 
                            className="btn_height"
                            onClick={() => this.decrement()}
                            >Previous</Button>
                         </div>
                          }
                          {this.state.current_question+1 === index && 
                           <div className="mt-4 onlinetest_flexend">
                           <Button variant="primary" onClick={() => this.state.current_question+1 <= this.state.totalQuestions ? this.increament(question.QuesId,question.QuesCatId) : null} 
                           className="btn_height"
                           >{this.state.current_question+1 < this.state.totalQuestions ? "Save&Next" : "Save"}</Button>
                          </div>
                          }
                          </div>
                          </>
                          )            
                          //return ends   
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
                {this.state.visible && <ExitModal visible={this.state.visible} onCloseModal={this.onCloseModal} history={this.props.history} />}
            </div>
        )
    }
}

export default Onlinetest;