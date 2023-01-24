import { PureComponent } from "react";
import { withRouter } from "../utils/hoc";
import ProductInfo from "../components/product-page/product-info";
import { outOfStockInner } from "../utils/innerHtml";

class ProductPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newItem: {},
      currImg: 0,
      product: [],
      loading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setNewItem = this.setNewItem.bind(this);
  }

  setNewItem(product) {
    this.setState({ newItem: { ...product } });
  }

  handleChange(e, index) {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      newItem: {
        ...prevState.newItem,
        [name]: value,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const toCart = { ...this.state.newItem };
    this.props.addToCart(toCart);
  }

  componentDidMount() {
    fetch(`https://dummyjson.com/products/${this.props.params.id}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ product: data });
        this.setState({ loading: false });
      });
  }

  render() {
    const { renderOverlay } = this.props;
    const { currImg, loading, product } = this.state;

    return (
      <div>
        {renderOverlay && <div className="dim-overlay" />}
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <div className="product-page">
            <div className="product-gallery">
              {product.images.map((image, index) => (
                <img
                  src={image}
                  alt={product.title}
                  key={image}
                  className="img-small"
                  onClick={() => this.setState({ currImg: index })}
                />
              ))}
            </div>
            <div className="flex">
              <img
                src={product.images[currImg]}
                alt={product.title}
                className={
                  product.stock > 0
                    ? "product-current-img"
                    : "product-current-img img-grayed"
                }
              />
              {product.stock > 0 ? null : (
                <h1 className="out-of-stock">{outOfStockInner}</h1>
              )}
            </div>
            <ProductInfo
              currencyIdx={this.props.currencyIdx}
              currencySymbol={this.props.currencySymbol}
              product={product}
              newItem={this.state.newItem}
              index={0}
              onMount={this.setNewItem}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              productPage={true}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ProductPage);
