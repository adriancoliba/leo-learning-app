import React, { useEffect, useState } from 'react';
import './App.css';
import ImgApple from "./images/apple.png"
import ImgOrange from "./images/orange.png"

const CartIcon = ({width, color} : any) => <svg width={width}  fill={color || "currentColor"} viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>

const products = [
  {
    name: "apple",
    namePlural: "apples",
    price: 0.60,
    color: "#ea4547",
    description: "Medium-sized and bright red apples. They have creamy white crisp, juicy flesh that is sweet and tart",
    facts: [
      "Apples can reduce blood pressure and help with weight loss as well as improve memory",
      "Eating apples can help keep your teeth healthy",
      "Apples have also been shown to help fight certain types of cancer"
    ],
  },
  {
    name: "orange",
    namePlural: "oranges",
    price: 0.25,
    color: "#F59421",
    description: "Large, round oranges with a bright orange skin. They have a thin to medium skin that peels easily",
    facts: [
      "Oranges are an excellent source of vitamin C",
      "Oranges contain flavonoids, which can help protect against heart disease",
      "Choline is a nutrient found in oranges that helps with sleep and reduces chronic inflammation"
    ]
  }
]

function App() {
  const [initialItems, setInitialItems] = useState({}) // for ex: { apples: 0, oranges: 0 }
  const [pageName, setPageName] = useState("store");
  const [color, setColor] = useState("");
  const [items, setItems] = useState<any>({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // initialize
    const obj: any = {}
    const values = products.map(a => a.namePlural)
    values.forEach(v => obj[v] = 0)
    
    setInitialItems(obj);
    setItems(obj); 
  }, [])

  const addItem = (type: string, price: number, color: string) => {
    setItems({...items, [type]: items[type] + 1});
    setTotal((total * 100 + price * 100) / 100);
    setColor(color);
  }

  const clearItems = () => {
    setItems(initialItems);
    setTotal(0);
    setColor("");
  }

  const addZeroes = (num: number) => {
    const dec = num.toString().split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
  }

  const getImage = (name: string) => {
    switch(name) { 
      case "apple": {
        return ImgApple
      } 
      case "orange": { 
        return ImgOrange
      }
    } 
  }

  const totalNumberOfItems: any = Object.values(items).reduce((a: any, b: any) => a + b, 0)

  const Store = () => {
    return (
      <>
        <p className="header">The right price for you, whoever you are</p>
        <div className="tiles">
          {products && products?.length > 0 && products.map(product => (
            <div className="tile" key={product.name} style={{background: `white url(${getImage(product.name)}) right top/180px 180px no-repeat`}}>
              <span className="tile-name" style={{backgroundColor: product.color}}>{product.namePlural}</span>
              <p className="tile-price">{product.price >= 1 ? `£ ${addZeroes(product.price)}` : `${product.price * 100}p` }</p>
              <p className="tile-description">{product.description}.</p>
              <ul>
                {product.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
              <button className="add-to-cart" onClick={() => addItem(product.namePlural, product.price, product.color)}>
                {<CartIcon width="25"/>}
                <p>Add to Cart</p>
              </button>
            </div>
          ))}
        </div>
      </>
    )
  }

  const Checkout = () => {
    return (
      <>
        <p className="header">Checkout</p>
        <div className="checkout">
          {Object.entries(items).map((item: any) => (
            item[1] > 0 ? 
              <div className="list-items">
                <span>{item[0]}:</span>
                <span>Qty: {item[1]}</span>
              </div> 
              : <></>
          ))}
          {total > 0 && (<hr></hr>)}
          <p className="text">Total Items</p>
          <p className="number">{totalNumberOfItems}</p>
          <p className="text">Total Payment</p>
          <p className="number">£ {addZeroes(total)}</p>
          
          {total > 0 && (
            <div style={{paddingTop: "15px"}}>
              <hr></hr>
              <button>CHECKOUT</button>
              <button onClick={clearItems}>clear</button>
            </div>
          )}
        </div>
      </>
    )
  }

  return (
      <div className="main">
        <nav>
          <button onClick={() => setPageName("store")}>Store</button>
          <button onClick={() => setPageName("checkout")}>
            {<CartIcon color={color || null} width="25"/>}
            <p>Cart ({totalNumberOfItems})</p>
          </button>
        </nav>
        <div className="container">
          {pageName === "store" && items && <Store/>}
          {pageName === "checkout" && <Checkout/>}
        </div>
      </div>
  );
}

export default App;
