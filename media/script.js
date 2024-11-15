document.addEventListener('DOMContentLoaded', () => {
    // מצב המערכת
    const state = {
        currentImageId: null,
        notes: {},
        imageDescriptions: [
            {
                id: 1,
                description: "לוגו של DAFGYM המתאר מתעמלת בעמידת ידיים על רקע לבן עם טקסט בעברית 'התעמלות ואקרובטיקה'. עיצוב מינימליסטי ומדויק המשלב סגנון מקצועי עם נגיעות אקרובטיות.",
                quality: "טובה מאוד, לוגו ברור",
                usage: "מתאים לשימוש שיווקי כסטורי או כמודעה",
                tags: ["לוגו", "אקרובטיקה", "מיתוג"]
            },
            {
                id: 2,
                description: "ארבע מתעמלות מסודרות בפירמידה על מזרן כחול באולם, כאשר כל אחת נשענת על השנייה בצורה משחקית. הפרצופים שלהן מחייכים והאווירה היא של הנאה ושיתוף פעולה.",
                quality: "טובה, בהירה וחדה",
                usage: "מתאימה לסטורי ולפוסט חברתי",
                tags: ["חברות", "גיבוש", "מתעמלות"]
            },
            {
                id: 3,
                description: "קולאז' של מספר תמונות מתעמלות בצורות שונות: עמידת ידיים על החוף, גשר, פיצול ועוד. המרכז של הקולאז' כולל טקסט בצבע אדום - 'ספורט זה חיים!!!'. הרקע מגוון ומשלב נופים ביתיים וחיצוניים.",
                quality: "בינונית, קולאז' עשוי מעט צפוף",
                usage: "מתאים לסטורי או פוסט אווירתי",
                tags: ["חוף ים", "קולאז'", "גמישות"]
            },
            {
                id: 4,
                description: "מתעמלת צעירה בתנוחת גשר על מזרן כחול המונח בדשא, כאשר השמיים הצבעוניים משמשים כרקע עם עננים בגוונים של שקיעה. הרקע הטבעי מעניק לתמונה תחושה של רוגע ושלווה.",
                quality: "טובה מאוד, רקע טבעי מרשים",
                usage: "מתאימה לסטורי וגם לפוסט עם מסר של חיבור לטבע",
                tags: ["טבע", "שקיעה", "שלווה"]
            },
            {
                id: 5,
                description: "קבוצת מתעמלות בגילאים צעירים עומדות במבנה קבוצתי, כאשר שתיים מהן יושבות בפיצול במרכז ושאר הקבוצה עומדת מאחוריהן עם ידיים מורמות בהבעת שמחה. האווירה עליזה והצבעים של בגדי ההתעמלות בולטים על רקע אולם הספורט.",
                quality: "טובה מאוד, צבעים ברורים וחדות גבוהה",
                usage: "מתאימה בעיקר לפוסט קבוצתי",
                tags: ["קבוצה", "רוח צוות", "פיצול"]
            },
            {
                id: 6,
                description: "מתעמלת צעירה בעמידת ידיים ישרה ויציבה, נתמכת על ידי מאמן השוכב על המזרן ומחזיק אותה בידיו. הרקע הוא אולם ספורט עם מזרנים נוספים והמבנה מתאים לתנוחת אקרובטיקה.",
                quality: "טובה, מעט חשוכה אך ברורה",
                usage: "מתאימה לסטורי ולפוסט",
                tags: ["אקרובטיקה", "כוח", "מאמן"]
            },
            {
                id: 7,
                description: "ילדה מתעמלת בתנוחת גשר המוחזקת באוויר על ידי מאמן השוכב על הרצפה ומחייך. הילדה נראית שמחה ונהנית מהתרגיל, הרקע כולל מתעמלים נוספים המתאמנים באולם ספורט.",
                quality: "טובה, חדות טובה",
                usage: "מתאימה לסטורי ולפוסט",
                tags: ["תמיכה", "עבודת צוות", "גמישות"]
            },
            {
                id: 8,
                description: "ארבע מתעמלות מסודרות במבנה פירמידה על שתי קומות, כשהתחתונות מחזיקות את העליונות, כולן מחייכות ונהנות מהרגע. האווירה היא של גיבוש ואנרגיה חיובית.",
                quality: "טובה מאוד, צבעים מרהיבים",
                usage: "מתאים לסטורי או פוסט חברתי",
                tags: ["גיבוש", "תמיכה", "פירמידה"]
            },
            {
                id: 9,
                description: "ארבע ילדות מבצעות תרגיל שיווי משקל באולם התעמלות, כאשר שתיים עומדות על שתיים אחרות המחזיקות אותן בעמידה יציבה. התרגיל משדר איזון ותיאום בין כל המשתתפות.",
                quality: "טובה, בהירה וחדה",
                usage: "מתאים לסטורי קבוצתי",
                tags: ["איזון", "קבוצה", "מתעמלות"]
            },
            {
                id: 10,
                description: "קבוצת ילדים מבצעת תנוחות אקרובטיות שונות בשיעור התעמלות חוץ, כולם שוכבים על מזרנים ומבצעים תרגילים עם תמיכה הדדית. האווירה היא קלילה וחברותית, עם הרבה עצים מסביב.",
                quality: "טובה, צבעים חיים וברורים",
                usage: "מתאים לסטורי עם אופי קבוצתי",
                tags: ["אקרובטיקה", "ילדים", "חוץ"]
            },
            {
                id: 11,
                description: "פוסטר פרסומי של DAFGYM עם רקע של ים ומתעמלת בעמידת ידיים על סלע. כולל טקסט פרסומי לגבי פעילות המרכז ותמיכה במגוון גילאים.",
                quality: "טובה, טקסט ותמונה משתלבים היטב",
                usage: "מתאים לפוסט פרסומי",
                tags: ["פרסום", "חוף ים", "פעילות גופנית"]
            },
            {
                id: 12,
                description: "מתעמלת בעמידת ידיים מול שקיעה, כאשר השמש בוהקת ברקע. הדמות מצולמת בפרופיל כאשר היא מתוחה וזקופה מול האור הצהוב, מה שיוצר אפקט דרמטי.",
                quality: "טובה, עם שקיעה מרהיבה",
                usage: "מתאים לסטורי או פוסט השראה",
                tags: ["שקיעה", "השראה", "טבע"]
            },
            {
                id: 13,
                description: "צילום אמנותי בשחור-לבן של מתעמלת צעירה במדבר, מבצעת תנוחת גמישות עם רגל מורמת וידיים אוחזות בכף הרגל. הנוף המדברי ברקע יוצר תחושה של עוצמה ובידוד.",
                quality: "טובה מאוד, בשחור-לבן עם תאורה מחמיאה",
                usage: "מתאים לפוסט השראה או סטורי אמנותי",
                tags: ["אמנותי", "מדבר", "אקרובטיקה"]
            }
        ]
    };

  // DOM Elements
    const mediaGrid = document.getElementById('media-grid');
    const uploadButton = document.getElementById('upload-button');
    const fileInput = document.getElementById('file-input');
    const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
    const dateFilter = document.getElementById('date-filter');
    const navItems = document.querySelectorAll('.nav-item');

    // Notes Modal Elements
    const notesModal = document.getElementById('notes-modal');
    const notesInput = document.getElementById('notes-input');
    const notesImagePreview = document.getElementById('notes-image-preview');
    const saveNotesBtn = document.getElementById('save-notes');
    const closeModalBtn = document.querySelector('.close-btn');

  // Predefined images from your project (example)
    const projectImages = [
        'images/1.jpeg',
        'images/2.jpeg',
        'images/3.jpeg',
        'images/4.jpeg',
        'images/5.jpeg',
        'images/6.jpeg',
        'images/7.jpeg',
        'images/8.jpeg',
        'images/9.jpeg',
        'images/10.jpeg',
        'images/11.jpeg',
        'images/12.jpeg',
        'images/13.jpeg',
    ];

    // Upload Handler
    uploadButton.addEventListener('click', () => {
        // Automatically proceed with predefined images
        handleImageUpload();
    });

    // Function to handle predefined image upload
    function handleImageUpload() {
        
        mediaGrid.classList.remove('empty');
        mediaGrid.innerHTML = '';

        // Loop through the 13 images
        projectImages.forEach((imageUrl, index) => {
            const imageDescription = state.imageDescriptions[index];

            const card = document.createElement('div');
            card.className = 'media-card';
            card.dataset.imageId = imageDescription.id;

            // Add notes button
            const notesButton = `
                <button class="notes-btn" title="הוסף הערות">
                    <i class="fas fa-pencil-alt"></i>
                </button>
            `;

            // Check if there are existing notes for this image
            const currentDescription = state.notes[imageDescription.id] || imageDescription.description;

            card.innerHTML = `
                ${notesButton}
                <img src="${imageUrl}" alt="Image ${index + 1}" class="media-image">
                <div class="media-content">
                    <div class="media-description">${currentDescription}</div>
                    <div class="media-quality">איכות: ${imageDescription.quality}</div>
                    <div class="media-usage">שימוש: ${imageDescription.usage}</div>
                    <div class="media-tags">
                        ${imageDescription.tags.map(tag => `
                            <span class="tag">${tag}</span>
                        `).join('')}
                    </div>
                </div>
            `;

            // Add event listener for notes button
            const notesBtn = card.querySelector('.notes-btn');
            
            // Update button color if notes exist
            if (state.notes[imageDescription.id]) {
                const notesBtnIcon = notesBtn.querySelector('i');
                notesBtnIcon.style.color = '#34a853';
            }

            notesBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openNotesModal(imageUrl, imageDescription.id);
            });

            mediaGrid.appendChild(card);
        });
    }
    // Notes Modal Functions
    function openNotesModal(imageUrl, imageId) {
        state.currentImageId = imageId;
        notesImagePreview.src = imageUrl;
        
        // מציאת התיאור הנוכחי (הערות קיימות או תיאור מקורי)
        const imageDescription = state.imageDescriptions.find(desc => desc.id === imageId);
        const currentDescription = state.notes[imageId] || imageDescription.description;

        notesInput.value = currentDescription;
        notesModal.style.display = 'block';
        notesInput.focus();

        // מניעת גלילה ברקע
        document.body.style.overflow = 'hidden';
    }

    function closeNotesModal() {
        notesModal.style.display = 'none';
        state.currentImageId = null;
        notesInput.value = '';
        notesImagePreview.src = '';

        // החזרת הגלילה
        document.body.style.overflow = 'auto';
    }

    function saveNotes() {
        if (!state.currentImageId) return;

        const notes = notesInput.value.trim();
        const originalDescription = state.imageDescriptions.find(
            desc => desc.id === state.currentImageId
        ).description;
        
        const card = mediaGrid.querySelector(`[data-image-id="${state.currentImageId}"]`);
        const descriptionElement = card.querySelector('.media-description');
        const notesBtn = card.querySelector('.notes-btn i');

        // שמירת ההערות רק אם הן שונות מהתיאור המקורי
        if (notes && notes !== originalDescription) {
            state.notes[state.currentImageId] = notes;
            descriptionElement.textContent = notes; // עדכון התיאור בכרטיס
            notesBtn.style.color = '#34a853'; // צבע ירוק לציון שיש הערות
        } else if (notes === originalDescription || !notes) {
            // אם חזרנו לתיאור המקורי או שהשדה ריק
            delete state.notes[state.currentImageId];
            descriptionElement.textContent = originalDescription; // החזרת התיאור המקורי
            notesBtn.style.color = 'var(--primary-color)';
        }

        closeNotesModal();
    }

    // Event Listeners for Notes Modal
    saveNotesBtn.addEventListener('click', saveNotes);
    closeModalBtn.addEventListener('click', closeNotesModal);

    // סגירת המודל בלחיצה על הרקע
    notesModal.addEventListener('click', (e) => {
        if (e.target === notesModal) {
            closeNotesModal();
        }
    });

    // סגירת המודל עם מקש ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && notesModal.style.display === 'block') {
            closeNotesModal();
        }
    });

    // Navigation Handlers
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
        });

        item.addEventListener('touchstart', () => {
            const tooltip = item.querySelector('.tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
                
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                }, 1500);
            }
        });
    });

    // Screen Resize Handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth <= 768) {
                document.getElementById('right-column').style.maxHeight = '300px';
            } else {
                document.getElementById('right-column').style.maxHeight = 'none';
            }
        }, 250);
    });
});