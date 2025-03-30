import classes from "./cartPage.module.scss";
import { useState } from "react";

const CartItem = ({ item, index, handleCartItems }) => {
  return (
    <div key={index} className={classes.cartImageWrapper}>
      <img src={item.images[0]} alt="" />
      <div>
        <button onClick={() => handleCartItems(item)}>+</button>
        <br></br>

        <br></br>
        <button>-</button>
      </div>
      <p>{item.amount}</p>
      <div>
        <li>{item.title}</li>
        <li>{item.price}</li>
      </div>
    </div>
  );
};

const CartItems = ({ data, handleCartItems }) => {
  const itemsArray = [];

  data.forEach((item) => {
    const indexOfItem = itemsArray.findIndex(
      (itemToMatch) => itemToMatch.id === item.id
    );

    if (indexOfItem === -1) {
      itemsArray.push({ ...item, amount: 1 });
    } else {
      itemsArray[indexOfItem].amount += 1;
    }
  });

  return (
    <div className={classes.cartPageImagesWrapper}>
      {itemsArray.map((item, index) => (
        <CartItem item={item} index={index} handleCartItems={handleCartItems} />
      ))}
    </div>
  );
};

const CartPage = ({ cartData }) => {
  const [cartItems, setCartItems] = useState(cartData);
  let cartTotalCost = 0;

  const handleCartItems = (newItem) => {
    setCartItems((prevItems) => [...prevItems, newItem]);
  };

  cartItems.map((item) => {
    cartTotalCost = item.price + cartTotalCost;
  });

  return (
    <div className={classes.cartPage}>
      <h1>Hello, this is the cart</h1>
      <CartItems data={cartItems} handleCartItems={handleCartItems} />
      <p>{Math.round(cartTotalCost)}</p>
    </div>
  );
};

export default CartPage;
