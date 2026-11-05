import { useEffect, useMemo, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import {
  ArrowDown, ArrowRight, BookOpenCheck, CalendarCheck2, Check, Flame,
  Gift as GiftIcon, LockKeyhole, Minus, Plus, RotateCcw, Sparkles, TicketCheck,
  Trophy, Zap,
} from 'lucide-react'
import GiftArt from './components/GiftArt'
import { categories, gifts, savingPlan } from './data/gifts'
import type { Gift } from './data/gifts'
import './App.css'

const money = (value: number) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`
const STORAGE_KEY = 'prize-kopilka-cycle-v2'

type MissionId = 'start' | 'explain' | 'error'
type CycleProgress = {
  homework: number
  lessonsOk: boolean
  goalId: number | null
  mission: MissionId
  missionDone: boolean
}

const initialProgress: CycleProgress = {
  homework: 0,
  lessonsOk: true,
  goalId: null,
  mission: 'start',
  missionDone: false,
}

const missions: { id: MissionId; title: string; short: string; description: string }[] = [
  { id: 'start', title: 'Самостоятельный старт', short: 'Без напоминания', description: 'Начать домашку без напоминания и самому выбрать, с какой задачи стартовать.' },
  { id: 'explain', title: 'Объясни как репетитор', short: 'Одна задача вслух', description: 'Выбрать самую интересную задачу и объяснить ход решения так, будто рассказываешь другу.' },
  { id: 'error', title: 'Охота за ошибкой', short: 'Найти и исправить', description: 'После проверки исправить одну ошибку и коротко записать, почему она появилась.' },
]

const achievements = [
  { required: 2, title: 'Разгон', label: '2 домашки', text: 'Первые две домашки позади. Ты уже не в начале пути — осталось шесть шагов.', icon: Zap },
  { required: 4, title: 'Половина пути', label: '4 домашки', text: 'В копилке 1000 ₽ без бонуса. Самое время проверить, к какой цели ты ближе всего.', icon: Sparkles },
  { required: 6, title: 'Сильная серия', label: '6 домашек', text: 'Шесть шагов выполнены. Открывается бесплатный сюрприз, а до финиша остаются две домашки.', icon: Flame },
  { required: 8, title: 'Финиш цикла', label: '8 домашек', text: 'Вся основная сумма заработана. Если занятия в порядке, сверху добавляется единый бонус 1000 ₽.', icon: Trophy },
]

function loadProgress(): CycleProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialProgress
    const saved = JSON.parse(raw) as Partial<CycleProgress>
    const mission = missions.some((item) => item.id === saved.mission) ? saved.mission as MissionId : 'start'
    return {
      homework: typeof saved.homework === 'number' ? Math.max(0, Math.min(8, Math.round(saved.homework))) : 0,
      lessonsOk: typeof saved.lessonsOk === 'boolean' ? saved.lessonsOk : true,
      goalId: typeof saved.goalId === 'number' && gifts.some((gift) => gift.id === saved.goalId) ? saved.goalId : null,
      mission,
      missionDone: saved.missionDone === true,
    }
  } catch {
    return initialProgress
  }
}

function GiftCard({ gift, savings, selected, onSelect, featured }: {
  gift: Gift
  savings: number
  selected: boolean
  onSelect: () => void
  featured: boolean
}) {
  const remaining = Math.max(0, gift.price - savings)
  return (
    <article className={`gift-card${featured ? ' gift-card--featured' : ''}${selected ? ' is-selected' : ''}`}>
      <div className={`gift-art gift-art--${gift.tone}`}>
        <span className="gift-category">{gift.category}</span>
        <GiftArt art={gift.art} tone={gift.tone} title={gift.title} />
        <span className={`availability${remaining === 0 ? ' is-available' : ''}`}>
          {remaining === 0 ? 'Уже доступно' : `Ещё ${money(remaining)}`}
        </span>
      </div>
      <div className="gift-content">
        <div className="gift-heading">
          <div>
            <p className="gift-plan">{savingPlan(gift.price)}</p>
            <h3>{gift.title}</h3>
          </div>
          <strong>{money(gift.price)}</strong>
        </div>
        <p className="gift-description">{gift.description}</p>
        <button className={`goal-button${selected ? ' is-selected' : ''}`} type="button" onClick={onSelect} aria-pressed={selected}>
          {selected ? <><Check size={17} aria-hidden="true" /> Цель выбрана</> : <>Выбрать целью <ArrowRight size={17} aria-hidden="true" /></>}
        </button>
      </div>
    </article>
  )
}

export default function App() {
  const [progress, setProgress] = useState<CycleProgress>(loadProgress)
  const [category, setCategory] = useState<(typeof categories)[number]>('Все')
  const [priceLimit, setPriceLimit] = useState('all')
  const [onlyAffordable, setOnlyAffordable] = useState(false)
  const [revealedAchievement, setRevealedAchievement] = useState<number | null>(null)
  const [surpriseRevealed, setSurpriseRevealed] = useState(false)
  const heroVisual = useRef<HTMLDivElement>(null)

  const { homework, lessonsOk, goalId, mission, missionDone } = progress
  const bonusEarned = homework === 8 && lessonsOk
  const baseSavings = homework * 250
  const savings = baseSavings + (bonusEarned ? 1000 : 0)
  const goal = gifts.find((gift) => gift.id === goalId) ?? null
  const selectedMission = missions.find((item) => item.id === mission) ?? missions[0]
  const unlockedCount = achievements.filter((item) => homework >= item.required).length

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {
      // The calculator remains usable when browser storage is unavailable.
    }
  }, [progress])

  const filteredGifts = useMemo(() => gifts.filter((gift) => {
    const categoryMatches = category === 'Все' || gift.category === category
    const priceMatches = priceLimit === 'all' || gift.price <= Number(priceLimit)
    const savingsMatch = !onlyAffordable || gift.price <= savings
    return categoryMatches && priceMatches && savingsMatch
  }), [category, priceLimit, onlyAffordable, savings])

  const updateHomework = (delta: number) => {
    setProgress((current) => ({ ...current, homework: Math.max(0, Math.min(8, current.homework + delta)) }))
  }

  const moveHero = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    heroVisual.current?.style.setProperty('--pointer-x', x.toFixed(3))
    heroVisual.current?.style.setProperty('--pointer-y', y.toFixed(3))
  }

  const resetHero = () => {
    heroVisual.current?.style.setProperty('--pointer-x', '0')
    heroVisual.current?.style.setProperty('--pointer-y', '0')
  }

  const resetFilters = () => {
    setCategory('Все')
    setPriceLimit('all')
    setOnlyAffordable(false)
  }

  const resetCycle = () => {
    setProgress(initialProgress)
    setRevealedAchievement(null)
    setSurpriseRevealed(false)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Призовая копилка — наверх">
          <span className="brand-mark" aria-hidden="true">П</span>
          <span>Призовая<br />копилка</span>
        </a>
        <nav className="main-nav" aria-label="Основная навигация">
          <a href="#how">Как копить</a>
          <a href="#quest">Квест</a>
          <a href="#catalog">Каталог</a>
          <a href="#rules">Правила</a>
        </nav>
        <a className="header-budget" href="#savings">3000 ₽ <span>/ цикл</span></a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="section-label">Домашки превращаются в подарки</p>
            <h1 id="hero-title">Каждая домашка<br /><span>приближает приз.</span></h1>
            <p className="hero-intro">250 ₽ за каждую выполненную домашку. Обычно их две в неделю — значит, 500 ₽. За полный цикл и занятия без неотработанных пропусков — единый бонус 1000 ₽.</p>
            <div className="hero-actions">
              <a className="primary-link" href="#catalog">Выбрать из 30 призов <ArrowDown size={19} aria-hidden="true" /></a>
              <a className="text-link" href="#quest">Посмотреть квест <ArrowRight size={16} aria-hidden="true" /></a>
            </div>
          </div>

          <div className="hero-visual" ref={heroVisual} onPointerMove={moveHero} onPointerLeave={resetHero} aria-label="Максимальная награда за четырёхнедельный цикл">
            <div className="hero-note hero-note--one">2 ДЗ в неделю <Check size={17} aria-hidden="true" /></div>
            <div className="hero-note hero-note--two">+ 250 ₽ за каждую</div>
            <div className="hero-note hero-note--three">Единый бонус <strong>+ 1000 ₽</strong></div>
            <svg className="hero-gift" viewBox="0 0 480 430" role="img" aria-label="Подарочная коробка с лентой">
              <path d="M83 359c80-31 237-31 317 0-80 35-237 35-317 0Z" fill="#272525" opacity=".08" />
              <path d="m121 163 222-1 33 177-226 2z" fill="#00D9A3" stroke="#272525" strokeWidth="3" strokeLinejoin="round" />
              <path d="m121 163 54 42 175 134-200 2z" fill="#00A77F" opacity=".55" />
              <path d="M98 133h270v71H98z" fill="#FFCE80" stroke="#272525" strokeWidth="3" />
              <path d="M210 133h48v208h-48z" fill="#FFCE80" stroke="#272525" strokeWidth="3" />
              <path d="M235 131c-48-10-92-42-76-72 14-26 61 10 76 72Z" fill="#F28482" stroke="#272525" strokeWidth="3" />
              <path d="M235 131c48-10 92-42 76-72-14-26-61 10-76 72Z" fill="#F28482" stroke="#272525" strokeWidth="3" />
              <path d="M235 131c-26-39-31-86-5-89 25-3 28 47 5 89Z" fill="#F7EDE2" stroke="#272525" strokeWidth="3" />
              <circle cx="235" cy="132" r="18" fill="#FFCE80" stroke="#272525" strokeWidth="3" />
              <path d="m91 68 7 17 18 2-14 12 4 18-15-9-16 9 4-18-14-12 18-2z" fill="#FFCE80" stroke="#272525" strokeWidth="2.5" />
              <path d="m384 71 5 12 13 1-10 9 3 13-11-7-11 7 3-13-10-9 13-1z" fill="#84A59D" stroke="#272525" strokeWidth="2.5" />
              <path d="M375 246v39M356 265h39" fill="none" stroke="#272525" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="hero-total"><span>максимум за 4 недели</span><strong>3000 ₽</strong></div>
          </div>
        </section>

        <section className="how-strip" id="how" aria-label="Как накапливаются призы">
          <div><span>01 / каждая домашка</span><strong>250 ₽</strong><p>Восемь выполненных домашек за цикл — основная сумма до 2000 ₽.</p></div>
          <div><span>02 / полный цикл</span><strong>+ 1000 ₽</strong><p>Единый бонус за все домашки и занятия без неотработанных пропусков.</p></div>
          <div><span>03 / максимум</span><strong>3000 ₽</strong><p>Пропущенное занятие можно перенести или отработать и сохранить бонус.</p></div>
        </section>

        <section className="quest-section" id="quest" aria-labelledby="quest-title">
          <div className="quest-heading">
            <div>
              <p className="section-label">Миссии и коллекция · не влияют на бюджет</p>
              <h2 id="quest-title">Сделал — открыл.<br />Собери весь цикл.</h2>
            </div>
            <p>Карточки открываются за выполненные домашки, а не за случайные шансы. Выбирай миссию, следи за серией и забери бесплатный сюрприз после шестого шага.</p>
          </div>

          <div className="quest-grid">
            <article className="mission-panel" aria-labelledby="mission-title">
              <div className="panel-kicker"><BookOpenCheck size={19} aria-hidden="true" /> Миссия на выбор</div>
              <h3 id="mission-title">Добавь вызов в следующую домашку</h3>
              <div className="mission-options" role="group" aria-label="Выбор миссии">
                {missions.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={mission === item.id ? 'is-active' : ''}
                    aria-pressed={mission === item.id}
                    onClick={() => setProgress((current) => ({ ...current, mission: item.id, missionDone: false }))}
                  >
                    <span>0{index + 1}</span>
                    <strong>{item.title}</strong>
                    <small>{item.short}</small>
                  </button>
                ))}
              </div>
              <div className="mission-detail" aria-live="polite">
                <p>{selectedMission.description}</p>
                <button
                  type="button"
                  className={missionDone ? 'is-done' : ''}
                  onClick={() => setProgress((current) => ({ ...current, missionDone: !current.missionDone }))}
                >
                  {missionDone ? <><Check size={17} aria-hidden="true" /> Штамп получен</> : <>Отметить выполнение <ArrowRight size={17} aria-hidden="true" /></>}
                </button>
              </div>
              <p className="mission-note">Штамп — игровое достижение. Денежный баланс он не меняет.</p>
            </article>

            <article className="collection-panel" aria-labelledby="collection-title">
              <div className="collection-heading">
                <div>
                  <div className="panel-kicker"><Trophy size={19} aria-hidden="true" /> Коллекция цикла</div>
                  <h3 id="collection-title">Четыре карточки — четыре рубежа</h3>
                </div>
                <strong aria-live="polite">{unlockedCount} / 4</strong>
              </div>
              <div className="achievement-grid">
                {achievements.map((item, index) => {
                  const unlocked = homework >= item.required
                  const revealed = revealedAchievement === index
                  const Icon = item.icon
                  return (
                    <button
                      key={item.title}
                      type="button"
                      className={`achievement-card${unlocked ? ' is-unlocked' : ''}${revealed ? ' is-revealed' : ''}`}
                      disabled={!unlocked}
                      aria-pressed={revealed}
                      onClick={() => setRevealedAchievement(revealed ? null : index)}
                    >
                      <span className="achievement-top">
                        {unlocked ? <Icon size={23} aria-hidden="true" /> : <LockKeyhole size={20} aria-hidden="true" />}
                        <small>{item.label}</small>
                      </span>
                      <strong>{unlocked ? item.title : 'Пока закрыто'}</strong>
                      <span className="achievement-text">{revealed ? item.text : unlocked ? 'Нажми, чтобы открыть карточку' : `Выполни ещё ${item.required - homework}`}</span>
                    </button>
                  )
                })}
              </div>
              <button
                className={`surprise-card${homework >= 6 ? ' is-unlocked' : ''}${surpriseRevealed && homework >= 6 ? ' is-revealed' : ''}`}
                type="button"
                disabled={homework < 6}
                onClick={() => setSurpriseRevealed(true)}
              >
                {surpriseRevealed && homework >= 6 ? <TicketCheck size={29} aria-hidden="true" /> : <GiftIcon size={29} aria-hidden="true" />}
                <span>
                  <strong>{surpriseRevealed && homework >= 6 ? 'Сюрприз: выбор формата занятия' : 'Запечатанный сюрприз'}</strong>
                  <small>{surpriseRevealed && homework >= 6 ? 'Выбери мини-игру, дуэль или разбор любимой темы в финале следующего занятия.' : homework >= 6 ? 'Нажми и посмотри, что внутри' : `Откроется после 6 домашек · ещё ${Math.max(0, 6 - homework)}`}</small>
                </span>
              </button>
            </article>
          </div>
        </section>

        <section className="catalog-layout" id="catalog" aria-labelledby="catalog-title">
          <aside className="savings-panel" id="savings" aria-labelledby="savings-title">
            <p className="section-label">Интерактивный расчёт</p>
            <h2 id="savings-title">Моя копилка</h2>
            <div className="savings-total" aria-live="polite">{money(savings)}</div>
            <div className="progress-track" role="progressbar" aria-label="Накоплено от максимума за цикл" aria-valuemin={0} aria-valuemax={3000} aria-valuenow={savings}>
              <span style={{ transform: `scaleX(${savings / 3000})` }} />
            </div>
            <p className="progress-caption">{money(savings)} из 3000 ₽ · {homework} из 8 домашек</p>
            <div className="savings-breakdown"><span>За домашки: {money(baseSavings)}</span><span>Бонус: {bonusEarned ? '+ 1000 ₽' : '0 ₽'}</span></div>

            <div className="weeks-control">
              <div>
                <label>Выполненные домашки</label>
                <span>по 250 ₽ каждая</span>
              </div>
              <div className="stepper">
                <button type="button" onClick={() => updateHomework(-1)} disabled={homework === 0} aria-label="Убрать одну домашку"><Minus size={18} /></button>
                <output aria-live="polite">{homework}</output>
                <button type="button" onClick={() => updateHomework(1)} disabled={homework === 8} aria-label="Добавить одну домашку"><Plus size={18} /></button>
              </div>
            </div>
            <div className="week-marks" aria-label={`Выполнено ${homework} из 8 домашек`}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => <span key={item} className={item < homework ? 'is-saved' : ''} aria-hidden="true">{item < homework ? <Check size={13} /> : item + 1}</span>)}
            </div>

            <div className={`bonus-status${bonusEarned ? ' is-earned' : ''}`} aria-live="polite">
              <CalendarCheck2 size={20} aria-hidden="true" />
              <span><strong>{bonusEarned ? 'Бонус 1000 ₽ получен' : 'Бонус 1000 ₽ пока закрыт'}</strong><small>{bonusEarned ? 'Все условия цикла выполнены' : 'Нужны 8 домашек и занятия в порядке'}</small></span>
            </div>

            <label className="bonus-toggle">
              <span><strong>Занятия в порядке</strong><small>Нет неотработанных пропусков</small></span>
              <input type="checkbox" checked={lessonsOk} onChange={(event) => setProgress((current) => ({ ...current, lessonsOk: event.target.checked }))} />
              <span className="toggle-track" aria-hidden="true"><span /></span>
            </label>
            <p className="transfer-note">Перенёс или отработал занятие — условие снова выполнено, бонус сохранён.</p>

            <div className="savings-actions">
              <button className="fill-button" type="button" onClick={() => setProgress((current) => ({ ...current, homework: 8, lessonsOk: true }))}>Показать максимум</button>
              <button className="reset-button" type="button" onClick={resetCycle}><RotateCcw size={15} aria-hidden="true" /> Начать цикл заново</button>
            </div>

            <div className="goal-summary" aria-live="polite">
              <span>Выбранная цель</span>
              {goal ? <><strong>{goal.title}</strong><p>{goal.price <= savings ? 'Уже можно получить. Можно забрать приз или выбрать цель больше.' : `До цели ещё ${money(goal.price - savings)}. Прогресс: ${Math.min(100, Math.round(savings / goal.price * 100))}%.`}</p></> : <p>Нажми «Выбрать целью» на любом призе — копилка покажет, сколько осталось.</p>}
            </div>
            <p className="storage-note">Черновик цикла сохраняется только в этом браузере.</p>
          </aside>

          <div className="catalog-content">
            <div className="catalog-heading">
              <div>
                <p className="section-label">30 идей · 10 уровней бюджета</p>
                <h2 id="catalog-title">Каталог призов</h2>
              </div>
              <p>Цены ориентировочные. Модель, дизайн и покупку согласуем заранее; любой вариант можно заменить равноценным.</p>
            </div>

            <div className="filters" aria-label="Фильтры каталога">
              <div className="category-filters" role="group" aria-label="Категория подарка">
                {categories.map((item) => <button key={item} type="button" className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}
              </div>
              <div className="filter-row">
                <label className="price-select">Сумма
                  <select value={priceLimit} onChange={(event) => setPriceLimit(event.target.value)}>
                    <option value="all">Любая</option>
                    <option value="500">До 500 ₽</option>
                    <option value="1000">До 1000 ₽</option>
                    <option value="1500">До 1500 ₽</option>
                    <option value="2000">До 2000 ₽</option>
                    <option value="3000">До 3000 ₽</option>
                  </select>
                </label>
                <label className="affordable-check"><input type="checkbox" checked={onlyAffordable} onChange={(event) => setOnlyAffordable(event.target.checked)} /><span>По моей копилке</span></label>
              </div>
            </div>

            <div className="results-meta"><span>Показано: {filteredGifts.length}</span><span>{money(savings)} в копилке</span></div>

            {filteredGifts.length > 0 ? <div className="gift-grid">
              {filteredGifts.map((gift, index) => <GiftCard key={gift.id} gift={gift} savings={savings} selected={goalId === gift.id} onSelect={() => setProgress((current) => ({ ...current, goalId: gift.id }))} featured={index % 7 === 0 && filteredGifts.length > 4} />)}
            </div> : <div className="empty-state">
              <h3>Пока не хватает накоплений</h3>
              <p>Добавь выполненные домашки или сбрось фильтры — подарки начинаются от 250 ₽.</p>
              <button type="button" onClick={resetFilters}>Показать все призы</button>
            </div>}
          </div>
        </section>

        <section className="rules-section" id="rules" aria-labelledby="rules-title">
          <div>
            <p className="section-label">Чтобы награда помогала учиться</p>
            <h2 id="rules-title">Правила без подвоха</h2>
            <p className="rules-intro">Для ученика — понятная игра. Для родителей — прозрачный бюджет и заранее согласованный каталог.</p>
          </div>
          <div className="rules-list">
            <article><span>01</span><div><h3>Считаем выполнение, не идеальность</h3><p>Ошибки не отнимают награду. Доработанное после разбора задание тоже засчитывается.</p></div></article>
            <article><span>02</span><div><h3>Оставляем способ наверстать</h3><p>Пропущенное занятие можно перенести или отработать. После этого условие для единого бонуса 1000 ₽ снова считается выполненным.</p></div></article>
            <article><span>03</span><div><h3>Не превращаем призы в лотерею</h3><p>Карточки, миссии и сюрприз бесплатны и не меняют денежный баланс. Нельзя купить шанс или проиграть уже заработанное.</p></div></article>
            <article><span>04</span><div><h3>Выдаём вещь, а не наличные</h3><p>Подарок выбирает ученик из согласованного каталога. Цена, доставка или равноценная замена фиксируются до покупки.</p></div></article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand brand--footer" href="#top"><span className="brand-mark" aria-hidden="true">П</span><span>Призовая<br />копилка</span></a>
        <p>30 идей для учеников 8–9 классов.<br />До 3000 ₽ за четырёхнедельный цикл.</p>
        <a className="text-link" href="#top">Наверх <ArrowRight size={16} aria-hidden="true" /></a>
      </footer>
    </div>
  )
}
