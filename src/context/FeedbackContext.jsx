import { createContext, useState } from "react";
import {nanoid} from 'nanoid';

export const FeedbackContext = createContext();

export default function FeedbackProvider ({children})  {

    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is feedback item 1',
            rating: 10
        },
        {
            id: 2,
            text: 'This is feedback item 2',
            rating: 9
        },
        {
            id: 3,
            text: 'This is feedback item 3',
            rating: 8
        },
    ]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

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
            removeFeedback, 
            addFeedback,
            editFeedback,
            updateFeedbackItem
        }
    }>
        {children}
    </FeedbackContext.Provider>
}

