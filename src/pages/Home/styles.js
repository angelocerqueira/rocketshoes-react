import styled from 'styled-components';
import { darken } from 'polished';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    max-width: 400px;
    transition: transform ease-in-out 0.2s;
    &:hover {
      transform: scale(1.02);
    }
    img {
      align-self: center;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }
    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }
    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;
      display: flex;
      align-items: center;
      transition: ease-in-out 0.2s;
      &:hover {
        background: ${darken(0.3, '#7159c1')};
        transform: scale(1.02);
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
        svg {
          margin-right: 5px;
        }
      }
      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
        @media (max-width: 768px) {
          font-size: 11px;
        }
      }
    }
  }
`;