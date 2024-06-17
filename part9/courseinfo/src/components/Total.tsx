interface TotalProps {
  total: number
}

const Total = ({ total }: TotalProps) => {
  return <p>Number of exercises {total}</p>
}

export default Total
