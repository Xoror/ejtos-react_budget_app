import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

import CreatableSelect from 'react-select/creatable';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import "./MainBody.css";
import {fullCaster, halfCaster, thirdCaster, pactCaster, halfPactCaster} from "../data/spellSlots.js";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { RiFileEditFill } from "react-icons/ri";

//


// Attributes Block
const SkillItem = (props) => {
	const { dispatch } = useContext(AppContext);
	const handleExpertise = (event) => {
		dispatch({
			type: 'PROFICIENCY_CHANGE',
			payload: [event.target.checked, event.target.name, event.target.id],
		});
	}
	return (
		<div className="row">
			<div className="checkbox-wrapper skills-layout" >
				<input type="checkbox" id="Expertise" name={props.skill2.name} value="expertise" onChange={handleExpertise} checked={props.skill2.expertise}></input>
				<input type="checkbox" id="Proficiency" name={props.skill2.name} value="proficiency" onChange={handleExpertise} checked={props.skill2.proficient}></input>
				<label className="skills-text">  {props.skill2.bonus} {props.skill2.shortName}  </label>
			</div>
		</div>
	)	
};

const Attribute = (props) => {
	const { dispatch, skills } = useContext(AppContext);
	
	const handleAttrChange = (event) => {
		let id1 = props.attribute.name;
		dispatch({
			type: 'ATTRIBUTE_CHANGE',
			payload: [event.target.value, id1],
		});
	}
	return (
		<tr>
			<td className="AttributeBox">
				{props.attribute.name}
				<input required='required' type='number' min="1" value={props.attribute.value} className="AttributeBoxInside" /*style={{textAlign:"center", height:"40%", width:"50%", padding:"auto"}}*/
					onChange={handleAttrChange}
				></input>
				
				<div /*style={{paddingTop:"10%"}}*/>
					<span>Bonus: </span>
					<br></br>
					<span style={{paddingTop:"20px"}}>{props.attribute.bonus}</span>
				</div>
			</td>
			<td >
				
				{skills.filter((skill) => {return skill.supSkill === props.attribute.name}).map((skill3) => (
					<SkillItem key={skill3.id} skill2={skill3}/>
				))}
			</td>
		</tr>
	);
};

const Attributes = () => {
	const { dispatch, charAttributes, jackOfAllTrades } = useContext(AppContext);
	const handleChecked = (event) => {
		dispatch({
			type: "JACK_OF_ALL_TRADES",
			payload: event.target.checked,
		})
	}
	return (
	<Card border ="dark" bg="secondary">
		<Form.Check style={{paddingLeft:"2em", paddingTop:"0.3em"}} type="checkbox" checked={jackOfAllTrades} id="jack-of-all-trades-check" label="Jack of All Trades" onChange={handleChecked}></Form.Check>
		<table className="table" style={{color: '#ffffff'}}>
			<thead>
				<tr>
				  <th scope="col">Attributes</th>
				  <th scope="col">Skills</th>
				</tr>
			</thead>
			<tbody>
			{charAttributes.map((charAttribute) => (
				<Attribute key={charAttribute.id} attribute={charAttribute}/>
			))}
			</tbody>
		</table>
	</Card>
	);
};

// Spellslots, to-hit, DC etc
const SpellCard = () => {
	const {dispatch, casting, charLevel} = useContext(AppContext)
	const handleCastingAttributeSelect = (event) => {
		dispatch({
			type:'CASTING_ATTRIBUTE_CHANGE',
			payload: event.target.value
		})
	}
	const handleCasterTypeChange = (event) => {
		dispatch({
			type:'CASTER_TYPE_CHANGE',
			payload: event.target.value
		})
	}
	const popover = (
		<Popover id="popover-basic">
			<Popover.Header as="h3">Legend</Popover.Header>
			<Popover.Body>
				<span> <b>Full Caster:</b> Casters like Wizards, Sorcerers, Bards that get spellslots up to 9th level.</span>
				<br></br>
				<span> <b>Half Caster:</b> Casters like Rangers, Paladins that get spellslots up to 5th level</span>
				<br></br>
				<span> <b>Third Level Caster:</b> Casters as a result of a sublass like Fighter: Eldritch Knight that get spellslots up to 4th level </span>
				<br></br>
				<span> <b>Pact Caster:</b>  Casters that have Pact Spellcasting like Warlocks</span>
				<br></br>
				<span> <b>Half Pact Caster:</b> Casters that have Pact Spellcasting from a subclass like Blood Hunter: Order of the Profane Soul </span>
			</Popover.Body>
		</Popover>
	);
	let doesShow = "collapse"
	if(casting.isCaster)
		doesShow = "collapse show"
	return (
		<Container fluid className={doesShow}>
			<Card bg="secondary" border="dark">
				<InputGroup>
					<InputGroup.Text style={{padding:"0"}}>
						<OverlayTrigger trigger="click" placement="auto" overlay={popover}>
							<button className="button-react-icons-style"> <HiOutlineInformationCircle size="25"/> </button>
						</OverlayTrigger>
					</InputGroup.Text>
					<Form.Select value={casting.type} id="CasterType" onChange={handleCasterTypeChange} style={{paddingRight:"0em", textOverflow:"fade"}}>
						<option> Choose Caster Type </option>
						<option value="full"> Full Caster </option>
						<option value="half"> Half Caster </option>
						<option value="third"> Third Level Caster </option>
						<option value="pact"> Pact Caster </option>
						<option value="halfpact"> Half Pact Caster </option>
					</Form.Select>
					
					<Form.Select value={casting.spellAttribute} id="CastingAttribute" onChange={handleCastingAttributeSelect}>
						<option> Choose Casting Attribute </option>
						<option value="Intelligence"> Intelligence </option>
						<option value="Wisdom"> Wisdom </option>
						<option value="Charisma"> Charisma </option>
					</Form.Select>
					
				</InputGroup>
				<Row>
					<Col md="auto" style={{paddingRight:"0"}}>
						<div className="spellCard">
							<Row>
								<Col style={{paddingRight:"0", alignText:"center"}}>Spell Hit</Col>
								<Col style={{paddingLeft:"0", alignText:"center"}}>Spell DC</Col>
							</Row>
							<Row>
								<Col style={{paddingRight:"0"}}><input readOnly required='required' type='text' className= "spellCardInside" value={casting.spellHit}></input></Col>
								<Col style={{paddingLeft:"0"}}><input readOnly required='required' type='text' className= "spellCardInside" value={casting.spellDC}></input></Col>
							</Row>
						</div>
					</Col>
					<Col md style={{paddingLeft:"0", fontSize:"0.9em"}}>
						<SpellSlotTable casting={casting} level={charLevel} />
					</Col>
				</Row>
			</Card>
		</Container>
	)
}

const SpellSlotTable = (props) => {
	const {dispatch, spellSlots} = useContext(AppContext)
	
	const testHighestSlot = (currentHighest, newHighest) => {
		if(currentHighest < newHighest) {
			dispatch({
				type: 'NEW_HIGHEST_SPELLSLOT',
				payload: newHighest,
			})
		}
		return newHighest
	}
	const handleSpellMatrix = (event, Row, Column) => {
		dispatch({
			type: 'SPELLSLOT_CHANGE',
			payload: [Row, Column, event.target.checked, testHighestSlot(props.casting.highestSpellslot,filteredSlots[0].length)]
		})
		console.log(testHighestSlot(props.casting.highestSpellslot,filteredSlots[0].length))
	}
	
	
	const listSlots = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
	var casterLevel = structuredClone(props.level)

	if(casterLevel === "" || casterLevel < 1) {
		casterLevel = "1"
	}
	
	const casterType = structuredClone(props.casting.type)
	var filteredSlots = []
	if(casterType === "full") {
		filteredSlots = fullCaster.filter((test) => {return test.level === parseInt(casterLevel)})[0].slots
	}
	else if(casterType === "half") {
		filteredSlots = halfCaster.filter((test) => {return test.level === parseInt(casterLevel)})[0].slots
	}
	else if(casterType === "third") {
		filteredSlots = thirdCaster.filter((test) => {return test.level === parseInt(casterLevel)})[0].slots
	}
	else if(casterType === "pact") {
		filteredSlots = pactCaster.filter((test) => {return test.level === parseInt(casterLevel)})[0].slots
	}
	else if(casterType === "halfpact") {
		filteredSlots = halfPactCaster.filter((test) => {return test.level === parseInt(casterLevel)})[0].slots
	}
	
	
	var reverseSlots = structuredClone(filteredSlots).reverse()
	var counter = reverseSlots.length
	var spellMatrix = []
	if(filteredSlots.length > 0) {
		for (let i=0; i<reverseSlots.length;i++) {
			for (let j= i>0 ? reverseSlots[i-1]:0 ; j<reverseSlots[i];j++) {
				var testArray = []
				if(j != reverseSlots[i]) {
					for(let k=0; k<counter-i;k++) {
						testArray.push(0)
					}
					spellMatrix.push(testArray)
				}
			}
			
		}
	}

	if(casterType === "full" || casterType === "half" || casterType === "third") {
		return (
			<table>
				<thead>
					<tr>
						{filteredSlots.map((slot, index) => (
							<td key={index}> {listSlots[index]} </td>
						))}
					</tr>
				</thead>
				<tbody>
					{spellMatrix.map((row,indexRow) => (
						<tr key={indexRow}>
							{row.map((piece, indexColumn) => (
								<td key={indexColumn}> <input type="checkbox" checked={spellSlots[indexRow][indexColumn]} onChange={(event) => handleSpellMatrix(event, indexRow, indexColumn)}></input> </td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		)
	}
	else if (casterType === "pact" || casterType === "halfpact") {
		const indexColumn = 0
		return (
			<table >
				<thead>
					<tr>
						<td> {spellMatrix[0] != undefined ? listSlots[(spellMatrix[0].length)-1]:"1st" } </td>
					</tr>
				</thead>
				<tbody>
					{spellMatrix.map((row,indexRow) => (
						<tr key={indexRow}>
							<td> <input type="checkbox" checked={spellSlots[indexRow][indexColumn]} onChange={(event) => handleSpellMatrix(event, indexRow, indexColumn)}></input> </td>
						</tr>
					))}
				</tbody>
			</table>
		)
	}

}

// Misc attributes like HP, AC, Initiative, Speed, PB
const MiscAttributes = () => {
	const { initiative, proficiency, charAC, speed } = useContext(AppContext);
	return (
		<div className="container-fluid">
			<CardGroup style={{marginBottom: "-1em"}}>
				<Card bg="secondary" border="dark" className="mb-3">
					<AttributeBox name="Initiative" attribute={initiative} />
				</Card>
				<Card bg="secondary" border="dark" className="mb-3">
					<AttributeBox name="Proficiency Bonus" attribute={proficiency}/>
				</Card>
				<Card bg="secondary" border="dark" className="mb-3">
					<AttributeBox name="AC" attribute={charAC}/>
				</Card>
			</CardGroup>
			<CardGroup>
				<Card bg="secondary" border="dark" style={{flexGrow: 2, height: "flex"}}>
					<HPBox/>
				</Card>
				<Card bg="secondary" border="dark">
					<AttributeBox name="Speed" attribute={speed}/>
				</Card>			
			</CardGroup>
		</div>
	)
}
const HPBox = (props) => {
	const {dispatch, charHP} = useContext(AppContext)
	const handleHPChange = (event) => {
		dispatch({
			type: 'HP_CHANGE',
			payload: [event.target.id, event.target.value]
		})
	}
	return (
		<div className="hpBox">
			<label>Current</label><label>Max</label><label>Temp</label>
			<br></br>
			<input id="currentHP" type='number' value={charHP.current} className= "hpBoxInside" onChange={handleHPChange}></input>
			<input id="maxHP" type='number' value={charHP.max} className= "hpBoxInside" onChange={handleHPChange}></input>
			<input id="tempHP" type='number' value={charHP.temp} className= "hpBoxInside" onChange={handleHPChange}></input>
			<br></br>
			<RiFileEditFill type="button" color="black" size="23" /*onClick={handleShow}*/ className="edit-button" />
		</div>
	);
}

// Resources and Misc Proficiencies

const ResourcesMiscProficiencies = () => {
	const {dispatch, proficienciesTypes} = useContext(AppContext);
	const addResource = (event) => {
		event.preventDefault();
		dispatch({
			type: 'ADD_RESOURCE',
			payload: {name: event.target[0].value, current: event.target[2].value, maximum: event.target[3].value, dice: event.target[1].value},
		});
	}
	const addMiscProficiency = (event) => {
		event.preventDefault();
		console.log([event.target[0].value, selectedType, event.target[2].value, event.target[3].value])
		dispatch({
			type: 'ADD_MISCPROFICIENCY',
			payload: [event.target[0].value, selectedType, event.target[2].value, event.target[3].value]
		});
	}
	const [showAddResource, setShowAddResource] = useState(false);
	const handleShowAddResource = () => setShowAddResource(true);
	const handleCloseAddResource = () => setShowAddResource(false);
	
	const [showAddMiscProf, setShowAddMiscProf] = useState(false);
	const handleShowAddMiscProf = () => setShowAddMiscProf(true);
	const handleCloseAddMiscProf = () => setShowAddMiscProf(false);
	
	const [selectedType, setSelectedType] = useState("");
	
	const customStyles = {
		option: (defaultStyles) => ({
			...defaultStyles,
			color: "#000000",
		}),
	}

	return (
	<div>
		<div className="container-fluid">
			<Modal show={showAddResource}>
				<Form onSubmit={addResource}>
					<Modal.Header>
						<Modal.Title> Add Resource </Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<InputGroup>
							<InputGroup.Text>Name</InputGroup.Text>
							<Form.Control required name="Name" placeholder="Name" aria-label="Name"/>
							<InputGroup.Text>Dice</InputGroup.Text>
							<Form.Control required name="Dice" placeholder="Dice" aria-label="Dice"/>
						</InputGroup>
						<InputGroup>
							<InputGroup.Text>Current</InputGroup.Text>
							<Form.Control required name="Current" placeholder="Current" aria-label="Current"/>
							<InputGroup.Text>Maximum</InputGroup.Text>
							<Form.Control required name="Maximum" placeholder="Maximum" aria-label="Maximum"/>
						</InputGroup>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={handleCloseAddResource}>
							Close
						</Button>
						<Button variant="success" type="submit">
							Save Changes
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
			
			<Modal show={showAddMiscProf}>
				<Form onSubmit={(event) => addMiscProficiency(event)}>
					<Modal.Header>
						<Modal.Title> Add Misc Proficiency </Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<InputGroup>
							<InputGroup.Text>Name</InputGroup.Text>
							<Form.Control required name="Name" placeholder="Name" aria-label="Name"/>
							<InputGroup.Text>Type</InputGroup.Text>
							<CreatableSelect required styles={customStyles} isClearable options={proficienciesTypes} onChange={(value) => setSelectedType(value)}/>
						</InputGroup>
						<InputGroup>
							<InputGroup.Text htmlFor="proficiencyInput">Proficient</InputGroup.Text>
							<Form.Select id="proficiencyInput">
								<option value="True">Yes</option>
								<option value="False">No</option>
							</Form.Select>
							<InputGroup.Text htmlFor="expertiseInput">Expertise</InputGroup.Text>
							<Form.Select id="expertiseInput">
								<option value="True">Yes</option>
								<option value="False">No</option>
							</Form.Select>
							<Button variant="success" type="submit">Submit</Button>
						</InputGroup>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseAddMiscProf}>
							Close
						</Button>
						<Button variant="primary" type="submit">
							Save Changes
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
			
			<CardGroup>
				<div className="card bg-secondary border-dark justify-content-middle">
					<Button variant="primary" onClick={handleShowAddResource}> Add Resource </Button>
					<ResourcesList/>
				</div>
				<div className="card bg-secondary border-dark justify-content-middle">
					<Button variant="primary" onClick={handleShowAddMiscProf}> Add Misc Proficiency</Button>
					<MiscProficiencies/>
				</div>
			</CardGroup>
			
		</div>
	</div>
	)
}

const ResourcesList = () => {
	const {resources} = useContext(AppContext);

	return(
		<div>
			{resources.map((resource, index) => (
					<ResourceBox resource={resource} id={index} key={index}/>
				))}
		</div>
	)
}

const ResourceBox = (props) => {
	const {dispatch} = useContext(AppContext);
	const changeResource = (event) => {
		dispatch({
			type:'CHANGE_RESOURCE',
			payload: [event.target.name, event.target.value, event.target.id],
		})
	}
	const deleteResource = () => {
		dispatch({
			type:'DELETE_RESOURCE',
			payload: props.id,
		})
	}

	return (
		<div key={props.id} className="resourceBox">
			<InputGroup>
				<InputGroup.Text>{props.resource.name}</InputGroup.Text>
				<Button variant="danger" aria-label="Remove" onClick={deleteResource}>Remove</Button>
			</InputGroup>
		
			<br></br>
			<input required='required' type='text' value={props.resource.current} name={props.resource.name} id="current" className= "resourceBoxInside" onChange={changeResource}></input>
			<input required='required' type='text' value={props.resource.dice} name={props.resource.name} id="dice" className= "resourceBoxInside2" onChange={changeResource}></input>
			<input required='required' type='text' value={props.resource.maximum} name={props.resource.name} id="maximum" className= "resourceBoxInside" onChange={changeResource}></input>
			
		</div>
	);
}

const MiscProficiencies = () => {
	const {proficienciesTypes} = useContext(AppContext);
	return (
		<div className="container-fluid" style={{marginRight:"2em"}}>
			<div className="col">
				{proficienciesTypes.map((proficiencyType, index) => (
						<MiscProficienciesList key={index} id={index} name={proficiencyType.label}/>
					))}
			</div>
		</div>
	);
}

const MiscProficienciesList = (props) => {
	const {skills} = useContext(AppContext);
	return (
		<dl>
			<dt>{props.name}</dt>
			{skills.filter((skill) => {return skill.supSkill === props.name}).map((skill) => (
					<SkillItem key={skill.id} skill2={skill}/>
				))}
		</dl>
	);
}

// General Box for any Attribute
const AttributeBox = (props) => {
	const {dispatch} = useContext(AppContext);
	
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true);
	
	let testName = props.name
	const handleSubmit = (event) => {
		event.preventDefault()
		let data = {}
		if(props.name === "Speed") {
			data = {displayed: event.target[0].value, ground: event.target[1].value, swim: event.target[2].value, climb: event.target[3].value, fly: event.target[4].value}
			console.log(data)
		}
		else if(props.name === "AC") {
			if(event.target[0].value === "1") {
				data = {wearsArmor: true, unarmoredDefense: false, baseAC: event.target[1].value, scalingPrimary: event.target[2].value, maxBonus: event.target[3].value, stealthDisadvantage: event.target[4].value}
				console.log(data)
			}
			if(event.target[0].value === "2") {
				data = {wearsArmor: false, unarmoredDefense: true, baseAC: event.target[1].value, scalingPrimary: event.target[2].value, scalingSecondary: event.target[3].value}
				console.log(data)
			}
		}
		else if(props.name === "Initiative") {
			data = {scalingPrimary: event.target[0].value, scalingSecondary: event.target[1].value, flatBonus: event.target[2].value}
			console.log(data)
		}
		dispatch({
			type: 'MISC_ATTRIBUTE',
			payload: data,
			id: props.name,
		});
	}
	return (
		<div className="AttributeBox2">
			<Modal size="lg" show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title> Edit {props.name} </Modal.Title>
				</Modal.Header>
				
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
						{props.name === "Initiative" ? (
							<InitiativeModal attribute={props.attribute}/>
							) : ( testName === "AC" ? (
								<ACModal attribute={props.attribute}/>
								) : ( testName === "Speed" ? 
									<SpeedModal attribute={props.attribute}/>
								: "" )
							)
						}	
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button type="submit" variant="primary">
							Submit
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		
			<span>{props.name}</span>
			<br></br>
			<input readOnly type='text' value={props.attribute.value} className= "AttributeBoxInside2" ></input>
			<br></br>
			{props.name != "Proficiency Bonus" ? <RiFileEditFill type="button" color="black" size="23" onClick={handleShow} className="edit-button" /> : ""}
		</div>
	)
}

const InitiativeModal = (props) => {
	return (
		<div>
			<InputGroup>
				<InputGroup.Text id="primary-scaling">Primary Scaling</InputGroup.Text>
				<Form.Select required aria-label="choose-primary-scaling" aria-describedby="primary-scaling">
					<option value={props.attribute.scalingPrimary}>{props.attribute.scalingPrimary}</option>
					{["None","Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map((attribute, index) => (
						attribute != props.attribute.scalingPrimary ? <option key={index} value={attribute}> {attribute} </option> : ""
					))}
				</Form.Select>
			</InputGroup>
			<InputGroup>
				<InputGroup.Text id="secondary-scaling">Secondary Scaling</InputGroup.Text>
				<Form.Select required aria-label="choose-secondary-scaling" aria-describedby="secondary-scaling">
					<option value={props.attribute.scalingSecondary}>{props.attribute.scalingSecondary}</option>
					{["None", "Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map((attribute, index) => (
						attribute != props.attribute.scalingSecondary ? <option key={index} value={attribute}> {attribute} </option> : ""
					))}
				</Form.Select>
			</InputGroup>
			<InputGroup>
				<InputGroup.Text id="flat-bonus">Flat Bonus (like from feats) </InputGroup.Text>
				<Form.Control required defaultValue={props.attribute.flatBonus} aria-label="change-flat-bonus" aria-describedby="flat-bonus"/>
			</InputGroup>
		</div>
	)
}
const ACModal = (props) => {
	const [showOptions, setShowOptions] = useState("0")
	const handleShowOptions = (event) => setShowOptions(event.target.value)
	return(
		<div>
			<InputGroup>
				<InputGroup.Text id="armor-type"> Armor Type </InputGroup.Text>
				<Form.Select required aria-label="choose-armor-type" aria-describedby="armor-type" onChange={handleShowOptions}>
					<option value="0"> Choose Armor Type </option>
					<option value="1" id="wearsArmor"> Equippable Armor </option>
					<option value="2" id="unarmoredDefense"> Unarmored Defense </option>
				</Form.Select>
			</InputGroup>
			{showOptions === "1" ? ( /*stealthDisadvantage*/
				<div>
					<InputGroup>
						<InputGroup.Text id="base-ac"> Armor Base AC </InputGroup.Text>
						<Form.Control type="number" required defaultValue={props.attribute.baseAC} placeholder="Input Armor's base AC" aria-label="base-armor-ac" aria-describedby="base-ac"/>
						<InputGroup.Text id="scaling-attribute"> Scaling Attribute </InputGroup.Text>
						<Form.Select required aria-label="choose-scaling-attribute" aria-describedby="scaling-attribute">
							<option value={props.attribute.scalingPrimary}>{props.attribute.scalingPrimary}</option>
							{["None","Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map((attribute, index) => (
								attribute != props.attribute.scalingPrimary ? <option key={index} value={attribute}> {attribute} </option> : ""
							))}
						</Form.Select>
					</InputGroup>
					<InputGroup>
						<InputGroup.Text id="max-bonus"> Maximum Attribute Bonus </InputGroup.Text>
						<Form.Control type="number" required defaultValue={props.attribute.maxBonus} placeholder="Input Maximum Bonus" aria-label="choose-max-bonus" aria-describedby="max-bonus"/>
					</InputGroup>
					<InputGroup>
						<InputGroup.Text id="stealth-disadvantage"> Gives Stealth Disadvantage </InputGroup.Text>
						<Form.Select required aria-label="choose-stealth-disadvantage" aria-describedby="stealth-disadvantage">
							<option value={props.attribute.stealthDisadvantage}> {props.attribute.stealthDisadvantage ? "Yes" : "No"} </option>
							<option value={!props.attribute.stealthDisadvantage}> {!props.attribute.stealthDisadvantage ? "Yes" : "No"} </option>
						</Form.Select>
					</InputGroup>
				</div>) : (showOptions === "2" ? (
					<div>
						<InputGroup>
							<InputGroup.Text id="unarmored-base-ac"> Base AC </InputGroup.Text>
							<Form.Control type="number" required defaultValue={props.attribute.baseAC} placeholder="Choose Base AC" aria-label="choose-unarmored-base-ac" aria-describedby="unarmored-base-ac"/>
							<InputGroup.Text id="primary-scaling"> Primary Scaling </InputGroup.Text>
							<Form.Select required aria-label="choose-primary-scaling" aria-describedby="primary-scaling">
								<option value={props.attribute.scalingPrimary}>{props.attribute.scalingPrimary}</option>
								{["None","Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map((attribute, index) => (
									attribute != props.attribute.scalingPrimary ? <option key={index} value={attribute}> {attribute} </option> : ""
								))}
							</Form.Select>
							<InputGroup.Text id="secondary-scaling"> Secondary Scaling </InputGroup.Text>
							<Form.Select required aria-label="choose-secondary-scaling" aria-describedby="secondary-scaling">
								<option value={props.attribute.scalingSecondary}>{props.attribute.scalingSecondary}</option>
								{["None","Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map((attribute, index) => (
									attribute != props.attribute.scalingSecondary ? <option key={index} value={attribute}> {attribute} </option> : ""
								))}
							</Form.Select>
						</InputGroup>
					</div>
				) : "")
			}
		</div>
	)
}
const SpeedModal = (props) => {
	return(
		<div>
			<InputGroup>
				<InputGroup.Text id="displayed-speed">Displayed Speed</InputGroup.Text>
				<Form.Select required aria-label="choose-displayed-speed" aria-describedby="primary-displayed-speed">
					<option value={props.attribute.displayed}>{props.attribute.displayed}</option>
					{["Ground", "Swim", "Climb", "Fly"].map((attribute, index) => (
						attribute != props.attribute.displayed ? <option key={index} value={attribute}> {attribute} </option> : ""
					))}
				</Form.Select>
			</InputGroup>
			<InputGroup>
				<InputGroup.Text id="ground-speed"> Ground Speed </InputGroup.Text>
				<Form.Control type="number" required defaultValue={props.attribute.ground} placeholder="Choose Ground Speed" aria-label="choose-ground-speed" aria-describedby="ground-speed" id="ground"/>
				<InputGroup.Text id="swim-speed"> Swim Speed </InputGroup.Text>
				<Form.Control type="number" required defaultValue={props.attribute.swim} placeholder="Choose Swim Speed" aria-label="choose-swim-speed" aria-describedby="swim-speed" id="swim"/>
			</InputGroup>
			<InputGroup>
				<InputGroup.Text id="climb-speed"> Climb Speed </InputGroup.Text>
				<Form.Control type="number" required defaultValue={props.attribute.climb} placeholder="Choose Climb Speed" aria-label="choose-climb-speed" aria-describedby="climb-speed" id="climb"/>
				<InputGroup.Text id="fly-speed"> Fly Speed </InputGroup.Text>
				<Form.Control type="number" required defaultValue={props.attribute.fly} placeholder="Choose Fly Speed" aria-label="choose-fly-speed" aria-describedby="fly-speed" id="fly"/>
			</InputGroup>
		</div>
	)
}

export {Attributes, AttributeBox, MiscAttributes, ResourcesMiscProficiencies, SpellCard };