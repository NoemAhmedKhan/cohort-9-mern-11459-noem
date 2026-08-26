import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import TipTap from "./TipTap"
import DeleteConfirmModal from "../../modals/DeleteConfirmModal"
import "./NoteEditor.css"
import { logger } from "../../utils/logger"

function NoteEditor() {
    const navigate = useNavigate();
    const {id, mode} = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const isReadOnly = mode === "view";
    const tiptapRef = useRef(null);

    // IF-LOGIC TO AVOID IRRELEVANT MODE CALL
    useEffect(() => {
        if (id && mode !== "view" && mode !== "edit") {
            navigate("/dashboard");
        }
    }, [id, mode, navigate]);

    const createNote = async () => {
        const note = {
            title: title,
            content: tiptapRef.current.getContent()
        }

        try {
            const res = await fetch(`http://localhost:8080/notes/create`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });

            const data = await res.json();
            logger.info(`Note created — status ${res.status}`);
            if(res.status === 401) {
                logger.warn('Create note — session expired, redirecting to login');
                localStorage.removeItem("USER");
                navigate("/login");
            }
            if(res.ok) navigate("/dashboard");
        } catch (err) {
            logger.error('NoteEditor.jsx: Note creation failed', err.message);
        }
    }

    const editNote = async () => {
        const note = {
            title: title,
            content: tiptapRef.current.getContent()
        }

        try {
            const res = await fetch(`http://localhost:8080/notes/${id}/edit`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });

            const data = await res.json();
            logger.info(`Note edited — status ${res.status}`);
            if(res.status === 401) {
                logger.warn('Edit note — session expired, redirecting to login');
                localStorage.removeItem("USER");
                navigate("/login");
            }
            if(res.ok) navigate("/dashboard");
        } catch (err) {
            logger.error('NoteEditor.jsx: Note edit failed', err.message);
        }
    }

    const onSave = async () => {
        if(mode === "edit") await editNote();
        else if(!id) await createNote();
    }

    const onConfirmDelete = async () => {
        try {
            const res = await fetch(`http://localhost:8080/notes/${id}/delete`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await res.json();
            logger.info(`Note deleted — status ${res.status}`);
            if(res.status === 401) {
                logger.warn('Delete note — session expired, redirecting to login');
                localStorage.removeItem("USER");
                navigate("/login");
            }
            if(res.ok) navigate("/dashboard");
        } catch (err) {
            logger.error('NoteEditor.jsx: Note deletion failed', err.message);
        }
    }

    const onCancelDelete = () => {
        setShowDeleteModal(false);
    }

    useEffect(() => {
            // Incase of /notes/create just return
            if(!id) return;

            // Incase of /notes/id/view
            const fetchNote = async () => {
                try {
                    const res = await fetch(`http://localhost:8080/notes/${id}/view`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const data = await res.json();
                    logger.info(`Note fetched — status ${res.status}`);
                    if(res.status === 401) {
                        logger.warn('Fetch note — session expired, redirecting to login');
                        localStorage.removeItem("USER");
                        navigate("/login");
                        return;
                    }

                    if(res.ok) {
                        setTitle(data.title);
                        tiptapRef.current.setContent(data.content);
                    }
                } catch (err) {
                    logger.error('NoteEditor.jsx: Note fetch failed', err.message);
                }
            }

            fetchNote();
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