# Patientor Backend

For this set of exercises we will be developing a backend for an existing project called Patientor which is a simple medical record application for doctors who handle diagnoses and basic health information of their patients.

## Running the Application

```bash
# Install the necessary dependencies
$ npm install

# Start the server
$ npm run dev
```

Then the two following endpoints are accessible:

- http://localhost:3001/api/patients (GET)
- http://localhost:3001/api/patients (POST)
- http://localhost:3001/api/patients/:id (GET)
- http://localhost:3001/api/patients/:id/entries (POST)
- http://localhost:3001/api/diagnoses (GET)

Example of the required payload when creating a new patient:

```json
{
  "name": "John McClane",
  "dateOfBirth": "1986-07-09",
  "ssn": "090786-122X",
  "gender": "male",
  "occupation": "New york city cop"
}
```

Example of the required payload when creating a new entry with type HealthCheck:

```json
{
  "description": "Regular check",
  "date": "2019-05-30",
  "specialist": "MD House",
  "type": "HealthCheck",
  "healthCheckRating": 0
}
```
