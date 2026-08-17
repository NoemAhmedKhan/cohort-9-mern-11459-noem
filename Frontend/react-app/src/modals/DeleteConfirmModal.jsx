import "./DeleteConfirmModal.css"

const DeleteConfirmModal = ({ noteTitle, onConfirm, onCancel }) => {
    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content delete-modal-content border-0 bg-light">
                        <div className="modal-body text-center p-4">
                            <i className="fa-solid fa-trash-can delete-modal-icon mb-3"></i>
                            <h5 className="mb-2">Delete note?</h5>
                            <p className="mb-4">
                                {noteTitle ? `"${noteTitle}"` : "This note"} will be permanently deleted.
                            </p>
                            <div className="d-flex justify-content-center">
                                <button type="button" className="btn btn-outline-secondary mx-1" onClick={onCancel}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-outline-danger mx-1" onClick={onConfirm}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteConfirmModal;