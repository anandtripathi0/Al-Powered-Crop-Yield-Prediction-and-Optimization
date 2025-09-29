        function scrollToDemo() {
            document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
        }

        function generatePrediction() {
            const crop = document.getElementById('cropSelect').value;
            const size = parseFloat(document.getElementById('farmSize').value) || 5;
            const region = document.getElementById('regionSelect').value;
            
            // Get the button that was clicked
            const button = document.querySelector('button[onclick="generatePrediction()"]');
            const originalText = button.innerHTML;
            button.innerHTML = '🔄 Processing AI Model...';
            button.disabled = true;
            button.style.opacity = '0.7';
            
            setTimeout(() => {
                // Generate realistic predictions based on inputs
                const baseYields = {
                    wheat: 3.2,
                    rice: 4.8,
                    corn: 5.1,
                    tomato: 12.3
                };
                
                const regionMultipliers = {
                    'north-india': 1.1,
                    'midwest-us': 1.2,
                    'southeast-asia': 0.9,
                    'east-africa': 0.8
                };
                
                const sizeMultiplier = Math.min(1.2, 1 + (size - 5) * 0.02); // Slight efficiency gain for larger farms
                
                const baseYield = baseYields[crop] || 4.0;
                const multiplier = regionMultipliers[region] || 1.0;
                const finalYield = (baseYield * multiplier * sizeMultiplier * (0.9 + Math.random() * 0.3)).toFixed(1);
                const increase = (8 + Math.random() * 12).toFixed(0);
                
                // Update yield prediction with animation
                const yieldElement = document.getElementById('yieldPrediction');
                const increaseElement = document.getElementById('yieldIncrease');
                
                yieldElement.style.transform = 'scale(1.1)';
                yieldElement.style.transition = 'transform 0.3s ease';
                
                setTimeout(() => {
                    yieldElement.textContent = `${finalYield} tons/acre`;
                    increaseElement.textContent = `+${increase}% vs last season`;
                    yieldElement.style.transform = 'scale(1)';
                }, 100);
                
                // Update recommendations based on crop and region
                updateRecommendations(crop, region);
                
                // Update weather forecast
                updateWeatherForecast();
                
                // Reset button
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.opacity = '1';
                
                // Animate chart
                animateChart();
                
                // Show success message
                showSuccessMessage();
            }, 1500);
        }
        
        function updateRecommendations(crop, region) {
            const recommendations = {
                wheat: [
                    { type: '💧 Irrigation', message: 'Reduce watering by 10% - optimal soil moisture detected', colorClass: 'bg-blue-50 border-blue-400 text-blue-800 text-blue-700' },
                    { type: '🌱 Fertilization', message: 'Apply phosphorus-rich fertilizer next week', colorClass: 'bg-yellow-50 border-yellow-400 text-yellow-800 text-yellow-700' },
                    { type: '🐛 Pest Control', message: 'Low pest risk - continue monitoring', colorClass: 'bg-green-50 border-green-400 text-green-800 text-green-700' }
                ],
                rice: [
                    { type: '💧 Irrigation', message: 'Maintain current flooding levels for optimal growth', colorClass: 'bg-blue-50 border-blue-400 text-blue-800 text-blue-700' },
                    { type: '🌱 Fertilization', message: 'Nitrogen application recommended in 5 days', colorClass: 'bg-yellow-50 border-yellow-400 text-yellow-800 text-yellow-700' },
                    { type: '🐛 Pest Control', message: 'Monitor for brown planthopper activity', colorClass: 'bg-red-50 border-red-400 text-red-800 text-red-700' }
                ],
                corn: [
                    { type: '💧 Irrigation', message: 'Increase watering by 5% due to heat forecast', colorClass: 'bg-blue-50 border-blue-400 text-blue-800 text-blue-700' },
                    { type: '🌱 Fertilization', message: 'Side-dress with nitrogen fertilizer this week', colorClass: 'bg-yellow-50 border-yellow-400 text-yellow-800 text-yellow-700' },
                    { type: '🐛 Pest Control', message: 'Corn borer risk elevated - inspect weekly', colorClass: 'bg-red-50 border-red-400 text-red-800 text-red-700' }
                ],
                tomato: [
                    { type: '💧 Irrigation', message: 'Drip irrigation optimal - maintain current schedule', colorClass: 'bg-blue-50 border-blue-400 text-blue-800 text-blue-700' },
                    { type: '🌱 Fertilization', message: 'Calcium supplement needed to prevent blossom end rot', colorClass: 'bg-yellow-50 border-yellow-400 text-yellow-800 text-yellow-700' },
                    { type: '🐛 Pest Control', message: 'Aphid pressure increasing - consider organic treatment', colorClass: 'bg-red-50 border-red-400 text-red-800 text-red-700' }
                ]
            };
            
            const cropRecs = recommendations[crop] || recommendations.wheat;
            const container = document.getElementById('recommendations');
            
            // Add fade effect
            container.style.opacity = '0.5';
            
            setTimeout(() => {
                container.innerHTML = cropRecs.map(rec => {
                    const colors = rec.colorClass.split(' ');
                    return `
                        <div class="${colors[0]} p-4 rounded-lg border-l-4 ${colors[1]} transform transition-all duration-300 hover:scale-105">
                            <h5 class="font-semibold ${colors[2]}">${rec.type}</h5>
                            <p class="${colors[3]} text-sm mt-1">${rec.message}</p>
                        </div>
                    `;
                }).join('');
                container.style.opacity = '1';
            }, 200);
        }
        
        function animateChart() {
            const bars = document.querySelectorAll('.chart-bar');
            bars.forEach((bar, index) => {
                const originalHeight = bar.style.height;
                bar.style.height = '0px';
                setTimeout(() => {
                    bar.style.height = originalHeight;
                    bar.style.transition = 'height 0.8s ease-in-out';
                }, index * 300);
            });
        }
        
        function updateWeatherForecast() {
            const weatherOptions = [
                { sunny: 3, rainy: 2, cloudy: 2 },
                { sunny: 4, rainy: 1, cloudy: 2 },
                { sunny: 2, rainy: 3, cloudy: 2 },
                { sunny: 5, rainy: 1, cloudy: 1 }
            ];
            
            const weather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
            const weatherElement = document.querySelector('.bg-gray-50 .flex.justify-between');
            
            if (weatherElement) {
                weatherElement.innerHTML = `
                    <span>☀️ Sunny (${weather.sunny} days)</span>
                    <span>🌧️ Rain (${weather.rainy} days)</span>
                    <span>☁️ Cloudy (${weather.cloudy} days)</span>
                `;
            }
        }
        
        function showSuccessMessage() {
            // Create temporary success notification
            const notification = document.createElement('div');
            notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
            notification.innerHTML = '✅ AI Prediction Generated Successfully!';
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Animate out and remove
            setTimeout(() => {
                notification.style.transform = 'translateX(full)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }
        
        // Initialize with default prediction and add event listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Set initial recommendations
            setTimeout(() => {
                updateRecommendations('wheat', 'north-india');
            }, 500);
            
            // Add change listeners to dropdowns for real-time updates
            document.getElementById('cropSelect').addEventListener('change', function() {
                const crop = this.value;
                const region = document.getElementById('regionSelect').value;
                updateRecommendations(crop, region);
                updateWeatherForecast();
            });
            
            document.getElementById('regionSelect').addEventListener('change', function() {
                const region = this.value;
                const crop = document.getElementById('cropSelect').value;
                updateRecommendations(crop, region);
                updateWeatherForecast();
            });
            
            // Add input validation for farm size
            document.getElementById('farmSize').addEventListener('input', function() {
                const value = parseFloat(this.value);
                if (value < 0.1) this.value = 0.1;
                if (value > 1000) this.value = 1000;
            });
        });