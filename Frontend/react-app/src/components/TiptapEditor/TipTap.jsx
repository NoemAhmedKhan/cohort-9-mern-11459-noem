import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Color from "@tiptap/extension-color"
import Toolbar from "./Toolbar"
import "./TipTap.css"

const Tiptap = () => {

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Color,
            TextAlign.configure({
                types: ["heading", "paragraph"]
            })
        ],
        textDirection: 'auto',
        content: '<div>Hello World!</div>',
    })

    return (
        <div className="note-editor px-2 d-flex flex-column align-items-center justify-content-center">
            <div className="w-100">
                <input type="text" onChange={handleChange} className="form-control" id="exampleFormControlInput1" placeholder="Your Title"/>
            </div>

            <Toolbar editor={editor}/>
            <EditorContent className="editor-content" editor={editor}/>

            <div className="card w-100 border-0">
                <div className="card-body d-flex justify-content-end">
                    <button type="button" className="btn mx-1 btn-cancel">Cancel</button>
                    <button type="button" className="btn mx-1 btn-save" onClick={() => {
                        setContent(editor.getText());
                        console.log(title);
                        console.log(content);
                    }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Tiptap;