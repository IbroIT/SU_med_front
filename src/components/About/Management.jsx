import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';

const Management = () => {
  const { t } = useTranslation();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const organizationData = {
    id: 'rector',
    name: 'Салымбековский университет',
    type: 'administration',
    head: 'Салымбеков Адилхан',
    position: 'Ректор',
    email: 'rector@salymbekov.kg',
    phone: '+996 312 625-100',
    experience: '25 лет',
    education: 'Доктор медицинских наук',
    bio: 'Основатель университета, ведущий кардиолог Кыргызстана',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    achievements: [
      'Автор более 150 научных публикаций',
      'Заслуженный деятель науки КР',
      'Основатель 3 медицинских центров'
    ],
    children: [
      {
        id: 'academic',
        name: 'Учебная работа',
        type: 'administration',
        head: 'Петров Петр Петрович',
        position: 'Проректор по учебной работе',
        email: 'academic@salymbekov.kg',
        phone: '+996 312 625-101',
        experience: '20 лет',
        education: 'Доктор педагогических наук',
        bio: 'Специалист в области медицинского образования',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
        children: [
          {
            id: 'medical-faculty',
            name: 'Медицинский факультет',
            type: 'faculty',
            head: 'Сидоров Сергей Сергеевич',
            position: 'Декан',
            email: 'medical@salymbekov.kg',
            phone: '+996 312 625-201',
            experience: '18 лет',
            education: 'Доктор медицинских наук, профессор',
            bio: 'Специалист в области внутренних болезней',
            avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
            studentCount: 1250,
            teacherCount: 45,
            children: [
              {
                id: 'therapy',
                name: 'Кафедра терапии',
                type: 'department',
                head: 'Орлов Олег Олегович',
                position: 'Заведующий кафедрой',
                email: 'therapy@salymbekov.kg',
                phone: '+996 312 625-301',
                experience: '15 лет',
                education: 'Кандидат медицинских наук',
                bio: 'Врач-терапевт высшей категории',
                avatar: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=400&h=400&fit=crop&crop=face',
                staff: [
                  { 
                    name: 'Волков Владимир Владимирович', 
                    position: 'Профессор',
                    experience: '30 лет',
                    education: 'Доктор медицинских наук',
                    email: 'volkov@salymbekov.kg',
                    specialization: 'Кардиология'
                  },
                  { 
                    name: 'Козлов Константин Константинович', 
                    position: 'Доцент',
                    experience: '12 лет',
                    education: 'Кандидат медицинских наук',
                    email: 'kozlov@salymbekov.kg',
                    specialization: 'Гастроэнтерология'
                  },
                  { 
                    name: 'Новиков Николай Николаевич', 
                    position: 'Ассистент',
                    experience: '5 лет',
                    education: 'Врач-терапевт',
                    email: 'novikov@salymbekov.kg',
                    specialization: 'Общая терапия'
                  }
                ]
              },
              {
                id: 'surgery',
                name: 'Кафедра хирургии',
                type: 'department',
                head: 'Морозов Михаил Михайлович',
                position: 'Заведующий кафедрой',
                email: 'surgery@salymbekov.kg',
                phone: '+996 312 625-302',
                experience: '17 лет',
                education: 'Доктор медицинских наук, профессор',
                bio: 'Ведущий хирург республики',
                avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face',
                staff: [
                  { 
                    name: 'Лебедев Леонид Леонидович', 
                    position: 'Профессор',
                    experience: '25 лет',
                    education: 'Доктор медицинских наук',
                    specialization: 'Кардиохирургия'
                  },
                  { 
                    name: 'Соколов Сергей Сергеевич', 
                    position: 'Доцент',
                    experience: '14 лет',
                    education: 'Кандидат медицинских наук',
                    specialization: 'Общая хирургия'
                  },
                  { 
                    name: 'Попов Павел Павлович', 
                    position: 'Ассистент',
                    experience: '6 лет',
                    education: 'Врач-хирург',
                    specialization: 'Абдоминальная хирургия'
                  }
                ]
              },
              {
                id: 'anatomy',
                name: 'Кафедра анатомии',
                type: 'department',
                head: 'Белов Борис Борисович',
                position: 'Заведующий кафедрой',
                email: 'anatomy@salymbekov.kg',
                phone: '+996 312 625-303',
                experience: '16 лет',
                education: 'Кандидат биологических наук',
                bio: 'Специалист в области анатомии человека',
                avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face',
                staff: [
                  { 
                    name: 'Черный Чеслав Черславович', 
                    position: 'Доцент',
                    experience: '10 лет',
                    education: 'Кандидат биологических наук',
                    specialization: 'Анатомия человека'
                  },
                  { 
                    name: 'Рыжов Роман Романович', 
                    position: 'Ассистент',
                    experience: '4 года',
                    education: 'Магистр биологии',
                    specialization: 'Гистология'
                  }
                ]
              }
            ]
          },
          {
            id: 'pharmacy-faculty',
            name: 'Фармацевтический факультет',
            type: 'faculty',
            head: 'Зеленый Захар Захарович',
            position: 'Декан',
            email: 'pharmacy@salymbekov.kg',
            phone: '+996 312 625-202',
            experience: '19 лет',
            education: 'Доктор фармацевтических наук',
            bio: 'Ведущий специалист в области фармацевтики',
            avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
            studentCount: 450,
            teacherCount: 22,
            children: [
              {
                id: 'pharmacology',
                name: 'Кафедра фармакологии',
                type: 'department',
                head: 'Синий Степан Степанович',
                position: 'Заведующий кафедрой',
                email: 'pharmacology@salymbekov.kg',
                phone: '+996 312 625-304',
                experience: '13 лет',
                education: 'Кандидат фармацевтических наук',
                bio: 'Специалист в области клинической фармакологии',
                avatar: 'https://images.unsplash.com/photo-1609902726285-00668009f004?w=400&h=400&fit=crop&crop=face',
                staff: [
                  { 
                    name: 'Желтый Жора Жорович', 
                    position: 'Профессор',
                    experience: '22 года',
                    education: 'Доктор фармацевтических наук',
                    specialization: 'Фармакология'
                  },
                  { 
                    name: 'Красный Кирилл Кириллович', 
                    position: 'Доцент',
                    experience: '9 лет',
                    education: 'Кандидат химических наук',
                    specialization: 'Органическая химия'
                  }
                ]
              }
            ]
          },
          {
            id: 'dentistry-faculty',
            name: 'Стоматологический факультет',
            type: 'faculty',
            head: 'Белый Борис Борисович',
            position: 'Декан',
            email: 'dentistry@salymbekov.kg',
            phone: '+996 312 625-203',
            experience: '16 лет',
            education: 'Доктор медицинских наук',
            bio: 'Ведущий стоматолог-хирург',
            avatar: '/api/placeholder/100/100',
            studentCount: 320,
            teacherCount: 18
          }
        ]
      },
      {
        id: 'science',
        name: 'Научная работа',
        type: 'administration',
        head: 'Федоров Федор Федорович',
        position: 'Проректор по научной работе',
        email: 'science@salymbekov.kg',
        phone: '+996 312 625-102',
        experience: '22 года',
        education: 'Доктор медицинских наук',
        bio: 'Руководитель научных исследований',
        avatar: '/api/placeholder/100/100',
        children: [
          {
            id: 'research-dept',
            name: 'Отдел науки и инноваций',
            type: 'department',
            head: 'Антонов Антон Антонович',
            position: 'Начальник отдела',
            email: 'research@salymbekov.kg',
            phone: '+996 312 625-401',
            experience: '8 лет',
            education: 'Кандидат технических наук',
            bio: 'Специалист по инновациям в образовании',
            avatar: '/api/placeholder/100/100',
            staff: [
              { 
                name: 'Григорьев Григорий Григорьевич', 
                position: 'Специалист',
                experience: '5 лет',
                education: 'Магистр науки',
                specialization: 'Научные исследования'
              },
              { 
                name: 'Михайлов Михаил Михайлович', 
                position: 'Специалист',
                experience: '3 года',
                education: 'Магистр инноваций',
                specialization: 'Инновационные проекты'
              }
            ]
          },
          {
            id: 'library',
            name: 'Научная библиотека',
            type: 'department',
            head: 'Библиотекарева Библиотека Библиотековна',
            position: 'Директор библиотеки',
            email: 'library@salymbekov.kg',
            phone: '+996 312 625-402',
            experience: '15 лет',
            education: 'Магистр библиотечного дела',
            bio: 'Специалист по научной информации',
            avatar: '/api/placeholder/100/100',
            staff: [
              { 
                name: 'Книжный Кирилл Кириллович', 
                position: 'Старший библиотекарь',
                experience: '10 лет',
                specialization: 'Медицинская литература'
              },
              { 
                name: 'Читальный Чингиз Чингизович', 
                position: 'Библиотекарь',
                experience: '7 лет',
                specialization: 'Электронные ресурсы'
              }
            ]
          }
        ]
      },
      {
        id: 'admin',
        name: 'Административная работа',
        type: 'administration',
        head: 'Административный Александр Александрович',
        position: 'Проректор по административной работе',
        email: 'admin@salymbekov.kg',
        phone: '+996 312 625-103',
        experience: '18 лет',
        education: 'Магистр управления',
        bio: 'Специалист по административному управлению',
        avatar: '/api/placeholder/100/100',
        children: [
          {
            id: 'it-dept',
            name: 'IT отдел',
            type: 'department',
            head: 'Компьютерный Константин Константинович',
            position: 'Начальник IT отдела',
            email: 'it@salymbekov.kg',
            phone: '+996 312 625-501',
            experience: '12 лет',
            education: 'Магистр информационных технологий',
            bio: 'Ведущий IT-специалист',
            avatar: '/api/placeholder/100/100',
            staff: [
              { 
                name: 'Программист Петр Петрович', 
                position: 'Ведущий разработчик',
                experience: '8 лет',
                education: 'Бакалавр IT',
                specialization: 'Full-stack разработка'
              },
              { 
                name: 'Системный Сергей Сергеевич', 
                position: 'Системный администратор',
                experience: '6 лет',
                education: 'Бакалавр IT',
                specialization: 'Сетевое администрирование'
              }
            ]
          },
          {
            id: 'hr-dept',
            name: 'Отдел кадров',
            type: 'department',
            head: 'Кадровый Константин Константинович',
            position: 'Начальник отдела кадров',
            email: 'hr@salymbekov.kg',
            phone: '+996 312 625-502',
            experience: '14 лет',
            education: 'Магистр управления персоналом',
            bio: 'Специалист по управлению кадрами',
            avatar: '/api/placeholder/100/100',
            staff: [
              { 
                name: 'Персональный Петр Петрович', 
                position: 'Специалист по кадрам',
                experience: '7 лет',
                education: 'Бакалавр психологии',
                specialization: 'Подбор персонала'
              }
            ]
          },
          {
            id: 'finance-dept',
            name: 'Финансовый отдел',
            type: 'department',
            head: 'Финансов Федор Федорович',
            position: 'Главный бухгалтер',
            email: 'finance@salymbekov.kg',
            phone: '+996 312 625-503',
            experience: '20 лет',
            education: 'Магистр экономики',
            bio: 'Специалист по финансовому учету',
            avatar: '/api/placeholder/100/100'
          }
        ]
      }
    ]
  };

  const allStaff = [];

  // Функция для сбора всех сотрудников из дерева
  const collectAllStaff = (node) => {
    allStaff.push({
      name: node.head,
      position: node.position,
      department: node.name,
      email: node.email,
      phone: node.phone,
      experience: node.experience,
      education: node.education,
      bio: node.bio,
      avatar: node.avatar,
      type: node.type,
      achievements: node.achievements,
      studentCount: node.studentCount,
      teacherCount: node.teacherCount
    });

    if (node.staff) {
      node.staff.forEach(person => {
        allStaff.push({
          name: person.name,
          position: person.position,
          department: node.name,
          email: person.email || `${person.name.toLowerCase().replace(/\s+/g, '.')}@salymbekov.kg`,
          phone: person.phone,
          experience: person.experience,
          education: person.education,
          specialization: person.specialization,
          type: 'staff'
        });
      });
    }

    if (node.children) {
      node.children.forEach(child => collectAllStaff(child));
    }
  };

  collectAllStaff(organizationData);

  const showPersonDetails = (person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'administration': return '👔';
      case 'faculty': return '🎓';
      case 'department': return '📚';
      default: return '👤';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'administration': return 'from-red-500 to-red-600';
      case 'faculty': return 'from-blue-500 to-blue-600';
      case 'department': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getBorderColor = (type) => {
    switch(type) {
      case 'administration': return 'border-red-500';
      case 'faculty': return 'border-blue-500';
      case 'department': return 'border-green-500';
      default: return 'border-gray-500';
    }
  };

  const getBackgroundColor = (type) => {
    switch(type) {
      case 'administration': return 'from-red-50 to-red-100';
      case 'faculty': return 'from-blue-50 to-blue-100';
      case 'department': return 'from-green-50 to-green-100';
      default: return 'from-gray-50 to-gray-100';
    }
  };

  // Функция для создания пирамидального представления
  const renderPyramidStructure = () => {
    const levels = [
      {
        title: "Ректорат",
        staff: [organizationData],
        level: 1
      },
      {
        title: "Проректоры",
        staff: organizationData.children || [],
        level: 2
      },
      {
        title: "Деканы факультетов",
        staff: organizationData.children?.flatMap(child => child.children || []).filter(item => item.type === 'faculty') || [],
        level: 3
      },
      {
        title: "Заведующие кафедрами",
        staff: organizationData.children?.flatMap(child => 
          child.children?.flatMap(grandchild => grandchild.children || []) || []
        ).filter(item => item.type === 'department') || [],
        level: 4
      }
    ];

    return (
      <div className="pyramid-structure">
        {levels.map((levelData, levelIndex) => (
          levelData.staff.length > 0 && (
            <div key={levelIndex} className="w-full">
              <h3 className="pyramid-level-title">{levelData.title}</h3>
              <div className={`pyramid-level pyramid-level-${levelData.level}`}>
                <div className="pyramid-connections">
                  {/* Connection lines можно добавить позже */}
                </div>
                {levelData.staff.map((person, personIndex) => (
                  <div key={`${person.id}-${personIndex}`} className="pyramid-staff-card stagger-item">
                    <div className="pyramid-level-badge">
                      {levelData.level}
                    </div>
                    
                    <img
                      src={person.avatar}
                      alt={person.head || person.name}
                      className="pyramid-avatar"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.head || person.name)}&size=400&background=3b82f6&color=fff&rounded=true`;
                      }}
                    />
                    
                    <h4 className="pyramid-name">{person.head || person.name}</h4>
                    <p className="pyramid-position">{person.position}</p>
                    <p className="pyramid-experience">{person.experience}</p>
                    
                    <div className="flex justify-center space-x-2 mt-4">
                      {person.email && (
                        <a
                          href={`mailto:${person.email}`}
                          className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                          title="Email"
                        >
                          📧
                        </a>
                      )}
                      {person.phone && (
                        <a
                          href={`tel:${person.phone}`}
                          className="p-2 bg-green-100 hover:bg-green-200 rounded-full transition-colors"
                          title="Телефон"
                        >
                          📞
                        </a>
                      )}
                      <button
                        onClick={() => {
                          setSelectedPerson(person);
                          setIsModalOpen(true);
                        }}
                        className="p-2 bg-purple-100 hover:bg-purple-200 rounded-full transition-colors"
                        title="Подробнее"
                      >
                        👤
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    );
  };

  const renderOrgNode = (node, level = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const hasStaff = node.staff && node.staff.length > 0;
    const typeIcon = getTypeIcon(node.type);
    
    return (
      <div key={node.id} className="mb-4 animate-fade-in">
        <div 
          className={`org-node group relative overflow-hidden rounded-2xl border-l-4 ${getBorderColor(node.type)} 
                      bg-gradient-to-r ${getBackgroundColor(node.type)} hover:shadow-xl transition-all duration-500 
                      ${isExpanded ? 'shadow-2xl scale-[1.02]' : 'shadow-lg hover:scale-[1.01]'} cursor-pointer`}
          style={{ marginLeft: `${level * 24}px` }}
        >
          {/* Header */}
          <div 
            className="flex items-center p-6"
            onClick={() => (hasChildren || hasStaff) && toggleNode(node.id)}
          >
            {/* Expand/Collapse Icon */}
            {(hasChildren || hasStaff) && (
              <div className={`w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center mr-4 
                              transition-all duration-300 ${isExpanded ? 'rotate-90 bg-blue-50' : 'hover:bg-gray-50'}`}>
                <svg 
                  className={`w-5 h-5 transition-all duration-300 ${isExpanded ? 'text-blue-600' : 'text-gray-500'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-white shadow-md mr-4 flex items-center justify-center text-2xl">
              {node.avatar ? (
                <img src={node.avatar} alt={node.head} className="w-full h-full rounded-full object-cover" />
              ) : (
                typeIcon
              )}
            </div>
            
            {/* Content */}
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-800 text-xl">{node.name}</h3>
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getTypeColor(node.type)} shadow-sm`}></div>
              </div>
              
              <div className="space-y-1">
                <p className="font-semibold text-blue-700">{node.head}</p>
                <p className="text-sm text-gray-600">{node.position}</p>
                {node.experience && (
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    Стаж: {node.experience}
                  </span>
                )}
                {node.studentCount && (
                  <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full ml-2">
                    Студентов: {node.studentCount}
                  </span>
                )}
              </div>
              
              <div className="flex items-center mt-3 space-x-4">
                {node.email && (
                  <a 
                    href={`mailto:${node.email}`}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {node.email}
                  </a>
                )}
                {node.phone && (
                  <span className="text-sm text-green-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {node.phone}
                  </span>
                )}
                <button 
                  className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPersonDetails({
                      name: node.head,
                      position: node.position,
                      department: node.name,
                      email: node.email,
                      phone: node.phone,
                      experience: node.experience,
                      education: node.education,
                      bio: node.bio,
                      avatar: node.avatar,
                      achievements: node.achievements,
                      type: node.type
                    });
                  }}
                >
                  Подробнее
                </button>
              </div>
            </div>
          </div>
          
          {/* Staff List */}
          {hasStaff && isExpanded && (
            <div className="px-6 pb-4">
              <h4 className="font-semibold text-gray-700 mb-3 border-b border-gray-200 pb-2">
                Сотрудники кафедры ({node.staff.length})
              </h4>
              <div className="grid gap-3">
                {node.staff.map((person, index) => (
                  <div key={index} className="bg-white/80 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-grow">
                        <h5 className="font-semibold text-gray-800">{person.name}</h5>
                        <p className="text-sm text-blue-600 mb-1">{person.position}</p>
                        {person.specialization && (
                          <p className="text-xs text-gray-600">Специализация: {person.specialization}</p>
                        )}
                        {person.experience && (
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mt-1">
                            {person.experience}
                          </span>
                        )}
                      </div>
                      <button 
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                        onClick={() => showPersonDetails({
                          ...person,
                          department: node.name,
                          type: 'staff'
                        })}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="mt-6 animate-fade-in-up">
            {node.children.map(child => renderOrgNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Модальное окно для деталей сотрудника
  const PersonModal = ({ person, onClose }) => {
    if (!person) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {person.avatar ? (
                    <img src={person.avatar} alt={person.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    person.name.split(' ').map(n => n[0]).join('')
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{person.name}</h2>
                  <p className="text-blue-600 font-semibold">{person.position}</p>
                  <p className="text-gray-600">{person.department}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            {person.bio && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">О специалисте</h3>
                <p className="text-gray-700 leading-relaxed">{person.bio}</p>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Основная информация</h3>
                <div className="space-y-3">
                  {person.education && (
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">🎓</span>
                      <div>
                        <p className="font-medium text-gray-900">Образование</p>
                        <p className="text-gray-700">{person.education}</p>
                      </div>
                    </div>
                  )}
                  
                  {person.experience && (
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">⏱️</span>
                      <div>
                        <p className="font-medium text-gray-900">Опыт работы</p>
                        <p className="text-gray-700">{person.experience}</p>
                      </div>
                    </div>
                  )}
                  
                  {person.specialization && (
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">🔬</span>
                      <div>
                        <p className="font-medium text-gray-900">Специализация</p>
                        <p className="text-gray-700">{person.specialization}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Контактная информация</h3>
                <div className="space-y-3">
                  {person.email && (
                    <a 
                      href={`mailto:${person.email}`}
                      className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{person.email}</span>
                    </a>
                  )}
                  
                  {person.phone && (
                    <div className="flex items-center space-x-3 text-green-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{person.phone}</span>
                    </div>
                  )}
                </div>
                
                {(person.studentCount || person.teacherCount) && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-2">Статистика</h4>
                    <div className="space-y-2">
                      {person.studentCount && (
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">👨‍🎓</span>
                          <span className="text-gray-700">Студентов: {person.studentCount}</span>
                        </div>
                      )}
                      {person.teacherCount && (
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-600">👨‍🏫</span>
                          <span className="text-gray-700">Преподавателей: {person.teacherCount}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {person.achievements && person.achievements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Достижения</h3>
                <div className="space-y-2">
                  {person.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-xl">🏆</span>
                      <p className="text-gray-700">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-blue-200 mb-8">
            <a href="/" className="hover:text-white transition-colors">{t('about.breadcrumb_home')}</a>
            <span className="mx-2">→</span>
            <a href="/about" className="hover:text-white transition-colors">{t('about.breadcrumb_about')}</a>
            <span className="mx-2">→</span>
            <span className="text-white">Структура управления</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              Структура управления
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              Организационная структура Салымбековского университета включает в себя руководящие органы, 
              факультеты, кафедры и административные службы, обеспечивающие эффективную работу учебного заведения
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="text-center animate-fade-in stats-counter">
                <div className="text-3xl font-bold text-blue-300">150+</div>
                <div className="text-sm text-blue-200">Преподавателей</div>
              </div>
              <div className="text-center animate-fade-in stats-counter">
                <div className="text-3xl font-bold text-green-300">15</div>
                <div className="text-sm text-blue-200">Кафедр</div>
              </div>
              <div className="text-center animate-fade-in stats-counter">
                <div className="text-3xl font-bold text-yellow-300">5</div>
                <div className="text-sm text-blue-200">Факультетов</div>
              </div>
              <div className="text-center animate-fade-in stats-counter">
                <div className="text-3xl font-bold text-purple-300">2000+</div>
                <div className="text-sm text-blue-200">Студентов</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Pyramid View */}
        <div className="bg-white rounded-2xl shadow-xl p-8" id="org-chart">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Иерархия университета</h2>
              <p className="text-gray-600 text-lg">Пирамидальная иерархия университета</p>
            </div>
            
            {renderPyramidStructure()}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Условные обозначения</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-md"></div>
              <span className="text-gray-700 font-medium">👔 Администрация</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-md"></div>
              <span className="text-gray-700 font-medium">🎓 Факультеты</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-md"></div>
              <span className="text-gray-700 font-medium">📚 Кафедры</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full shadow-md"></div>
              <span className="text-gray-700 font-medium">👥 Сотрудники</span>
            </div>
          </div>
        </div>

      {/* Person Details Modal */}
      {isModalOpen && selectedPerson && (
        <PersonModal 
          person={selectedPerson} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPerson(null);
          }} 
        />
      )}

    </div>
  );
};

export default Management;
