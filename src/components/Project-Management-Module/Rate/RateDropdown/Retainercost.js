import React from 'react';
import Inputantd from '../../../../formcomponent/inputantd';
import { FaRupeeSign } from "react-icons/fa";


class Retainercost extends React.Component{
    render(){
        return(
           <>
           <span style={{color:'#46469B', fontWeight:'500'}}>Resource Cost</span>
           <div style={{display:'flex'}}> 
           <Inputantd prefix={<FaRupeeSign />} />
           <p style={{marginTop:'28px', marginLeft:'12px'}}>Per Month</p>

           </div>
         
           <p style={{color:'red', fontWeight:'500'}}>Note:No resources cost per hour will be calculated</p>
           </>
        )
    }
}
export default Retainercost;