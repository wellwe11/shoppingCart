import classes from "./cartPage.module.scss";
import { useState, useEffect } from "react";

const CartItem = ({
  item,
  index,
  handleCartItemsPlus,
  handleCartItemsMinus,
  handleDeleteItem,
}) => {
  return (
    <div key={index} className={classes.cartImageWrapper}>
      <img src={item.images[0]} alt="" />
      <div>
        <button onClick={handleCartItemsPlus}>+</button>
        <br></br>

        <br></br>
        <button onClick={handleCartItemsMinus}>-</button>
      </div>
      <p>{item.amount}</p>
      <div>
        <li>{item.title}</li>
        <li>{item.price}</li>
      </div>
      <button onClick={handleDeleteItem}>Delete all</button>
    </div>
  );
};

const CartItems = ({ data }) => {
  const [arrayDone, setArrayDone] = useState(false);
  const [itemsArray, setItemsArray] = useState(null);
  const [updateComp, setUpdateComp] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
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

    setArrayDone(true);
    setItemsArray(itemsArray);
  }, []);

  useEffect(() => {
    if (arrayDone) {
      const amount = itemsArray.map((item) => item.price * item.amount);
      const reducedAmount = amount.reduce((acc, currVal) => acc + currVal, 0);
      setTotalCost(Number(reducedAmount));
    }
  }, [arrayDone, updateComp]);

  useEffect(() => {
    if (arrayDone) {
      itemsArray.map((item) => {
        item.amount < 1 ? handleDeleteItem(item) : "";
      });
    }
  }, [updateComp]);

  const handleCartItemsPlus = (item) => {
    setUpdateComp((prevItem) => prevItem + 1);
    item.amount += 1;
  };

  const handleCartItemsMinus = (item) => {
    setUpdateComp((prevItem) => prevItem + 1);
    item.amount -= 1;
  };

  const handleDeleteItem = (item) => {
    setUpdateComp((prevItem) => prevItem + 1);
    const indexOfItem = itemsArray.findIndex(
      (itemToMatch) => itemToMatch.id === item.id
    );

    itemsArray.splice(indexOfItem, 1);
  };

  return (
    <div className={classes.cartPageImagesWrapper}>
      {arrayDone
        ? itemsArray.map((item, index) => (
            <CartItem
              item={item}
              index={index}
              handleCartItemsPlus={() => handleCartItemsPlus(item)}
              handleCartItemsMinus={() => handleCartItemsMinus(item)}
              handleDeleteItem={() => handleDeleteItem(item)}
            />
          ))
        : ""}
      <p>{Math.round(totalCost)}</p>
    </div>
  );
};

const CartPage = ({ cartData }) => {
  const [cartItems, setCartItems] = useState(cartData);

  return (
    <div className={classes.cartPage}>
      <h1>Hello, this is the cart</h1>
      <CartItems data={cartItems} />
    </div>
  );
};

export default CartPage;
