import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Products</h1>
      {loading ? <p>Loading...</p> : products.map((p) => <p key={p.id}>{p.name} - ${p.price}</p>)}
    </div>
  );
};

export default Products;
