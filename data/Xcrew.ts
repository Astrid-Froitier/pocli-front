const members = [
  {
    id: 1,
    name: 'Gavin',
    username: 'Le mystérieux',
    image: '/Crew/gavtof.jpg',
    // isSelected: false,
  },
  {
    id: 2,
    name: 'Frédéric',
    username: 'Le calme',
    image: '/Crew/Fred.jpg',
    // isSelected: false,
  },
  {
    id: 3,
    name: 'Lucas',
    username: `Le benjamin`,
    image: '/Crew/luka.jpg',
    // isSelected: false,
  },
  {
    id: 4,
    name: 'Astrid',
    username: 'La fille',
    image: '/Crew/Astrid.jpg',
    // isSelected: false,
  },
];

const theCrew = [
  {
    id: 1,
    firstName: 'Sandrine',
    lastName: 'LARMET',
    image: '/associationMembers/Sandrine.jpg',
  },
  {
    id: 2,
    firstName: 'Marie-Françoise',
    lastName: 'PARENTEAU',
    image: '/associationMembers/Marie Françoise.jpg',
  },
  {
    id: 3,
    firstName: 'Amandine',
    lastName: 'SOLER',
    image: '/associationMembers/Amandine.jpg',
    status: 'Secrétaire',
  },
  {
    id: 4,
    firstName: 'Sylvie',
    lastName: 'POMMIER',
    image: '/associationMembers/Sylvie1.jpg',
    status: '',
  },
  {
    id: 5,
    firstName: 'Alexia',
    lastName: 'DHELIN',
  },
  {
    id: 6,
    firstName: 'Michaël',
    lastName: 'HOUSSIER',
    image: '/associationMembers/Mika.JPG',
    status: 'Président',
  },
  {
    id: 7,
    name: 'Éléonore',
    lastName: 'AUDET-LAPOINTE',
    status: 'Trésorière',
  },
];

const partners = [
  {
    id: 1,
    name: 'caf',
    image: '/assets/logo-caf-gironde.png',
    URL: 'https://www.caf.fr/allocataires/caf-de-la-gironde',
  },
  {
    id: 2,
    name: 'MSA',
    image: '/assets/msa.png',
    URL: 'https://gironde.msa.fr/lfp',
  },
  {
    id: 3,
    name: 'Département Gironde',
    image: '/assets/dp_gironde.png',
    URL: 'https://www.gironde.fr/',
  },
  {
    id: 4,
    name: 'Département Nouvelle Aquitaine',
    image: '/assets/dp_Nouvelle_Aquitiaine.png',
    URL: 'https://www.nouvelle-aquitaine.fr/le-territoire/la-plus-grande-region-de-france',
  },
  {
    id: 5,
    name: 'REAAP',
    image: '/assets/logo-reaap-gironde.png',
    URL: '/assets/logo-reaap-gironde.png',
  },
  { id: 6, name: 'La Cali', image: '/assets/la_Cali.png', URL: 'https://www.lacali.fr/' },
  {
    id: 7,
    name: 'Castillon Pujols',
    image: '/assets/Cc-Castillon-Pujols.gif',
    URL: 'https://www.castillonpujols.fr/',
  },
  {
    id: 8,
    name: 'St Quentin de Baron',
    image: '/assets/Mairie de St Quentin de B.png',
    URL: 'https://saint-quentin-de-baron.fr/',
  },
  {
    id: 9,
    name: 'Espiet',
    image: '/assets/Mairie Espiet.png',
    URL: 'http://www.espiet.fr/',
  },
  {
    id: 10,
    name: 'Nerigean',
    image: '/assets/Nérigean.jpg',
    URL: 'https://nerigean.fr/',
  },
  {
    id: 11,
    name: 'Ville de Branne',
    image: '/assets/Branne.png',
    URL: 'https://www.mairie-branne.fr/',
  },
];

export { members, partners, theCrew };
