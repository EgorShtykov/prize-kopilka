import type { Gift } from '../data/gifts'

type Props = Pick<Gift, 'art' | 'tone' | 'title'>

const ink = '#272525'
const paper = '#F7EDE2'
const yellow = '#FFCE80'
const green = '#00D9A3'
const sage = '#84A59D'
const coral = '#F28482'

export default function GiftArt({ art, tone, title }: Props) {
  const accent = tone === 'yellow' ? yellow : tone === 'green' ? green : tone === 'coral' ? coral : sage
  const common = { stroke: ink, strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  const drawing = (() => {
    switch (art) {
      case 'stationery':
        return <>
          <path d="M62 122 102 48l75 37-40 50z" fill={accent} {...common} />
          <path d="m102 48 15-9 75 37-15 9z" fill={paper} {...common} />
          <path d="m79 102 26-34 25 12-26 34z" fill={paper} {...common} />
          <path d="m116 121 18-24 25 12-18 24z" fill={yellow} {...common} />
          <circle cx="172" cy="54" r="14" fill={coral} {...common} />
          <path d="m168 54 3 3 6-7" fill="none" {...common} />
        </>
      case 'bookmark':
        return <>
          <path d="M91 30h78v113l-39-25-39 25z" fill={accent} {...common} />
          <path d="M108 53h44M108 67h31" fill="none" {...common} />
          <path d="m130 88 5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z" fill={yellow} {...common} />
          <path d="M77 143h106" fill="none" {...common} opacity=".25" />
        </>
      case 'keychain':
        return <>
          <circle cx="132" cy="52" r="25" fill="none" {...common} />
          <circle cx="132" cy="52" r="15" fill="none" {...common} />
          <path d="m118 73-15 21M146 73l15 21" fill="none" {...common} />
          <path d="m132 77 13 18 22 3-16 16 4 23-23-11-22 11 4-23-16-16 22-3z" fill={accent} {...common} />
          <circle cx="132" cy="108" r="8" fill={paper} {...common} />
        </>
      case 'pens':
        return <>
          <path d="m72 119 22-78 19 5-22 78-15 12z" fill={accent} {...common} />
          <path d="m109 126 37-75 18 9-37 75-16 9z" fill={yellow} {...common} />
          <path d="m146 129 46-61 15 11-46 61-17 5z" fill={coral} {...common} />
          <path d="m88 62 20 5M139 72l20 10M184 86l16 12" fill="none" {...common} />
          <path d="M65 144h147" fill="none" {...common} opacity=".25" />
        </>
      case 'book':
        return <>
          <path d="M58 47c29-9 53-4 72 13v80c-19-17-43-22-72-13z" fill={paper} {...common} />
          <path d="M202 47c-29-9-53-4-72 13v80c19-17 43-22 72-13z" fill={accent} {...common} />
          <path d="M130 60v80M74 67c17-4 30-1 41 7M74 82c17-4 30-1 41 7M74 97c17-4 30-1 41 7" fill="none" {...common} />
          <path d="M145 74c11-8 24-11 41-7M145 89c11-8 24-11 41-7M145 104c11-8 24-11 41-7" fill="none" {...common} />
          <path d="m167 42 9-17 9 17" fill={yellow} {...common} />
        </>
      case 'puzzle':
        return <>
          <path d="M67 46h44c-4 16 5 25 17 25s21-9 17-25h45v42c-16-4-25 5-25 17s9 21 25 17v22H67v-38c16 4 25-5 25-17s-9-21-25-17z" fill={accent} {...common} />
          <path d="m130 79 7 14 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2z" fill={yellow} {...common} />
        </>
      case 'sketchbook':
        return <>
          <path d="M78 30h112v116H78z" fill={accent} {...common} />
          <path d="M96 30v116" fill="none" {...common} />
          <path d="M72 46h15M72 67h15M72 88h15M72 109h15M72 130h15" fill="none" {...common} />
          <path d="M113 109c15-32 26-41 35-28 8 12 12 6 24-19" fill="none" {...common} />
          <path d="m154 49 6 11 12 2-9 8 2 12-11-6-11 6 2-12-9-8 12-2z" fill={yellow} {...common} />
        </>
      case 'game':
        return <>
          <path d="m54 73 78-38 74 42-78 38z" fill={accent} {...common} />
          <path d="m54 73 4 48 72 37-2-43z" fill={sage} {...common} />
          <path d="m128 115 78-38-5 47-71 34z" fill={paper} {...common} />
          <circle cx="95" cy="75" r="10" fill={yellow} {...common} />
          <circle cx="132" cy="60" r="10" fill={coral} {...common} />
          <circle cx="164" cy="79" r="10" fill={paper} {...common} />
          <path d="m82 110 23 12M148 124l26-13" fill="none" {...common} />
        </>
      case 'tape':
        return <>
          <circle cx="100" cy="89" r="48" fill={accent} {...common} />
          <circle cx="100" cy="89" r="22" fill={paper} {...common} />
          <path d="M137 125c20-31 31-58 48-53 14 5 5 29-7 34-13 6-18-8-9-14 12-8 26 13 30 42" fill="none" {...common} strokeWidth="12" />
          <path d="M137 125c20-31 31-58 48-53 14 5 5 29-7 34-13 6-18-8-9-14 12-8 26 13 30 42" fill="none" stroke={yellow} strokeWidth="6" strokeLinecap="round" />
        </>
      case 'art':
        return <>
          <path d="M72 42h105v91H72z" fill={paper} {...common} />
          <path d="M72 118 105 80l24 24 20-29 28 43" fill={accent} {...common} />
          <circle cx="105" cy="65" r="10" fill={yellow} {...common} />
          <path d="m55 139 122-104 12 14L67 153z" fill={coral} {...common} />
          <path d="m177 35 8-11 16 18-12 7z" fill={ink} {...common} />
          <path d="M45 149h157" fill="none" {...common} opacity=".25" />
        </>
      case 'certificate':
        return <>
          <path d="M59 38h142v98H59z" fill={paper} {...common} />
          <path d="M75 56h75M75 72h110M75 87h68" fill="none" {...common} />
          <circle cx="166" cy="105" r="25" fill={accent} {...common} />
          <path d="m153 124-8 28 21-12 21 12-8-28" fill={yellow} {...common} />
          <path d="m156 105 7 7 14-17" fill="none" {...common} />
        </>
      case 'science':
        return <>
          <path d="M105 28h49M119 28v48l-42 65c-5 9 1 15 12 15h86c11 0 17-6 12-15l-42-65V28" fill={paper} {...common} />
          <path d="m96 116 49-7 24 33c3 5 0 8-7 8H94c-7 0-10-3-7-8z" fill={accent} {...common} />
          <circle cx="116" cy="126" r="5" fill={yellow} {...common} />
          <circle cx="143" cy="137" r="7" fill={paper} {...common} />
          <circle cx="172" cy="59" r="13" fill={coral} {...common} />
          <circle cx="78" cy="65" r="8" fill={yellow} {...common} />
          <path d="M169 33v-9M190 42l7-7M68 46l-5-7" fill="none" {...common} />
        </>
      case 'merch':
        return <>
          <path d="m96 42 25 10c7 4 13 4 20 0l25-10 35 30-22 27-15-11v61H96V88L81 99 59 72z" fill={accent} {...common} />
          <path d="M116 50c2 18 26 18 30 0" fill="none" {...common} />
          <path d="m131 79 7 14 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2z" fill={yellow} {...common} />
        </>
      case 'craft':
        return <>
          <path d="M61 111c0-42 30-73 69-73s69 31 69 73c0 27-22 39-69 39s-69-12-69-39z" fill={accent} {...common} />
          <path d="M81 111c0-29 21-51 49-51s49 22 49 51" fill={paper} {...common} />
          <path d="m95 90 12 8 9-14 13 18 13-17 10 14 12-8" fill="none" {...common} />
          <circle cx="95" cy="125" r="5" fill={yellow} {...common} />
          <circle cx="130" cy="132" r="5" fill={coral} {...common} />
          <circle cx="165" cy="125" r="5" fill={paper} {...common} />
          <path d="m188 45 9-17 9 17 17 9-17 9-9 17-9-17-17-9z" fill={yellow} {...common} />
        </>
      case 'construction':
        return <>
          <path d="m58 110 72-43 72 43-72 43z" fill={accent} {...common} />
          <path d="m58 110 0-33 72-42 72 42v33l-72 43-72-43z" fill={paper} {...common} />
          <path d="m58 77 72 43 72-43M130 120v33" fill="none" {...common} />
          <path d="m92 58 72 43M94 139v-31M166 139v-31" fill="none" {...common} />
          <circle cx="94" cy="97" r="6" fill={yellow} {...common} />
          <circle cx="166" cy="97" r="6" fill={coral} {...common} />
          <circle cx="130" cy="55" r="6" fill={accent} {...common} />
        </>
      case 'calligraphy':
        return <>
          <path d="M60 45h125v99H60z" fill={paper} {...common} />
          <path d="M76 69c23-13 28 28 48 8 15-15 22-12 43 1M76 96c26-13 42 20 70-1M76 119h55" fill="none" {...common} />
          <path d="m152 139 36-101 19 7-36 101-17 12z" fill={accent} {...common} />
          <path d="m188 38 7-17 12 24z" fill={yellow} {...common} />
          <path d="m173 119 19 7" fill="none" {...common} />
        </>
      case 'speaker':
        return <>
          <rect x="72" y="30" width="116" height="120" rx="26" fill={accent} {...common} />
          <circle cx="130" cy="100" r="32" fill={paper} {...common} />
          <circle cx="130" cy="100" r="15" fill={yellow} {...common} />
          <circle cx="130" cy="51" r="8" fill={paper} {...common} />
          <path d="M101 143h58M52 71c-12 18-12 39 0 57M208 71c12 18 12 39 0 57" fill="none" {...common} />
        </>
      case 'headphones':
        return <>
          <path d="M69 99V82c0-37 25-57 61-57s61 20 61 57v17" fill="none" {...common} strokeWidth="12" />
          <path d="M69 93c-15 0-23 11-23 26s8 26 23 26h21V93zM191 93c15 0 23 11 23 26s-8 26-23 26h-21V93z" fill={accent} {...common} />
          <path d="M89 107v24M171 107v24" fill="none" {...common} />
          <path d="m130 54 6 12 14 2-10 9 2 14-12-7-12 7 2-14-10-9 14-2z" fill={yellow} {...common} />
        </>
      case 'printer':
        return <>
          <path d="M85 25h90v69H85z" fill={paper} {...common} />
          <path d="M101 40h58M101 53h38" fill="none" {...common} />
          <path d="M60 76h140v64H60z" fill={accent} {...common} />
          <path d="M80 103h100v53H80z" fill={paper} {...common} />
          <circle cx="176" cy="91" r="5" fill={yellow} {...common} />
          <path d="m97 140 20-20 16 15 14-12 17 17" fill={sage} {...common} />
          <circle cx="106" cy="115" r="6" fill={yellow} {...common} />
        </>
      case 'light':
        return <>
          <path d="M91 112h78l18 34H73z" fill={accent} {...common} />
          <path d="M105 112V89h50v23" fill={paper} {...common} />
          <path d="M64 69c18-38 114-38 132 0-31 23-101 23-132 0Z" fill={yellow} {...common} />
          <path d="M83 69c23-14 71-14 94 0" fill="none" {...common} />
          <path d="M45 37v20M35 47h20M207 27v20M197 37h20M190 89l12 12M58 89l-12 12" fill="none" {...common} />
        </>
      case 'power':
        return <>
          <rect x="76" y="26" width="108" height="128" rx="18" fill={accent} {...common} />
          <path d="M101 26v-9h58v9M102 48h24" fill="none" {...common} />
          <path d="m139 63-27 42h20l-8 32 29-46h-20z" fill={yellow} {...common} />
          <path d="M184 113c25 0 27 9 27 23s-9 16-25 16h-18" fill="none" {...common} />
        </>
      case 'photo':
        return <>
          <path d="M61 50h105v94H61z" fill={paper} {...common} transform="rotate(-8 113 97)" />
          <path d="M91 30h108v99H91z" fill={paper} {...common} transform="rotate(7 145 80)" />
          <path d="M103 52h84v60h-84z" fill={accent} {...common} />
          <path d="m106 105 24-26 18 18 15-13 21 21" fill={sage} {...common} />
          <circle cx="122" cy="67" r="8" fill={yellow} {...common} />
          <path d="M115 121h60" fill="none" {...common} />
        </>
      case 'bag':
        return <>
          <path d="M77 73c-35-31-47-8-37 18 7 18 21 18 40 4M183 73c35-31 47-8 37 18-7 18-21 18-40 4" fill="none" {...common} strokeWidth="9" />
          <path d="M69 66c19-22 103-22 122 0l-9 71H78z" fill={accent} {...common} />
          <path d="M77 88h106M113 88v30h35V88" fill={paper} {...common} />
          <circle cx="130" cy="104" r="5" fill={yellow} {...common} />
        </>
    }
  })()

  return (
    <svg viewBox="0 0 260 170" role="img" aria-label={`Иллюстрация: ${title}`}>
      <ellipse cx="130" cy="151" rx="91" ry="8" fill={ink} opacity=".08" />
      {drawing}
    </svg>
  )
}
