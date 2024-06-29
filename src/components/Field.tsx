import Message from './Message'

interface Props {
  id: string
  label: string
  placeholder: string
  min: number
  max: number
  value: number
  handlerChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Field({
  id,
  label,
  placeholder,
  min,
  max,
  handlerChange,
  value
}: Props) {
  const errorMessage =
    value === 0 ? (
      <Message description='The field is required' />
    ) : value < min || value > max ? (
      <Message description={`Must be a valid ${label}`} />
    ) : (
      <></>
    )

  const error = !value || value < min || value > max

  return (
    <div className='w-[88px] flex flex-col gap-y-[5px] font-bold lg:w-40'>
      <label
        htmlFor={id}
        className={`uppercase text-xs tracking-[3px] ${
          error ? 'text-red-500' : ''
        } lg:text-base`}
      >
        {label}
      </label>
      <input
        type='number'
        placeholder={placeholder}
        name={id}
        id={id}
        min={min}
        max={max}
        value={value}
        onChange={handlerChange}
        className={`border rounded-md w-full h-[52px] px-2 text-xl focus:outline-none focus:border-[hsl(259,_100%,_65%)] lg:h-16${
          error ? 'border-red-500' : ''
        }`}
      />

      {errorMessage}
    </div>
  )
}

export default Field
