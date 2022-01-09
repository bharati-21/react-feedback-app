import React, {useContext} from 'react';
import FeedbackItem from './FeedbackItem';
import {motion, AnimatePresence} from 'framer-motion'
import {FeedbackContext} from '../context/FeedbackContext';
import Spinner from '../shared/Spinner';

function FeedbackList() {

    const {feedback, feedbackEdit, isLoading} = useContext(FeedbackContext); 

    if(!isLoading && (!feedback || feedback.length === 0)) {
        return <p>No Feedback Yet</p>
    }

    return isLoading ? 
        <Spinner /> : (
        <section className='feedback-list'>
            <article className="container">
                <AnimatePresence>
                {
                    feedback.map(data => {
                        return <motion.div 
                            className={`feedback-item ${feedbackEdit.edit && feedbackEdit.item.id === data.id && 'active-item'}`}
                            key={data.id}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}} >
                            <FeedbackItem 
                                key={data.id} 
                                data={data} 
                            />
                        </motion.div>
                    })
                }
                </AnimatePresence>
            </article>
        </section>
    )
}


// return (
//     <section className='feedback-list'>
//         <article className="container">
//             <FeedbackStats feedbackData={feedbackData}/>
//             {
//                 feedbackData.map(data => {
//                     return <FeedbackItem key={data.id} data={data} removeFeedback={removeFeedback}/>
//                 })
//             }
//         </article>
//     </section>
// )

export default FeedbackList
