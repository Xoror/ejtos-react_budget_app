import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import "./Header.css";
import Form from 'react-bootstrap/Form';

/*{paddingTop:"30px",paddingBottom:"30px",paddingRight:"30px",paddingLeft:"30px"}*/

const NavBar = () => {
	const currentState= useContext(AppContext);
	const {dispatch, charName} = useContext(AppContext);

	const downloadFile = ({ data, fileName, fileType }) => {
		// Create a blob with the data we want to download as a file
		const blob = new Blob([data], { type: fileType })
		// Create an anchor element and dispatch a click event on it
		// to trigger a download
		const a = document.createElement('a')
		a.download = fileName
		a.href = window.URL.createObjectURL(blob)
		const clickEvt = new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: true,
		})
		a.dispatchEvent(clickEvt)
		a.remove()
	}

	const exportToJson = e => {
		e.preventDefault()
		let test = ""
		if(charName === "") {
			test = "character"
		}
		else {
			let test1 = charName.split(" ")
			test1.map(word => {
				test += word
			})
		}
		downloadFile({
			data: JSON.stringify(currentState, null, "\t"),
			fileName: test +'.json',
			fileType: 'text/json',
		})
	}
	

	
	const readFileOnUpload = (uploadedFile) => {
	   const fileReader = new FileReader();
	   fileReader.onloadend = () => {
		  try {
			/*console.log(JSON.parse(fileReader.result));*/
			dispatch({
				type: 'IMPORT',
				payload: JSON.parse(fileReader.result)
			});
			}catch(e) {
				console.log("**Not valid JSON file!**");
			}
		}
		if( uploadedFile!== undefined) {
		  fileReader.readAsText(uploadedFile);
		}
	}
	
	return(
		<nav className="navbar navbar-light bg-light">
		  <div className="container-fluid">
			<a className="navbar-brand" href="/">Navbar</a>
			<form className="d-flex">
				<label  htmlFor="file-upload" className="btn btn-outline-success">
					 Import
				</label>
				<input id="file-upload" type="file" onChange={(e)=>readFileOnUpload(e.target.files[0])}></input>
				<button className="btn btn-outline-success" type="submit" onClick={exportToJson}>Export</button>
			</form>
		  </div>
		</nav>
	)
}

const CharacterName = () => {
	const { dispatch } = useContext(AppContext);
	const { charName, casting } = useContext(AppContext);
	
	
	const handleNameChange = (event) => {
		const name_change = event.target.value;
		dispatch({
			type: 'SIMPLE_STATE_CHANGE',
			payload: [name_change, "NameChange"]
		});
	};
	const handleChecked = (event) => {
		dispatch({
			type: 'IS_CASTER_CHANGE',
			payload: event.target.checked
		})
	}
	return (
		<div id="CharacterName" /*className='alert alert-secondary'*/>
			<span>Character Name:</span>
			<br></br>
			<input required='required' type='text' id='characterName' value={charName} placeholder="Insert Character name here" onChange={handleNameChange}></input>
			<br></br>
			<Form.Check type="checkbox" checked={casting.isCaster} id="is-caster-check" label="Is character spellcaster?" onChange={handleChecked}></Form.Check>
		</div>
	);
};

const MiscInfo = () => {
	const { dispatch, charLevel } = useContext(AppContext);
	
	const handleChange = (event) => {
		let level_change = event.target.value;
		let id = event.target.id;
		dispatch({
			type: 'SIMPLE_STATE_CHANGE',
			payload: [level_change, id]
		});
	};
	
	return (
		<div className="container">
			<div className='row '>
				<div className='col'>
					<span>Lineage: </span>
					<br></br>
					<input required='required' type='text' id='Lineage' ></input> 
				</div>
				<div className='col'>
					<span>Background: </span>
					<br></br>
					<input required='required' type='text' id='Background'></input> 
				</div>
			</div>
			
			<div className='row'>
				<div className='col'>
					<input required='required' type='number' min="1" max="20" id='Level' value={charLevel} onChange={handleChange}></input> 
					<br></br>
					<span>Character Level: </span>
				</div>
				<div className='col'>
					<input required='required' type='text' id='Experience Points'></input> 
					<br></br>
					<span>Experience Points: </span>
				</div>
			</div>
		</div>
	);
};

const CharacterClass = () => {
	const { dispatch } = useContext(AppContext);
	const { charClass } = useContext(AppContext);
	const { charSubclass } = useContext(AppContext);
	
	const handleClassChange = (event) => {
		let id = event.target.id;
		if(id === "Class") {
			id = "ClassChange";
		}
		else if (id === "subClass") {
			id = "SubClassChange";
		}
		const class_change = event.target.value;
		dispatch({
			type: 'SIMPLE_STATE_CHANGE',
			payload: [class_change, id]
		});
	};
	
	return (
		<div id="charClass" /*className='alert alert-secondary'*/ >
			<span >Class: {charClass}</span>
			<br></br>
			<input
				required='required'
				type='text'
				id='Class'
				value={charClass}
				placeholder="Insert Character Class here"
				
				onChange={handleClassChange}
				>
			</input>
			<br></br>
			<span  >Sublass: {charSubclass}</span>
			<br></br>
			<input required='required' type='text' id='subClass' value={charSubclass} placeholder="Insert Character Sublass here" onChange={handleClassChange}>
			</input>
		</div>
	);
};

export {CharacterName, MiscInfo, CharacterClass, NavBar};
