import { PureComponent } from "react";
import { withRouter } from "../../utils/hoc";
import {
  addToCartInner,
  outOfStockInner,
  priceInner,
} from "../../utils/innerHtml";
import { productBaseRoute } from "../../utils/routes";

class ProductInfo extends PureComponent {
  toProductPage = () =>
    this.props.navigate(productBaseRoute + this.props.product.id);

  componentDidMount() {
    if (this.props.productPage) {
      this.props.onMount(this.props.product);
    }
  }

  render() {
    const { title, stock, brand, price, description } = this.props.product;
    const { currencySymbol, productPage, handleSubmit } = this.props;

    return (
      <div className="product-info">
        <h1 className="brand-name">{brand}</h1>
        <p
          className="product-page-name"
          onClick={productPage ? null : this.toProductPage}
        >
          {title}
        </p>
        {productPage === false && (
          <h1 className="product-page-price product-cart-price">
            {currencySymbol}
            {price.toFixed(2)}
          </h1>
        )}
        <form>
          {productPage && <p className="product-price-tag">{priceInner}</p>}
          {productPage && (
            <h1 className="product-page-price">
              {currencySymbol}
              {price.toFixed(2)}
            </h1>
          )}
          {productPage &&
            (stock > 0 ? (
              <button type="submit" onClick={handleSubmit}>
                {addToCartInner}
              </button>
            ) : (
              <button className="grayed-bg" disabled>
                {outOfStockInner}
              </button>
            ))}
        </form>
        {productPage && <p>{description}</p>}
      </div>
    );
  }
}

export default withRouter(ProductInfo);
