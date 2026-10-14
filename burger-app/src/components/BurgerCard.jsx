import './BurgerCard.css'


function BurgerCard({burger, cart, onAdd, onDecrease}){
  const cartItem = cart.find((item) => item.id === burger.id);
  const quantity = cartItem ? cartItem.quantity : 0;


  return (
    <li className="burger-card">
      <img src={burger.image} alt={burger.name} />
      <div className="burger-card-body">
        <h3>{burger.name}</h3>
        <span className="price">${burger.price}</span>

        {quantity === 0 ? (
          <button onClick={() => onAdd(burger)}>Add to Cart</button>
        ) : (
          <div className='qty-controls'>
            <button onClick={() => onDecrease(burger.id)}>-</button>
            <span className='qty'>{quantity}</span>
            <button onClick={() => onAdd(burger)}>+</button>
          </div>
        )}
      </div>
    </li>
  )
}

export default BurgerCard;