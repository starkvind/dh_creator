/* -------------------------------------------------------------------------- */
/* FUNCIONES                                                                  */
/* -------------------------------------------------------------------------- */

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
};

function rand_attr(dice = 3, sum = 10) {
  let results = [];
  for (i=0; i < dice; i++) {
    results[i] = getRandomInt(1,6) + sum;
  };
  let arr_return = results.sort();
  return arr_return[1];
};

function sort_select_list(select_list) {
  let items = $(select_list + " option").get();
  items.sort(function(a,b){
    let keyA = $(a).text();
    let keyB = $(b).text();

    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  let select = $(select_list);
  $.each(items, function(i, option){
    select.append(option);
  });
};

function generate_attributes(sides = 6, times = 6, dice = 3) {
  let results = []
  for (int = 0; int < times; int++) {
    results[int] = rand_attr(dice);
  };
  return results;
};

function generate_char_health(hp = 4, lvl = 1, vig = 0) {
  let return_hp = hp;
  if (vig == 1) return_hp += 1;
  let return_hp_arr = [];
  return_hp_arr[0] = return_hp;
  let hp_value = 0;
  if (lvl > 1) {
    for (ihp = 0; ihp < (lvl - 1); ihp++) {
      hp_value = 0;
      if (ihp < 8) {
        hp_value = getRandomInt(1, hp);
        if (vig == 1) hp_value += 1;
        return_hp += hp_value;
      } else {
        hp_value = Math.floor(hp / 4);
        if (vig == 2) hp_value += 1;
        return_hp += hp_value;
      };
      return_hp_arr[ihp + 1] = hp_value;
    };
  };
  return [return_hp, return_hp_arr];
};

function generate_char_lvl_up(value, count) {
  let result_value = value;
  let upgrade_array = [];
  for (lvui = 0; lvui < count; lvui++) {
    result_value = upgrade_attr(result_value);
    upgrade_array[lvui] = result_value;
  };
  return [result_value, upgrade_array];
};

function upgrade_attr(value) {
  let dice = getRandomInt(1, 20);
  let final_attr = value;
  if (dice <= value) final_attr -= 1;
  if (final_attr < 4) final_attr = 4;
  return final_attr;
};

function generate_class(origin = [], classlist = [], tries = 50) {
  let class_return = "";
  let class_origin = "";
  let rounds = 0;
  do {
    class_return = classlist[getRandomInt(0, (classlist.length -1))];
    class_origin = $.inArray(parseInt(classes[class_return].origin), origin);
    if (class_origin < 0) class_return = "";
    if (class_return == "") { rounds++; } else { rounds = tries; }
  } while (rounds < tries);
  return class_return;
};

function generate_race(char_class = "none", attr = [], tries = 50) {
  let rounds = race_rnd = race_yes = 0;
  let race_obj = race_return = "";
  if (char_class.length > 0) {
    do {
      race_yes = 0;
      race_rnd = getRandomInt(0, (race_list.length -1));
      race_obj = races[race_list[race_rnd]];
        if (race_obj.req.length > 0) {
          $(race_obj.req).each(function(i, v) {
            if (attr[v[0]] <= v[1]) { race_yes += 1; }
          });
        };
      if (race_yes < race_obj.req.length) { rounds++; race_obj = ""; } else { race_return = race_obj; rounds = tries; }
    } while (rounds < tries);
  };
    /* Si no tenemos ningún paquete y al menos 1 mo, nos llevamos el equipo de aprendiz. */
    if (Object.keys(race_obj).length <= 0) { race_obj = races["human_normal"]; }
  return race_obj;
};

function generate_flw_class(origin = [], classlist = [], tries = 50) {
  let class_return = "";
  let class_origin = "";
  let rounds = 0;
  do {
    class_return = classlist[getRandomInt(0, (classlist.length -1))];
    class_origin = $.inArray(parseInt(flw_classes[class_return].origin), origin);
    if (class_origin < 0) class_return = "";
    if (class_return == "") { rounds++; } else { rounds = tries; }
  } while (rounds < tries);
  return class_return;
};

/* MORAL DESC: Para ello, tirará 2d6. Si el resultado de la tirada es superior a su puntuación de Moral, huirán o se rendirán. */
function generate_flw_moral(value, tries = 0) {
  let moral_test = 0;
  let moral_result = value;
  let rounds = 0;
  do {
    moral_test = getRandomInt(2, 12);
    if (moral_test > moral_result) moral_result++;
    if (moral_result > 10) moral_result = 10;
    rounds++;
  } while (rounds < tries);
  return moral_result;
};

function generate_money(level = 1, sides = 12, mult = 10) {
  let starting_money = 0;
  for (i=0; i < level; i++) {
    starting_money += getRandomInt(2, (sides * 2)) * mult;
  };
  return starting_money;
};

function generate_coin_cost(gold) {
  let return_str = "";
  let gp = Math.floor(gold / 100);
  if (gp > 0) { gold -= gp * 100; return_str += gp + " mo "; }
  let sp = Math.floor(gold / 10);
  if (sp > 0) { gold -= sp * 10; return_str += sp + " mp "; }
  let cp = Math.floor(gold);
  if (cp > 0) { gold -= cp * 1; return_str += cp + " mc "; }
  return return_str;
};

function generate_tools(gold = 0, tools = [], tries = 50) {
  let rounds = tool_rnd = tool_cost = 0;
  let tool_return = [];
  if (gold > 0 && tools.length > 0) {
    do {
      tool_rnd = getRandomInt(0, (tools.length -1));
      tool_cost = tool_packs[tools[tool_rnd]][0];
      if (tool_cost <= gold) {
        tool_return = tool_packs[tools[tool_rnd]];
        gold -= tool_cost;
      }
      if (tool_return.length <= 0) { rounds++; tool_rnd = tool_cost = 0; } else { rounds = tries; }
    } while (rounds < tries);
  };
  return [gold, tool_return, tools[tool_rnd]];
};

function generate_equip(gold = 0, equip = [], tries = 50) {
  let rounds = equip_rnd = equip_cost = 0;
  let equip_return = [];
  if (gold > 0 && equip.length > 0) {
    do {
      equip_rnd = getRandomInt(0, (equip.length -1));
      equip_cost = equip_packs[equip[equip_rnd]][0];
      if (equip_cost <= gold) {
        equip_return = equip_packs[equip[equip_rnd]];
        gold -= equip_cost;
      }
      if (equip_return.length <= 0) { rounds++; equip_rnd = equip_cost = 0; } else { rounds = tries; }
    } while (rounds < tries);
    /* Si no tenemos ningún paquete y al menos 1 mo, nos llevamos el equipo de aprendiz. */
    if (equip_return.length <= 0 && gold > 0) { equip_rnd = 11; equip_return = equip_packs[equip_rnd]; gold -= 1; }
  };
  return [gold, equip_return, equip[equip_rnd]];
};

function generate_dungeon_floor(w = 5, mode = "normal") {
  let f_arr = [];
  f_arr[0] = "wall";
  for (gdf = 0; gdf < w; gdf++) {
    switch(mode) {
      case "wall":
        f_arr[(gdf + 1)] = "wall";
      break;
      default:
        f_arr[(gdf + 1)] = generate_dungeon_tile();
      break;
    };
  };
  f_arr[(w + 1)] = "wall";
  return f_arr;
};

function generate_dungeon_tile(tries = 50) {
  let count = 0;
  let room_obj = Object.keys(rooms);
  let rand100 = getRandomInt(0, 99);
  let tile_id = return_id = -1;
  do {
    tile_id = getRandomInt(0, (room_obj.length - 1));
    if (rand100 <= rooms[room_obj[tile_id]][0]) {
      return_id = tile_id;
      count = tries;
    } else {
      tile_id = -1;
      count++;
    };
  } while (count < tries);
  if (return_id < 0) return_id = 0;
  return rooms[room_obj[return_id]][1];
};
