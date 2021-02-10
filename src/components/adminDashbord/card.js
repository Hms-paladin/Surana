import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BadgeList from './badge';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
 


const useStyles = makeStyles({
  card: {
    minWidth: 275,
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2) !important',
  transition: '0.3s',
  paddingTop:30,
  marginTop:40

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
    fontWeight:'bold'
  },
  pos: {
    marginBottom: 12,
  },
  square:{
    width:80,
    height:80,
    color:'white',
    padding:12,
    marginLeft:15,
    zIndex:1,
    position: 'absolute',
    float:'left',
    top:-30,

  },
  head:{
    left:90,
    top:10, 
    paddingLeft:20,
    position:'absolute',
    zIndex:1
  }
}); 





export default function SimpleCard(props) {
  const classes = useStyles();
  const {title,list,icon,add,color} = props;

  return ( 
  <div style={{position:'relative'}}>  

   <div className={classes.square + ' ' + color} >
            <img src='images/test.png' width='50' height='50' />
   </div>   

 
    <Card className={classes.card}>  

    <div className={classes.head}  > 
         <Typography className={classes.title}  variant='h1' >
          {title}
        </Typography> 
 
       </div>
      <CardContent> 
             
         <BadgeList data = {list} last={add} />
       
      </CardContent>
 
    </Card>
    </div>
  );
}
