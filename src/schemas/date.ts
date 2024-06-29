import { z } from 'zod'

interface Date {
  year: string
  month: string
  day: string
}

/* const dateSchema = z.object({
  year: z
    .string({ required_error: 'The field is required' })
    .regex(/\d{4}/, { message: 'Must be a valid year' }),
  month: z
    .string({ required_error: 'The field is required' })
    .regex(/\d{2}/, { message: 'Must be a valid month' }),
  day: z
    .string({ required_error: 'The field is required' })
    .regex(/\d{2}/, { message: 'Must be a valid day' })
}) */

const dateSchema = z.string().date()

export const validateDate = ({ year, month, day }: Date) => {
  return dateSchema.safeParse(`${year}-${month}-${day}`)
}
