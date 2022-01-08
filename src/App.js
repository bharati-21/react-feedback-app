import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import FeedbackStats from "./components/FeedbackStats";
import FeedbackList from './components/FeedbackList';
import FeedbackForm from "./components/FeedbackForm";
import AboutIconLink from "./components/AboutIconLink";
import FeedbackProvider  from "./context/FeedbackContext";

export default function App() {

    return (
        <FeedbackProvider>
            <Router>
                <Header />
                <Routes>
                    <Route exact path='/'
                        element={
                            <>
                                <FeedbackForm />
                                <FeedbackStats/>
                                <FeedbackList />
                            </>
                        }>
                    </Route>
                </Routes>
                <AboutIconLink />
                    {/* 
                        <Card>
                            <NavLink to="/" activeClassName='active'>Home</NavLink>
                            <NavLink to="/about" activeClassName='active'>About</NavLink>
                        </Card>
                    */}
            </Router>
        </FeedbackProvider>
        
    )
}

