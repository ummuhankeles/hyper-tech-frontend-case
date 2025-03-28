const API_URL = 'https://api.hyperteknoloji.com.tr/products/list';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpblR5cGUiOiIxIiwiQ3VzdG9tZXJJRCI6IjU1NzI0IiwiRmlyc3ROYW1lIjoiRGVtbyIsIkxhc3ROYW1lIjoiSHlwZXIiLCJFbWFpbCI6ImRlbW9AaHlwZXIuY29tIiwiQ3VzdG9tZXJUeXBlSUQiOiIzMiIsIklzUmVzZWxsZXIiOiIwIiwiSXNBUEkiOiIxIiwiUmVmZXJhbmNlSUQiOiIiLCJSZWdpc3RlckRhdGUiOiIzLzI1LzIwMjUgMTowMDo0OCBQTSIsImV4cCI6MjA1NDEzNDExMCwiaXNzIjoiaHR0cHM6Ly9oeXBlcnRla25vbG9qaS5jb20iLCJhdWQiOiJodHRwczovL2h5cGVydGVrbm9sb2ppLmNvbSJ9.i_pqc2C5vSh1IegikQTkSxYk6MsjALLzp4g30KXqunM';
const API_KEY = 'de59806d4c0449f69f38a62c4e72874a';

async function fetchData() {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${API_TOKEN}`,
                "X-API-Key": API_KEY,
            }
        });

        if (!response.ok) {
            throw new Error('Response was not OK');
        }

        const result = await response.json();
        const productList = result.data.slice(0, 12);
        getProductList(productList);
    } catch (error) {
        console.error(error);
    }
}

function getProductList(productList) {
    const productCard = document.querySelector('.product-card');
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    let items = '';
    productList.forEach(element => {
        items += `
            <div class="card" style="width: 18rem;">
                <img src="${element.productData.productMainImage}" class="card-img-top" alt="${element.productName}">
                <div class="card-body">
                    <h5 class="card-title">${element.productName}</h5>
                    <p class="card-text">${element.marketPrice} TL</p>
                    <button>Ürün Detay<i class="fa-solid fa-arrow-right ms-3"></i></button>
                </div>
            </div>
        `
    });
    productCard.innerHTML = items;
    loader.style.display = 'none';
}

fetchData();