import React from 'react';
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";

const TShirtCheckbox = ({participantNeedsShirt, toggleTShirt}) => {
	const pNeedShirt = participantNeedsShirt;
	if (pNeedShirt) {
			return<button onClick={toggleTShirt}><ImCheckboxUnchecked /></button>
	} else {
		return <button onClick={toggleTShirt}><ImCheckboxChecked /></button>
	}
}

export default TShirtCheckbox;