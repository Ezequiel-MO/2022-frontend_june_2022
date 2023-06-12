export const saveToLocalStorage = (data) => {
  localStorage.setItem('schedule', JSON.stringify(data.schedule))
  localStorage.setItem('hotels', JSON.stringify(data.hotels))
  localStorage.setItem('currentProject', JSON.stringify(data))
  localStorage.setItem('userIsLogged', 'true')
}
