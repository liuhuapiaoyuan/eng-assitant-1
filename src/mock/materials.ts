
export const materialDirectory = [
  {
    title: '七年级上册',
    isOpen: true,
    units: [
      {
        title: 'Unit 1 Making New Friends',
        isOpen: true,
        topics: [
          {
            title: 'Topic 1 Welcome to China!',
            isOpen: true,
            sections: [
              { title: 'Section A', active: true },
              { title: 'Section B', active: false },
              { title: 'Section C', active: false },
              { title: 'Section D', active: false },
            ]
          },
          {
            title: 'Topic 2 Where are you from?',
            isOpen: false,
            sections: [
              { title: 'Section A', active: false },
              { title: 'Section B', active: false },
              { title: 'Section C', active: false },
              { title: 'Section D', active: false },
            ]
          },
          {
            title: 'Topic 3 How old are you?',
            isOpen: false,
            sections: [
              { title: 'Section A', active: false },
              { title: 'Section B', active: false },
              { title: 'Section C', active: false },
              { title: 'Section D', active: false },
            ]
          }
        ]
      },
      {
        title: 'Unit 2 Looking Different',
        isOpen: false,
        topics: [
          {
            title: 'Topic 1 I have a small nose.',
            isOpen: false,
            sections: [
              { title: 'Section A', active: false },
              { title: 'Section B', active: false }
            ]
          },
          {
            title: 'Topic 2 What does she look like?',
            isOpen: false,
            sections: [
              { title: 'Section A', active: false }
            ]
          }
        ]
      },
      {
        title: 'Unit 3 Getting Together',
        isOpen: false,
        topics: []
      },
      {
        title: 'Unit 4 Amazing Science',
        isOpen: false,
        topics: []
      }
    ]
  },
  {
    title: '七年级下册',
    isOpen: false,
    units: [
      {
        title: 'Unit 5 Our School Life',
        isOpen: false,
        topics: []
      },
      {
        title: 'Unit 6 Our Local Area',
        isOpen: false,
        topics: []
      }
    ]
  },
  {
    title: '八年级上册',
    isOpen: false,
    units: [
      {
        title: 'Unit 1 Playing Sports',
        isOpen: false,
        topics: []
      }
    ]
  }
];

export const materialContent = {
  textResource: [
    {
      speaker: 'Kangkang',
      english: 'Good morning!',
      chinese: '康康：早上好！'
    },
    {
      speaker: 'Michael',
      english: 'Good morning! Are you Kangkang?',
      chinese: '迈克尔：早上好！你是康康吗？'
    },
    {
      speaker: 'Kangkang',
      english: 'Yes, I am.',
      chinese: '康康：是的，我是。'
    },
    {
      speaker: 'Jane',
      english: 'Nice to meet you.',
      chinese: '简：很高兴见到你。'
    },
    {
      speaker: 'Kangkang',
      english: 'Nice to meet you, too.',
      chinese: '康康：见到你我也很高兴。'
    }
  ],
  vocab: [
    { word: 'good', phonetic: '/ɡʊd/', chinese: '好的' },
    { word: 'morning', phonetic: '/ˈmɔːrnɪŋ/', chinese: '早晨；上午' },
    { word: 'I', phonetic: '/aɪ/', chinese: '我' },
    { word: 'am', phonetic: '/æm/', chinese: '是' },
    { word: 'welcome', phonetic: '/ˈwelkəm/', chinese: '欢迎' },
    { word: 'to', phonetic: '/tuː/', chinese: '到；向' },
    { word: 'China', phonetic: '/ˈtʃaɪnə/', chinese: '中国' },
    { word: 'thank', phonetic: '/θæŋk/', chinese: '谢谢' },
    { word: 'you', phonetic: '/juː/', chinese: '你；你们' },
    { word: 'hello', phonetic: '/həˈloʊ/', chinese: '你好' }
  ],
  materials: [
    {
      title: 'Classroom Greeting 图片导入',
      type: 'image'
    },
    {
      title: '英文打招呼儿歌视频',
      type: 'video',
      filename: 'Hello Song.mp4'
    }
  ]
};
