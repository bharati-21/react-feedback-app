import {Link} from 'react-router-dom'
function Header() {
    return (
        <header className="header">
            <div className="container">
                <Link to="/"><h2>Feedback UI</h2></Link>
            </div>
        </header>
    )
}

export default Header;


// import PropTypes from 'prop-types'

// Header.defaultProps = {
//     text: 'Feedback UI'
// }

// Header.propTypes = {
//     text: PropTypes.string
// }