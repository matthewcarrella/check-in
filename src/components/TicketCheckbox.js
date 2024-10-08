import React from 'react';
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";

const TicketCheckbox = ({needsTickets, toggleTickets}) => {
	const needTickets = needsTickets;
	if (needTickets) {
			return<button onClick={toggleTickets}><ImCheckboxUnchecked /></button>
	} else {
		return <button onClick={toggleTickets}><ImCheckboxChecked /></button>
	}
}

export default TicketCheckbox;