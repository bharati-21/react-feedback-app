import { createContext, useState, useEffect } from "react";
import {nanoid} from 'nanoid';

export const FeedbackContext = createContext();

export default function FeedbackProvider ({children})  {

    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    useEffect(() => {
        fetchFeedback();
    }, [])

    // fectch feedback

    const fetchFeedback = async () => {
        const res = await fetch('http://localhost:5000/feedback?_sort=id&_order=desc');
        const data = await res.json();
        setFeedback(data);
        setIsLoading(false);
    }

    // Remove feedback
    function removeFeedback(id) {
        if(window.confirm('Are you sure you want to delete this feedback?')) {
            setFeedback(oldFeedback => oldFeedback.filter(data => data.id !== id));
        }
    }


    // Add feedback to the list
    function addFeedback(newFeedback, ) {
        setFeedback(oldFeedback => {
            return [...oldFeedback, {
                id: nanoid(),
                ...newFeedback
            }]
        })
    }

    // set item to be updated
    function editFeedback(item) {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    function updateFeedbackItem(id, item) {
        setFeedback(oldFeedbackItems => oldFeedbackItems.map(oldFeedback => {
           return oldFeedback.id === id ? {...item} : oldFeedback;
        }))
    }

    return <FeedbackContext.Provider value={
        {
            feedback,
            feedbackEdit,
            isLoading,
            removeFeedback, 
            addFeedback,
            editFeedback,
            updateFeedbackItem
        }
    }>
        {children}
    </FeedbackContext.Provider>
}

