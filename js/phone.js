// fetching data from open api
async function loadPhones(querry) {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${querry}`
  );
  const data = await response.json();
  const phones = data.data;
  displayPhones(phones);
}

// showing data on ui
function displayPhones(phones) {
  const phoneContainer = document.getElementById("phone-container");
  // Clearing container before loading items
  phoneContainer.textContent = "";

  phones.forEach((phone) => {
    // creating div for card
    const card = document.createElement("div");
    // adding class
    card.classList = `card p-4 bg-base-100 shadow-xl`;
    // adding inner html
    card.innerHTML = `
        <figure><img src="${phone.image}" alt="${phone.slug}" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>${phone.brand}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
        `;
    // appending child to phone container
    phoneContainer.appendChild(card);
  });
}

// search handle
const handleSearch = async () => {
  const searchText = document.getElementById("search-text").value;
  loadPhones(searchText);
};
