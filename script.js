/*          Описание игры            */

//объект настроек игры
const gameParameters = {
  MAX_LEVEL: 10, //максимальный уровень героя
  MAX_STAT: 99, //минимальный уровень параметра героя
  MIN_STAT: 10 //минимальный уровень параметка для умения
};

//обхект классов игры
const gameClasses = {
  Mage: "Маг",
  Knight: "Рыцарь",
  Hero: "Класс"
};

//объявление героя оппонента
let enemyHero = null;

//объявления героя игрока
let playerHero = null;

//добавление героя игрока на экран
const sendToBattleButton = document.getElementById("sendToBattleButton");

//действие героя игрока
const doSkillButton = document.getElementById("doSkillButton");

//вывод героя оппонента на экран
const getEnemyButton = document.getElementById("getEnemyButton");

//начало битвы
const startBattleButton = document.getElementById("startBattleButton");


/*          Ход игры            */

//вывод героя игрока на экран
function displayPlayerHero(hero) {
  document.getElementById("playerHeroClass").innerHTML =
    gameClasses[hero.constructor.name];
  document.getElementById("playerHeroName").innerHTML = hero.name;
  document.getElementById("playerHeroLevel").innerHTML = hero.level;
  document.getElementById("playerHeroHp").innerHTML = hero.healthPoints;
  document.getElementById("playerHeroStrength").innerHTML = hero.stats.str;
  document.getElementById("playerHeroIntelligence").innerHTML = hero.stats.int;
  document.getElementById("playerHeroAgility").innerHTML = hero.stats.agi;

  hero.displayHero();
}

function displayEnemyHero(hero) {
  document.getElementById("enemyHeroClass").innerHTML =
    gameClasses[hero.constructor.name];
  document.getElementById("enemyHeroName").innerHTML = hero.name;
  document.getElementById("enemyHeroLevel").innerHTML = hero.level;
  document.getElementById("enemyHeroHp").innerHTML = hero.healthPoints;
  document.getElementById("enemyHeroStrength").innerHTML = hero.stats.str;
  document.getElementById("enemyHeroIntelligence").innerHTML = hero.stats.int;
  document.getElementById("enemyHeroAgility").innerHTML = hero.stats.agi;

  hero.displayHero();
}

//получение информации героя игрока
sendToBattleButton.onclick = () => {
  const heroName = document.getElementById("name").value;
  if (heroName !== "") {
    const heroClass = document.querySelector(
      'input[name="class"]:checked'
    ).value;
    const heroLevel = document.getElementById("level").value;
    const heroStats = {};

    //если введённое значение параметра больше максимального, устанавливаем максимальное
    heroStats.str = Number(document.getElementById("strength").value);
    if (heroStats.str > gameParameters.MAX_STAT) {
      heroStats.str = gameParameters.MAX_STAT;
    }
    heroStats.int = Number(document.getElementById("intelligence").value);
    if (heroStats.int > gameParameters.MAX_STAT) {
      heroStats.int = gameParameters.MAX_STAT;
    }
    heroStats.agi = Number(document.getElementById("agility").value);
    if (heroStats.agi > gameParameters.MAX_STAT) {
      heroStats.agi = gameParameters.MAX_STAT;
    }

    const additionalAbility = document.querySelector(
      'input[name="additionalAbility"]:checked'
    ).value;
    const additionalStat = document.getElementById("additionalStat").value;



    if (heroClass === "Mage") {
      playerHero = new Mage(
        heroName,
        heroLevel,
        100,
        heroStats,
        additionalAbility,
        additionalStat
      );
    } else if (heroClass === "Knight") {
      playerHero = new Knight(
        heroName,
        heroLevel,
        100,
        heroStats,
        additionalAbility,
        additionalStat
      );
    } else {
      console.error("Упс! Произошла какая-то ошибка!");
      return;
    }

    displayPlayerHero(playerHero);

    getEnemyButton.removeAttribute("disabled");
    doSkillButton.removeAttribute("disabled");
  } else {
    alert("Добавьте герою имя!");
  }

  
};


function arena(firstHero, secondHero) {
  console.log(
    `Да начнётся танцевальный баттл между ${firstHero.name} и ${secondHero.name}!`
  );

  let winner = null;



  function countStatsSum(hero) {
    let chancesStr = (hero.stats.str / gameParameters.MAX_STAT);
    let chancesInt = (hero.stats.int / gameParameters.MAX_STAT);
    let chancesAgi = (hero.stats.agi / gameParameters.MAX_STAT);
    let chancesHealthPoints = 0, bonusAgi = 0, bonusInt = 0

    if (hero.healthPoints >= 2500) {
      chancesHealthPoints = 15
    } else if (hero.healthPoints >= 1500) {
      chancesHealthPoints = 10
    } else if (hero.healthPoints >= 500) {
      chancesHealthPoints = 5
    }

    if (hero.stats.agi > 70) {
      bonusAgi = 3.5
    }
    if (hero.stats.agi < 40) {
      bonusAgi = -1.5
    }

    if (hero.stats.int < 30) {
      bonusAgi = -1.5
    }
    if (hero.stats.int > 60) {
      bonusAgi = 5.5
    }

    let chancesWin = ((chancesStr + chancesInt + chancesAgi) / 3) * 100

    if (hero.stats.str > 50) {
      hero.healthPoints += 500;
    }

    let result = chancesWin + chancesHealthPoints + bonusAgi + bonusInt

    if (hero.healthPoints == 0 || hero.stats.str == 0) {
      result = 0;
    }

    return result;
  }

  let fistHeroSum = countStatsSum(firstHero);
  let secondHeroSum = countStatsSum(secondHero);

  console.log("Шансы на победу первого героя: ", fistHeroSum);
  console.log("Шансы на победу второго героя: ", secondHeroSum);

  let randomNumber = Math.round(Math.random() * 100) // диапазон от 0 до 100

  if (fistHeroSum == 0){
    winner = secondHero;
  } 
  if (secondHeroSum == 0){
    winner = firstHero;
  }

  if (fistHeroSum > secondHeroSum) {
    if (randomNumber <= fistHeroSum) {
      winner = firstHero;
    } else {
      winner = secondHero;
    }
  } else {
    if (randomNumber <= secondHeroSum) {
      winner = secondHero;
    } else {
      winner = firstHero;
    }
  }



  if (winner) {
    console.log(`Ритмично чествуем победителя: ${winner.name}`);
    alert(`Ритмично чествуем победителя: ${winner.name}`);
  } else {
    console.log("В танцевальном баттле победила дружба!");
    alert("В танцевальном баттле победила дружба!");
  }
}

function addShakeAnimation1(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add('shake-animation-1');
    setTimeout(() => {
      element.classList.remove('shake-animation-1');
    }, 20500); // Время анимации в миллисекундах (0.5 секунды в данном случае)
  }
}
function addShakeAnimation2(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add('shake-animation-2');
    setTimeout(() => {
      element.classList.remove('shake-animation-2');
    }, 20500); // Время анимации в миллисекундах (0.5 секунды в данном случае)
  }
}

startBattleButton.onclick = () => {
  arena(playerHero, enemyHero);

  addShakeAnimation1("card-1"); // Замените 'playerHeroCard' на актуальный ID вашего элемента
  addShakeAnimation2("card-2"); // Замените 'playerHeroCard' на актуальный ID вашего элемента
};


getEnemyButton.onclick = () => {
  //получение героя оппонента с сервера
  fetch(`https://api-code.practicum-team.ru/heroes`)
    .then((response) => response.json())
    .then((data) => {
      let randomEnemy = data[Math.floor(Math.random() * data.length)]; //получение случайного героя оппонента
      console.log(randomEnemy); //вывод героя оппонента в консоль

      //создаём экземпляр класса героя оппонента
      enemyHero = new Hero(
        randomEnemy.title, //имя героя
        Math.floor(Math.random() * 10) + 1, //уровень героя
        randomEnemy.hp, //запас сил героя
        {
          str: randomEnemy.str,
          int: randomEnemy.int,
          agi: randomEnemy.agi
        }
      ); //параметры героя

      //заполняем карточку героя оппонента
      displayEnemyHero(enemyHero);

      if (playerHero) {
        startBattleButton.removeAttribute("disabled");
      }
    })
    .catch((error) => console.error("Ошибка:", error));
};




doSkillButton.onclick = () => {
  if (playerHero) {
    if (playerHero.constructor.name === "Mage") {
      playerHero.healHero(playerHero);
    } else if (playerHero.constructor.name === "Knight") {
      playerHero.gainAgility(playerHero);
    } else {
      console.log("Упс! Произошла какая-то ошибка!");
    }
  } else {
    alert("Сначала добавьте игрока!");
  }
  displayPlayerHero(playerHero);
};


