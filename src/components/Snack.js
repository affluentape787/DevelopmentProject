import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Snack(props) {
    const addToCart = () => {
        let newCart = { ...props.cart, [props.item.name]: props.item.name in props.cart ? { ...props.item, count: props.cart[props.item.name].count + 1 } : { ...props.item, count: 1 } }
        props.handler(newCart)
        // console.log(newCart)
    }
    const removeFromCart = () => {
        let newCart = {...props.cart}
        if(props.item.name in props.cart) {
            newCart = {...props.cart, [props.item.name]: {...props.item, count: props.cart[props.item.name].count-1}};
            if(newCart[props.item.name].count === 0) {
                delete newCart[props.item.name];
                // console.log("true");
                // console.log(typeof newCart);
            }
        }
        props.handler(newCart)
        // console.log(newCart)
    }
    return (
        <div>
            <img src={props.item.image} alt={props.item.name}></img>
            <h3>{props.item.name}</h3>
            <p>Category: {props.item.type}</p>
            <p>Size: {props.item.size}</p>
            <p>Price: ${props.item.price.toFixed(2)}</p>
            <Row>
                <Col><Button variant="dark" onClick={addToCart}>Add to Cart</Button> </Col>
                </Row>
            <Row>
                <Col> <Button variant="outline-danger" onClick={removeFromCart}>Remove from Cart</Button> </Col>
            </Row>
        </div>
    );
}