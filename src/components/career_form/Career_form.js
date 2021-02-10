
import React from 'react';
import './Career_form.css';
import Inputantd from '../../formcomponent/inputantd';
import Avatar from '../Hr-Module/create_resume/Photouploader'
import Calenderbox from '../../formcomponent/calenderbox'
import Dropdownantd from '../../formcomponent/dropdownantd';
import Textareaantd from '../../formcomponent/textareaantd';
import Button from 'react-bootstrap/Button';
import { Grid } from '@material-ui/core';
import { Tag, Input, Icon } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import AddIcon from '@material-ui/icons/Add';
import ValidationLibrary from "../../validationlibrary/validation"
// import { getTaglist, addSkills from './CreateResumeAction';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
class Careerform extends React.Component{
        state = {
            tags: [],
            inputVisible: false,
            inputValue: '',
            errordummy:true,
          Career_formdata:
          {'Career_First_Name':
          {'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },        
      },
        }
        // callroot = () => {
        //     var skill=this.state.tags.length > 0 && this.state.tags.map((val)=>{return{skillname:val}})

        //     this.props.dispatch(addSkills(skill))
        // }
        checkValidation=()=>{
            var mainvalue={}
            var Career_formdata=this.state.Career_formdata;
            var targetkeys=Object.keys(Career_formdata);
            console.log(targetkeys,"targetkeys");
            for(var i in targetkeys){
            var errorcheck=ValidationLibrary.checkValidation(Career_formdata[targetkeys[i]].value,Career_formdata[targetkeys[i]].validation);
            console.log(errorcheck,"errorcheck");
            Career_formdata[targetkeys[i]].error=!errorcheck.state;
            Career_formdata[targetkeys[i]].errmsg=errorcheck.msg;
            mainvalue[targetkeys[i]] =Career_formdata[targetkeys[i]].value
            }
            var filtererr=targetkeys.filter((obj)=>
              Career_formdata[obj].error==true);
            console.log(filtererr.length)
            if(filtererr.length>0){
              this.setState({error:true})
            }else{
              this.setState({error:false})
            }
            this.setState({
              mainvalue,
              Career_formdata
            })   
        }
        changeDynamic=(data,key)=>{
            console.log("key",key);   
            console.log("data",data);   
            var Career_formdata=this.state.Career_formdata;
             var targetkeys=Object.keys(Career_formdata);
               var errorcheck=ValidationLibrary.checkValidation(data,Career_formdata[key].validation);
                Career_formdata[key].value=data;
                Career_formdata[key].error=!errorcheck.state;
                Career_formdata[key].errmsg=errorcheck.msg;
                this.setState({Career_formdata});
                 var filtererr=targetkeys.filter((obj)=>
                Career_formdata[obj].error==true || Career_formdata[obj].error==null );
                if(filtererr.length>0){
                    this.setState({error:true,
                        errordummy:false})
                }else{
                    this.setState({error:false})
                }
          }

        handleClose = removedTag => {
            const tags = this.state.tags.filter(tag => tag !== removedTag);
            console.log(tags);
            this.setState({ tags });
        };
        showInput = () => {
            this.setState({ inputVisible: true }, () => this.input.focus());
        };
        handleInputChange = e => {
            this.setState({ inputValue: e.target.value });
        };
        handleInputConfirm = () => {
            const { inputValue } = this.state;
            let { tags } = this.state;
            if (inputValue && tags.indexOf(inputValue) === -1) {
                tags = [...tags, inputValue];
            }
            console.log(tags);
            this.setState({
                tags,
                inputVisible: false,
                inputValue: '',
            });
        };
        saveInputRef = input => (this.input = input);
        forMap = tag => {
            const tagElem = (
                <div className="tag_top_skill">
                    <Tag
                        closable
                        onClose={e => {
                            e.preventDefault();
                            this.handleClose(tag);
                        }}
                    >
                        {tag}
                    </Tag>
                </div>
            );
            return (
                <span key={tag} >
                    {tagElem}
                </span>
            );
        };

    render(){
        const { tags, inputVisible, inputValue } = this.state;
        const tagChild = tags.map(this.forMap);
        return(
            <div className="card">
                <div className="card-body">
                    <div className="follow_heading">
                                <h5>Career Form</h5>
                    </div>
                        <div className ="personal_info_edit">
                            <h5>Personal Info</h5>
                        </div>  

    {/* Personal Info start*/}

                <div className="row container-fluid">
                <div className="col-md-8">
                    <div className="col-md-6 Display_Inline">
                            <Inputantd label={"First Name"} 
                            changeData={(data)=>this.changeDynamic(data,'Career_First_Name')} 
                            value={this.state.Career_formdata.Career_First_Name.value} 
                            error={this.state.Career_formdata.Career_First_Name.error} 
                            errmsg={this.state.Career_formdata.Career_First_Name.errmsg}/>
                    </div>
                    <div className="col-md-6 Display_Inline">
                            <Inputantd label={"Last Name"}/>
                    </div>
                    <div className="col-md-6 Display_Inline">
                            <Calenderbox placeholder={"dd-mm-yyyy"} label={"Date Of Birth"} />
                    </div>
                    <div className="col-md-6 Display_Inline">
                            <Dropdownantd label={"Gender"} />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="col-sm-12 text-center Avater_align">
                        <div className="avater">
                                <Avatar />
                        </div>
                    </div>
                </div>
                </div>

                <div className="row container-fluid">
                <div className="col-md-8">
                    
                    <div className="col-md-6 Display_Inline">
                            <Inputantd label={"Phone Number"} />
                    </div>
                    <div className="col-md-6 Display_Inline">
                        <p className="father_guardian_edit">
                            <Inputantd label={"Father/Husband/Guardian Name"} />
                        </p>
                    </div>
                    <div className="col-md-6 Display_Inline">
                            <Inputantd label={"Location"} />
                    </div>
                    <div className="col-md-6 Display_Inline">
                            <Inputantd label={"Email Id"} />
                    </div>
    
                </div>
                <div className="col-md-4">
                        <div className="col-md-12 Textarea_height">
                            <Textareaantd   label="Current Address"/>
                    </div>
                </div>
                </div>

                <div className="row container-fluid">
                <div className="col-md-8">               
                    
                    <div className="col-md-6 Display_Inline">
                            <Inputantd label={"LinkedIn"} />
                    </div>
                    <div className="col-md-6 Display_Inline">
                            <Inputantd label={"Referred By "} />
                    </div>
                    <div className="col-md-6 Display_Inline">
                            <Inputantd label={"Twitter"} />
                    </div> 
                </div>
                <div className="col-md-4">
                    <div className="col-md-12 Textarea_height">
                    <Textareaantd  label="Permanent Address"/>
                    </div>
                </div>
                </div>
    {/* Personal Info End */}

    {/* Education Start */}
                <div className="border_edit">
                <div className ="personal_info_edit">
                <h5>Education</h5>
                <div className="add_icon_parent">
                     <AddIcon className="add_adjust" onClick={this.addDuty} />
                </div>
                </div>
                    <div className="row container-fluid">
                        <div className="col-md-8">
                            <div className="col-md-12">
                                    <Inputantd label={"Institution Name"} />
                            </div>
                            <div className="col-md-6 Display_Inline">
                                    <Calenderbox placeholder={"dd-mm-yyyy"} label={"Year of Passing"} />
                                </div> 
                                <div className="col-md-6 Display_Inline">
                                    <Inputantd label={"Percentage"} />
                                </div>
                                <div className="col-md-6 Display_Inline">
                                    {/* <Inputantd label={"License"} /> */}
                                    {!inputVisible && (
                                            <Tag className="tag_item_value" onClick={this.showInput} >
                                                <Icon type="plus" ></Icon>
                                                License
                                            </Tag>
                                        )}
                                        {inputVisible && (
                                            <Input className="onclick_align"
                                                ref={this.saveInputRef}
                                                type="text"
                                                size="small"
                                                style={{ width: "16.5vw", height: "5vh", margin:"17px"}}
                                                value={inputValue}
                                                onChange={this.handleInputChange}
                                                onBlur={this.handleInputConfirm}
                                                onPressEnter={this.handleInputConfirm}
                                            />
                                        )}
                                        <div style={{ marginBottom: 16 }}>
                                            <div className="tag-margin">
                                                <div className="">
                                                    <TweenOneGroup
                                                        enter={{
                                                            scale: 0.8,
                                                            opacity: 0,
                                                            type: 'from',
                                                            duration: 100,
                                                            onComplete: e => {
                                                                e.target.style = '';
                                                            },
                                                        }}
                                                        leave={{ opacity: 0, width: 50, scale: 0, duration: 200 }}
                                                        appear={false}
                                                    >
                                                        {tagChild}
                                                    </TweenOneGroup>
                                                </div>
                                            </div>
                                        </div>
                                </div> 

                                <div className="col-md-6 Display_Inline">
                                    {/* <Inputantd label={"License Number"} /> */}
                                    {!inputVisible && (
                                        <div className="license_tag_par">
                                            <Tag className="tag_item_value" onClick={this.showInput} >
                                                <Icon type="plus" ></Icon>
                                                License No
                                            </Tag>
                                            <div className="add_icon_parents">
                                                <AddIcon className="add_adjusts" onClick={this.addDuty} />
                                            </div>
                                        </div>
                                        )}
                                        {inputVisible && (
                                            <Input className="onclick_align"
                                                ref={this.saveInputRef}
                                                type="text"
                                                size="small"
                                                style={{ width: "16.5vw", height: "5vh", margin:"17px"}}
                                                value={inputValue}
                                                onChange={this.handleInputChange}
                                                onBlur={this.handleInputConfirm}
                                                onPressEnter={this.handleInputConfirm}
                                            />
                                        )}
                                        <div style={{ marginBottom: 16 }}>
                                            <div className="tag-margin">
                                                <div className="">
                                                    <TweenOneGroup
                                                        enter={{
                                                            scale: 0.8,
                                                            opacity: 0,
                                                            type: 'from',
                                                            duration: 100,
                                                            onComplete: e => {
                                                                e.target.style = '';
                                                            },
                                                        }}
                                                        leave={{ opacity: 0, width: 50, scale: 0, duration: 200 }}
                                                        appear={false}
                                                    >
                                                        {tagChild}
                                                    </TweenOneGroup>
                                                </div>
                                            </div>
                                        </div>
                                </div> 
                        </div>
                        <div className="col-sm-4">
                            <div className="col-sm-12 Display_Inline">
                                    <Dropdownantd label={"Qualification"} />   
                            </div>
                            <div className="col-sm-12 Display_Inline">
                                    <Inputantd label={"Certificate Number"} />   
                            </div>
                        </div>
                    </div>
                </div>
    {/* Education end */}

    {/* Experience Start */}
                <div>
                <div className="personal_info_edit">
                                <h5>Experience</h5>
                                <div className="add_icon_parent">
                                <AddIcon className="add_adjust" onClick={this.addDuty} />
                                </div>
                    </div>
                    <div className="row container-fluid">
                        <div className="col-md-8">
                            <div className="col-md-6  Display_Inline">
                                    <Dropdownantd label={"Candidate Type"} />   
                            </div>
                            <div className="col-md-6  Display_Inline">
                                    <Dropdownantd label={"Type of Industries"} />   
                            </div>
                            <div className="col-md-6  Display_Inline">
                                    <Dropdownantd label={"City"} />   
                            </div>
                             <div className="col-md-6  Display_Inline">
                                    <Dropdownantd label={"Department"} />   
                            </div>
                            <div className="col-md-6  Display_Inline">
                                    <Calenderbox placeholder={"dd-mm-yyyy"} label={"Period From "} />   
                            </div>
                            <div className="col-md-6  Display_Inline">
                                    <Calenderbox placeholder={"dd-mm-yyyy"} label={"Period To "} />   
                            </div>
                            <div className="col-md-12  Display_Inline">
                                    <Inputantd label={"Responsibilities "} />   
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="col-sm-12 Display_Inline">
                                    <Inputantd label={"Company Name"} />       
                            </div>
                            <div className="col-sm-12 Display_Inline">
                                    <Dropdownantd label={"Designation"} />       
                            </div>
                        </div>
                    </div>
                </div>
    {/* Experience End */}
    {/* Skills Start */}
                <div>
                <div className="personal_info_edit">
                                <h5>Skills</h5>
                    </div>
                    <div className="row container-fluid">
                        <div className="col-sm-12 Display_Inline">
                        <div className="col-md-4 ml-1 ">

    {/* Skills for adding tag start */}

                            {/* <Inputantd label={"Business Skills"}/> */}
                                        {!inputVisible && (
                                            <Tag className="tag_item_value" onClick={this.showInput} >
                                                <Icon type="plus" ></Icon>
                                                Add Skills
                                            </Tag>
                                        )}
                                        {inputVisible && (
                                            <Input className="onclick_align"
                                                ref={this.saveInputRef}
                                                type="text"
                                                size="small"
                                                style={{ width: "16.5vw", height: "5vh", margin:"17px"}}
                                                value={inputValue}
                                                onChange={this.handleInputChange}
                                                onBlur={this.handleInputConfirm}
                                                onPressEnter={this.handleInputConfirm}
                                            />
                                        )}
                                        <div style={{ marginBottom: 16 }}>
                                            <div className="tag-margin">
                                                <div className="">
                                                    <TweenOneGroup
                                                        enter={{
                                                            scale: 0.8,
                                                            opacity: 0,
                                                            type: 'from',
                                                            duration: 100,
                                                            onComplete: e => {
                                                                e.target.style = '';
                                                            },
                                                        }}
                                                        leave={{ opacity: 0, width: 50, scale: 0, duration: 200 }}
                                                        appear={false}
                                                    >
                                                        {tagChild}
                                                    </TweenOneGroup>
                                                </div>
                                            </div>
                                        </div>
    {/* Skills for adding tag end */}
                                    
                        </div>
                        </div>
                    </div>

                </div>
    {/* Skills End */}

    {/* Summary Start */}
                <div>
                <div className="personal_info_edit">
                                <h5>Summary</h5>
                </div>
                    <div className="row container-fluid">
                    <div className="col-sm-12 Display_Inline">
                        <div className="col-md-12">
                            <Textareaantd />     
                        </div>
                    </div>
                    </div>
                </div>
    {/* Summary End */}
    {/* Button Part Start */}
                <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className="mt-5"
                            spacing={3}>
                            <Grid item >
                                <Button className="btnwidth btnclr" onClick={()=>this.checkValidation()}>Save</Button>
                            </Grid>
                            <Grid item >
                                <Button className="btnwidth btnclr_outline">Cancel</Button>
                            </Grid>
                        </Grid>
    {/* Button Part End */}
            </div>   
        </div>
        )
    }
}

export default Careerform;