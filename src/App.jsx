import React, { useMemo, useState, useEffect } from "react";
import './App.css'

const Animales = [
  {key: "Todos", String: "Todos"},
  {key: "perro", String: "Perro"},
  {key: "gatos", String: "Gatos"},
]

const PRODUCTS = [
  {
    id: 1,
    name: "Comida Para Perro Adulto Filpo",
    category: "perro",
    price: 122.600,
    desc: "Alimento Filpo",
    image:
      "https://ceba.com.co/cdn/shop/products/Sintitulo-1_832930a6-cd41-4289-b3c3-132ba5d78663_600x.jpg?v=1692902422",
  },
  {
    id: 2,
    name: "Comida para perro Hills Adulto Cordero Razas Miniatura 4,5Lb a 15,5Lbs",
    category: "perro",
    price: 91.350,
    desc: "Alimento de perro Hills",
    image:
      "https://ceba.com.co/cdn/shop/files/ComidaParaPerroHillsSMAdultoRazasMiniCordero4_5LB-1_500x.png?v=1738849397",
  },
  {
    id: 3,
    name: "Comida para gato Hills Optimal Care Adulto 4Lbs a 16Lbs",
    category: "gatos",
    price: 125.000,
    desc: "Comida de gatos Hills 16Lbs",
    image:
      "https://ceba.com.co/cdn/shop/files/ComidaParaGatoHillsOptimalCareAdultoPollo16LB-1_500x.png?v=1746596039",
  },
  {
    id: 4,
    name: "Comida para gato Hills Adulto Peso Perfecto 3Lbs",
    category: "gatos",
    price: 100.000,
    desc: "Comida de gatos Hills 3Lbs",
    image:
      "https://ceba.com.co/cdn/shop/files/ComidaParaGatoHillsAdultoPesoPerfectoPollo3LB-1_6fabec3f-cece-4970-9273-76d97ec224f7_500x.png?v=1746596631",
  },
  {
    id: 5,
    name: "Comida Para Gato Adulto Mirringo Original",
    category: "gatos",
    price: 5.500,
    desc: "Comida de gatos Mirringo",
    image:
      "https://ceba.com.co/cdn/shop/files/MIRRINGOAD_400x.jpg?v=1693942771",
  },
];

/*Productos Cartas*/
function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} className="img" />
      <h3>{product.name}</h3>
      <p>{product.desc}</p>
      <strong>${product.price.toFixed(2)}</strong>
      <br />
      <button onClick={() => onAdd(product)}>Agregar al carrito</button>
    </div>
  );
}

/*Carrusel*/
function Carousel({ slides }) {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="carousel">
      <button className="carousel-btn left" onClick={prevSlide}>❮</button>

      <div className="carousel-slide">
        <img
          src={slides[index].image}
          className="carousel-img"
        /> 
      </div>

      <button className="carousel-btn right" onClick={nextSlide}>❯</button>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}


/**Veterinaria*/
function Veterinaria() {

  const [cart, setCart] = useState({});
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    if (category === "all") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === category);
  }, [category]);

  const addToCart = (product) => {
    setCart((prev) => {
      const qty = prev[product.id]?.qty || 0;
      return { ...prev, [product.id]: { product, qty: qty + 1 } };
    });
  };

    const removeFromCart = (productId) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  const total = Object.values(cart).reduce(
    (acc, it) => acc + it.product.price * it.qty,
    0
  );

  return (
    <>
<body>

    <section className='Banner'>

          <h1 className='Logo'>
            <a href='/'>
            <span>PetsLovers</span>
            </a>
          </h1>

          <nav>
            <button onClick={() => setCategory("perro")}>
              <img 
                src='https://cdn-icons-png.flaticon.com/512/1076/1076928.png' 
                alt="Perros" 
              />
            </button>
            <button onClick={() => setCategory("gatos")}>
              <img 
                src='https://cdn-icons-png.flaticon.com/512/7577/7577239.png' 
                alt="Gatos" 
              />
            </button>
            <button onClick={() => setCategory("all")}>
              <img 
                src='https://cdn-icons-png.flaticon.com/512/992/992651.png' 
                alt="Todos" 
              />
            </button>
          </nav>
    </section>
    
<Carousel
  slides={[
    {
      image: "https://ceba.com.co/cdn/shop/files/Promos_Mes_Sep_CEBA25__Mesa_de_trabajo_1_ab73a5ca-eafb-4572-b050-3d59d7d4537b_2000x.jpg?v=1756737838",
    },
    {
      image: "https://ceba.com.co/cdn/shop/files/Kit_Kit_Hills_Small_and_mini_Mesa_de_trabajo_1_fbe47996-f8c5-410b-8302-911e462ee65f_2000x.jpg?v=1751923796",
    },
    {
      image: "https://ceba.com.co/cdn/shop/files/kit_Equilibrio_etapa_de_vida_1400x400_2__Mesa_de_trabajo_1_2000x.jpg?v=1752846722",
    },
  ]}
/>

  <div className="App">

      {/* Productos */}
      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>

      {/* Carrito */}
      <div className="cart">
        <h2>🛒 Carrito</h2>
        {Object.values(cart).length === 0 ? (
          <p>Vacío</p>
        ) : (
          <ul>
            {Object.values(cart).map(({ product, qty }) => (
              <li key={product.id}>
                  {product.name} × {qty} = ${ (product.price * qty).toFixed(2) }
                  {" "}
                  <button onClick={() => removeFromCart(product.id)}>❌ Eliminar</button>
              </li>
            ))}
          </ul>
        )}
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
    </div>

   </body>
    </>
  )
}

export default Veterinaria
