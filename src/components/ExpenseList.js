import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

import { TiDelete } from 'react-icons/ti';
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";


const ExpenseItem = (props) => {
	const { dispatch } = useContext(AppContext);
	const { currency } = useContext(AppContext);

	const handleDeleteExpense = () => {
		dispatch({
			type: 'DELETE_EXPENSE',
			payload: props.id,
		});
	};

	const increaseAllocation = (name) => {
		const expense = {
			name: name,
			cost: 10,
		};

		dispatch({
			type: 'ADD_EXPENSE',
			payload: expense
		});

	}
	const decreaseAllocation = (name) => {
		const expense = {
			name: name,
			cost: 10,
		};

		dispatch({
			type: 'RED_EXPENSE',
			payload: expense
		});

	}


	return (
		<tr>
			<td>{props.value}</td>
			<td>{currency}{props.cost}</td>
			<td><AiFillPlusCircle size = {70} color="green" onClick={event=> increaseAllocation(props.name)}>+</AiFillPlusCircle></td>
			<td><AiFillMinusCircle size = {70} color ="red" onClick={event=> decreaseAllocation(props.name)}>-</AiFillMinusCircle></td>
			<td><TiDelete size={70} onClick={handleDeleteExpense}></TiDelete></td>
		</tr>
	);
};

const ExpenseList = () => {
	const { charAttributes } = useContext(AppContext);
	
	return (
		<table className='table'>
			<thead className="thead-light">
				<tr>
				  <th scope="col">Strength</th>
				  <th scope="col">Dexterity</th>
				  <th scope="col">Constitution</th>
				  <th scope="col">Intelligence</th>
				  <th scope="col">Wisdom</th>
				  <th scope="col">Charsima</th>
				</tr>
			</thead>
			<tbody>
			{charAttributes.map((charAttribute) => (
				<ExpenseItem id={charAttribute.id} key={charAttribute.id} name={charAttribute.name} value={charAttribute.value} />
			))}
			</tbody>
		</table>
	);
};

export default ExpenseList;
