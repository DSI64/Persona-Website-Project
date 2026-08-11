export const socialLinksDB = [
  // ==========================================
  // PERSONA 3 / RELOAD (MALE ROUTE)
  // ==========================================
  {
    id: "p3-kenji",
    name: "Kenji Tomochika",
    game: "P3",
    arcana: "Magician",
    title: "Classmate",
    image: "Kenji",
    bio: "A fellow student in Class 2-F who considers himself a romantic, specifically pursuing older women.",
    availability: "Tue, Thu, Fri (Classroom 2-F)",
    requirements: "Automatic on 4/22",
    ranks: [
      { rank: 1, interactions: [{ prompt: "Talk to Kenji after class", options: [{ text: "Automatic unlock.", points: 0, withMatching: 0 }] }] },
      { rank: 2, interactions: [
        { prompt: "Can you, like just waltz on into Takeba-san's room and stuff?", options: [{ text: "No way.", points: 2, withMatching: 3 }, { text: "I don't know.", points: 0, withMatching: 0 }] },
        { prompt: "I'm more into older women. How 'bout you?", options: [{ text: "I like them all!", points: 2, withMatching: 3 }, { text: "Older women are better.", points: 1, withMatching: 2 }] }
      ] },
      { rank: 3, interactions: [
        { prompt: "Maaan... I'm so sick of this, dude.", options: [{ text: "What, of life?", points: 2, withMatching: 3 }, { text: "Sick of what?", points: 0, withMatching: 0 }] },
        { prompt: "Okay, that settles it, <protagonist>. I'm gonna get myself a girlfriend! Right now!", options: [{ text: "Good luck!", points: 1, withMatching: 2 }, { text: "Go for it.", points: 1, withMatching: 2 }] }
      ] },
      { rank: 4, interactions: [{ prompt: "I'm planning to ask Ms. Kanou out!", options: [{ text: "Good luck!", points: 2, withMatching: 3 }, { text: "Are you sure?", points: 0, withMatching: 0 }] }] },
      { rank: 5, interactions: [{ prompt: "I'm planning our future together.", options: [{ text: "Are you serious?", points: 2, withMatching: 3 }, { text: "That's great.", points: 0, withMatching: 0 }] }] },
      { rank: 6, interactions: [{ prompt: "I bought a ring!", options: [{ text: "That's a bit too much.", points: 2, withMatching: 3 }, { text: "Congratulations!", points: 0, withMatching: 0 }] }] },
      { rank: 7, interactions: [{ prompt: "I think she's moving away...", options: [{ text: "Let's go talk to her.", points: 2, withMatching: 3 }, { text: "What will you do?", points: 0, withMatching: 0 }] }] },
      { rank: 8, interactions: [{ prompt: "She's getting married to someone else...", options: [{ text: "Look for another one.", points: 2, withMatching: 3 }, { text: "Are you okay?", points: 1, withMatching: 2 }] }] },
      { rank: 9, interactions: [{ prompt: "I'm never gonna give up on love!", options: [{ text: "That's the spirit!", points: 2, withMatching: 3 }, { text: "Good for you.", points: 0, withMatching: 0 }] }] },
      { rank: 10, interactions: [{ prompt: "Thanks for sticking by me, man.", options: [{ text: "Max Rank Achieved.", points: 0, withMatching: 0 }] }] }
    ]
  },
  {
    id: "p3-yukari",
    name: "Yukari Takeba",
    game: "P3",
    arcana: "Lovers",
    title: "Fellow S.E.E.S. Member",
    image: "Yukari",
    bio: "A popular girl at Gekkoukan High School and a member of S.E.E.S. who hides a complicated family past.",
    availability: "Mon, Wed, Thu, Sat (Classroom 2-F)",
    requirements: "Charm Level 6 (Charismatic) starting 7/24",
    ranks: [
      { rank: 1, interactions: [{ prompt: "Talk to Yukari in the classroom.", options: [{ text: "Automatic unlock.", points: 0, withMatching: 0 }] }] },
      { rank: 2, interactions: [{ prompt: "Pink is my favorite color... and gerberas are my favorite flower.", options: [{ text: "Pink's cute.", points: 2, withMatching: 3 }, { text: "I like gerberas.", points: 1, withMatching: 2 }] }] },
      { rank: 3, interactions: [{ prompt: "Are you listening to me!?", options: [{ text: "Of course.", points: 2, withMatching: 3 }, { text: "Sorry, I zoned out.", points: 0, withMatching: 0 }] }] },
      { rank: 4, interactions: [{ prompt: "I feel like I'm finally moving forward.", options: [{ text: "I'm glad.", points: 2, withMatching: 3 }, { text: "Are you sure?", points: 0, withMatching: 0 }] }] },
      { rank: 5, interactions: [{ prompt: "I want to try cooking again.", options: [{ text: "I'll help you out.", points: 2, withMatching: 3 }, { text: "Good luck with that.", points: 0, withMatching: 0 }] }] },
      { rank: 6, interactions: [{ prompt: "Thanks for always being there.", options: [{ text: "Anytime.", points: 2, withMatching: 3 }, { text: "It's nothing.", points: 0, withMatching: 0 }] }] },
      { rank: 7, interactions: [{ prompt: "Do you mind if we go somewhere quiet?", options: [{ text: "Sounds good.", points: 2, withMatching: 3 }, { text: "Why quiet?", points: 0, withMatching: 0 }] }] },
      { rank: 8, interactions: [{ prompt: "I'm sorry for dragging you around.", options: [{ text: "I don't mind.", points: 2, withMatching: 3 }, { text: "It's fine.", points: 1, withMatching: 2 }] }] },
      { rank: 9, isRomance: true, interactions: [{ prompt: "Yukari looks at you expectedly.", options: [{ text: "I love you. [Romance]", points: 2, withMatching: 3 }, { text: "You're a dear friend. [Platonic]", points: 0, withMatching: 0 }] }] },
      { rank: 10, interactions: [{ prompt: "Max Rank Achieved.", options: [{ text: "Unlocks Cybele.", points: 0, withMatching: 0 }] }] }
    ]
  },
  // ==========================================
  // PERSONA 4 GOLDEN
  // ==========================================
  {
    id: "p4-yosuke",
    name: "Yosuke Hanamura",
    game: "P4",
    arcana: "Magician",
    title: "Junes Manager's Son",
    image: "Yosuke",
    bio: "The clumsy but well-meaning son of the local Junes branch manager who recently moved to Inaba.",
    availability: "Mon, Tue, Thu, Fri, Sat, Sun (Classroom 2-2 / Junes)",
    requirements: "Automatic on 4/16",
    ranks: [
      { rank: 1, interactions: [{ prompt: "Story progression.", options: [{ text: "Automatic unlock.", points: 0, withMatching: 0 }] }] },
      { rank: 2, interactions: [{ prompt: "It must be tough being the new guy.", options: [{ text: "It's a hassle.", points: 2, withMatching: 3 }, { text: "I'm used to it.", points: 1, withMatching: 2 }] }] },
      { rank: 3, interactions: [
        { prompt: "Man, I'm so bored.", options: [{ text: "Let's do something.", points: 2, withMatching: 3 }, { text: "Me too.", points: 1, withMatching: 2 }] },
        { prompt: "Saki-senpai...", options: [{ text: "Are you okay?", points: 2, withMatching: 3 }] }
      ] },
      { rank: 4, interactions: [{ prompt: "I wonder if I can really be of any use.", options: [{ text: "You're doing great.", points: 2, withMatching: 3 }, { text: "Don't sweat it.", points: 1, withMatching: 2 }] }] },
      { rank: 5, interactions: [{ prompt: "You always seem to have it together.", options: [{ text: "Not really.", points: 2, withMatching: 3 }, { text: "I try.", points: 1, withMatching: 2 }] }] },
      { rank: 6, interactions: [{ prompt: "I'm glad we're partners.", options: [{ text: "Me too.", points: 2, withMatching: 3 }, { text: "Don't get sappy.", points: 0, withMatching: 0 }] }] },
      { rank: 7, interactions: [{ prompt: "I've been thinking about Saki-senpai again...", options: [{ text: "Talk to me.", points: 2, withMatching: 3 }, { text: "You have to move on.", points: 0, withMatching: 0 }] }] },
      { rank: 8, interactions: [{ prompt: "You're the only one I can trust.", options: [{ text: "I've got your back.", points: 2, withMatching: 3 }, { text: "Thanks.", points: 1, withMatching: 2 }] }] },
      { rank: 9, interactions: [{ prompt: "Hit me! As hard as you can!", options: [{ text: "Hit him.", points: 2, withMatching: 3 }, { text: "I can't do that.", points: 0, withMatching: 0 }] }] },
      { rank: 10, interactions: [{ prompt: "We're partners forever.", options: [{ text: "Max Rank Achieved.", points: 0, withMatching: 0 }] }] }
    ]
  },
  {
    id: "p4-chie",
    name: "Chie Satonaka",
    game: "P4",
    arcana: "Chariot",
    title: "Kung-Fu Enthusiast",
    image: "Chie",
    bio: "An upbeat, energetic girl who loves martial arts movies and steak, harboring deep protective feelings for her best friend Yukiko.",
    availability: "Mon, Tue, Thu, Fri, Sat (School Roof / Shopping District)",
    requirements: "Automatic on 4/18",
    ranks: [
      { rank: 1, interactions: [{ prompt: "Story progression.", options: [{ text: "Automatic unlock.", points: 0, withMatching: 0 }] }] },
      { rank: 2, interactions: [{ prompt: "What do you think is my strong point?", options: [{ text: "Your energetic nature.", points: 2, withMatching: 3 }, { text: "Your kicks.", points: 1, withMatching: 2 }] }] },
      { rank: 3, interactions: [{ prompt: "I wanna be stronger...", options: [{ text: "I'll train with you.", points: 2, withMatching: 3 }, { text: "Why?", points: 0, withMatching: 0 }] }] },
      { rank: 4, interactions: [{ prompt: "Takeshi is being bullied.", options: [{ text: "Let's help him.", points: 2, withMatching: 3 }, { text: "Leave it alone.", points: 0, withMatching: 0 }] }] },
      { rank: 5, interactions: [{ prompt: "I let my temper get the best of me.", options: [{ text: "That's very like you.", points: 2, withMatching: 3 }, { text: "You need to control it.", points: 0, withMatching: 0 }] }] },
      { rank: 6, interactions: [{ prompt: "Do you think I'm not feminine enough?", options: [{ text: "You're fine as you are.", points: 2, withMatching: 3 }, { text: "Maybe a little.", points: 0, withMatching: 0 }] }] },
      { rank: 7, interactions: [{ prompt: "I realized I need to protect people my own way.", options: [{ text: "That's a great idea.", points: 2, withMatching: 3 }, { text: "Can you do it?", points: 0, withMatching: 0 }] }] },
      { rank: 8, interactions: [{ prompt: "I don't need a weapon to protect people.", options: [{ text: "I believe in you.", points: 2, withMatching: 3 }, { text: "Be careful.", points: 1, withMatching: 2 }] }] },
      { rank: 9, isRomance: true, interactions: [{ prompt: "Will you be my personal trainer?", options: [{ text: "Will you be my girlfriend? [Romance]", points: 2, withMatching: 3 }, { text: "I'll train you hard. [Platonic]", points: 0, withMatching: 0 }] }] },
      { rank: 10, interactions: [{ prompt: "Max Rank Achieved.", options: [{ text: "Unlocks Futsunushi.", points: 0, withMatching: 0 }] }] }
    ]
  },
  // ==========================================
  // PERSONA 5 ROYAL
  // ==========================================
  {
    id: "p5-ryuji",
    name: "Ryuji Sakamoto",
    game: "P5",
    arcana: "Chariot",
    title: "Rebellious Ex-Track Star",
    image: "Ryuji",
    bio: "A misunderstood delinquent at Shujin Academy with a strong sense of justice and a deep hatred for abusive authority.",
    availability: "Mon, Tue, Wed, Fri, Sat (Classroom 2-D / Arcade)",
    requirements: "Automatic on 4/12",
    ranks: [
      { rank: 1, interactions: [{ prompt: "Story progression.", options: [{ text: "Automatic unlock.", points: 0, withMatching: 0 }] }] },
      { rank: 2, interactions: [{ prompt: "I'm countin' on ya.", options: [{ text: "I'm counting on you.", points: 2, withMatching: 3 }, { text: "Don't worry.", points: 1, withMatching: 2 }] }] },
      { rank: 3, interactions: [{ prompt: "What should we do?", options: [{ text: "Let's not argue.", points: 2, withMatching: 3 }, { text: "Calm down.", points: 1, withMatching: 2 }] }] },
      { rank: 4, interactions: [{ prompt: "Nakaoka is being an idiot.", options: [{ text: "Are you worried about him?", points: 2, withMatching: 3 }, { text: "Just ignore him.", points: 0, withMatching: 0 }] }] },
      { rank: 5, interactions: [{ prompt: "I want to settle this with the track team.", options: [{ text: "Protein powder?", points: 2, withMatching: 3 }, { text: "Let's go.", points: 1, withMatching: 2 }] }] },
      { rank: 6, interactions: [{ prompt: "I'm not gonna run away anymore.", options: [{ text: "We can do this.", points: 2, withMatching: 3 }, { text: "I believe in you.", points: 2, withMatching: 3 }] }] },
      { rank: 7, interactions: [{ prompt: "We need to expose Kamoshida's accomplices.", options: [{ text: "Let's talk to Takeishi.", points: 2, withMatching: 3 }, { text: "I'm with you.", points: 1, withMatching: 2 }] }] },
      { rank: 8, interactions: [{ prompt: "I've learned a lot from you.", options: [{ text: "Things worked out.", points: 2, withMatching: 3 }, { text: "You did it all yourself.", points: 1, withMatching: 2 }] }] },
      { rank: 9, interactions: [{ prompt: "I'm gonna be a better person.", options: [{ text: "I'm glad to hear it.", points: 2, withMatching: 3 }, { text: "You're already fine.", points: 1, withMatching: 2 }] }] },
      { rank: 10, interactions: [{ prompt: "Max Rank Achieved.", options: [{ text: "Unlocks Chi You.", points: 0, withMatching: 0 }] }] }
    ]
  },
  {
    id: "p5-makoto",
    name: "Makoto Niijima",
    game: "P5",
    arcana: "Priestess",
    title: "Student Council President",
    image: "Makoto",
    bio: "The highly intelligent student council president who feels pressured by her sister and society to be perfect.",
    availability: "Wed, Thu, Fri, Sun (3F School Hall / Aoyama)",
    requirements: "Knowledge Level 3 (Scholarly) after 6/24",
    ranks: [
      { rank: 1, interactions: [{ prompt: "Talk to Makoto outside the Student Council room.", options: [{ text: "Automatic unlock.", points: 0, withMatching: 0 }] }] },
      { rank: 2, interactions: [{ prompt: "I need to learn more about the world.", options: [{ text: "You're very well informed.", points: 2, withMatching: 3 }, { text: "That's a good idea.", points: 1, withMatching: 2 }] }] },
      { rank: 3, interactions: [{ prompt: "Eiko is acting strange.", options: [{ text: "You have great instincts.", points: 2, withMatching: 3 }, { text: "Let's investigate.", points: 1, withMatching: 2 }] }] },
      { rank: 4, interactions: [{ prompt: "I've never been to an arcade before.", options: [{ text: "That's unlike you.", points: 2, withMatching: 3 }, { text: "It's fun.", points: 1, withMatching: 2 }] }] },
      { rank: 5, interactions: [{ prompt: "Tsukasa seems suspicious.", options: [{ text: "He sounds suspicious.", points: 2, withMatching: 3 }, { text: "I'll help you look into it.", points: 1, withMatching: 2 }] }] },
      { rank: 6, interactions: [{ prompt: "I feel like I'm failing as a friend.", options: [{ text: "Love comes in many forms.", points: 2, withMatching: 3 }, { text: "Don't be so hard on yourself.", points: 1, withMatching: 2 }] }] },
      { rank: 7, interactions: [{ prompt: "We need to confront Tsukasa.", options: [{ text: "That's the role you play.", points: 2, withMatching: 3 }, { text: "Let's go.", points: 1, withMatching: 2 }] }] },
      { rank: 8, interactions: [{ prompt: "I want to be a police officer.", options: [{ text: "I'm sure you'll do great.", points: 2, withMatching: 3 }, { text: "That suits you.", points: 1, withMatching: 2 }] }] },
      { rank: 9, isRomance: true, interactions: [{ prompt: "I want someone who truly understands me.", options: [{ text: "I'll be your study partner. [Romance]", points: 2, withMatching: 3 }, { text: "You'll find someone. [Platonic]", points: 0, withMatching: 0 }] }] },
      { rank: 10, interactions: [{ prompt: "Max Rank Achieved.", options: [{ text: "Unlocks Cybele.", points: 0, withMatching: 0 }] }] }
    ]
  }
];