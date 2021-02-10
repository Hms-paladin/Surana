import React from 'react';
import Centeredtabs from '../../tabcomponent/tabs';
import Addtm from './Addtm';
import AddtmList from './AddList';
import { connect } from 'react-redux';
import { tempReset } from '../../tempData/tempAction';


class AddtmMain extends React.Component{
    componentDidMount(){
        this.props.dispatch(tempReset())
    }
    render(){
        const { addtmData } = this.props.addtmData
        const { dispatch } = this.props;
        return(
            <Centeredtabs
            tabonelabel="List"
            tabtwolabel="Addtm One"
            componentone={<AddtmList />}
            componenttwo={<Addtm addtmData={addtmData} dispatch={dispatch}/>}
          />  
        )
    }
}

const mapStateToProps = (state) => ({
    addtmData: state.tempReducer
  });

export default connect(mapStateToProps)(AddtmMain);