import { FormEvent, useState } from 'react'
import { Button, ButtonGroup, InputAdornment, TextField } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import {
  IDiagnosis,
  IEntryWithoutId,
  IHealthCheckRating,
  IType,
} from '../../../types'

const ratingOptions = Object.keys(IHealthCheckRating)
  .filter((key) => Number(key) || key === '0')
  .map(Number)

interface Props {
  onSubmit: (values: IEntryWithoutId) => void
  onCancel: () => void
  diagnoses: Array<IDiagnosis>
}

const HealthCheckEntryForm = ({ onSubmit, onCancel, diagnoses }: Props) => {
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
  const [healthRating, sethHealthRating] = useState(ratingOptions[0])

  const handleDiagnosisCodesChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event

    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value)
  }

  const handleHealthRatingChange = (e: SelectChangeEvent<number>) => {
    const value = e.target.value

    if (typeof value === 'number') {
      const rating = Object.keys(IHealthCheckRating).find(
        (r) => Number(r) === value
      )

      if (rating) {
        sethHealthRating(Number(rating))
      }
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const key = IHealthCheckRating[healthRating]
    const healthCheckRating =
      IHealthCheckRating[key as keyof typeof IHealthCheckRating]

    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      type: IType.HealthCheck,
      healthCheckRating,
    })
  }

  return (
    <FormControl fullWidth>
      <form
        onSubmit={handleSubmit}
        autoComplete='off'
      >
        <TextField
          label='Description'
          id='description'
          name='description'
          margin='dense'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position='start' />,
          }}
        />

        <TextField
          id='date'
          fullWidth
          type='date'
          label='Date'
          name='date'
          margin='dense'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position='start' />,
          }}
        />

        <TextField
          label='Specialist'
          id='specialist'
          name='specialist'
          margin='dense'
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position='start' />,
          }}
        />

        <FormControl
          fullWidth
          sx={{ marginTop: 1 }}
        >
          <InputLabel id='diagnosis'>Diagnosis codes</InputLabel>
          <Select
            label='Diagnosis codes'
            labelId='diagnosis'
            id='diagnosis-info'
            name='diagnosisCodes'
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
            fullWidth
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem
                key={diagnosis.code}
                value={diagnosis.code}
              >
                {diagnosis.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          sx={{ marginTop: 1 }}
        >
          <InputLabel id='health-check-rating'>Health check rating</InputLabel>
          <Select
            label='Health check rating'
            labelId='health-check-rating'
            id='health-check-rating'
            name='health-check-rating'
            value={healthRating}
            onChange={handleHealthRatingChange}
            fullWidth
          >
            {ratingOptions.map((rating) => (
              <MenuItem
                key={rating}
                value={rating}
              >
                {rating}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ButtonGroup
          sx={{ my: 1, display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            variant='contained'
            color='success'
            type='submit'
          >
            Add
          </Button>
          <Button
            variant='outlined'
            color='primary'
            type='button'
            onClick={onCancel}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </FormControl>
  )
}

export default HealthCheckEntryForm
