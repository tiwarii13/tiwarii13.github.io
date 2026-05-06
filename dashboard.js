const defaultSections = {
    0: 'day1-overview',
    1: 'day2-overview',
    2: 'day3-overview',
    3: 'day4-overview',
    4: 'day5-overview'
};

const lastSections = { ...defaultSections };
let activeDay = 0;
const dayOrder = [0, 1, 2, 3, 4];

function renderDayTemplates() {
    const content = document.getElementById('dashboard-content');

    if (!content) {
        return;
    }

    content.innerHTML = dayOrder
        .map((dayIndex) => window.dashboardTemplates?.[dayIndex] || '')
        .join('\n');
}

function revealSection(section) {
    if (!section) {
        return;
    }

    section.classList.remove('section-reveal');
    void section.offsetWidth;
    section.classList.add('section-reveal');
}

function applySection(dayIndex, sectionId) {
    let activeSection = null;

    document.querySelectorAll('.day-view').forEach((view) => {
        const isActiveDay = Number(view.dataset.day) === dayIndex;
        view.classList.toggle('active', isActiveDay);

        view.querySelectorAll('.section').forEach((section) => {
            const isActiveSection = isActiveDay && section.id === sectionId;
            section.classList.toggle('active', isActiveSection);

            if (isActiveSection) {
                activeSection = section;
            }
        });
    });

    document.querySelectorAll('.day-subtabs').forEach((tabs) => {
        const isActiveDay = Number(tabs.dataset.day) === dayIndex;
        tabs.classList.toggle('active', isActiveDay);

        tabs.querySelectorAll('.sub-tab').forEach((tab) => {
            tab.classList.toggle('active', isActiveDay && tab.dataset.section === sectionId);
        });
    });

    revealSection(activeSection);
}

function switchDay(index) {
    activeDay = index;

    document.querySelectorAll('.tab').forEach((tab, tabIndex) => {
        tab.classList.toggle('active', tabIndex === index);
    });

    applySection(index, lastSections[index] || defaultSections[index]);
}

function switchSection(sectionId) {
    lastSections[activeDay] = sectionId;
    applySection(activeDay, sectionId);
}

window.switchDay = switchDay;
window.switchSection = switchSection;

document.addEventListener('DOMContentLoaded', () => {
    renderDayTemplates();
    switchDay(0);
});
