import { useDispatch } from 'react-redux'
import ReactTooltip from "react-tooltip";
import { logout } from "../../auth/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-free-brands'
import '@fortawesome/fontawesome-free-solid'
import '@fortawesome/fontawesome-free-regular'
import React from "react";

let Logout = props => {
    const dispatch = useDispatch()
    return (
        <React.Fragment>
            <h4><a href="/#" onClick={() => dispatch(logout) } data-tip data-for="exit"><FontAwesomeIcon className="hvr-forward text-danger" icon={["fas", "sign-out-alt"]} /></a></h4>
            <ReactTooltip id='exit' place="bottom" effect="solid" textColor="#fff" arrowColor="transparent" backgroundColor="transparent">
                <span>SAIR</span>
            </ReactTooltip>
        </React.Fragment>
    )
};

export default Logout;