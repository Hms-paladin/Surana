import React from "react";
import wave from '../../images/wavedown.jpg';

class Checkout extends React.Component {
    state = {
      amount:0
    };
  
    constructor() {
      super()
      this.changeAmount = this.changeAmount.bind(this);
      this.openCheckout = this.openCheckout.bind(this);
    }
  
    changeAmount(e) {
      this.setState({amount: e.target.value})
    }
  
    openCheckout = () => {
      let options = {
        "key": "rzp_test_6jYJLtlkbso9dU",
        "amount": this.state.amount, // 2000 paise = INR 20, amount in paisa
        "name": "Venue Purchase",
        "description": "Hourly Data",
        "image": wave,
        "handler": function (response){
          alert(response.razorpay_payment_id);
        },
        "notes": {
          "address": "Hello World"
        },
        "theme": {
          "color": "#F37254"
        }
      };
  
      let rzp = new window.Razorpay(options);
      rzp.open();
    }
  
    render () {
      return (
        <div>
          <input type='text' onChange={
             this.changeAmount
            } />
          <button onClick={this.openCheckout}>Pay Rs.{this.state.amount}</button> 
        </div>
      )
    }
  }

  export default Checkout;