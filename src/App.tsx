import { useMemo, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { ArrowDown, ArrowRight, Check, Minus, Plus, RotateCcw } from 'lucide-react'
import GiftArt from './components/GiftArt'
import { categories, gifts, savingPlan } from './data/gifts'
import type { Gift } from './data/gifts'
import './App.css'

const money = (value: number) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`

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
          {remaining === 0 ? 'Уже доступно' : `Осталось ${money(remaining)}`}
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
  const [savedWeeks, setSavedWeeks] = useState(4)
  const [monthBonus, setMonthBonus] = useState(true)
  const [category, setCategory] = useState<(typeof categories)[number]>('Все')
  const [priceLimit, setPriceLimit] = useState('all')
  const [onlyAffordable, setOnlyAffordable] = useState(false)
  const [goalId, setGoalId] = useState<number | null>(null)
  const heroVisual = useRef<HTMLDivElement>(null)

  const savings = savedWeeks * 250 + (monthBonus ? 1000 : 0)
  const goal = gifts.find((gift) => gift.id === goalId) ?? null
  const filteredGifts = useMemo(() => gifts.filter((gift) => {
    const categoryMatches = category === 'Все' || gift.category === category
    const priceMatches = priceLimit === 'all' || gift.price <= Number(priceLimit)
    const savingsMatch = !onlyAffordable || gift.price <= savings
    return categoryMatches && priceMatches && savingsMatch
  }), [category, priceLimit, onlyAffordable, savings])

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

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Призовая копилка — наверх">
          <span className="brand-mark" aria-hidden="true">П</span>
          <span>Призовая<br />копилка</span>
        </a>
        <nav className="main-nav" aria-label="Основная навигация">
          <a href="#how">Как копить</a>
          <a href="#catalog">Каталог</a>
          <a href="#rules">Правила</a>
        </nav>
        <a className="header-budget" href="#savings">2000 ₽ <span>/ месяц</span></a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="section-label">Система призов за домашние задания</p>
            <h1 id="hero-title">Маленькие призы.<br /><span>Большая цель.</span></h1>
            <p className="hero-intro">Каждую неделю можно взять небольшой подарок или отложить 250 ₽. В конце месяца к копилке добавляется ещё 1000 ₽.</p>
            <div className="hero-actions">
              <a className="primary-link" href="#catalog">Смотреть 24 приза <ArrowDown size={19} aria-hidden="true" /></a>
              <a className="text-link" href="#how">Как работает копилка</a>
            </div>
          </div>

          <div className="hero-visual" ref={heroVisual} onPointerMove={moveHero} onPointerLeave={resetHero} aria-label="Подарок и накопления за четыре недели">
            <div className="hero-note hero-note--one">ДЗ выполнено <Check size={17} aria-hidden="true" /></div>
            <div className="hero-note hero-note--two">+ 250 ₽</div>
            <div className="hero-note hero-note--three">Бонус месяца <strong>+ 1000 ₽</strong></div>
            <svg className="hero-gift" viewBox="0 0 480 430" role="img" aria-label="Подарочная коробка с лентой">
              <path d="M83 359c80-31 237-31 317 0-80 35-237 35-317 0Z" fill="#1e1e1e" opacity=".08" />
              <path d="m121 163 222-1 33 177-226 2z" fill="#009147" stroke="#1e1e1e" strokeWidth="3" strokeLinejoin="round" />
              <path d="m121 163 54 42 175 134-200 2z" fill="#007a3c" opacity=".55" />
              <path d="M98 133h270v71H98z" fill="#f6dd38" stroke="#1e1e1e" strokeWidth="3" />
              <path d="M210 133h48v208h-48z" fill="#f6dd38" stroke="#1e1e1e" strokeWidth="3" />
              <path d="M235 131c-48-10-92-42-76-72 14-26 61 10 76 72Z" fill="#d7846f" stroke="#1e1e1e" strokeWidth="3" />
              <path d="M235 131c48-10 92-42 76-72-14-26-61 10-76 72Z" fill="#d7846f" stroke="#1e1e1e" strokeWidth="3" />
              <path d="M235 131c-26-39-31-86-5-89 25-3 28 47 5 89Z" fill="#f5f5f0" stroke="#1e1e1e" strokeWidth="3" />
              <circle cx="235" cy="132" r="18" fill="#f6dd38" stroke="#1e1e1e" strokeWidth="3" />
              <path d="m91 68 7 17 18 2-14 12 4 18-15-9-16 9 4-18-14-12 18-2z" fill="#f6dd38" stroke="#1e1e1e" strokeWidth="2.5" />
              <path d="m384 71 5 12 13 1-10 9 3 13-11-7-11 7 3-13-10-9 13-1z" fill="#b2b5a8" stroke="#1e1e1e" strokeWidth="2.5" />
              <path d="M375 246v39M356 265h39" fill="none" stroke="#1e1e1e" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="hero-total"><span>всё в копилку</span><strong>2000 ₽</strong></div>
          </div>
        </section>

        <section className="how-strip" id="how" aria-label="Как накапливаются призы">
          <div><span>01 / неделя</span><strong>250 ₽</strong><p>Взять маленький приз сразу или оставить в копилке.</p></div>
          <div><span>02 / месяц</span><strong>+ 1000 ₽</strong><p>Добавляется за выполнение общей месячной нормы.</p></div>
          <div><span>03 / максимум</span><strong>2000 ₽</strong><p>Если отложить все четыре недели и получить бонус.</p></div>
        </section>

        <section className="catalog-layout" id="catalog" aria-labelledby="catalog-title">
          <aside className="savings-panel" id="savings" aria-labelledby="savings-title">
            <p className="section-label">Интерактивный расчёт</p>
            <h2 id="savings-title">Моя копилка</h2>
            <div className="savings-total" aria-live="polite">{money(savings)}</div>
            <div className="progress-track" role="progressbar" aria-label="Накоплено от месячного бюджета" aria-valuemin={0} aria-valuemax={2000} aria-valuenow={savings}>
              <span style={{ transform: `scaleX(${savings / 2000})` }} />
            </div>
            <p className="progress-caption">{money(savings)} из 2000 ₽</p>

            <div className="weeks-control">
              <div>
                <label>Отложенные недели</label>
                <span>по 250 ₽</span>
              </div>
              <div className="stepper">
                <button type="button" onClick={() => setSavedWeeks((value) => Math.max(0, value - 1))} disabled={savedWeeks === 0} aria-label="Убрать одну неделю"><Minus size={18} /></button>
                <output aria-live="polite">{savedWeeks}</output>
                <button type="button" onClick={() => setSavedWeeks((value) => Math.min(4, value + 1))} disabled={savedWeeks === 4} aria-label="Добавить одну неделю"><Plus size={18} /></button>
              </div>
            </div>
            <div className="week-marks" aria-hidden="true">
              {[0, 1, 2, 3].map((week) => <span key={week} className={week < savedWeeks ? 'is-saved' : ''}>{week + 1}</span>)}
            </div>

            <label className="bonus-toggle">
              <span><strong>Бонус месяца</strong><small>+ 1000 ₽ к накоплениям</small></span>
              <input type="checkbox" checked={monthBonus} onChange={(event) => setMonthBonus(event.target.checked)} />
              <span className="toggle-track" aria-hidden="true"><span /></span>
            </label>

            <div className="savings-actions">
              <button className="fill-button" type="button" onClick={() => { setSavedWeeks(4); setMonthBonus(true) }}>Всё в копилку</button>
              <button className="reset-button" type="button" onClick={() => { setSavedWeeks(0); setMonthBonus(false) }}><RotateCcw size={15} aria-hidden="true" /> Сбросить</button>
            </div>

            <div className="goal-summary" aria-live="polite">
              <span>Выбранная цель</span>
              {goal ? <>
                <strong>{goal.title}</strong>
                <p>{savings >= goal.price ? 'Приз уже доступен — цель достигнута.' : `Осталось накопить ${money(goal.price - savings)}.`}</p>
              </> : <p>Нажмите «Выбрать целью» на любом призе, чтобы следить за прогрессом.</p>}
            </div>
          </aside>

          <div className="catalog-content">
            <div className="catalog-heading">
              <div>
                <p className="section-label">8 уровней · 3 идеи на каждый</p>
                <h2 id="catalog-title">Каталог призов</h2>
              </div>
              <p>Стоимость ориентировочная: любой вариант можно заменить на равноценный подарок по интересам ученика.</p>
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
                  </select>
                </label>
                <label className="affordable-check"><input type="checkbox" checked={onlyAffordable} onChange={(event) => setOnlyAffordable(event.target.checked)} /><span>По моей копилке</span></label>
              </div>
            </div>

            <div className="results-meta"><span>Показано: {filteredGifts.length}</span><span>{money(savings)} в копилке</span></div>

            {filteredGifts.length > 0 ? <div className="gift-grid">
              {filteredGifts.map((gift, index) => <GiftCard key={gift.id} gift={gift} savings={savings} selected={goalId === gift.id} onSelect={() => setGoalId(gift.id)} featured={index % 7 === 0 && filteredGifts.length > 4} />)}
            </div> : <div className="empty-state">
              <h3>Пока не хватает накоплений</h3>
              <p>Попробуйте увеличить копилку или сбросить фильтры — подарки начинаются от 250 ₽.</p>
              <button type="button" onClick={resetFilters}>Показать все призы</button>
            </div>}
          </div>
        </section>

        <section className="rules-section" id="rules" aria-labelledby="rules-title">
          <div>
            <p className="section-label">Чтобы награда помогала учиться</p>
            <h2 id="rules-title">Правила без подвоха</h2>
          </div>
          <div className="rules-list">
            <article><span>01</span><div><h3>Считаем выполнение, не идеальность</h3><p>Ошибки не отнимают награду. Доработанное после разбора задание тоже засчитывается.</p></div></article>
            <article><span>02</span><div><h3>Оставляем способ наверстать</h3><p>Пропуск по уважительной причине не перечёркивает месяц — дату сдачи можно перенести заранее.</p></div></article>
            <article><span>03</span><div><h3>Даём настоящий выбор</h3><p>Взять приз сейчас или копить — оба решения правильные. Уже заработанное не вычитается.</p></div></article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand brand--footer" href="#top"><span className="brand-mark" aria-hidden="true">П</span><span>Призовая<br />копилка</span></a>
        <p>24 идеи для индивидуальных занятий.<br />Бюджет — до 2000 ₽ в месяц.</p>
        <a className="text-link" href="#top">Наверх <ArrowRight size={16} aria-hidden="true" /></a>
      </footer>
    </div>
  )
}
