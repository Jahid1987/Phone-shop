// fetching data from open api
async function loadPhones() {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await response.json();
  const phones = data.data;
  showPhones(phones);
}
// showing data on ui 
function showPhones(phones) {
    // console.log(phones)
    phones.forEach(element => {
        console.log(element.phone_name)
    });
}


