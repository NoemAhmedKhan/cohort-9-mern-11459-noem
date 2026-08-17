import "./Toolbar.css"

const Toolbar = ({ editor, disabled }) => {
  if (!editor) return null;

  return (
    <div className="d-flex flex-wrap gap-2 my-2 mb-0 justify-content-center align-items-center align-content-center bg-light border border-primary border-bottom-0 editor-toolbar">
      <button
        type="button"
        className="toolbar-btn"
        onClick={() => editor.chain().focus().toggleBold().run()}
        aria-label="Bold"
        disabled={disabled}
      >
        <i className="fa-solid fa-bold"></i>
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Italic"
        disabled={disabled}
      >
        <i className="fa-solid fa-italic"></i>
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Underline"
        disabled={disabled}
      >
        <i className="fa-solid fa-underline"></i>
      </button>

        <div className="btn-group">
            <button className="btn btn-sm btn-light dropdown-toggle toolbar-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled={disabled}>
                H
            </button>
            <ul className="dropdown-menu">
                <li>
                    <button
                        type="button"
                        className="dropdown-item btn toolbar-btn"
                        onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
                        aria-label="Heading 1">
                        H1
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className="dropdown-item btn toolbar-btn"
                        onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
                        aria-label="Heading 2">
                        H2
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className="dropdown-item btn toolbar-btn"
                        onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
                        aria-label="Heading 3">
                        H3
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className="dropdown-item btn toolbar-btn"
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        aria-label="Paragraph">
                        Normal
                    </button>
                </li>
            </ul>
        </div>

      <button
        type="button"
        className="toolbar-btn"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Bullet list"
        disabled={disabled}
      >
        <i className="fa-solid fa-list-ul"></i>
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Numbered list"
        disabled={disabled}
      >
        <i className="fa-solid fa-list-ol"></i>
      </button>

      <button
        type="button"
        className="toolbar-btn"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        aria-label="Align left"
        disabled={disabled}
      >
        <i className="fa-solid fa-align-left"></i>
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        aria-label="Align center"
        disabled={disabled}
      >
        <i className="fa-solid fa-align-center"></i>
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        aria-label="Align right"
        disabled={disabled}
      >
        <i className="fa-solid fa-align-right"></i>
      </button>
        <button
            type="button"
            className="toolbar-btn"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            aria-label="Align justify"
            disabled={disabled}
        >
            <i className="fa-solid fa-align-justify"></i>
        </button>

        <button
            type="button"
            className="toolbar-btn"
            onClick={() => editor.chain().focus().undo().run()}
            aria-label="Undo"
            disabled={disabled}
        >
            <i className="fa-solid fa-rotate-left"></i>
        </button>
        <button
            type="button"
            className="toolbar-btn"
            onClick={() => editor.chain().focus().redo().run()}
            aria-label="Redo"
            disabled={disabled}
        >
            <i className="fa-solid fa-rotate-right"></i>
        </button>

        <button
            type="button"
            className="toolbar-btn"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            disabled={disabled}
        >
            <i className="fa-solid fa-minus"></i>
        </button>
        <button
            type="button"
            className="toolbar-btn"
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            disabled={disabled}
        >
            <i className="fa-solid fa-eraser"></i>
        </button>
    </div>
  );
}

export default Toolbar;
