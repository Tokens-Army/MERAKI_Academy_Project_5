import React,{useState,useEffect} from 'react'
import axios from 'axios'
const ScheduleOrder = () => {
  const [selectDate, setSelectDate] = useState("")
    return (
    <div>
        ScheduleOrder
        <input type='time' min={new Date().toISOString().slice(0, -8)} max="11:00" />
    <input type='datetime-local' min={new Date().toISOString().slice(0, -8)} max="2023-09-27T18:00" onChange={(e)=>{
        setSelectDate(e.target.value)
    }}/>
    <button onClick={()=>{
        axios.put("")
    }}>Place order time</button>
    <form>
  <div>
    <label for="appt-time">
      Choose an appointment time (opening hours 12:00 to 18:00):
    </label>
    <input
      id="appt-time"
      type="datetime-local"
      name="appt-time"
      min="12:00"
      max="18:00"
      required />
    <span class="validity"></span>
  </div>
  <form>
  <div>
    <label for="appt-time">
      Choose an appointment time (opening hours 12:00 to 18:00):
    </label>
    <input
      id="appt-time"
      type="time"
      name="appt-time"
      min="12:00"
      max="18:00"
      required
      pattern="[0-9]{2}:[0-9]{2}" />
    <span class="validity"></span>
  </div>
  <div>
    <input type="submit" value="Submit form" />
  </div>
</form>
  <div>
    <input type="submit" value="Submit form" />
  </div>
</form>




    </div>
  )
}

export default ScheduleOrder