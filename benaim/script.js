document.addEventListener('DOMContentLoaded', () => {
    // Initialize new features
    const ctaButton = document.querySelector('.cta-button');
    const featureCards = document.querySelectorAll('.feature-card');

    // Add CTA Button functionality
    ctaButton.addEventListener('click', () => {
        alert('תודה על התעניינותך! נציג יצור איתך קשר בהקדם.');
    });

    // Add hover effects for feature cards
    featureCards.forEach(card => {
        const icon = card.querySelector('.card-icon');
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.color = '#ff914d';
        });
        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0)';
            icon.style.color = '#00b4d8';
        });
    });

    // Initialize iframe content
    const iframe = document.getElementById('landing-page-frame');
    const template = document.getElementById('iframe-content');
    
    // Write content to iframe
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(`
        <!DOCTYPE html>
        <html lang="he" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
            <style>${document.querySelector('link').innerText}</style>
        </head>
        <body>
            ${template.innerHTML}
        </body>
        </html>
    `);
    iframe.contentWindow.document.close();

    // Get iframe document
    const iframeDoc = iframe.contentWindow.document;

    // Classes Data
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

    // Testimonials Data
    const testimonials = [
        { text: "החוגים ב-DafGym שינו את חיי בתי. היא התפתחה פיזית ומנטלית!", author: "רונית, אמא לילדה בת 8" },
        { text: "המדריכים מקצועיים ומסורים. ממליץ בחום!", author: "אבי, אבא לשני ילדים" },
        { text: "האווירה בחוגים נהדרת. בתי מצפה לכל שיעור!", author: "מיכל, אמא לילדה בת 10" },
        { text: "ההתקדמות של בני מדהימה. תודה לצוות המקצועי!", author: "דני, אבא לילד בן 7" },
        { text: "החוגים פיתחו אצל בתי בטחון עצמי וכושר גופני", author: "שרה, אמא לילדה בת 12" },
        { text: "המאמנים נהדרים ומעניקים יחס אישי לכל ילד", author: "יעל, אמא לשני ילדים" }
    ];

    // Initialize Classes Grid
    const classGrid = iframeDoc.getElementById('class-grid');
    classes.forEach(cls => {
        const classCard = iframeDoc.createElement('div');
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

    // Gallery Functionality
    let galleryImages = iframeDoc.querySelectorAll('.gallery-image img');
    const prevImageBtn = iframeDoc.getElementById('prev-image');
    const nextImageBtn = iframeDoc.getElementById('next-image');
    const imageCounter = iframeDoc.getElementById('image-counter');
    let currentImageIndex = 0;
    let isEditing = false;

    function showImages(startIndex) {
        galleryImages.forEach((img, index) => {
            if (index >= startIndex && index < startIndex + 3) {
                img.parentElement.style.display = 'block';
            } else {
                img.parentElement.style.display = 'none';
            }
        });
        imageCounter.textContent = `${Math.ceil((startIndex + 1) / 3)} / ${Math.ceil(galleryImages.length / 3)}`;
    }

    function updateGallery() {
        galleryImages = iframeDoc.querySelectorAll('.gallery-image img');
        showImages(currentImageIndex);
    }

    showImages(currentImageIndex);

    prevImageBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 3 + galleryImages.length) % galleryImages.length;
        showImages(currentImageIndex);
    });

    nextImageBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 3) % galleryImages.length;
        showImages(currentImageIndex);
    });

    setInterval(() => {
        if (!isEditing) {
            currentImageIndex = (currentImageIndex + 3) % galleryImages.length;
            showImages(currentImageIndex);
        }
    }, 5000);

    // Schedule Table
    const scheduleTable = iframeDoc.getElementById('schedule-table');
    const toggleScheduleBtn = iframeDoc.getElementById('toggle-schedule');
    
    function initializeScheduleTable() {
        const tableHeader = `
            <tr>
                <th>קבוצה</th>
                <th>יום</th>
                <th>שעה</th>
                <th>מחיר</th>
            </tr>
        `;

        const tableRows = classes.map(cls => `
            <tr>
                <td>${cls.name}</td>
                <td>${cls.day}</td>
                <td>${cls.time}</td>
                <td>₪${cls.price}</td>
            </tr>
        `).join('');

        scheduleTable.innerHTML = tableHeader + tableRows;
    }

    initializeScheduleTable();

    toggleScheduleBtn.addEventListener('click', () => {
        scheduleTable.classList.toggle('hidden');
        toggleScheduleBtn.textContent = scheduleTable.classList.contains('hidden') ? 
            'הצג פירוט מלא' : 'הסתר פירוט מלא';
    });

    // Testimonials Slider
    let currentTestimonial = 0;
    const testimonialSlider = iframeDoc.querySelector('.testimonial-slider');
    const prevTestimonialBtn = iframeDoc.getElementById('prev-testimonial');
    const nextTestimonialBtn = iframeDoc.getElementById('next-testimonial');
    const testimonialCounter = iframeDoc.getElementById('testimonial-counter');

    function showTestimonial() {
        testimonialSlider.innerHTML = `
            <div class="testimonial">
                <p>"${testimonials[currentTestimonial].text}"</p>
                <p class="author">- ${testimonials[currentTestimonial].author}</p>
            </div>
        `;
        testimonialCounter.textContent = `${currentTestimonial + 1} / ${testimonials.length}`;
    }

    showTestimonial();

    prevTestimonialBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial();
    });

    nextTestimonialBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial();
    });

    // Image Upload Functionality
    function handleImageUpload(input, imgElement) {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    imgElement.src = event.target.result;
                    if (imgElement.classList.contains('profile-icon')) {
                        imgElement.style.backgroundImage = `url(${event.target.result})`;
                        imgElement.style.backgroundSize = 'cover';
                        imgElement.innerHTML = '';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Logo Upload
    const logoUpload = iframeDoc.getElementById('logo-upload');
    const logoImg = iframeDoc.getElementById('logo');
    
    if (logoImg) {
        logoImg.addEventListener('click', () => {
            logoUpload.click();
        });
        handleImageUpload(logoUpload, logoImg);
    }

    // Team Member Images
    const teamMembers = [
        { uploadId: 'daphna-upload', iconId: 'daphna-icon' },
        { uploadId: 'coach1-upload', iconId: 'coach1-icon' },
        { uploadId: 'coach2-upload', iconId: 'coach2-icon' }
    ];

    teamMembers.forEach(member => {
        const input = iframeDoc.getElementById(member.uploadId);
        const icon = iframeDoc.getElementById(member.iconId);
        
        if (icon) {
            icon.addEventListener('click', () => {
                input.click();
            });
            handleImageUpload(input, icon);
        }
    });

    // Gallery Image Uploads
    galleryImages.forEach((img, index) => {
        const input = iframeDoc.getElementById(`gallery-upload-${index + 1}`);
        if (input) {
            img.addEventListener('click', () => {
                input.click();
            });
            handleImageUpload(input, img);
        }
    });

    // Registration Form Handling
    iframeDoc.querySelectorAll('.btn[data-plan]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const plan = button.getAttribute('data-plan');
            alert(`תודה על התעניינותך במסלול ${plan}. נציג יצור איתך קשר בהקדם.`);
        });
    });

    // Contact Form
    const contactForm = iframeDoc.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('תודה על פנייתך! נחזור אליך בהקדם.');
            contactForm.reset();
        });
    }

    // Smooth Scroll Navigation
    iframeDoc.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href');
            iframeDoc.querySelector(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active Section Highlighting
    const sections = iframeDoc.querySelectorAll('section');
    const navLinks = iframeDoc.querySelectorAll('.nav-link');

    iframe.contentWindow.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (iframe.contentWindow.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});