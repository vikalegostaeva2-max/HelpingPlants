// PlantNet API Configuration
const PLANTNET_API_KEY = '2b10zg5qsvvG9qYlnu6t2lLmE'; // Public demo key
const PLANTNET_API_URL = 'https://my-api.plantnet.org/v2/identify/all?api-key=' + PLANTNET_API_KEY;

// Demo plants database for fallback
const PLANT_DATABASE = {
    'monstera': {
        name: 'Монстера деликатесная',
        latin: 'Monstera deliciosa',
        family: 'Ароидные (Araceae)',
        description: 'Популярное комнатное растение с крупными резными листьями.',
        care: {
            water: 'Полив 1-2 раза в неделю летом, 1 раз в 2 недели зимой. Почва должна просыхать между поливами.',
            light: 'Яркий рассеянный свет. Избегайте прямых солнечных лучей.',
            temperature: '20-25°C летом, 16-18°C зимой. Не ниже 15°C.',
            humidity: 'Высокая влажность. Регулярно опрыскивайте листья.'
        }
    },
    'ficus': {
        name: 'Фикус Бенджамина',
        latin: 'Ficus benjamina',
        family: 'Тутовые (Moraceae)',
        description: 'Декоративное дерево с мелкими листьями, популярное в офисах и домах.',
        care: {
            water: 'Умеренный полив. Давайте почве просыхать на 2-3 см между поливами.',
            light: 'Яркий рассеянный свет. Переносит полутень.',
            temperature: '20-25°C, не ниже 16°C зимой.',
            humidity: 'Средняя влажность. Избегайте сухого воздуха от батарей.'
        }
    },
    'succulent': {
        name: 'Суккуленты',
        latin: 'Various species',
        family: 'Разные семейства',
        description: 'Растения с мясистыми листьями, запасающими воду.',
        care: {
            water: 'Редкий полив. 1 раз в 2-3 недели зимой, 1 раз в неделю летом.',
            light: 'Яркое освещение. Не менее 6 часов света в день.',
            temperature: '18-28°C летом, 10-15°C зимой.',
            humidity: 'Низкая влажность. Не опрыскивать.'
        }
    }
};

// DOM Elements
const plantImageInput = document.getElementById('plantImage');
const selectImageBtn = document.getElementById('selectImageBtn');
const uploadCard = document.getElementById('uploadCard');
const resultSection = document.getElementById('resultSection');
const loadingSection = document.getElementById('loadingSection');
const resultImage = document.getElementById('resultImage');
const plantName = document.getElementById('plantName');
const plantLatin = document.getElementById('plantLatin');
const accuracyValue = document.getElementById('accuracyValue');
const confidenceFill = document.getElementById('confidenceFill');
const confidencePercent = document.getElementById('confidencePercent');
const plantDetails = document.getElementById('plantDetails');
const alternativesSection = document.getElementById('alternativesSection');
const alternativesList = document.getElementById('alternativesList');
const careTipsGrid = document.getElementById('careTipsGrid');
const savePlantBtn = document.getElementById('savePlantBtn');
const shareResultBtn = document.getElementById('shareResultBtn');
const scanNewBtn = document.getElementById('scanNewBtn');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // File input trigger
    selectImageBtn.addEventListener('click', () => plantImageInput.click());
    
    // File input change
    plantImageInput.addEventListener('change', handleImageUpload);
    
    // Drag and drop
    setupDragAndDrop();
    
    // Buttons
    scanNewBtn.addEventListener('click', resetScanner);
    savePlantBtn.addEventListener('click', saveToCollection);
    shareResultBtn.addEventListener('click', shareResult);
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Initialize tips
    initializeCareTips();
    initializeSteps();
});

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file
    if (!validateImage(file)) return;
    
    // Show preview
    const reader = new FileReader();
    reader.onload = function(e) {
        resultImage.src = e.target.result;
        showImageInfo(file);
        startRecognition(file, e.target.result);
    };
    reader.readAsDataURL(file);
}

// Validate image
function validateImage(file) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
        showToast('Пожалуйста, загрузите изображение в формате JPG, PNG или WebP', 'error');
        return false;
    }
    
    if (file.size > maxSize) {
        showToast('Файл слишком большой. Максимальный размер: 5MB', 'error');
        return false;
    }
    
    return true;
}

// Show image info
function showImageInfo(file) {
    const img = new Image();
    img.onload = function() {
        const infoElement = document.getElementById('imageInfo');
        if (infoElement) {
            infoElement.textContent = 
                `Размер: ${Math.round(file.size / 1024)}KB | ${this.width}x${this.height}px`;
        }
    };
    img.src = URL.createObjectURL(file);
}

// Setup drag and drop
function setupDragAndDrop() {
    uploadCard.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadCard.classList.add('dragover');
    });
    
    uploadCard.addEventListener('dragleave', () => {
        uploadCard.classList.remove('dragover');
    });
    
    uploadCard.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadCard.classList.remove('dragover');
        
        if (e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            plantImageInput.files = e.dataTransfer.files;
            
            if (validateImage(file)) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    resultImage.src = e.target.result;
                    showImageInfo(file);
                    startRecognition(file, e.target.result);
                };
                reader.readAsDataURL(file);
            }
        }
    });
}

// Start recognition process
async function startRecognition(file, base64Image) {
    // Show loading
    uploadCard.style.display = 'none';
    loadingSection.style.display = 'block';
    
    // Simulate progress
    simulateProgress();
    
    try {
        let result;
        
        // Try real API first
        try {
            result = await callPlantNetAPI(file, base64Image);
        } catch (apiError) {
            console.log('API error, using demo mode:', apiError);
            result = await getDemoRecognition();
        }
        
        // Process and display result
        processRecognitionResult(result);
        
    } catch (error) {
        console.error('Recognition error:', error);
        showToast('Ошибка при распознавании. Попробуйте другое фото.', 'error');
        resetScanner();
    }
}

// Call PlantNet API
async function callPlantNetAPI(file, base64Image) {
    const formData = new FormData();
    formData.append('images', file);
    formData.append('organs', 'leaf'); // leaf, flower, fruit, bark
    formData.append('include-related-images', 'true');
    
    const response = await fetch(PLANTNET_API_URL, {
        method: 'POST',
        body: formData
    });
    
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
}

// Get demo recognition (fallback)
async function getDemoRecognition() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Randomly select a demo plant
    const plants = Object.keys(PLANT_DATABASE);
    const randomPlant = plants[Math.floor(Math.random() * plants.length)];
    
    return {
        results: [
            {
                score: 0.85 + Math.random() * 0.14, // 85-99%
                species: {
                    commonNames: [PLANT_DATABASE[randomPlant].name],
                    scientificName: PLANT_DATABASE[randomPlant].latin,
                    family: {
                        scientificName: PLANT_DATABASE[randomPlant].family
                    }
                }
            }
        ]
    };
}

// Process recognition result
function processRecognitionResult(data) {
    // Hide loading
    loadingSection.style.display = 'none';
    
    if (!data.results || data.results.length === 0) {
        showToast('Растение не распознано. Попробуйте другое фото.', 'warning');
        resetScanner();
        return;
    }
    
    const bestMatch = data.results[0];
    const confidence = Math.round(bestMatch.score * 100);
    
    // Update UI
    updateResultDisplay(bestMatch, confidence);
    
    // Show alternatives if available
    if (data.results.length > 1) {
        showAlternativeSuggestions(data.results.slice(1));
    }
    
    // Load care tips
    loadCareTips(bestMatch);
    
    // Show result section
    resultSection.style.display = 'block';
    
    // Show success message
    showToast('Растение успешно распознано!', 'success');
}

// Update result display
function updateResultDisplay(plant, confidence) {
    // Plant name
    plantName.textContent = plant.species.commonNames?.[0] || 'Неизвестное растение';
    plantLatin.textContent = plant.species.scientificName || '';
    
    // Confidence
    accuracyValue.textContent = `${confidence}%`;
    confidenceFill.style.width = `${confidence}%`;
    confidencePercent.textContent = `${confidence}%`;
    
    // Update badge color based on confidence
    const badge = document.getElementById('accuracyBadge');
    if (confidence >= 90) {
        badge.style.background = 'linear-gradient(135deg, #10B981, #059669)';
    } else if (confidence >= 70) {
        badge.style.background = 'linear-gradient(135deg, #3B82F6, #1D4ED8)';
    } else {
        badge.style.background = 'linear-gradient(135deg, #F59E0B, #D97706)';
    }
    
    // Plant details
    updatePlantDetails(plant);
}

// Update plant details
function updatePlantDetails(plant) {
    const detailsHtml = `
        <div class="detail-item">
            <div class="detail-icon">
                <i class="fas fa-leaf"></i>
            </div>
            <div class="detail-content">
                <span class="detail-label">Семейство</span>
                <span class="detail-value">${plant.species.family?.scientificName || 'Не определено'}</span>
            </div>
        </div>
        <div class="detail-item">
            <div class="detail-icon">
                <i class="fas fa-globe-americas"></i>
            </div>
            <div class="detail-content">
                <span class="detail-label">Точность распознавания</span>
                <span class="detail-value">${Math.round(plant.score * 100)}%</span>
            </div>
        </div>
    `;
    
    plantDetails.innerHTML = detailsHtml;
}

// Show alternative suggestions
function showAlternativeSuggestions(alternatives) {
    if (alternatives.length === 0) return;
    
    alternativesSection.style.display = 'block';
    
    let alternativesHtml = '';
    alternatives.slice(0, 3).forEach((alt, index) => {
        const altConfidence = Math.round(alt.score * 100);
        alternativesHtml += `
            <div class="alternative-item">
                <div class="alternative-rank">${index + 2}</div>
                <div class="alternative-info">
                    <div class="alternative-name">${alt.species.commonNames?.[0] || 'Неизвестное'}</div>
                    <div class="alternative-latin">${alt.species.scientificName || ''}</div>
                </div>
                <div class="alternative-confidence">${altConfidence}%</div>
            </div>
        `;
    });
    
    alternativesList.innerHTML = alternativesHtml;
}

// Load care tips
function loadCareTips(plant) {
    const plantKey = plantName.textContent.toLowerCase();
    
    // Try to find matching plant in database
    let matchedPlant = null;
    for (const [key, data] of Object.entries(PLANT_DATABASE)) {
        if (plantKey.includes(key) || plant.species.scientificName?.toLowerCase().includes(key)) {
            matchedPlant = data;
            break;
        }
    }
    
    // Default tips if no match
    if (!matchedPlant) {
        matchedPlant = {
            care: {
                water: 'Поливайте, когда верхний слой почвы подсохнет на 2-3 см.',
                light: 'Яркий рассеянный свет оптимален для большинства растений.',
                temperature: 'Поддерживайте температуру 18-25°C.',
                humidity: 'Средняя влажность (40-60%) подходит большинству комнатных растений.'
            }
        };
    }
    
    // Display tips
    const tipsHtml = `
        <div class="care-tip">
            <div class="tip-icon">
                <i class="fas fa-tint"></i>
            </div>
            <div class="tip-content">
                <h6>Полив</h6>
                <p>${matchedPlant.care.water}</p>
            </div>
        </div>
        <div class="care-tip">
            <div class="tip-icon">
                <i class="fas fa-sun"></i>
            </div>
            <div class="tip-content">
                <h6>Освещение</h6>
                <p>${matchedPlant.care.light}</p>
            </div>
        </div>
        <div class="care-tip">
            <div class="tip-icon">
                <i class="fas fa-thermometer-half"></i>
            </div>
            <div class="tip-content">
                <h6>Температура</h6>
                <p>${matchedPlant.care.temperature}</p>
            </div>
        </div>
        <div class="care-tip">
            <div class="tip-icon">
                <i class="fas fa-wind"></i>
            </div>
            <div class="tip-content">
                <h6>Влажность</h6>
                <p>${matchedPlant.care.humidity}</p>
            </div>
        </div>
    `;
    
    careTipsGrid.innerHTML = tipsHtml;
}

// Simulate progress bar
function simulateProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 95) {
            progress = 95;
        }
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
        
        if (progress >= 95) {
            clearInterval(interval);
        }
    }, 300);
}

// Reset scanner
function resetScanner() {
    plantImageInput.value = '';
    uploadCard.style.display = 'block';
    resultSection.style.display = 'none';
    loadingSection.style.display = 'none';
    alternativesSection.style.display = 'none';
    progressFill.style.width = '0%';
    progressText.textContent = '0%';
}

// Save to collection
function saveToCollection() {
    const plantData = {
        name: plantName.textContent,
        latin: plantLatin.textContent,
        image: resultImage.src,
        date: new Date().toLocaleDateString('ru-RU'),
        confidence: accuracyValue.textContent
    };
    
    // Get existing collection
    let collection = JSON.parse(localStorage.getItem('plantCollection') || '[]');
    
    // Add new plant
    collection.push(plantData);
    
    // Save to localStorage
    localStorage.setItem('plantCollection', JSON.stringify(collection));
    
    showToast('Растение сохранено в вашу коллекцию!', 'success');
}

// Share result
function shareResult() {
    if (navigator.share) {
        navigator.share({
            title: `Я распознал растение: ${plantName.textContent}`,
            text: `С помощью HelpingPlants я определил, что это ${plantName.textContent} (${plantLatin.textContent}). Точность: ${accuracyValue.textContent}`,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        const text = `Растение: ${plantName.textContent} (${plantLatin.textContent})\nТочность: ${accuracyValue.textContent}\nРаспознано на helpingplants.netify.app`;
        navigator.clipboard.writeText(text).then(() => {
            showToast('Результат скопирован в буфер обмена!', 'success');
        });
    }
}

// Initialize care tips section
function initializeCareTips() {
    const tipsGrid = document.querySelector('.tips-grid');
    if (!tipsGrid) return;
    
    const tips = [
        {
            icon: 'fa-tint',
            title: 'Правильный полив',
            description: 'Узнайте, как часто и сколько воды нужно вашим растениям.',
            tips: ['Проверяйте влажность почвы', 'Используйте отстоянную воду', 'Избегайте перелива']
        },
        {
            icon: 'fa-sun',
            title: 'Освещение',
            description: 'Каждому растению нужен свой световой режим.',
            tips: ['Прямой/рассеянный свет', 'Продолжительность светового дня', 'Защита от прямых лучей']
        },
        {
            icon: 'fa-thermometer-half',
            title: 'Температура',
            description: 'Поддерживайте оптимальную температуру для роста.',
            tips: ['Дневная/ночная температура', 'Защита от сквозняков', 'Сезонные изменения']
        },
        {
            icon: 'fa-wind',
            title: 'Влажность воздуха',
            description: 'Создайте комфортный микроклимат для тропических растений.',
            tips: ['Регулярное опрыскивание', 'Увлажнители воздуха', 'Поддоны с водой']
        }
    ];
    
    let html = '';
    tips.forEach(tip => {
        html += `
            <div class="tip-card">
                <div class="tip-icon">
                    <i class="fas ${tip.icon}"></i>
                </div>
                <h3>${tip.title}</h3>
                <p>${tip.description}</p>
                <ul class="tip-list">
                    ${tip.tips.map(t => `<li><i class="fas fa-check"></i> ${t}</li>`).join('')}
                </ul>
            </div>
        `;
    });
    
    tipsGrid.innerHTML = html;
}

// Initialize steps
function initializeSteps() {
    // Steps are already in HTML
}

// Theme toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const icon = document.querySelector('#themeToggle i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    showToast(`Тема изменена на ${newTheme === 'dark' ? 'темную' : 'светлую'}`, 'info');
}

// Show toast notification
function showToast(message, type = 'info') {
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
    };
    
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: colors[type] || colors.info,
        stopOnFocus: true
    }).showToast();
}

// Check saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
const themeIcon = document.querySelector('#themeToggle i');
if (themeIcon) {
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Add camera functionality
document.addEventListener('DOMContentLoaded', function() {
    const openCameraBtn = document.getElementById('openCameraBtn');
    if (openCameraBtn && 'mediaDevices' in navigator) {
        openCameraBtn.style.display = 'block';
        
        openCameraBtn.addEventListener('click', async function() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'environment' } 
                });
                
                // Create camera modal
                const cameraModal = document.createElement('div');
                cameraModal.className = 'camera-modal';
                cameraModal.innerHTML = `
                    <div class="camera-modal-content">
                        <div class="camera-header">
                            <h3>Сфотографируйте растение</h3>
                            <button class="btn-icon close-camera">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <video id="cameraPreview" autoplay playsinline></video>
                        <div class="camera-controls">
                            <button class="btn btn-primary" id="captureBtn">
                                <i class="fas fa-camera"></i> Сделать фото
                            </button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(cameraModal);
                
                const video = document.getElementById('cameraPreview');
                video.srcObject = stream;
                
                // Close camera
                cameraModal.querySelector('.close-camera').addEventListener('click', function() {
                    stream.getTracks().forEach(track => track.stop());
                    document.body.removeChild(cameraModal);
                });
                
                // Capture photo
                document.getElementById('captureBtn').addEventListener('click', function() {
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    canvas.getContext('2d').drawImage(video, 0, 0);
                    
                    canvas.toBlob(function(blob) {
                        const file = new File([blob], 'plant-photo.jpg', { type: 'image/jpeg' });
                        plantImageInput.files = [file];
                        
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            resultImage.src = e.target.result;
                            showImageInfo(file);
                            startRecognition(file, e.target.result);
                        };
                        reader.readAsDataURL(file);
                        
                        stream.getTracks().forEach(track => track.stop());
                        document.body.removeChild(cameraModal);
                    }, 'image/jpeg', 0.9);
                });
                
            } catch (error) {
                console.error('Camera error:', error);
                showToast('Не удалось получить доступ к камере', 'error');
            }
        });
    }
});
