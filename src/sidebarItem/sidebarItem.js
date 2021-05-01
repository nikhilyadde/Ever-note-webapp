import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helper';

const SidebarItemComponent = (props) => {
    
    const selectNote = (n , i) => {
        props.selectNote(n , i);
    }

    const deleteNote = (n) => {
        if(window.confirm(`Are you sure you want to delete ${n.title}`)){
            props.deleteNote(n);
        }
    }

    return (
            <div key = {props._index}>
               <ListItem
               className = {props.classes.listItem} 
               selected = {props.selectedNoteIndex === props._index}
               alignItems = 'flex-start'>
                   <div
                   className = {props.classes.textSection} 
                   onClick = {() =>  selectNote(props._note , props._index)}>
                       <ListItemText
                       primary = {props._note.title}
                       secondary = {removeHTMLTags(props._note.body.substring(0 , 30)) + '...'}
                       >
                       </ListItemText>
                   </div>
                   <DeleteIcon
                   onClick = {() =>  deleteNote(props._note)}
                   className = {props.classes.deleteIcon}
                   >
                   </DeleteIcon>
               </ListItem>
            </div>
        )

}

export default withStyles(styles)(SidebarItemComponent);
