const teas = [
  {
  "drink type": "Loose-leaf tea",
  "identifier": 1,
  "name": "Fruit Aroma Yixing Black Tea",
  "manufacturer": "Yunnan Sourcing",
  "description": "First flush harvest black tea from Yixing in Jiangsu. The home of the world famous Purple Zisha Clay Teapots is also an area that produces some less-known but still world-class black tea! We are proud to offer three grades of Yixing Hong for you to enjoy! This is a unique style of Yixing black tea that is processed to emphasize the sweet fruity character that this tea has. Sweet, fruity, and malty! Very smooth and enjoyable daily drinker black tea! Harvested in Late-April each year! Yixing Township in Jiangsu Province.",
  "grams of tea": 2.4,
  "grams of water": 300,
  "brewwing temperature": 90,
  "steeping time": "2 to 3",
  "type of tea": "Black",
  "link": "https://yunnansourcing.us/products/fruit-aroma-yixing-black-tea?_pos=1&_sid=6a989610e&_ss=r"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 2,
    "name": "Jasmine Silver Needles White Tea of Yunnan",
    "manufacturer": "Yunnan Sourcing",
    "description": "Spring harvest silver needles white tea from the mountains of Simao was infused with high quality Yunnan grown jasmine flowers. A nice balanced sweet jasmine tea with notes of sugarcane and fruit. Naturally processed from start to finish. Very pleasant to drink! Spring Harvest Tea (April) and Jasmine Flowers Harvested in May.",
    "grams of tea": 1.8,
    "grams of water": 300,
    "brewwing temperature": 85,
    "steeping time": "3 to 4",
    "type of tea": "White",
    "link": "https://yunnansourcing.us/products/jasmine-silver-needles-white-tea-of-yunnan?_pos=1&_sid=c6b5204a6&_ss=r"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 3,
    "name": "Feng Qing Premium Black Gold Pearls Black Tea",
    "manufacturer": "Yunnan Sourcing",
    "description": "First Flush of Spring Black Tea! Feng Qing area tippy grade black tea has been hand-rolled into these convenient little black tea pearls. Complex flavors are revealed as the tea gradually unfolds with multiple infusions. Hints of malt and chocolate with a sweet and spicy after-taste gives this tea a taste experience that rivals it's simple beauty. Each pearl is roughly 3 grams. Drop a few into your gaiwan or teapot and enjoy! March Harvest.",
    "grams of tea": 1,
    "grams of water": 300,
    "brewwing temperature": 90,
    "steeping time": "4 to 6",
    "type of tea": "Black",
    "link": "https://yunnansourcing.us/products/feng-qing-premium-black-gold-pearls-yunnan-black-tea?_pos=1&_sid=c674411a1&_ss=r"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 4,
    "name": "Premium Anxi Huang Jin Gui Oolang Tea of Fujian",
    "manufacturer": "Yunnan Sourcing",
    "description": "Huang Jin Gui (Golden Turtle) is another varietal of Anxi Oolong tea. Lacking the slight sour-bitterness of Tie Guan Yin, it is characterized by a smooth sweet flavor with a rich slightly nutty after-taste. Our Premium grade is the highest grade of Huang Jin Gui that is normally available! Gan De Village in Anxi County.",
    "grams of tea": 3,
    "grams of water": 300,
    "brewwing temperature": 99,
    "steeping time": "2 to 3",
    "type of tea": "Oolong",
    "link": "https://yunnansourcing.us/products/premium-anxi-huang-jin-gui-oolong-tea-of-fujian-spring-2018?_pos=1&_sid=4e15276d9&_ss=r"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 5,
    "name": "Pink Rose Lemonade",
    "manufacturer": "The Tea Spot",
    "description": "Like a fancy floral confection, this delicately handcrafted tea will refresh and soothe your palate. Lemon, rose, mint, chamomile, and lavender create a swirling collage of flowers with a hint of lemon and wintergreen. Totally guilt-free, and naturally sweet.",
    "grams of tea": 3,
    "grams of water": 300,
    "brewwing temperature": 99,
    "steeping time": "5 to 6",
    "type of tea": "Herbal",
    "link": "https://www.theteaspot.com/products/pink-rose-lemonade-herbal-tea"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 6,
    "name": "Detox",
    "manufacturer": "The Tea Spot",
    "description": "Enjoy the effects of botanical ingredients like sage, lemon balm, lemongrass and lemon peel for a soothing natural cleanse. Your body is constantly being challenged by everyday toxins like alcohol, smoke, food additives, and stress. The citrus and sage make Detox prepare your body for healthful cleansing in a most delicious way. Every cup will leave you feeling naturally refreshed as you stimulate your body's immune system. The perfect replacement for fans of our former Restore blend.",
    "grams of tea": 3,
    "grams of water": 300,
    "brewwing temperature": 99,
    "steeping time": "5 to 6",
    "type of tea": "Herbal",
    "link": "https://www.theteaspot.com/products/organic-detox-tea-herbal"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 7,
    "name": "Turmeric Tonic",
    "manufacturer": "The Tea Spot",
    "description": "Nurturing yourself is downright delicious with our award-winning detox tea that provides three active root ingredients in support of a healthy diet and lifestyle. Show your body some love. Ginger, turmeric, sarsaparilla and nettle have been used traditionally for generations to support joint health. The less inflammation your body has to deal with, the more it can focus on rejuvenating and toning. Enjoy this spicy elixir hot, iced, straight up, or as a golden milk latte.",
    "grams of tea": 3,
    "grams of water": 300,
    "brewwing temperature": 99,
    "steeping time": "6+",
    "type of tea": "Herbal",
    "link": "https://www.theteaspot.com/products/organic-turmeric-ginger-chai"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 8,
    "name": "Organic Meditative Mind",
    "manufacturer": "The Tea Spot",
    "description": "Our beloved handcrafted blend of pure white tea, rosebuds & jasmine pearls creates an experience of aromatherapy that relaxes the mind and arouses the senses. Brews into a golden liquor with a very soothing fragrance. Perfect before, during, or after a stressful day.",
    "grams of tea": 2,
    "grams of water": 300,
    "brewwing temperature": 80,
    "steeping time": "2 to 3",
    "type of tea": "White",
    "link": "https://www.theteaspot.com/products/meditative-mind-loose-white-tea"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 9,
    "name": "Mango Tango",
    "manufacturer": "The Tea Spot",
    "description": "Our fresh take on the classic tradition of flavored black teas. Crisp Ceylon black tea with passion fruit & mango creates a light & fruity combination that's great any time of year. Brews into a deep, reddish liquor with a heady, bright aroma that delights hot or iced.",
    "grams of tea": 3,
    "grams of water": 300,
    "brewwing temperature": 99,
    "steeping time": "4 to 5",
    "type of tea": "Black",
    "link": "https://www.theteaspot.com/products/mango-tango-loose-black-tea"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 10,
    "name": "Strawberry Fields",
    "manufacturer": "The Tea Spot",
    "description": "Just like The Beatles' song, this whimsical herbal tea will soothe & delight the soul. The blend of fruits & flowers is perfect for the whole family, and makes a great iced tea. You can add sweetener to further accent the fruit flavors or drink it sans sugar for a more crisp cup.",
    "grams of tea": 3,
    "grams of water": 300,
    "brewwing temperature": 99,
    "steeping time": "6+",
    "type of tea": "Herbal",
    "link": "https://www.theteaspot.com/products/strawberry-fields-herbal-tea"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 11,
    "name": "Pomegranate",
    "manufacturer": "Storehouse Tea",
    "description": "The taste of sweet and tart pomegranates combined with the rare white tea are popular for their antioxidant content and low caffeine.",
    "grams of tea": 1.8,
    "grams of water": 300,
    "brewwing temperature": 85,
    "steeping time": "3 to 4",
    "type of tea": "White",
    "link": "https://storehousetea.com/collections/white-tea/products/pomegranate-white-tea?_pos=2&_sid=bc4918ad1&_ss=r"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 12,
    "name": "Citron Jasmine",
    "manufacturer": "Storehouse Tea",
    "description": "Organic jasmine green tea blended with green rooibos, infused with essential citrus oils, lemon grass and lemon myrtle. A smooth, soothing, citrus jasmine tea.",
    "grams of tea": 1.5,
    "grams of water": 300,
    "brewwing temperature": 80,
    "steeping time": "3 to 4",
    "type of tea": "Green",
    "link": "https://storehousetea.com/products/citron-jasmine-organic-green-rooibos-tea?_pos=2&_sid=86b50a106&_ss=r"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 13,
    "name": "English Breakfast",
    "manufacturer": "Storehouse Tea",
    "description": "Our traditional English Breakfast is a bold Assam tea from India, rich and full bodied, great for early mornings.",
    "grams of tea": 2.4,
    "grams of water": 300,
    "brewwing temperature": 90,
    "steeping time": "2 to 3",
    "type of tea": "Black",
    "link": "https://storehousetea.com/products/english-breakfast?_pos=1&_sid=62844b83d&_ss=r"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 14,
    "name": "Apricot Oolong",
    "manufacturer": "Storehouse Tea",
    "description": "Delicate green oolong infused with the freshness of sweet apricots, smooth, fruity and floral. Prized for its antioxidant content and metabolism-boosting properties.",
    "grams of tea": 3,
    "grams of water": 300,
    "brewwing temperature": 99,
    "steeping time": "2 to 3",
    "type of tea": "Oolong",
    "link": "https://storehousetea.com/products/apricot-oolong?_pos=1&_sid=bba461dea&_ss=r"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 15,
    "name": "Indian Masala Chai",
    "manufacturer": "Storehouse Tea",
    "description": "A robust and classic full flavored black tea blended with traditional whole Indian Masala spices. Indian Masala Chai should be brewed strong and served sweet with milk.",
    "grams of tea": 2.4,
    "grams of water": 300,
    "brewwing temperature": 90,
    "steeping time": "2 to 3",
    "type of tea": "Black",
    "link": "https://storehousetea.com/collections/loose-leaf-teas/products/indian-masala-chai?_pos=1&_sid=708387fb8&_ss=r"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 16,
    "name": "Zesty Ginger Lime",
    "manufacturer": "Storehouse Tea",
    "description": "Organic Green Rooibos combined with zesty citrus and ginger is refreshing and thirst quenching, excellent iced. Stimulating yet caffeine-free, contains antioxidants.",
    "grams of tea": 1.5,
    "grams of water": 300,
    "brewwing temperature": 80,
    "steeping time": "3 to 4",
    "type of tea": "Rooibos",
    "link": "https://storehousetea.com/collections/rooibos/products/zesty-ginger-lime-organic-fair-trade-rooibos-tea?_pos=1&_sid=b76761584&_ss=r"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 17,
    "name": "Apricot Blend",
    "manufacturer": "Storehouse Tea",
    "description": "A delicious blend of organic Fair Trade black tea, and Sencha green tea combined with sweet apricot flavor, creates a medium bodied smooth tea with a wonderful fruity finish. This tea is delicious both hot and iced.",
    "grams of tea": 2.4,
    "grams of water": 300,
    "brewwing temperature": 90,
    "steeping time": "2 to 3",
    "type of tea": "Black",
    "link": "https://storehousetea.com/products/apricot-blend-organic-black-and-green-tea?_pos=1&_sid=fc2945a42&_ss=r"
  },
  {
    "drink type": "Loose-leaf tea",
    "identifier": 18,
    "name": "Elderberry Blend",
    "manufacturer": "Storehouse Tea",
    "description": "This succulent blend of Caffeine Free herbs and fruits imparts a refreshing deep berry flavor, tart with a subtle sweetness. Contains powerful andti-oxidants which may help expel toxins, resolve sore throats, and shorten the flu cycle.",
    "grams of tea": 3,
    "grams of water": 300,
    "brewwing temperature": 99,
    "steeping time": "6+",
    "type of tea": "Herbal",
    "link": "https://storehousetea.com/products/elderberry-blend?_pos=1&_sid=910466537&_ss=r"
  }
];

const showTeas = () => {
  let output = ""
  teas.forEach(
    ({ name, description, link }) =>
      (output += `
              <div class="card">
                <button type="button" class="collapsible">${name}</button>
                <div class="content">
                  <p>${description}</p>
                  <p><a href="${link}">Buy</a></p>
                </div>
                <div class="container">
                </div>
              </div>
              `)
  )
  document.getElementById("container").innerHTML += output
}
showTeas();

// document.addEventListener("DOMContentLoaded", showTeas)



// Convert time to a format of hours, minutes, seconds, and milliseconds

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Declare variables to use in our functions below

let startTime;
let elapsedTime = 0;
let timerInterval;

// Create function to modify innerHTML

function print(txt) {
  document.getElementById("display").innerHTML = txt;
}

// Create "start", "pause" and "reset" functions

function start() {
    console.log("start clicked")
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
  showButton("PAUSE");
}

function pause() {
  clearInterval(timerInterval);
  showButton("PLAY");
}

function reset() {
  clearInterval(timerInterval);
  print("00:00:00");
  elapsedTime = 0;
  showButton("PLAY");
}

// Create function to display buttons

function showButton(buttonKey) {
  const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
  const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
  buttonToShow.style.display = "block";
  buttonToHide.style.display = "none";
}
// Create event listeners for the timer

let playButton = document.getElementById("playButton");
let pauseButton = document.getElementById("pauseButton");
let resetButton = document.getElementById("resetButton");

playButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
