document.addEventListener('DOMContentLoaded', () => {
    // Top Section Feature Cards and CTA
    const ctaButton = document.querySelector('.cta-button');
    const featureCards = document.querySelectorAll('.feature-card');

    // Add hover effects for feature cards
    featureCards.forEach(card => {
        const icon = card.querySelector('.card-icon');
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.color = '#ff914d';
        });
        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0)';
            icon.style.color = '#ff69b4';
        });
    });

    // CTA Button functionality
    ctaButton?.addEventListener('click', () => {
        const registrationSection = document.getElementById('registration');
        registrationSection.scrollIntoView({ behavior: 'smooth' });
    });

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

    // Initialize Classes Grid
    const classGrid = document.getElementById('class-grid');
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

    // Gallery Functionality with Image Upload
    let currentImageIndex = 0;
    const galleryImages = document.querySelectorAll('.gallery-image');
    const prevImageBtn = document.getElementById('prev-image');
    const nextImageBtn = document.getElementById('next-image');
    const imageCounter = document.getElementById('image-counter');

    // Enhanced Gallery Image Upload
    galleryImages.forEach((galleryImage, index) => {
        const img = galleryImage.querySelector('img');
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        galleryImage.appendChild(input);

        img.addEventListener('click', () => {
            input.click();
        });

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    });

    function showImages() {
        galleryImages.forEach((img, index) => {
            img.style.display = index === currentImageIndex ? '1' : '0.5';
        });
        imageCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    }

    showImages();

    prevImageBtn?.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImages();
    });

    nextImageBtn?.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImages();
    });

    // Auto-rotate gallery every 5 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImages();
    }, 5000);

    // Schedule Table
    const scheduleTable = document.getElementById('schedule-table');
    const toggleScheduleBtn = document.getElementById('toggle-schedule');
    
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

    toggleScheduleBtn?.addEventListener('click', () => {
        scheduleTable.classList.toggle('hidden');
        toggleScheduleBtn.textContent = scheduleTable.classList.contains('hidden') ? 
            'הצג פירוט מלא' : 'הסתר פירוט מלא';
    });

    // Testimonials
    const testimonials = [
        { text: "החוגים ב-DafGym שינו את חיי בתי. היא התפתחה פיזית ומנטלית!", author: "רונית, אמא לילדה בת 8" },
        { text: "המדריכים מקצועיים ומסורים. ממליץ בחום!", author: "אבי, אבא לשני ילדים" },
        { text: "האווירה בחוגים נהדרת. בתי מצפה לכל שיעור!", author: "מיכל, אמא לילדה בת 10" },
        { text: "ההתקדמות של בני מדהימה. תודה לצוות המקצועי!", author: "דני, אבא לילד בן 7" },
        { text: "החוגים פיתחו אצל בתי בטחון עצמי וכושר גופני", author: "שרה, אמא לילדה בת 12" },
        { text: "המאמנים נהדרים ומעניקים יחס אישי לכל ילד", author: "יעל, אמא לשני ילדים" }
    ];

    let currentTestimonial = 0;
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const prevTestimonialBtn = document.getElementById('prev-testimonial');
    const nextTestimonialBtn = document.getElementById('next-testimonial');
    const testimonialCounter = document.getElementById('testimonial-counter');

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

    prevTestimonialBtn?.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial();
    });

    nextTestimonialBtn?.addEventListener('click', () => {
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
                    if (imgElement.tagName.toLowerCase() === 'img') {
                        imgElement.src = event.target.result;
                    } else {
                        imgElement.style.backgroundImage = `url(${event.target.result})`;
                        imgElement.style.backgroundSize = 'cover';
                        imgElement.style.backgroundPosition = 'center';
                        imgElement.innerHTML = '';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Logo Upload
    const logoUpload = document.getElementById('logo-upload');
    const logoImg = document.getElementById('logo');
    if (logoImg) {
        logoImg.addEventListener('click', () => logoUpload.click());
        handleImageUpload(logoUpload, logoImg);
    }

    // Team Member Images
    const teamMembers = [
        { uploadId: 'daphna-upload', iconId: 'daphna-icon' },
        { uploadId: 'coach1-upload', iconId: 'coach1-icon' },
        { uploadId: 'coach2-upload', iconId: 'coach2-icon' },
        { uploadId: 'coach3-upload', iconId: 'coach3-icon' }
    ];

    teamMembers.forEach(member => {
        const input = document.getElementById(member.uploadId);
        const icon = document.getElementById(member.iconId);
        if (icon && input) {
            icon.addEventListener('click', () => input.click());
            handleImageUpload(input, icon);
        }
    });

    // Registration Form Handling
    document.querySelectorAll('.btn[data-plan]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const plan = button.getAttribute('data-plan');
            alert(`תודה על התעניינותך במסלול ${plan}. נציג יצור איתך קשר בהקדם.`);
        });
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('תודה על פנייתך! נחזור אליך בהקדם.');
        contactForm.reset();
    });

    // Smooth Scroll Navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href');
            document.querySelector(sectionId)?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active Section Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 60) {
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