import { FormEvent, useState } from 'react'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { IDiagnosis, IEntryWithoutId } from '../../types'

interface Props {
  onSubmit: (values: IEntryWithoutId) => void
  diagnoses: Array<IDiagnosis>
}

const EntryFormHospital = ({ onSubmit, diagnoses }: Props) => {
  const [codes, setCodes] = useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof codes>) => {
    const {
      target: { value },
    } = event

    setCodes(typeof value === 'string' ? value.split(',') : value)
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Box
      component='form'
      sx={{ p: 2, border: '1px dashed grey', marginTop: '10px' }}
      onSubmit={onSubmitHandler}
    >
      <Typography
        variant='h5'
        sx={{ m: 1 }}
      >
        Add new entry
      </Typography>
      <Box>
        <TextField
          label='Description'
          id='description'
          sx={{ m: 1 }}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position='start' />,
          }}
        />
      </Box>
      <Box>
        <TextField
          id='date'
          fullWidth
          sx={{ m: 1 }}
          type='date'
          label='Date'
          InputProps={{
            startAdornment: <InputAdornment position='start' />,
          }}
        />
      </Box>
      <Box>
        <TextField
          label='Specialist'
          id='specialist'
          sx={{ m: 1 }}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position='start' />,
          }}
        />
      </Box>
      <FormControl fullWidth>
        <InputLabel id='diagnosis'>Diagnosis codes</InputLabel>
        <Select
          labelId='diagnosis'
          id='diagnosis-info'
          multiple
          value={codes}
          onChange={handleChange}
          sx={{ m: 1 }}
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
      <Box>
        <Typography sx={{ m: 1 }}>Discharge: </Typography>
        <TextField
          label='Date'
          id='discharge-date'
          sx={{ m: 1 }}
          type='date'
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position='start' />,
          }}
        />
        <TextField
          label='Criteria'
          id='criteria'
          sx={{ m: 1 }}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position='start' />,
          }}
        />
      </Box>
    </Box>
  )
}

export default EntryFormHospital
