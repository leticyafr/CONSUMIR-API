document.addEventListener('DOMContentLoaded', () => {
    const launchesDiv = document.getElementById('launches');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    let launchesData = []; //

   
    async function fetchLaunches() {
        try {
            const response = await fetch('https://api.spacexdata.com/v4/launches');
            launchesData = await response.json();
            displayLaunches(launchesData);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            launchesDiv.innerHTML = '<p>Erro ao carregar lançamentos. Tente novamente mais tarde.</p>';
        }
    }


    function displayLaunches(data) {
        if (data.length > 0) {
            launchesDiv.innerHTML = data.map(launch => `
                <div class="launch-item">
                    <h3>${launch.name}</h3>
                    <p><strong>Data:</strong> ${new Date(launch.date_utc).toLocaleDateString()}</p>
                    <p><strong>Detalhes:</strong> ${launch.details || 'Sem detalhes disponíveis'}</p>
                </div>
            `).join('');
        } else {
            launchesDiv.innerHTML = 'Nenhum lançamento encontrado.';
        }
    }


    function searchLaunches() {
        const query = searchInput.value.toLowerCase();
        const filteredData = launchesData.filter(launch => 
            launch.name.toLowerCase().includes(query)
        );
        displayLaunches(filteredData);
    }

    searchButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        searchLaunches();
    });


    fetchLaunches();
});
