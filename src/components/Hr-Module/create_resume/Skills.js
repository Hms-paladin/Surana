import React from 'react';
import { Grid } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import './Createresume.css';
import './previewresume.css';
import { addSkills, updateSkills } from './action/CreateResumeAction';
import { connect } from 'react-redux';
import { Tag, Input, Icon } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import '../knowledge_mangement/KnowledgeTag.css';
import { skillsTab } from './action/CreateResumeAction';
import { buttonDisableAction } from '../../../fixers/fixersAction';


class Skills extends React.Component {
    state = {
        tags: [],
        editTags: [],
        editInsert: false,
        deletedSkillId: [],
        inputVisible: false,
        inputValue: '',
    }
    callroot = () => {
        if (this.props.edit === true) {
            var skill = this.state.editTags.length > 0 && this.state.editTags.map((val) => { return { skillname: val } })
            skill = this.state.editInsert === true ? skill : [];
            var deletedSkillId = this.state.deletedSkillId.length > 0 ? this.state.deletedSkillId.map((val) => { return { skillId: val } }) : []
            this.props.dispatch(buttonDisableAction(true))
            this.props.dispatch(updateSkills(skill, this.props.editResumeData[0].ResId, deletedSkillId, this.props.propFunc));
        } else {
            var skill = this.state.tags.length > 0 && this.state.tags.map((val) => { return { skillname: val } })
            this.props.dispatch(buttonDisableAction(true))
            if (this.props.skillsData === null) {
                this.props.dispatch(addSkills(skill, this.props.resumeId, this.props.propFunc));
            } else {
                var skill = this.state.tags.length > 0 && this.state.tags.map((val) => { return { skillname: val } })
                skill = this.state.editInsert === true ? skill : [];
                var deletedSkillId = this.state.deletedSkillId.length > 0 ? this.state.deletedSkillId.map((val) => { return { skillId: val } }) : []
                this.props.dispatch(updateSkills(skill, this.props.editResumeData[0].ResId, deletedSkillId, this.props.propFunc));
            }
        }
        this.props.dispatch(skillsTab(this.state.tags));
    }

    handleClose = removedTag => {
        // alert(removedTag)
        if (this.props.edit === true) {
            var deletedSkillId = this.props.editResumeData[0].Skill.find(val => val.Skillname === removedTag)
            console.log('sdfjxj', deletedSkillId)
            if (deletedSkillId !== undefined) {
                deletedSkillId = deletedSkillId.SkillId;
                this.state.deletedSkillId.push(deletedSkillId)
            }
        }
        // alert(JSON.stringify(this.state.deletedSkillId))
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
        this.setState({
            editInsert: true
        })
        const { inputValue } = this.state;
        let { tags, editTags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
            editTags = [...editTags, inputValue]
        }
        console.log(tags);
        this.setState({
            tags,
            editTags: editTags,
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

    componentDidMount() {
        if (this.props.skillsData != null) {
            this.setState({ tags: this.props.skillsData })
        }
        this.setState({})
        if (this.props.edit === true && this.props.editResumeData) {
            this.setState({ tags: this.props.editResumeData[0].Skill.map(val => val.Skillname) })
        }
        this.setState({})
    }


    render() {
        const { tags, inputVisible, inputValue } = this.state;
        console.log(tags, "sfasdfsddf")
        const tagChild = tags.map(this.forMap);
        return (
            <React.Fragment>
                <div className="card card-min-height top_move">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="">
                                    <h6 className="form-subheading mb-3">Skills</h6>
                                    <div className="ml-1">
                                        {!inputVisible && (
                                            <Tag className="tag_item" onClick={this.showInput} >
                                                <Icon type="plus" ></Icon>
                                                Add Skills
                                            </Tag>
                                        )}
                                        {inputVisible && (
                                            <Input className="onclick_align"
                                                ref={this.saveInputRef}
                                                type="text"
                                                size="small"
                                                style={{ width: "16.5vw", height: "5vh", margin: "17px" }}
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
                            </div>
                        </div>
                    </div>
                    <Grid container className="prev_btn-right"
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className="mt-3"
                        spacing={3}>

                        <Grid item >
                            <Button className="btnwidth btnclr" onClick={() => this.props.propFunc(this.props.skipTab === false ? 2 : 1)}>
                                Prev
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button className="btnwidth btnclr" onClick={this.callroot}>
                                {this.props.edit === true ? "Update" : "Next"}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment >
        )
    }
}

const mapStateToProps = (state) => ({
    skillsData: state.resumeReducer.skillsData,
    editResumeData: state.resumeReducer.resume
});

export default connect(mapStateToProps)(Skills);