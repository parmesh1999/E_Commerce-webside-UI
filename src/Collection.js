import React from 'react';
import { Link } from 'react-router-dom';

// A small, self-contained component for the Product Card
function ProductCard({ product }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="col">
      <div className="card h-100 border-0 product-card">
        <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
          <div className="product-image-container">
            <img src={product.image} className="card-img-top" alt={product.name} />
          </div>
          <div className="card-body p-2">
            <h6 className="card-title product-title">{product.name}</h6>
            <div className="d-flex align-items-center mb-1">
              <span className="badge bg-success me-2 d-flex align-items-center">
                {product.rating} <i className="bi bi-star-fill" style={{ fontSize: '0.6em', marginLeft: '3px' }}></i>
              </span>
              <span className="text-muted product-reviews">({product.reviews.toLocaleString('en-IN')})</span>
              {product.assured && (
                <img 
                  src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" 
                  alt="Assured" 
                  className="product-assured-logo ms-2"
                />
              )}
            </div>
            <div className="d-flex align-items-baseline">
              <h5 className="product-price mb-0">
                {product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 })}
              </h5>
              <span className="text-muted text-decoration-line-through mx-2">
                {product.originalPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 })}
              </span>
              <span className="text-success fw-bold">{discount}% off</span>
            </div>
            <p className="text-muted small mb-0">Free delivery</p>
          </div>
        </Link>
      </div>
    </div>
  );
}


function Collection() {
  const styles = `
    /* Set the background color for the entire page */
    body { background-color: #f1f3f6; }
    
    /* New class for the 100vh container */
    .full-height-container {
      min-height: 100vh;
      
      align-items: center; /* Vertically center */
      justify-content: center; /* Horizontally center */
      
    }

    /* Existing styles for the product card */
    .product-card { transition: box-shadow 0.2s ease-in-out; }
    .product-card:hover { box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    .product-title {
      font-size: 0.9rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .product-image-container {
      height: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    .product-image-container img { max-height: 100%; max-width: 50%; }
    .product-reviews { font-size: 0.8rem; }
    // .product-assured-logo { width: 70px; }
    .product-price { font-size: 1.1rem; }
  `;

  return (
    <>
      <style>{styles}</style>
      {/* Apply the new class to this main container */}
      <div className="full-height-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="mb-3 text-center">All Collection</h5>
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3">
                    {mockProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// You can uncomment mockProducts and export it from another file if you wish.
// For now, it's defined inside the Collection component for simplicity.
const mockProducts = [
  { id: 1, name: 'APPLE iPhone 14 (Blue, 128 GB)', image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg', rating: 4.6, reviews: 147589, price: 58999, originalPrice: 69900, },
  { id: 2, name: 'SAMSUNG Galaxy S25 5G (Phantom White, 128 GB)', image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/m/o/b/-original-imaghx9qkugtbfrn.jpeg', rating: 4.5, reviews: 12450, price: 39999, originalPrice: 85999, },
  { id: 3, name: 'POCO M6 Pro 5G (Forest Green, 128 GB)', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTiYKcTA6t2A3RoJop9dvn-xPhGri3gM8Y8E18uOwvFl8D0Uc7CjYe1hQxbQmBndLo8Qz4p-ZJyDxNEyK6mOafcTCVHwIhxHc6-JH2LJVA&usqp=CAc', rating: 4.3, reviews: 34879, price: 11999, originalPrice: 16999, },
  { id: 4, name: 'MOTOROLA g54 5G (Mint Green, 128 GB)', image: 'https://pimcdn.sharafdg.com/cdn-cgi/image/width=600,height=600,fit=pad/images/S300859349_1?1739519583', rating: 4.2, reviews: 45890, price: 13999, originalPrice: 17999, },
  { id: 5, name: 'Apple Watch Series 10 GPS (42mm Jet Black Aluminium Case)', image: 'https://www.machines.com.my/cdn/shop/files/Apple_Watch_Series_10_42mm_GPS_Jet_Black_Aluminum_Sport_Band_Black_PDP_Image_Position_1__GBEN.jpg?v=1727184546', rating: 4.4, reviews: 8976, price: 46000, originalPrice: 46900, },
  { id: 6, name: 'Nike Court Vision x Pastel (UK 12)', image: 'https://knickgasm.com/cdn/shop/files/Nike-Court-Vision-x-Pastel-Knickgasm-834.jpg?v=1734417560&width=1080', rating: 4.4, reviews: 15321, price: 8800, originalPrice: 9999, },
  { id: 7, name: '55" BRAVIA 3 (4K Ultra HD | Google TV by Sony)', image: 'https://rukminim2.flixcart.com/image/704/844/xif0q/television/r/5/3/-original-imah3gz4xzdxypz2.jpeg?q=90&crop=false', rating: 4.4, reviews: 12345, price: 82500, originalPrice: 85000,  },
  { id: 8, name: 'Fujifilm X-T50 Mirrorless Camera (XF27mmF2.8 II – Charcoal)', image: 'https://i0.wp.com/fujifilmxindia.com/wp-content/uploads/2024/08/X-T50_left_diagnal_up_XF27_charcoal.png?fit=600%2C600&ssl=1', rating: 4.5, reviews: 9876, price: 167500, originalPrice: 175000, },
];

export default Collection;