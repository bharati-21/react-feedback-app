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
        const res = await fetch('/feedback?_sort=id&_order=desc');
        const data = await res.json();
        setFeedback(data);
        setIsLoading(false);
    }

    // Remove feedback
    const removeFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete this feedback?')) {
            await fetch(`/feedback/${id}`,{
                method: 'DELETE'
            });
            setFeedback(oldFeedback => oldFeedback.filter(data => data.id !== id));
        }
    }

    const addFeedback = async (newFeedback) => {
        const res = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })

        const data = await res.json();
        setFeedback(oldFeedback => {
            return [...oldFeedback, {
                id: nanoid(),
                ...data
            }]
        })
    }

    // set item to be updated
    const editFeedback = item => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    const updateFeedbackItem = async (id, item) => {
        const res = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(item)
        })

        const data = await res.json();

        setFeedback(oldFeedbackItems => oldFeedbackItems.map(oldFeedback => {
           return oldFeedback.id === id ? {...data} : oldFeedback;
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

