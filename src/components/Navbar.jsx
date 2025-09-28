import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import DefaultLogo from "../assets/logo-salymbekov-university-site2.png";
import ScrolledLogo  from "../assets/Logo_white3.png";
const Navbar = ({ currentLanguage, languages = [], changeLanguage }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [nestedMenu, setNestedMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const menuRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    if (currentLanguage && i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  // Обработчик изменения языка
  const handleLanguageChange = (langCode) => {
    if (changeLanguage) {
      // Если передана внешняя функция для изменения языка
      changeLanguage(langCode);
    } else {
      // Используем встроенную функцию i18n
      i18n.changeLanguage(langCode);
    }
    setIsLangOpen(false);
  };

  // Обработка клика вне меню
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
        setNestedMenu(null);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Эффект для отслеживания прокрутки
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Данные меню
  const menuData = {
    about: {
      title: t('nav.about'),
      submenu: [
        // { title: t('nav.about_university'), link: '/about' },
        { title: t('nav.founders'), link: '/about/founders' },
        { title: t('nav.mission'), link: '/about/mission' },
        { title: t('nav.management'), link: '/about/management' },
        { title: t('nav.structure'), link: '/about/structure' },
        { title: t('nav.status'), link: '/about/status' },
        { title: t('nav.regulations'), link: 'https://salymbekov.com/npa/' },
        { title: t('nav.advices'), link: '/about/advices' },
        { title: t('nav.achievements'), link: '/about/achievements' },
      ]
    },
    HSM: {
      title: t('nav.HSM'),
      submenu: [
        { title: t('nav.about_HSM'), link: '/hsm/about' },
        { title: t('nav.management'), link: '/hsm/manage' },
        { title: t('nav.programs'), link: '/hsm/programs' },
        // { title: t('nav.eduprograms'), link: '/hsm/eduprograms' },
        { title: t('nav.academic_stuff'), link: '/hsm/AS' },
        { title: t('nav.partners'), link: '/hsm/partners' },
        { title: t('nav.resources'), link: '/hsm/resources' },
        { title: t('nav.cmk'), link: '/hsm/cmk' },
        // { title: t('nav.learning_goals'), link: '/hsm/learning-goals' },
        // { title: t('nav.departments'), link: '/hsm/departments' },
      ]
    },
    student: {
      title: t('nav.student'),
      submenu: [
        { title: t('nav.instructions'), link: '/student/instructions' },
        // { title: t('nav.student_life'), link: '/student' },
        { title: t('nav.clubs'), link: '/student/clubs' },
        { title: t('nav.calendar'), link: '/student/calendar' },
        { title: t('nav.eresources'), link: '/student/eresources' },
        { title: t('nav.acadop'), link: '/student/acadop' },
        { title: t('nav.socop'), link: '/student/socop' },
        // { title: t('nav.gallery'), link: '/student/gallery' },
        // { title: t('nav.international'), link: '/student/international' },
        // { title: t('nav.internships'), link: '/student/internships' },
        // { title: t('nav.academic_mobility'), link: '/student/academic-mobility' },
        // { title: t('nav.appeal_form'), link: '/student/appeal' },
      ]
    },
    admission: {
      title: t('nav.admission'),
      submenu: [
        { title: t('nav.committee'), link: '/admissions/committee' },
        { title: t('nav.courses'), link: '/admissions/courses' },
        { title: t('nav.procedure'), link: '/admissions/procedure' },
        // { title: t('nav.payments'), link: '/admissions/payments' },
        { 
          title: t('nav.tuition'), 
          hasNested: true,
          nestedItems: [
            { title: t('nav.for_citizens_kg'), link: '/admissions/tuition/citizens-kg' },
            { title: t('nav.for_foreign_citizens'), link: '/admissions/tuition/foreign-citizens' },
          ]
        },
        { title: t('nav.partners'), link: '/hsm/partners' },
        // { 
        //   title: t('nav.for_applicants'), 
        //   hasNested: true,
        //   nestedItems: [
        //     { title: t('nav.for_citizens_kg'), link: '/admissions/applicants/citizens-kg' },
        //     { title: t('nav.for_foreign_citizens'), link: '/admissions/applicants/foreign-citizens' },
        //   ]
        // },
        // { 
        //   title: t('nav.requirements'), 
        //   hasNested: true,
        //   nestedItems: [
        //     { title: t('nav.for_citizens_kg'), link: '/admissions/requirements/citizens-kg' },
        //     { title: t('nav.for_foreign_citizens'), link: '/admissions/requirements/foreign-citizens' },
        //   ]
        // },
        // { 
        //   title: t('nav.apply_online'), 
        //   hasNested: true,
        //   nestedItems: [
        //     { title: t('nav.for_citizens_kg'), link: '/admissions/apply/citizens-kg' },
        //     { title: t('nav.for_foreign_citizens'), link: '/admissions/apply/foreign-citizens' },
        //   ]
        // },
        
      ]
    },
    research: {
      title: t('nav.research'),
      submenu: [
        { title: t('nav.management_body'), link: '/research/management' },
        { title: t('nav.scientific_journals'), link: '/research/journals' },
        { title: t('nav.publications'), link: '/research/publications' },
        { title: t('nav.grants'), link: '/research/grants' },
        // { title: t('nav.research_areas'), link: '/research' },
        // { title: t('nav.research_centers'), link: '/research/centers' },
        { title: t('nav.conferences'), link: '/research/conferences' },
      ]
    },
    infrastructure: {
      title: t('nav.infrastructure'),
      submenu: [
        { title: t('nav.hospitals'), link: '/infrastructure/hospitals' },
        { title: t('nav.laboratories'), link: '/infrastructure/laboratories' },
        { title: t('nav.audience'), link: '/infrastructure/audience' },
        { title: t('nav.startups'), link: '/infrastructure/startups' },
        // { title: t('nav.academic_buildings'), link: '/infrastructure/academic-buildings' },
        // { title: t('nav.dormitories'), link: '/infrastructure/dormitories' },
      ]
    },
    
    
    news: {
      title: t('nav.news'),
      submenu: [
        { title: t('nav.all_news'), link: '/news' },
        { title: t('nav.events'), link: '/news/events' },
        { title: t('nav.announcements'), link: '/news/announcements' },
      ]
    },
    contacts: {
      title: t('nav.contacts'),
      submenu: [
        { title: t('nav.contacts'), link: '/contacts' },
        { title: t('nav.vacancies'), link: '/about/vacancies' },
        { title: t('nav.media'), link: '/media' },
      ]
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white py-2' 
          : 'bg-gradient-to-r from-blue-900 to-blue-800 py-1'
      }`}
      ref={menuRef}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Логотип - левая часть */}
          <div className="flex-shrink-0">
      <a href="/" className="flex items-center group">
        <div
          className="h-14 px-3 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
        >
          <img
            src={isScrolled ? DefaultLogo : ScrolledLogo}
            alt="Logo"
            className="h-10 w-auto object-contain transition-opacity duration-300"
          />
        </div>
      </a>
    </div>


          {/* Центральное меню - скрыто на мобильных */}
          <div className="flex items-center space-x-6">
            <div className="hidden min-[1475px]:flex flex-1 justify-center">
              {Object.entries(menuData).map(([key, item]) => (
                <div 
                  key={key}
                  className="relative"
                  onMouseEnter={() => {
                    setActiveMenu(key);
                    setHoveredMenu(key);
                  }}
                  onMouseLeave={() => {
                    setHoveredMenu(null);
                    setTimeout(() => {
                      if (hoveredMenu !== key) {
                        setActiveMenu(null);
                        setNestedMenu(null);
                      }
                    }, 200);
                  }}
                >
                  <button
                    className={`relative px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 group ${
                      activeMenu === key
                        ? 'text-white bg-blue-600 shadow-lg'
                        : isScrolled
                          ? 'text-blue-800 hover:text-blue-600 hover:bg-blue-50'
                          : 'text-blue-100 hover:text-white hover:bg-blue-700/50'
                    }`}
                  >
                    <span className="relative z-10">{item.title}</span>
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isScrolled ? '' : 'group-hover:opacity-100'
                    }`}></div>
                    
                    {/* Индикатор при наведении */}
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-3/4 ${
                      activeMenu === key ? 'w-3/4' : ''
                    }`}></div>
                  </button>

                  {/* Выпадающее меню с анимацией */}
                  {activeMenu === key && (
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 mt-2 min-w-[16rem] rounded-xl shadow-2xl bg-white/95 backdrop-blur-md ring-1 ring-black/5 overflow-visible z-50 transition-all duration-300"
                      style={{ transformOrigin: 'top center' }}
                      onMouseEnter={() => setActiveMenu(key)}
                      onMouseLeave={() => {
                        setActiveMenu(null);
                        setNestedMenu(null);
                      }}
                    >
                      <div className="py-2">
                        {item.submenu.map((subItem, index) => (
                          <div
                            key={index}
                            className="relative"
                            onMouseEnter={() => {
                              if (subItem.hasNested) setNestedMenu(`${key}-${index}`);
                              else setNestedMenu(null);
                            }}
                            onMouseLeave={() => {
                              // безопасно сбрасываем только если это текущее nestedMenu
                              setNestedMenu(prev => (prev === `${key}-${index}` ? null : prev));
                            }}
                          >
                            <a
                              href={subItem.link}
                              className="flex justify-between items-center px-4 py-3 text-sm text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                            >
                              <span>{subItem.title}</span>
                              {subItem.hasNested && (
                                <svg
                                  className="h-4 w-4 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              )}
                            </a>

                            {/* вложенное меню */}
                            {subItem.hasNested && nestedMenu === `${key}-${index}` && (
                              <div
                                className="absolute left-full top-0 ml-[1px] w-56 rounded-xl shadow-2xl bg-white/95 backdrop-blur-md ring-1 ring-black/5 z-50 transition-all duration-200"
                                onMouseEnter={() => setNestedMenu(`${key}-${index}`)}
                                onMouseLeave={() => setNestedMenu(null)}
                              >
                                <div className="py-2">
                                  {subItem.nestedItems.map((nestedItem, nestedIndex) => (
                                    <a
                                      key={nestedIndex}
                                      href={nestedItem.link}
                                      className="block px-4 py-3 text-sm text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                                    >
                                      {nestedItem.title}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>

          {/* Правая часть: кнопка подачи заявки, язык и мобильное меню */}
          <div className="flex items-center space-x-3">
            {/* Кнопка подачи заявки - скрыта на мобильных */}
            <div className="hidden md:block">
              <a
                href="/admissions/apply"
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  isScrolled
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                    : 'bg-white text-blue-800 hover:bg-blue-50'
                }`}
              >
                {t('nav.apply')}
              </a>
            </div>
            
            {/* Переключатель языка */}
            <div className="relative" ref={langRef}>
              <LanguageSwitcher 
                variant={isScrolled ? 'outline' : 'default'}
                showText={true}
                onChange={handleLanguageChange}
                languages={languages}
                currentLanguage={currentLanguage}
              />
            </div>
            
            {/* Кнопка мобильного меню */}
            <div className="block min-[1475px]:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                  isScrolled 
                    ? 'text-blue-900 hover:bg-blue-100' 
                    : 'text-white hover:bg-white/20'
                } focus:outline-none backdrop-blur-sm`}
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильное меню с анимацией */}
      {isMenuOpen && (
        <div 
          className="block min-[1475px]:hidden bg-white/95 backdrop-blur-md shadow-xl transform transition-all duration-300 ease-out"
          style={{
            animation: 'slideDown 0.3s ease-out'
          }}
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            {/* Кнопка подачи заявки в мобильном меню */}
            <div className="md:hidden px-4 py-2">
              <a
                href="/admissions/apply"
                className="block w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold transition-all duration-300 hover:shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.apply')}
              </a>
            </div>
            
            {Object.entries(menuData).map(([key, item]) => (
              <div key={key} className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                  className={`w-full text-left flex justify-between items-center px-4 py-4 rounded-xl text-base font-semibold transition-colors duration-200 ${
                    activeMenu === key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-blue-900 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  {item.title}
                  <svg 
                    className={`h-5 w-5 transition-transform duration-300 ${activeMenu === key ? 'rotate-180' : ''}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {activeMenu === key && (
                  <div className="pl-6 mt-2 space-y-2 transition-all duration-300">
                    {item.submenu.map((subItem, index) => (
                      <div key={index}>
                        {subItem.hasNested ? (
                          <div>
                            <button
                              onClick={() => setNestedMenu(nestedMenu === `${key}-${index}` ? null : `${key}-${index}`)}
                              className="w-full text-left flex justify-between items-center px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                            >
                              {subItem.title}
                              <svg 
                                className={`h-4 w-4 transition-transform duration-300 ${nestedMenu === `${key}-${index}` ? 'rotate-90' : ''}`}
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>

                            {nestedMenu === `${key}-${index}` && (
                              <div className="pl-4 mt-1 space-y-1">
                                {subItem.nestedItems.map((nestedItem, nestedIndex) => (
                                  <a
                                    key={nestedIndex}
                                    href={nestedItem.link}
                                    className="block px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {nestedItem.title}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <a
                            href={subItem.link}
                            className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.title}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CSS анимации */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;