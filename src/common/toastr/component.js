import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

export default props => (
    <ReduxToastr timeOut={6000} newestOnTop={false} preventDuplicates={true} position='top-right' transitionIn='fadeIn' transitionOut='fadeOut' progressBar />
)