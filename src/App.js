import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Snack from "./components/Snack";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';



const snackData = [
  { name: "Sour Patch Kids", type: "candy", size: "individual", price: 3, image: "images/sour.jpg" },
  { name: "Chips Ahoy", type: "cookies", size: "family", price: 4, image: "images/chipsahoy.jpg" },
  { name: "Flamin' Hot Cheetos", type: "chips", size: "party", price: 4.50, image: "images/cheetos.png" },
  { name: "Lay's Original", type: "chips", size: "party", price: 5, image: "images/lays.jpg" },
  { name: "Takis Fuego", type: "chips", size: "family", price: 5.75, image: "images/takis.jpg" },
  { name: "Cheez-Its", type: "chips", size: "family", price: 7, image: "images/cheezits.jpg" },
  { name: "Cool Ranch Doritos", type: "chips", size: "individual", price: 1.50, image: "images/doritos.jfif" },
  { name: "Swedish Fish ", type: "candy", size: "family", price: 6.50, image: "images/swedish.jpg" },
  { name: "Double Stuf Oreos", type: "cookies", size: "party", price: 6, image: "images/oreos.jpg" },
  { name: "Milano Cookies", type: "cookies", size: "individual", price: 2.25, image: "images/milano.jpeg" },
  { name: "Sour Gummy Worms", type: "candy", size: "party", price: 6.25, image: "images/gummyworms.jpg" },
  { name: "Hershey's Kisses", type: "candy", size: "party", price: 8, image: "images/kisses.jpg" },
]
/* Image Processing */
snackData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
function App() {
  /* total price */
  let total = 0;
  /* List of type and size filters respectively*/
  const [typeFilters, setTypeFilters] = useState([]);
  const [sizeFilters, setSizeFilters] = useState([]);
  /* State variables for type and size filters respectively*/
  const [type, setType] = useState("all");
  const [size, setSize] = useState("all");
  /* State variables for type of sort to use (ascending or descending) and shopping cart*/
  const [sortType, setSortType] = useState("none");
  const [cart, setCart] = useState({});

  const selectFilterType = (label, addOrRemove) => {
    const newFilters = addOrRemove ? [...typeFilters, label] : typeFilters.filter(item => item !== label);
    setTypeFilters(newFilters)
    console.log(newFilters)
    if (newFilters.length === 0) {
      setType("all")
    } else if (newFilters.length === 1) {
      setType(newFilters[0])
    } else {
      setType("none")
    }
    console.log(type)
  };

  const selectFilterSize = (label, addOrRemove) => {
    const newFilters = addOrRemove ? [...sizeFilters, label] : sizeFilters.filter(item => item !== label);
    setSizeFilters(newFilters)
    console.log(newFilters)
    if (newFilters.length === 0) {
      setSize("all")
    } else if (newFilters.length === 1) {
      setSize(newFilters[0])
    /* Since each snack is only of one type, if two selections are chosen, no items are shown */
    } else {
      setSize("none")
    }
  };


  const typeFilter = item => {
    if (type === "all") {
      return true
    } else if (type === item.type) {
      return true
    } else {
      return false
    }
  };

  const sizeFilter = item => {
    if (size === "all") {
      return true
    } else if (size === item.size) {
      return true
    } else {
      return false
    }
  };

  const selectSort = (a, b) => {
    if (sortType === "asc") {
      return ascCompare(a, b);
    } else if(sortType === "desc") {
      return descCompare(a, b);
    } else {
      return noCompare(a, b);
    }
  }

  const ascCompare = (a, b) => {
    return a - b;
  }

  const descCompare = (a, b) => {
    return b - a;
  }

  const noCompare = (a, b) => {
    return 0;
  }

  /* Filter and sort appropriately */
  const filteredData = snackData.filter(typeFilter).filter(sizeFilter).sort((a, b)=>selectSort(a.price, b.price));

  return (
    <div className="App">
      <h1>Snack Shop</h1>
      <div id="filters">
        <Row>
          <Col lg="2"></Col>
          <Col>
            <h2>Type Filter</h2>
            <Form>
              {
                <div key={`default-checkbox`} className="mb-5">
                  <Form.Check
                    type={'checkbox'}
                    id={`default-checkbox`}
                    label={`Candy`}
                    onClick={(event) => event.target.checked ? selectFilterType('candy', true) : selectFilterType('candy', false)}
                  />
                  <Form.Check
                    type={'checkbox'}
                    id={`default-checkbox`}
                    label={`Cookies`}
                    onClick={(event) => event.target.checked ? selectFilterType('cookies', true) : selectFilterType('cookies', false)}
                  />
                  <Form.Check
                    type={'checkbox'}
                    id={`default-checkbox`}
                    label={`Chips`}
                    onClick={(event) => event.target.checked ? selectFilterType('chips', true) : selectFilterType('chips', false)}
                  />
                </div>
              }
            </Form>
          </Col>
          <Col><h2>Size Filter</h2>
            <Form>
              {
                <div key={`default-checkbox`} className="mb-5">
                  <Form.Check
                    type={'checkbox'}
                    id={`default-checkbox`}
                    label={`Individual`}
                    onClick={(event) => event.target.checked ? selectFilterSize('individual', true) : selectFilterSize('individual', false)}
                  />
                  <Form.Check
                    type={'checkbox'}
                    id={`default-checkbox`}
                    label={`Family`}
                    onClick={(event) => event.target.checked ? selectFilterSize('family', true) : selectFilterSize('family', false)}
                  />
                  <Form.Check
                    type={'checkbox'}
                    id={`default-checkbox`}
                    label={`Party`}
                    onClick={(event) => event.target.checked ? selectFilterSize('party', true) : selectFilterSize('party', false)}
                  />
                </div>
              }
            </Form>
          </Col>
          <Col> <h2>Sort By</h2>
            <Form>
              {
                <div key={`default-radio`} className="mb-5">
                  <Form.Check
                    type={'radio'}
                    name={`default-radio`}
                    label={`Price: Low to High`}
                    onClick={(event)=>setSortType('asc')}
                  />
                  <Form.Check
                    type={'radio'}
                    name={`default-radio`}
                    label={`Price: High to Low`}
                    onClick={(event)=>setSortType('desc')}
                  />
                </div>
              }
            </Form>
          </Col>
        </Row>
      </div>

      <Container>
        <Row>
          <Col lg="3">
            <h2 id="cartTitle">Cart</h2>
            <p> {Object.values(cart).map((item) => {
              total += item.price * item.count
              return (
                <p key={item.name}>{item.count}x {item.name} (${item.price.toFixed(2)})</p>
              )
            })}</p>
            <h5 id="total">Total Cost: ${total.toFixed(2)}</h5>
          </Col>
          {filteredData.map((item) => (<Col style={{ padding: 20 }} lg="3"><Snack item={item} handler={setCart} cart={cart} /></Col>))}
        </Row>
      </Container>

    </div>
  );
}

export default App;
