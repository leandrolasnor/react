import {useSelector, useDispatch} from "react-redux";
import Routes from "./routes/routes";
import Profile from './common/profile/component'
import ListTecnologies from './common/tecnologies/componet'
import { Container, Row, Col } from "react-bootstrap";
import {ActionCableConsumer } from '@thrash-industries/react-actioncable-provider';
import { toastr } from "react-redux-toastr";
import axios from 'axios'

var _ = require('lodash');

let App = props => {

	const user = useSelector(state => state.auth.user)
	const dispatch = useDispatch();

	const handleReceived = props => {
    const {type, payload} = props
    dispatch({type: type, payload: payload});
		if(type.indexOf("ERRORS") > -1){
			payload.errors.forEach(error => {
				toastr.error("Erro", error)
			});
		}
  }

	axios.defaults.headers.common['uid'] = _.get(user, "uid");
	axios.defaults.headers.common['access-token'] = _.get(user, "access-token");
	axios.defaults.headers.common['client'] = _.get(user, "client");

	return (
		<Container lg={12} md={12} sm={12} xs={12}>
			<Row className="bg-dark mt-5 profile">
				<Col className="text-light mt-3" lg={{ span: 2, offset: 0 }}>
						<Profile user={user} />
				</Col>
				<Col className="text-light mt-4 mb-5" lg={{ span: 10, offset: 0 }} sm={12} xs={12}>
						<ListTecnologies />
				</Col>
			</Row>
			<Row style={{backgroundColor: 'rgba(0, 0, 0, 0.32)'}}>
				<Routes />
				<ActionCableConsumer
					channel="NotificationChannel"
					onReceived={handleReceived}
					onConnected={props => console.log("Cable Online")}
					onDisconected={props => console.log("Cable Offline")}
					onInitialized={props => console.log("Cable Initialized")}
					onRejected={props => console.log("Cable Rejected")}
				/>
			</Row>
		</Container>
	);
};

export default App;