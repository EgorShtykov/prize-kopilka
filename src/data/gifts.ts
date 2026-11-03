export type GiftCategory = 'Канцелярия' | 'Книги' | 'Творчество' | 'Игры' | 'Хобби' | 'Сертификаты'

export type Gift = {
  id: number
  title: string
  category: GiftCategory
  price: number
  description: string
  art: 'stationery' | 'bookmark' | 'keychain' | 'pens' | 'book' | 'puzzle' | 'sketchbook' | 'game' | 'tape' | 'art' | 'certificate' | 'science' | 'merch' | 'craft' | 'construction' | 'calligraphy'
  tone: 'yellow' | 'green' | 'sage' | 'coral'
}

export const gifts: Gift[] = [
  { id: 1, title: 'Набор стикеров', category: 'Канцелярия', price: 250, description: 'Стикеры с любимыми героями, животными или мотивирующими фразами.', art: 'stationery', tone: 'yellow' },
  { id: 2, title: 'Необычная закладка', category: 'Канцелярия', price: 250, description: 'Металлическая, магнитная или объёмная закладка по интересам ученика.', art: 'bookmark', tone: 'sage' },
  { id: 3, title: 'Брелок по интересам', category: 'Хобби', price: 250, description: 'Небольшой персональный приз: любимая игра, животное, спорт или персонаж.', art: 'keychain', tone: 'coral' },
  { id: 4, title: 'Гелевые ручки', category: 'Канцелярия', price: 500, description: 'Несколько цветных или пастельных ручек для конспектов и рисования.', art: 'pens', tone: 'green' },
  { id: 5, title: 'Комикс или манга', category: 'Книги', price: 500, description: 'Небольшое издание или первый том истории, которую хочется продолжить.', art: 'book', tone: 'yellow' },
  { id: 6, title: 'Мини-головоломка', category: 'Игры', price: 500, description: 'Механическая головоломка, лабиринт или набор логических задач.', art: 'puzzle', tone: 'sage' },
  { id: 7, title: 'Скетчбук', category: 'Творчество', price: 750, description: 'Плотные страницы и обложка, которую можно выбрать под вкус ученика.', art: 'sketchbook', tone: 'coral' },
  { id: 8, title: 'Карточная игра', category: 'Игры', price: 750, description: 'Компактная игра для друзей и семьи — от стратегии до весёлых ассоциаций.', art: 'game', tone: 'green' },
  { id: 9, title: 'Декоративные ленты', category: 'Творчество', price: 750, description: 'Набор для скрапбукинга, украшения тетрадей и творческих проектов.', art: 'tape', tone: 'yellow' },
  { id: 10, title: 'Книга по интересам', category: 'Книги', price: 1000, description: 'Роман, энциклопедия, научпоп или иллюстрированное издание по увлечению.', art: 'book', tone: 'sage' },
  { id: 11, title: 'Набор для рисования', category: 'Творчество', price: 1000, description: 'Маркеры, карандаши или краски с бумагой — готовый повод создать что-то новое.', art: 'art', tone: 'coral' },
  { id: 12, title: 'Сертификат в книжный', category: 'Сертификаты', price: 1000, description: 'Ученик сам выбирает книгу, комикс или канцелярию на сумму сертификата.', art: 'certificate', tone: 'green' },
  { id: 13, title: 'Алмазная мозаика', category: 'Творчество', price: 1250, description: 'Спокойное творческое занятие с готовой картиной в качестве результата.', art: 'craft', tone: 'yellow' },
  { id: 14, title: 'Тематический мерч', category: 'Хобби', price: 1250, description: 'Футболка, кружка или аксессуар с любимой вселенной, командой или героем.', art: 'merch', tone: 'sage' },
  { id: 15, title: 'Набор для опытов', category: 'Хобби', price: 1250, description: 'Безопасные домашние эксперименты по химии, физике или биологии.', art: 'science', tone: 'coral' },
  { id: 16, title: 'Настольная игра', category: 'Игры', price: 1500, description: 'Полноценная игра для семьи или компании — приз, которым можно делиться.', art: 'game', tone: 'green' },
  { id: 17, title: 'Набор для лепки', category: 'Творчество', price: 1500, description: 'Полимерная глина или масса для лепки с инструментами и материалами.', art: 'craft', tone: 'yellow' },
  { id: 18, title: 'Сертификат на мастер-класс', category: 'Сертификаты', price: 1500, description: 'Новый опыт по интересам: рисование, керамика, кулинария или другое занятие.', art: 'certificate', tone: 'sage' },
  { id: 19, title: 'Большой набор для опытов', category: 'Хобби', price: 1750, description: 'Расширенный набор для серии экспериментов и самостоятельных открытий.', art: 'science', tone: 'coral' },
  { id: 20, title: 'Конструктор', category: 'Игры', price: 1750, description: 'Модель техники, здания или механизма для увлекательной сборки.', art: 'construction', tone: 'green' },
  { id: 21, title: 'Набор для каллиграфии', category: 'Творчество', price: 1750, description: 'Перья, держатели, чернила и бумага для красивого письма и надписей.', art: 'calligraphy', tone: 'yellow' },
  { id: 22, title: 'Книжная серия', category: 'Книги', price: 2000, description: 'Несколько томов любимой истории или красивое подарочное издание.', art: 'book', tone: 'sage' },
  { id: 23, title: 'Большой творческий набор', category: 'Творчество', price: 2000, description: 'Солидный набор материалов для живописи, рукоделия или другого хобби.', art: 'art', tone: 'coral' },
  { id: 24, title: 'Подарок на выбор', category: 'Сертификаты', price: 2000, description: 'Сертификат или заранее согласованный подарок, который ученик выберет сам.', art: 'certificate', tone: 'green' },
]

export const categories = ['Все', 'Канцелярия', 'Книги', 'Творчество', 'Игры', 'Хобби', 'Сертификаты'] as const

export function savingPlan(price: number) {
  if (price <= 1000) {
    const weeks = price / 250
    if (weeks === 1) return '1 отложенная неделя'
    if (weeks === 4) return '4 недели или бонус месяца'
    return `${weeks} отложенные недели`
  }
  const weeks = (price - 1000) / 250
  return `бонус месяца + ${weeks} ${weeks === 1 ? 'неделя' : 'недели'}`
}
