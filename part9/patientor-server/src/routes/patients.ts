import express from 'express'

import patientService from '../services/patientService'
import { toNewEntry, toNewPatient } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries())
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body)
    const addedEntry = patientService.addPatient(newPatientEntry)
    res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }

    res.status(400).send(errorMessage)
  }
})

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id)

  if (patient) {
    res.send(patient)
  } else {
    res.status(404).end('Patient not found.')
  }
})

router.post('/:id/entries', (req, res) => {
  const patientId = req.params.id

  try {
    const newEntry = toNewEntry(req.body)
    const addedEntry = patientService.addEntry(patientId, newEntry)
    res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }

    res.status(400).send(errorMessage)
  }
})

export default router
