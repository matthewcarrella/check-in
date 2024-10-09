import React from 'react';
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";

const TShirtCheckbox = ({needTee, toggleTShirt}) => {
	const needShirt = needTee;
	if (needShirt) {
			return<button onClick={toggleTShirt}><ImCheckboxUnchecked /></button>
	} else {
		return <button onClick={toggleTShirt}><ImCheckboxChecked /></button>
	}
}

export default TShirtCheckbox;