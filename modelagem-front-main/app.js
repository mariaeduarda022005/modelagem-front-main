let tempChart;
let distData = [];
let timeData = [];

document.addEventListener('DOMContentLoaded', (event) => {
    const tempCtx = document.getElementById('distanciaChart').getContext('2d');

    function createChart() {
        return new Chart(tempCtx, {
            type: 'line',
            data: {
                labels: timeData,
                datasets: [{
                    label: 'Distância (cm)',
                    data: distData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute'
                        },
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function updateCharts(data) {
        // Limpar os dados anteriores
        timeData.length = 0;
        distData.length = 0;

        data.forEach(entry => {
            const time = new Date(entry.created_at);
            const temp = parseFloat(entry.value);

            timeData.push(time);
            distData.push(temp);
        });

        // Se o gráfico já existir, destruí-lo
        if (tempChart) {
            tempChart.destroy();
        }

        // Criar um novo gráfico com os dados atualizados
        tempChart = createChart();
    }

    //função para fazer o get na API que resgata os dados
    window.fetchAndUpdateData = async function() {
        try {
            const response = await fetch('http://localhost:3000/data'); // Chamada para a rota /data do seu servidor
            const data = await response.json();
        
            // Atualizar o gráfico com os novos dados
            updateCharts(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    //intervalo entre as atualizações
    setInterval(fetchAndUpdateData, 5000); // 50000 ms = 5 segundos
});

async function sendSMS(){
    console.log("teste")
    const response = await fetch('http://localhost:3000/sendSMS'); // Chamada para a rota /data do seu servidor
    const data = await response.json();

}