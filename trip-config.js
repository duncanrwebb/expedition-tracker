/* Expedition Log — keepsake, made by scripts/make-keepsake.js on 2026-10-24.
   The trip is over. This is the memory of it, with the details used during
   the trip taken out; the full trip is trips/<name>/trip-config.js in the repo. */

const TRIP = {
  "trip": {
    "title": "Expedition Log",
    "eyebrow": "George Abbot School · True Adventure",
    "subtitle": "Vietnam & Cambodia · 17 Jul – 4 Aug 2026",
    "traveller": "Marcus",
    "pronoun": "he",
    "startDate": "2026-07-17",
    "endDate": "2026-08-04",
    "departureMoment": "2026-07-17T10:30:00+01:00",
    "departureZone": "Europe/London",
    "destinationTimeZone": "Asia/Phnom_Penh",
    "destinationLabel": "Phnom Penh",
    "updated": "2026-10-24",
    "audience": "at-home",
    "footer": "This trip has ended. The app is kept as a memory of it — nothing here is being updated, and the bookings, contacts and other details used during the trip have been taken out."
  },
  "theme": {
    "name": "Cambodia & Vietnam",
    "story": "Not just a random theme — dark jungle green nods to the Cardamom rainforest the trek passes through, gold echoes temple stone and gilding like Angkor Wat, cream instead of stark white gives it a field-journal feel rather than a generic app, and a muted red nods to Khmer architecture. Built to feel like <i>this</i> trip, not a template.",
    "primary": "#1B4332",
    "primaryDeep": "#123324",
    "accent": "#C9A66B",
    "iconArt": "temple",
    "background": "#F6F1E7",
    "surface": "#FBF8F1",
    "text": "#1F2421",
    "textBody": "#3A3F3B",
    "textMuted": "#6B6455",
    "border": "#E4DCC8",
    "borderStrong": "#C9BFA6",
    "past": "#B8AE99",
    "success": "#3F7248",
    "warning": "#8A6D3B",
    "alert": "#A63D40"
  },
  "phases": {
    "travel": {
      "label": "Travel day",
      "colour": "#6B7A8F",
      "text": "#47525F",
      "icon": "✈"
    },
    "culture": {
      "label": "Culture & city",
      "colour": "#A63D40",
      "text": "#8A3336",
      "icon": "⛩"
    },
    "project": {
      "label": "Community project",
      "colour": "#3F7248",
      "text": "#335C3A",
      "icon": "🌱"
    },
    "trek": {
      "label": "Jungle trek",
      "colour": "#1B4332",
      "text": "#1B4332",
      "icon": "🥾"
    },
    "border": {
      "label": "Border crossing",
      "colour": "#8A6D3B",
      "text": "#6E5730",
      "icon": "🛂"
    },
    "home": {
      "label": "Home",
      "colour": "#A63D40",
      "text": "#8A3336",
      "icon": "🏡"
    }
  },
  "days": [
    {
      "n": 1,
      "date": "2026-07-17",
      "phase": "travel",
      "loc": "London → in flight",
      "lat": 51.1598168,
      "lng": -0.1776161,
      "onMap": false,
      "photo": "gatwick",
      "map": "gatwick",
      "summary": "Coach to Gatwick departs 10:30, check in for EK16 (North Terminal), 14:30 departure — overnight flight toward Dubai.",
      "fact": "Gatwick is the world's busiest single-runway airport — everything {name}'s plane does today happens on one strip of tarmac.",
      "schedule": [
        [
          0,
          "getting ready and packing final bits"
        ],
        [
          11,
          "at Gatwick with the team"
        ],
        [
          14,
          "in the air — EK16 to Dubai"
        ]
      ]
    },
    {
      "n": 2,
      "date": "2026-07-18",
      "phase": "travel",
      "loc": "Dubai (extra night)",
      "lat": 25.2048493,
      "lng": 55.2707828,
      "onMap": false,
      "photo": "dubai",
      "map": "dubai",
      "summary": "Arrived Dubai 00:40 but missed the EK314 connection — the team are safe and staying at the VOGO Grand Hotel, Dubai until 19 July, then depart 21:00 on EK314 (a multi-leg service via Singapore), landing Phnom Penh 16:40 on 20 July.",
      "fact": "Dubai is 4 hours ahead of the UK and sits at the crossroads of Emirates' global network — nearly half the airline's routes connect through here.",
      "schedule": [
        [
          0,
          "landed in Dubai 00:40 — but missed the EK314 connection"
        ],
        [
          2,
          "transferred to the VOGO Grand Hotel, Dubai for an unplanned extra night"
        ],
        [
          10,
          "breakfast, resting up after the overnight flight"
        ],
        [
          14,
          "free time in Dubai — an unexpected extra day in the city"
        ],
        [
          20,
          "dinner at the hotel"
        ],
        [
          22,
          "asleep"
        ]
      ]
    },
    {
      "n": 3,
      "date": "2026-07-19",
      "phase": "travel",
      "loc": "Dubai (extra night)",
      "lat": 25.2048493,
      "lng": 55.2707828,
      "onMap": false,
      "photo": "dubai",
      "map": "dubai",
      "summary": "A second, unplanned day in Dubai while waiting for tonight's rebooked flight — the team are safe at the VOGO Grand Hotel. Departs 21:00 on EK314 to Singapore (arriving ~08:35), then a long layover before EK348 to Phnom Penh at 15:40, arriving 16:40 tomorrow.",
      "fact": "Dubai's Museum of the Future and the Burj Khalifa are both visible from many hotel rooftops across the city — even an unplanned extra day here has a pretty striking skyline.",
      "schedule": [
        [
          0,
          "asleep at the VOGO Grand Hotel, Dubai"
        ],
        [
          9,
          "breakfast — a second unplanned day in Dubai while the rebooked flight is confirmed"
        ],
        [
          14,
          "free time / resting at the hotel"
        ],
        [
          18,
          "checking out, heading to the airport"
        ],
        [
          21,
          "in the air ✈️ — EK314 to Singapore"
        ]
      ]
    },
    {
      "n": 4,
      "date": "2026-07-20",
      "phase": "travel",
      "loc": "Dubai → Phnom Penh",
      "lat": 11.5563738,
      "lng": 104.9282099,
      "photo": "phnompenh",
      "map": "phnompenh",
      "summary": "Departed Dubai 21:00 the previous night on EK314, landing Singapore ~08:35, then a ~7hr layover before EK348 departs 15:40 for the final leg — arriving Phnom Penh 16:40, the team's real arrival into Cambodia after the Dubai delay. True Adventure's revised itinerary compresses the schedule after this so the 4 August return date stays unchanged.",
      "fact": "Phnom Penh sits where three rivers meet, including the Mekong — one of the few rivers on Earth that reverses direction with the seasons.",
      "schedule": [
        [
          0,
          "in the air ✈️ — EK314, overnight to Singapore"
        ],
        [
          8,
          "landed in Singapore — long layover before the next leg"
        ],
        [
          12,
          "still transiting Singapore Changi"
        ],
        [
          15,
          "in the air ✈️ — EK348, final leg to Phnom Penh"
        ],
        [
          17,
          "landed in Phnom Penh — the team's real arrival into Cambodia"
        ],
        [
          20,
          "settling into the hotel"
        ],
        [
          22,
          "asleep"
        ]
      ]
    },
    {
      "n": 5,
      "date": "2026-07-21",
      "phase": "culture",
      "loc": "Phnom Penh",
      "lat": 11.5563738,
      "lng": 104.9282099,
      "photo": "phnompenh",
      "map": "phnompenh",
      "summary": "A full day of sightseeing in Phnom Penh — the Royal Palace, Silver Pagoda, and Riverside markets. A chance to settle in and explore Cambodia's capital before heading north.",
      "fact": "The Silver Pagoda inside Phnom Penh's Royal Palace is named for its floor — over 5,000 solid silver tiles, most kept carpeted to protect them from centuries of footsteps.",
      "schedule": [
        [
          0,
          "asleep at the hotel"
        ],
        [
          7,
          "breakfast, catching up after the Dubai delay"
        ],
        [
          9,
          "visiting the Royal Palace and Silver Pagoda"
        ],
        [
          13,
          "lunch by the riverside"
        ],
        [
          15,
          "exploring the riverside markets"
        ],
        [
          19,
          "free evening in Phnom Penh"
        ],
        [
          22,
          "asleep"
        ]
      ]
    },
    {
      "n": 6,
      "date": "2026-07-22",
      "phase": "travel",
      "loc": "Phnom Penh → Siem Reap",
      "lat": 13.4124693,
      "lng": 103.8669857,
      "photo": "angkorwat",
      "map": "angkorwat",
      "summary": "Travel north to Siem Reap (~6hrs) and visit Angkor Wat in the afternoon — first glimpse of the world's largest religious monument.",
      "fact": "Angkor Wat was built ~900 years ago without cranes or mortar — millions of sandstone blocks floated in on rafts and fitted so tightly no cement was needed.",
      "schedule": [
        [
          0,
          "asleep"
        ],
        [
          7,
          "breakfast, then boarding transport to Siem Reap"
        ],
        [
          9,
          "on the road to Siem Reap (~6hrs)"
        ],
        [
          15,
          "first glimpse of Angkor Wat"
        ],
        [
          18,
          "evening in Siem Reap"
        ],
        [
          22,
          "asleep"
        ]
      ]
    },
    {
      "n": 7,
      "date": "2026-07-23",
      "phase": "travel",
      "loc": "Siem Reap → Peaksneng",
      "lat": 13.4124693,
      "lng": 103.8669857,
      "photo": "angkorwat",
      "map": "angkorwat",
      "summary": "Sunrise visit to Angkor Wat — the iconic golden-hour shot from the reflection pool. Then transfer ~3.5hrs east to Peaksneng for the project briefing and to meet the community.",
      "fact": "Angkor Wat is the only major temple at the Angkor complex that faces west instead of east — an unusual orientation historians still debate, though it makes for a dramatic reflection in the pool at sunrise.",
      "schedule": [
        [
          0,
          "asleep"
        ],
        [
          5,
          "up for sunrise at Angkor Wat"
        ],
        [
          9,
          "exploring more of the Angkor complex"
        ],
        [
          12,
          "transferring ~3.5hrs east to Peaksneng"
        ],
        [
          16,
          "project briefing, meeting the community"
        ],
        [
          19,
          "first evening in the village"
        ],
        [
          22,
          "asleep"
        ]
      ]
    },
    {
      "n": 8,
      "date": "2026-07-24",
      "phase": "project",
      "loc": "Peaksneng",
      "lat": 13.55,
      "lng": 104.15,
      "summary": "Project Day 1: working with a local family to build their organic 'FAITH' vegetable garden — fencing and planting, alongside the Peaksneng Thormacheat Shop community.",
      "fact": "'FAITH garden' is Better Lives' name for the family vegetable plots {name} is helping build today — designed to give a family a steady, self-sufficient food supply all year round.",
      "schedule": [
        [
          0,
          "asleep"
        ],
        [
          7,
          "breakfast, then heading to the project site"
        ],
        [
          8,
          "morning session — fencing and planting the FAITH garden"
        ],
        [
          12,
          "midday break — too hot to work, resting until 2pm"
        ],
        [
          14,
          "afternoon session continues"
        ],
        [
          17,
          "finished for the day — free time or a village activity"
        ],
        [
          21,
          "asleep"
        ]
      ]
    },
    {
      "n": 9,
      "date": "2026-07-25",
      "phase": "project",
      "loc": "Peaksneng",
      "lat": 13.55,
      "lng": 104.15,
      "summary": "Project Day 2: garden work continues — making compost and natural insect-repellent sprays, 4-6hrs with a break from the midday heat (12:00-14:00). Evening with the community.",
      "fact": "Insect-repellent spray made from local plants is a favourite trick in organic farming here — it protects the vegetables without any chemicals a family can't afford to keep buying.",
      "schedule": [
        [
          0,
          "asleep"
        ],
        [
          7,
          "breakfast, then back to the project site"
        ],
        [
          8,
          "morning session — making compost and natural insect-repellent sprays"
        ],
        [
          12,
          "midday break"
        ],
        [
          14,
          "afternoon session continues"
        ],
        [
          18,
          "evening with the community"
        ],
        [
          21,
          "asleep"
        ]
      ]
    },
    {
      "n": 10,
      "date": "2026-07-26",
      "phase": "project",
      "loc": "Peaksneng",
      "lat": 13.55,
      "lng": 104.15,
      "summary": "Project Day 3: finishing the family's garden. Evening with the community — possibly a cooking lesson, local circus, or traditional music with the village.",
      "fact": "The whole village is officially behind this project — local leaders arranged skilled community members to help, so today is as much a village event as a build day.",
      "schedule": [
        [
          0,
          "asleep"
        ],
        [
          7,
          "breakfast, then heading to the project site"
        ],
        [
          8,
          "finishing the family's garden"
        ],
        [
          12,
          "midday break"
        ],
        [
          14,
          "afternoon wrapping up"
        ],
        [
          18,
          "evening with the community — cooking, circus, or music"
        ],
        [
          21,
          "asleep"
        ]
      ]
    },
    {
      "n": 11,
      "date": "2026-07-27",
      "phase": "travel",
      "loc": "Peaksneng → Phnom Penh",
      "lat": 11.5563738,
      "lng": 104.9282099,
      "photo": "phnompenh",
      "map": "phnompenh",
      "summary": "Morning at the project — final touches and goodbyes — then an afternoon drive (~6hrs) back to Phnom Penh. Evening at the night markets.",
      "fact": "Fish amok, Cambodia's national dish, is a coconut fish curry steamed in banana leaves — {name} might try it at the night market tonight.",
      "schedule": [
        [
          0,
          "asleep"
        ],
        [
          7,
          "saying goodbye to the family and community"
        ],
        [
          9,
          "final touches at the project"
        ],
        [
          12,
          "on the ~6hr drive back to Phnom Penh"
        ],
        [
          18,
          "arrived, at the night markets"
        ],
        [
          22,
          "asleep"
        ]
      ]
    },
    {
      "n": 12,
      "date": "2026-07-28",
      "phase": "travel",
      "loc": "Phnom Penh → Chi Phat",
      "lat": 11.3286123,
      "lng": 103.5240783,
      "photo": "chiphat",
      "map": "chiphat",
      "summary": "08:00 collection, 3-4hr drive to Andoung Tuek, then a 2hr boat ride up the Preak Piphot River to Chi Phat — spotting monkeys, flying squirrels and birds along the way. Short 2km hike to Chhay Chrey Rapids in the evening.",
      "fact": "The Cardamom Mountains sprawl over 4.4 million hectares — the largest rainforest in Southeast Asia. Today's boat ride up the Preak Piphot River often spots monkeys, flying squirrels and all kinds of birds.",
      "schedule": [
        [
          0,
          "asleep"
        ],
        [
          8,
          "collected from the hotel, 3-4hr drive to Andoung Tuek"
        ],
        [
          12,
          "boarding the boat up the Preak Piphot River"
        ],
        [
          15,
          "arriving at Chi Phat, meeting the trek guides"
        ],
        [
          18,
          "short evening hike to Chhay Chrey Rapids"
        ],
        [
          20,
          "dinner and trek briefing"
        ],
        [
          21,
          "asleep"
        ]
      ]
    },
    {
      "n": 13,
      "date": "2026-07-29",
      "phase": "trek",
      "loc": "Chi Phat → O'Ampov",
      "lat": 11.28,
      "lng": 103.42,
      "photo": "chiphat",
      "map": "chiphat",
      "summary": "Trek Day 1 of 3: setting off along old logging trails with wide Cardamom views. Explores the 'hidden' O'Spot waterfall — walking behind it to a bat cave — with lunch at Tuk Vet waterfall, before camping at O'Ampov. (Exact distance not yet confirmed now the trek's compressed to 3 days.)",
      "fact": "At O'Spot waterfall today, you can actually walk behind the water into a hidden bat cave — Chi Phat became Cambodia's first community-run ecotourism project, turning a former poaching village into one protecting its own forest.",
      "schedule": [
        [
          0,
          "asleep"
        ],
        [
          6,
          "breakfast, setting off on Trek Day 1 of 3"
        ],
        [
          9,
          "trekking along old logging trails with wide Cardamom views"
        ],
        [
          11,
          "at the 'hidden' O'Spot waterfall — walking behind it to the bat cave"
        ],
        [
          13,
          "lunch at Tuk Vet waterfall"
        ],
        [
          16,
          "afternoon trekking"
        ],
        [
          18,
          "arriving at camp for the night"
        ],
        [
          20,
          "asleep — early nights on trek"
        ]
      ],
      "trekKm": 16
    },
    {
      "n": 14,
      "date": "2026-07-30",
      "phase": "trek",
      "loc": "O'Ampov → O'Peam Krovanh",
      "lat": 11.24,
      "lng": 103.38,
      "summary": "Trek Day 2 of 3: to a mystical site of ancient burial jars and wooden coffins hidden in the forest, lunch by the O'Peam Pika River, then on to camp at O'Peam Krovanh.",
      "fact": "The mysterious burial jars and wooden coffins {name} passes today are hidden deep in the forest — nobody is certain which people left them there, or exactly how old they are.",
      "schedule": [
        [
          0,
          "asleep"
        ],
        [
          6,
          "breakfast, setting off on Trek Day 2 of 3"
        ],
        [
          10,
          "hiking to the site of ancient burial jars and wooden coffins"
        ],
        [
          13,
          "lunch by the O'Peam Pika River"
        ],
        [
          16,
          "afternoon trekking on to camp"
        ],
        [
          20,
          "asleep"
        ]
      ],
      "trekKm": 16
    },
    {
      "n": 15,
      "date": "2026-07-31",
      "phase": "trek",
      "loc": "O'Peam Krovanh → Chi Phat",
      "lat": 11.3286123,
      "lng": 103.5240783,
      "photo": "chiphat",
      "map": "chiphat",
      "summary": "Trek Day 3 of 3: a final push through the Cardamom foothills, passing ancient burial sites and rivers, then looping back to Chi Phat village for a celebratory community dinner.",
      "fact": "By tonight {name} will have trekked an estimated ~45km in three days — nearly a marathon and a half through jungle in tropical heat — finishing with a celebratory dinner back in the Chi Phat community that first welcomed {obj}. True Adventure confirmed the trek is now 3 days rather than 4; exact daily distances aren't confirmed yet, so this total is still an estimate.",
      "schedule": [
        [
          0,
          "asleep"
        ],
        [
          6,
          "final trek day begins — Trek Day 3 of 3"
        ],
        [
          10,
          "a last push through the Cardamom foothills"
        ],
        [
          14,
          "looping back toward Chi Phat"
        ],
        [
          18,
          "celebratory community dinner!"
        ],
        [
          21,
          "asleep"
        ]
      ],
      "trekKm": 13
    },
    {
      "n": 16,
      "date": "2026-08-01",
      "phase": "travel",
      "loc": "Chi Phat → Phnom Penh",
      "lat": 11.5563738,
      "lng": 104.9282099,
      "photo": "phnompenh",
      "map": "phnompenh",
      "summary": "Sunrise hike, then transfer (~5.5hrs) back to Phnom Penh. Free afternoon for sightseeing or shopping.",
      "fact": "Phnom Penh means 'Penh's Hill' — legend says a widow named Penh found sacred statues in a floating tree and built a temple on the hill.",
      "schedule": [
        [
          0,
          "asleep"
        ],
        [
          5,
          "possibly up for the sunrise hike"
        ],
        [
          9,
          "transfer back to Phnom Penh (~5.5hrs)"
        ],
        [
          15,
          "free afternoon — sightseeing or shopping"
        ],
        [
          20,
          "last night in Cambodia"
        ],
        [
          22,
          "asleep"
        ]
      ]
    },
    {
      "n": 17,
      "date": "2026-08-02",
      "phase": "border",
      "loc": "Phnom Penh → Ho Chi Minh City",
      "lat": 10.8230989,
      "lng": 106.6296638,
      "photo": "hcmc",
      "map": "hcmc",
      "summary": "Asia Adventures buses the team to the Bavet/Moc Bai border, where the Vietnam agent (Footprint) takes over for the drive into Ho Chi Minh City. Wander the alleyways to Ben Thanh Market, organise a final celebratory meal, or explore the city.",
      "fact": "Crossing at Bavet/Moc Bai, {name} goes from the Kingdom of Wonder to Vietnam — where Ben Thanh Market in Ho Chi Minh City has stood since 1914 and you can barter for almost anything.",
      "schedule": [
        [
          0,
          "asleep"
        ],
        [
          7,
          "breakfast, then bus toward the border"
        ],
        [
          11,
          "crossing at Bavet/Moc Bai into Vietnam"
        ],
        [
          14,
          "on the road to Ho Chi Minh City"
        ],
        [
          17,
          "exploring the markets"
        ],
        [
          19,
          "final celebratory team meal!"
        ],
        [
          23,
          "asleep"
        ]
      ]
    },
    {
      "n": 18,
      "date": "2026-08-03",
      "phase": "travel",
      "loc": "Ho Chi Minh City → in transit",
      "lat": 10.8230989,
      "lng": 106.6296638,
      "photo": "hcmc",
      "map": "hcmc",
      "summary": "Collected at 8:30am for the pre-paid 2hr trip to the Cu Chi Tunnels — lunch at the tunnel entrance, then back to the city to visit the War Remnants Museum. Footprint then transfers the team to the airport. Depart Tan Son Nhat on EK393 at 23:50.",
      "fact": "The Cu Chi Tunnels today were built by the Viet Cong — over 250km of underground passages used during the Vietnam War. Some sections tourists can crawl through are still the original wartime size.",
      "schedule": [
        [
          0,
          "asleep"
        ],
        [
          7,
          "sourcing breakfast before the early collection"
        ],
        [
          9,
          "on the way to the Cu Chi Tunnels (2hrs from the city)"
        ],
        [
          11,
          "exploring the Cu Chi Tunnels"
        ],
        [
          13,
          "lunch at the tunnel entrance restaurant"
        ],
        [
          15,
          "back in the city, visiting the War Remnants Museum"
        ],
        [
          18,
          "returning to the hotel to collect luggage"
        ],
        [
          20,
          "Footprint transfers the team to Tan Son Nhat airport"
        ],
        [
          23,
          "boarding EK393 — heading home!"
        ]
      ]
    },
    {
      "n": 19,
      "date": "2026-08-04",
      "phase": "home",
      "loc": "Dubai → home",
      "lat": 51.1598168,
      "lng": -0.1776161,
      "onMap": false,
      "photo": "gatwick",
      "map": "gatwick",
      "summary": "Arrive Dubai 04:00, depart EK15 08:00, land London Gatwick 12:35. Welcome home!",
      "fact": "After ~19,000km of travel, two countries, one jungle and a house built — welcome home, {name}! 🎉",
      "schedule": [
        [
          0,
          "in the air to Dubai"
        ],
        [
          8,
          "transiting Dubai, boarding EK15"
        ],
        [
          11,
          "in the air — final leg to Gatwick"
        ],
        [
          18,
          "HOME! 🎉"
        ]
      ]
    }
  ],
  "photos": {
    "gatwick": "https://upload.wikimedia.org/wikipedia/commons/2/21/Gatwick_Airport_%2850850159593%29.jpg",
    "dubai": "https://upload.wikimedia.org/wikipedia/commons/1/10/Dubai_Skyline_2016.jpg",
    "phnompenh": "https://upload.wikimedia.org/wikipedia/commons/8/84/Phnom_Penh_skyline_from_TK_district_Dec_2024.jpg",
    "siemreap": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Front_porch_of_Wat_Damnak.jpg/3840px-Front_porch_of_Wat_Damnak.jpg",
    "angkorwat": "https://upload.wikimedia.org/wikipedia/commons/4/41/Angkor_Wat.jpg",
    "chiphat": "https://upload.wikimedia.org/wikipedia/commons/2/23/Cardamom_sunset.jpg",
    "hcmc": "https://upload.wikimedia.org/wikipedia/commons/8/86/Ho_Chi_Minh_City%2C_City_Hall%2C_2020-01_CN-03.jpg"
  },
  "maps": {
    "gatwick": "https://maps.google.com/?cid=13726001889933259878",
    "dubai": "https://maps.google.com/?cid=16615419498770001641",
    "phnompenh": "https://maps.google.com/?cid=11241282536010491323",
    "siemreap": "https://maps.google.com/?cid=12195935778398125050",
    "angkorwat": "https://maps.google.com/?cid=4515887843808133517",
    "chiphat": "https://maps.google.com/?cid=13307792977288898585",
    "andoungteuk": "https://maps.google.com/?cid=7894567541936003502",
    "bavet": "https://maps.google.com/?cid=13326921918439192340",
    "hcmc": "https://maps.google.com/?cid=17392719987004412203"
  },
  "keyDates": [
    {
      "date": "2026-07-20",
      "when": "Mon 20 Jul, ~10:40 UK time",
      "label": "Safe arrival in Phnom Penh (after missed connection)"
    },
    {
      "date": "2026-07-29",
      "when": "Wed 29 Jul",
      "label": "Team heads into the jungle (least contactable)"
    },
    {
      "date": "2026-07-31",
      "when": "Fri 31 Jul",
      "label": "Team exits the jungle at Chi Phat"
    },
    {
      "date": "2026-08-03",
      "when": "Mon 3 Aug, ~17:50 UK time",
      "label": "Departure from Ho Chi Minh City"
    },
    {
      "date": "2026-08-04",
      "when": "Tue 4 Aug, 12:35",
      "label": "Landing at Gatwick — pickup!"
    }
  ],
  "trek": {
    "enabled": true,
    "title": "The Cardamom Trek",
    "dates": "29–31 Jul",
    "blurb": "~45km over three days through jungle (estimated total; exact daily distances aren't confirmed).",
    "totalKm": 45,
    "areaLat": 11.3286123,
    "areaLng": 103.5240783,
    "areaLabel": "Chi Phat",
    "startHour": 8,
    "endHour": 17
  },
  "noContact": [
    {
      "from": "2026-07-29",
      "to": "2026-07-31",
      "reason": "{name} is on the Cardamom trek — nobody on the team carries a phone, and there's no signal out there anyway. The satellite tracker still updates.",
      "nextNews": "Fri 31 Jul, when the team walks back into Chi Phat"
    }
  ],
  "flights": [
    {
      "no": "EK16",
      "from": "London Gatwick",
      "to": "Dubai",
      "fromIata": "LGW",
      "toIata": "DXB",
      "dep": "2026-07-17T14:30:00+01:00",
      "arr": "2026-07-18T00:40:00+04:00"
    },
    {
      "no": "EK314",
      "from": "Dubai",
      "to": "Singapore",
      "fromIata": "DXB",
      "toIata": "SIN",
      "dep": "2026-07-19T21:00:00+04:00",
      "arr": "2026-07-20T08:35:00+08:00"
    },
    {
      "no": "EK348",
      "from": "Singapore",
      "to": "Phnom Penh",
      "fromIata": "SIN",
      "toIata": "KTI",
      "dep": "2026-07-20T15:40:00+08:00",
      "arr": "2026-07-20T16:40:00+07:00"
    },
    {
      "no": "EK393",
      "from": "Ho Chi Minh City",
      "to": "Dubai",
      "fromIata": "SGN",
      "toIata": "DXB",
      "dep": "2026-08-03T23:50:00+07:00",
      "arr": "2026-08-04T04:00:00+04:00"
    },
    {
      "no": "EK15",
      "from": "Dubai",
      "to": "London Gatwick",
      "fromIata": "DXB",
      "toIata": "LGW",
      "dep": "2026-08-04T08:00:00+04:00",
      "arr": "2026-08-04T12:35:00+01:00"
    }
  ],
  "flightGraceHours": 6,
  "links": {
    "photos": "https://www.instagram.com/gacambodia2026/",
    "photosLabel": "@gacambodia2026",
    "photosNote": "The school's account of the trip. It's private: request access, then wait to be approved.",
    "liveTracker": "https://cf.yb.tl/ta2026_gast2"
  },
  "messages": {
    "heading": "Leave {name} a message",
    "hint": "Somewhere to keep what you remember from while {subj} {was} away, and what you'd like {obj} to know.",
    "placeholder": "e.g. what we were all doing the day the team went into the jungle",
    "prompts": [
      "What do you remember most from while {subj} {was} away?",
      "What would you like to ask {obj} about the trip?",
      "What was happening at home while {subj} {was} away?",
      "A day of the trip you'd like {obj} to tell you more about"
    ]
  },
  "liveFlightStatus": {
    "off": true
  },
  "private": false,
  "editable": true,
  "storagePrefix": "template-",
  "carryOver": [
    "template-",
    "marcus-trip-"
  ],
  "keepsake": {
    "since": "2026-10-24"
  }
};
