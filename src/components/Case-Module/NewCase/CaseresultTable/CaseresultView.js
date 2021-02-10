import React from 'react';
import court_img from '../../../../images/court.jpg'
import './CaseresultTable.css';
import { FiUpload} from "react-icons/fi";
// import { AiOutlineStar } from "react-icons/AI";

// import { AiOutlineStar } from "react-icons/ai";
import StarIcon from '@material-ui/icons/Star';
import {AiFillCaretLeft} from "react-icons/ai"
import {AiFillCaretRight} from "react-icons/ai"
import StarBorderIcon from '@material-ui/icons/StarBorder';

// import StarOutlineIcon from '@material-ui/icons/StarOutline';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {RiDownloadLine} from "react-icons/ri"

class CaseresultView extends React.Component{
    constructor(props) {
        super(props);
    this.state={
        star:false,
    }
}
    clickStar =(e)=>{
alert(this.state.star)
        this.setState({star: !this.state.star})
        console.log(this.state.star,"cbxbcmbcmxbmv")
        // axios({
        //     method: 'post',
        //     url: apiurl+'/uploadcaseResult',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     data: data
            
        // }).then((response) => {
        //  console.log(response,"vbmcvbfkjghkfhit")
        //  if(response.data.status==1){
        //    this.generateAlert("Case File Uploaded")
        //  }
           
        // }).catch((error) => {
        //     console.log(error)
        // })
          
        // }
    }
    
    render(){
        return(
           <div className ="image_icons_div mt-2">
               <div className ="case_image_part">
                    <div className ="court_img_div">
                        <img src={court_img} className ="court_img_align"/>
                    </div>
                    <div  className ="court_navigatenext_div">
                    <AiFillCaretLeft className="arrow_edit_caseresult"/><h4 className="four_edit_caseresult">4</h4><AiFillCaretRight className="arrow_edit_caseresult"/>
                    </div>
               </div>
               <div className ="case_download_icon">
                   
               <StarIcon className ={this.state.star ? "star_icon_color_caseresult":"star_icon_align_caseresult"} onChange={(e)=>this.handleFavourite(e)}/>
               <a href ={require ('../../../../images/court.jpg')} download="myFile">
               <RiDownloadLine className ="star_icon_align_caseresult"/>
               </a>
               </div>
           </div>
        )
    }
}
export default CaseresultView;