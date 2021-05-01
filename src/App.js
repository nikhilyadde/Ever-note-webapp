import React,  { useState , useEffect } from 'react';
import firebase from 'firebase/app';
import './App.css';
import EditorComponent from './editor/editor';
import SidebarComponent from './sidebar/sidebar';  
 

const App = () =>{
    const [ selectedNoteIndex , setSelectedNoteIndex ] = useState(null);
    const [ selectedNote , setSelectedNote ] = useState(null);
    const [ notes , setNotes ] = useState(null); 

    useEffect(() => {
        firebase
        .firestore()
        .collection('notes')
        .onSnapshot(serverUpdate => {
            const notes = serverUpdate.docs.map(_doc => {
                const data = _doc.data();
                data['id'] = _doc.id;
                return data;
            });
            setNotes(notes);
        }) 
    } , [])

    const selectNote = (note , index) => {
        setSelectedNote(note);
        setSelectedNoteIndex(index);
    }

    const noteUpdate = (id , noteObject) => {
        if(id){
        firebase
                .firestore()
                .collection('notes')
                .doc(id)
                .update({
                    title : noteObject.title,
                    body : noteObject.body , 
                    timestamp : firebase.firestore.FieldValue.serverTimestamp()
                });
        }
    }

    const newNote = async (title) => {
        const note = {
            title : title ,
            body : ''
        };

        const newFromDB = await firebase
                                        .firestore()
                                        .collection('notes')
                                        .add({
                                            title : note.title ,
                                            body : note.body ,
                                            timestamp : firebase.firestore.FieldValue.serverTimestamp()
                                        });

        const newID = newFromDB.id; 
        await setNotes([...notes , note]); 
        const newNoteIndex = notes.indexOf(notes.filter(_note => _note.id === newID)[0])
        setSelectedNote(notes[newNoteIndex]);
        setSelectedNoteIndex(newNoteIndex)
    } 

    const deleteNote = async (note) => {
        const noteIndex = notes.indexOf(note);  
        await setNotes(notes.filter(_note => _note !== note));
        if(selectedNoteIndex === noteIndex){
            setSelectedNoteIndex(null);
            setSelectedNote(null);
        }else{
            notes.length > 1 ?
            selectNote(notes[selectedNoteIndex - 1] , selectedNoteIndex - 1 ) :
            setSelectedNoteIndex(null);
            setSelectedNote(null);
        }

        firebase
                .firestore()
                .collection('notes')
                .doc(note.id)
                .delete();
         

    }
    
    
    return (
            <div className = "app-container"> 
                <SidebarComponent 
                selectedNoteIndex = {selectedNoteIndex} 
                notes = {notes}
                deleteNote = {deleteNote}
                selectNote = {selectNote}
                newNote = {newNote}
                ></SidebarComponent>
                {
                    selectedNote ? 
                    <EditorComponent
                    selectedNote = {selectedNote}
                    selectedNoteIndex = {selectedNoteIndex}
                    notes = {notes}
                    noteUpdate = {noteUpdate}></EditorComponent>
                    
                    :  
                    <div className = 'notes_section'>
                      
                        <p>Welcome to <span style = {{color : '#29487d'}} className = 'app_name' >Ever-Note</span></p>
                    </div>

                }
             
            </div>
        )
}

export default App;