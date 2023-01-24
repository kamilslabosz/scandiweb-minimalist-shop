import { PureComponent } from "react";
import { withRouter } from "../utils/hoc";
import ProductCard from "../components/main_page/product-card";

class CategoryPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      loading: true,
      category: ""
    };
  }

  componentDidMount() {
    this.setState({category: this.props.currCategory})
    fetch(`https://dummyjson.com/products/category/${this.props.params.name}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ products: data.products });
        this.setState({ loading: false });
      });
  }

  render() {
    const {
      renderOverlay,
      params,
      currencyIdx,
      currencySymbol,
      quickAddToCart,
    } = this.props;
    const { products, loading } = this.state;

    return (
      <div className="cat-main space-at-end">
        {renderOverlay && <div className="dim-overlay" />}
        <h1 className="cat-name">{params.name.replace("-"," ")}</h1>

        {loading ? (
          <h1>loading</h1>
        ) : (
          products.map((product) => (
            <ProductCard
              currencyIdx={currencyIdx}
              currencySymbol={currencySymbol}
              product={product}
              key={product.id}
              quickAddToCart={quickAddToCart}
            />
          ))
        )}
      </div>
    );
  }
}

export default withRouter(CategoryPage);
