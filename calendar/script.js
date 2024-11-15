document.addEventListener('DOMContentLoaded', () => {
    // Elements References - Calendar & Sidebars
    const calendarBody = document.getElementById('calendar-body');
    const addEventButton = document.getElementById('add-event');
    const navItems = document.querySelectorAll('.nav-item');

    // Top Bar Elements - Updated
    const currentPeriodElement = document.getElementById('current-period');
    const prevPeriodButton = document.getElementById('prev-period');
    const nextPeriodButton = document.getElementById('next-period');
    const viewSelector = document.getElementById('view-selector');
    const todayButton = document.getElementById('today-button');
    const calendarViewButton = document.getElementById('calendar-view');
    const gridViewButton = document.getElementById('grid-view');
    const searchField = document.getElementById('search-field');

    // Popup Elements
    const addEventPopup = document.getElementById('popup');
    const eventDetailsPopup = document.getElementById('event-details-popup');
    const popupOverlay = document.getElementById('popupOverlay');
    const approveButton = document.getElementById('approveButton');
    const closeButtons = document.querySelectorAll('.close, .close-btn');
    
    // Constants
    const hebrewDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const hebrewMonths = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

    // State
    let currentDate = new Date();
    let currentView = 'month';
    let isCalendarView = true;
    let campaignState = {
        'facebook-organic': { approved: false, posts: 3, stories: 4 },
        'instagram-organic': { approved: false, posts: 3, stories: 5 },
        'paid': { approved: false, budget: 450 }
    };

    // Calendar Rendering Functions
    function renderCalendar() {
        if (isCalendarView) {
            calendarBody.style.display = 'grid';
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
        // Add day headers
        hebrewDays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('day-of-week');
            dayHeader.textContent = day;
            calendarBody.appendChild(dayHeader);
        });

        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        // Fill in blank days at start
        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarBody.appendChild(document.createElement('div'));
        }
        
        // Create calendar days
        for (let date = 1; date <= lastDay.getDate(); date++) {
            const dayElement = createDayElement(date);
            calendarBody.appendChild(dayElement);
        }
    }

    function renderWeekView() {
        // Add day headers
        hebrewDays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('day-of-week');
            dayHeader.textContent = day;
            calendarBody.appendChild(dayHeader);
        });

        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());

        // Create week days
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

        const container = document.createElement('div');
        container.className = 'publications-grid';
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
        container.style.gap = '20px';
        container.style.padding = '20px';
        container.style.backgroundColor = '#f8f9fa';

        calendarBody.appendChild(container);
    }

    function createDayElement(date) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerHTML = `<span class="date">${date}</span>`;

        if (isToday(new Date(currentDate.getFullYear(), currentDate.getMonth(), date))) {
            dayElement.classList.add('today');
        }

        dayElement.addEventListener('click', () => selectDay(date));
        return dayElement;
    }

    // Popup Functions
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

    function closePopups() {
        if (addEventPopup) addEventPopup.style.display = 'none';
        if (eventDetailsPopup) eventDetailsPopup.style.display = 'none';
        if (popupOverlay) {
            popupOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Marketing Strategy Popup Functions
    window.openPopup = () => {
        if (popupOverlay) {
            popupOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closePopup = () => {
        if (popupOverlay) {
            popupOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Utility Functions
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

    // Marketing Campaign Functions
    window.updateQuantity = (type, change) => {
        const [platform, contentType] = type.split('-');
        const element = document.getElementById(`${type}-quantity`);
        let currentValue = parseInt(element.textContent);
        
        if (contentType === 'posts') {
            if ((currentValue + change) < 1 || (currentValue + change) > 8) return;
        } else if (contentType === 'stories') {
            if ((currentValue + change) < 0 || (currentValue + change) > 10) return;
        }

        currentValue += change;
        element.textContent = currentValue;
        
        campaignState[`${platform}-organic`][contentType] = currentValue;
    };

    window.updateBudget = (type, change) => {
        let currentBudget = campaignState.paid.budget;
        
        if ((currentBudget + change) < 200 || (currentBudget + change) > 1000) return;
        
        currentBudget += change;
        campaignState.paid.budget = currentBudget;
        
        const budgetElement = document.querySelector('.budget span');
        budgetElement.textContent = `${currentBudget} ₪ / חודש`;

        updateCampaignSummary(currentBudget);
    };

    function updateCampaignSummary(budget) {
        const summaryText = document.querySelector('.campaign-summary p');
        if (summaryText) {
            const updatedText = summaryText.textContent.replace(/\d+\s*ש"ח/, `${budget} ש"ח`);
            summaryText.textContent = updatedText;
        }
    }

    window.approveCampaign = (campaignId) => {
        const button = event.target;
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            campaignState[campaignId].approved = true;
            button.innerHTML = '<i class="fas fa-check"></i> מאושר';
            button.classList.add('approved');
            checkAllApprovals();
        }, 800);
    };

    window.approveStrategy = () => {
        if (!checkAllApprovals()) {
            alert('יש לאשר לפחות קמפיין אחד להמשך');
            return;
        }

        const button = approveButton;
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> מפעיל...';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i> הקמפיינים הופעלו!';
            showSuccessMessage();
        }, 1500);
    };

    function checkAllApprovals() {
        return Object.values(campaignState).some(state => state.approved);
    }

    function showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.style.cssText = `
            text-align: center;
            margin-top: 20px;
            padding: 15px;
            background-color: #34a853;
            color: white;
            border-radius: 8px;
        `;
        message.innerHTML = '<h4 style="margin: 0;">הקמפיינים הופעלו בהצלחה!</h4>';
        
        document.querySelector('.approval-section').appendChild(message);
        
        setTimeout(() => {
            closePopup();
            resetAllStates();
        }, 2000);
    }

    function resetAllStates() {
        campaignState = {
            'facebook-organic': { approved: false, posts: 3, stories: 4 },
            'instagram-organic': { approved: false, posts: 3, stories: 5 },
            'paid': { approved: false, budget: 450 }
        };

        const approveButtons = document.querySelectorAll('.approve-campaign-btn');
        if (approveButtons.length) {
            approveButtons.forEach(button => {
                button.disabled = false;
                button.innerHTML = 'אשר';
                button.classList.remove('approved');
            });
        }

        if (approveButton) {
            approveButton.disabled = false;
            approveButton.innerHTML = 'הפעל קמפיינים';
        }

        document.querySelectorAll('[id$="-quantity"]').forEach(element => {
            const [platform, type] = element.id.split('-');
            if (campaignState[`${platform}-organic`]) {
                element.textContent = campaignState[`${platform}-organic`][type];
            }
        });

        const budgetSpan = document.querySelector('.budget span');
        if (budgetSpan) {
            budgetSpan.textContent = `${campaignState.paid.budget} ₪ / חודש`;
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
        if (e.target === addEventPopup || e.target === eventDetailsPopup || e.target === popupOverlay) {
            closePopups();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
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

    // Event Type Selection
    document.querySelectorAll('.event-type').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.event-type').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    // Platform Type Selection
    document.querySelectorAll('.platform-type').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.platform-type').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    // View Selector Dropdown
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

    // View Toggle
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

    // Navigation Items
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Filter Changes
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            renderCalendar();
        });
    });

    // Search functionality
    if (searchField) {
        searchField.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            // Implement search logic here
        });
    }

    // Prevent closing when clicking inside popup
    if (document.querySelector('.popup-content')) {
        document.querySelector('.popup-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Initialize
    renderCalendar();
    resetAllStates();
});