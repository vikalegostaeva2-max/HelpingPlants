// ===================== НАСТРОЙКИ СБЕР GIGACHAT =====================
const GIGACHAT_CONFIG = {
    // ВАШИ РЕАЛЬНЫЕ ДАННЫЕ
    clientId: '019bccb9-7243-7fbd-81d2-19fe17746830',
    authorizationKey: 'NDk5ODZjOWEtYzFlMy00ZGUxLWE4ZTktMGY3MGMwYTA4NmE1',
    
    // URL API
    authURL: 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
    apiURL: 'https://gigachat.devices.sberbank.ru/api/v1',
    
    // Параметры
    scope: 'GIGACHAT_API_PERS',
    model: 'GigaChat',
    temperature: 0.7,
    maxTokens: 1000,
    
    // Демо-режим (true - использовать демо, false - реальный API)
    demoMode: false
};

// ===================== КЛАСС ДЛЯ РАБОТЫ С GIGACHAT =====================
class SberGigaChatAI {
    constructor() {
        this.accessToken = null;
        this.tokenExpires = 0;
        this.rqUID = this.generateRqUID();
        this.isConnected = false;
        this.aiMode = true; // true = GigaChat, false = локальный алгоритм
    }
    
    generateRqUID() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 9);
        return `${timestamp}-${random}`;
    }
    
    async getAccessToken() {
        if (this.accessToken && Date.now() < this.tokenExpires) {
            return this.accessToken;
        }
        
        console.log('[GigaChat] Запрашиваю новый токен...');
        
        try {
            const authString = `${GIGACHAT_CONFIG.clientId}:${GIGACHAT_CONFIG.authorizationKey}`;
            const base64Auth = btoa(authString);
            
            const formData = new URLSearchParams();
            formData.append('scope', GIGACHAT_CONFIG.scope);
            
            const response = await fetch(GIGACHAT_CONFIG.authURL, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${base64Auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'RqUID': this.rqUID,
                    'Accept': 'application/json'
                },
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`Ошибка авторизации: ${response.status}`);
            }
            
            const data = await response.json();
            this.accessToken = data.access_token;
            this.tokenExpires = Date.now() + 1800000; // 30 минут
            
            console.log('[GigaChat] Токен получен');
            this.isConnected = true;
            
            return this.accessToken;
            
        } catch (error) {
            console.error('[GigaChat] Ошибка получения токена:', error);
            this.isConnected = false;
            throw error;
        }
    }
    
    async analyzePlantImage(imageFile) {
        if (GIGACHAT_CONFIG.demoMode || !this.aiMode) {
            console.log('[AI] Использую демо-режим');
            return this.demoAnalysis(imageFile);
        }
        
        try {
            // Получаем токен
            const token = await this.getAccessToken();
            
            // Конвертируем изображение в base64
            const base64Image = await this.fileToBase64(imageFile);
            const imageBase64 = base64Image.split(',')[1];
            
            // Промпт для нейросети
            const prompt = `Проанализируй это изображение растения и предоставь информацию в формате JSON:
{
    "plant_name": "Название на русском",
    "scientific_name": "Латинское название",
    "family": "Семейство",
    "confidence": 0.95,
    "care_instructions": {
        "light": "требования к свету",
        "water": "режим полива",
        "temperature": "температурный режим",
        "soil": "тип почвы"
    },
    "characteristics": ["характеристика1", "характеристика2"],
    "interesting_fact": "интересный факт"
}`;
            
            // Запрос к API
            const requestBody = {
                model: GIGACHAT_CONFIG.model,
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: prompt
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `data:image/jpeg;base64,${imageBase64}`
                                }
                            }
                        ]
                    }
                ],
                temperature: GIGACHAT_CONFIG.temperature,
                max_tokens: GIGACHAT_CONFIG.maxTokens
            };
            
            const response = await fetch(`${GIGACHAT_CONFIG.apiURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                throw new Error(`API ошибка: ${response.status}`);
            }
            
            const result = await response.json();
            return this.parseResponse(result);
            
        } catch (error) {
            console.error('[GigaChat] Ошибка анализа:', error);
            // Если API не сработал, используем демо
            return this.demoAnalysis(imageFile);
        }
    }
    
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    
    parseResponse(apiResponse) {
        try {
            const content = apiResponse.choices?.[0]?.message?.content || '';
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            
            if (jsonMatch) {
                const plantData = JSON.parse(jsonMatch[0]);
                
                return {
                    success: true,
                    provider: 'Sber GigaChat AI',
                    plant: {
                        name: plantData.plant_name || 'Растение',
                        scientific_name: plantData.scientific_name || '',
                        family: plantData.family || 'Неизвестное семейство',
                        confidence: plantData.confidence || 0.8,
                        characteristics: plantData.characteristics || ['Определено нейросетью'],
                        care: plantData.care_instructions || {
                            light: 'Среднее освещение',
                            water: 'Умеренный полив',
                            temperature: '18-25°C',
                            soil: 'Универсальный грунт'
                        },
                        interesting_fact: plantData.interesting_fact || ''
                    },
                    raw_response: content,
                    timestamp: new Date().toISOString()
                };
            } else {
                return this.parseTextResponse(content);
            }
            
        } catch (error) {
            console.error('[GigaChat] Ошибка парсинга:', error);
            return this.demoAnalysis(null);
        }
    }
    
    parseTextResponse(text) {
        const nameMatch = text.match(/(?:растение|называется|это)[:\s]*([^\n.,!?]+)/i);
        const familyMatch = text.match(/(?:семейство|family)[:\s]*([^\n.,!?]+)/i);
        
        return {
            success: true,
            provider: 'Sber GigaChat AI (текстовый анализ)',
            plant: {
                name: nameMatch ? nameMatch[1].trim() : 'Растение',
                scientific_name: '',
                family: familyMatch ? familyMatch[1].trim() : 'Не определено',
                confidence: 0.7,
                characteristics: ['Определено с помощью нейросети'],
                care: {
                    light: 'Среднее освещение',
                    water: 'Полив по мере подсыхания',
                    temperature: '18-25°C',
                    soil: 'Универсальный грунт'
                },
                interesting_fact: 'Проанализировано промышленной нейросетью'
            },
            raw_response: text,
            timestamp: new Date().toISOString()
        };
    }
    
    demoAnalysis(imageFile) {
        const plants = [
            {
                name: 'Одуванчик обыкновенный',
                scientific_name: 'Taraxacum officinale',
                family: 'Астровые',
                confidence: 0.94,
                characteristics: ['Многолетнее травянистое', 'Желтые цветки', 'Лекарственное растение'],
                care: {
                    light: 'Яркое солнце',
                    water: 'Умеренный полив',
                    temperature: '15-25°C',
                    soil: 'Любая почва'
                },
                interesting_fact: 'Все части растения съедобны'
            },
            {
                name: 'Роза садовая',
                scientific_name: 'Rosa',
                family: 'Розовые',
                confidence: 0.92,
                characteristics: ['Кустарник с шипами', 'Ароматные цветки', 'Декоративное растение'],
                care: {
                    light: 'Полное солнце',
                    water: 'Регулярный полив',
                    temperature: '20-28°C',
                    soil: 'Плодородная, дренированная'
                },
                interesting_fact: 'Символ любви и красоты'
            },
            {
                name: 'Кактус',
                scientific_name: 'Cactaceae',
                family: 'Кактусовые',
                confidence: 0.96,
                characteristics: ['Суккулент', 'Колючки', 'Засухоустойчивый'],
                care: {
                    light: 'Прямое солнце',
                    water: 'Редкий полив',
                    temperature: '20-35°C',
                    soil: 'Песчаная, дренированная'
                },
                interesting_fact: 'Накапливает воду в стеблях'
            }
        ];
        
        const randomPlant = plants[Math.floor(Math.random() * plants.length)];
        
        return {
            success: true,
            provider: 'Локальный алгоритм (демо)',
            plant: randomPlant,
            timestamp: new Date().toISOString(),
            demo: true
        };
    }
    
    async testConnection() {
        try {
            if (GIGACHAT_CONFIG.demoMode) {
                return { connected: true, message: 'Демо-режим активен' };
            }
            
            await this.getAccessToken();
            return { 
                connected: this.isConnected, 
                message: this.isConnected ? '✅ Подключено к GigaChat' : '❌ Ошибка подключения'
            };
        } catch (error) {
            return { 
                connected: false, 
                message: '❌ Ошибка: ' + error.message 
            };
        }
    }
    
    toggleAIMode() {
        this.aiMode = !this.aiMode;
        return this.aiMode;
    }
}

// ===================== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====================
let sberAI = null;
const plantAI = new SberGigaChatAI();

// DOM элементы
const fileInput = document.getElementById('fileInput');
const selectFileBtn = document.getElementById('selectFileBtn');
const uploadArea = document.getElementById('uploadArea');
const uploadProgress = document.getElementById('uploadProgress');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const progressStatusText = document.getElementById('progressStatusText');
const resultCard = document.getElementById('resultCard');
const plantName = document.getElementById('plantName');
const plantCareText = document.getElementById('plantCareText');
const plantConfidence = document.getElementById('plantConfidence');
const aiSource = document.getElementById('aiSource');
const lightInfo = document.getElementById('lightInfo');
const waterInfo = document.getElementById('waterInfo');
const tempInfo = document.getElementById('tempInfo');
const familyInfo = document.getElementById('familyInfo');
const soilInfo = document.getElementById('soilInfo');
const plantExtraInfo = document.getElementById('plantExtraInfo');
const aiModeSwitch = document.getElementById('aiMode');
const aiModeStatus = document.getElementById('aiModeStatus');
const aiStatusElement = document.getElementById('aiStatus');
const aiStatusText = document.getElementById('aiStatusText');
const refreshBtn = document.getElementById('refreshBtn');

// ===================== ОСНОВНЫЕ ФУНКЦИИ =====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getIconByType(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Автоудаление
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Закрытие
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

function getIconByType(type) {
    const icons = { success: 'check-circle', error: 'exclamation-circle', warning: 'exclamation-triangle', info: 'info-circle' };
    return icons[type] || 'info-circle';
}

function updateAIStatus(status) {
    if (!aiStatusElement || !aiStatusText) return;
    
    if (status === 'connected') {
        aiStatusText.textContent = 'Нейросеть активна';
        aiStatusElement.style.background = 'linear-gradient(135deg, #1a3a1a, #2d5a2d)';
    } else if (status === 'demo') {
        aiStatusText.textContent = 'Демо-режим';
        aiStatusElement.style.background = 'linear-gradient(135deg, #666, #444)';
    } else {
        aiStatusText.textContent = 'Подключение...';
        aiStatusElement.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
    }
}

async function initAI() {
    console.log('🚀 Инициализация нейросети...');
    updateAIStatus('connecting');
    
    try {
        const connection = await plantAI.testConnection();
        
        if (connection.connected) {
            showNotification('✅ Нейросеть GigaChat подключена', 'success');
            updateAIStatus('connected');
            
            if (aiModeStatus) {
                aiModeStatus.textContent = 'Sber GigaChat';
            }
        } else {
            showNotification('⚠️ Использую демо-режим', 'warning');
            updateAIStatus('demo');
            
            if (aiModeStatus) {
                aiModeStatus.textContent = 'Локальный режим';
            }
        }
        
        console.log('AI статус:', connection.message);
        return connection.connected;
        
    } catch (error) {
        console.error('Ошибка инициализации AI:', error);
        showNotification('❌ Ошибка подключения к AI', 'error');
        updateAIStatus('demo');
        return false;
    }
}

function initFileUpload() {
    // Клик по кнопке
    selectFileBtn.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Клик по области
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Drag & Drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#2ecc71';
        uploadArea.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#e0e0e0';
        uploadArea.style.backgroundColor = '#f8f9fa';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e0e0e0';
        uploadArea.style.backgroundColor = '#f8f9fa';
        
        if (e.dataTransfer.files.length > 0) {
            handleImageFile(e.dataTransfer.files[0]);
        }
    });
    
    // Обработка выбора файла
    fileInput.addEventListener('change', (e) => {
        if (fileInput.files.length > 0) {
            handleImageFile(fileInput.files[0]);
        }
    });
}

async function handleImageFile(file) {
    // Проверка файла
    if (!file.type.match('image.*')) {
        showNotification('Пожалуйста, выберите изображение (JPG, PNG)', 'error');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
        showNotification('Изображение слишком большое (максимум 10MB)', 'error');
        return;
    }
    
    // Показываем прогресс
    uploadProgress.style.display = 'block';
    resultCard.style.display = 'none';
    progressFill.style.width = '0%';
    progressPercent.textContent = '0%';
    progressStatusText.textContent = 'Подготовка изображения...';
    
    let progress = 0;
    const interval = setInterval(() => {
        if (progress < 50) {
            progress += 2;
            progressFill.style.width = progress + '%';
            progressPercent.textContent = progress + '%';
        }
    }, 50);
    
    try {
        // Анализ изображения
        progressStatusText.textContent = 'Анализ нейросетью...';
        
        const result = await plantAI.analyzePlantImage(file);
        
        clearInterval(interval);
        progressFill.style.width = '100%';
        progressPercent.textContent = '100%';
        
        // Задержка для плавности
        setTimeout(() => {
            uploadProgress.style.display = 'none';
            displayResult(result);
            
            if (result.success) {
                showNotification(`✅ Определено: ${result.plant.name}`, 'success');
            }
        }, 500);
        
    } catch (error) {
        clearInterval(interval);
        console.error('Ошибка обработки:', error);
        showNotification('Ошибка при анализе изображения', 'error');
        uploadProgress.style.display = 'none';
    }
}

function displayResult(result) {
    if (!result || !result.success) {
        showNotification('Не удалось определить растение', 'error');
        return;
    }
    
    const plant = result.plant;
    
    // Обновляем UI
    plantName.textContent = plant.name;
    plantCareText.textContent = 
        `${plant.care.light}. ${plant.care.water}. ${plant.care.temperature}. ` +
        `${plant.interesting_fact || ''}`;
    
    plantConfidence.innerHTML = `Точность: <strong>${Math.round(plant.confidence * 100)}%</strong> | <span id="aiSource">${result.provider}</span>`;
    
    lightInfo.textContent = plant.care.light;
    waterInfo.textContent = plant.care.water;
    tempInfo.textContent = plant.care.temperature;
    
    // Дополнительная информация
    if (familyInfo) familyInfo.textContent = plant.family;
    if (soilInfo) soilInfo.textContent = plant.care.soil;
    if (plantExtraInfo) plantExtraInfo.style.display = 'grid';
    
    // Показываем карточку с анимацией
    resultCard.style.display = 'block';
    resultCard.style.opacity = '0';
    resultCard.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultCard.style.transition = 'all 0.5s ease';
        resultCard.style.opacity = '1';
        resultCard.style.transform = 'translateY(0)';
    }, 100);
}

function updateSensors() {
    // Обновляем показания датчиков случайными значениями
    if (document.getElementById('lightSensor')) {
        const light = Math.floor(Math.random() * 500) + 800;
        document.getElementById('lightSensor').innerHTML = `${light} <span class="unit">люкс (lux)</span>`;
    }
    
    if (document.getElementById('tempSensor')) {
        const temp = Math.floor(Math.random() * 10) + 18;
        document.getElementById('tempSensor').innerHTML = `${temp}°C <span class="unit">°C</span>`;
    }
    
    if (document.getElementById('airHumiditySensor')) {
        const humidity = Math.floor(Math.random() * 20) + 50;
        document.getElementById('airHumiditySensor').innerHTML = `${humidity}% <span class="unit">относительная</span>`;
    }
    
    if (document.getElementById('nutrientsSensor')) {
        const nutrients = Math.floor(Math.random() * 20) + 70;
        document.getElementById('nutrientsSensor').innerHTML = `${nutrients}% <span class="unit">уровень</span>`;
    }
    
    // Обновляем влажность почвы
    if (document.getElementById('humidityValue') && document.getElementById('currentHumidity')) {
        const soilHumidity = Math.floor(Math.random() * 30) + 40;
        document.getElementById('humidityValue').textContent = `${soilHumidity}%`;
        document.getElementById('currentHumidity').textContent = `${soilHumidity}%`;
        
        // Обновляем статус
        const statusElement = document.getElementById('humidityStatus');
        if (statusElement) {
            if (soilHumidity < 40) {
                statusElement.textContent = 'Сухо';
                statusElement.style.color = '#e74c3c';
            } else if (soilHumidity < 70) {
                statusElement.textContent = 'Идеально';
                statusElement.style.color = '#2ecc71';
            } else {
                statusElement.textContent = 'Влажно';
                statusElement.style.color = '#3498db';
            }
        }
    }
    
    showNotification('Показания датчиков обновлены', 'success');
}

// ===================== ИНИЦИАЛИЗАЦИЯ =====================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌿 HelpingPlantsAI System');
    console.log('==============================');
    
    // Обновляем год в футере
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = `© ${new Date().getFullYear()} HelpingPlantsAI`;
    }
    
    // Инициализируем нейросеть
    await initAI();
    
    // Инициализируем загрузку файлов
    initFileUpload();
    
    // Инициализируем переключатель AI режима
    if (aiModeSwitch) {
        aiModeSwitch.addEventListener('change', function() {
            const isEnabled = this.checked;
            plantAI.aiMode = isEnabled;
            
            if (aiModeStatus) {
                aiModeStatus.textContent = isEnabled ? 'Sber GigaChat' : 'Локальный режим';
            }
            
            showNotification(`Режим ИИ: ${isEnabled ? 'Включен (GigaChat)' : 'Выключен (локальный)'}`, 'info');
        });
    }
    
    // Кнопка обновления показаний
    if (refreshBtn) {
        refreshBtn.addEventListener('click', updateSensors);
    }
    
    // Автоматическое обновление датчиков каждые 30 секунд
    setInterval(updateSensors, 30000);
    
    // Обновляем датчики при загрузке
    updateSensors();
    
    console.log('✅ Система инициализирована');
});

// Экспорт для отладки
window.PlantAI = plantAI;
window.showNotification = showNotification;
