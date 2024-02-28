// fetching data from open api
async function loadPhones(querry = "13", isshowAll) {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${querry}`
  );
  const data = await response.json();
  const phones = data.data;
  // Toggle not found message
  const notFoundMsg = document.getElementById("not-found-msg");
  console.log(notFoundMsg, phones.length);
  phones.length < 1
    ? notFoundMsg.classList.remove("hidden")
    : notFoundMsg.classList.add("hidden");

  displayPhones(phones, isshowAll);
}

// showing data on ui
function displayPhones(phones, isshowAll) {
  const phoneContainer = document.getElementById("phone-container");
  // Clearing container before loading found items
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
          <div class="card-actions justify-center">
            <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
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

// show details handle
async function showDetails(id) {
  const singleResponse = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const singleData = await singleResponse.json();
  const phone = singleData.data;
  // showing in ui
  const showDetailsContainer = document.getElementById("show_details");
  const modalBox = document.createElement("div");
  modalBox.classList = `modal-box`;
  modalBox.innerHTML = `
    <div class="bg-orange-50 flex justify-center pt-5 pb-5 my-4">
    <img src="${phone.image}" alt="${phone.slug}">
    </div>
    <h3 class="font-extrabold text-xl">${phone.name}</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <p class="py-4"><span class="font-bold">Storage: </span>${phone.mainFeatures?.storage}</p>
    <p class="py-4"><span class="font-bold">Display Size: </span>${phone.mainFeatures?.displaySize}</p>
    <p class="py-4"><span class="font-bold">Chip Set: </span>${phone.mainFeatures?.chipSet}</p>
    <p class="py-4"><span class="font-bold">Memory: </span>${phone.mainFeatures?.memory}</p>
    <p class="py-4"><span class="font-bold">Slug: </span>${phone.slug}</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  `;
  showDetailsContainer.appendChild(modalBox);
  console.log(phone);
  show_details.showModal();
  //   console.log(singleData.data);
}
