// import React, { Component } from 'react'
import React , { useState , useEffect } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helper';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const EditorComponent = (props) => {

    const [ title , setTitle ] = useState('');
    const [ text , setText ] = useState('');
    const [ id , setId ] = useState('');

    

    useEffect(() => {
        setTitle(props.selectedNote.title);
        setText(props.selectedNote.body);
        setId(props.selectedNote.id);
    }, [props.selectedNote]);

    const updateTitle = async (text) => {
        await setTitle(text);
        update();
    };

    const updateBody = async (val) => {
        await setText(val);
        update();
    };

    const update = debounce(() => {
        props.noteUpdate(id , {
            title :  title ,
            body : text  
        })
    } );

    return(
        <div className = {props.classes.editorContainer}>
                <BorderColorIcon className = {props.classes.editIcon}></BorderColorIcon>
                <input
                className = {props.classes.titleInput}
                placeholder = 'Note title...'
                value = {title ? title : ''}
                onChange = {(e) => updateTitle(e.target.value)}>
                </input>
                <ReactQuill 
                value = {text} 
                onChange = {updateBody}>
                </ReactQuill>
            </div>
    )

}

export default withStyles(styles)(EditorComponent);