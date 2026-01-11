// ===================== НЕЙРОСЕТЬ =====================
const API_CONFIG = {
    useRealAPI: false, // true для реального API, false для демо
    apiKey: 'YOUR_API_KEY_HERE', // Ваш ключ от plant.id
    apiUrl: 'https://api.plant.id/v2/identify'
};

// Загрузка нейросети
async function loadAI() {
    showNotification('ИИ инициализируется...', 'info');
    
    if (API_CONFIG.useRealAPI) {
        showNotification('Готово к распознаванию через Plant.id API', 'success');
    } else {
        showNotification('Демо-режим активен. Для реального распознавания получите API ключ на plant.id', 'warning');
    }
    
    // Имитация загрузки TensorFlow модели
    setTimeout(() => {
        window.aiLoaded = true;
    }, 1000);
}

// Основная функция распознавания
async function identifyPlantAI(imageFile) {
    if (!API_CONFIG.useRealAPI) {
        // Демо-режим
        return simulateAIResponse();
    }
    
    // Реальный API запрос
    try {
        const formData = new FormData();
        formData.append('images', imageFile);
        formData.append('api_key', API_CONFIG.apiKey);
        
        const response = await fetch(API_CONFIG.apiUrl, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Ошибка API');
        }
        
        return await response.json();
    } catch (error) {
        console.error('API error:', error);
        // Возвращаем демо-данные если API не сработал
        return simulateAIResponse();
    }
}

// Имитация ответа нейросети
function simulateAIResponse() {
    const plants = [
        {
            name: 'Одуванчик лекарственный',
            confidence: 0.94,
            care: 'Солнечное место, умеренный полив, рыхлая почва',
            family: 'Астровые'
        },
        {
            name: 'Ромашка аптечная',
            confidence: 0.87,
            care: 'Полное солнце, регулярный полив, нейтральная почва',
            family: 'Астровые'
        },
        {
            name: 'Подорожник большой',
            confidence: 0.82,
            care: 'Любая почва, устойчив к засухе',
            family: 'Подорожниковые'
        }
    ];
    
    const randomPlant = plants[Math.floor(Math.random() * plants.length)];
    
    return {
        success: true,
        is_similar: true,
        suggestions: [{
            id: Math.floor(Math.random() * 10000),
            plant_name: randomPlant.name,
            plant_details: {
                common_names: [randomPlant.name.split(' ')[0]],
                url: 'https://example.com'
            },
            probability: randomPlant.confidence,
            confirmed: false
        }],
        care_tips: randomPlant.care,
        family: randomPlant.family
    };
}

// Обновленная функция обработки изображения
async function processImageWithAI(file) {
    if (!window.aiLoaded) {
        await loadAI();
    }
    
    // Показываем прогресс
    uploadProgress.style.display = 'block';
    progressFill.style.width = '0%';
    progressPercent.textContent = '0%';
    
    // Имитация прогресса
    const progressInterval = setInterval(() => {
        const currentWidth = parseInt(progressFill.style.width);
        if (currentWidth < 90) {
            progressFill.style.width = (currentWidth + 10) + '%';
            progressPercent.textContent = (currentWidth + 10) + '%';
        }
    }, 200);
    
    try {
        // Вызов нейросети
        const aiResult = await identifyPlantAI(file);
        
        clearInterval(progressInterval);
        progressFill.style.width = '100%';
        progressPercent.textContent = '100%';
        
        // Показываем результат
        setTimeout(() => {
            uploadProgress.style.display = 'none';
            displayAIResult(aiResult);
        }, 500);
        
    } catch (error) {
        clearInterval(progressInterval);
        showNotification('Ошибка распознавания. Проверьте подключение к интернету.', 'error');
        // Показываем демо-результат
        uploadProgress.style.display = 'none';
        displayAIResult(simulateAIResponse());
    }
}

// Отображение результата
function displayAIResult(result) {
    const suggestion = result.suggestions?.[0];
    
    if (!suggestion) {
        showNotification('Растение не распознано. Попробуйте другое фото.', 'error');
        return;
    }
    
    // Обновляем интерфейс
    plantName.textContent = suggestion.plant_name;
    plantCareText.textContent = result.care_tips || getCareTips(suggestion.plant_name);
    
    // Показываем точность
    const confidenceElement = document.createElement('div');
    confidenceElement.className = 'confidence';
    confidenceElement.innerHTML = `Точность: <strong>${Math.round(suggestion.probability * 100)}%</strong>`;
    
    // Обновляем детали ухода
    document.querySelectorAll('.care-item')[0].innerHTML = 
        `<i class="fas fa-sun"></i><span>Освещение: <strong>${getLightRequirement(suggestion.plant_name)}</strong></span>`;
    
    document.querySelectorAll('.care-item')[1].innerHTML = 
        `<i class="fas fa-tint"></i><span>Полив: <strong>${getWaterRequirement(suggestion.plant_name)}</strong></span>`;
    
    document.querySelectorAll('.care-item')[2].innerHTML = 
        `<i class="fas fa-thermometer-half"></i><span>Температура: <strong>${getTempRequirement(suggestion.plant_name)}</strong></span>`;
    
    // Показываем карточку
    resultCard.style.display = 'block';
    
    // Анимация появления
    resultCard.style.opacity = '0';
    resultCard.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultCard.style.transition = 'all 0.5s ease';
        resultCard.style.opacity = '1';
        resultCard.style.transform = 'translateY(0)';
    }, 100);
    
    showNotification(`Распознано: ${suggestion.plant_name}`, 'success');
}

// Вспомогательные функции
function getLightRequirement(plantName) {
    const name = plantName.toLowerCase();
    if (name.includes('кактус') || name.includes('суккулент')) return 'Прямое солнце';
    if (name.includes('фикус') || name.includes('монстера')) return 'Непрямой свет';
    return 'Среднее освещение';
}

function getWaterRequirement(plantName) {
    const name = plantName.toLowerCase();
    if (name.includes('кактус') || name.includes('суккулент')) return 'Редкий';
    if (name.includes('папоротник') || name.includes('орхидея')) return 'Частый';
    return 'Умеренный';
}

function getTempRequirement(plantName) {
    const name = plantName.toLowerCase();
    if (name.includes('кактус')) return '20-35°C';
    if (name.includes('фикус') || name.includes('монстера')) return '20-25°C';
    return '18-25°C';
}

// ===================== ИНИЦИАЛИЗАЦИЯ =====================
document.addEventListener('DOMContentLoaded', () => {
    // Загружаем нейросеть при старте
    loadAI();
    
    // Обновляем обработчик файлов
    fileInput.addEventListener('change', (e) => {
        if (fileInput.files.length > 0) {
            processImageWithAI(fileInput.files[0]);
        }
    });
    
    // DOM элементы
const fileInput = document.getElementById('fileInput');
const selectFileBtn = document.getElementById('selectFileBtn');
const uploadArea = document.getElementById('uploadArea');
const uploadProgress = document.getElementById('uploadProgress');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const resultCard = document.getElementById('resultCard');
const plantName = document.getElementById('plantName');
const plantCareText = document.getElementById('plantCareText');
const humidityIndicator = document.getElementById('humidityIndicator');
const refreshBtn = document.querySelector('.btn-refresh');

// Примеры данных для демонстрации
const plantDatabase = {
    'одуванчик': {
        name: 'Одуванчик обыкновенный',
        care: 'Обеспечьте яркое солнце, умеренный полив без застоя воды, рыхлую почву. Подкармливайте каждые 2-3 недели в период роста.',
        light: 'Яркое',
        water: 'Умеренный',
        temp: '18-25°C'
    },
    'роза': {
        name: 'Роза садовая',
        care: 'Требует много солнечного света (6-8 часов в день), регулярный полив под корень, избегая попадания на листья. Обрезайте отцветшие бутоны.',
        light: 'Очень яркое',
        water: 'Регулярный',
        temp: '20-28°C'
    },
    'фикус': {
        name: 'Фикус Бенджамина',
        care: 'Непрямое яркое освещение, полив после высыхания верхнего слоя почвы, высокая влажность воздуха. Избегайте сквозняков.',
        light: 'Непрямое яркое',
        water: 'Умеренный',
        temp: '20-25°C'
    },
    'кактус': {
        name: 'Кактус пустынный',
        care: 'Прямое солнце, редкий полив (раз в 2-3 недели), хорошо дренированная почва. Зимой почти не поливать.',
        light: 'Прямое солнце',
        water: 'Редкий',
        temp: '20-35°C'
    }
};

// Функция для случайного выбора растения
function getRandomPlant() {
    const plants = Object.keys(plantDatabase);
    const randomPlant = plants[Math.floor(Math.random() * plants.length)];
    return plantDatabase[randomPlant];
}

// Имитация загрузки файла
selectFileBtn.addEventListener('click', () => {
    fileInput.click();
});

uploadArea.addEventListener('click', () => {
    fileInput.click();
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#2ecc71';
    uploadArea.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#e0e0e0';
    uploadArea.style.backgroundColor = '';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#e0e0e0';
    uploadArea.style.backgroundColor = '';
    simulateFileUpload();
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        simulateFileUpload();
    }
});

// Имитация процесса загрузки и анализа
function simulateFileUpload() {
    // Показать прогресс
    uploadProgress.style.display = 'block';
    resultCard.style.display = 'none';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        progressFill.style.width = progress + '%';
        progressPercent.textContent = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            // Завершение загрузки
            setTimeout(() => {
                uploadProgress.style.display = 'none';
                showPlantResult();
            }, 500);
        }
    }, 50);
}

// Показать результат распознавания
function showPlantResult() {
    const plant = getRandomPlant();
    
    plantName.textContent = plant.name;
    plantCareText.textContent = plant.care;
    
    // Обновить данные в карточке ухода
    document.querySelectorAll('.care-item')[0].innerHTML = `<i class="fas fa-sun"></i><span>Солнце: <strong>${plant.light}</strong></span>`;
    document.querySelectorAll('.care-item')[1].innerHTML = `<i class="fas fa-tint"></i><span>Полив: <strong>${plant.water}</strong></span>`;
    document.querySelectorAll('.care-item')[2].innerHTML = `<i class="fas fa-thermometer-half"></i><span>Температура: <strong>${plant.temp}</strong></span>`;
    
    resultCard.style.display = 'block';
    
    // Прокрутить к результату
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Обновление показаний датчиков
function updateSensorReadings() {
    // Генерация случайных значений в пределах нормы
    const light = Math.floor(Math.random() * 500) + 800;
    const temp = Math.floor(Math.random() * 10) + 18;
    const humidity = Math.floor(Math.random() * 20) + 50;
    const nutrients = Math.floor(Math.random() * 20) + 70;
    
    // Обновление значений на экране
    document.querySelector('.sensor-item:nth-child(1) .sensor-value').innerHTML = `${light} <span class="unit">люкс (lux)</span>`;
    document.querySelector('.sensor-item:nth-child(2) .sensor-value').innerHTML = `${temp}°C <span class="unit">°C</span>`;
    document.querySelector('.sensor-item:nth-child(3) .sensor-value').innerHTML = `${humidity}% <span class="unit">относительная</span>`;
    document.querySelector('.sensor-item:nth-child(4) .sensor-value').innerHTML = `${nutrients}% <span class="unit">уровень</span>`;
    
    // Обновление влажности почвы
    const soilHumidity = Math.floor(Math.random() * 30) + 40;
    document.querySelector('.humidity-value').textContent = `${soilHumidity}%`;
    document.querySelector('.current-level .level-value').textContent = `${soilHumidity}%`;
    
    // Обновление позиции индикатора
    const indicatorPosition = Math.min(Math.max((soilHumidity - 20) / 60 * 100, 10), 90);
    humidityIndicator.style.bottom = `${100 - indicatorPosition}%`;
    
    // Обновление статуса
    let statusText, statusClass;
    if (soilHumidity < 40) {
        statusText = 'Сухо';
        statusClass = 'dry';
    } else if (soilHumidity < 70) {
        statusText = 'Идеально';
        statusClass = 'ideal';
    } else {
        statusText = 'Влажно';
        statusClass = 'wet';
    }
    
    document.querySelector('.status-indicator span').textContent = statusText;
    document.querySelector('.status-dot').className = `status-dot ${statusClass}-dot`;
    
    // Показать уведомление
    showNotification('Показания датчиков обновлены', 'success');
}

// Функция показа уведомлений
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Анимация
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
        }
    `;
    document.head.appendChild(style);
    
    // Добавляем в документ
    document.body.appendChild(notification);
    
    // Удаление уведомления
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Автоматическое удаление через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Обработчик кнопки обновления
refreshBtn.addEventListener('click', updateSensorReadings);

// Имитация живых данных с датчиков
setInterval(() => {
    // Случайным образом обновляем одно из значений
    const sensors = document.querySelectorAll('.sensor-value');
    const randomSensor = Math.floor(Math.random() * sensors.length);
    const currentValue = sensors[randomSensor].textContent;
    
    if (randomSensor === 0) { // Освещенность
        const change = Math.floor(Math.random() * 100) - 50;
        const newValue = Math.max(parseInt(currentValue) + change, 500);
        sensors[randomSensor].innerHTML = `${newValue} <span class="unit">люкс (lux)</span>`;
    } else if (randomSensor === 1) { // Температура
        const change = (Math.random() * 2) - 1;
        const newValue = (parseFloat(currentValue) + change).toFixed(1);
        sensors[randomSensor].innerHTML = `${newValue}°C <span class="unit">°C</span>`;
    }
}, 10000);

// Навигация по разделам
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Убрать активный класс у всех ссылок
        document.querySelectorAll('.nav-link').forEach(item => {
            item.classList.remove('active');
        });
        
        // Добавить активный класс текущей ссылке
        this.classList.add('active');
        
        // Прокрутить к соответствующему разделу
        const targetId = this.getAttribute('href').substring(1);
        if (targetId !== 'main') {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Установить начальные значения
    updateSensorReadings();
    
    // Показать приветственное сообщение
    setTimeout(() => {
        showNotification('Добро пожаловать в PlantCareAI! Загрузите фото растения для анализа.', 'info');
    }, 1000);
});
});
