const INITIAL_STATE = {
  gross_all_time: 0,
  jobs:[],
  progress: 0,
  its_all_for_today_guys: true
};

const _ = require("lodash");
  
var reducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'GROSS_FETCHED':
      if(action.payload){
        const gross = Number(action.payload) + Number(state.gross_all_time)
        return {...state, gross_all_time:gross}
      }
      return state;
    case "JOBS_FETCHED":
      if(!_.isEmpty(action.payload)){
        let its_all_for_today_guys = action.payload.length < 9 ? true : false
        let jobs = _.union(state.jobs, action.payload)
        return {...state, jobs:jobs, its_all_for_today_guys};
      }
      return state
    case "JOB_FETCHED":
      if(action.payload){
        const job = action.payload
        let jobs = state.jobs
        jobs.unshift(job)
        return {...state, jobs};
      }
      return state
    case "JOB_DONE":
      if(action.payload){
        const job = action.payload
        let jobs = state.jobs.filter(function(j) {
          return j.uuid !== job.uuid
        })
        jobs.unshift(job)
        if(state.gross_all_time > 0){
          const gross = Number(state.gross_all_time) + Number(job.gross)
          return {...state, jobs, progress:0, gross_all_time:gross}
        }
        return {...state, jobs, progress:0}
      }
      return state
    case "REFRESH_PROGRESS":
      if(action.payload || action.payload === 0){
        let progress = action.payload
        return {...state, progress: progress}
      }
      return state
    case "LOGOUT":
      return INITIAL_STATE
    default:
      return state;
  }
}

export default reducer;