import React from 'react';
import { Tag, Input, Icon } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import './KnowledgeTag.css';

class EditableTag extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
  };
  componentWillReceiveProps(){
    console.log(this.props,"props")
    if(this.props.tagnull && this.props.tagnull.length===0){
      this.setState({tags:[]})
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
    this.props.tagvalue(tags)
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };
  saveInputRef = input => (this.input = input);
  forMap = tag => {
    const tagElem = (
          <div className="tag_top">
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
      <span  key={tag} >
        {tagElem}
      </span>
    );
  };
  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const tagChild = tags.map(this.forMap);
    console.log(this.state.tags,"tags")
    return (
      <>
      <div className="tag_adjust ">
          <label>Tags</label>
          <div className="ml-1">
          {!inputVisible && (
          <Tag className ="tag_item" onClick={this.showInput} >
              <Icon type = "plus" ></Icon>
            New Tag
          </Tag>
        )}
         {inputVisible && (
          <Input className="onclick_align"
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: "19vw"}}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        <div>
        <div className="tag-margin">
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
        {/* </div> */}
{/*
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 200 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )} */}
        </div>
        </div>
        </div>
      </div>
      </>
    );
  }
}
export default EditableTag;