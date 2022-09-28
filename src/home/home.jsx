import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Col, Row} from "react-bootstrap";
import Musicollection from "../musicollection/musicollection"
import ZipCodeSearch from "../zip_code_search/zip_code_search"
import Modal from "../common/modal/component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-free-brands'
import '@fortawesome/fontawesome-free-solid'
import '@fortawesome/fontawesome-free-regular'
import "./styles.css"

let Home = props => {

	const [showModalMoat, setShowMoat] = useState(false);	
	const [showModalLatech, setShowLatech] = useState(false);	

	return (
		<Col lg={12}>
			<Row>
				<Col className="text-center hvr-grow item-panel mt-5" lg={3} md={3} sm={6} xs={12}>
					<NavLink className="item-painel-link" to="/musicollection">
						<FontAwesomeIcon icon={["fas", "fa-music"]} />
						<p>music collection</p>
					</NavLink>
				</Col>
				<Col className="text-center hvr-grow item-panel mt-5" lg={3} md={3} sm={6} xs={12}>
					<NavLink className="item-painel-link" to="/zip_code_search">
						<FontAwesomeIcon icon={["fa", "fa-map"]} />
						<p>zip code search</p>
					</NavLink>
				</Col>
			</Row>
			<Modal title={"Collections"} subtitle={"Music"} content={<Musicollection />} handleClose={() => setShowMoat(false)} show={showModalMoat} />
			<Modal title={"Search"} subtitle={"CEP"} content={<ZipCodeSearch />} handleClose={() => setShowLatech(false)} show={showModalLatech} />
		</Col>
	);
};
export default Home
