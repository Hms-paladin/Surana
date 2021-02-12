import React from 'react';
import Inputantd from '../../../../formcomponent/inputantd';
import { FaRupeeSign } from "react-icons/fa";


class Hourslimit extends React.Component{
    render(){
        return(
           <>
            <span style={{color:'#46469B', fontWeight:'500'}}>Resource Cost</span>
            <div style={{display:'flex'}}> 
            <Inputantd prefix={<FaRupeeSign />} />
            <p style={{marginTop:'28px', marginLeft:'12px'}}>Per Month</p>
            </div>

            <span style={{color:'#46469B', fontWeight:'500'}}>Hours Limit</span>
            <div style={{display:'flex'}}> 
            <Inputantd/>
            <p style={{marginTop:'28px', marginLeft:'12px'}}>Hours</p>
            </div>

            <span style={{color:'#46469B', fontWeight:'500'}}>Cost Above Max Hours</span>
            <div style={{display:'flex'}}> 
            <Inputantd/>
            <p style={{marginTop:'28px', marginLeft:'12px'}}>Per Hour</p>
            </div>
          </>
        )
    }
}
export default Hourslimit;