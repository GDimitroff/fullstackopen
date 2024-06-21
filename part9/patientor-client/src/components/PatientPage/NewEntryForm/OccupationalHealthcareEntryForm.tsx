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

const OccupationalHealthcareEntryForm = ({
  onSubmit,
  onCancel,
  diagnoses,
}: Props) => {
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
  const [employerName, setEmployerName] = useState('')
  const [sickLeave, setSickLeaveDate] = useState({
    startDate: '',
    endDate: '',
  })

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
      type: IType.OccupationalHealthcare,
      employerName,
      sickLeave:
        sickLeave.startDate || sickLeave.endDate ? sickLeave : undefined,
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
          sx={{ my: 1 }}
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

        <TextField
          label='Employer name'
          id='employer-name'
          name='employer-name'
          margin='dense'
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position='start' />,
          }}
        />

        <Typography sx={{ marginTop: 1 }}>Sick leave</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            label='Start Date'
            id='sick-leave-start-date'
            name='sick-leave-start-date'
            margin='dense'
            type='date'
            value={sickLeave.startDate}
            onChange={(e) =>
              setSickLeaveDate((prev) => {
                return {
                  ...prev,
                  startDate: e.target.value,
                }
              })
            }
            InputProps={{
              startAdornment: <InputAdornment position='start' />,
            }}
          />
          <TextField
            label='End Date'
            id='sick-leave-end-date'
            name='sick-leave-end-date'
            margin='dense'
            type='date'
            value={sickLeave.endDate}
            onChange={(e) =>
              setSickLeaveDate((prev) => {
                return {
                  ...prev,
                  endDate: e.target.value,
                }
              })
            }
            sx={{ flex: 1 }}
            InputProps={{
              startAdornment: <InputAdornment position='start' />,
            }}
          />
        </Box>

        <ButtonGroup sx={{ my: 1, display: 'flex', justifyContent: 'end' }}>
          <Button
            variant='outlined'
            color='primary'
            type='button'
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='success'
            type='submit'
          >
            Add
          </Button>
        </ButtonGroup>
      </form>
    </FormControl>
  )
}

export default OccupationalHealthcareEntryForm
