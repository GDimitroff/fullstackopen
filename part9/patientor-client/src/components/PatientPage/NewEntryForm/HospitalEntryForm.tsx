import { FormEvent, useState } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { IDiagnosis, IEntryWithoutId, IType } from '../../../types'

interface Props {
  onSubmit: (values: IEntryWithoutId) => void
  onCancel: () => void
  diagnoses: Array<IDiagnosis>
}

const HospitalEntryForm = ({ onSubmit, onCancel, diagnoses }: Props) => {
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
  const [dischargeDate, setDischargeDate] = useState('')
  const [criteria, setCriteria] = useState('')

  const handleDiagnosisCodesChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event

    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      type: IType.Hospital,
      discharge: {
        date: dischargeDate,
        criteria,
      },
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

        <Typography sx={{ marginTop: 1 }}>Discharge: </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            label='Date'
            id='discharge-date'
            name='dischargeDate'
            margin='dense'
            type='date'
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position='start' />,
            }}
          />
          <TextField
            label='Criteria'
            id='criteria'
            name='criteria'
            margin='dense'
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            sx={{ flex: 1 }}
            InputProps={{
              startAdornment: <InputAdornment position='start' />,
            }}
          />
        </Box>

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
            type='submit'
            onClick={onCancel}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </FormControl>
  )
}

export default HospitalEntryForm
