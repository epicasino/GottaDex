const nationalDexEntries = require("./json/nationalDexEntries.json");
const fs = require("fs");

const createPokedex = async () => {
  const pokeDex = [];
  for (i = 0; i < nationalDexEntries.pokemon_entries.length; i++) {
    const pokemonSpecies = await fetch(
      nationalDexEntries.pokemon_entries[i].pokemon_species.url
    ).then((res) => res.json());
    const pokemonInfo = await fetch(
      pokemonSpecies.varieties[0].pokemon.url
    ).then((res) => res.json());

    let pokemon = {
      pokemonName: pokemonSpecies.name,
      pokedexNum: pokemonSpecies.id,
      sprite: pokemonInfo.sprites.front_default,
      shinySprite: pokemonInfo.sprites.front_shiny,
      femaleSprite: pokemonInfo.sprites.front_female || "N/A",
      perfectIV: false,
      hiddenAbility: "",
      nature: "",
      genderDifference: pokemonSpecies.has_gender_differences,
      pokemonLocation: {
        swordShield: false,
        swordShieldCrown: false,
        swordShieldIsle: false,
        diamondPearl: false,
        arceus: false,
        scarletViolet: false,
        scarletVioletKita: false,
        scarletVioletBlue: false,
      },
      evSpread: {
        hp: 0,
        attack: 0,
        defense: 0,
        spAtk: 0,
        spDef: 0,
        speed: 0,
      },
      forms: [],
    };

    for (
      abilityIndex = 0;
      abilityIndex < pokemonInfo.abilities.length;
      abilityIndex++
    ) {
      if (pokemonInfo.abilities[abilityIndex].is_hidden) {
        pokemon.hiddenAbility =
          pokemonInfo.abilities[abilityIndex].ability.name;
      }
    }

    for (
      pokedexI = 0;
      pokedexI < pokemonSpecies.pokedex_numbers.length;
      pokedexI++
    ) {
      if (
        pokemonSpecies.pokedex_numbers[pokedexI].pokedex.name ===
        "extended-sinnoh"
      ) {
        pokemon.pokemonLocation.diamondPearl = true;
      }
      if (pokemonSpecies.pokedex_numbers[pokedexI].pokedex.name === "galar") {
        pokemon.pokemonLocation.swordShield = true;
      }
      if (
        pokemonSpecies.pokedex_numbers[pokedexI].pokedex.name ===
        "isle-of-armor"
      ) {
        pokemon.pokemonLocation.swordShieldIsle = true;
      }
      if (
        pokemonSpecies.pokedex_numbers[pokedexI].pokedex.name === "crown-tundra"
      ) {
        pokemon.pokemonLocation.swordShieldCrown = true;
      }
      if (pokemonSpecies.pokedex_numbers[pokedexI].pokedex.name === "hisui") {
        pokemon.pokemonLocation.arceus = true;
      }
      if (pokemonSpecies.pokedex_numbers[pokedexI].pokedex.name === "paldea") {
        pokemon.pokemonLocation.scarletViolet = true;
      }
      if (
        pokemonSpecies.pokedex_numbers[pokedexI].pokedex.name === "kitakami"
      ) {
        pokemon.pokemonLocation.scarletVioletKita = true;
      }
      if (
        pokemonSpecies.pokedex_numbers[pokedexI].pokedex.name === "blueberry"
      ) {
        pokemon.pokemonLocation.scarletVioletBlue = true;
      }
    }

    if (pokemonSpecies.varieties.length > 1) {
      // SPECIAL CASE FOR MINIOR
      if (pokemon.pokemonName === "minior") {
        for (
          miniorI = 7;
          miniorI < pokemonSpecies.varieties.length;
          miniorI++
        ) {
          const formInfo = await fetch(
            pokemonSpecies.varieties[miniorI].pokemon.url
          ).then((res) => res.json());
          let form = {
            formName: formInfo.name,
            sprite: formInfo.sprites.front_default,
            perfectIV: false,
          };

          pokemon.forms.push(form);
        }
      } else {
        const regex =
          /gmax|mega|rock-star|belle|pop-star|pdh|libre|cosplay|original-cap|hoenn-cap|sinnoh-cap|unova-cap|kalos-cap|alola-cap|partner-cap|starter|world-cap|primal|deoxys-attack|deoxys-defense|deoxys-speed|origin|shaymin-sky|darmanitan-zen|darmanitan-galar-zen|therian|kyurem-black|kyurem-white|keldeo-resolute|meloetta-pirouette|battle-bond|greninja-ash|floette-eternal|aegislash-blade|10-power-construct|50-power-construct|zygarde-complete|zygarde-10|hoopa-unbound|wishiwashi-school|busted|totem-disguised|totem-busted|necrozma-dusk|necrozma-dawn|necrozma-ultra|gulping|gorging|eiscue-noice|morpeko-hangry|zacian-crowned|zamazenta-crowned|eternamax|calyrex-ice|calyrex-shadow|palafin-hero|gimmighoul-roaming|ogerpon-wellspring-mask|ogerpon-hearthflame-mask|ogerpon-cornerstone-mask|terastal|stellar|koraidon-limited-build|koraidon-sprinting-build|koraidon-swimming-build|koraidon-gliding-build|miraidon-low-power-mode|miraidon-drive-mode|miraidon-aquatic-mode|miraidon-glide-mode|totem|type-null/;

        for (
          varietiesI = 1;
          varietiesI < pokemonSpecies.varieties.length;
          varietiesI++
        ) {
          if (!regex.test(pokemonSpecies.varieties[varietiesI].pokemon.name)) {
            console.log(pokemonSpecies.varieties[varietiesI].pokemon.name);
            // SPECIAL CASE FOR SQUAWKABILLY: GREEN & BLUE PLUMAGE DIFF HIDDEN ABILITIES -> NOW FOR MANY MORE POKEMON W/ REGION FORMS.
            if (
              /squawkabilly|rattata|raticate|raichu|sandshrew|sandslash|vulpix|ninetales|diglett|dugtrio|meowth|persian|geodude|graveler|golem|grimer|muk|exeggutor|marowak|ponyta|rapidash|slowpoke|slowbro|farfetchd|weezing|mr-mime|articuno|zapdos|moltres|slowking|corsola|zigzagoon|linoone|darumaka|darmanitan|yamask|stunfisk|glowlithe|arcanine|voltorb|electrode|typhlosion|qwilfish|sneasel|samurott|lilligant|basculin|zorua|zoroark|braviary|sliggoo|goodra|avalugg|decidueye|wooper|tauros|zarude/.test(
                pokemon.pokemonName
              )
            ) {
              const formInfo = await fetch(
                pokemonSpecies.varieties[varietiesI].pokemon.url
              ).then((res) => res.json());
              let form = {
                formName: formInfo.name,
                sprite: formInfo.sprites.front_default,
                shinySprite: formInfo.sprites.front_shiny,
                hiddenAbility: "",
                perfectIV: false,
              };

              for (
                formAbilityI = 0;
                formAbilityI < formInfo.abilities.length;
                formAbilityI++
              ) {
                if (formInfo.abilities[formAbilityI].is_hidden) {
                  form.hiddenAbility =
                    formInfo.abilities[formAbilityI].ability.name;
                }
              }
              pokemon.forms.push(form);
            } else {
              const formInfo = await fetch(
                pokemonSpecies.varieties[varietiesI].pokemon.url
              ).then((res) => res.json());

              let form = {
                formName: formInfo.name,
                sprite: formInfo.sprites.front_default,
                shinySprite: formInfo.sprites.front_shiny,
                perfectIV: false,
              };

              pokemon.forms.push(form);
            }
          }
        }
      }
    }
    // SPECIAL CASE FOR UNOWN, BURMY, SHELLOS, GASTRODON, DEERLING, ETC
    // IVE FOUND FOR SINISTEA, POLTEAGEIST, ALCREMIE, POLTCHAGEIST, SINISTCHA THAT ALL FORMS INCLUDED IN THEM DO NOT HAVE UNIQUE SPRITES. POKEDEX.JSON IS MODIFIED TO FIX THAT, BUT FIX CODE ACCORDING TO THIS INFO.
    if (
      /unown|burmy|shellos|gastrodon|deerling|sawsbuck|vivillon|flabebe|floette|florges|sinistea|polteageist|alcremie|poltchageist|sinistcha/.test(
        pokemon.pokemonName
      )
    ) {
      if (
        /sinistea|polteageist|alcremie|poltchageist|sinistcha/.test(
          pokemon.pokemonName
        )
      ) {
        const specificPokeInfo = await fetch(
          pokemonSpecies.varieties[0].pokemon.url
        ).then((res) => res.json());
        for (
          specificI = 1;
          specificI < specificPokeInfo.forms.length;
          specificI++
        ) {
          const formInfo = await fetch(
            specificPokeInfo.forms[specificI].url
          ).then((res) => res.json());

          let form = {
            formName: formInfo.name,
            sprite: pokemon.sprite,
            shinySprite: pokemon.shinySprite,
            perfectIV: false,
          };
          pokemon.forms.push(form);
        }
      } else {
        const specificPokeInfo = await fetch(
          pokemonSpecies.varieties[0].pokemon.url
        ).then((res) => res.json());
        for (
          specificI = 1;
          specificI < specificPokeInfo.forms.length;
          specificI++
        ) {
          const formInfo = await fetch(
            specificPokeInfo.forms[specificI].url
          ).then((res) => res.json());

          let form = {
            formName: formInfo.name,
            sprite: formInfo.sprites.front_default,
            shinySprite: formInfo.sprites.front_shiny,
            perfectIV: false,
          };
          pokemon.forms.push(form);
        }
      }
    }
    console.log(pokemon.pokemonName);
    pokeDex.push(pokemon);
  }
  return pokeDex;
};

const getPokedexInformation = async () => {
  const pokedex = await createPokedex();
  const stringifiedPokedex = JSON.stringify(pokedex);

  fs.writeFile("./utils/json/pokedex.json", stringifiedPokedex, (err, res) =>
    err ? console.log(err) : console.log("Done!")
  );
};

getPokedexInformation();

// console.log(nationalDexEntries.pokemon_entries);
