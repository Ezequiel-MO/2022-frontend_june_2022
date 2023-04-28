export const TabContent = ({ children, activeTab, index }) => {
  const isActive = activeTab === index + 1

  return (
    <div className={isActive ? 'block' : 'hidden'} id={`tab${index + 1}`}>
      {children}
    </div>
  )
}
