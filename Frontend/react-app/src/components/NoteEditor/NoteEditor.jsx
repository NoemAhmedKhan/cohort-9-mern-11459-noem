import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import TipTap from "./TipTap"
import DeleteConfirmModal from "../../modals/DeleteConfirmModal"
import "./NoteEditor.css"

function NoteEditor() {
    const navigate = useNavigate();
    const {id, mode} = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const isReadOnly = mode === "view";
    const tiptapRef = useRef(null);

    const onSave = () => {
        const note = {
            title: title,
            content: tiptapRef.current.getContent()
        }

    //     POST API
    }

    const onConfirmDelete = () => {
    //     DELETE API

        navigate("/dashboard");
    }

    const onCancelDelete = () => {
        navigate(`/notes/${id}/view`);
    }

    useEffect(
        () => {
        //     GET API
        //     Set Note Title
        //     Set Note Content
        }, [id]
    );

    return (
        <>
        {showDeleteModal && (
            <DeleteConfirmModal
                noteTitle={title}
                onConfirm={onConfirmDelete}
                onCancel={onCancelDelete}
            />
    )}

        <div className="note-editor p-3 d-flex flex-column align-self-end">
            <div className="w-100">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Your Title"
                    readOnly={isReadOnly}
                />
            </div>

            <TipTap
                key={id}
                content={content || ""}
                editable={!isReadOnly}
                ref={tiptapRef}
            />

            {
                (isReadOnly) ? (
                <div className="card w-100 border-0 mt-2">
                    <div className="card-body d-flex justify-content-end">
                    <button type="button" className="btn btn btn-outline-success mx-1" onClick={() => navigate(`/notes/${id}/edit`)}>
                        <i className="fa-solid fa-pen me-2"></i>Edit
                    </button>
                    <button type="button" className="btn btn btn-outline-danger mx-1" onClick={() => setShowDeleteModal(true)}>
                        <i className="fa-solid fa-trash-can me-2"></i>Delete
                    </button>
                    </div>
                </div>
            ) : (
                    <div className="card w-100 border-0 mt-2">
                        <div className="card-body d-flex justify-content-end">
                            <button type="button" className="btn btn-outline-secondary mx-1" onClick={() => navigate("/dashboard")}> Cancel </button>
                            <button type="button" className="btn btn-outline-primary mx-1" onClick={onSave}> Save </button>
                        </div>
                    </div>
                )
            }
        </div>
        </>
    );
}

export default NoteEditor;