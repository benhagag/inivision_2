document.addEventListener('DOMContentLoaded', () => {
    // נתונים קבועים
    const topics = [
        "בית - עמוד הבית של האתר, כולל מבוא קצר על העסק ותמונה מרכזית.",
        "אודותינו - מידע על העסק, ההיסטוריה שלו, הייחודיות והחזון.",
        "שירותים - פירוט על השירותים או המוצרים שהעסק מציע.",
        "חוגים/מוצרים - פירוט על החוגים השונים או המוצרים המובילים.",
        "לוח זמנים - זמני פעילות, שעות פתיחה, מועדי חוגים או פגישות.",
        "הצוות - פרופילים של הצוות, כולל תמונות ותיאור קצר על כל חבר צוות.",
        "לקוחות מספרים - המלצות ועדויות מלקוחות מרוצים.",
        "הרשמה - טופס להרשמה לחוגים, שירותים או לקבלת מידע נוסף.",
        "צור קשר - פרטי יצירת קשר, טופס ליצירת קשר, מפת הגעה.",
        "בלוג/חדשות - מאמרים, חדשות ועדכונים מהעסק."
    ];

    const defaultSelectedTopics = [
        "בית - עמוד הבית של האתר, כולל מבוא קצר על העסק ותמונה מרכזית.",
        "אודותינו - מידע על העסק, ההיסטוריה שלו, הייחודיות והחזון.",
        "שירותים - פירוט על השירותים או המוצרים שהעסק מציע.",
        "צור קשר - פרטי יצירת קשר, טופס ליצירת קשר, מפת הגעה.",
        "לוח זמנים - זמני פעילות, שעות פתיחה, מועדי חוגים או פגישות."
    ];

    const classes = [
        { name: '4-5', day: 'ג', time: '17:00-17:45', price: 200, icon: 'child' },
        { name: 'חובה-א\'-ב\'', day: 'א\',ג\'', time: '16:00-17:00', price: 285, icon: 'child' },
        { name: 'א-ב', day: 'א\',ג\'', time: '15:00-16:00', price: 285, icon: 'child' },
        { name: 'ב-ד', day: 'א,ג', time: '14:00-15:00', price: 285, icon: 'child' },
        { name: 'ה\' ומעלה', day: 'א\'', time: '17:00-18:00', price: 285, icon: 'running' },
        { name: 'ה\' ומעלה', day: 'ג\'', time: '18:00-19:00', price: 285, icon: 'running' },
        { name: 'נינג\'ה בנים', day: 'ד\'', time: '14:00-15:00', price: 220, icon: 'user-ninja' },
        { name: 'כח וגמישות', day: 'ד\'', time: '15:15-16:00', price: 200, icon: 'dumbbell' },
        { name: 'עתודה (בוגרות)', day: 'ד', time: '16:15-18:00', price: 150, icon: 'medal' },
        { name: 'עתודה ג\'', day: 'ג\'', time: '16:15-17:30', price: 150, icon: 'medal' },
        { name: 'אפרוחיות', day: 'ד', time: '14:00-15:15', price: 105, icon: 'feather' },
        { name: 'פירמידות', day: 'ד', time: '15:15-16:15', price: 75, icon: 'monument' }
    ];

    const testimonials = [
        { text: "החוגים ב-DafGym שינו את חיי בתי. היא התפתחה פיזית ומנטלית!", author: "רונית, אמא לילדה בת 8" },
        { text: "המדריכים מקצועיים ומסורים. ממליץ בחום!", author: "אבי, אבא לשני ילדים" },
        { text: "האווירה בחוגים נהדרת. בתי מצפה לכל שיעור!", author: "מיכל, אמא לילדה בת 10" },
        { text: "ההתקדמות של בני מדהימה. תודה לצוות המקצועי!", author: "דני, אבא לילד בן 7" },
        { text: "החוגים פיתחו אצל בתי בטחון עצמי וכושר גופני", author: "שרה, אמא לילדה בת 12" }
    ];

    // משתנים גלובליים
    let currentTestimonialIndex = 0;
    let currentImageIndex = 0;
    let galleryInterval;

    // פונקציות עזר
    function renderTopics() {
        const topicList = document.getElementById('topic-list');
        topicList.innerHTML = '';
        
        topics.forEach(topic => {
            const topicItem = document.createElement('div');
            topicItem.className = 'topic-item';
            if (defaultSelectedTopics.includes(topic)) {
                topicItem.classList.add('selected');
            }
            
            topicItem.innerHTML = `<span class="topic-title">${topic}</span>`;
            
            topicItem.addEventListener('click', () => {
                topicItem.classList.toggle('selected');
                updateGenerateButton();
            });
            
            topicList.appendChild(topicItem);
        });
    }

    function updateGenerateButton() {
        const selectedCount = document.querySelectorAll('.topic-item.selected').length;
        const generateButton = document.getElementById('generate-landing-page');
        generateButton.disabled = selectedCount < 5 || selectedCount > 10;
    }

    function renderClasses() {
        const classGrid = document.querySelector('.class-grid');
        classGrid.innerHTML = '';

        classes.forEach(cls => {
            const classCard = document.createElement('div');
            classCard.className = 'class-card';
            classCard.innerHTML = `
                <i class="fas fa-${cls.icon}"></i>
                <h3>${cls.name}</h3>
                <p>יום: ${cls.day}</p>
                <p>שעה: ${cls.time}</p>
                <p>מחיר: ₪${cls.price}</p>
            `;
            classGrid.appendChild(classCard);
        });
    }

    function renderSchedule() {
        const scheduleTable = document.getElementById('schedule-table');
        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>קבוצה</th>
                        <th>יום</th>
                        <th>שעה</th>
                        <th>מחיר</th>
                    </tr>
                </thead>
                <tbody>
        `;

        classes.forEach(cls => {
            tableHTML += `
                <tr>
                    <td>${cls.name}</td>
                    <td>${cls.day}</td>
                    <td>${cls.time}</td>
                    <td>₪${cls.price}</td>
                </tr>
            `;
        });

        tableHTML += '</tbody></table>';
        scheduleTable.innerHTML = tableHTML;
    }

    function updateTestimonial() {
        const slider = document.querySelector('.testimonial-slider');
        const counter = document.getElementById('testimonial-counter');
        
        slider.innerHTML = `
            <div class="testimonial">
                <p>"${testimonials[currentTestimonialIndex].text}"</p>
                <p class="author">- ${testimonials[currentTestimonialIndex].author}</p>
            </div>
        `;
        counter.textContent = `${currentTestimonialIndex + 1} / ${testimonials.length}`;
    }

    function updateGallery() {
        const images = document.querySelectorAll('.gallery-image');
        const counter = document.getElementById('image-counter');
        
        images.forEach((img, index) => {
            img.style.display = index === currentImageIndex ? 'block' : 'none';
        });
        
        counter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    }

    function startGalleryAutoplay() {
        if (galleryInterval) clearInterval(galleryInterval);
        
        galleryInterval = setInterval(() => {
            const images = document.querySelectorAll('.gallery-image');
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateGallery();
        }, 5000);
    }

    // אירועי לחיצה וניהול הדף
    document.getElementById('generate-landing-page').addEventListener('click', () => {
        const processingMessage = document.getElementById('processing-message');
        processingMessage.style.display = 'block';
        
        setTimeout(() => {
            processingMessage.style.display = 'none';
            const selectedTopics = Array.from(document.querySelectorAll('.topic-item.selected'))
                .map(item => item.querySelector('.topic-title').textContent);
            alert('דף הנחיתה עודכן בהצלחה!');
        }, 1500);
    });

    document.getElementById('toggle-schedule').addEventListener('click', function() {
        const scheduleTable = document.getElementById('schedule-table');
        scheduleTable.classList.toggle('hidden');
        this.textContent = scheduleTable.classList.contains('hidden') ? 'הצג פירוט מלא' : 'הסתר פירוט מלא';
    });

    document.getElementById('prev-testimonial').addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    });

    document.getElementById('next-testimonial').addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        updateTestimonial();
    });

    document.getElementById('prev-image').addEventListener('click', () => {
        const images = document.querySelectorAll('.gallery-image');
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGallery();
        startGalleryAutoplay();
    });

    document.getElementById('next-image').addEventListener('click', () => {
        const images = document.querySelectorAll('.gallery-image');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGallery();
        startGalleryAutoplay();
    });

    // ניהול העלאת תמונות
    function handleImageUpload(input, imgElement) {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    imgElement.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // העלאת לוגו
    const logoUpload = document.getElementById('logo-upload');
    const logoImg = document.getElementById('logo');
    handleImageUpload(logoUpload, logoImg);

    // העלאת תמונות גלריה
    document.querySelectorAll('.gallery-image img').forEach((img, index) => {
        const uploadId = `gallery-upload-${index + 1}`;
        const upload = document.getElementById(uploadId);
        
        handleImageUpload(upload, img);
        img.addEventListener('click', () => {
            upload.click();
        });
    });

    // העלאת תמונות צוות
    const teamImageUploads = [
        { inputId: 'daphna-upload', iconId: 'daphna-icon' },
        { inputId: 'coach1-upload', iconId: 'coach1-icon' },
        { inputId: 'coach2-upload', iconId: 'coach2-icon' },
        { inputId: 'coach3-upload', iconId: 'coach3-icon' }
    ];

    teamImageUploads.forEach(upload => {
        const input = document.getElementById(upload.inputId);
        const icon = document.getElementById(upload.iconId);
        
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    icon.style.backgroundImage = `url(${event.target.result})`;
                    icon.style.backgroundSize = 'cover';
                    icon.style.backgroundPosition = 'center';
                    icon.innerHTML = '';
                };
                reader.readAsDataURL(file);
            }
        });
    });

    // אתחול הדף
    function initializePage() {
        renderTopics();
        renderClasses();
        renderSchedule();
        updateTestimonial();
        updateGallery();
        startGalleryAutoplay();
        updateGenerateButton();
    }

    // ניווט בתפריט הצד
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(navItem => {
                navItem.classList.remove('active');
            });
            item.classList.add('active');
        });
    });

    // אתחול הדף
    initializePage();
});