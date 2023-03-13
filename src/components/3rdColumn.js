import React, { useContext, useState } from 'react';

import CreatableSelect from 'react-select/creatable';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Collapse from 'react-bootstrap/Collapse';
import { AiFillCloseSquare } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";

import { AppContext } from '../context/AppContext';
import "./3rdColumn.css";
import "./MainBody.css";



//Features, Actions, Spells etc

const Features = () => {
	const {casting, actions, spells} = useContext(AppContext)
	const [radioValue, setRadioValue] = useState('0');
	
	const radios = [
    { name: "Features", value: "0" },
    { name: "Actions", value: "1" },
	{ name: "Spells", value: "2" },
    { name: "Inventory", value: "3" },
	{ name: "Notes", vlaue: "4" },
	];
	const headersActions = ["Action", "Bonus Action", "Reaction", "Special"];
	const listSlots = ["Cantrip","1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
	const headersSpells = listSlots.slice(0,listSlots.indexOf(casting.highestSpellSlot)+1)
	const sections = [<FeaturesPart/>, <Actions actions={actions} id="Actions" options={headersActions} headers={headersActions}/>, 
						<Actions offCanvas={false} actions={spells} id="Spells" options={listSlots} headers={headersSpells} spells={true}/>, <Inventory/>, <Notes/>]
	return (
		<Card bg="secondary" border="dark">
			<div>
				<ButtonGroup>
					{radios.map((radio, idx) => (
						<ToggleButton
						
						key={idx}
						id={`radio-${idx}`}
						type="radio"
						variant='primary'
						name="radio"
						value={radio.value}
						checked={radioValue === radio.value}
						onChange={(e) => setRadioValue(e.currentTarget.value)}
						>
							{radio.name}
						</ToggleButton>
					))}
				</ButtonGroup>
			</div>
			<div>
				{sections[radioValue]}
			</div>
		</Card>
	)
};

const FeaturesPart = () => {
	const {dispatch, features} = useContext(AppContext);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch({
			type:'ADD_FEATURE',
			payload: {name: event.target[0].value, level: event.target[1].value, featureClass: event.target[2].value, 
				featureSubclass:event.target[3].value, description: event.target[4].value},
		})
	}
	
	return (
		<Card bg="secondary" >
			<Modal size="lg" show={show} onHide={(event) => handleSubmit(event)}>
				<Modal.Header closeButton onClick={handleClose}>
					<Modal.Title>
						Adding a Class feature
					</Modal.Title>
				</Modal.Header>
				
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
						<InputGroup className="mb-6">
							<InputGroup.Text id="FeatureName">Feature: </InputGroup.Text>
							<Form.Control placeholder="Feature" aria-label="Feature Name" aria-describedby="feature-name"/>

							<InputGroup.Text id="FeatureLevel">Level: </InputGroup.Text>
							<Form.Control placeholder="Level" aria-label="Feature Level" aria-describedby="feature-level"/>
						</InputGroup>
						<InputGroup className="mb-3">
							<InputGroup.Text id="FeatureClass">Class: </InputGroup.Text>
							<Form.Control placeholder="Class" aria-label="Feature Class" aria-describedby="feature-class"/>

							<InputGroup.Text id="FeatureSubclass">Level: </InputGroup.Text>
							<Form.Control placeholder="Subclass" aria-label="Feature Subclass" aria-describedby="feature-subclass"/>
						</InputGroup>
						<InputGroup>
							<InputGroup.Text>Feature Description: </InputGroup.Text>
							<Form.Control as="textarea" aria-label="feature-description" />
						</InputGroup>
					</Modal.Body>
						
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" type="submit">
							Save Changes
						</Button>
					</Modal.Footer>
					
				</Form>
			</Modal>
			<div>
				{features.map((feature, index) => (
					<FeatureBox feature={feature} id={index} key={index}/>
				))}
			</div>
			<Button onClick={handleShow}>
				Launch demo modal
			</Button>
		</Card>
	)
};

const FeatureBox = (props) => {
	const {dispatch} = useContext(AppContext)
	const [open, setOpen] = useState(true);
	const startEdit = () => setOpen(false)
	const endEdit = (event) => {
		event.preventDefault()
		setOpen(true)
	}
	
	var color;
	if (props.id%2 === 0) {
		color = "#51585e";
	}
	else {
		color = "#676f77";
	}
	const handleDelete = (event) => {
		event.preventDefault();
		dispatch({
			type:'DELETE_FEATURE',
			payload: props.id,
		})
	}
	const handleSubmit = (event) => {
		endEdit(event)
		var data = {name: event.target[0].value, level: event.target[1].value, featureClass: event.target[2].value, 
						featureSubclass: event.target[3].value, description: event.target[4].value}
		dispatch({
			type: 'EDIT_FEATURE',
			payload: data,
			index: props.id,
		})
	}
	return (
		<div>
			{!open ? (
				<div id="edit-form">
					<Form onSubmit={handleSubmit}>
						<Card style={{background:"none", backgroundColor:color}}>
							<InputGroup className="mb">
								<InputGroup.Text>Name</InputGroup.Text> 
								<Form.Control type="text" id="change-name" defaultValue={props.feature.name} placeholder="Enter feature name"/>
								<InputGroup.Text>Level</InputGroup.Text>
								<Form.Control type="text" id="change-level" defaultValue={props.feature.level} placeholder="Enter level"/>
							</InputGroup>
							<InputGroup className="mb">
								<InputGroup.Text> Class </InputGroup.Text> 
								<Form.Control type="text" id="change-class" defaultValue={props.feature.featureClass} placeholder="Enter Class"/>
								<InputGroup.Text> Subclass </InputGroup.Text>
								<Form.Control type="text" id="change-subclass" defaultValue={props.feature.featureSubclass} placeholder="Enter Subclass"/>
							</InputGroup>
							<Form.Control as="textarea" id="change-description" defaultValue={props.feature.description} placeholder="Enter Description"/>
							<ButtonGroup className="mb">
								<Button variant="success" type="submit"> Submit Changes </Button>
								<Button variant="danger"> Discard Changes </Button>
							</ButtonGroup >
						</Card>
					</Form>
				</div>) : (
				<div id="display-form">
					<Card style={{background:"none", backgroundColor:color, paddingRight:"0.5em", paddingLeft:"0.5em"}}>
						<Row>
							<Col>
								<span>Name: {props.feature.name}</span>
							</Col>
							<Col md="auto">
								<Row>
									<Col md="auto" style={{paddingRight:"6px",paddingLeft:"0"}}> <span>Level: {props.feature.level}</span> </Col>
									<Col md="auto" style={{paddingRight:"0",paddingLeft:"0"}}> 
										<RiFileEditFill type="button" color="black" size="23" id="edit-button" onClick={startEdit} className="edit-button" />
										<AiFillCloseSquare type="button" color="#dc3545" size="23" id="delete-button" onClick={handleDelete} className="edit-button" style={{backgroundColor:"white", padding:"0px"}}/> 
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col md="auto">
								<span>Class: {props.feature.featureClass}</span>
							</Col>
							<Col md="auto">
								<span> Subclass: {props.feature.featureSubclass}</span>
							</Col>
						</Row>
						<Row>
							<p>Description: {props.feature.description}</p>
						</Row>
					</Card>
				</div>
			)}
		</div>
	)
};

//Actions, Bonus Actions, Reactions etc

const Actions = (props) => {
	const {dispatch} = useContext(AppContext);
	const handleSubmit = (event) => {
		event.preventDefault();
		var data = {}
		if (props.id === "Spells") {
			data = {name: event.target[0].value, range: event.target[1].value, damage: event.target[2].value, type: event.target[3].value, 
						scaling: event.target[4].value, isPrepared: "true", damageType: event.target[6].value};
		}
		else {
			data = {name: event.target[0].value, range: event.target[1].value, damage: event.target[2].value, type: event.target[3].value, 
						scaling: event.target[4].value, isProficient: event.target[5].value, damageType: event.target[6].value};
		}
		dispatch({
			type: 'ADD_ACTION',
			payload: data,
			id: props.id
		})
	}
	
	return (
		<Card bg="secondary" id="ActionsPart">
			{props.spells ? <SpellList /> : "" }
			{props.headers.map((header, index) => (
				<ActionTable offCanvas={props.offCanvas} id={props.id} key={index} header={header} bodies={props.actions.filter((action) => {return action.type === header})} spells={props.spells}/>
			))}

			<Form onSubmit={handleSubmit}>
				<InputGroup>
					<Form.Control placeholder="Name" aria-label="Name" aria-describedby="name"/>
					<Form.Control placeholder="Range" aria-label="Range" aria-describedby="range"/>
					<Form.Control placeholder="Damage" aria-label="damage-dice" aria-describedby="damage-dice"/>
				</InputGroup>
				<InputGroup>
					<Form.Select aria-label="action-type-select">
						{props.id === "Actions" ? <option key="0">Choose Action Type</option>:<option key="0">Choose Spell Slot</option>}
						{props.options.map((option1, index) => 
							<option key={index} value={option1}>{option1}</option>
						)}
					</Form.Select>
					<Form.Select aria-label="scaling-attribute">
						<option>Choose Scaling Attribute</option>
						<option value="Strength">Strength</option>
						<option value="Dexterity">Dexterity</option>
						<option value="Constitution">Constitution</option>
						<option value="Intelligence">Intelligence</option>
						<option value="Wisdom">Wisdom</option>
						<option value="Charisma">Charisma</option>
						<option value="Charisma">None</option>
					</Form.Select>
				</InputGroup>
				<InputGroup>
					{props.spells ? 
					""
					: <Form.Select aria-label="is-proficient">
						<option>Is proficient?</option>
						<option value={true}>Yes</option>
						<option value={false}>No</option>
					</Form.Select> }
					<Form.Select aria-label="damage-type">
						<option>Choose Damage Type</option>
						<option value="Bludgeoning">Bludgeoning</option>
						<option value="Slashing">Slashing</option>
						<option value="Piercing">Piercing</option>
						<option value="Fire">Fire</option>
						<option value="Cold">Cold</option>
						<option value="Lightning">Lightning</option>
						<option value="Thunder">Thunder</option>
						<option value="Acid">Acid</option>
						<option value="Poison">Poison</option>
						<option value="Necrotic">Necrotic</option>
						<option value="Radiant">Radiant</option>
						<option value="Psychic">Psychic</option>
						<option value="Force">Force</option>
					</Form.Select>
					<Button variant="success" aria-label="submit" type="submit">Submit</Button>
				</InputGroup>
			</Form>
		</Card>
	)
}

const ActionTable = (props) => {
	const {dispatch, charAttributes, proficiency} = useContext(AppContext);
	const scalingBonus = (scale) => {
		if(scale === "None") {
			return ""
		}
		else {
			return charAttributes.filter((charAttribute) => scale === charAttribute.name)[0].bonus
		}
	}
	const handleDelete = (event, type, index) => {
		dispatch({
			type: 'DELETE_ACTION',
			payload: [type, index],
			id: props.id
		})
	}
	const handlePrepared = (event) => {
		dispatch({
			type: "SPELL_PREPARATION",
			payload: [event.target.id, event.target.checked],
			offCanvas: props.offCanvas,
		})
		console.log(props.offCanvas)
	}

	return (
		<div key={props.index} style={{marginLeft:"8px", marginRight:"8px"}}>
			<h5> {props.header} {props.spells ? (props.header === "Cantrip" ? "": "Level") :""} </h5>
			<Table size="sm" style={{color:"white", border:"black"}}>
				<thead>
					<tr>
						{props.spells ? <td></td> : ""}
						<td> Name </td>
						{props.spells ? "" : <td> Hit </td>}
						{props.spells ? "" : <td> Damage </td>}
						<td> Range </td>
						<td> </td>
					</tr>
				</thead>
				<tbody>
					{props.bodies.map( (body, index) => (
						<tr key={index}>
							{props.spells ? 
								<td className="prepared-check" style={{height:"1.5em", width:"1.5em"}}> 
									<input type="checkbox" id={body.name} value="prepared"  onChange={handlePrepared} checked={body.isPrepared}></input>
								</td> : ""}
							<td>{body.name}</td>
							{props.spells ? "" : <td>{body.isProficient ? proficiency.value + scalingBonus(body.scaling) : 0 + scalingBonus(body.scaling)} </td>}
							{props.spells ? "" : <td>{body.damage} + {scalingBonus(body.scaling)} </td>}
							<td>{body.range}</td>
							<td> <AiFillCloseSquare type="button" color="#dc3545" size="1.4em" style={{backgroundColor:"white"}} onClick={(event) => handleDelete(event, props.header, index)}/> </td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

const SpellList = (props) => {
	const {dispatch, sortedSpellList, charClass} = useContext(AppContext)
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		dispatch({
			type: 'BUILD_SPELLLIST',
			payload: charClass
		})
	}
	
	
	/*
	{props.headers.map((header, index) => (
		<ActionTable id={props.id} key={index} header={header} bodies={props.actions.filter((action) => {return action.type === header})} spells={props.spells}/>
	))}
	*/
	let headers = ["Cantrip","1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
	return(
		<>
			<span style={{justifyContent:"end", textAlign:"right"}}> testing</span>
			<Button variant="primary" onClick={handleShow} className="me-2">
				Launch
			</Button>

			<Offcanvas border="dark" style={{backgroundColor:"#6c757d"}} show={show} onHide={handleClose} placement="end" scroll="true">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Spell List</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					{headers.map((header, index) => (
						<ActionTable offCanvas="true" id={props.id} key={index} header={header} bodies={sortedSpellList.filter((action) => {return action.type === header})} spells="true"/>
					))}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}

//Inventory
const Inventory = (props) => {
	const {dispatch, inventory} = useContext(AppContext);
	const handleSubmit = (event) => {
		event.preventDefault();
		var data = {name: event.target[0].value, type: event.target[1].value, qty: event.target[2].value, worth: event.target[3].value, 
						weight: event.target[4].value, isEquipped: false};
		dispatch({
			type: 'ADD_ITEM',
			payload: data,
		})
	}
	
	/*
	{props.headers.map((header, index) => (
				<ActionTable id={props.id} key={index} header={header} bodies={props.actions.filter((action) => {return action.type === header})} spells={props.spells}/>
			))}
	*/
	const headers = ["Weapon", "Armor", "Misc"]
	return (
		<Card bg="secondary" id="Inventory">
			{headers.map((header, index) => (
				<InventoryTable key={index} header={header} bodies={inventory.filter((item) => {return item.type === header})}/>
			))}
			<Form onSubmit={handleSubmit}>
				<InputGroup>
					<Form.Control required placeholder="Name" aria-label="Name" aria-describedby="name"/>
					<Form.Select required aria-label="item-type-select">
						<option>Choose Item Type</option>
						<option value="Weapon">Weapon</option>
						<option value="Armor">Armor</option>
						<option value="Misc">Misc</option>
					</Form.Select>
				</InputGroup>
				<InputGroup>
					<Form.Control required type="number" min="0" placeholder="Qty" aria-label="Quantity" aria-describedby="quantity"/>
					<Form.Control required placeholder="Worth" aria-label="worth" aria-describedby="worth"/>
					<Form.Control required placeholder="Weight" aria-label="Weight" aria-describedby="Weight"/>
				</InputGroup>
				<InputGroup>
					<Form.Select required aria-label="is-wearing">
						<option>Is wearing?</option>
						<option value={true}>Yes</option>
						<option value={false}>No</option>
					</Form.Select>
					<Button variant="success" aria-label="submit" type="submit">Submit</Button>
				</InputGroup>
			</Form>
		</Card>
	)
}
const InventoryTable = (props) => {
	const {dispatch, charAttributes, proficiency} = useContext(AppContext);
	const handleDelete = (event, type, index) => {
		dispatch({
			type: 'DELETE_ITEM',
			payload: [type, index],
			id: props.id
		})
	}
	const handleEdit = (event, type, index) => {
		dispatch({
			type: 'EDIT_ITEM',
			payload: [type, index],
			id: props.id
		})
	}
	const handleEquipped = (event) => {
		dispatch({
			type: "EQUIPPING",
			payload: [event.target.id, event.target.checked],
			offCanvas: props.offCanvas,
		})
	}

	return (
		<div key={props.index} style={{marginLeft:"8px", marginRight:"8px"}}>
			<h5> {props.header} </h5>
			<Table size="sm" style={{color:"white", border:"black", textAlign:"right", alignVertical:"middle"}}>
				<thead>
					<tr>
						<td></td>
						<td> Name </td>
						<td> Qty </td>
						<td> Weight </td>
						<td> Worth </td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{props.bodies.map( (body, index) => (
						<tr key={index}>
							<td className="prepared-check" style={{height:"1.5em", width:"1.5em"}}> 
								<input type="checkbox" id={body.name} value="prepared"  onChange={handleEquipped} checked={body.isPrepared}></input>
							</td>
							<td> {body.name} </td>
							<td> {body.qty} </td>
							<td> {body.weight} </td>
							<td> {body.worth} </td>
							<td style={{ alignItems:"center" }}>
								<div style={{float:"right", marginTop:"2.5px"}}>
									<RiFileEditFill type="button" color="black" size="23" id="edit-button" /*onClick={startEdit}*/ className="edit-button" /> 
									<AiFillCloseSquare type="button" color="#dc3545" size="23" id="delete-button" onClick={handleDelete} className="edit-button" style={{backgroundColor:"white", padding:"0px"}}/>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

//Notes
const Notes = () => {
	const {notes, dispatch} = useContext(AppContext)
	const handleNotesChange = (event) => {
		dispatch({
			type:"CHANGE_NOTES",
			payload: event.target.value
		})
	}
	return (
		<Card bg="secondary">
			<Card.Header> Any Notes </Card.Header>
			<Card.Body>
				<p> {notes} </p>
				 <InputGroup>
					<Form.Control as="textarea" value={notes} aria-label="With textarea" onChange={handleNotesChange}/>
				</InputGroup>
			</Card.Body>
		</Card>
	)
}

export {Features, Actions};