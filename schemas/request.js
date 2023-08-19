import z from 'zod'

const querySchema = z.object({
  url: z.string().url({
    invalid_type_error: 'Invalid url',
    message: 'Invalid url'
  }),
  option: z.string(),
})

export function validateQuery(query) {
  return querySchema.safeParse(query)
}