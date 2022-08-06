import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css"

let Tecnologies = props => {
 
    
    return (
        <ul className="tecnologies">
            <li>
                <a href="/#" data-tip data-for="idocker"><FontAwesomeIcon className="hvr-sink" icon={["fab", "docker"]} /></a>
                <ReactTooltip id='idocker' place="bottom" effect="solid" textColor="#fff" arrowColor="transparent" backgroundColor="transparent">
                    <span>Docker</span>
                </ReactTooltip>
            </li>
            <li>
                <a href="/#" data-tip data-for="ireact"><FontAwesomeIcon className="hvr-sink" icon={["fab", "react"]} /></a>
                <ReactTooltip id='ireact' type='light' place="bottom" effect="solid" textColor="#fff" arrowColor="transparent" backgroundColor="transparent">
                    <span>React</span>
                </ReactTooltip>
            </li>
            <li>
                <a href="/#" data-tip data-for="igem"><FontAwesomeIcon className="hvr-sink" icon={["fas", "gem"]} /></a>
                <ReactTooltip id='igem' type='light' place="bottom" effect="solid" textColor="#fff" arrowColor="transparent" backgroundColor="transparent">
                    <span>RubyOnRails</span>
                </ReactTooltip>
            </li>
            <li>
                <a href="/#" data-tip data-for="isidekiq"><FontAwesomeIcon className="hvr-sink" icon={["fas", "hands-helping"]} /></a>
                <ReactTooltip id='isidekiq' type='light' place="bottom" effect="solid" textColor="#fff" arrowColor="transparent" backgroundColor="transparent">
                    <span>Sidekiq</span>
                </ReactTooltip>
            </li>
            <li>
                <a href="/#" data-tip data-for="idatabase"><FontAwesomeIcon className="hvr-sink" icon={["fas", "database"]} /></a>
                <ReactTooltip id='idatabase' type='light' place="bottom" effect="solid" textColor="#fff" arrowColor="transparent" backgroundColor="transparent">
                    <span>PostgreSQL</span>
                </ReactTooltip>
            </li>
        </ul>
    )
}

export default Tecnologies;