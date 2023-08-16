import { Fragment, useEffect } from 'react'
import { TableCell } from '@mui/material'
import accounting from 'accounting'
import { useBudget } from '../../../../hooks'
import { ITransfer } from '../../../../interfaces'

const serviceKeyMapping: { [key: string]: string } = {
  '4H at disposal': 'dispo_4h',
  Overtime: 'hextra',
  'Night Overtime': 'hextra_night',
  '5 Hours at Disposal Out of Town': 'dispo_5h_out',
  '4 Hours at Disposal Departing/Starting at Airport': 'dispo_4h_airport',
  '4 Night Hours at Disposal Departing/Starting at Airport':
    'dispo_4h_airport_night',
  '6 Night Hours at Disposal': 'dispo_6h_night'
}

interface Props {
  date: string
  pax: number
  description: string
  options: ITransfer[]
  id:
    | 'transfer_morningEvents'
    | 'transfer_afternoonEvents'
    | 'transfer_lunch'
    | 'transfer_dinner'
}

export const TransferCells = ({
  date,
  pax,
  description,
  options,
  id
}: Props) => {
  const { updateTransfers } = useBudget()

  useEffect(() => {
    console.log(options)
    updateTransfers(options)
  }, [id])

  const groupByCompanyAndCapacity = (options: ITransfer[]) => {
    return options.reduce((acc, option) => {
      const key = `${option.company}_${option.vehicleCapacity}`
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(option)
      return acc
    }, {} as { [key: string]: ITransfer[] })
  }

  const groupedOptions = groupByCompanyAndCapacity(options)

  const showDescription = () => {
    const selectedServiceDescription = options[0]?.selectedService
    if (selectedServiceDescription === 'dispo_4h') return '4 Hours at Disposal'
    if (selectedServiceDescription === 'hextra') return 'Overtime'
    if (selectedServiceDescription === 'hextra_night') return 'Night Overtime'
    if (selectedServiceDescription === 'dispo_5h_out')
      return '5 Hours at Disposal Out of Town'
    if (selectedServiceDescription === 'dispo_4h_airport')
      return '4 Hours at Disposal Departing/Starting at Airport'
    if (selectedServiceDescription === 'dispo_4h_airport_night')
      return '4 Night Hours at Disposal Departing/Starting at Airport'
    if (selectedServiceDescription === 'dispo_6h_night')
      return '6 Night Hours at Disposal'
    return description
  }

  return (
    <>
      {Object.entries(groupedOptions).map(([key, group]) => {
        const vehicleCapacity = group[0].vehicleCapacity
        const count = group.length

        return (
          <Fragment key={key}>
            <TableCell>{date}</TableCell>
            <TableCell>{`${vehicleCapacity} seater Bus`}</TableCell>
            <TableCell>{pax}</TableCell>
            <TableCell>
              {accounting.formatMoney(
                group[0][
                  serviceKeyMapping[group[0].selectedService] as keyof ITransfer
                ],
                '€'
              )}
            </TableCell>
            <TableCell>
              {accounting.formatMoney(
                (group[0][
                  serviceKeyMapping[group[0].selectedService] as keyof ITransfer
                ] as number) * count,
                '€'
              )}
            </TableCell>
          </Fragment>
        )
      })}
    </>
  )
}
