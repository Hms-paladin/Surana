import React from "react"
import { Upload, message, Button, Icon } from 'antd';



class ExamSchedule extends React.Component{
    render(){

            const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList,"fjksdfjksdjka");
                }
                if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                }
            },
            };
        return(
            <Upload {...props}>
                <Button>
                <Icon type="upload" />  upload
                </Button>
            </Upload>
        )
    }
}

export default ExamSchedule;
  