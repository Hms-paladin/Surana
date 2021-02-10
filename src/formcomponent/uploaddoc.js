import React from "react";
import { Upload, Button,message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

class UploadDocumentFile extends React.Component {

  // handleChange = info => {
  //   if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList,"infoupload");
  //     }
  //     if (info.file.status === 'done') {
  //       console.log(info.file,"infofile")
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  // };


  getBase64 = (img, callback) =>{
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
    beforeUpload = (file) =>{
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = info => {
    console.log(info,"profile_pic")

    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
      console.log(info,"imageUrl")
        // this.setState({
        //   imageUrl,
        //   loading: false,
        // }),
      );
    }
    this.setState({})
  };


  fileurl=(data)=>{
    console.log(data,"data")
  }
  render() {
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange: this.handleChange,
        headers: {
          authorization: 'authorization-text',
        },
    }
    return (
      <Upload {...props} 
      // onChange={(e)=> this.props.changeData(e)}
      >
        <Button>
          <UploadOutlined /> Upload Document
        </Button>
      </Upload>
    );
  }
}

export default UploadDocumentFile;