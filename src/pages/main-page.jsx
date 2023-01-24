import React, { PureComponent } from "react";
import ProductCard from "../components/main_page/product-card";
import { mainPageHeader } from "../utils/innerHtml";

class MainPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
    };
  }

  componentDidMount() {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ products: data.products });
        this.setState({ loading: false });
      });
  }

  render() {
    const { renderOverlay, currencyIdx, currencySymbol, quickAddToCart } =
      this.props;
    const { products, loading } = this.state;

    return (
      <div className="cat-main space-at-end">
        {renderOverlay && <div className="dim-overlay" />}
        <h1 className="cat-name">{mainPageHeader}</h1>

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

export default MainPage;
