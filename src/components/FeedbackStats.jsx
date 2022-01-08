import React, {useContext} from 'react'
import { FeedbackContext } from '../context/FeedbackContext';

function FeedbackStats() {

    const {feedback} = useContext(FeedbackContext);
    const sum = feedback.reduce((total, data) => {
        return total + parseInt(data.rating);
    }, 0 )
    const average = (sum / feedback.length).toFixed(1);

    return (
        <div className="container">
            <div className="feedback-stats">
                <h4 className="total-reviews">{feedback.length} Reviews</h4>
                <h4 className="average-rating">Average Rating: {isNaN(average)? 0 : average}</h4>
            </div>
        </div>
    )
}

export default FeedbackStats
