import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import Badge from '@material-ui/core/Badge'; 
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  badge:{
    padding:7,
    backgroundColor:'#3f51b5',
    marginRight:5,
    color:'white'
  }
}));

export default function InsetList(props) {
  const classes = useStyles();
  const {data,last} = props;

  return (
    <List component="nav" className={classes.root} aria-label="contacts"> 

    {
       
       data.length >0  && data.map(item=>{
         return (

 <ListItem   >
         <span className={classes.badge}>12</span>
        <ListItemText primary="Chelsea Otakan" />
      </ListItem> 


           )
       })





    }  

    {

 last !=null && <ListItem   >
        
        <ListItemText primary={last.count ? last.count:''} />
        <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" >
                     {last.icon}
                    </IconButton>
                  </ListItemSecondaryAction>
      </ListItem> 

    }



     
    </List>
  );
}
