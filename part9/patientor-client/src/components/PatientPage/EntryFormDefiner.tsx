import { useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { IDiagnosis, IType } from '../../types'
import TypeForm from './TypeForm'

interface Props {
  patientId: string
  diagnoses: Array<IDiagnosis>
}

const EntryFormDefiner = ({ patientId, diagnoses }: Props) => {
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

  return (
    <div>
      <Box sx={{ minWidth: 120, marginTop: '20px' }}>
        <FormControl fullWidth>
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
      </Box>
      <TypeForm
        type={type}
        patientId={patientId}
        diagnoses={diagnoses}
      />
    </div>
  )
}

export default EntryFormDefiner
