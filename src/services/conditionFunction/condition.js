export const isClosedCard = (e) => {
  return e.target.closest('.card-item')
}
export const notIsGameMode = () => {
  return !document.body.classList.contains('game-mode')
}
export const isFrontSide = (e) => {
  return !e.target.closest('.card-back')
}
