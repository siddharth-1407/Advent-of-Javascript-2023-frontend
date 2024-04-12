import React from 'react';
import PropTypes from 'prop-types'; //

export default function PopoverTrigger({ children, handlePopOver }) {
	return <button onClick={handlePopOver}>{children}</button>;
}
PopoverTrigger.propTypes ={
    children : PropTypes.node.isRequired,
    handlePopOver: PropTypes.func.isRequired
}