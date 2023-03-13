import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';



const CurrencyForm = () => {
	const { dispatch } = useContext(AppContext);

	const handleCurrency = (event) => {
		const currentCurrency = event.target.value;
		dispatch({
			type: 'CHG_CURRENCY',
			payload: currentCurrency,
		});
	};
	
	return (
		<div className='input-group'>
		    <label className='input-group-text' htmlFor='inputGroupSelect08' style={{ backgroundColor: "lightgreen" }}>Currency: </label>
			<select class="custom_select" id="inputGroupSelect01" style={{ backgroundColor: "lightgreen" }} onChange={handleCurrency}>
				<option defaultValue value="£"> £ Pound</option>
				<option value="$"> $ Dollar</option>
				<option value="€"> € Euro</option>
				<option value="₹"> ₹ Rupee</option>
			</select>
		</div>
	);
};

export default CurrencyForm;