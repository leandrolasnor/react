import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { useSelector, useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";

const _ = require("lodash");

let DropzoneUp = props => {
	const dispatch = useDispatch()
	const auth = useSelector(state => state.auth)
	const home = useSelector(state => state.home)

  const getUploadParams = ({ file, meta }) => {
		const headers = {
				"uid": _.get(auth.user,"uid"),
				"client":_.get(auth.user,"client"),
				"access-token": _.get(auth.user,"access-token")
		}
		const body = new FormData();
  		body.append('file', file);
		return { url: `${process.env.REACT_APP_API_URL}/upload`, body, headers}
	}
	
	const handleChangeStatus = ({ meta, file, xhr, remove }, status) => {
		if (status === 'headers_received'){
			remove();
			toastr.info(file.name, "The file did push for import.");
		} else if(status === 'exception_upload'){
			remove();
			toastr.warning("Warning", "The file "+file.name+" has a problem");
		}else if(status === 'done'){
			dispatch({type: "JOB_FETCHED", payload: _.get(JSON.parse(xhr.response), "job", null)})
		}else if(status === 'error_upload'){
			remove();
			console.log(JSON.parse(xhr.response))
			toastr.warning(file.name, _.get(JSON.parse(xhr.response), "errors", null));
		}
	}

    return (
			<Dropzone
				getUploadParams={getUploadParams}
				onChangeStatus={handleChangeStatus}
				accept=".tab"
				maxSizeBytes={20000000}
				multiple={false}
				disabled={_.size(_.get(home, "jobs", [])) > 0 && Number(_.get(home,"jobs[0].number_of_lines", 0)) === 0 ? true : false }
				styles={{dropzone: { border: "dashed", overflow: 'hidden' }}}
				inputContent={(files, extra) => (extra.reject ? 'Tab files only' : "Drag Tab Files"  )}
			/>
    )
};

export default DropzoneUp;