export function getTimeLeftToday() {
    const now = new Date()
    const endOfDay = new Date(now)
    endOfDay.setHours(23, 59, 59, 999)

    const diffMs = endOfDay - now

    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)

    const pad = num => String(num).padStart(2, '0')

    return {
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds)
    }
}


export function getHabitCompletionPercentage(habitData) {
    let totalHabits = 0
    let completedHabits = 0

    for (const date in habitData) {
        const habits = habitData[date]
        for (const habit in habits) {
            totalHabits += 1
            if (habits[habit]) {
                completedHabits += 1
            }
        }
    }

    if (totalHabits === 0) { return 0 }

    return (completedHabits / totalHabits) * 100
}

export function isNewDay(previousTimestamp) {
    const prev = new Date(previousTimestamp)
    const now = new Date()

    return (
        prev.getFullYear() !== now.getFullYear() ||
        prev.getMonth() !== now.getMonth() ||
        prev.getDate() !== now.getDate()
    )
}

export function getCurrentDateString(input) {
    const now = input ? new Date(input) : new Date()

    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

export function getCompletedData(data) {
    return Object.keys(data).reduce((acc, curr) => {
        return data?.[curr] ? { ...acc, [curr]: data[curr] } : acc
    }, {})
}

export function getHabitCompletion(habits, data) {
    const completedObj = getCompletedData(data)
    const percentage = Object.keys(completedObj).length * 100 / habits.length
    return percentage
}

export function countStreakUpToYesterday(data) {
    const oneDayMs = 24 * 60 * 60 * 1000
    let streak = 0

    let current = new Date()
    current = new Date(current.getTime() - oneDayMs) // start from yesterday

    while (true) {
        const year = current.getFullYear()
        const month = String(current.getMonth() + 1).padStart(2, '0')
        const day = String(current.getDate()).padStart(2, '0')
        const dateStr = `${year}-${month}-${day}`

        const habits = data[dateStr]
        if (!habits) break

        const allComplete = Object.values(habits).every(v => v === true)
        if (!allComplete) break

        streak += 1
        current = new Date(current.getTime() - oneDayMs)
    }

    return streak
}

