export interface Memory {
  id: number;
  era: string;
  title: string;
  description: string;
  insideJoke: string;
  imagePath: string;
  backgroundColor: string;
}

const memories: Memory[] = [
  {
    id: 1,
    era: "The Stone Age (Oldest)",
    title: "The Ancient Artifact",
    description:
      "The absolute oldest photo I could find of us. Look how tiny and stupid we looked. Ik my dressing sense is goat but tu hi main culprit hai, tune kabhi change nahi kiya.",
    insideJoke:
      "Remember this time I believed that I can make someone change for good (the D...)",
    imagePath: "/photo1.jpg",
    backgroundColor: "#FF6B6B",
  },
  {
    id: 2,
    era: "The Introductory Period",
    title: "The Fun Before Depression",
    description:
      "Dyaam thinking about that time still gives me so much fun. Kitna time hum saath spend karte the, how free we were. Dyammmm dude, miss it badly.",
    insideJoke:
      "Trying to hide your mustaches with this paper?....",
    imagePath: "/photo2.jpg",
    backgroundColor: "#4ECDC4",
  },
  {
    id: 3,
    era: "WHY SO AWKWARD POSE?",
    title: "The Cringe Awakening",
    description:
      "Dyaam from having super awkward pics to here — we don't even care what smell we carry when we meet. Btw ik I have good perfumes so please.",
    insideJoke:
      "📱 Remember I hid that I bought an iPhone just because I didn't want to look like a spoiled brat.",
    imagePath: "/photo3.jpg",
    backgroundColor: "#FF85A2",
  },
  {
    id: 4,
    era: "The First Fucking Trip",
    title: "Dyaam That Trip",
    description:
      "We don't talk about this trip enough. The worst planned trip ever but turned out to be with your future nanad. Dyaam, this was an amazing day.",
    insideJoke:
      "🎸 I hope you didn't forget the SOTY entry of me and Satyam (your suggestion btw).",
    imagePath: "/photo4.jpg",
    backgroundColor: "#7B68EE",
  },
  {
    id: 5,
    era: "The Renaissance (High School Begins)",
    title: "The Glow-Up That Wasn't",
    description:
      "High school! The era where we thought we finally figured it out. SPOILER: we absolutely did not. But we had each other, and honestly that's the only reason either of us survived the cafeteria hierarchy.",
    insideJoke:
      "We thought of doing soooo much and here we are scratching our ballz... wait, yours are probably Sambhav's....",
    imagePath: "/photo5.jpg",
    backgroundColor: "#45B7D1",
  },
  {
    id: 6,
    era: "Only Day I call myself your Brother",
    title: "Bhaiya Mere Rakhi Ke Bandhan Ko Nibhana",
    description:
      "Idk why we decided this but it was a good decision I think... (and I won't step back on my jokes, just so you know)",
    insideJoke:
      "Why do you always cry for photos? Remember iss din I wanted to sit on the other side just for your side profile, you made me sit like this.",
    imagePath: "/photo6.jpg",
    backgroundColor: "#96CEB4",
  },
  {
    id: 7,
    era: "Only Good Pic",
    title: "Only Good Pic",
    description:
      "Only good pic.",
    insideJoke:
      "ONLY GOOD PIC.",
    imagePath: "/photo7.jpg",
    backgroundColor: "#FFEAA7",
  },
  {
    id: 8,
    era: "THE OG TRIO",
    title: "THE TRIO WHICH GOT IT'S PEAK VERY EARLY",
    description:
      "So good phases come to an end and you never realised the transition.",
    insideJoke:
      "JORU KE GULAM — IYKYK",
    imagePath: "/photo8.JPG",
    backgroundColor: "#DDA0DD",
  },
  {
    id: 9,
    era: "ETHINIC",
    title: "Freshers",
    description:
      "Dyaam we used to be with each other like a lot and look at us now :(",
    insideJoke:
      "This overconfident kid thought he would become MR. FAREWELL.",
    imagePath: "/photo9.jpg",
    backgroundColor: "#FF6348",
  },
  {
    id: 10,
    era: "Ummm....",
    title: "Ummmm...we know what was this time all about",
    description:
      "Nice Burger though",
    insideJoke:
      "Halka halka fuck boi toh hu mai, bas gutsy hi kam reh gya :) (anyways found Ananya now)",
    imagePath: "/photo10.JPG",
    backgroundColor: "#A29BFE",
  },
  {
    id: 11,
    era: "wait what?",
    title: "The Road Trip of Questionable Decisions",
    description:
      "Our first road trip together where the playlist was fire, but dyamm we went for a trip together only once. We should try some more.",
    insideJoke:
      "This day proved among us who is a true NCC cadet (and why is Ananya so happy with me). STAMINAAAAA!!!!",
    imagePath: "/photo11.JPG",
    backgroundColor: "#FD79A8",
  },
  {
    id: 12,
    era: "Pookie",
    title: "Nice Pic",
    description:
      "Give the photographer a raise",
    insideJoke:
      "You look like a fucking chopstick. You're much better now, you know what I mean ;)",
    imagePath: "/photo12.JPG",
    backgroundColor: "#00CEC9",
  },
  {
    id: 13,
    era: "MY PEAK",
    title: "The Emotional Support Best Friend Era",
    description:
      "The phase where we stopped being chaotic long enough to actually be there for each other through real stuff. The 2 AM calls. The honest advice. The 'I'll literally fight anyone who hurts you' energy. This is why you're not just a friend, you're my SISTER.",
    insideJoke:
      "💝 That one time I called you crying over something stupid and you were like 'fuck heerrrrrrr'. (Dyaam I mean yeah I used to but now she's gone)",
    imagePath: "/photo13.JPG",
    backgroundColor: "#E17055",
  },
  {
    id: 14,
    era: "Dyaam that forehead",
    title: "That Forehead",
    description:
      "DYAM THAT FOREHEAD",
    insideJoke:
      "DYAMMMM LITERALLY THAT FOREHEAD. You fr improved...",
    imagePath: "/photo14.JPG",
    backgroundColor: "#FDCB6E",
  },
  {
    id: 15,
    era: "Best trip proally",
    title: "THE OG TRIP TO AN OG PLACE",
    description:
      "I mean this place my gooooddddddd. This is now closed but bro, best fucking trip at the best fucking time. Never experienced this much adrenaline and surprises in a single day.",
    insideJoke:
      "I was just hoping that you and Arushi wouldn't come up, like you guys can't even imagine what both of us were doing.",
    imagePath: "/photo15.JPG",
    backgroundColor: "#6C5CE7",
  },
  {
    id: 16,
    era: "Nice pony",
    title: "Dunno why was doin that",
    description:
      "I always like to pull girls by their pony.",
    insideJoke:
      "I mean yeah I can pull harder :WINK:.",
    imagePath: "/photo16.JPG",
    backgroundColor: "#9B5DE5",
  },
];

export default memories;