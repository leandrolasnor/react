import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Col, Row} from "react-bootstrap";
import Musicollection from "../musicollection/musicollection"
import Modal from "../common/modal/component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-free-brands'
import '@fortawesome/fontawesome-free-solid'
import '@fortawesome/fontawesome-free-regular'
import "./styles.css"

let Home = props => {

	const [showModalMoat, setShowMoat] = useState(false);	

	return (
		<Col lg={12}>
			<Row>
				<Col className="text-center hvr-grow item-panel mt-5" lg={3} md={3} sm={6} xs={12}>
					<NavLink className="item-painel-link" to="/musicollection">
						<FontAwesomeIcon icon={["fas", "fa-music"]} />
						<p>moat.ai</p>
					</NavLink>
				</Col>
			</Row>
			<Modal title={"Collections"} subtitle={"Music"} content={<Musicollection />} handleClose={() => setShowMoat(false)} show={showModalMoat} />
		</Col>
	);
};
export default Home
