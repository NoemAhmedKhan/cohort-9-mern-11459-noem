import Sidebar from "../../components/Sidebar/Sidebar"
import NoteEditor from "../../components/NoteEditor/NoteEditor"

function NoteEditor() {

  return (
      <>
          <Sidebar />
      <NoteEditor mode="create" note={{id: 1, title: "First Note", content: "NOPE!!!"}} />
        </>
  );
}

export default NoteEditor;
