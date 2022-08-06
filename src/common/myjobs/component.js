import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button, Row, Col } from "react-bootstrap"
import { get_jobs } from "../../home/actions"
import "./style.css"
const _ = require("lodash")

const Jobs = props => {
  const [jobs, setJobs] = useState([])
  const auth = useSelector((state) => state.auth)
  const home = useSelector((state) => state.home)
  const {user} = auth
  const {its_all_for_today_guys} = home
  const dispatch = useDispatch()

  const days = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado']
  const months = ["JAN", "FEV", "MAR", "ABR", "MAIO", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
  const addZero = i => i < 10 ? "0" + i : i

  const formatHour = date => {
    var d = new Date(date)
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    return h + ":" + m + ":" + s
  }

  useEffect(() => {
    setJobs(home.jobs)
  },[home])

  let JobsCards = props => {
    return (
      <Col lg={4} key={props.iKey} className="mr-0 ml-0 pl-1 pr-1 pb-0 mb-0">
        <Card className="card card-margin hvr-outline-in">
          <Card.Header className="card-header no-border">
            <h5 className="card-title">{props.day_of_week}</h5>
          </Card.Header>
          <Card.Body className="card-body pt-0">
          <div className="widget-49">
              <div className="widget-49-title-wrapper">
                  <div className={`widget-49-date-${props.number_of_lines ? "success" : "warning"}`}>
                      <span className="widget-49-date-day">{props.date_day}</span>
                      <span className="widget-49-date-month">{props.date_month}</span>
                  </div>
                  <div className="widget-49-meeting-info">
                      <span className="widget-49-pro-title">{props.file_name}</span>
                      <span className="widget-49-meeting-time">{`${props.hour_init} to ${props.hour_end}`}</span>
                  </div>
              </div>
              <ul className="widget-49-meeting-points">
                  <li className="widget-49-meeting-item"><span>{`bytes: ${props.size}`}</span></li>
                  <li className="widget-49-meeting-item"><span>{`linhas: ${props.number_of_lines ? props.number_of_lines : "?"}`}</span></li>
                  <li className="widget-49-meeting-item"><span>{`bruto: ${props.gross > 0 ? Number(props.gross).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "?"}`}</span></li>
              </ul>
            </div>
          </Card.Body>
        </Card>
      </Col>
    )
  }

  const handleClickMoreJobs = props => {
    dispatch(get_jobs(user, 9, jobs.length))
  }

  return (
    <Row>
      {
        jobs.map((job, i) => 
          <JobsCards 
            iKey={i.toString()} 
            file_name={`${_.get(job, "file_name")}`}
            date_day={new Date(job.created_at).getUTCDate()}
            date_month={months[new Date(job.created_at).getUTCMonth()]}
            hour_init={`${formatHour(job.created_at)}`}
            hour_end={`${formatHour(job.updated_at)}`}
            size={job.size}
            number_of_lines={job.number_of_lines}
            gross={job.gross}
            day_of_week={days[new Date(job.created_at).getDay()]}
          />
        )
      }
      {!its_all_for_today_guys ? <Button className="mb-2 mt-1" onClick={handleClickMoreJobs} variant="link">Mostrar mais</Button> : null}
    </Row>
  )
}

export default Jobs;