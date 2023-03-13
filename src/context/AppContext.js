import React, { createContext, useReducer } from 'react';
import {spellList} from "../data/spells.js";

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
	switch (action.type) {
		case 'IMPORT':
			action.type = "Done";
			var data = action.payload;
			
			state.charLevel = data.charLevel;
			state.charName = data.charName;
			state.charClass = data.charClass;
			state.charSubclass = data.charSubclass;
			state.charAttributes = data.charAttributes;
			state.skills = data.skills;
			state.proficiency = data.proficiency;
			state.initiative = data.initiative;
			state.speed = data.speed;
			state.charAC = data.charAC;
			state.charHP = data.charHP;
			state.resources = data.resources;
			state.proficienciesTypes = data.proficienciesTypes;
			state.features = data.features;
			state.actions = data.actions;
			state.spells = data.spells;
			state.casting = data.casting;
			state.spellSlots = data.spellSlots;
			state.jackOfAllTrades = data.jackOfAllTrades;
			state.sortedSpellList = data.sortedSpellList;
			state.notes = data.notes;
			state.inventory = data.inventory;
			
			return {
				...state,
			}
		case 'ATTRIBUTE_CHANGE':
			action.type ="Done";
			var id = action.payload[1];
			const bonus = (value) => {
				return Math.floor( (value - 10)/2);
			}
			/* Dangerous bc "change" IS the state.charattribute object, so change that directly and not a copy like in python!! */
			var change = state.charAttributes.filter(attribute => attribute.id=== id)[0]
			change.value = action.payload[0]
			change.bonus = bonus(action.payload[0])
			
			return {
				...state,
			}
		case 'SIMPLE_STATE_CHANGE':
			action.type ="Done";
			id = action.payload[1];
			if(id === "NameChange") {
				state.charName = action.payload[0]
			}
			else if (id === "ClassChange") {
				state.charClass = action.payload[0]
			}
			else if (id === "SubClassChange") {
				state.charSubclass = action.payload[0]
			}
			else if (id === "Level") {
				state.charLevel = action.payload[0]
				state.proficiency.value =  Math.floor( 2 + ((action.payload[0]-1)/4) );
			}
			return {
				...state,
			}
		case 'HP_CHANGE':
			action.type = "Done";
			if(action.payload[0] === "currentHP") {
				state.charHP.current = action.payload[1]
			}
			if(action.payload[0] === "maxHP") {
				state.charHP.max = action.payload[1]
			}
			if(action.payload[0] === "tempHP") {
				state.charHP.temp = action.payload[1]
			}
			return {
				...state,
			}
		case 'MISC_ATTRIBUTE':
			action.type= "Done"
			if(action.id === "Initiative") {
				/*{scalingPrimary: event.target[0].value, scalingSecondary: event.target[1].value, flatBonus: event.target[2].value}*/
				state.initiative.scalingPrimary = action.payload.scalingPrimary
				state.initiative.scalingSecondary = action.payload.scalingSecondary
				state.initiative.flatBonus = parseInt(action.payload.flatBonus)
			}
			else if(action.id === "AC") {
				/*{wearsArmor: true, unarmoredDefense: false, baseAC: event.target[1].value, scalingPrimary: event.target[2].value, maxBonus: event.target[3].value, stealthDisadvantage: event.target[4].value}*/
				if(action.payload.wearsArmor) {
					state.charAC.wearsArmor = true
					state.charAC.unarmoredDefense = false
					state.charAC.baseAC = parseInt(action.payload.baseAC)
					state.charAC.scalingPrimary = action.payload.scalingPrimary
					state.charAC.maxBonus = parseInt(action.payload.maxBonus)
					state.charAC.stealthDisadvantage = action.payload.stealthDisadvantage
				}
				/*{wearsArmor: false, unarmoredDefense: true, baseAC: event.target[1].value, scalingPrimary: event.target[2].value, scalingSecondary: event.target[3].value}*/
				else if(action.payload.unarmoredDefense) {
					state.charAC.wearsArmor = false
					state.charAC.unarmoredDefense = true
					state.charAC.baseAC = parseInt(action.payload.baseAC)
					state.charAC.scalingPrimary = action.payload.scalingPrimary
					state.charAC.scalingSecondary = action.payload.scalingSecondary
				}
			}
			else if(action.id === "Speed") {
				/*{displayed: event.target[0].value, ground: event.target[1].value, swim: event.target[2].value, climb: event.target[3].value, fly: event.target[4].value}*/
				/*{name: "Speed", value: 30, ground: 30, swim: 15, climb: 15, fly: 0, displayed: "Ground"}*/
				state.speed.displayed = action.payload.displayed
				state.speed.ground = action.payload.ground
				state.speed.swim = action.payload.swim
				state.speed.climb = action.payload.climb
				state.speed.fly = action.payload.fly 
				if (action.payload.displayed === "Ground") {
					state.speed.value = action.payload.ground
				}
				else if (action.payload.displayed === "Swim") {
					state.speed.value = action.payload.swim
				}
				else if (action.payload.displayed === "Climb") {
					state.speed.value = action.payload.climb
				}
				else if (action.payload.displayed === "Fly") {
					state.speed.value = action.payload.fly
				}
			}
			console.log(state.charAC)
			return {
				...state,
			}
		case 'PROFICIENCY_CHANGE':
			action.type ="Done";
			var id2 = action.payload[2];
			var name2 = action.payload[1];
			if(id2 === "Proficiency") {
				state.skills.filter((skill) => {return skill.name === name2})[0].proficient = action.payload[0]
				if(action.payload[0] === false) {
					state.skills.filter((skill) => {return skill.name === name2})[0].expertise = action.payload[0]
				}
			}
			else if (id2 === "Expertise") {
				state.skills.filter((skill) => {return skill.name === name2})[0].expertise = action.payload[0]
				if(action.payload[0] === true) {
					state.skills.filter((skill) => {return skill.name === name2})[0].proficient = action.payload[0]
				}
			}
			return {
				...state,
			}
		case "JACK_OF_ALL_TRADES":
			action.type = "Done"
			state.jackOfAllTrades = action.payload
			return {
				...state,
			}
		case 'ADD_RESOURCE':
			action.type= "Done";
			state.resources.push(action.payload)
			return {
				...state,
				/*
				resources: [
					...state.resources,
					action.payload,
				]
				*/
			}
		case 'ADD_MISCPROFICIENCY':
			action.type = 'Done';
			if(action.payload[1].__isNew__ === true) {
				state.proficienciesTypes.push({value: action.payload[1].value, label: action.payload[1].label})
				console.log("new entry")
			}
			state.skills.push( 
				{id: action.payload[0], name: action.payload[0], shortName: action.payload[0], supSkill: action.payload[1].value, bonus: "", proficient: action.payload[2], expertise: action.payload[3]}, 
			)
			return{
				...state,
			}
		case 'CHANGE_RESOURCE':
			action.type= 'Done';
			if(action.payload[2] === "maximum") {
				state.resources.filter((resource) => {return resource.name === action.payload[0]})[0].maximum = action.payload[1]
			}
			else if(action.payload[2] === "current") {
				state.resources.filter((resource) => {return resource.name === action.payload[0]})[0].current = action.payload[1]
			}
			else if(action.payload[2] === "dice") {
				state.resources.filter((resource) => {return resource.name === action.payload[0]})[0].dice = action.payload[1]
			}
			return {
				...state
			}
		case 'DELETE_RESOURCE':
			action.type= 'Done';
			
			let bla = structuredClone(state.resources)
			state.resources = bla.slice(0, action.payload).concat(bla.slice(action.payload + 1))
			console.log(state.spells)
			
			return {
				...state
			}
		case 'ADD_FEATURE':
			action.type= "Done";
			state.features.push(action.payload)
			return {
				...state,
				/*
				resources: [
					...state.resources,
					action.payload,
				]
				*/
			}
		case 'EDIT_FEATURE':
			action.type = "Done"
			state.features[action.index] = action.payload
			return {
				...state,
			}
		case 'DELETE_FEATURE':
			action.type = "Done";
			let test = structuredClone(state.features)
			state.features = test.slice(0, action.payload).concat(test.slice(action.payload + 1))
			return {
				...state,
			}
		case 'ADD_ACTION':
			action.type = 'Done'
			if(action.id === "Actions") {
				state.actions.push(action.payload)
			}
			else if(action.id === "Spells") {
				let slots = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
				let test1 = slots.indexOf(action.payload.type)
				let test2 = slots.indexOf(state.casting.highestSpellSlot)
				if(test1 > test2) {
					state.casting.highestSpellSlot = action.payload.type
				}
				state.spells.push(action.payload)
			}
			return {
				...state,
			}
		case "SPELL_PREPARATION":
			action.type = "Done"
			if(action.payload[1]) {
				if(state.spells.filter(spell => {return spell.name === action.payload[0]}).length === 0) {
					let spell = state.sortedSpellList.filter(spell => {return spell.name === action.payload[0]})[0]
					state.spells.push(spell)
					spell.isPrepared = true
					let slots = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
					let test1 = slots.indexOf(spell.type)
					let test2 = slots.indexOf(state.casting.highestSpellSlot)
					if(test1 > test2) {
						state.casting.highestSpellSlot = slots[test1]
					}
				}
				else {
					state.spells.filter(spell => {return spell.name === action.payload[0]})[0].isPrepared = action.payload[1]
				}
			}
			else {
				if(action.offCanvas) {
					let test = state.spells.filter(spell => {return spell.name === action.payload[0]})[0]
					test.isPrepared=false
					let index = state.spells.indexOf(test)
					let bla = structuredClone(state.spells)
					state.spells = bla.slice(0, index).concat(bla.slice(index + 1))
					
					
					var slots = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
					var maxIndex = slots.indexOf(state.casting.highestSpellSlot)
					
					for(let i=maxIndex; i>=0; i--) {
						if(i > 0) {
							if( state.spells.filter(spell => {return spell.type === slots[i]}).length === 0) {
							}
							else {
								state.casting.highestSpellSlot = slots[i]
								break
							}
						}
						else {
							state.casting.highestSpellSlot = slots[i]
							break
						}
					}
				}
				else {
					let test = state.spells.filter(spell => {return spell.name === action.payload[0]})[0]
					test.isPrepared=false
				}
			}
			return {
				...state,
			}
		case 'DELETE_ACTION':
			action.type = 'Done'
			if(action.id === "Actions") {
				let test = state.actions.filter((action1) => {return action1.type === action.payload[0]})[action.payload[1]]
				let index = state.actions.indexOf(test)
				
				let bla = structuredClone(state.actions)
				state.actions = bla.actions.slice(0, index).concat(bla.slice(index + 1))
				console.log(state.actions)
				
			}
			else if(action.id === "Spells") {
				let test = state.spells.filter((action1) => {return action1.type === action.payload[0]})[action.payload[1]]
				let index = state.spells.indexOf(test)
				
				let bla = structuredClone(state.spells)
				state.spells = bla.slice(0, index).concat(bla.slice(index + 1))
				console.log(state.spells)
				
				var slots = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
				var maxIndex = slots.indexOf(state.casting.highestSpellSlot)
				
				for(let i=maxIndex; i>=0; i--) {
					if(i > 0) {
						if( state.spells.filter(spell => {return spell.type === slots[i]}).length === 0) {
						}
						else {
							state.casting.highestSpellSlot = slots[i]
							break
						}
					}
					else {
						state.casting.highestSpellSlot = slots[i]
						break
					}
				}
				
				return {
					...state,
				}
			}
			return {
				...state,
			}
		case 'CASTING_ATTRIBUTE_CHANGE':
			action.type = "Done";
			state.casting.spellAttribute = action.payload
			return {
				...state,
			}
		case 'IS_CASTER_CHANGE':
			action.type ="Done";
			state.casting.isCaster = action.payload
			return {
				...state,
			}
		case 'CASTER_TYPE_CHANGE':
			action.type= "Done";
			state.casting.type = action.payload
			return {
				...state,
			}
		case 'SPELLSLOT_CHANGE':
			action.type = "Done";
			state.spellSlots[action.payload[0]][action.payload[1]] = action.payload[2]
			return {
				...state,
			}
		case 'ADD_ITEM':
			action.type = "Done"
			state.inventory.push(action.payload)
			console.log(action.payload)
			return {
				...state,
			}
		case 'CHANGE_NOTES':
			action.type = "Done";
			state.notes = action.payload
			return {
				...state,
			}
		case 'BUILD_SPELLLIST':
			action.type = "Done";
			if(state.sortedSpellList.length === 0) {
				const listSlots = ["cantrip", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
				function returnSpellslot(number) {
					if(number === "cantrip") {
						return "Cantrip"
					}
					else {
						return listSlots[parseInt(number)]
					}
				}
				
				const artificerListUnformatted = spellList.filter((spell) => {return spell.classes[0] === "Artificer"})
				var artificerList = []
				artificerListUnformatted.map(spell => (
					artificerList.push({name: spell.name, range: spell.range, damage: "", type: returnSpellslot(spell.level), scaling: state.casting.spellAttribute, isPrepared: false, damageType: ""})
				))
				artificerList = artificerList.sort((a, b) => {
					const nameA = a.name.toUpperCase(); // ignore upper and lowercase
					const nameB = b.name.toUpperCase(); // ignore upper and lowercase
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}

					// names must be equal
					return 0;
				});
				state.sortedSpellList = structuredClone(artificerList)
				console.log(state.sortedSpellList)
			}
			return {
				...state,
			}
		default:
			return {
				...state,
			}
	}
};

// 1. Sets the initial state when the app loads
const initialState = {
	charLevel: 1,
	charName: '',
	charClass: '',
	charSubclass: '',
	charAC: {id: "AC", name: "AC", value: 10, baseAC: 10, scalingPrimary: "Dexterity", unarmoredDefense: true, scalingSecondary: "None", wearsArmor: false, maxBonus: 100, stealthDisadvantage: false},
	proficiency: {id: "proficiency", name: "Proficiency", value: 2},
	initiative: {id: "initiative", name: "Initiative", value: 0, scalingPrimary: "Dexterity", scalingSecondary: "None", flatBonus: 0 },
	speed: {name: "Speed", value: 30, ground: 30, swim: 15, climb: 15, fly: 0, displayed: "Ground"},
	charHP: {current: '', max: '', temp: '',},
	casting: {isCaster: true, type: "", spellAttribute: "", spellHit: 2, spellDC: 10, highestSpellSlot: "1st",},
	spellSlots: [
		[false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false],
		[false, false, false, false, false],
		[false]
	],
	charAttributes: [
		{ id: 'Strength', name: 'Strength', value: 10, bonus: 0, skills: ["Saving Throw", "Athletics"],},
		{ id: 'Dexterity', name: 'Dexterity', value: 10, bonus: 0, skills: ["Saving Throw", "Acrobatics", "Slight of Hand", "Stealth"],},
		{ id: 'Constitution', name: 'Constitution', value: 10, bonus: 0, skills: ["Saving Throw"],},
		{ id: 'Intelligence', name: 'Intelligence', value: 10, bonus: 0, skills: ["Saving Throw", "Arcana", "History", "Investigation", "Nature", "Religion"],},
		{ id: 'Wisdom', name: 'Wisdom', value: 10, bonus: 0, skills: ["Saving Throw", "Animal Handling", "Insight", "Medicine", "Perception", "Survivial"],},
		{ id: 'Charisma', name: 'Charisma', value: 10, bonus: 0, skills: ["Saving Throw", "Deception", "Intimidation", "Performance", "Persuasion"],},
	],
	jackOfAllTrades: false,
	skills: [
		{id: "StrenghtSave", name: "Strength Saving Throw", shortName: "Saving Throw", supSkill: "Strength", bonus: 0, proficient: false, expertise: false},
		{id: "Athletics", name:"Athletics", shortName:"Athletic", supSkill: "Strength", bonus: 0, proficient: false, expertise: false},
		{id: "DexteritySave", name: "Dexterity Saving Throw", shortName: "Saving Throw", supSkill: "Dexterity", bonus: 0, proficient: false, expertise: false},
		{id: "Acrobatics", name:"Acrobatics", shortName:"Acrobatics", supSkill: "Dexterity", bonus: 0, proficient: false, expertise: false},
		{id: "SlightOfHand", name:"Slight of Hand", shortName:"Slight of Hand", supSkill: "Dexterity", bonus: 0, proficient: false, expertise: false},
		{id: "Stealth", name:"Stealth", shortName:"Stealth", supSkill: "Dexterity", bonus: 0, proficient: false, expertise: false},
		{id: "ConstitutionSave", name: "Constitution Saving Throw", shortName: "Saving Throw", supSkill: "Constitution", bonus: 0, proficient: false, expertise: false},
		{id: "IntelligenceSave", name: "Intelligence Saving Throw", shortName: "Saving Throw", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false},
		{id: "Arcana", name:"Arcana", shortName:"Arcana", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false},
		{id: "History", name:"History", shortName:"History", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false},
		{id: "Investigation", name:"Investigation", shortName:"Investigation", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false},
		{id: "Nature", name:"Nature", shortName:"Nature", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false},
		{id: "Religion", name:"Religion", shortName:"Religion", supSkill: "Intelligence", bonus: 0, proficient: false, expertise: false},
		{id: "WisdomSave", name: "Wisdom Saving Throw", shortName: "Saving Throw", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false},
		{id: "AnimalHandling", name: "Animal Handling", shortName: "Animal Handling", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false},
		{id: "Insight", name: "Insight", shortName: "Insight", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false},
		{id: "Medicine", name: "Medicine", shortName: "Medicine", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false},
		{id: "Perception", name: "Perception", shortName: "Perception", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false},
		{id: "Survival", name: "Survival", shortName: "Survival", supSkill: "Wisdom", bonus: 0, proficient: false, expertise: false},
		{id: "CharismaSave", name: "Charisma Saving Throw", shortName: "Saving Throw", supSkill: "Charisma", bonus: 0, proficient: false, expertise: false},
		{id: "Deception", name: "Deception", shortName: "Deception", supSkill: "Charisma", bonus: 0, proficient: false, expertise: false},
		{id: "Intimidation", name: "Intimidation", shortName: "Intimidation", supSkill: "Charisma", bonus: 0, proficient: false, expertise: false},
		{id: "Performance", name: "Performance", shortName: "Performance", supSkill: "Charisma", bonus: 0, proficient: false, expertise: false},
		{id: "Persuasion", name: "Persuasion", shortName: "Persuasion", supSkill: "Charisma", bonus: 0, proficient: false, expertise: false},
		{id: "SimpleWeapons", name: "Simple Weapons", shortName: "Simple Weapons", supSkill: "Weapon", bonus: "", proficient: false, expertise: false},
		{id: "MartialWeapons", name: "Martial Weapons", shortName: "Martial Weapons", supSkill: "Weapon", bonus: "", proficient: false, expertise: false},
		{id: "Shield", name: "Shield", shortName: "Shield", supSkill: "Weapon", bonus: "", proficient: false, expertise: false},
		{id: "LightArmor", name: "Light Armor", shortName: "Light Armor", supSkill: "Armor", bonus: "", proficient: false, expertise: false},
		{id: "MediumArmor", name: "Medium Armor", shortName: "Medium Armor", supSkill: "Armor", bonus: "", proficient: false, expertise: false},
		{id: "HeavyArmor", name: "Heavy Armor", shortName: "Heavy Armor", supSkill: "Armor", bonus: "", proficient: false, expertise: false},
	],
	proficienciesTypes: [
		{value: "Weapon", label: "Weapon"}, 
		{value: "Armor", label: "Armor"}, 
		{value: "Tool", label: "Tool"}, 
		{value: "Instrument", label: "Instrument"},
	],
	resources: [
		{name: "Hit Points", current: "", maximum: "", dice: ""},
	],
	features: [
		{name: "Lineage Features", level: 1, featureClass: "-", featureSubclass: "-", description: "Placeholder"},
		{name: "Lineage Features", level: 1, featureClass: "-", featureSubclass: "-", description: "Placeholder"},
	],
	actions : [
		{name: "Unarmed Attack", range: "Melee",  damage: 1, type: "Action", scaling: "Strength", isProficient: true, damageType:"Bludgeoning"},
	],
	spells: [
	],
	sortedSpellList: [],
	notes: "testing",
	inventory: [
	],
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
	// 4. Sets up the app state. takes a reducer, and an initial state
	const [state, dispatch] = useReducer(AppReducer, initialState);

	let ACtest = 0
	if(state.charAC.unarmoredDefense) {
		ACtest = state.charAC.baseAC + state.charAttributes.filter(attribute => {return attribute.name === state.charAC.scalingPrimary})[0].bonus
		if(state.charAC.scalingSecondary != "None") {
			ACtest += state.charAttributes.filter(attribute => {return attribute.name === state.charAC.scalingSecondary})[0].bonus
		}
	}
	else if(state.charAC.wearsArmor) {
		let bonus = state.charAttributes.filter(attribute => {return attribute.name === state.charAC.scalingPrimary})[0].bonus
		ACtest = state.charAC.baseAC + (bonus > state.charAC.maxBonus ? state.charAC.maxBonus : bonus)
	}
	state.charAC.value = ACtest
	
	state.initiative.value = 0 + (state.initiative.flatBonus) + state.charAttributes.filter(attribute => {return attribute.name === state.initiative.scalingPrimary})[0].bonus
	if(state.initiative.scalingSecondary != "None") {
		state.initiative.value += state.charAttributes.filter(attribute => {return attribute.name === state.initiative.scalingSecondary})[0].bonus
	}
	
	if(state.charAttributes.filter(attribute => {return attribute.name === state.casting.spellAttribute}).length != 0) {
		state.casting.spellHit = parseInt(state.proficiency.value) + parseInt(state.charAttributes.filter(attribute => {return attribute.name === state.casting.spellAttribute})[0].bonus)
		state.casting.spellDC = 8 + state.casting.spellHit
	}

	for(let j=0;j<24;j++) {
		let skill = state.skills[j];
		let modifier = 0;
		if(skill.proficient === true) {
			modifier += state.proficiency.value;
			if(skill.expertise === true) {
				modifier += state.proficiency.value;
			}
		}
		else if(state.jackOfAllTrades === true) {
			modifier += Math.floor(state.proficiency.value/2)
		}
		skill.bonus = state.charAttributes.filter((attribute) => {return attribute.name === skill.supSkill})[0].bonus + modifier
	}

	return (
		<AppContext.Provider
			value={{
				dispatch,
				charLevel: state.charLevel,
				charName: state.charName,
				charClass: state.charClass,
				charSubclass: state.charSubclass,
				charAttributes: state.charAttributes,
				skills: state.skills,
				proficiency: state.proficiency,
				initiative: state.initiative,
				speed: state.speed,
				baseAC: state.baseAC,
				charAC: state.charAC,
				charHP: state.charHP,
				resources: state.resources,
				proficienciesTypes: state.proficienciesTypes,
				features: state.features,
				actions: state.actions,
				spells: state.spells,
				casting: state.casting,
				spellSlots: state.spellSlots,
				jackOfAllTrades: state.jackOfAllTrades,
				sortedSpellList: state.sortedSpellList,
				notes: state.notes,
				inventory: state.inventory,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};
