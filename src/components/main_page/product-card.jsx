import React, { PureComponent } from "react";
import emptyCart from "../../images/svg/emptyCart.svg";
import { addToCartAlt } from "../../utils/alts";
import { withRouter } from "../../utils/hoc";
import { outOfStockInner } from "../../utils/innerHtml";
import { productBaseRoute } from "../../utils/routes";

class ProductCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      renderAnimation: false,
    };
    this.addToCart = this.addToCart.bind(this);
  }

  toProductPage = () =>
    this.props.navigate(productBaseRoute + this.props.product.id);

  addToCart(product) {
    this.setState({ renderAnimation: true });
    this.props.quickAddToCart(product);
    setTimeout(() => this.setState({ renderAnimation: false }), 100);
  }

  render() {
    const { product, currencySymbol } = this.props;
    const { id, title, images, stock, price, brand } = this.props.product;
    const { renderAnimation } = this.state;

    return (
      <a
        className="product-card"
        href={productBaseRoute + id}
        onClick={(e) => e.preventDefault()}
      >
        <div
          className={renderAnimation ? "img-box img-grayed" : "img-box"}
          onClick={this.toProductPage}
        >
          <img
            src={images[0]}
            alt={title}
            className={stock > 0 ? "product-img" : "product-img img-grayed"}
          />
          {stock > 0 ? null : (
            <h1 className="out-of-stock">{outOfStockInner}</h1>
          )}
        </div>
        <div
          className={stock > 0 ? "cart-btn green-bg" : "cart-btn grayed-bg"}
          onClick={
            stock > 0
              ? () => {
                  this.addToCart(product);
                }
              : null
          }
        >
          <img src={emptyCart} alt={addToCartAlt} className="add-to-cart" />
        </div>
        <h1
          onClick={this.toProductPage}
          className={stock > 0 ? "product-name" : "product-name grayed"}
        >
          {brand} {title}
        </h1>
        <p
          onClick={this.toProductPage}
          className={stock > 0 ? "product-price" : "product-price grayed"}
        >
          {currencySymbol}
          {price.toFixed(2)}
        </p>
      </a>
    );
  }
}

export default withRouter(ProductCard);
