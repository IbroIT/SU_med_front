import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getManagement, getTeachers } from '../../services/teachers';

const Management = () => {
  const { t, i18n } = useTranslation();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [managementData, setManagementData] = useState(null);
  const [teachersData, setTeachersData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загружаем данные с API
  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching management and teachers data...');
      setLoading(true);
      
      // Загружаем данные руководства
      const managementData = await getManagement();
      console.log('Management data received:', managementData);
      if (managementData && managementData.length > 0) {
        setManagementData(managementData[0]);
      }
      
      // Загружаем данные учителей
      const teachersData = await getTeachers();
      console.log('Teachers data received:', teachersData);
      setTeachersData(teachersData);
      
      setLoading(false);
    };
    fetchData();
  }, []);

  // Функция для получения локализованного текста
  const getLocalizedText = (obj, field) => {
    if (!obj) return '';
    const lang = i18n.language === 'ky' ? 'kg' : i18n.language;
    return obj[`${field}_${lang}`] || obj[`${field}_ru`] || obj[`${field}_en`] || '';
  };

  // Трансформируем данные из API для использования в компоненте
  const transformApiData = (apiNode) => {
    if (!apiNode) return null;
    
    return {
      id: apiNode.id.toString(),
      name: getLocalizedText(apiNode, 'position'),
      type: 'administration',
      head: getLocalizedText(apiNode, 'full_name'),
      position: getLocalizedText(apiNode, 'position'),
      email: `${getLocalizedText(apiNode, 'full_name').toLowerCase().replace(/\s+/g, '.')}@salymbekov.kg`,
      phone: '+996 312 625-100',
      experience: '15+ лет',
      education: 'Высшее образование',
      bio: getLocalizedText(apiNode, 'bio') || 'Опытный руководитель',
      avatar: apiNode.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(getLocalizedText(apiNode, 'full_name'))}&size=400&background=3b82f6&color=fff&rounded=true`,
      children: apiNode.children ? apiNode.children.map(transformApiData) : []
    };
  };

  // Используем данные из API или fallback
  const organizationData = managementData ? transformApiData(managementData) : {
    id: 'loading',
    name: loading ? 'Загрузка...' : 'Университет',
    type: 'administration',
    head: loading ? 'Загрузка...' : 'Ректор',
    position: loading ? 'Загрузка...' : 'Ректор',
    email: 'rector@salymbekov.kg',
    phone: '+996 312 625-100',
    experience: '25 лет',
    education: 'Доктор медицинских наук',
    bio: loading ? 'Загрузка данных...' : 'Ректор университета',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    children: []
  };

  const renderMemberCard = (member, level = 0) => {
    const cardSizes = {
      0: 'inline-block text-center w-full md:w-96 flex-none transform hover:scale-105 transition-transform duration-300',
      1: 'inline-block text-center w-full md:w-80 flex-none transform hover:scale-105 transition-transform duration-300',
      2: 'inline-block text-center w-full md:w-72 flex-none transform hover:scale-105 transition-transform duration-300',
      3: 'inline-block text-center w-full md:w-64 flex-none transform hover:scale-105 transition-transform duration-300',
    };

    const avatarSizes = {
      0: 'w-32 h-32 ring-4 ring-white ring-offset-2 ring-offset-blue-100 shadow-lg',
      1: 'w-28 h-28 ring-3 ring-white ring-offset-2 ring-offset-blue-100 shadow-md',
      2: 'w-24 h-24 ring-2 ring-white ring-offset-1 ring-offset-blue-100 shadow-sm',
      3: 'w-20 h-20 ring-1 ring-white',
    };

    const cardGradients = {
      0: 'bg-gradient-to-br from-blue-600 to-purple-700',
      1: 'bg-gradient-to-br from-blue-500 to-purple-600',
      2: 'bg-gradient-to-br from-blue-400 to-purple-500',
      3: 'bg-gradient-to-br from-blue-300 to-purple-400',
    };

    return (
      <div className="flex flex-col items-center group" key={member.id}>
        <div
          className={`
            ${cardSizes[level] || cardSizes[3]} 
            h-96 flex flex-col justify-between items-center text-center
            ${cardGradients[level] || cardGradients[3]} 
            rounded-2xl p-6 shadow-xl 
            hover:shadow-2xl transition-all duration-300
            text-white
            relative overflow-hidden
          `}
        >
          {/* Декоративные элементы */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-20"></div>
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white opacity-10"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white opacity-10"></div>
          
          {/* Фото */}
          <div className="relative mt-2 mb-4">
            {member.avatar ? (
              <img
                src={member.avatar}
                alt={member.head}
                className={`${avatarSizes[level] || avatarSizes[3]} rounded-full mx-auto object-cover transition-all duration-300 group-hover:ring-offset-blue-200`}
              />
            ) : (
              <div
                className={`
                  ${avatarSizes[level] || avatarSizes[3]} 
                  flex items-center justify-center rounded-full bg-white/20 text-white text-lg font-bold mx-auto
                `}
              >
                {member.head?.split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()}
              </div>
            )}
            
            {/* Индикатор уровня/статуса */}
            <div className="absolute -bottom-2 -right-2 bg-white text-blue-700 px-2 py-1 rounded-full text-xs font-bold shadow-md">
              {level === 0 ? '👑' : level === 1 ? '⭐' : '🔷'}
            </div>
          </div>

          {/* Имя и должность */}
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2 drop-shadow-md">{member.head}</h3>
            <p className="text-sm opacity-90 font-medium">{member.position}</p>
          </div>

          {/* Контакты */}
          <div className="text-xs space-y-2 opacity-90 w-full">
            {member.email && (
              <div className="flex items-center justify-center bg-white/10 rounded-lg p-2">
                <span className="mr-2">📧</span>
                <p className="truncate">{member.email}</p>
              </div>
            )}
            {member.phone && (
              <div className="flex items-center justify-center bg-white/10 rounded-lg p-2">
                <span className="mr-2">📞</span>
                <p>{member.phone}</p>
              </div>
            )}
            {member.experience && (
              <div className="flex items-center justify-center">
                <span className="mr-2">⏰</span>
                <p>{member.experience}</p>
              </div>
            )}
          </div>

          {/* Статистика (если есть) */}
          {(member.studentCount || member.teacherCount) && (
            <div className="pt-4 border-t border-white/20 w-full mt-4">
              <div className="flex justify-center space-x-6 text-xs">
                {member.studentCount && (
                  <span className="flex items-center">
                    <span className="mr-1">👨‍🎓</span> 
                    {member.studentCount}
                  </span>
                )}
                {member.teacherCount && (
                  <span className="flex items-center">
                    <span className="mr-1">👨‍🏫</span> 
                    {member.teacherCount}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Индикатор наведения */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    );
  };

  // Функция для отображения карточки учителя
  const renderTeacherCard = (teacher) => {
    const teacherData = {
      id: teacher.id.toString(),
      head: getLocalizedText(teacher, 'full_name'),
      position: getLocalizedText(teacher, 'position'),
      bio: getLocalizedText(teacher, 'bio'),
      email: `${getLocalizedText(teacher, 'full_name').toLowerCase().replace(/\s+/g, '.')}@salymbekov.kg`,
      phone: '+996 312 625-100',
      experience: '10+ лет',
      education: 'Высшее образование',
      avatar: teacher.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(getLocalizedText(teacher, 'full_name'))}&size=400&background=16a085&color=fff&rounded=true`,
      type: 'teacher'
    };

    return (
      <div 
        key={teacher.id} 
        className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer group relative overflow-hidden"
        onClick={() => {
          setSelectedPerson(teacherData);
          setIsModalOpen(true);
        }}
      >
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-20"></div>
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white opacity-10"></div>
        
        <div className="text-center relative z-10">
          <div className="relative mb-5">
            <img
              src={teacherData.avatar}
              alt={teacherData.head}
              className="w-24 h-24 rounded-full mx-auto border-4 border-white/80 shadow-lg object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute -bottom-2 -right-2 bg-white text-green-700 px-2 py-1 rounded-full text-xs font-bold shadow-md">
              🎓
            </div>
          </div>
          <h3 className="text-lg font-bold mb-2 text-white drop-shadow-md">{teacherData.head}</h3>
          <p className="text-sm text-white/90 mb-4 font-medium">{teacherData.position}</p>
          <div className="text-xs space-y-2 text-white/90">
            <div className="flex items-center justify-center bg-white/10 rounded-lg p-2">
              <span className="mr-2">📧</span>
              <p className="truncate">{teacherData.email}</p>
            </div>
            <div className="flex items-center justify-center bg-white/10 rounded-lg p-2">
              <span className="mr-2">📞</span>
              <p>{teacherData.phone}</p>
            </div>
          </div>
          {teacherData.bio && (
            <p className="text-xs text-white/80 mt-4 line-clamp-2 bg-white/10 rounded-lg p-2">{teacherData.bio}</p>
          )}
        </div>
        
        {/* Индикатор наведения */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    );
  };

  const renderPyramidStructure = () => {
    if (!organizationData) {
      return (
        <div className="text-center py-16">
          <div className="inline-block w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
          <p className="mt-6 text-gray-600 text-lg">Загрузка структуры...</p>
        </div>
      );
    }

    // Строим уровни иерархии (BFS)
    const buildLevels = (root) => {
      const levels = [];
      let queue = [{ node: root, level: 0 }];
      while (queue.length) {
        const { node, level } = queue.shift();
        if (!levels[level]) levels[level] = [];
        levels[level].push(node);
        if (node.children && node.children.length) {
          node.children.forEach((child) => queue.push({ node: child, level: level + 1 }));
        }
      }
      return levels;
    };

    const levels = buildLevels(organizationData);

    return (
      <div className="space-y-10">
        {levels.map((nodes, idx) => (
          <div key={idx} className="flex justify-center">
            <div className="max-w-6xl w-full flex flex-wrap justify-center gap-8">
              {nodes.map((n) => (
                <div key={n.id}>
                  {renderMemberCard(n, idx)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const PersonModal = ({ person, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onClose]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div ref={modalRef} className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 flex justify-between items-center rounded-t-2xl shadow-md">
            <h2 className="text-2xl font-bold">{person.head}</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold transition-colors duration-200"
            >
              ×
            </button>
          </div>
          <div className="p-6">
            {renderMemberDetails(person)}
          </div>
        </div>
      </div>
    );
  };

  const renderMemberDetails = (member) => {
    return (
      <div className="space-y-6">
        {/* Основная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Фото и основные данные */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6">
            <div className="text-center">
              <img
                src={member.avatar}
                alt={member.head}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{member.head}</h3>
              <p className="text-blue-600 font-medium mb-1">{member.position}</p>
              <p className="text-gray-600 text-sm">{member.name}</p>
            </div>
          </div>

          {/* Контактная информация */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📞</span>
              {t('management.contactInfo')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <span className="w-6 text-center mr-3">📧</span>
                <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                  {member.email}
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-6 text-center mr-3">📞</span>
                <a href={`tel:${member.phone}`} className="text-blue-600 hover:underline">
                  {member.phone}
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-6 text-center mr-3">⏰</span>
                <span>{member.experience}</span>
              </div>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🎓</span>
              {t('management.additionalInfo')}
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 text-sm font-medium">{t('management.education')}:</span>
                <p className="text-gray-800">{member.education}</p>
              </div>
              {member.studentCount && (
                <div>
                  <span className="text-gray-600 text-sm font-medium">{t('management.studentsCount')}:</span>
                  <p className="text-gray-800">{member.studentCount}</p>
                </div>
              )}
              {member.teacherCount && (
                <div>
                  <span className="text-gray-600 text-sm font-medium">{t('management.teachersCount')}:</span>
                  <p className="text-gray-800">{member.teacherCount}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Биография */}
        {member.bio && (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📖</span>
              {t('management.biography')}
            </h4>
            <p className="text-gray-600 leading-relaxed">{member.bio}</p>
          </div>
        )}

        {/* Достижения */}
        {member.achievements && member.achievements.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🏆</span>
              {t('management.achievements')}
            </h4>
            <ul className="space-y-2">
              {member.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-500 mr-2 mt-1">⭐</span>
                  <span className="text-gray-600">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Сотрудники отдела */}
        {member.staff && member.staff.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">👥</span>
              {t('management.staff')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {member.staff.map((staffMember, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <h5 className="font-medium text-gray-800 mb-2">{staffMember.name}</h5>
                  <p className="text-sm text-blue-600 mb-1">{staffMember.position}</p>
                  <p className="text-sm text-gray-600 mb-2">{staffMember.specialization}</p>
                  <div className="text-xs text-gray-500">
                    <p>⏰ {staffMember.experience}</p>
                    <p>🎓 {staffMember.education}</p>
                    <p>📧 <a href={`mailto:${staffMember.email}`} className="text-blue-600 hover:underline">{staffMember.email}</a></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-800 to-blue-900 text-white py-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-blue-200 mb-8">
            <a href="/" className="hover:text-white transition-colors">{t('management.breadcrumbHome')}</a>
            <span className="mx-2">→</span>
            <a href="/about" className="hover:text-white transition-colors">{t('management.breadcrumbAbout')}</a>
            <span className="mx-2">→</span>
            <span className="text-white">{t('management.title')}</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 opacity-95">
              {t('management.title')}
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              {t('management.description')}
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-extrabold text-white mb-2">150+</div>
                <div className="text-sm text-blue-100">{t('management.teachersCount')}</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-extrabold text-white mb-2">15</div>
                <div className="text-sm text-blue-100">{t('management.departmentsCount')}</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-extrabold text-white mb-2">5</div>
                <div className="text-sm text-blue-100">{t('management.facultiesCount')}</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-extrabold text-white mb-2">2000+</div>
                <div className="text-sm text-blue-100">{t('management.studentsCount')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Pyramid View */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12" id="org-chart">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('management.organizationTitle')}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('management.organizationSubtitle')}</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="max-w-7xl mx-auto">
            {renderPyramidStructure()}
          </div>
        </div>

        {/* Teachers Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8" id="teachers">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Преподаватели</h2>
            <p className="text-gray-600 text-lg">Наши квалифицированные преподаватели</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 rounded-full bg-green-200/60 animate-pulse"></div>
              <p className="mt-4 text-gray-600">Загрузка преподавателей...</p>
            </div>
          ) : teachersData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teachersData.map(teacher => renderTeacherCard(teacher))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Данные о преподавателях не найдены</p>
            </div>
          )}
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