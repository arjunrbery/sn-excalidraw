import React, {useRef} from 'react';
import {Excalidraw, getSceneVersion} from "@excalidraw/excalidraw";
import {useEditor} from "../providers/EditorProvider";

const Editor = () => {
  const {data, saveNote, isLocked} = useEditor();
  const el = useRef();
  let lastVersion = getSceneVersion(data.elements);
  let libraryCnt = data.libraryItems.length;

  const onChange = (elements) => {
    const newVersion = getSceneVersion(elements);
    if (newVersion > lastVersion) {
      lastVersion = newVersion;
      data.elements = elements;
      saveNote();
    }
  };

  const onLibraryChange = (libraryItems) => {
    const newCtn = libraryItems.length;
    if (newCtn !== libraryCnt) {
      libraryCnt = newCtn;
      data.libraryItems = libraryItems;
      saveNote();
    }
  };

  return (
    <div className="main">
      <Excalidraw ref={el} key={Math.random()} initialData={data} theme={'dark'} onChange={onChange} onLibraryChange={onLibraryChange}
                  viewModeEnabled={isLocked}/>
    </div>
  );
}

export default Editor