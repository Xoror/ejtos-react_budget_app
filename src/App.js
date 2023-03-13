import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import "./components/MainBody.css";
import Container from 'react-bootstrap/Container';



// Add code to import the components
import AllocationForm from "./components/AllocationForm";
import { CharacterName, MiscInfo, CharacterClass, NavBar } from "./components/Header";
import { AppProvider } from "./context/AppContext";
import { Attributes, MiscAttributes, ResourcesMiscProficiencies, SpellCard} from "./components/MainBody";
import { Features, Actions} from "./components/3rdColumn";


const App = () => {
	//document.body.style.backgroundColor = '#704214';
    
	return (
        <AppProvider>
			<div>
				<NavBar/>
			</div>
			<Container fluid style={{color: '#ffffff', backgroundColor: '#704214', fontSize:'16px'}}>
				<div className='row justify-content-md-center'>
					<div className='col col-lg-3' style={{backgroundColor: 'green', display: "flex", justifyContent: "right", alignItems: "center"}}>
						<CharacterName/>
					</div>
					<div className='col-lg-auto' style={{backgroundColor: 'blue', display: "flex", justifyContent: "center", alignItems: "center"}}>
						<div>
							<MiscInfo />
						</div>
					</div>
					<div className='col col-lg-3' style={{backgroundColor: 'red', display: "flex", justifyContent: "left", alignItems: "center", paddingBottom:"20px"}}>
						<CharacterClass />
					</div>
					
				</div>
				<div className='row'>
					<div className='col-md-auto' style={{paddingRight:"0"}}>
						<Attributes/>
					</div>
					<div className='col-md-auto' style={{padding:"0"}}>
						<div>
							<MiscAttributes/>
						</div>
						<div>
							<SpellCard/>
						</div>
						<div>
							<ResourcesMiscProficiencies/>
						</div>
					</div>
					<div className='col-md' style={{paddingLeft:"0"}}>
						<Features/>
					</div>
				</div>
				<h3 className='mt-3'>Change allocation</h3>
				<div className='row mt-3'>
					<div className='col-sm'>
						<AllocationForm/>
					</div>
				</div>
			</Container>
		</AppProvider>
    );
};

export default App;
