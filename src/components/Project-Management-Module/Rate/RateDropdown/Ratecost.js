import React from 'react';
import Inputantd from '../../../../formcomponent/inputantd';
import { FaRupeeSign } from "react-icons/fa";


class Ratecost extends React.Component{
    render(){
        return(
           <>
           <span style={{color:'#46469B', fontWeight:'500'}}>Resource Cost</span>
           <div style={{display:'flex'}}> 
           <Inputantd prefix={<FaRupeeSign />} />
           <p style={{marginTop:'28px', marginLeft:'12px'}}>Per hour</p>

           </div>
         
           <p style={{color:'red', fontWeight:'500'}}>Note: overrides all other costs</p>
           </>
        )
    }
}
export default Ratecost;