import { Topic } from './types';

// Coffee Morandi Palette
export const COLORS = {
  cream: '#E8E0D5',
  latte: '#D6C8BD',
  mocha: '#A6988D',
  taupe: '#9C8F85',
  sand: '#F2EBE5',
  espresso: '#5E5046',
  bg: '#FDFBF8',
};

// Generic hints to inspire users
const GENERAL_HINTS = [
  "试着回忆一个具体的场景，那天天气如何？",
  "那一刻你的身体有什么感觉？",
  "如果是你的朋友经历了这件事，你会怎么看？",
  "不要评判自己的想法，仅仅是记录。",
  "如果这件事是一部电影的画面，它是什么色调？"
];

export const getHint = (index: number) => GENERAL_HINTS[index % GENERAL_HINTS.length];

export const TOPICS: Topic[] = [
  {
    id: 't1',
    number: '01',
    titleEn: 'Self & Identity',
    titleCn: '自我与身份',
    color: COLORS.cream,
    questions: [
      { id: 1, text: '如果必须用一个“不断流变的自然现象”来描述你今年的自我，你会选择什么？为什么？', hint: "例如：一阵风、一条正在解冻的河、一座正在风化的山..." },
      { id: 2, text: '哪一个你曾坚定的自我认知在今年失效？它是如何碎开的？' },
      { id: 3, text: '你最不敢直视的那一部分自己，正在向你传递怎样的讯息？' },
      { id: 4, text: '如果真实的你是一束光，今年有哪些角度被遮挡了？' },
      { id: 5, text: '如果你能删除一个“预设的自我设定”，你最想让哪一部分获得自由？' },
    ]
  },
  {
    id: 't2',
    number: '02',
    titleEn: 'Desire & Choice',
    titleCn: '欲望与选择',
    color: COLORS.latte,
    questions: [
      { id: 6, text: '哪个你今年一直想做却没做的行动，其实藏着你最大的恐惧？' },
      { id: 7, text: '如果你必须牺牲一种欲望来让另一种欲望显现，你的交换是什么？' },
      { id: 8, text: '今年最“违背直觉却正确”的选择是什么？' },
      { id: 9, text: '今年你第一次意识到“想要”和“需要”之间的鸿沟在哪里？' },
      { id: 10, text: '哪个你差点跟随的冲动，让你现在想起仍心惊？' },
    ]
  },
  {
    id: 't3',
    number: '03',
    titleEn: 'Time & Memory',
    titleCn: '时间与记忆',
    color: COLORS.mocha,
    questions: [
      { id: 11, text: '如果你能擦掉今年的一段感受，而不是事件，你会抹去什么？' },
      { id: 12, text: '哪一刻你突然意识到自己已经悄悄改变？' },
      { id: 13, text: '哪个最平凡的瞬间，却成为今年你记忆最柔软的地方？' },
      { id: 14, text: '你最害怕时间带走什么？又最希望时间替你带走什么？' },
      { id: 15, text: '如果只能把今年的一帧画面送给未来，你会选择哪里？' },
    ]
  },
  {
    id: 't4',
    number: '04',
    titleEn: 'Connection & Intimacy',
    titleCn: '关系与亲密',
    color: COLORS.taupe,
    questions: [
      { id: 16, text: '在亲密关系中，你最害怕被他人看见的那一面是什么？这种害怕来自哪里？' },
      { id: 17, text: '你在人际关系中最常使用的“自我保护装置”是什么？' },
      { id: 18, text: '哪一次误解反而让你更懂一个人？' },
      { id: 19, text: '有没有一个时刻让你意识到原来你需要的不是“更好的沟通”，而是“被更深地理解”？' },
      { id: 20, text: '当你靠近某段关系时，是什么让你犹豫？当你拉开距离时，又是什么让你心软？这些力量分别来自哪里？' },
    ]
  },
  {
    id: 't5',
    number: '05',
    titleEn: 'Vulnerability & Strength',
    titleCn: '脆弱与力量',
    color: COLORS.sand,
    questions: [
      { id: 21, text: '哪种脆弱被你误会成软弱了很久？' },
      { id: 22, text: '你最骄傲却很少提及的成就是什么？' },
      { id: 23, text: '哪一刻你感到“我被理解了”？' },
      { id: 24, text: '什么时候你意识到勇气不是继续，而是允许自己停下？' },
      { id: 25, text: '哪个隐藏很深却一直指挥你行为的恐惧终于被你看见？' },
    ]
  },
  {
    id: 't6',
    number: '06',
    titleEn: 'Failure & Adjustment',
    titleCn: '失败与修正',
    color: COLORS.cream,
    questions: [
      { id: 26, text: '今年最让你难以承认的错误是什么？' },
      { id: 27, text: '哪个你以为绝不会出错的地方却在今年崩塌？' },
      { id: 28, text: '哪次失败替你关上一扇你其实不该进入的门？' },
      { id: 29, text: '如果那件事可以往回调一个细节，你会修改哪一步？' },
      { id: 30, text: '今年你真正理解的“代价”是什么？' },
    ]
  },
  {
    id: 't7',
    number: '07',
    titleEn: 'Chaos & Discipline',
    titleCn: '混乱与秩序',
    color: COLORS.latte,
    questions: [
      { id: 31, text: '如果允许你的混乱全权接管一天，你会做什么？' },
      { id: 32, text: '哪部分生活最难驯服？它像什么？' },
      { id: 33, text: '你今年建立的最微小却改变性的秩序是什么？' },
      { id: 34, text: '哪个看似理性的选择，其实藏着混乱的核心？' },
      { id: 35, text: '如果今年的人生是一首乐曲，最走调的音在哪里？' },
    ]
  },
  {
    id: 't8',
    number: '08',
    titleEn: 'Creativity & Expression',
    titleCn: '创造与表达',
    color: COLORS.mocha,
    questions: [
      { id: 36, text: '今年你做过最“艺术家式”的行为是什么？' },
      { id: 37, text: '你为表达一个想法，做过哪种反常规的事？' },
      { id: 38, text: '哪种你从未尝试的创作方式最吸引你？' },
      { id: 39, text: '若你的人生是一本书，你希望今年的章节标题是什么？' },
      { id: 40, text: '如果你做过的一件事能拍成电影，它会是艺术片还是商业片？' },
    ]
  },
  {
    id: 't9',
    number: '09',
    titleEn: 'Body & Sensation',
    titleCn: '身体与感知',
    color: COLORS.taupe,
    questions: [
      { id: 41, text: '当你说“我累了”时，你的身体真正想说什么？' },
      { id: 42, text: '哪个身体瞬间让你感到安稳或自由？' },
      { id: 43, text: '哪个瞬间你意识到身体比头脑更诚实？' },
      { id: 44, text: '哪类感官体验让你最觉得“我正在活着”？' },
      { id: 45, text: '你最忽略身体的哪个声音？' },
    ]
  },
  {
    id: 't10',
    number: '10',
    titleEn: 'Values & Beliefs',
    titleCn: '价值与信念',
    color: COLORS.sand,
    questions: [
      { id: 46, text: '今年你坚持的哪一个价值观让你付出代价？' },
      { id: 47, text: '哪堂“成年人的课程”你今年才终于学会？' },
      { id: 48, text: '哪个被你放下的信念又悄悄回来了？' },
      { id: 49, text: '哪些地方你比自己想象中更坚定？' },
      { id: 50, text: '哪些信念你意识到已经缓慢过期？' },
    ]
  },
  {
    id: 't11',
    number: '11',
    titleEn: 'World & Future',
    titleCn: '世界与未来',
    color: COLORS.cream,
    questions: [
      { id: 51, text: '如果今年世界寄你一封信，它的标题是什么？' },
      { id: 52, text: '如果能改动未来的一个微小变量，你会调整哪里？' },
      { id: 53, text: '哪条你今年才明白的世界规律让你释然？' },
      { id: 54, text: '你希望明年世界对你温柔一点的部分是什么？' },
      { id: 55, text: '如果知道今年的你正在影响未来十年，你会改变什么？' },
    ]
  },
  {
    id: 't12',
    number: '12',
    titleEn: 'Meaning & Direction',
    titleCn: '意义与方向',
    color: COLORS.latte,
    questions: [
      { id: 56, text: '哪个瞬间让你突然感觉“这一切现在都有意义了”？' },
      { id: 57, text: '如果让一个问题引导你明年的生活，那会是什么？' },
      { id: 58, text: '哪个意义你今年意识到已经不再重要？' },
      { id: 59, text: '如果你的人生是一项研究，今年的假设被证实了吗？' },
      { id: 60, text: '在今年结束之前，你最想向自己确认的方向是什么？' },
    ]
  },
];