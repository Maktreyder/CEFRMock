import { Question, LanguageOption } from '../types/cefr.ts';

export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;
export const TRUE_FALSE_NOT_GIVEN = ['True', 'False', 'Not Given'] as const;

export const LANGS: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    sub: 'English',
    live: true,
    skills: [
      ['Reading', 'list'],
      ['Listening', 0],
    ],
  },
  {
    code: 'tr',
    name: 'Türkçe',
    sub: 'Turkish',
    live: true,
    skills: [
      ['Okuma', 0],
      ['Dinleme', 0],
    ],
  },
  {
    code: 'ar',
    name: 'العربية',
    sub: 'Arabic',
    live: true,
    skills: [
      ['القراءة · Reading', 0],
      ['الاستماع · Listening', 0],
    ],
  },
  {
    code: 'ru',
    name: 'Русский',
    sub: 'Russian',
    live: false,
    skills: [],
  },
];

/* ==================== PART 1 QUESTION BANKS ==================== */
export interface Part1Item {
  t: string;
  w: string[];
  x: string[];
}

export const M1: Part1Item[] = [
  {
    t: 'My name is Sara and I live in a small town near the sea. Every Saturday morning, I go to the market with my mother. We buy fresh fruit and vegetables at the {0} because they are cheaper than in the shops. After shopping, we usually have a coffee in a cafe near the beach. My mother always orders tea, but I like {1} better. In the afternoon, my brother plays football in the park. I do not like playing {2}, but I enjoy watching it. In the evening, we cook dinner together at home. My father is a very good {3}, so he makes the main dish. On Sunday, I usually wake up late and read a book in bed. My favourite {4} is about a girl who travels around the world. I love Sundays because I feel calm and happy. But on Monday morning I am not {5} at all, because I do not want to go to school.',
    w: ['market', 'coffee', 'football', 'cook', 'book', 'happy|calm'],
    x: [],
  },
  {
    t: 'Last summer, my friends and I decided to go camping in the mountains. We took a tent, warm clothes and a lot of food. On the first evening, we put up the {0} next to a small river. The weather was sunny during the day, but it became very cold at night. Luckily, I had a thick jacket, so I did not feel {1}. On the second day, we walked for six hours to reach a high lake. The water in the {2} was clear and blue, and we took many photos. In the afternoon, Tom started to feel tired and his feet hurt. We sat down and had a rest, because he was too {3} to continue. In the evening, we made a fire and cooked some pasta. Nobody wanted to go to bed early, so we talked around the {4} for hours. On the last morning, it started to rain, so we finished our trip early. We were all wet when we got home, but it was the best {5} of my life.',
    w: ['tent', 'cold', 'lake', 'tired', 'fire', 'trip|morning'],
    x: [],
  },
  {
    t: 'Last month, a new family moved into the flat next to ours. The family has two children, a girl called Lily and a small dog called Max. Every morning, the {0} runs around the garden and barks loudly. At first, I was angry because the noise woke me up at six o clock. My husband says that I should not be so {1}, because the dog is only young. Last Sunday, Lily knocked on our door and gave us a box of chocolates. She said sorry for the noise and asked if we liked {2}. We invited the family for dinner on Friday evening. They arrived at seven o clock and everybody enjoyed the {3}. After the meal, the father told us funny stories about their old city. He said that he misses his friends, but he likes living in a {4} like this. Now we often talk to the neighbours and they help us with shopping. I think it is important to be kind to your {5}, because they can become good friends.',
    w: ['dog', 'angry', 'chocolates', 'dinner|evening|family', 'city', 'neighbours'],
    x: [],
  },
  {
    t: 'Last summer, my family decided to spend our holiday in a small village near the mountains. We rented a small {0} with a large garden, and every morning I {1} up early to go for a walk. The mountain {2} made me feel full of energy. In the afternoons we usually {3} in the river, which was surprisingly {4} even in July. On our last day, the {5} local people invited us to dinner in the village square. I will never forget that evening.',
    w: ['cottage', 'woke', 'air', 'swam', 'cold', 'friendly'],
    x: ['borrow', 'quickly'],
  },
];

/* ==================== PART 2 QUESTION BANKS ==================== */
export interface Part2Item {
  h: string;
  x: string[];
  s: string[];
}

export const M: Part2Item[] = [
  {
    h: 'Evening Classes',
    x: [
      'A class where you shape objects from clay',
      'A short course on the basics of building websites',
      'A weekly group for people who enjoy singing together',
      'Learning to take better pictures while walking outdoors',
      'Simple meal ideas for people who live alone',
      'Gaining confidence when talking in front of others',
      'Informal conversation for those who already know some Spanish',
      'A calm class for people who are not very fit',
    ],
    s: [
      'Every Tuesday evening, a small group meets in a bright studio to shape bowls, cups and plates on a spinning wheel. The teacher walks around the room and gives advice to each person, and at the end of the term everyone takes home what they have made.',
      'Over six weeks, complete beginners learn how websites are built, starting with simple pages and ending with a small project of their own. Everybody needs to bring a portable computer to each lesson, because the college does not have enough for all students.',
      'This friendly group rehearses weekly and appears at town festivals twice a year. Newcomers are welcome even if they cannot read a single note, as long as they are ready to turn up every week and learn the songs together.',
      'Led by a professional, these sessions take participants through streets and parks to teach them how daylight changes the look of a picture. Nothing is ever cancelled because of rain, so students should dress for whatever the sky brings.',
      'Tired of eating the same pasta every night? These sessions offer simple, tasty recipes for one person, and everyone sits down together at the end to enjoy what has been prepared.',
      'Many people feel their hearts race when they have to talk in front of an audience. In this class, members prepare short speeches, deliver them to the group, and listen to frank comments about what worked and what did not.',
      'Held once a week in a relaxed atmosphere, this meeting is for people who have already learned the basics of the language. Nobody explains grammar rules; instead, members simply chat about daily life and try to understand each other.',
      'Slow stretches and calm breathing make up this class, which suits anyone with a sore back or who has not exercised for years. Participants do not need to buy anything, as mats can be lent to them.',
    ],
  },
  {
    h: 'Neighbourhood Notices',
    x: [
      'The library now stays open later in the evenings',
      'Swimming facilities closed while building work is done',
      'A weekly outdoor market with local food and crafts',
      'Changes to a bus service near the hospital',
      'Charges for getting rid of waste at the depot',
      'Volunteers wanted to grow food together',
      'Cheaper tickets at the start of the week',
      'An open meeting about a new path for cyclists',
    ],
    s: [
      'Readers will be pleased to hear that the building will now welcome visitors until nine in the evening from Monday to Friday. Books can also be ordered through the website and picked up from a shelf without queuing at the desk.',
      'Swimmers should make other plans for the next two months, as repair work on the roof means the building cannot be used. Anyone holding a ticket can swim at a sports centre on the other side of the river instead.',
      'Every weekend morning, stalls selling local vegetables and handmade goods fill the square. Since there are only a few spaces to leave a vehicle nearby, organisers suggest that people come on foot or by bicycle.',
      'Travellers heading to the hospital will soon find it easier to get there, because buses will stop right outside its entrance from March. In addition, the first journey of the day will begin a quarter of an hour sooner.',
      'Residents with bulky objects like sofas and wardrobes can leave them at the depot without paying anything. However, people who bring leftovers from building work will be asked to pay a modest charge.',
      'Neighbours are invited to help grow vegetables in a shared plot behind the school, and everything that is harvested is divided between the helpers. You do not need to know anything about plants to take part.',
      'At the start of each week, the cinema screens old favourites at lower ticket prices. Students and retired people pay even less, which makes it a good way to spend a quiet evening.',
      'Next week, the council will hold an open session where local people can share their views on the proposed route for a path for riders on two wheels. Anyone interested is free to come along and speak.',
    ],
  },
  {
    h: 'Student Life',
    x: [
      'Finding a quiet place to revise for exams',
      'Cheap ways to travel between cities',
      'Making friends when you move to a new town',
      'Keeping healthy during a busy week',
      'Learning to manage your money wisely',
      'Getting the most out of a lecture',
      'Preparing for an interview with confidence',
      'Choosing a flat to share with others',
    ],
    s: [
      'The university library fills up quickly during exam season, so many students look elsewhere. Some book small rooms in advance, while others discover that an empty classroom or a corner of a local cafe offers the silence they need to concentrate.',
      'Coaches that leave early in the morning are usually the cheapest option, and buying tickets several weeks ahead can halve the price. Travellers who are flexible about dates often discover bargains that are not advertised on the main websites.',
      'Joining a sports team or a hobby club is one of the quickest ways to meet people with similar interests. Newcomers who say yes to invitations during their first month often find that a circle of friends appears surprisingly fast.',
      'A twenty-minute walk between lessons, a bag of fruit instead of biscuits, and a regular bedtime make a bigger difference than most people expect. Doctors say that small habits are easier to keep than dramatic changes.',
      'Writing down every purchase for a month reveals where money quietly disappears. Many young people are shocked to find how much goes on snacks and subscriptions, and a simple weekly limit can solve the problem.',
      'Students who read the topic beforehand and prepare a question or two tend to remember far more afterwards. Taking short notes in their own words, rather than copying slides, also helps ideas stay in the memory.',
      'Learning about the company in advance, practising answers aloud and arriving ten minutes early all help to calm the nerves. Interviewers report that candidates who ask thoughtful questions leave the strongest impression.',
      'Before signing a contract, visit the property at different times of day and ask current tenants about noise and bills. It is also wise to discuss cleaning habits openly, because small disagreements can grow quickly.',
    ],
  },
];

/* ==================== PART 3 QUESTION BANKS ==================== */
export interface Part3Item {
  x: string[];
  s: [string, number][];
}

export const M3: Part3Item[] = [
  {
    x: [
      'Why cities need more trees',
      'A new way to learn languages',
      'The hidden cost of cheap clothes',
      'Sleeping better in summer',
      'Saving money on food shopping',
      'How robots are changing farms',
      'The return of the paper book',
      'Running a marathon for charity',
    ],
    s: [
      [
        'Parks and tree-lined streets lower summer temperatures, absorb pollution and give residents somewhere to relax. Despite this, many councils continue to remove trees to make space for car parks and new buildings, a decision researchers say will be expensive in the long run.',
        0,
      ],
      [
        'A shirt that costs only a few pounds usually means workers were paid very little and the fabric was of poor quality. Many shoppers wear such items a handful of times and then throw them away, which creates huge amounts of waste.',
        2,
      ],
      [
        'Planning meals for the week, writing a list and avoiding shopping when hungry can reduce a family grocery bill by a fifth. Supermarkets arrange their shelves to encourage extra purchases, so staying focused is essential.',
        4,
      ],
      [
        'Machines equipped with cameras can now identify weeds and remove them without chemicals, while drones check the health of crops from above. Farmers say the technology saves time, although the equipment is still too expensive for small farms.',
        5,
      ],
      [
        'After years of falling sales, bookshops report that customers are returning to printed novels. Many readers say they are tired of screens and enjoy the feel of turning pages, and young people in particular are driving the trend.',
        6,
      ],
      [
        'Instead of memorising long lists of vocabulary, learners now chat with friends abroad through video calls and apps. Teachers note that this approach builds confidence quickly, although progress in grammar is often slower.',
        1,
      ],
    ],
  },
  {
    x: [
      'Working from a beach',
      'A village saved by its school',
      'The science of friendly smiles',
      'Why museums are going digital',
      'Choosing a career after school',
      'Cycling to work in winter',
      'Mountain rescue teams',
      'Old recipes, new restaurants',
    ],
    s: [
      [
        'When the number of children fell, the local school faced closure. Residents responded by offering free housing to young families, and within three years classrooms were full again and the village shop had reopened.',
        1,
      ],
      [
        'Visitors can now explore ancient statues through three-dimensional images on their phones before they even arrive. Curators believe that online collections attract new audiences, but they insist nothing replaces seeing a real object.',
        3,
      ],
      [
        'With the right clothing, lights and tyres, riding a bicycle on icy roads is safer than many people expect. Commuters who cycle in all weather say they arrive more awake and spend less on transport.',
        5,
      ],
      [
        'Volunteers on call day and night climb through storms to reach injured walkers. Their training takes years, and most of the money for equipment comes from donations rather than from the government.',
        6,
      ],
      [
        'Young chefs are searching through family recipe notebooks to find dishes that nearly disappeared. By serving these meals with modern techniques, they have turned small family-run kitchens into places people queue to visit.',
        7,
      ],
      [
        'Many teenagers feel pressure to pick a profession before they have tried anything. Advisers recommend short work placements, talking to people in different jobs and accepting that it is normal to change direction later.',
        4,
      ],
    ],
  },
  {
    x: [
      'The surprising comeback of vinyl records',
      'How libraries are changing to survive',
      'Why bilingual children learn faster',
      'Protecting coastlines from rising seas',
      'The challenge of finding affordable housing',
      'New ways to treat common headaches',
      'Learning to cook from videos online',
      'Training dogs to detect diseases',
    ],
    s: [
      [
        'Sales of vinyl records have risen every year for over a decade, and some record shops now report that they sell more discs than digital downloads. Buyers say they enjoy the larger artwork and the ritual of placing the needle on a record, although the format costs far more.',
        0,
      ],
      [
        'Visitors to many libraries today may find a coffee bar, a games room and equipment for recording music instead of silent rows of shelves. Managers believe that offering new services is the only way to attract younger residents and justify their funding.',
        1,
      ],
      [
        'Research suggests that children who grow up with two languages become skilled at switching attention between tasks. Teachers observe that such pupils often solve puzzles more quickly, although their vocabulary in each language may be smaller at first.',
        2,
      ],
      [
        'In many large cities, wages have not kept pace with rent, forcing young workers to share flats well into their thirties. Politicians promise to build more homes, but critics argue that most new buildings are aimed at wealthy buyers.',
        4,
      ],
      [
        'Millions of people now learn to cook by watching short films on their phones rather than reading recipes. Viewers say that seeing each step makes difficult techniques seem easier, while professional chefs worry that important details are often missed.',
        6,
      ],
      [
        'Specially trained dogs can identify certain illnesses by smell with remarkable accuracy, sometimes before a patient has any symptoms. Scientists are now testing whether the animals can assist doctors in busy hospitals and airports.',
        7,
      ],
    ],
  },
];

/* ==================== PART 4 QUESTION BANKS ==================== */
export interface Part4Question {
  [0]: string; // question text
  [1]: string[] | readonly string[]; // options
  [2]: number; // correct index
  [3]?: number; // flag for TF/NG format
}

export interface Part4Item {
  h: string;
  p: string[];
  q: Part4Question[];
}

export const M4: Part4Item[] = [
  {
    h: 'The Return of the Night Train',
    p: [
      'For almost two decades, night trains across Europe were considered a relic of the past. Budget airlines offered flights for the price of a meal, and many railway companies, struggling to make a profit, quietly cancelled their sleeper services. By 2016, routes that had once linked dozens of capitals were reduced to a handful of lines, and many assumed that the era of falling asleep in one country and waking up in another was over.',
      'Yet the past few years have brought a surprising change. Growing concern about the climate impact of flying has persuaded a number of travellers, especially younger ones, to look for alternatives. A journey by rail produces a fraction of the carbon emissions of the equivalent flight, and passengers also avoid the time and trouble of travelling to distant airports. Several governments have responded by offering financial support to operators who agree to reopen overnight routes.',
      'Running a sleeper service is far from simple, however. The carriages are expensive to build, and few manufacturers still produce them, which means that companies often rely on refurbishing old vehicles. Tracks must also be shared with freight and daytime services, so overnight trains are frequently delayed. One operator admitted that nearly a third of its journeys last year arrived more than an hour late, a figure that discourages passengers who need to be at work the following morning.',
      'Despite these difficulties, supporters remain optimistic. They point out that tickets for the new routes often sell out weeks in advance and that people who try the experience tend to repeat it. Industry analysts, however, warn that the revival will depend on cooperation between countries. Unless timetables and ticketing systems are coordinated, they argue, the network will remain a collection of isolated lines rather than a genuine alternative to the aeroplane.',
    ],
    q: [
      [
        'What does the first paragraph say about night trains?',
        [
          'They were more popular than flights',
          'Many companies stopped running them because of money problems',
          'They were replaced by faster daytime services',
          'They were used only by tourists',
        ],
        1,
      ],
      [
        'By 2016, the number of overnight routes had...',
        ['fallen to only a few', 'risen slightly', 'stayed the same', 'doubled in cost'],
        0,
      ],
      [
        'Why have some travellers recently turned to trains?',
        [
          'Tickets are cheaper than flights',
          'They are worried about the effect of flying on the climate',
          'Many airports have closed',
          'Trains are faster than planes',
        ],
        1,
      ],
      [
        'Which advantage of rail travel besides lower emissions is mentioned?',
        [
          'Passengers avoid journeys to distant airports',
          'Meals are included in the ticket',
          'Trains run more often',
          'Seats are more comfortable',
        ],
        0,
      ],
      [
        'Some railway companies cancelled their sleeper trains because they were not making enough money.',
        TRUE_FALSE_NOT_GIVEN,
        0,
        1,
      ],
      [
        'Every European government has refused to help operators who want to reopen night routes.',
        TRUE_FALSE_NOT_GIVEN,
        1,
        1,
      ],
      [
        'Night trains are usually more expensive than flights on the same route.',
        TRUE_FALSE_NOT_GIVEN,
        2,
        1,
      ],
      [
        'About a third of the journeys run by one operator last year arrived more than an hour late.',
        TRUE_FALSE_NOT_GIVEN,
        0,
        1,
      ],
      [
        'Industry analysts believe the revival will succeed without international cooperation.',
        TRUE_FALSE_NOT_GIVEN,
        1,
        1,
      ],
    ],
  },
  {
    h: 'Why Small Shops Survive',
    p: [
      'Predictions that online shopping would destroy small independent shops have proved only partly true. While many high street chains have closed branches, a surprising number of specialist businesses, from bookshops to bicycle repairers, continue to attract loyal customers. Economists who once forecast their disappearance now admit that they underestimated the value people place on personal service.',
      'One reason for this resilience is knowledge. A shopkeeper who has spent years selling coffee equipment can explain the differences between machines in a way no website can, and customers are often willing to pay slightly more for such advice. Many owners also organise events, such as tastings and workshops, that turn their premises into meeting places rather than simple points of sale.',
      'Lower costs have helped too. Software that was once available only to large companies now allows tiny businesses to manage stock, send newsletters and accept payments from a single phone. Several owners interviewed for a recent report said that these tools had saved them hours of paperwork each week, giving them more time to talk with customers.',
      'Nevertheless, the picture is not entirely positive. Rents in popular districts continue to rise, and landlords often prefer to lease to international brands that can pay more. A survey found that one in five independent shops closed within three years, usually because the owners could not afford to renew their contracts. Campaigners therefore call for limits on rent increases, arguing that a street full of identical stores benefits nobody.',
    ],
    q: [
      [
        'What is the main point of the first paragraph?',
        [
          'Online shopping has affected small shops less than expected',
          'All high street chains have survived',
          'Specialist shops are closing faster than chains',
          'Economists predicted the changes correctly',
        ],
        0,
      ],
      [
        'What did economists underestimate?',
        [
          'The speed of online shopping',
          'How much customers value personal service',
          'The cost of renting shops',
          'The number of new businesses',
        ],
        1,
      ],
      [
        'Why are some customers ready to pay more?',
        [
          'They receive helpful advice from the seller',
          'The goods are more fashionable',
          'Online delivery is unreliable',
          'Shops give free gifts',
        ],
        0,
      ],
      [
        'Why do owners organise events?',
        [
          'To reduce prices',
          'To make their shops places where people meet',
          'To train new staff',
          'To advertise online',
        ],
        1,
      ],
      [
        'Some specialist businesses, such as bookshops, still have loyal customers.',
        TRUE_FALSE_NOT_GIVEN,
        0,
        1,
      ],
      [
        'Most independent shop owners work more than sixty hours a week.',
        TRUE_FALSE_NOT_GIVEN,
        2,
        1,
      ],
      [
        'Business software has always been available to tiny companies.',
        TRUE_FALSE_NOT_GIVEN,
        1,
        1,
      ],
      [
        'Rents in popular districts are going up.',
        TRUE_FALSE_NOT_GIVEN,
        0,
        1,
      ],
      [
        'The survey found that most independent shops closed within three years.',
        TRUE_FALSE_NOT_GIVEN,
        1,
        1,
      ],
    ],
  },
  {
    h: 'Cities Without Cars',
    p: [
      'In recent years, a growing number of European cities have started to limit the use of private cars in their centres. Supporters claim that fewer vehicles mean cleaner air, quieter streets and safer spaces for children. Opponents, particularly shop owners, initially feared that customers who could no longer park outside would simply go elsewhere.',
      'Evidence from several cities, however, has been reassuring. After one central street was closed to traffic, a study found that the number of pedestrians rose by a third, and most shops reported steady or increasing sales. Researchers explain that people who walk past a shop window are far more likely to enter than those who drive past at speed.',
      'Not everyone has benefited equally. Residents with limited mobility, as well as tradespeople who must carry heavy equipment, say that the new rules have made their daily lives harder. Some councils have responded by granting special permits, but critics argue that these exceptions are difficult to manage and sometimes abused.',
      'Meanwhile, cities that have introduced such schemes are investing heavily in public transport and cycle lanes, since restrictions without alternatives rarely succeed. Planners stress that the aim is not to punish drivers but to give residents a genuine choice about how they move around.',
    ],
    q: [
      [
        'What worried shop owners at first?',
        [
          'Customers might shop somewhere else',
          'Rents would rise',
          'Deliveries would stop',
          'Streets would become dangerous',
        ],
        0,
      ],
      [
        'What did the study of the closed street reveal?',
        [
          'Shops lost most of their customers',
          'Far fewer people visited the area',
          'More people walked there and shops mostly did not suffer',
          'Traffic moved to nearby streets',
        ],
        2,
      ],
      [
        'Why are walkers more likely to enter shops, according to researchers?',
        [
          'They have more free time',
          'They notice the windows as they pass slowly',
          'Prices are lower for pedestrians',
          'Parking is no longer needed',
        ],
        1,
      ],
      [
        'What do planners emphasise about the restrictions?',
        [
          'They are meant to punish drivers',
          'They should come with alternatives to cars',
          'They have already succeeded everywhere',
          'They are intended to increase shop sales',
        ],
        1,
      ],
      [
        'Some European cities have restricted private cars in their centres.',
        TRUE_FALSE_NOT_GIVEN,
        0,
        1,
      ],
      [
        'The number of walkers on the closed street fell.',
        TRUE_FALSE_NOT_GIVEN,
        1,
        1,
      ],
      [
        'Tradespeople have been given free vans by the councils.',
        TRUE_FALSE_NOT_GIVEN,
        2,
        1,
      ],
      [
        'Special permits have caused no problems at all.',
        TRUE_FALSE_NOT_GIVEN,
        1,
        1,
      ],
      [
        'Improved public transport is part of these schemes.',
        TRUE_FALSE_NOT_GIVEN,
        0,
        1,
      ],
    ],
  },
];

/* ==================== PART 5 QUESTION BANKS ==================== */
export interface Part5Item {
  h: string;
  p: string[];
  g: string; // text with {0}, {1}, {2}, {3}
  ga: string[]; // correct 4 words
  q: [string, string[], number][]; // 2 questions
}

export const M5s: Part5Item[] = [
  {
    h: 'The Price of Constant Connection',
    p: [
      'Few inventions have reshaped daily life as swiftly as the smartphone. Within barely a decade, a device once regarded as a luxury has become a ubiquitous companion, consulted dozens of times a day for everything from directions to dinner recipes. Its convenience is undeniable, yet a growing body of research suggests that this constant availability carries a subtle but significant cost.',
      'The central difficulty lies in the way our attention works. Psychologists have shown that even a brief interruption, such as a notification that is ignored, can erode concentration for several minutes afterwards. Because many applications are deliberately designed to be compelling, users frequently find themselves drawn back to their screens long before the original task is complete. The result is a pattern of fragmented effort in which people feel busy all day but accomplish surprisingly little of lasting value.',
      'Defenders of the technology argue that such concerns are exaggerated. Previous generations, they point out, expressed similar anxiety about television and even the printed novel, and society adapted without lasting harm. Critics counter that the comparison is flawed, since earlier media did not follow people into bedrooms, classrooms and meetings, nor did they monitor behaviour in order to tailor the next distraction. The scale of the intrusion, they maintain, is unprecedented.',
      'Whatever the truth, a number of schools and employers have begun to experiment with modest restrictions, such as phone-free lunch breaks or designated hours without email. Early results are encouraging but inconclusive. What seems clear is that individuals who deliberately set boundaries report greater satisfaction, which suggests that the challenge lies less in the devices themselves than in our willingness to manage them.',
    ],
    g: 'The smartphone has become a {0} presence in modern life, yet researchers warn that constant use may {1} our ability to concentrate, especially as many applications are designed to be {2}. Defenders of the technology claim that such fears are {3}, since earlier media provoked similar worries. However, critics say the present intrusion is unprecedented, and early experiments with restrictions suggest that managing devices matters more than avoiding them.',
    ga: ['ubiquitous', 'erode', 'compelling', 'exaggerated'],
    q: [
      [
        'How does the writer present the comparison with earlier media such as television?',
        [
          'As proof that worries about smartphones are groundless',
          'As an argument that opponents find unconvincing',
          'As evidence that television was entirely harmless',
          'As a view the writer firmly rejects',
        ],
        1,
      ],
      [
        'What can be inferred about the writer from the final paragraph?',
        [
          'The writer is certain that restrictions will solve the problem',
          'The writer is cautiously hopeful that personal boundaries can help',
          'The writer blames technology companies for the situation',
          'The writer believes phones should be abandoned altogether',
        ],
        1,
      ],
    ],
  },
  {
    h: 'The Hidden Life of Sleep',
    p: [
      'For centuries, sleep was dismissed as a passive state, a regrettable pause in an otherwise productive life. Modern neuroscience has overturned this view. During the night, the brain remains remarkably active, consolidating memories, clearing harmful waste and regulating emotions in ways that no amount of caffeine can replicate.',
      'The consequences of neglecting sleep are therefore far-reaching. Studies of shift workers reveal a heightened risk of heart disease, while even a single sleepless night can impair judgement to a degree comparable with alcohol. Despite this, many societies still treat tiredness as a badge of honour, equating long hours with commitment.',
      'Sceptics point out that individual needs vary considerably, and that some people function perfectly well on six hours. Researchers acknowledge this variation, yet insist that such individuals are exceptionally rare. Most people who believe they have adapted to little sleep, they warn, have merely grown accustomed to feeling below their best.',
      'Encouragingly, a few employers are beginning to take the evidence seriously, offering later start times and quiet rooms for short naps. Whether such measures will become widespread remains uncertain, since they challenge deeply rooted assumptions about what a diligent employee looks like.',
    ],
    g: 'Scientists now know that the sleeping brain is busy {0} memories and regulating emotions. Even a single sleepless night can {1} judgement, yet many societies link long working hours with {2}. Researchers admit that needs vary, but claim that people who thrive on little sleep are {3} rare. A few employers are now responding with later start times and quiet rooms for naps.',
    ga: ['consolidating', 'impair', 'commitment', 'exceptionally'],
    q: [
      [
        'How does the writer treat the claim that some people need little sleep?',
        [
          'As completely false',
          'As accurate only for a very small minority',
          'As proven by recent studies',
          'As the main cause of tiredness',
        ],
        1,
      ],
      [
        'What does the writer imply about employers who offer later start times?',
        [
          'They are likely to be copied soon by most companies',
          'They challenge a widespread idea about hard workers',
          'They have proved that sleep improves sales',
          'They are harming productivity',
        ],
        1,
      ],
    ],
  },
  {
    h: 'Rethinking Wilderness',
    p: [
      'The word wilderness conjures images of untouched landscapes, yet ecologists increasingly argue that such places barely exist. Even remote forests have been shaped by centuries of hunting, burning and farming by indigenous communities. Recognising this history, they say, is not merely an academic exercise but a prerequisite for sensible conservation.',
      'The traditional approach to protection, which involved removing people and fencing off land, has produced mixed results. In several African reserves, local residents who were evicted from their ancestral territory later became hostile to conservation, and poaching rose as resentment grew. Such outcomes illustrate how policies that ignore human communities can be counterproductive.',
      'A newer philosophy seeks to involve residents as partners. In parts of Latin America, communities are paid to monitor forests, and deforestation rates there have fallen markedly. Sceptics doubt that such schemes can be sustained without continual funding, noting that payments may dwindle when donors lose interest.',
      'The debate is unlikely to be settled soon, not least because it touches on questions of justice as well as ecology. What seems indisputable is that lasting success depends on earning the trust of those who live closest to the land, whose knowledge has often been undervalued.',
    ],
    g: 'Ecologists argue that truly untouched wilderness is rare, so understanding human history is a {0} for sensible conservation. Removing local people has often proved {1}, since evicted residents turned against the protection of the land. Paying communities to guard forests has reduced deforestation, but doubters fear that payments may {2} if donors lose interest. Even so, it is {3} that lasting success needs the trust of local people.',
    ga: ['prerequisite', 'counterproductive', 'dwindle', 'indisputable'],
    q: [
      [
        'What point is illustrated by the example of the African reserves?',
        [
          'Poaching is impossible to prevent',
          'Ignoring local communities can damage conservation',
          'Reserves should be larger',
          'Evictions are legally required',
        ],
        1,
      ],
      [
        'What is the attitude of the writer to the newer approach?',
        [
          'Enthusiastic and uncritical',
          'Interested but aware of doubts about its long-term funding',
          'Dismissive of its results',
          'Convinced it will replace all others',
        ],
        1,
      ],
    ],
  },
];

/* ==================== B1 & B2 BACKWARDS-COMPATIBLE QUESTION SETS ==================== */
export const B1_PASSAGE = {
  title: 'The Night Market',
  paragraphs: [
    "Every Friday evening, when the offices close and the streets fill with people, the old car park behind the station turns into a night market. By six o'clock, more than eighty stalls have opened, and the smell of grilled corn and fresh bread drifts across the whole neighbourhood.",
    'The market began five years ago with just six sellers. A local teacher, Marta Silva, wanted to give young cooks a place to try out their recipes without paying high rent for a restaurant. "Many of them had great ideas but no money," she explains. The city council agreed to lend the car park, but only on condition that the sellers cleaned the area every night.',
    "Today, the market is popular with tourists as well as residents. Prices are low, and most dishes cost less than five euros. However, some neighbours complain about the noise and the crowds. Because of this, the council has decided that the market must close at eleven o'clock instead of midnight, starting next month.",
  ],
};

export const B1Q: Question[] = [
  {
    t: 'What is the main purpose of the text?',
    o: [
      'To advertise a new restaurant',
      'To describe a market and how it developed',
      'To explain how to open a stall',
      'To criticise the city council',
    ],
    a: 1,
  },
  {
    t: 'Why did Marta Silva start the market?',
    o: [
      'She wanted to attract tourists',
      'She needed money for her school',
      'Young cooks could not afford a restaurant',
      'The council asked her to',
    ],
    a: 2,
  },
  {
    t: 'The market began with more than twenty sellers.',
    o: [...TRUE_FALSE_NOT_GIVEN],
    a: 1,
  },
  {
    t: 'The sellers must clean the car park every night.',
    o: [...TRUE_FALSE_NOT_GIVEN],
    a: 0,
  },
  {
    t: 'Most visitors to the market arrive by train.',
    o: [...TRUE_FALSE_NOT_GIVEN],
    a: 2,
  },
  {
    t: 'What will change next month?',
    o: [
      'Prices will go up',
      'The market will move',
      'The market will close earlier',
      'Fewer stalls will open',
    ],
    a: 2,
  },
];

export const B2 = [
  {
    h: 'Remote Work Revisited',
    p: "A decade ago, working from home was a perk offered by a handful of progressive companies. Today, millions of employees split their week between the office and their living rooms. Supporters argue that the arrangement saves commuting time and lets people concentrate without interruptions. Critics, however, point out that younger staff members miss out on informal learning, since advice is often passed on over a coffee rather than in a scheduled meeting. A recent survey of 2,000 managers found that productivity had risen slightly, yet nearly half admitted that team spirit had suffered. Several firms are now experimenting with fixed 'anchor days' when everyone must be present.",
    q: [
      [
        'What do critics say about working from home?',
        [
          'It costs companies more money',
          'Junior employees lose chances to learn informally',
          'Managers cannot check what staff are doing',
          'Meetings become too frequent',
        ],
        1,
      ],
      [
        'What did the survey of managers show?',
        [
          'Productivity fell sharply',
          'Productivity rose a little, but team spirit worsened',
          'Half of the managers wanted to work full time in the office',
          'Most firms had stopped remote work',
        ],
        1,
      ],
      ['Working from home was common in most companies ten years ago.', TRUE_FALSE_NOT_GIVEN, 1, 1],
      ['Some companies require everyone to be in the office on set days.', TRUE_FALSE_NOT_GIVEN, 0, 1],
      ['Employees at companies with anchor days say they are happier.', TRUE_FALSE_NOT_GIVEN, 2, 1],
    ],
  },
  {
    h: 'Bees on the Roof',
    p: 'Beekeeping is no longer confined to the countryside. In recent years, hives have appeared on the roofs of hotels, offices and even a famous opera house. Surprisingly, urban bees often produce more honey than their rural cousins, partly because cities offer a wider variety of flowers in parks and gardens, and partly because they are exposed to fewer pesticides. Nevertheless, experts warn that the trend can backfire. When too many hives are crowded into one area, wild pollinators such as bumblebees must compete for the same limited food, and some species have declined as a result. Ecologists therefore recommend planting more flowers before adding any new hives.',
    q: [
      [
        'Why do city bees often make more honey?',
        [
          'Cities are warmer than the countryside',
          'There are more flower types and fewer pesticides',
          'City beekeepers are better trained',
          'Hives in cities are larger',
        ],
        1,
      ],
      [
        "What is the experts' main concern?",
        [
          'Honey from cities is unsafe',
          'Bees may fly into buildings',
          'Too many hives can harm wild pollinators',
          'Roof hives are expensive to maintain',
        ],
        2,
      ],
      ['Hives have been placed on top of an opera house.', TRUE_FALSE_NOT_GIVEN, 0, 1],
      ['Bumblebees produce more honey than honeybees.', TRUE_FALSE_NOT_GIVEN, 2, 1],
      [
        "In the passage, the word 'backfire' is closest in meaning to:",
        [
          'produce the opposite of the intended effect',
          'become more popular',
          'cost more than expected',
          'spread to other cities',
        ],
        0,
      ],
    ],
  },
  {
    h: 'Teenagers and Sleep',
    p: 'Biologists have long known that teenagers body clocks shift later during puberty, making it natural for them to fall asleep around midnight and wake up late. Yet most secondary schools still begin lessons before eight o clock. A study of schools that delayed their start time by an hour found that attendance improved and students reported feeling less tired. Test results, however, showed only modest gains, and some parents complained that later finishing times interfered with sports and part-time jobs. Researchers conclude that later starts are beneficial but should be accompanied by changes to after-school schedules.',
    q: [
      [
        'Why do teenagers tend to go to bed late?',
        [
          'They have too much homework',
          'Their body clocks change during puberty',
          'They use screens more than adults',
          'Their schools finish late',
        ],
        1,
      ],
      ['Attendance got better in schools that started later.', TRUE_FALSE_NOT_GIVEN, 0, 1],
      ['Exam results improved dramatically.', TRUE_FALSE_NOT_GIVEN, 1, 1],
      [
        'What problem did some parents mention?',
        [
          'Children arrived at school too tired',
          'Lessons became shorter',
          'Later finishes disrupted sports and jobs',
          'Transport was more expensive',
        ],
        2,
      ],
      ['The study included schools from several countries.', TRUE_FALSE_NOT_GIVEN, 2, 1],
    ],
  },
];

/* ==================== HELPER RANDOMIZATION FUNCTIONS ==================== */
export function pickIndex<T>(arr: T[], key: string): number {
  const all = arr.map((_, k) => k);
  let st: Record<string, number[]> = {};
  try {
    st = JSON.parse(localStorage.getItem('cefr_seen') || '{}');
  } catch {
    st = {};
  }
  let seen = (st[key] || []).filter((k) => k < arr.length);
  const last = seen.length ? seen[seen.length - 1] : -1;
  let av = all.filter((k) => !seen.includes(k));
  if (!av.length) {
    seen = [];
    av = all.filter((k) => k !== last);
  }
  if (!av.length) av = all;

  const k = av[Math.floor(Math.random() * av.length)];
  seen.push(k);
  st[key] = seen;
  try {
    localStorage.setItem('cefr_seen', JSON.stringify(st));
  } catch {
    // ignore
  }
  return k;
}

export function shuffleArray<T>(a: T[]): T[] {
  const arr = a.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
  return arr;
}

/* ==================== GENERATE FULL TEST VARIANT ==================== */
export interface GeneratedTest {
  questions: Question[];
  meta: Record<string, any>;
  part1Text: string;
  part1Words: string[];
  part2Headings: string[];
  part2Texts: { text: string; originalIndex: number; targetQuestionIdx: number }[];
  part3Headings: string[];
  part3Texts: { text: string; originalIndex: number; targetQuestionIdx: number }[];
  part4Title: string;
  part4Paragraphs: string[];
  part4Questions: {
    questionText: string;
    options: string[];
    correctIndex: number;
    targetQuestionIdx: number;
    isTfNg?: boolean;
  }[];
  part5Title: string;
  part5Paragraphs: string[];
  part5SummaryText: string;
  part5SummaryWords: string[];
  part5McQuestions: {
    questionText: string;
    options: string[];
    correctIndex: number;
    targetQuestionIdx: number;
  }[];
}

export function generateTest(): GeneratedTest {
  const L = [...LETTERS];

  // Pick Part 1
  const g1 = pickIndex(M1, 'p1');
  const part1Item = M1[g1];
  const GW = part1Item.w;

  // Pick Part 2
  const p2Idx = pickIndex(M, 'p2');
  const P = M[p2Idx];
  const p2Mapped = P.s.map((t, k) => ({ t, o: L, a: k, m: 1 as const }));
  const p2Shuffled = shuffleArray(p2Mapped);

  // Pick Part 3
  const p3Idx = pickIndex(M3, 'p3');
  const T = M3[p3Idx];
  const p3Mapped = T.s.map((e) => ({ t: e[0], o: L, a: e[1], m: 1 as const }));
  const p3Shuffled = shuffleArray(p3Mapped);

  // Pick Part 4
  const p4Idx = pickIndex(M4, 'p4');
  const U = M4[p4Idx];
  const p4Questions = U.q.map((e) => {
    if (e[3]) {
      return { t: e[0], o: [...e[1]], a: e[2], mc: 1 as const, isTfNg: true };
    }
    const originalOptions = e[1];
    const indices = shuffleArray(originalOptions.map((_, k) => k));
    const shuffledOptions = indices.map((k) => originalOptions[k]);
    const newCorrectIdx = indices.indexOf(e[2]);
    return {
      t: e[0],
      o: shuffledOptions,
      a: newCorrectIdx,
      mc: 1 as const,
      isTfNg: false,
    };
  });

  // Pick Part 5
  const p5Idx = pickIndex(M5s, 'p5');
  const W = M5s[p5Idx];
  const p5GapQuestions: Question[] = W.ga.map((w, i) => ({
    t: 'S' + (i + 30),
    o: new Proxy({}, { get: (_, p) => String(p) }) as any,
    a: w,
    gap: 1,
  }));

  const p5McQuestions = W.q.map((e) => {
    const originalOptions = e[1];
    const indices = shuffleArray(originalOptions.map((_, k) => k));
    const shuffledOptions = indices.map((k) => originalOptions[k]);
    const newCorrectIdx = indices.indexOf(e[2]);
    return {
      t: e[0],
      o: shuffledOptions,
      a: newCorrectIdx,
      mc: 1 as const,
    };
  });

  // Assemble full question list
  const p1Questions: Question[] = GW.map((w, k) => ({
    t: 'Part 1, gap ' + (k + 1),
    o: new Proxy({}, { get: (_, p) => String(p) }) as any,
    a: w.split('|')[0],
    alt: w.split('|').slice(1),
    gap: 1,
  }));

  const allQuestions: Question[] = [
    ...p1Questions,
    ...p2Shuffled,
    ...p3Shuffled,
    ...p4Questions,
    ...p5GapQuestions,
    ...p5McQuestions,
  ];

  // Index offsets
  const n = GW.length; // 6
  const p2Len = p2Shuffled.length; // 8
  const p3Len = p3Shuffled.length; // 6
  const p4Len = p4Questions.length; // 9
  const p5Len = p5GapQuestions.length + p5McQuestions.length; // 6

  const meta = { p1: g1, p2: p2Idx, p3: p3Idx, p4: p4Idx, p5: p5Idx };

  return {
    questions: allQuestions,
    meta,
    part1Text: part1Item.t,
    part1Words: GW,
    part2Headings: P.x,
    part2Texts: p2Shuffled.map((item, idx) => ({
      text: item.t,
      originalIndex: item.a,
      targetQuestionIdx: n + idx,
    })),
    part3Headings: T.x,
    part3Texts: p3Shuffled.map((item, idx) => ({
      text: item.t,
      originalIndex: item.a,
      targetQuestionIdx: n + p2Len + idx,
    })),
    part4Title: U.h,
    part4Paragraphs: U.p,
    part4Questions: p4Questions.map((q, idx) => ({
      questionText: q.t,
      options: q.o as string[],
      correctIndex: q.a,
      targetQuestionIdx: n + p2Len + p3Len + idx,
      isTfNg: q.isTfNg,
    })),
    part5Title: W.h,
    part5Paragraphs: W.p,
    part5SummaryText: W.g,
    part5SummaryWords: W.ga,
    part5McQuestions: p5McQuestions.map((q, idx) => ({
      questionText: q.t,
      options: q.o as string[],
      correctIndex: q.a,
      targetQuestionIdx: n + p2Len + p3Len + p4Len + W.ga.length + idx,
    })),
  };
}
