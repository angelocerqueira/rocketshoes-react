import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.svg';
import { Container, Cart } from './styles';

function Header({ cardSize }) {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="RocketShoes" />
      </Link>
      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cardSize} itens</span>
        </div>
        <MdShoppingBasket size={40} color="#fff" />
      </Cart>
    </Container>
  );
}
export default connect(state => ({
  cardSize: state.cart.length
}))(Header);
