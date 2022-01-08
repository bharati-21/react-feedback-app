import React, {useContext} from 'react'
import Card from './Card';
import {FaTimes, FaEdit} from 'react-icons/fa';
import { FeedbackContext } from '../context/FeedbackContext';

function FeedbackItem({data}) {
    const {id,text, rating} = data;
    const {removeFeedback, editFeedback, feedbackEdit} = useContext(FeedbackContext);
    
    return (
        <Card>
           <div className='feedback-rating'>{rating}</div>
           
            <div className='feedback-text'>{text}</div>
            <div className="icons">
                <button onClick={(e) => removeFeedback(id)} className='icon close'>
                    <FaTimes color="purple"/>
                </button>
                <button onClick={(e) => editFeedback(data)} className='icon edit'>
                    <FaEdit color="purple"/>
                </button>
            </div>
        </Card>
    )
}

export default FeedbackItem
