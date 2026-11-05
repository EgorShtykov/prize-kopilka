export type GiftCategory =
  'Гаджеты' | 'Для комнаты' | 'Стиль' | 'Творчество' | 'Игры' | 'Книги' | 'Сертификаты'

export type GiftArtKind =
  'stationery' | 'bookmark' | 'keychain' | 'pens' | 'book' |
  'puzzle' | 'sketchbook' | 'game' | 'tape' | 'art' |
  'certificate' | 'science' | 'merch' | 'craft' |
  'construction' | 'calligraphy' | 'speaker' | 'headphones' |
  'printer' | 'light' | 'power' | 'photo' | 'bag'

export type Gift = {
  id: number
  title: string
  category: GiftCategory
  price: number
  description: string
  art: GiftArtKind
  tone: 'yellow' | 'green' | 'sage' | 'coral'
}

export const gifts: Gift[] = [
  { id: 1, title: 'Стикерпак по своему дизайну', category: 'Творчество', price: 250, description: 'Небольшой набор наклеек с любимыми персонажами, мемами или собственным рисунком ученика.', art: 'stationery', tone: 'yellow' },
  { id: 2, title: 'Чарм на рюкзак', category: 'Стиль', price: 250, description: 'Брелок, фигурка или подвеска по интересам — заметный способ сделать рюкзак своим.', art: 'keychain', tone: 'coral' },
  { id: 3, title: 'Мини-головоломка', category: 'Игры', price: 250, description: 'Металлический пазл, лабиринт или магнитный антистресс для коротких перерывов.', art: 'puzzle', tone: 'sage' },
  { id: 4, title: 'Цепочка для телефона', category: 'Стиль', price: 500, description: 'Яркий аксессуар с бусинами, буквами имени или подвесками по выбору ученика.', art: 'keychain', tone: 'green' },
  { id: 5, title: 'Фотопечать для комнаты', category: 'Для комнаты', price: 500, description: 'Серия снимков с друзьями, питомцами или из путешествий — для стены, доски или альбома.', art: 'photo', tone: 'yellow' },
  { id: 6, title: 'Компактная карточная игра', category: 'Игры', price: 500, description: 'Быстрая игра на реакцию, ассоциации или логику, которую удобно взять с собой.', art: 'game', tone: 'sage' },
  { id: 7, title: 'Проектор заката', category: 'Для комнаты', price: 750, description: 'Небольшая лампа для атмосферных фото, музыки и вечернего отдыха.', art: 'light', tone: 'coral' },
  { id: 8, title: 'Маркеры для скетчинга', category: 'Творчество', price: 750, description: 'Набор базовых или необычных оттенков для рисунков, lettering и оформления конспектов.', art: 'pens', tone: 'green' },
  { id: 9, title: 'Сквиш или антистресс-куб', category: 'Игры', price: 750, description: 'Тактильная игрушка по вкусу ученика — мягкая, магнитная или трансформирующаяся.', art: 'puzzle', tone: 'yellow' },
  { id: 10, title: 'LED-подсветка комнаты', category: 'Для комнаты', price: 1000, description: 'Светодиодная лента или компактная подсветка рабочего стола с разными режимами.', art: 'light', tone: 'sage' },
  { id: 11, title: 'Кружка с личным дизайном', category: 'Стиль', price: 1000, description: 'Имя, любимая цитата, игра или собственная иллюстрация — без случайного принта.', art: 'merch', tone: 'coral' },
  { id: 12, title: 'Сертификат на маркетплейс', category: 'Сертификаты', price: 1000, description: 'Свобода выбрать мерч, книгу или аксессуар вместе с родителями в пределах суммы.', art: 'certificate', tone: 'green' },
  { id: 13, title: 'Конструктор-миниатюра', category: 'Игры', price: 1250, description: 'Техника, робот или архитектура: интересная сборка и готовый объект для полки.', art: 'construction', tone: 'yellow' },
  { id: 14, title: 'Поясная сумка', category: 'Стиль', price: 1250, description: 'Компактная сумка для телефона, наушников и мелочей — цвет и модель выбирает ученик.', art: 'bag', tone: 'sage' },
  { id: 15, title: 'Манга или комикс', category: 'Книги', price: 1250, description: 'Первый том новой истории или продолжение серии, которую ученик действительно хочет читать.', art: 'book', tone: 'coral' },
  { id: 16, title: 'Портативная Bluetooth-колонка', category: 'Гаджеты', price: 1500, description: 'Компактная колонка для музыки и встреч с друзьями; модель согласуем перед покупкой.', art: 'speaker', tone: 'green' },
  { id: 17, title: 'Набор для полимерной лепки', category: 'Творчество', price: 1500, description: 'Глина, инструменты и фурнитура для фигурок, брелоков или украшений своего дизайна.', art: 'craft', tone: 'yellow' },
  { id: 18, title: 'Сертификат по интересам', category: 'Сертификаты', price: 1500, description: 'Книжный, спортивный или магазин мерча — направление выбирается заранее.', art: 'certificate', tone: 'sage' },
  { id: 19, title: 'Внешний аккумулятор', category: 'Гаджеты', price: 1750, description: 'Практичный power bank для прогулок и поездок, с подходящим разъёмом и ёмкостью.', art: 'power', tone: 'coral' },
  { id: 20, title: 'Настольная игра для компании', category: 'Игры', price: 1750, description: 'Полноценная игра для семьи или друзей: стратегия, детектив или весёлые ассоциации.', art: 'game', tone: 'green' },
  { id: 21, title: 'Футболка с личным принтом', category: 'Стиль', price: 1750, description: 'Кастомная вещь с дизайном ученика или понятной ему темой — размер и макет согласуются.', art: 'merch', tone: 'yellow' },
  { id: 22, title: 'Проектор звёздного неба', category: 'Для комнаты', price: 2000, description: 'Умная лампа или проектор с мягкими сценами света для личного пространства.', art: 'light', tone: 'sage' },
  { id: 23, title: '3D-ручка с пластиком', category: 'Творчество', price: 2000, description: 'Набор для объёмных фигурок и моделей; цвета пластика можно выбрать отдельно.', art: 'science', tone: 'coral' },
  { id: 24, title: 'Сертификат на мастер-класс', category: 'Сертификаты', price: 2000, description: 'Новый опыт по интересам: керамика, рисование, кулинария или другое согласованное занятие.', art: 'certificate', tone: 'green' },
  { id: 25, title: 'Беспроводные наушники', category: 'Гаджеты', price: 2500, description: 'TWS-модель для музыки, прогулок и звонков; перед покупкой проверяем совместимость.', art: 'headphones', tone: 'yellow' },
  { id: 26, title: 'Мини-принтер для телефона', category: 'Гаджеты', price: 2500, description: 'Печать маленьких фото, стикеров и заметок без чернил — плюс стартовый запас бумаги.', art: 'printer', tone: 'sage' },
  { id: 27, title: 'Большой сертификат на выбор', category: 'Сертификаты', price: 2500, description: 'Для тех, кто хочет сам найти идеальный приз: магазин и правила выбора согласуются заранее.', art: 'certificate', tone: 'coral' },
  { id: 28, title: 'Колонка с хорошим звуком', category: 'Гаджеты', price: 3000, description: 'Более мощная портативная колонка — главная цель цикла для любителя музыки.', art: 'speaker', tone: 'green' },
  { id: 29, title: 'Худи с собственным дизайном', category: 'Стиль', price: 3000, description: 'Персональный мерч: ученик выбирает цвет, макет и надпись вместе с репетитором и родителями.', art: 'merch', tone: 'yellow' },
  { id: 30, title: 'Главный приз на выбор', category: 'Сертификаты', price: 3000, description: 'Максимум за идеальный цикл: заранее согласованная вещь или сертификат на всю сумму.', art: 'certificate', tone: 'coral' },
]

export const categories = ['Все', 'Гаджеты', 'Для комнаты', 'Стиль', 'Творчество', 'Игры', 'Книги', 'Сертификаты'] as const

export function savingPlan(price: number) {
  if (price > 2000) return '8 домашек + бонус цикла'
  const homework = price / 250
  if (homework === 1) return '1 выполненная домашка'
  if (homework < 5) return `${homework} выполненные домашки`
  return `${homework} выполненных домашек`
}
