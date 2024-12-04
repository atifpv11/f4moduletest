const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
let cryptoData = [];

// Fetch data using .then
function fetchDataWithThen() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            cryptoData = data;
            renderTable(cryptoData);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Fetch data using async/await
async function fetchDataWithAsyncAwait() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        cryptoData = data;
        renderTable(cryptoData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Render table with data
function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach(coin => {
        const row = document.createElement('tr');
        const percentageChangeClass = coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative';
        row.innerHTML = `
            <td><img src="${coin.image}" alt="${coin.name}"><span>${coin.name}</span></td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>$${coin.current_price.toLocaleString()}</td>
            <td class="percentage-change ${percentageChangeClass}">${coin.price_change_percentage_24h.toFixed(2)}%</td>
            <td>Mkt Cap: $${coin.market_cap.toLocaleString()}</td>
            <td>${coin.total_volume.toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Search functionality
document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = cryptoData.filter(coin => 
        coin.name.toLowerCase().includes(query) || 
        coin.symbol.toLowerCase().includes(query)
    );
    renderTable(filteredData);
});

// Sort by Market Cap
document.getElementById('sortMarketCap').addEventListener('click', () => {
    const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
});

// Sort by Percentage Change
document.getElementById('sortChange').addEventListener('click', () => {
    const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
});

// Initial data fetch with async/await
fetchDataWithAsyncAwait();