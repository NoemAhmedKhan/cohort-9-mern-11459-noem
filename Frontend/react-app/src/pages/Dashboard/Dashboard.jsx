import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar"
import Pagination from "../../components/Pagination/Pagination"

const Dashboard = () => {

    // Helper Function to extract text of the note content
    function extractText(node) {
        if (!node) return '';

        // If the node has direct text then return
        if (node.text) {
            return node.text;
        }

        // If the node has child content, map and join them
        if (node.content && Array.isArray(node.content)) {
            return node.content.map(extractText).join('');
        }

        return '';
    }

    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
            const fetchDashboard = async () => {
                try {
                    const res = await fetch('http://localhost:8080/dashboard', {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const data = await res.json();
                    console.log(`Status: ${res.status}`, 'Data:', data);
                    if(!res.ok) {
                        localStorage.removeItem("USER");
                        navigate("/login");
                        return;
                    }

                    const formattedNotes = data.map((note) => (
                            {
                                id: note._id,
                                title: note.title,
                                content: extractText(note.content)
                            }
                        )
                    );

                    setNotes(formattedNotes);
                } catch (err) {
                    console.error(err);
                }
            }

            fetchDashboard();
        }, []
    );

    return (
        <>
            <Sidebar />
            <Pagination notes={notes} />
        </>
    );
}

export default Dashboard;