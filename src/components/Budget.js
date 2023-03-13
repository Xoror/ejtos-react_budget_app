import React, { useContext  } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
	
	const { budget } = useContext(AppContext);
	const { currency } = useContext(AppContext);
	const { dispatch } = useContext(AppContext);

	const handleBudget = (event) => {
		const budget_change = event.target.value;
		dispatch({
			type: 'BUDGET_CHANGE',
			payload: budget_change,
		});
	};
	
	return (
		<div className='alert alert-secondary'>
			<span>Budget: {budget}</span>
			<input
						required='required'
						type='number'
						id='budget'
						value={budget}
						
						step = "10"
						max = "20000"
						onChange={handleBudget}
						>
			</input>
		</div>
	);
};

export default Budget;
