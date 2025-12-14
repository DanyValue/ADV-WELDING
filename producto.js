const params = new URLSearchParams(window.location.search);
const idProducto = parseInt(params.get("id"));

const producto = productos.find(p => p.id === idProducto);

if (!producto) {
  alert("Producto no encontrado");
} else {
  document.getElementById("nombreProducto").textContent = producto.nombre;
  document.getElementById("imagenPrincipal").src = producto.imagen;
  document.getElementById("descripcionLarga").textContent = producto.descripcionLarga;
  document.getElementById("precioProducto").textContent = `$${producto.precio} MXN`;

  document.getElementById("btnAgregar").onclick = () => {
    addToCart(producto.id);
  };

  // Galería de imágenes
  const galeria = document.getElementById("galeria");
  producto.imagenes.forEach(img => {
    const imagen = document.createElement("img");
    imagen.src = img;
    imagen.className = "miniatura";
    imagen.onclick = () => {
      document.getElementById("imagenPrincipal").src = img;
    };
    galeria.appendChild(imagen);
  });

  // Video (opcional)
  if (producto.video) {
    document.getElementById("videoContainer").innerHTML = `
      <video controls width="400">
        <source src="${producto.video}" type="video/mp4">
      </video>
    `;
  }
}
