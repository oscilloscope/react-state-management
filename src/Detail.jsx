import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './services/useFetch';
import PageNotFound from './PageNotFound';

export default function Detail(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(`products/${id}`);
  const [sku, setSku] = useState('');

  if (loading) return 'Loading';
  if (!product) return <PageNotFound />;
  if (error) return 'Error occured. Something is definitely wrong here...';

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
        <option value="">What size?</option>
        {product.skus.map((s) => (
          <option key={s.id} value={s.sku}>
            {s.size}
          </option>
        ))}
      </select>
      <p>
        <button
          disabled={!sku}
          className="btn btn-primary"
          onClick={() => {
            props.addToCart(id, sku);
            navigate('/cart');
          }}
        >
          Add to Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
  //return <h2>Detail</h2>;
}
