import { useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Typography } from '@mui/material'

import HospitalEntryForm from './HospitalEntryForm'
import { IDiagnosis, IEntryWithoutId, IType } from '../../../types'

interface Props {
  patientId: string
  diagnoses: Array<IDiagnosis>
}

const NewEntryForm = ({ patientId, diagnoses }: Props) => {
  const [type, setType] = useState(IType.Hospital)

  const handleChange = (event: SelectChangeEvent<string>) => {
    if (typeof event.target.value === 'string') {
      const value = event.target.value
      const newType = Object.values(IType).find((t) => t.toString() === value)
      if (newType) {
        setType(newType)
      }
    }
  }

  const handleAddNewEntry = async (values: IEntryWithoutId) => {
    console.log(values, patientId)
  }

  return (
    <Box sx={{ p: 2, border: '1px dashed grey', marginTop: '10px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <FormControl>
          <InputLabel id='entry-type'>Entry type</InputLabel>
          <Select
            labelId='entry-type'
            id='entry-type-select'
            value={type}
            label='Entry type'
            onChange={handleChange}
          >
            <MenuItem value={IType.Hospital}>Hospital</MenuItem>
            <MenuItem value={IType.HealthCheck}>Health Check</MenuItem>
            <MenuItem value={IType.OccupationalHealthcare}>
              Occupational Healthcare
            </MenuItem>
          </Select>
        </FormControl>
        <Typography
          variant='h5'
          sx={{ m: 1 }}
        >
          Add new entry
        </Typography>
      </Box>
      {type === IType.Hospital && (
        <HospitalEntryForm
          onSubmit={handleAddNewEntry}
          diagnoses={diagnoses}
        />
      )}
      {type === IType.HealthCheck && <div>health check</div>}
      {type === IType.OccupationalHealthcare && (
        <div>occupational healthcare</div>
      )}
    </Box>
  )
}

export default NewEntryForm
