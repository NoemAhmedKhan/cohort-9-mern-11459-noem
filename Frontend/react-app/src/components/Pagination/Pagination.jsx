import { useState } from "react";
import { Link } from "react-router-dom";
import "./Pagination.css";

const NOTES_PER_PAGE = 12;

const Pagination = ({ notes }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(notes.length / NOTES_PER_PAGE);
    const startIndex = (currentPage - 1) * NOTES_PER_PAGE;
    const currentNotes = notes.slice(startIndex, startIndex + NOTES_PER_PAGE);

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="container d-flex flex-column align-items-end my-auto">
            <main className="pagination-main">
                <div className="row g-3">
                    {currentNotes.map((note) => (
                        <Link to={`/notes/${note.id}/view`} key={note.id} className="col-12 col-md-6 col-lg-4 col-xl-3 text-decoration-none">
                            <div className="card note-card h-100 border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-truncate">{note.title}</h5>
                                    <p className="card-text note-preview text-truncate">
                                        {typeof note.content === "string" ? note.content : "No preview available"}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            {totalPages > 1 && (
                <footer className="align-self-center" aria-label="Page navigation example">
                    <ul className="pagination justify-content-center mt-4">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button type="button" className="page-link" onClick={() => goToPage(currentPage - 1)}>
                                Previous
                            </button>
                        </li>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                                <button type="button" className="page-link" onClick={() => goToPage(page)}>
                                    {page}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button type="button" className="page-link" onClick={() => goToPage(currentPage + 1)}>
                                Next
                            </button>
                        </li>
                    </ul>
                </footer>
            )}
        </div>
    );
}

export default Pagination;