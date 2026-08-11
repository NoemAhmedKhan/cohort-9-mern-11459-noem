import { useEffect } from "react"
import Sidebar from "../../components/Sidebar/Sidebar"
import Pagination from "../../components/Pagination/Pagination"

const Dashboard = () => {

    useEffect(
        () => {
            // Fetch JWT From LocalStorage
            // Fetch User Details From LocalStorage
            // Validate JWT
            //     GET API
           //     Fetch Notes
        }, []
    );

    return (
        <>
        <Sidebar />
        <Pagination notes={
            [
                {id: 1, title: "Morning Reminder", content: "Start the day without checking social media. Drink water, make a plan, and finish the most important task first."},
                {id: 2, title: "Weekend Plans", content: "Clean the workspace, organize project files, back up important documents, watch a movie, and spend some time away from the computer."},
                {id: 3, title: "Quote of the Day", content: "Success is the sum of small efforts, repeated day in and day out."},
                {id: 4, title: "Things to Remember", content: "Don't forget to charge the laptop, back up important files, reply to pending messages, and check tomorrow's schedule before going to bed."},
                {id: 5, title: "Random Idea", content: "Create a simple productivity app that turns a large goal into smaller daily tasks and shows progress using a visual timeline."},
                {id: 6, title: "Books to Read", content: "1. Atomic Habits 2. Deep Work 3. The Psychology of Money 4. The Alchemist 5. The Pragmatic Programmer"},
                {id: 7, title: "Evening Reflection", content: "Today wasn't perfect, but I made progress. Tomorrow I want to focus less on distractions and more on completing the tasks that actually matter."},
                {id: 8, title: "Quick Reminder", content: "Call the bank tomorrow morning and check whether the pending transaction has been processed."},
                {id: 9, title: "Coding Tip", content: "When debugging, don't change multiple things at once. Reproduce the problem, isolate the cause, make one change, and test again."},
                {id: 10, title: "Travel Idea", content: "Plan a short weekend trip somewhere quiet. Look for a place with good scenery, comfortable accommodation, and minimal crowds."}
            ]
        } />
        </>
    );
}

export default Dashboard;