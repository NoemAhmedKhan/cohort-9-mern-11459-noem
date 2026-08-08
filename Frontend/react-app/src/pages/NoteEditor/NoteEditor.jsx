import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import Sidebar from "../../components/Sidebar/Sidebar"
import TipTap from "../../components/TiptapEditor/TipTap"

function NoteEditor() {

  return (
      <>
      <TipTap />
        </>
  );
}

export default NoteEditor;
