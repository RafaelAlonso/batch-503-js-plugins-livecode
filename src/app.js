const url = 'https://wagon-garage-api.herokuapp.com/vintao/cars';

const addCar = (car) => {
  const model = car.model;
  const brand = car.brand;
  const plate = car.plate;
  const owner = car.owner;
  //primeiro criar um card!
  const card =
      `<div class="car">
        <div class="car-image">
          <img src="http://loremflickr.com/280/280/${brand} ${model}" />
        </div>
        <div class="car-info">
          <h4>${brand} ${model}</h4>
          <p><strong>Owner:</strong> ${owner}</p>
          <p><strong>Plate:</strong> ${plate}</p>
        </div>
      </div>`;
  //inserir card na lista
  const carList = document.querySelector('.cars-list');
  carList.insertAdjacentHTML('beforeend', card);
};

// Pegar todos os carros da nossa garagem
const getCars = () => {
  fetch(url)
  .then(response => response.json())
  .then((cars) => {
    // console.log(cars);
    cars.forEach((car) => {
      // adicionamos cada carro que conseguimos no HTML com a func abaixo
      addCar(car);
    });
  });
}

const postCar = () => {
  const userBrand = document.getElementById("brand").value;
  const userModel = document.getElementById("model").value;
  const userOwner = document.getElementById("owner").value;
  const userPlate = document.getElementById("plate").value;

  const userCar = {
    "brand": userBrand,
    "model": userModel,
    "owner": userOwner,
    "plate": userPlate
  }

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userCar)
  })
  .then(response => response.json())
  .then(addCar);
};

getCars();

document.getElementById("new-car").addEventListener("submit", (event) => {
  event.preventDefault();

  postCar();
});
