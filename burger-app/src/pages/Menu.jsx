import { useState } from 'react'
import BurgerCard from '../components/BurgerCard'
import './Menu.css'

const menuCategories = ["burgers", "meals", "desserts", "beverages", "sides"];
const burgerSubCategories = ["all", "beef", "veggie", "chicken"];

function Menu({ burgers, cart, onAdd, onDecrease }) {
  const [menuCategory, setMenuCategory] = useState("burgers");
  const [subCategory, setSubCategory] = useState("all");

  function handleCategoryChange(category) {
    setMenuCategory(category);
    setSubCategory("all");
  }

  const categoryItems = burgers.filter((item) => item.menuCategory === menuCategory);
  const filteredItems =
    menuCategory === "burgers" && subCategory !== "all"
      ? categoryItems.filter((item) => item.subCategory === subCategory)
      : categoryItems;

  return (
    <div className="page-content page-content--offset">
      <div className="menu-tabs">
        {menuCategories.map((cat) => (
          <button
            key={cat}
            className={menuCategory === cat ? "active" : ""}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      {menuCategory === "burgers" && (
        <div className="category-filters">
          {burgerSubCategories.map((sub) => (
            <button
              key={sub}
              className={subCategory === sub ? "active" : ""}
              onClick={() => setSubCategory(sub)}
            >
              {sub.charAt(0).toUpperCase() + sub.slice(1)}
            </button>
          ))}
        </div>
      )}
      <div className='menu-section'>
        <ul className="menu-grid">
        {filteredItems.map((item) => (
          <BurgerCard key={item.id} burger={item} cart={cart} onAdd={onAdd} onDecrease={onDecrease} />
        ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;