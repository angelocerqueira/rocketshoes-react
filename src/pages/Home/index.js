import React, { useState, useEffect } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductList } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import * as cardActions from '../../store/modules/cart/actions';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel';

function Home({ amount, addToCartRequest }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }));
      setProducts(data);
    }
    loadProducts();
  }, [products]);

  function handleAddProduct(id) {
    addToCartRequest(id);
  }

  return (
    <ProductList className="">
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt="" />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdShoppingCart size={16} color="#fff" />
              <span>{amount[product.id] || 0}</span>
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {})
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(cardActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
