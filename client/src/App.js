
import { useState, useEffect } from 'react'
import './App.css'
import request from './helpers/request'
import { formatDate, formatTime } from '../src/helpers/formatter'

const QUERIES = [{
  id: 4,
  url: 'remaining-spots'
}, {
  id: 5,
  url: 'nurse-jobs-availability'
}, {
  id: 6,
  url: 'nurse-coworkers?nurseId=1001'
}]

const App = () => {
  const [shifts, setShifts] = useState([])
  const [selectedShifts, setSelectedShifts] = useState([])
  const [result, setResult] = useState({
    overlapMinutes: null,
    maximumOverlapThreshold: null,
    exceedsOverlapThreshold: null
  })

  const loadShifts = () => {
    request({
      route: 'shifts'
    }).then((response) => {
      if(response.success) {
        setShifts(response.body)
      }
      else {
        console.error(response.text)
      }
    })
  }

  useEffect(() => {
    loadShifts()
  }, [])

  const handleShiftSelection = (index) => {
    const currentShift = shifts[index]
    const selectedShiftIndex = selectedShifts.findIndex((shift) => shift.shift_id === currentShift.shift_id)

    //remvoes selection if element exists
    if(selectedShiftIndex >= 0) {
      const newShifts = [...selectedShifts]
      newShifts.splice(selectedShiftIndex, 1)
      setSelectedShifts(newShifts)
      return
    }

    //prevents to select more than 2 items
    if(selectedShifts.length >= 2) {
      return
    }

    //finally if conditions are valid adds new value to the selection
    setSelectedShifts([...selectedShifts, currentShift])
  }

  const isShiftSelected = (currentShift) => selectedShifts.find((shift) => shift.shift_id === currentShift.shift_id)

  const handleSubmit = () => {
    if(selectedShifts.length !== 2) {
      alert('Please select two shifts before starting a comparison.')
      return
    }

    request({
      route: `shifts-exceeds-overlap-threshold?shiftIdA=${selectedShifts[0].shift_id}&shiftIdB=${selectedShifts[1].shift_id}`
    }).then((response) => {
      if(response.success) {
        setResult(response.body)
      }
      else {
        console.error(response.text)
      }
    })
  }

  const executeQuery = (url) => {
    request({
      route: url
    }).then((response) => {
      if(response.success) {
        console.log(`Query: ${response.body.query}\n>>> `)
        console.log(response.body.data)
      }
      else {
        console.error(response.text)
      }
    })
  }

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Shifts list</h1>
        <div className='container shifts-comparison'>
          <div>
            <p>Overlap minutes: <span>{result.overlapMinutes}</span></p>
            <p>Max overlap threshold: <span>{result.maximumOverlapThreshold}</span></p>
            <p>Exceeds overlap threshold: <span>{result.exceedsOverlapThreshold ? 'Yes' : 'No'}</span></p>
          </div>
          <div>
            <button className='submmit' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        <div className='shifts-container'>
          {shifts.map((shift, index) => (
            <div key={index} className={`container shift-item ${isShiftSelected(shift) ? 'selected' : ''}`} onClick={() => handleShiftSelection(index)}>
              <p>{shift.facility_name}</p>
              <p>{formatDate(shift.shift_date)}</p>
              <p>{formatTime(shift.start_time)} - {formatTime(shift.end_time)} </p>
            </div>
          ))}
        </div>
      </header>
      <div className='query-containers'>
        <h2>Query triggers</h2>
        <div>
          {QUERIES.map((query, index) => (
            <button key={index} className='submmit' onClick={() => executeQuery(query.url)}>Execute Q{query.id} Query</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
