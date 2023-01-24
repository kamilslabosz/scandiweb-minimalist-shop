import { PureComponent } from "react";
import Actions from "./actions";
import { withRouter } from "../../utils/hoc";
import { categoryBaseRoute, homeRoute } from "../../utils/routes";
import { Link } from "react-router-dom";
class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { loading: true, categories: [] };
    this.goToCat = this.goToCat.bind(this);
    this.firstVisitCheck = this.firstVisitCheck.bind(this);
    this.onPop = this.onPop.bind(this);
  }
  goToCat(e, category) {
    this.props.changeCategory(category);
  }
  onPop() {
    const path = window.location.pathname;
    console.log(path);
    if (path === homeRoute) {
      this.props.changeCategory("All");
    } else {
      const popCat = path.split("/");
      const catRoute = categoryBaseRoute.split("/");
      if (popCat[popCat.length - 2] === catRoute[catRoute.length - 2]) {
        this.props.changeCategory(popCat[popCat.length - 1]);
      }
    }
  }
  firstVisitCheck(data) {
    if (this.props.currencyIdx === null) {
      this.props.changeCurrency("0", data.currencies[0].symbol);
    }
  }
  componentDidMount() {
    window.addEventListener("popstate", this.onPop);
    this.onPop();
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ categories: data.slice(0, 6) });
        this.setState({ loading: false });
      });
  }
  render() {
    const { categories, loading } = this.state;
    const { currCategory } = this.props;
    const path = window.location.pathname;
    return (
      <div className="header">
        {" "}
        <div className="navigation">
          {" "}
          <nav>
            {" "}
            {loading ? (
              <h1>Loading</h1>
            ) : (
              <>
                <Link
                  to={homeRoute}
                  className={
                    path === homeRoute ? "category chosen-cat-div" : "category"
                  }
                  reloadDocument={true}
                >
                  <h1
                    className={
                      path === homeRoute
                        ? "cat-label chosen-cat-label"
                        : "cat-label"
                    }
                  >
                    {" "}
                    All
                  </h1>{" "}
                </Link>
                {categories.map((name) => (
                  <Link
                    className={
                      name === currCategory
                        ? "category chosen-cat-div"
                        : "category"
                    }
                    key={name}
                    to={categoryBaseRoute + name}
                    reloadDocument={true}
                  >
                    {" "}
                    <h1
                      className={
                        name === currCategory
                          ? "cat-label chosen-cat-label"
                          : "cat-label"
                      }
                    >
                      {" "}
                      {name.replace("-", " ")}{" "}
                    </h1>{" "}
                  </Link>
                ))}
              </>
            )}{" "}
          </nav>{" "}
        </div>{" "}
        <Actions
          changeRenderOverlay={this.props.changeRenderOverlay}
          cart={this.props.cart}
          itemsInCart={this.props.itemsInCart}
          changeCurrency={this.props.changeCurrency}
          currencyIdx={this.props.currencyIdx}
          currencySymbol={this.props.currencySymbol}
          updateCart={this.props.updateCart}
          changeQty={this.props.changeQty}
        />{" "}
      </div>
    );
  }
}
export default withRouter(Header);
