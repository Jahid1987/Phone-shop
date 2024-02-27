// fetching data from open api
async function loadPhones(querry, isshowAll) {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${querry}`
  );
  const data = await response.json();
  const phones = data.data;
  displayPhones(phones, isshowAll);
}

// showing data on ui
function displayPhones(phones, isshowAll) {
  const phoneContainer = document.getElementById("phone-container");
  // Clearing container before loading items
  phoneContainer.textContent = "";

  //   Toggle show all button if data is more than 12 and isshowAll is not
  const showAllButton = document.getElementById("show-all-btn");
  phones.length > 12 && !isshowAll
    ? showAllButton.classList.remove("hidden")
    : showAllButton.classList.add("hidden");

  //   showing only 12 phones if data is more than 12 and isshowAll is not
  phones = !isshowAll ? phones.slice(0, 12) : phones;

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

  toggleLoading(false);
}

// search handle
const handleSearch = (isshowAll) => {
  toggleLoading(true);
  const searchText = document.getElementById("search-text");
  const querry = searchText.value;
  loadPhones(querry, isshowAll);
};

// show all button
const showAll = () => {
  handleSearch(true);
};

// toggling loader
const toggleLoading = (isLoading) => {
  const showLoader = document.getElementById("show-loader");
  isLoading
    ? showLoader.classList.remove("hidden")
    : showLoader.classList.add("hidden");
};
