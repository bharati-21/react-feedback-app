import React from 'react'
import Card from './Card'
import {useState, useContext, useEffect} from 'react';
import { FeedbackContext } from '../context/FeedbackContext';

function FeedbackForm() {
    const [formData, setFormData] = useState({
        reviewComment: '',
        rating: ''
    });

    const [error, setError] = useState(true);
    const {addFeedback, feedbackEdit, updateFeedbackItem} = useContext(FeedbackContext);

    useEffect(() => {
        if(feedbackEdit.edit === true) {
            setError(false);
            const {text, id, rating} = feedbackEdit.item;
            setFormData({
                reviewComment: text,
                rating,
            })
        }
    }, [feedbackEdit])

    function handleChange(event) {
        const {value, name} = event.target;

        if(name === 'reviewComment') {
            if(value.trim().length < 10)     
                setError(true);
            else 
                setError(false);
        }
        setFormData(oldFormData => ({...oldFormData, [name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(formData.reviewComment.trim().length >= 10) {
            const newFeedback = {
                text: formData.reviewComment,
                rating: formData.rating
            }
            if(feedbackEdit.edit) {
                updateFeedbackItem(feedbackEdit.item.id, newFeedback);
            }
            else {
                addFeedback(newFeedback);
            }
            setFormData({
                reviewComment: '',
                rating: '',
            });
        }
        else {
            setError(true);
        }
    }

    return (
        <section className='feedback-form-container container'>
            <Card>
                <form className='feedback-form' onSubmit={handleSubmit}>
                    <h3 className='feedback-form-head'>
                        How would you rate your service with us?
                    </h3>
                    <ul>
                        <li>
                            <input 
                                type="radio" 
                                name="rating" 
                                id="rating-1"
                                value="1" 
                                onChange={handleChange}
                                checked={formData.rating == 1}
                            />
                            <label htmlFor="rating-1">
                                1
                            </label>
                        </li>
                        
                        <li>
                            <input 
                                type="radio" 
                                name="rating" 
                                id="rating-2" 
                                value="2"
                                onChange={handleChange}
                                checked={formData.rating == 2}
                            />
                            <label htmlFor="rating-2">
                                2
                            </label>
                        </li>

                        <li>
                            <input 
                                type="radio" 
                                name="rating" 
                                id="rating-3" 
                                value="3"
                                onChange={handleChange}
                                checked={formData.rating == 3}    
                            />
                            <label htmlFor="rating-3">
                                3
                            </label>
                        </li>

                        <li>
                            <input 
                                type="radio" 
                                name="rating" 
                                id="rating-4" 
                                value="4"
                                onChange={handleChange}
                                checked={formData.rating == 4}
                            />
                            <label htmlFor="rating-4">
                                4
                            </label>
                        </li>

                        <li>
                            <input 
                                type="radio" 
                                name="rating" 
                                id="rating-5" 
                                value="5"
                                onChange={handleChange}
                                checked={formData.rating == 5}
                            />
                            <label htmlFor="rating-5">
                                5
                            </label>
                        </li>

                        <li>
                            <input 
                                type="radio" 
                                name="rating" 
                                id="rating-6" 
                                value="6" 
                                onChange={handleChange}
                                checked={formData.rating == 6}
                            />
                            <label htmlFor="rating-6">
                                6
                            </label>
                        </li>

                        <li>
                            <input 
                                type="radio" 
                                name="rating" 
                                id="rating-7" 
                                value="7"
                                onChange={handleChange}
                                checked={formData.rating == 7}
                            />
                            <label htmlFor="rating-7">
                                7
                            </label>
                        </li>

                        <li>
                            <input 
                                type="radio" 
                                name="rating" 
                                id="rating-8" 
                                value="8"
                                onChange={handleChange}
                                checked={formData.rating == 8}
                            />
                            <label htmlFor="rating-8">
                                8
                            </label>
                        </li>

                        <li>
                            <input 
                                type="radio" 
                                name="rating" 
                                id="rating-9"
                                value="9" 
                                onChange={handleChange}
                                checked={formData.rating == 9}
                            />
                            <label htmlFor="rating-9">
                                9
                            </label>
                        </li>

                        <li>
                            <input 
                                type="radio" 
                                name="rating" 
                                id="rating-10" 
                                value="10"
                                onChange={handleChange}
                                checked={formData.rating == 10}
                            />
                            <label htmlFor="rating-10">
                                10
                            </label>
                        </li>
                    </ul>
                    <div className="comment-container">
                        <input 
                            type="text" 
                            name="reviewComment" 
                            id="review-text" 
                            placeholder='Write a Review' 
                            value={formData.reviewComment}
                            onChange={handleChange}
                        />
                        <input 
                            type="submit" 
                            className='send-review' 
                            value="Send" 
                            disabled={error}
                        />
                    </div>
                    {
                        error && formData.reviewComment !== "" && (
                            <p>Text must be at least 10 characters</p>
                        )
                    }
                </form>
            </Card>
        </section>
        
    )
}

export default FeedbackForm
