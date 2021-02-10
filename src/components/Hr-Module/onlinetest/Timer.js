import React from 'react';
import './Timer.css';




let time = 0;

export default class Timer extends React.Component{

    constructor(props){
        super()
        this.state={
            startingminutes:props.duration,
            minutes:"",
            seconds:"",
        }
    
        time = this.state.startingminutes * 60;
    }
   


    

    componentDidMount(){
    
        this.interval = setInterval(this.updateCount, 1000);

     
    }

  

    updateCount = () => {
     
        const minutes = Math.floor(time/60);
        let seconds = time % 60;
  
        seconds = seconds < 10 ? '0' + seconds : seconds;
  
         time--;
  
         this.setState({minutes,seconds},() => this.state.minutes == "0" && this.state.seconds == "00" && clearInterval(this.interval,this.props.history.push('/home'),this.props.sendDetails()))
         
      }
  
   
    render(){
       return(
           <div>
              <div className="timer">{this.state.minutes}:{this.state.seconds} Mins
           </div> 
               
         </div>
       )
    }
}