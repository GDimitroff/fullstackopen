export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2)

  switch (true) {
    case bmi < 15:
      return 'Very severely underweight'
    case bmi >= 15 && bmi < 16:
      return 'Severely underweight'
    case bmi >= 16 && bmi < 18.5:
      return 'Underweight'
    case bmi >= 18.5 && bmi < 25:
      return 'Normal (healthy weight)'
    case bmi >= 25 && bmi < 30:
      return 'Overweight'
    case bmi >= 30 && bmi < 35:
      return 'Obese Class I (Moderately obese)'
    case bmi >= 35 && bmi < 40:
      return 'Obese Class II (Severely obese)'
    default:
      return 'Obese Class III (Very severely obese)'
  }
}
