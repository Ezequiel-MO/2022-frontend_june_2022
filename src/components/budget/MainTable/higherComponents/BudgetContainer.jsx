import { forwardRef } from 'react'
import styles from '../styles.module.css'

export const BudgetContainer = forwardRef(({ children }, ref) => (
  <div
    className={`${styles.tableResponsive} ${styles.tableOnTop} relative bg-white-100 mb-10`}
    id='budget_id'
    ref={ref}
  >
    {children}
  </div>
))
