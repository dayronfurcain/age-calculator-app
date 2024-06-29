import { useState } from 'react'
import iconArrow from './assets/icon-arrow.svg'
import DateField from './components/DateField'
import Field from './components/Field'

import {
  diffDays,
  diffMonths,
  diffYears,
  addYear,
  addMonth,
  format
} from '@formkit/tempo'
import { validateDate } from './schemas/date'

function App() {
  const [date, setDate] = useState({ year: 1900, month: 1, day: 1 })
  const [difDate, setDifDate] = useState({
    difYears: '- -',
    difMonths: '- -',
    difDays: '- -'
  })
  const [errorMessage, setErrorMessage] = useState('')

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate((prevState) => ({
      ...prevState,
      [e.target.name]: Number(e.target.value)
    }))
  }

  const calculeAge = (year: string, month: string, day: string) => {
    const currentDate = new Date()
    const inputDate = format(`${year}-${month}-${day}`, 'YYYY-MM-DD')

    const difYears = diffYears(currentDate, inputDate)
    let newDate = addYear(inputDate, difYears)

    const difMonths = diffMonths(currentDate, newDate)
    newDate = addMonth(newDate, difMonths)

    const difDays = diffDays(currentDate, newDate)

    return { difYears, difMonths, difDays }
  }

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    let day = formData.get('day')!.toString()
    let month = formData.get('month')!.toString()
    const year = formData.get('year')!.toString()

    if (day.length === 1) day = `0${day}`
    if (month.length === 1) month = `0${month}`

    const result = validateDate({ year, month, day })

    if (!result.success) {
      setErrorMessage('Incorrect format')
      setTimeout(() => setErrorMessage(''), 5000)
      return
    }

    const { difYears, difMonths, difDays } = calculeAge(year, month, day)
    setDifDate({
      difYears: String(difYears),
      difMonths: String(difMonths),
      difDays: String(difDays)
    })
  }

  const disabledButton =
    Object.values(date).some((el) => !el) ||
    date.day < 1 ||
    date.day > 31 ||
    date.month < 1 ||
    date.month > 12 ||
    date.year < 1900 ||
    date.month > new Date().getFullYear()

  return (
    <main className='min-h-screen px-4 grid items-center bg-[hsl(0,_0%,_94%)]'>
      <form
        onSubmit={handlerSubmit}
        className='mx-auto w-[343px] py-12 rounded-3xl rounded-br-[100px] bg-white font-poppins lg:w-[840px]'
      >
        <div className='w-full flex justify-between gap-x-1 px-6 lg:px-12 lg:justify-start lg:gap-x-8'>
          <Field
            id='day'
            label='day'
            placeholder='DD'
            min={1}
            max={31}
            value={date.day}
            handlerChange={handlerChange}
          />

          <Field
            id='month'
            label='month'
            placeholder='MM'
            min={1}
            max={12}
            handlerChange={handlerChange}
            value={date.month}
          />

          <Field
            id='year'
            label='year'
            placeholder='YYYY'
            min={1900}
            max={new Date().getFullYear()}
            handlerChange={handlerChange}
            value={date.year}
          />
        </div>

        {errorMessage && (
          <p className='mt-4 px-6 font-poppins font-normal italic text-xs text-red-500 leading-tight lg:px-12 lg:text-base'>
            {errorMessage}
          </p>
        )}

        <div className='mt-[66px] relative px-6 lg:px-12'>
          <hr />
          <button
            disabled={disabledButton}
            className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16  bg-[hsl(259,_100%,_65%)] rounded-full flex items-center justify-center hover:bg-slate-900 ${
              disabledButton ? 'opacity-80' : ''
            }  lg:left-auto lg:right-0`}
          >
            <img src={iconArrow} alt='icon-arrow' className='w-[26px]' />
          </button>
        </div>

        <div className='mt-16 pl-6 grid lg:px-12'>
          <DateField name='years' value={difDate?.difYears} />
          <DateField name='months' value={difDate?.difMonths} />
          <DateField name='days' value={difDate?.difDays} />
        </div>
      </form>
    </main>
  )
}

export default App
