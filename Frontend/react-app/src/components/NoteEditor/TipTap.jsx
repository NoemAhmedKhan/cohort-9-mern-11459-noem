import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Toolbar from "./Toolbar"
import "./TipTap.css"

const TipTap = forwardRef(({ content, editable }, ref) => {

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"]
            })
        ],
        textDirection: 'auto',
        content: content,
    })

    useEffect(
        () => {
            if(editor) editor.setEditable(editable);
        }, [editor, editable]
    );

    useImperativeHandle(ref, () => ({
        getContent: () => editor.getJSON()
    }));

    return (
        <div className="d-flex flex-column align-items-center justify-content-start h-100 mb-5">
            <Toolbar editor={editor} disabled={!editable}/>
            <EditorContent className="editor-content" editor={editor}/>
        </div>
    )
})

export default TipTap;