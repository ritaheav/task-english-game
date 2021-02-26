export const renderCategory = (card) => {
  const cardItem = document.createElement('div');
  cardItem.className = 'card card-category';
  cardItem.setAttribute('data-category', card.id);
  const cardImage = document.createElement('div');
  cardImage.className = 'card-image';
  const img = document.createElement('img');
  img.src = card.image;
  const cardDesc = document.createElement('div');
  cardDesc.className = 'card-desc';
  const cardText = document.createElement('div');
  cardText.className = 'card-text';
  cardText.innerHTML = card.name;
  cardItem.append(cardImage);
  cardImage.append(img);
  cardItem.append(cardDesc);
  cardDesc.append(cardText);

  return cardItem;
}
