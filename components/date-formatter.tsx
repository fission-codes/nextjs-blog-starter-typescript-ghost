import { parseISO, format } from 'date-fns'

type Props = {
  dateString: string
}

const DateFormatter = ({ dateString }: Props) => {
  console.log({ dateString })
  dateString = dateString || '2020-03-16T05:35:07.322Z'

  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}

export default DateFormatter
