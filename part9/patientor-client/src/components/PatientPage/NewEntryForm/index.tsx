import { useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Button } from '@mui/material'

import entryService from '../../../services/entries'

import HospitalEntryForm from './HospitalEntryForm'
import { IDiagnosis, IEntryWithoutId, IPatient, IType } from '../../../types'

interface Props {
  patientId: string
  diagnoses: Array<IDiagnosis>
  addEntryToPatient: React.Dispatch<React.SetStateAction<IPatient | null>>
}

const NewEntryForm = ({ patientId, diagnoses, addEntryToPatient }: Props) => {
  const [showForm, setShowForm] = useState(false)
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
    const addedEntry = await entryService.create(patientId, values)
    addEntryToPatient((prev) => {
      if (!prev) return null

      return {
        ...prev,
        entries: prev.entries ? prev.entries.concat(addedEntry) : [addedEntry],
      }
    })
  }

  return (
    <div>
      <Button
        onClick={() => setShowForm(true)}
        variant='contained'
        color='secondary'
        sx={{ my: 1 }}
      >
        Add new entry
      </Button>
      {showForm && (
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
          </Box>
          {type === IType.Hospital && (
            <HospitalEntryForm
              onSubmit={handleAddNewEntry}
              diagnoses={diagnoses}
              onCancel={() => setShowForm(false)}
            />
          )}
          {type === IType.HealthCheck && <div>health check</div>}
          {type === IType.OccupationalHealthcare && (
            <div>occupational healthcare</div>
          )}
        </Box>
      )}
    </div>
  )
}

export default NewEntryForm
