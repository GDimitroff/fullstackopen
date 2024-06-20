import { FormEvent, useState } from 'react'
import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { IDiagnosis, IEntryWithoutId } from '../../types'

interface Props {
  onSubmit: (values: IEntryWithoutId) => void
  diagnoses: Array<IDiagnosis>
}

const HospitalEntryForm = ({ onSubmit, diagnoses }: Props) => {
  const [codes, setCodes] = useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof codes>) => {
    const {
      target: { value },
    } = event

    setCodes(typeof value === 'string' ? value.split(',') : value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // FIXME: fix typings
    const formData = {} as IEntryWithoutId
    onSubmit(formData)
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
          InputProps={{
            startAdornment: <InputAdornment position='start' />,
          }}
        />

        <TextField
          label='Specialist'
          id='specialist'
          name='specialist'
          margin='dense'
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
            value={codes}
            onChange={handleChange}
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

        <Typography sx={{ marginTop: 1 }}>Discharge: </Typography>
        <TextField
          label='Date'
          id='discharge-date'
          name='dischargeDate'
          margin='dense'
          type='date'
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position='start' />,
          }}
        />
        <TextField
          label='Criteria'
          id='criteria'
          name='criteria'
          margin='dense'
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position='start' />,
          }}
        />

        <Button
          variant='outlined'
          color='secondary'
          sx={{ marginTop: 1 }}
          type='submit'
        >
          Add
        </Button>
      </form>
    </FormControl>
  )
}

export default HospitalEntryForm
