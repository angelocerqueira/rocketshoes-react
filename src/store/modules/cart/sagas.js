import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { css } from 'glamor';
import { formatPrice } from '../../../util/format';
import api from '../../../services/api';

import { addToCartSuccess, updateAmountSuccess } from './actions';
import history from '../../../services/history';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;
  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast('Produto fora de estoque', {
      className: css({
        background: '#7159c1',
        borderRadius: '4px'
      }),
      bodyClassName: css({
        fontSize: '15px',
        color: '#fff'
      }),
      progressClassName: css({
        background: 'gradient(circle at center, red 0, blue, green 30px)'
      })
    });
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price)
    };

    yield put(addToCartSuccess(data));
    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast('Quantidade solicitada fora de estoque', {
      className: css({
        background: '#7159c1',
        borderRadius: '4px'
      }),
      bodyClassName: css({
        fontSize: '15px',
        color: '#fff'
      }),
      progressClassName: css({
        background: 'gradient(circle at center, red 0, blue, green 30px)'
      })
    });
    return;
  }
  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount)
]);
