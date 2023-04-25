import { forwardRef } from 'react'
import styles from '../styles.module.css'

export const BudgetContainer = forwardRef(({ children }, ref) => (
  <div
    className={`${styles.tableResponsive} ${styles.tableOnTop} relative dark:bg-white-50 mb-10 table-wrapper`}
    id='budget_id'
    ref={ref}
  >
    {children}
  </div>
))
