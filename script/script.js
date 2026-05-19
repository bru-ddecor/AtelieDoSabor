fetch('http://localhost:3000/products')
  .then(response => response.json())
  .then(products => {
    console.log(products);

    products.forEach(product => {
      console.log(product.name, product.price, product.category);
    });
  })
  .catch(error => {
    console.error('Erro ao buscar produtos:', error);
  });