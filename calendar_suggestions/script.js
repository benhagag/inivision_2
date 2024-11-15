document.addEventListener('DOMContentLoaded', () => {
    // Elements References
    const calendarBody = document.getElementById('calendar-body');
    const currentPeriodElement = document.getElementById('current-period');
    const prevPeriodButton = document.getElementById('prev-period');
    const nextPeriodButton = document.getElementById('next-period');
    const viewSelector = document.getElementById('view-selector');
    const todayButton = document.getElementById('today-button');
    const calendarViewButton = document.getElementById('calendar-view');
    const gridViewButton = document.getElementById('grid-view');
    const addEventButton = document.getElementById('add-event');
    const navItems = document.querySelectorAll('.nav-item');

    // Popup Elements
    const addEventPopup = document.getElementById('popup');
    const eventDetailsPopup = document.getElementById('event-details-popup');
    const closeButtons = document.querySelectorAll('.close');
    const addEventForm = document.getElementById('add-event-form');
    
    // Constants
    const hebrewDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const hebrewMonths = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

    const hebrewHolidays = {
        '2024-04-22': 'פסח',
        '2024-05-14': 'יום העצמאות',
        '2024-06-11': 'שבועות',
        '2024-09-15': 'ראש השנה',
        '2024-09-24': 'יום כיפור',
        '2024-09-29': 'סוכות',
        '2024-12-25': 'חנוכה'
    };

    // State
    let currentDate = new Date(2024, 9, 1);
    let currentView = 'month';
    let isCalendarView = true;
    let approvedContent = new Set();

    // Publications Data
    const publications = [
        // 8 Posts
        { date: '2024-10-02', time: '10:00', platform: 'Facebook', type: 'Post', content: 'איך להתחיל את היום בצורה נכונה? טיפים מהמומחים שלנו 🌅'},
        { date: '2024-10-05', time: '12:00', platform: 'Facebook', type: 'Post', content: 'הכירו את המאמנים החדשים שלנו! צוות מקצועי ומסור 💪'},
        { date: '2024-10-08', time: '15:00', platform: 'Facebook', type: 'Post', content: 'השקת מסלול אימונים חדש - כוח וגמישות משולב'},
        { date: '2024-10-12', time: '11:00', platform: 'Facebook', type: 'Post', content: 'סיפורי הצלחה - לקוחות מספרים על השינוי שעברו'},
        { date: '2024-10-15', time: '14:00', platform: 'Instagram', type: 'Post', content: 'טיפים לתזונה נכונה לפני ואחרי אימון 🥗'},
        { date: '2024-10-19', time: '13:00', platform: 'Instagram', type: 'Post', content: '5 תרגילים פשוטים שאפשר לעשות בבית'},
        { date: '2024-10-23', time: '16:00', platform: 'Instagram', type: 'Post', content: 'חידושים במכון - ציוד חדש הגיע! 🎉'},
        { date: '2024-10-27', time: '09:00', platform: 'Instagram', type: 'Post', content: 'מתכון לשייק חלבון טעים במיוחד 🥤'},

        // 20 Stories
        { date: '2024-10-01', time: '08:30', platform: 'Instagram', type: 'Story', content: 'בוקר טוב! מתחילים יום חדש באנרגיות 🌞'},
        { date: '2024-10-01', time: '16:00', platform: 'Instagram', type: 'Story', content: 'שיעור יוגה מתחיל עוד שעה! מקומות אחרונים'},
        { date: '2024-10-02', time: '09:00', platform: 'Instagram', type: 'Story', content: 'טיפ היום: שתייה מרובה במהלך האימון'},
        { date: '2024-10-03', time: '14:00', platform: 'Instagram', type: 'Story', content: 'מאחורי הקלעים של צילומי הצוות החדשים'},
        { date: '2024-10-04', time: '11:30', platform: 'Instagram', type: 'Story', content: 'סקר: איזה שיעור חדש תרצו לראות במערכת?'},
        { date: '2024-10-05', time: '15:00', platform: 'Instagram', type: 'Story', content: 'הצצה לאימון כוח עם המאמן דני'},
        { date: '2024-10-07', time: '10:00', platform: 'Instagram', type: 'Story', content: 'התקדמות מרשימה של המתאמנת שלנו רותי'},
        { date: '2024-10-09', time: '13:00', platform: 'Instagram', type: 'Story', content: 'חדש! שיעורי ריצה קבוצתיים'},
        { date: '2024-10-11', time: '12:00', platform: 'Instagram', type: 'Story', content: 'טיפים לשיפור הגמישות מהמאמנת מיכל'},
        { date: '2024-10-13', time: '09:30', platform: 'Instagram', type: 'Story', content: 'אתגר השבוע: 100 סקוואטים ביום!'},
        { date: '2024-10-15', time: '16:30', platform: 'Instagram', type: 'Story', content: 'לייב עם המאמן - שאלות ותשובות'},
        { date: '2024-10-17', time: '11:00', platform: 'Instagram', type: 'Story', content: 'סדנת תזונה נכונה - נפתחה ההרשמה'},
        { date: '2024-10-19', time: '14:30', platform: 'Instagram', type: 'Story', content: 'שיעור פילאטיס מיוחד לגיל השלישי'},
        { date: '2024-10-21', time: '10:30', platform: 'Instagram', type: 'Story', content: 'הכנה לתחרות - טיפים ממתחרים ותיקים'},
        { date: '2024-10-23', time: '15:00', platform: 'Instagram', type: 'Story', content: 'סיור במתחם החדש שלנו'},
        { date: '2024-10-25', time: '12:30', platform: 'Instagram', type: 'Story', content: 'מתכונים בריאים לארוחת צהריים'},
        { date: '2024-10-27', time: '09:00', platform: 'Instagram', type: 'Story', content: 'אימון בוקר - שידור חי'},
        { date: '2024-10-29', time: '13:30', platform: 'Instagram', type: 'Story', content: 'טיפים להתמדה באימונים בחורף'},
        { date: '2024-10-30', time: '16:00', platform: 'Instagram', type: 'Story', content: 'הכירו את המתאמן המצטיין החודש'},
        { date: '2024-10-31', time: '11:00', platform: 'Instagram', type: 'Story', content: 'סיכום חודשי - הישגים ואתגרים'},

        // One Sponsored Campaign
        { startDate: '2024-10-01', endDate: '2024-10-21', platform: 'Facebook', type: 'Sponsored', content: 'מבצע סתיו חם! 20% הנחה על כל המנויים השנתיים 🍁 הצטרפו עכשיו ותתחילו להתאמן'}
    ];

    // הוספת מזהה ייחודי לכל פרסום
    publications.forEach(pub => {
        pub.id = Math.random().toString(36).substr(2, 9);
        pub.isApproved = false;
    });

    // פונקציות ניהול תוכן
    function handleApprove(contentId, element) {
        event.stopPropagation();
        if (confirm('האם אתה בטוח שברצונך לאשר תוכן זה?')) {
            approvedContent.add(contentId);
            if (element) {
                element.classList.add('approved');
                const approveButton = element.querySelector('.approve-button');
                if (approveButton) {
                    approveButton.textContent = 'אושר ✓';
                    approveButton.disabled = true;
                }
            }
            alert('התוכן אושר בהצלחה');
        }
    }

    function handleEdit(contentId) {
        event.stopPropagation();
        alert('פתיחת עורך התוכן');
    }

    function handleDelete(contentId, element) {
        event.stopPropagation();
        if (confirm('האם אתה בטוח שברצונך למחוק תוכן זה?')) {
            if (element) {
                element.remove();
            }
            approvedContent.delete(contentId);
            alert('התוכן נמחק בהצלחה');
            renderCalendar();
        }
    }

    function handleApproveAll() {
        if (confirm('האם אתה בטוח שברצונך לאשר ולפרסם את כל התכנים?')) {
            document.querySelectorAll('.content-card:not(.approved)').forEach(content => {
                const contentId = content.dataset.contentId;
                if (contentId) {
                    handleApprove(contentId, content);
                }
            });
        }
    }

function renderCalendar() {
        if (isCalendarView) {
            calendarBody.style.display = 'grid';
            const gridViewContent = document.getElementById('grid-view-content');
            if (gridViewContent) {
                gridViewContent.style.display = 'none';
            }
            
            calendarBody.innerHTML = '';
            calendarBody.classList.remove('day-view', 'week-view', 'month-view');
            calendarBody.classList.add(`${currentView}-view`);

            switch(currentView) {
                case 'month':
                    renderMonthView();
                    break;
                case 'week':
                    renderWeekView();
                    break;
                case 'day':
                    renderDayView();
                    break;
            }

            updateCurrentPeriod();
        } else {
            renderGridView();
        }
    }

    function renderMonthView() {
        hebrewDays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('day-of-week');
            dayHeader.textContent = day;
            calendarBody.appendChild(dayHeader);
        });

        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarBody.appendChild(document.createElement('div'));
        }
        
        for (let date = 1; date <= lastDay.getDate(); date++) {
            const dayElement = createDayElement(date);
            calendarBody.appendChild(dayElement);
        }
    }

    function renderWeekView() {
        hebrewDays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('day-of-week');
            dayHeader.textContent = day;
            calendarBody.appendChild(dayHeader);
        });

        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());

        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(weekStart);
            currentDay.setDate(weekStart.getDate() + i);
            const dayElement = createDayElement(currentDay.getDate());
            calendarBody.appendChild(dayElement);
        }
    }

    function renderDayView() {
        const dayElement = createDayElement(currentDate.getDate());
        dayElement.classList.add('day-view');
        calendarBody.appendChild(dayElement);
    }

    function renderGridView() {
        calendarBody.style.display = 'block';
        calendarBody.innerHTML = '';
        calendarBody.classList.remove('month-view', 'week-view', 'day-view');
        calendarBody.classList.add('grid-view');

        // כפתור אישור כללי
        const globalApprovalContainer = document.createElement('div');
        globalApprovalContainer.className = 'global-approval-container';
        globalApprovalContainer.innerHTML = `
            <button class="approve-all-button" onclick="handleApproveAll()">
                אישור ופרסום כללי
            </button>
        `;
        calendarBody.appendChild(globalApprovalContainer);

        const container = document.createElement('div');
        container.className = 'publications-grid';
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
        container.style.gap = '20px';
        container.style.padding = '20px';
        container.style.backgroundColor = '#f8f9fa';

        const filteredPublications = publications.filter(pub => {
            const platformChecked = document.getElementById(pub.platform.toLowerCase()).checked;
            const typeChecked = document.getElementById(pub.type.toLowerCase()).checked;
            return platformChecked && typeChecked;
        });

        const sortedPublications = filteredPublications.sort((a, b) => {
            const dateA = new Date(a.date || a.startDate);
            const dateB = new Date(b.date || b.startDate);
            return dateB - dateA;
        });

        sortedPublications.forEach(pub => {
            const card = document.createElement('div');
            card.className = 'content-card';
            if (approvedContent.has(pub.id)) {
                card.classList.add('approved');
            }
            card.dataset.contentId = pub.id;

            // כפתורי ניהול
            const managementButtons = document.createElement('div');
            managementButtons.className = 'management-buttons';
            managementButtons.innerHTML = `
                <button class="approve-button" onclick="handleApprove('${pub.id}', this.closest('.content-card'))"
                        ${approvedContent.has(pub.id) ? 'disabled' : ''}>
                    ${approvedContent.has(pub.id) ? 'אושר ✓' : 'אישור'}
                </button>
                <span class="separator">|</span>
                <button class="edit-button" onclick="handleEdit('${pub.id}')">שינוי</button>
                <span class="separator">|</span>
                <button class="delete-button" onclick="handleDelete('${pub.id}', this.closest('.content-card'))">מחיקה</button>
            `;
            card.appendChild(managementButtons);

            const icon = pub.platform === 'Facebook' ? '📘' : '📷';
            const header = document.createElement('div');
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.marginBottom = '10px';
            header.style.paddingBottom = '10px';
            header.style.borderBottom = '1px solid #eee';

            if (pub.type === 'Sponsored') {
                header.innerHTML = `
                    <span style="font-weight: bold; color: #ff9800">פרסום ממומן</span>
                    <span style="color: #666">${pub.platform}</span>
                `;
                card.innerHTML += `
                    <div style="margin: 10px 0; font-size: 0.9em; color: #666">
                        <div>תאריך התחלה: ${formatDate(new Date(pub.startDate))}</div>
                        <div>תאריך סיום: ${formatDate(new Date(pub.endDate))}</div>
                    </div>
                `;
            } else {
                header.innerHTML = `
                    <span style="font-weight: bold">${icon} ${pub.type}</span>
                    <span style="color: #666">${pub.platform}</span>
                `;
                card.innerHTML += `
                    <div style="margin: 10px 0; font-size: 0.9em; color: #666">
                        <div>${formatDate(new Date(pub.date))}</div>
                        <div>${pub.time}</div>
                    </div>
                `;
            }

            card.prepend(header);
            card.innerHTML += `<div style="margin-top: 10px">${pub.content}</div>`;

            card.onmouseenter = () => {
                card.style.transform = 'translateY(-2px)';
                card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            };
            card.onmouseleave = () => {
                card.style.transform = 'none';
                card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            };

            card.addEventListener('click', () => openEventDetailsPopup(pub));

            if (pub.platform === 'Facebook') {
                card.style.borderLeft = '4px solid #1877f2';
            } else {
                card.style.borderLeft = '4px solid #e4405f';
            }

            container.appendChild(card);
        });

        calendarBody.appendChild(container);
    }

    function createDayElement(date) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerHTML = `<span class="date">${date}</span>`;

        const currentDateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;

        if (hebrewHolidays[currentDateString]) {
            const holidayElement = document.createElement('div');
            holidayElement.classList.add('holiday');
            holidayElement.textContent = hebrewHolidays[currentDateString];
            dayElement.appendChild(holidayElement);
        }

        addPublicationsToDay(dayElement, currentDateString);

        if (isToday(new Date(currentDate.getFullYear(), currentDate.getMonth(), date))) {
            dayElement.classList.add('today');
        }

        dayElement.addEventListener('click', () => selectDay(date));
        return dayElement;
    }

    function addPublicationsToDay(dayElement, dateString) {
        const sponsoredPubs = publications.filter(pub => 
            pub.type === 'Sponsored' && 
            new Date(pub.startDate) <= new Date(dateString) && 
            new Date(pub.endDate) >= new Date(dateString)
        );

        const dayPubs = publications.filter(pub => 
            pub.type !== 'Sponsored' && 
            pub.date === dateString
        );

        const sortedPubs = [...sponsoredPubs, ...dayPubs].sort((a, b) => {
            if (a.type === 'Sponsored') return -1;
            if (b.type === 'Sponsored') return 1;
            return a.time.localeCompare(b.time);
        });

        sortedPubs.forEach(pub => {
            const pubElement = document.createElement('div');
            pubElement.classList.add('event-item', pub.platform.toLowerCase());

            if (pub.type === 'Sponsored') {
                pubElement.classList.add('sponsored');
                pubElement.textContent = `ממומן - ${pub.content.slice(0, 25)}...`;
            } else {
                pubElement.textContent = `${pub.time}, ${pub.type} - ${pub.content.slice(0, 20)}...`;
            }

            pubElement.addEventListener('click', (e) => {
                e.stopPropagation();
                openEventDetailsPopup(pub);
            });

            dayElement.appendChild(pubElement);
        });
    }

    function openAddEventPopup() {
        if (addEventPopup) {
            addEventPopup.style.display = 'block';
            const dateField = document.getElementById('event-date');
            const titleField = document.getElementById('event-title');
            if (dateField) dateField.value = formatDate(currentDate);
            if (titleField) titleField.value = '';
            
            document.querySelectorAll('.event-type, .platform-type').forEach(button => {
                button.classList.remove('selected');
            });
        }
    }

function openEventDetailsPopup(event) {
    if (eventDetailsPopup) {
        const titleElement = eventDetailsPopup.querySelector('#event-details-title');
        const contentElement = eventDetailsPopup.querySelector('#event-details-content');

        // בדיקת קיום כפתורי הניהול והוספה במידת הצורך
        if (!eventDetailsPopup.querySelector('.management-buttons')) {
            const managementButtons = document.createElement('div');
            managementButtons.className = 'management-buttons';
            managementButtons.innerHTML = `
                <button class="approve-button" onclick="handleApprove('${event.id}')"
                        ${approvedContent.has(event.id) ? 'disabled' : ''}>
                    ${approvedContent.has(event.id) ? 'אושר ✓' : 'אישור'}
                </button>
                <span class="separator">|</span>
                <button class="edit-button" onclick="handleEdit('${event.id}')">שינוי</button>
                <span class="separator">|</span>
                <button class="delete-button" onclick="handleDelete('${event.id}')">מחיקה</button>
            `;
            const popupContent = eventDetailsPopup.querySelector('.popup-content');
            popupContent.insertBefore(managementButtons, popupContent.firstChild);
        }

        if (titleElement && contentElement) {
                if (event.type === 'Sponsored') {
                    titleElement.textContent = 'פרסום ממומן';
                    contentElement.innerHTML = `
                        <p><strong>תאריך התחלה:</strong> ${formatDate(new Date(event.startDate))}</p>
                        <p><strong>תאריך סיום:</strong> ${formatDate(new Date(event.endDate))}</p>
                        <p><strong>פלטפורמה:</strong> ${event.platform}</p>
                        <p><strong>תוכן:</strong> ${event.content}</p>

                        <div class="campaign-results">
                            <h4>תוצאות הקמפיין</h4>
                            <p><strong>חשיפות:</strong> 12,345</p>
                            <p><strong>קליקים:</strong> 678</p>
                            <p><strong>אינטראקציות:</strong> 45</p>
                        </div>

                        <div class="ab-testing">
                            <h4>תוצאות A/B טסטינג</h4>
                            <p><strong>גרסה A:</strong> 5% CTR</p>
                            <p><strong>גרסה B:</strong> 7% CTR</p>
                            <p><strong>מסקנה:</strong> גרסה B השיגה תוצאות טובות יותר.</p>
                        </div>

                        <div class="recommendations">
                            <h4>המלצות לשיפור</h4>
                            <p>בהתאם לנתוני הקמפיין, מומלץ לשלב יותר תוכן ויזואלי בגרסה הבאה.</p>
                        </div>
                    `;
                } else {
                    titleElement.textContent = `${event.type} - ${event.platform}`;
                    contentElement.innerHTML = `
                        <p><strong>תאריך:</strong> ${formatDate(new Date(event.date))}</p>
                        <p><strong>שעה:</strong> ${event.time}</p>
                        <p><strong>תוכן:</strong> ${event.content}</p>
                    `;
                }
            }
            eventDetailsPopup.style.display = 'block';
        }
    }

    function closePopups() {
        if (addEventPopup) addEventPopup.style.display = 'none';
        if (eventDetailsPopup) {
            const managementButtons = eventDetailsPopup.querySelector('.management-buttons');
            if (managementButtons) {
                managementButtons.remove();
            }
            eventDetailsPopup.style.display = 'none';
        }
    }

function formatDate(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    function isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    function selectDay(day) {
        currentDate.setDate(day);
        renderCalendar();
    }

    function updateCurrentPeriod() {
        if (currentView === 'month') {
            currentPeriodElement.textContent = `${hebrewMonths[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        } else if (currentView === 'week') {
            const weekStart = new Date(currentDate);
            weekStart.setDate(currentDate.getDate() - currentDate.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            currentPeriodElement.textContent = `${weekStart.getDate()} - ${weekEnd.getDate()} ${hebrewMonths[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        } else {
            currentPeriodElement.textContent = `${currentDate.getDate()} ${hebrewMonths[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        }
    }

    // Event Listeners
    if (addEventButton) {
        addEventButton.addEventListener('click', (e) => {
            e.preventDefault();
            openAddEventPopup();
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closePopups);
    });

    window.addEventListener('click', (e) => {
        if (e.target === addEventPopup || e.target === eventDetailsPopup) {
            closePopups();
        }
    });

    prevPeriodButton.addEventListener('click', () => {
        if (currentView === 'month') {
            currentDate.setMonth(currentDate.getMonth() - 1);
        } else if (currentView === 'week') {
            currentDate.setDate(currentDate.getDate() - 7);
        } else {
            currentDate.setDate(currentDate.getDate() - 1);
        }
        renderCalendar();
    });

    nextPeriodButton.addEventListener('click', () => {
        if (currentView === 'month') {
            currentDate.setMonth(currentDate.getMonth() + 1);
        } else if (currentView === 'week') {
            currentDate.setDate(currentDate.getDate() + 7);
        } else {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        renderCalendar();
    });

    todayButton.addEventListener('click', () => {
        currentDate = new Date();
        renderCalendar();
    });

    document.querySelectorAll('.event-type').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.event-type').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    document.querySelectorAll('.platform-type').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.platform-type').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    viewSelector.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdownContent = document.querySelector('.dropdown-content');
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    document.querySelectorAll('.dropdown-content a').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentView = e.target.getAttribute('data-view');
            viewSelector.textContent = e.target.textContent;
            document.querySelector('.dropdown-content').style.display = 'none';
            renderCalendar();
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.matches('#view-selector') && !e.target.closest('.dropdown-content')) {
            document.querySelector('.dropdown-content').style.display = 'none';
        }
    });

    calendarViewButton.addEventListener('click', () => {
        isCalendarView = true;
        calendarViewButton.classList.add('active');
        gridViewButton.classList.remove('active');
        renderCalendar();
    });

    gridViewButton.addEventListener('click', () => {
        isCalendarView = false;
        gridViewButton.classList.add('active');
        calendarViewButton.classList.remove('active');
        renderCalendar();
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
        });
    });

    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            renderCalendar();
        });
    });

    // Initialize functions
    function approveRecommendation() {
        alert("ההמלצות אושרו ויושמו בקמפיין הבא.");
    }

    function ignoreRecommendation() {
        alert("ההמלצות לא יושמו.");
    }

    // Initialize calendar
    renderCalendar();
});
