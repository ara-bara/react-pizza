import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Header from "./components/Header";
import Items from "./components/Items";
import Slider from "./components/Slider";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      cartOpen: false,
      items: [
        {
          id: 1,
          title: "Каріна",
          ingredients: "вершки, сир, шинка, курка, печериці, кукурудза",
          img: "karina.webp",
          picture: "picture.svg",
          weight: "600 грам - ",
          price: "265",
        },
        {
          id: 2,
          title: "Гавайська",
          ingredients: "курка, вершки, ананас, сир",
          img: "gavai.webp",
          picture: "picture.svg",
          weight: "560 грам - ",
          price: "263",
        },
        {
          id: 3,
          title: "Бланкос",
          ingredients:
            "орегано, томатний соус, сир, салямі, шинка, зелень, вершки після печі",
          img: "blankos.webp",
          picture: "picture.svg",
          weight: "600 грам - ",
          price: "267",
        },
        {
          id: 4,
          title: "П'ять сирів",
          ingredients: "вершки, моцарела, дорблю, пармезан, чеддер, фета",
          img: "5cheese.webp",
          picture: "picture.svg",
          weight: "575 грам - ",
          price: "266",
        },
        {
          id: 5,
          title: "Войт",
          ingredients:
            " вершки, сир, салямі, шинка, курка, кукурудза, помідори чері",
          img: "voit.webp",
          picture: "picture.svg",
          weight: "710 грам - ",
          price: "276",
        },
        {
          id: 6,
          title: "Маргарита",
          ingredients: " орегано, томатний соус, сир",
          img: "margarita.webp",
          picture: "picture.svg",
          weight: "440 грам - ",
          price: "240",
        },
        {
          id: 7,
          title: "Курка BBQ",
          ingredients:
            "орегано, томатний соус, сир, печериці, курка, перець, соус барбекю",
          img: "chickenBBQ.webp",
          picture: "picture.svg",
          weight: "600 грам - ",
          price: "264",
        },
        {
          id: 8,
          title: "Салмон",
          ingredients:
            "вершково-шпинатний соус, сир, лосось, маслини, крем-сир, рукола",
          img: "salmon.webp",
          picture: "picture.svg",
          weight: "650 грам - ",
          price: "347",
        },
        {
          id: 9,
          title: "Опера",
          ingredients:
            "орегано, томатний соус, сир, тунець, цибуля, помідори чері, рукола",
          img: "opera.webp",
          picture: "picture.svg",
          weight: "590 грам - ",
          price: "290",
        },
        {
          id: 10,
          title: "Везувіо",
          ingredients: "орегано, томатний соус, сир, шинка",
          img: "vesuvio.webp",
          picture: "picture.svg",
          weight: "500 грам - ",
          price: "244",
        },
        {
          id: 11,
          title: "Броколі",
          ingredients: "орегано, томатний соус, сир, салямі, броколі",
          img: "brokoly.webp",
          picture: "picture.svg",
          weight: "630 грам - ",
          price: "263",
        },
        {
          id: 12,
          title: "Створи свою піцу",
          ingredients: "вибирай начинку сам",
          img: "konstruktor.webp",
          picture: "konstruktor.webp",
          weight: "від 315 грам - ",
          price: "150",
        },
      ],
    };
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.checkout = this.checkout.bind(this);
    this.openCart = this.openCart.bind(this);
    this.closeCart = this.closeCart.bind(this);
  }

  addToOrder(item) {
    let isInArray = false;
    this.state.orders.forEach((el) => {
      if (el.id === item.id) isInArray = true;
    });
    if (!isInArray)
      this.setState({
        orders: [...this.state.orders, { ...item, quantity: 1 }],
      });
  }

  deleteOrder(id) {
    this.setState({ orders: this.state.orders.filter((el) => el.id !== id) });
  }

  updateQuantity(id, delta) {
    this.setState({
      orders: this.state.orders.map((el) =>
        el.id === id
          ? { ...el, quantity: Math.max(1, el.quantity + delta) }
          : el
      ),
    });
  }

  checkout() {
    const { orders } = this.state;
    console.log("Замовлення:", orders);
    const total = orders.reduce((sum, el) => sum + el.price * el.quantity, 0);
    const discount = total >= 1000 ? total * 0.1 : 0;
    const finalTotal = total - discount;
    console.log("Загальна сума:", finalTotal.toFixed(2), "грн");
    this.setState({ orders: [] });
  }

  openCart() {
    this.setState({ cartOpen: true });
  }

  closeCart() {
    this.setState({ cartOpen: false });
  }

  render() {
    const total = this.state.orders.reduce(
      (sum, el) => sum + el.price * el.quantity,
      0
    );
    const discount = total >= 1000 ? 0.1 : 0;
    const finalTotal = total * (1 - discount);

    const totalItems = this.state.orders.reduce(
      (sum, el) => sum + el.quantity,
      0
    );

    return (
      <div className="wrapper">
        <Header
          orders={this.state.orders}
          onDelete={this.deleteOrder}
          onUpdateQuantity={this.updateQuantity}
          totalItems={totalItems}
          totalPrice={finalTotal}
          onCheckout={this.checkout}
          onOpenCart={this.openCart}
          cartOpen={this.state.cartOpen}
          onCloseCart={this.closeCart}
        />
        <div className={this.state.cartOpen ? "blur" : ""}>
          <Slider />
          <Items
            items={this.state.items}
            onAdd={this.addToOrder}
            orders={this.state.orders}
            onOpenCart={this.openCart}
            discount={discount}
          />
        </div>
      </div>
    );
  }
}

export default App;
