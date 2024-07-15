const pokemonJSON = require("./json/pokedex.json");
const fs = require("fs");

const pokemonNoHiddenRegex =
  /aegislash|arceus|archen|archeops|azelf|baltoy|blacephalon|brute-bonnet|buzzwole|calyrex|carnivine|cascoon|castform|celebi|celesteela|charjabug|cherrim|cherubi|chi-yu|chien-pao|chimecho|chingling|clauncher|clawitzer|claydol|cobalion|cofagrigus|cosmoem|cosmog|cramorant|cresselia|cryogonal|darkrai|deino|deoxys|dhelmise|diancie|doublade|eelektrik|eelektross|eiscue|eternatus|ferroseed|finizen|flutter-mane|flygon|furfrou|gastly|genesect|gengar|gholdengo|gimmighoul|glastrier|golisopod|gouging-fire|great-tusk|groudon|grubbin|guzzlord|haunter|honedge|hoopa|hydreigon|iron-boulder|iron-bundle|iron-crown|iron-hands|iron-jugulis|iron-leaves|iron-moth|iron-thorns|iron-treads|iron-valiant|jirachi|kakuna|kartana|keldeo|komala|koraidon|kubfu|kyogre|kyurem|latias|latios|lunala|lunatone|magearna|manaphy|marshadow|melmetal|meloetta|meltan|mesprit|metapod|mew|mimikyu|minior|miraidon|misdreavus|mismagius|morpeko|naganadel|necrozma|nihilego|ogerpon|oricorio|palafin|pecharunt|pheromosa|phione|poipole|pupitar|raging-bolt|rayquaza|regidrago|regieleki|regigigas|reshiram|roaring-moon|rotom|runerigus|sandy-shocks|scream-tail|shaymin|shedinja|silcoon|silvally|slaking|slakoth|slither-wing|solgaleo|solrock|spectrier|stakataka|stonjourner|terapagos|terrakion|ting-lu|toedscool|toedscruel|turtonator|tynamo|unown|urshifu|uxie|vibrava|victini|vigoroth|vikavolt|virizion|volcanion|walking-wake|wimpod|wishiwashi|wo-chien|xerneas|xurkitree|yamask|yveltal|zacian|zamazenta|zarude|zekrom|zeraora|zoroark|zorua|zweilous|zygarde/;

function updatePokedex() {
  let updatedPokedex = [];

  for (pokeI = 0; pokeI < pokemonJSON.length; pokeI++) {
    let pokemon = pokemonJSON[pokeI];

    if (pokemon.pokemonName === "zarude") {
      // console.log("Zarude");
      pokemon.forms[0].sprite = pokemon.sprite;
      pokemon.forms[0].shinySprite = pokemon.shinySprite;
      updatedPokedex.push(pokemon);
    } else {
      // checks if pokemon has any of these abilities && gets rid of their hidden ability property and hidden ability caught properties
      if (pokemonNoHiddenRegex.test(pokemon.pokemonName)) {
        pokemon.hiddenAbility = "";
        delete pokemon.hiddenAbilityCaught;
        // console.log(pokemon.pokemonName);
        if (pokemon.genderDifference) {
          delete pokemon.femaleHiddenAbilityCaught;
        }
      }

      // pokeapi doesnt have accurate information, female shiny sprite is null despite having a very big gender difference.
      if (pokemon.pokedexNum === 916) {
        // console.log(pokemon.pokemonName);
        pokemon.femaleShinySprite = pokemon.shinySprite;
      }

      // for the pokemon that didn't have any pokemon locations but appeared in crown tundra
      if (
        (pokemon.pokedexNum >= 785 && pokemon.pokedexNum <= 801) ||
        (pokemon.pokedexNum >= 803 && pokemon.pokedexNum <= 806)
      ) {
        // console.log(pokemon.pokemonName);
        pokemon.pokemonLocation.swordShieldCrown = true;
      }

      if (
        pokemon.pokedexNum === 802 ||
        (pokemon.pokedexNum >= 807 && pokemon.pokedexNum <= 809)
      ) {
        // console.log(pokemon.pokemonName);
        pokemon.pokemonLocation.swordShield = true;
      }

      if (pokemon.pokedexNum >= 13 && pokemon.pokedexNum <= 22) {
        // console.log(pokemon.pokemonName);
        pokemon.pokemonLocation.diamondPearl = true;
      }

      updatedPokedex.push(pokemon);
    }
  }

  const stringifiedPokedex = JSON.stringify(updatedPokedex);

  fs.writeFile("./utils/json/pokedex.json", stringifiedPokedex, (err, res) =>
    err ? console.log(err) : console.log("Done!")
  );
}

updatePokedex();
