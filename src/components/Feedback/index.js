import React from 'react';
import { connect } from 'react-redux';
import  './styles.css' 
import Table from './Table'
import Grid from '@material-ui/core/Grid';
function mapStateToProps(state) {
	return {

	};
}

export class index extends React.Component {
	

	constructor(props) {
		super(props);
	}

	render() {
		return ( 
			<React.Fragment>
			<div className='feedback'>

			 

			<Grid container  spacing={1} >  
			<Grid item xs={12}>
			<div style={{textAlign:'left'}} >
			<h5 style={{fontWeight:'bold',paddingLeft:10,paddingTop:10}}>
			Feedback and Suggestion
			</h5>
			</div> 
			</Grid>
			<Grid item xs   > 
			<Table  />
			</Grid>
			</Grid>

			</div>
			</React.Fragment>
		);
	}
}

export default connect(
	mapStateToProps,undefined
)(index)
