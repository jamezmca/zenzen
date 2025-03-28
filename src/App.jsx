import { useEffect, useState } from "react"
import Hero from "./components/pages/Hero"
import Layout from "./components/pages/Layout"
import Tracker from "./components/Tracker"
import Dashboard from "./components/pages/Dashboard"
import Challenge from "./components/pages/Challenge"
import { getCurrentDateString } from "./utils"

function App() {
  const [name, setName] = useState('')
  const [selectedDisplay, setSelectedDisplay] = useState(0)
  const [day, setDay] = useState(1)
  const [habits, setHabits] = useState(['Drink water 💧', 'Sleep 8hrs 💤', '5 fruit & veg 🍑'])
  const [data, setData] = useState({})
  const [datetime, setDatetime] = useState(null)
  const [history, setHistory] = useState([])

  const currDateString = getCurrentDateString()

  function handleChangePage(index) {
    setSelectedDisplay(index)
  }

  function handleCreateAccount() {
    if (!name) { return }
    localStorage.setItem('name', name)
    handleChangePage(1)
  }

  function handleAddHabit(newHabit) {
    if (!newHabit) { return }
    setHabits(curr => {
      let newHabs = [...curr, newHabit]
      localStorage.setItem('habits', JSON.stringify(newHabs))
      return newHabs
    })
  }

  function handleDeleteHabit(index) {
    setHabits(curr => {
      let newHabs = [...curr].filter((v, i) => {
        return i !== index
      })
      localStorage.setItem('habits', JSON.stringify(newHabs))
      return newHabs
    })
  }

  function handleModForm(day, habit) {
    const newHabits = { ...data }
    if (!(day in newHabits)) {
      newHabits[day] = {}
    }
    newHabits[day][habit] = !newHabits?.[day]?.[habit]
    localStorage.setItem('tracker', JSON.stringify(newHabits))
    setData(newHabits)
  }

  function initDay() {
    const newObj = { ...data }
    if (!newObj?.[currDateString]) {
      newObj[currDateString] = {}
    }
    const newDay = { ...newObj[currDateString] }
    for (let habit of habits) {
      if (!(newDay?.[habit])) {
        newDay[habit] = false
      }
    }
    newObj[currDateString] = newDay
    return newObj
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let n = ''
    let t = {}
    let h = []

    setName(curr => {
      if (localStorage.getItem('name')) {
        n = localStorage.getItem('name')
        setSelectedDisplay(1)
        return n
      }
      return curr
    })

    setHabits(curr => {
      if (localStorage.getItem('habits')) {
        h = JSON.parse(localStorage.getItem('habits'))
        return h
      }
      h = curr
      return curr
    })

    setData(c => {
      let temp = h.reduce((acc, curr) => {
        return { ...acc, [curr]: false }
      }, {})

      if (localStorage.getItem('tracker')) {
        t = JSON.parse(localStorage.getItem('tracker'))

      } else {
        t = c
      }

      t[currDateString] = t?.[currDateString] ? { ...temp, ...t[currDateString] } : temp

      return t
    })

  }, [currDateString])

  const displays = {
    0: <Hero handleCreateAccount={handleCreateAccount} name={name} setName={setName} />,
    1: <Dashboard currDateString={currDateString} handleAddHabit={handleAddHabit} handleDeleteHabit={handleDeleteHabit} data={data} habits={habits} name={name} day={day} handleChangePage={handleChangePage} />,
    2: <Challenge handleChangePage={handleChangePage} currDateString={currDateString} data={data} handleModForm={handleModForm} habits={habits} />
  }

  return (
    <Layout>
      {displays[selectedDisplay]}
    </Layout>
  )
}

export default App
