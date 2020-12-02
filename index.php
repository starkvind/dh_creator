<!DOCTYPE html>
<html lang="es" class="h-100">
  <head>
    <title>Generador aleatorio para Dungeon Hack</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Generador automático y configurable de personajes para el juego de rol Dungeon Hack.">
    <meta name="author" content="Maurick Starkvind bajo plantilla de Bootstrap">
    <!-- Icono y favicon -->
		<link rel="icon" href="https://i2.wp.com/naufragio.net/wp-content/uploads/2020/03/cropped-NaufragioIcono350.png?fit=32%2C32&#038;ssl=1" sizes="32x32" />
		<link rel="icon" href="https://i2.wp.com/naufragio.net/wp-content/uploads/2020/03/cropped-NaufragioIcono350.png?fit=192%2C192&#038;ssl=1" sizes="192x192" />
		<link rel="apple-touch-icon" href="https://i2.wp.com/naufragio.net/wp-content/uploads/2020/03/cropped-NaufragioIcono350.png?fit=180%2C180&#038;ssl=1" />
		<meta name="msapplication-TileImage" content="https://i2.wp.com/naufragio.net/wp-content/uploads/2020/03/cropped-NaufragioIcono350.png?fit=270%2C270&#038;ssl=1" />
    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/6e913309ac.js" crossorigin="anonymous"></script>
    <!-- -->
    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      .card-char h6 i {
        min-width: 28px;
        max-width: 28px;
        padding-left: 6px;
      }
      .char-seed i {
        max-width: 12px;
        max-height: 12px;
      }
      .char-section:hover, .pointer:hover {
        cursor: pointer;
      }
      .question:hover {
        cursor: help;
      }
      .dungeon-card {
	       font-family: monospace;
      }
      .dungeon-tile {
        padding: 0;
        margin: 0;
      }
      .modal-header, .modal-footer {
        background-color: rgba(0,0,0,.03);
      }
      #pageTitle {
        text-align: center;
        border-bottom: 1px solid #000;
        padding-bottom: 8px;
      }
      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>
    <!-- Custom styles for this template -->
    <link href="navbar.css" rel="stylesheet">
  </head>
  <body class="d-flex flex-column h-100">
    <!-- Begin page content -->
    <main role="main" class="flex-shrink-0">
      <div class="container mt-1 mb-2">
        <h1 class="mt-1" id="pageTitle"></h1>
        <div class="row" id="btnLanding">
          <div class="col text-center">
            <button class="btn btn-success mb-2 gen-dh-char gen-dh-quick" alt="PJ básico a Nivel 1"><i class="fas fa-user-plus"></i></button>
            <button class="btn btn-primary mb-2 gen-dh-char gen-dh-custom d-none" alt="PJ personalizado"><i class="fas fa-user-cog"></i></button>
            <button class="btn btn-success mb-2 gen-flw d-none" alt="Generar seguidor"><i class="fas fa-user-ninja"></i></button>
            <button class="btn btn-info mb-2 dh-dice-test d-none" alt="Generar matriz de características"><i class="fas fa-dice"></i></button>
            <button class="btn btn-warning mb-2 dh-gen-dung text-white d-none" alt="Generar mazmorra"><i class="fas fa-dungeon"></i></button>
            <button class="btn btn-secondary mb-2 dh-options" alt="Configuración"><i class="fas fa-cogs"></i></button>
            <button class="btn btn-danger mb-2 d-none" id="resetBtn" alt="Borrar todas las tarjetas"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        <div class="row" id="charLanding">
        </div>
      </div>
    </main>
    <footer class="footer mt-auto py-3">
      <div class="container">
        <p class="text-muted text-center font-italic">
          Generador de personajes (v.<span id="gen-id"></span>) por <a href="https://naufragio.net/maurick-starkvind/" target="_new" rel="nofollow noreferrer">Maurick Starkvind</a>.
          Dungeon Hack pertenece a la editorial <strong><a href="https://www.drivethrurpg.com/browse/pub/13021/Yipi-Ka-Yei" target="_new" rel="nofollow noreferrer">YipiKaYei</a></strong>.
        </p>
      </div>
    </footer>
    <!-- Modals -->
    <!-- Modal Config -->
    <div class="modal fade" id="configModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="configModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="configModalLabel">Configuración</h5>
          </div>
          <div class="modal-body">
            <h6 class="border-bottom pb-1 mb-3">Personaje</h6>
            <!-- Niveles -->
            <div class="input-group input-group-sm mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="label-min-level">Nvl mínimo</span>
              </div>
              <input type="text" class="form-control" id="value-min-level" aria-label="Nivel mínimo" aria-describedby="label-min-level">
              <div class="input-group-prepend">
                <span class="input-group-text" id="label-max-level">Nvl máximo</span>
              </div>
              <input type="text" class="form-control" id="value-max-level" aria-label="Nivel máximo" aria-describedby="label-max-level">
            </div>
            <!-- Orígenes -->
            <div class="input-group form-group-sm mb-3 d-none">
              <div class="input-group-prepend">
                <span class="input-group-text" id="label-origins">Orígenes</span>
              </div>
              <select class="selectpicker" id="value-origin" arial-label="Orígenes" aria-describedby="label-origins" data-header="Origen del contenido" data-size="10" data-live-search="true" data-actions-box="true" data-count-selected-text= "{0} orígenes" data-selected-text-format="count > 2" multiple>
              </select>
            </div>
            <!-- Clases & Razas -->
            <div class="input-group input-group-sm mb-3">
              <select class="selectpicker" id="available-classes" arial-label="Clases" aria-describedby="label-classes" data-header="Clases de personaje" data-size="10" data-live-search="true" data-actions-box="true" data-count-selected-text= "{0} clases" data-selected-text-format="count > 2" multiple>
              </select>
              <select class="selectpicker ml-3" id="available-races" arial-label="Especies" data-header="Especies de personaje" data-size="10" data-live-search="true" data-actions-box="true" data-count-selected-text= "{0} especies" data-selected-text-format="count > 2" multiple>
              </select>
            </div>
            <!-- Seguidores -->
            <h6 class="border-bottom pb-1 mb-3">Seguidores</h6>
            <div class="input-group input-group-sm mb-3">
              <select class="selectpicker" id="available-followers" arial-label="Seguidores" aria-describedby="label-followers" data-header="Profesiones de seguidores" data-size="10" data-live-search="true" data-actions-box="true" data-count-selected-text= "{0} profesiones" data-selected-text-format="count > 2" multiple>
              </select>
            </div>
            <!-- Otras opciones -->
            <h6 class="border-bottom pb-1">Opciones</h6>
            <div class="input-group input-group-sm mb-3">
              <div class="custom-control custom-checkbox pt-2">
                <input type="checkbox" class="custom-control-input pointer" id="value-export-btn">
                <label class="custom-control-label pointer mr-2" for="value-export-btn" alt="Exportar ficha a texto"><i class="far fa-file-alt"></i></label>
              </div>
              <div class="custom-control custom-checkbox pt-2">
                <input type="checkbox" class="custom-control-input pointer" id="value-races">
                <label class="custom-control-label pointer mr-2" for="value-races" alt="Usar especies"><i class="fas fa-dragon"></i></label>
              </div>
            </div>
            <h6 class="border-bottom pb-1">Botones</h6>
            <div class="input-group input-group-sm mb-3">
              <div class="custom-control custom-checkbox pt-2">
                <input type="checkbox" class="custom-control-input pointer" id="value-quick-char">
                <label class="custom-control-label pointer mr-2" for="value-quick-char" alt="Activar botón PJ básico a Nivel 1"><i class="fas fa-user-plus"></i></label>
              </div>
              <div class="custom-control custom-checkbox pt-2">
                <input type="checkbox" class="custom-control-input pointer" id="value-custom-char">
                <label class="custom-control-label pointer mr-2" for="value-custom-char" alt="Activar botón PJ personalizado"><i class="fas fa-user-cog"></i></label>
              </div>
              <div class="custom-control custom-checkbox pt-2">
                <input type="checkbox" class="custom-control-input pointer" id="value-flw">
                <label class="custom-control-label pointer mr-2" for="value-flw" alt="Activar botón Crear seguidor"><i class="fas fa-user-ninja"></i></label>
              </div>
              <div class="custom-control custom-checkbox pt-2">
                <input type="checkbox" class="custom-control-input pointer" id="value-matrix">
                <label class="custom-control-label pointer mr-2" for="value-matrix" alt="Activar botón Generar matrices"><i class="fas fa-dice"></i></label>
              </div>
              <div class="custom-control custom-checkbox pt-2">
                <input type="checkbox" class="custom-control-input pointer" id="value-dungeons">
                <label class="custom-control-label pointer" for="value-dungeons" alt="Activar botón Generar mazmorras"><i class="fas fa-dungeon"></i></label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-primary float-center" id="save-dh-config"><i class="fas fa-save"></i></button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Seed -->
    <!-- Modal -->
    <div class="modal fade" id="seedModal" tabindex="-1" aria-labelledby="seedModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="seedModalLabel"><span id="charSeedName"></span></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <textarea class="form-control" id="charSeedBody" rows="4"></textarea>
          </div>
        </div>
      </div>
    </div>
    <!-- -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>
    <!-- Components -->
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>
    <!-- -->
    <script src="dh-var.js" type="text/javascript"></script>
    <script src="dh-flw.js" type="text/javascript"></script>
    <script src="dh-cg.js"  type="text/javascript"></script>
    <!-- -->
    <script type="text/javascript">
      $(document).ready(function() {
        /* Versión del pograma */
        let dh_gen_version = "1.4";
        $("#gen-id").text(dh_gen_version);
        /* Ponemos el título adecuado. */
        let title = document.getElementsByTagName("title")[0].innerHTML;
        $("#pageTitle").text(title);
        let butns = $("#btnLanding").find("button");
        $(butns).each(function() {
          $(this).attr("title", $(this).attr("alt"));
        });
        $("label, button").each(function() {
          $(this).attr("title", $(this).attr("alt"));
        });
        /* Preparamos las opciones. */
        let origin_options = "";
        $(origins).each(function(index, value) {
          origin_options += "<option value='" + index + "'>" + value + "</option>";
          origin_config[index] = index;
        });
        if (origins.length > 0) {
          $("#value-origin").html(origin_options);
          $("#value-origin").selectpicker("refresh");
        };
        /* Preparamos la variable de clases iniciales. */
        let class_i = 0;
        /* Por cada entrada en las Clases, añadimos su key al array class_list. */
        for (let key_c in classes) {
          class_list[class_i] = key_c;
          if (classes[key_c].origin == 0) class_basic_list[class_i] = key_c;
          class_i++;
        };
        class_list.sort();
        /* Preparamos el desplegable de Clases. */
        let classes_options = "";
        $(class_list).each(function(index, value) {
          classes_options += "<option value='" + value + "' data-subtext='" + origins[classes[value].origin] + "'>" + classes[value].name + "</option>";
        });
        if (class_list.length > 0) {
          $("#available-classes").html(classes_options);
          sort_select_list("#available-classes");
          $("#available-classes").selectpicker("refresh");
        };
        /* Finalizamos desplegable de Clases. */
        /* Razas */
        $("#value-races").prop("checked", false);
        let race_i = 0;
        /* Por cada entrada en las Razas, añadimos su key al array race_list. */
        for (let key_r in races) {
          race_list[race_i] = key_r;
          race_i++;
        };
        race_list.sort();
        /* Preparamos el desplegable de Razas. */
        let races_options = "";
        $(race_list).each(function(index, value) {
          races_options += "<option value='" + value + "' data-subtext='" + origins[races[value].origin] + "'>" + races[value].name + "</option>";
        });
        if (race_list.length > 0) {
          $("#available-races").html(races_options);
          sort_select_list("#available-races");
          $("#available-races").selectpicker("refresh");
        };
        /* Finalizamos desplegable de Razas. */
        /* Preparamos la variable de profesiones de seguidores. */
        let flw_class_i = 0;
        /* Por cada entrada en las Clases, añadimos su key al array class_list. */
        for (let key_flw in flw_classes) {
          flw_class_list[flw_class_i] = key_flw;
          flw_class_i++;
        };
        flw_class_list.sort();
        /* Preparamos el desplegable de Seguidores. */
        let flw_options = "";
        $(flw_class_list).each(function(index, value) {
          flw_options += "<option value='" + value + "' data-subtext='" + origins[flw_classes[value].origin] + "'>" + flw_classes[value].name + "</option>";
        });
        if (flw_class_list.length > 0) {
          $("#available-followers").html(flw_options);
          sort_select_list("#available-followers");
          $("#available-followers").selectpicker("refresh");
        };
        /* Otras opciones */
        $("#value-export-btn").prop("checked", true);
        /* Botones */
        $("#value-quick-char").prop("checked", true);
        $("#value-custom-char").prop("checked", false);
        $("#value-matrix").prop("checked", false);
        $("#value-dungeons").prop("checked", false);
        $("#value-flw").prop("checked", false);
      });
      $(document).on("click", ".char-close", function() {
        let parent = $(this).parent().parent();
        parent.addClass("fade");
        setTimeout(function () {
          parent.remove();
          update_charcount();
        }, 100);
      });
      $(document).on("click", ".char-section", function() {
        let list = $(this).parent().find("ul");
        list.toggleClass("d-none");
      });
      $(document).on("click", ".dh-options", function() {
        $("#configModal").modal("show");
      });
      $("#configModal").on("show.bs.modal", function() {
        $("#value-min-level").val(level_min_config);
        $("#value-max-level").val(level_max_config);
        $("#value-origin").val(origin_config);
        $("#value-origin").selectpicker("refresh");
        /* Actualizamos la lista de razas */
        $("#available-races").val(race_list);
        check_checkbox($("#value-races"), "#available-races");
        /* Actualizamos la lista de clases */
        $("#available-classes").val(class_list);
        $("#available-classes").selectpicker("refresh");
        /* Actualizamos la lista de seguidores */
        $("#available-followers").val(flw_class_list);
        check_checkbox($("#value-flw"), "#available-followers");
      });
      function check_checkbox(selector, target) {
        if ($(selector).prop("checked")) {
          $(target).prop("disabled", false);
        } else {
          $(target).prop("disabled", true);
        };
        $(target).selectpicker("refresh");
      };
      $(document).on("click", "#value-races", function() {
        check_checkbox($(this), "#available-races");
      });
      $(document).on("click", "#value-flw", function() {
        check_checkbox($(this), "#available-followers");
      });
      $(document).on("click", "#save-dh-config", function() {
        /* Obtenemos variables. */
        let min_lvl = $("#value-min-level").val();
        let max_lvl = $("#value-max-level").val();
        let origin_val = $("#value-origin").val() + "";
        let origin_check = [];
        let use_race = $("#value-races").prop("checked");
        /* Variables botones adicionales */
        let use_quick_char = $("#value-quick-char").prop("checked");
        let use_custom_char = $("#value-custom-char").prop("checked");
        let use_matrix = $("#value-matrix").prop("checked");
        let use_dungeons = $("#value-dungeons").prop("checked");
        let use_flw = $("#value-flw").prop("checked");
        /* Hacemos comprobaciones. */
        if (min_lvl > 0 && min_lvl <= 36 && max_lvl > 0 && max_lvl <= 36) {
          level_min_config = min_lvl;
        };
        if (max_lvl > 0 && max_lvl <= 36) {
          level_max_config = max_lvl;
        };
        /* Configuración de los Orígenes. */
        origin_check = origin_val.split(",");
        if (origin_check[0].length > 0) {
          if (origin_check.constructor === Array) {
            origin_config = [];
            $(origin_check).each(function(index, value) {
              origin_config[index] = parseInt(value);
            });
          };
        };
        /* Configuración de las Clases. */
        let class_check = $("#available-classes").val();
        if (class_check.length > 0) class_list = class_check;
        /* Configuración de las Razas. */
        let race_check = $("#available-races").val();
        if (race_check.length > 0) race_list = race_check;
        if (use_race) {
          race_config = 1;
        } else {
          race_config = 0;
        };
        /* Configuración de los Seguidores. */
        let flw_check = $("#available-followers").val();
        if (flw_check.length > 0) flw_class_list = flw_check;
        /* Otras configuraciones */
        if (use_quick_char)  { $(".gen-dh-quick").removeClass("d-none"); } else { $(".gen-dh-quick").addClass("d-none"); }
        if (use_custom_char) { $(".gen-dh-custom").removeClass("d-none"); } else { $(".gen-dh-custom").addClass("d-none"); }
        if (use_flw)         { $(".gen-flw").removeClass("d-none"); } else { $(".gen-flw").addClass("d-none"); }
        if (use_matrix)      { $(".dh-dice-test").removeClass("d-none"); } else { $(".dh-dice-test").addClass("d-none"); }
        if (use_dungeons)    { $(".dh-gen-dung").removeClass("d-none"); } else { $(".dh-gen-dung").addClass("d-none"); }
        /* Aplicamos cambios en la página */
        $("#configModal").modal("hide");
      });
      /* Botón generar PJ */
      $(document).on("click", ".gen-dh-char", function() {
        let check = $(this).hasClass("gen-dh-custom");
        let c_list = class_basic_list;
        let opt = 0;
        let ori = [0];
        let lvl_mn = 1;
        let lvl_mx = 1;
        if (check) {
          c_list  = class_list;
          opt     = race_config;
          ori     = origin_config;
          lvl_mn  = level_min_config;
          lvl_mx  = level_max_config;
        };
        gen_char(opt, ori, lvl_mn, lvl_mx, c_list);
      });
      $(document).on("click", "#resetBtn", function() {
        $(".char-close").each(function() {
          $(this).click();
        });
        /*$(".card").each(function() { $(this).remove(); }); update_charcount();*/
      });
      $(document).on("click", ".dh-dice-test", function() {
        start_random_dice_test(10, 6, attribs.length);
      });
      $(document).on("click", ".dh-gen-dung", function() {
        let dung = generate_dungeon(6,6);
        $("#charLanding").prepend(dung);
        update_charcount();
      });
      function update_charcount() {
        let cards = $(".card").length;
        if (cards > 0) {
          $("#resetBtn").removeClass("d-none");
          $("#resetBtn").html("<i class='fas fa-trash'></i> (" + cards + ")");
        } else {
          $("#resetBtn").addClass("d-none");
        };
      };
      /* FPJ para copiar */
      $(document).on("click", ".char-sheet", function() {
        let sheet = $(this).parent().parent();
        /* Abrimos todos las secciones */
        $(sheet).find(".char-section").each(function() {
          if ($(this).next().hasClass("d-none")) $(this).next().removeClass("d-none");
        });
        let sheet_arr = [];
        let sheet_text = "";
        let count = 0;
        $(sheet.find("div")).each(function(i, c) {
          count = 0;
          count += getOccurrence(c.classList, "card-body");
          count += getOccurrence(c.classList, "row");
          if (count < 1) sheet_arr[sheet_arr.length] = c.innerText;
        });
        if (sheet_arr.length > 0) {
          $("#charSeedName").text("Hoja de personaje");
          $(sheet_arr).each(function(si, sc) {
            sheet_text += sc;
            if (si < (sheet_arr.length -1)) sheet_text += "\n\n";
          });
          $(sheet).find(".char-section").each(function() {
            $(this).next().addClass("d-none");
          });
          $("#charSeedBody").text(sheet_text);
          $("#seedModal").modal("show");
        };
      });
      $(document).on("click", ".char-seed", function() {
        let seed = $(this).attr("data-seed");
        show_char_seed(seed);
      });
      function show_char_seed(seed) {
        if (seed) {
          let seed_arr = seed.split(",");
          $("#charSeedName").text("Semilla de " + seed_arr[0]);
          $("#charSeedBody").text(seed);
          $("#seedModal").modal("show");
        };
      };
      /* Botón generar seguidor */
      $(document).on("click", ".gen-flw", function() {
        let c_list = flw_class_list;
        let opt = race_config;
        let ori = origin_config;
        let lvl_mn = level_min_config;
        let lvl_mx = level_max_config;
        gen_flw(opt, ori, lvl_mn, lvl_mx, c_list);
      });
      /* Generar seguidor */
      function gen_flw(race = 0, origin = [], lvl_min = 1, lvl_max = 1, classlist = []) {
        /* Vamos a ver si tenemos las razas activadas. */
        let use_race    = $("#value-races").prop("checked");
        /* Variables del seguidor */
        let flw_race    = "";
        if (use_race)   flw_race = getRandomInt(0, (race_list.length - 1));
        let flw_class   = generate_flw_class(origin, classlist);
        let flw_name    = flw_names[getRandomInt(0, (flw_names.length - 1))];
        let flw_align   = aligns[getRandomInt(0, (aligns.length -1))];
        /* ------------------------------------------------------------------ */
        let flw_level   = getRandomInt(lvl_min, lvl_max);
        if (flw_level > 30) flw_level = 30;
        /* ------------------------------------------------------------------ */
        let flw_title   = flw_classes[flw_class].name + " de nivel " + flw_level;
        if (use_race)   flw_title = races[race_list[flw_race]].name + " " + flw_title.toLowerCase();
        /* ------------------------------------------------------------------ */
        let flw_origin  = origins[flw_classes[flw_class].origin];
        let flw_outs    = flw_classes[flw_class].outs;
        let flw_cost    = generate_coin_cost(flw_classes[flw_class].cost * Math.max(1, Math.floor(flw_level / 5)));
        /* ------------------------------------------------------------------ */
        let flw_attr    = generate_attributes(6, flw_attribs.length);
        let flw_atr_mod = flw_classes[flw_class].attr;
        /* ------------------------------------------------------------------ */
        let flw_skills = flw_classes[flw_class].skills;
        let flw_set_skill = flw_skills[0];
        if (flw_skills.length > 2) flw_set_skill = flw_skills[getRandomInt(0, (flw_skills.length -1))];
        /* ------------------------------------------------------------------ */
        let flw_equip  = flw_classes[flw_class].equip;
        /* ------------------------------------------------------------------ */
        let final_card = "<div class='card m-2 card-char' style='width: 32rem;'>";
        final_card += "<div class='card-header'>";
        final_card += "<button type='button' class='close char-close float-right' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
        final_card += "<h5 class='card-title char-name'>" + flw_name + "</h5>";
        final_card += "<h6 class='card-subtitle text-muted'>" + flw_title + "</h6>";
        final_card += "</div>";
        final_card += "<div class='card-body'>";
        final_card += "<div class='row'>";
        /* Atributos */
        let attr_results = "";
        if (flw_attr.length > 0) {
          let temp_value = 0;
          /* Subida de Nivel de Atributos */
          let level_up_attr = flw_level - 1;
          let level_up_attr_arr = [];
          let level_up_attr_log = [];
          let level_up_attr_count = 0;
          if (level_up_attr > 0) {
            for (lva = 0; lva < level_up_attr; lva++) {
              level_up_attr_arr[lva] = getRandomInt(0, (flw_attr.length -1));
              /* Evitamos que se coja dos veces el mismo Atributo. */
              if (level_up_attr_arr[lva] == level_up_attr_arr[lva - 1]) {
                /* Mientras el Atributo actual sea el mismo que el anterior, lo tiramos de nuevo. */
                do {
                  level_up_attr_arr[lva] = getRandomInt(0, (flw_attr.length -1));
                } while (level_up_attr_arr[lva] == level_up_attr_arr[lva - 1]);
              };
              /* Registramos la subida de nivel. */
              level_up_attr_log[lva] = "Nivel " + (Math.floor(lva / 2) + 2) + ": " + flw_attribs[level_up_attr_arr[lva]];
            };
          };
          $(flw_attr).each(function(index, value) {
            level_up_attr_count = 0;
            temp_value = value;
            temp_value += flw_atr_mod[index];
            attr_results += "<strong>" + flw_attribs[index] + "</strong>: ";
            level_up_attr_count = getOccurrence(level_up_attr_arr, index);
            temp_value = generate_char_lvl_up(temp_value, level_up_attr_count);
            attr_results += "<span class='question' title='" + "Mod: " + flw_atr_mod[index] + ", Progreso: " + temp_value[1] +"'>" + temp_value[0] + "</span>+";
            if (index < (flw_attr.length -1)) attr_results += "<br />";
          });
          final_card += "<div class='col-7 attr-results'>" + attr_results + "</div>";
        };
        /* Otros recursos */
        let flw_align_text = "<strong>Alineamiento</strong>: " + flw_align;
        let flw_st_hp = generate_char_health(flw_classes[flw_class].hp, flw_level, 0);
        let flw_hp = "<strong>Salud</strong>: " + "<span class='question' title='" + flw_st_hp[1] + "'>" + flw_st_hp[0] + "</span> (d" + flw_classes[flw_class].hp + ")";
        let flw_moral_tries = flw_level - 1;
        let flw_moral = generate_flw_moral(flw_classes[flw_class].mo, flw_moral_tries);
        //if (char_level > 9) char_st_en += 1;
        let flw_mo = "<strong>Moral</strong>: " + flw_moral;
        final_card += "<div class='col-5 pt-results'>" + flw_align_text + "<br />" + flw_hp + "<br />" + flw_mo + "</div>";
        final_card += "</div>";
        final_card += "<div class='row mt-3'>";
        if (flw_skills.length > 0) {
          /* Habilidates y competencias */
          final_card += "<div class='col-12 border-top'>";
          final_card += "<h6 class='mt-3 font-weight-bold'><i class='fas fa-fire'></i> Habilidad</h6>" + "<p>" + flw_set_skill + "</p>";
          final_card += "</div>";
        };
        if (flw_equip.length > 0) {
          final_card += "<div class='col-12 border-top'>";
            final_card += "<h6 class='mt-3 font-weight-bold char-section'><i class='fas fa-hammer'></i> Equipo</h6>";
            final_card += "<ul class='d-none'>";
            $(flw_equip).each(function(fei, fev) {
              final_card += "<li>" + fev + "</li>";
            });
            final_card + "</ul>";
          final_card += "</div>";
        };
        if (flw_outs < 1) final_card += "<div class='col-12 border-top mt-2 pt-3'><p><em>No acepta realizar sus servicios fuera de zonas civilizadas.</em></p></div>";
        final_card += "</div>";
        final_card += "</div>";
        /* Pie de tarjeta */
        final_card += "<div class='card-footer'>";
          final_card += "<span class='float-left text-muted font-italic'><strong>Origen:</strong> " + flw_origin + "</span>";
          final_card += "<span class='float-right question' title='Coste por día'><i class='fas fa-coins'></i> " + flw_cost + " al día</span>";
        final_card += "</div>";
        /* Cerramos tarjeta */
        final_card += "</div>";
        /* Adjuntamos la tarjeta a la landing zone */
        $("#charLanding").prepend(final_card);
        update_charcount();
      };
      /* Generar PJ */
      function gen_char(race = 0, origin = [], lvl_min = 1, lvl_max = 1, classlist = []) {
        let char_seed     = [];
        /* Variables básico PJ */
        let char_class    = generate_class(origin, classlist);
        let char_name     = classes[char_class].names[getRandomInt(0, (classes[char_class].names.length -1))]
        let char_align    = aligns[getRandomInt(0, (aligns.length -1))];
        let char_fav_attr = classes[char_class].attr;
        let char_level    = getRandomInt(lvl_min, lvl_max);
        let char_title    = classes[char_class].name + " de nivel " + char_level;
        let char_adv      = classes[char_class].adv;
        let char_skills   = classes[char_class].skills;
        let char_av_tools = classes[char_class].tools;
        let char_av_equip = classes[char_class].equip;
        let char_origin   = origins[classes[char_class].origin];
        let char_is_race  = classes[char_class].is_race;
        /* Si la Clase es una clase racial, evitamos que elija clase. */
        if (char_is_race == 1) race = 0;
        /* Empezamos a generar Atributos */
        /* Definimos el atributo favorito de la clase. */
        if (classes[char_class].attr.length > 1) char_fav_attr = classes[char_class].attr[getRandomInt(0, (classes[char_class].attr.length -1))];
        let attr          = generate_attributes(6, attribs.length);
        /* Preparamos la raza del personaje. */
        let char_race     = generate_race(char_class, attr);
        if (race > 0) char_title = char_race.name + " " + char_title.toLowerCase();
        /* Preparamos el equipo, que usaremos más adelante. */
        let char_money = generate_money(char_level);
        let starting_gold = char_money;
        let char_tools = generate_tools(char_money, char_av_tools);
        if (char_tools.length > 0) char_money = char_tools[0];
        let char_equip = generate_equip(char_money, char_av_equip);
        if (char_equip.length > 0) char_money = char_equip[0];
        /* Registramos semilla */
        char_seed[char_seed.length] = char_name;
        char_seed[char_seed.length] = classes[char_class].name;
        if (race > 0 && char_is_race == 0) char_seed[(char_seed.length - 1)] = char_race.name +  " " + char_seed[(char_seed.length - 1)].toLowerCase();
        char_seed[char_seed.length] = char_align;
        char_seed[char_seed.length] = char_level;
        char_seed[char_seed.length] = attr;
        char_seed[char_seed.length] = char_equip[1][1];
        char_seed[char_seed.length] = char_tools[1][1];
        char_seed[char_seed.length] = char_money;
        /* Botones de semilla hoja */
        let seed_btn = $("#value-export-btn").prop("checked");
        /* Generamos la tarjeta */
        let final_card = "<div class='card m-2 card-char' style='width: 32rem;'>";
        final_card += "<div class='card-header'>";
        final_card += "<button type='button' class='close char-close float-right' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
        if (seed_btn) {
          /*final_card += "<button type='button' class='close char-seed float-right mr-3' aria-label='Seed' data-seed='" + char_seed + "'><span aria-hidden='true'><i class='fas fa-seedling'></i></span></button>";*/
          final_card += "<button type='button' class='close char-sheet float-right mr-2' aria-label='Sheet' title='Exportar PJ a texto plano'><span aria-hidden='true'><i class='far fa-file-alt'></i></span></button>";
        };
        final_card += "<h5 class='card-title char-name'>" + char_name + "</h5>";
        final_card += "<h6 class='card-subtitle text-muted'>" + char_title + "</h6>";
        final_card += "</div>";
        final_card += "<div class='card-body'>";
        final_card += "<div class='row'>";
        /* Atributos */
        let attr_results = "";
        if (attr.length > 0) {
          /* Hardcodeamos esto para abreviar, en el futuro lo cambiamos. */
          let check_buen_des = ($.inArray("Buen desarrollo", char_race.skills));
          let rndm_buen_des = getRandomInt(0, (attr.length -1));
          let temp_value = 0;
          let attr_icon = "";
          /* Subida de Nivel de Atributos */
          let level_up_attr = (char_level - 1) * 2;
          let level_up_attr_arr = [];
          let level_up_attr_log = [];
          let level_up_attr_count = 0;
          if (level_up_attr > 0) {
            for (lva = 0; lva < level_up_attr; lva++) {
              level_up_attr_arr[lva] = getRandomInt(0, (attr.length -1));
              /* Evitamos que se coja dos veces el mismo Atributo. */
              if (level_up_attr_arr[lva] == level_up_attr_arr[lva - 1]) {
                /* Mientras el Atributo actual sea el mismo que el anterior, lo tiramos de nuevo. */
                do {
                  level_up_attr_arr[lva] = getRandomInt(0, (attr.length -1));
                } while (level_up_attr_arr[lva] == level_up_attr_arr[lva - 1]);
              };
              /* Registramos la subida de nivel. */
              level_up_attr_log[lva] = "Nivel " + (Math.floor(lva / 2) + 2) + ": " + attribs[level_up_attr_arr[lva]];
            };
          };
          $(attr).each(function(index, value) {
            level_up_attr_count = 0;
            attr_icon = "";
            temp_value = value;
            attr_results += "<strong>" + attribs[index] + "</strong>: ";
            if (index == char_fav_attr) {
              temp_value--;
              attr_icon += " <i class='fas fa-star' alt='Caracter&iacute;stica favorita' title='Caracter&iacute;stica favorita'></i>";
            };
            if (race > 0 && index == rndm_buen_des && check_buen_des >= 0) {
              temp_value--;
              attr_icon += " <i class='fas fa-fist-raised' alt='Buen desarrollo' title='Buen desarrollo'></i></span>";
            };
            level_up_attr_count = getOccurrence(level_up_attr_arr, index);
            if (index == char_fav_attr && level_up_attr_count > 0) level_up_attr_count * 2;
            if (level_up_attr_count > 0) {
              temp_value = generate_char_lvl_up(temp_value, level_up_attr_count);
              attr_results += "<span class='question' title='" + temp_value[1] +"'>" + temp_value[0] + "</span>+" + attr_icon;
            } else {
              attr_results += temp_value + "+" + attr_icon;
            }
            if (index < (attr.length -1)) attr_results += "<br />";
          });
          final_card += "<div class='col-7 attr-results'>" + attr_results + "</div>";
        };
        let char_align_text = "<strong>Alineamiento</strong>: " + char_align;
        let char_vigor = 0;
        /* Esto es una cutrada, pero no se me ocurre otra alternativa mejor ahora sin tocar millones de código. */
        if (race > 0) char_vigor = ($.inArray("Vigoroso", char_race.skills));
        /* Esto es un poco cutreibol, pero es importante dejarlo así. Pensar cómo solucionarlo en el futuro. */
        if (race == 0 && (classes[char_class].name == "Mediano" || classes[char_class].name == "Gnomo")) char_vigor = 2;
        let char_st_hp = generate_char_health(classes[char_class].hp, char_level, char_vigor);
        let char_hp = "<strong>Salud</strong>: " + "<span class='question' title='" + char_st_hp[1] + "'>" + char_st_hp[0] + "</span> (d" + classes[char_class].hp + ")";
        let char_st_en = classes[char_class].en;
        if (char_level > 9) char_st_en += 1;
        let char_en = "<strong>Energía</strong>: " + char_st_en;
        final_card += "<div class='col-5 pt-results'>" + char_align_text + "<br />" + char_hp + "<br />" + char_en;
        if (race > 0) final_card += "<br />" + "<strong>Vejez</strong>: " + char_race.old;
        final_card += "</div>";
        final_card += "</div>";
        /* Habilidates y competencias */
        final_card += "<div class='row border-top mt-3'>";
        final_card += "<div class='col-12'>";
          final_card += "<h6 class='mt-3 font-weight-bold'><i class='fas fa-shield-alt'></i> Competencias</h6>" + "<p>" + classes[char_class].prof + "</p>";
        final_card += "</div>";
          if (char_skills.length > 0) {
            final_card += "<div class='col-12 border-top'>";
              final_card += "<h6 class='mt-3 font-weight-bold char-section'><i class='fas fa-fire'></i> Capacidades</h6>";
              final_card += "<ul class='d-none'>";
              $(char_skills).each(function(si, sv) {
                final_card += "<li>" + sv + "</li>";
              });
              final_card + "</ul>";
            final_card += "</div>";
          };
          if (char_race.skills.length > 0 && race > 0) {
            final_card += "<div class='col-12 border-top'>";
              final_card += "<h6 class='mt-3 font-weight-bold char-section'><i class='fas fa-dragon'></i> Capacidades de especie</h6>";
              final_card += "<ul class='d-none'>";
              $(char_race.skills).each(function(rsi, rsv) {
                final_card += "<li>" + rsv + "</li>";
              });
              final_card + "</ul>";
            final_card += "</div>";
          };
          if (char_adv.length > 0) {
            final_card += "<div class='col-12 border-top'>";
              final_card += "<h6 class='mt-3 font-weight-bold char-section'><i class='fas fa-dice-d20'></i> Ventajas</h6>";
              final_card += "<ul class='d-none'>";
              $(char_adv).each(function(ai, av) {
                final_card += "<li>" + av + "</li>";
              });
              final_card + "</ul>";
            final_card += "</div>";
          };
          let char_equip_ctrl = char_equip[1][2];
          if (char_equip_ctrl) {
            final_card += "<div class='col-12 border-top'>";
              final_card += "<h6 class='mt-3 font-weight-bold char-section'><i class='fas fa-hammer'></i> " + char_equip[1][1] + "</h6>";
              final_card += "<ul class='d-none'>";
              $(char_equip_ctrl).each(function(ei, ev) {
                final_card += "<li>" + ev + "</li>";
              });
              final_card + "</ul>";
            final_card += "</div>";
          };
          let char_tools_ctrl = char_tools[1][2];
          if (char_tools_ctrl) {
            final_card += "<div class='col-12 border-top'>";
              final_card += "<h6 class='mt-3 font-weight-bold char-section'><i class='fas fa-tools'></i> " + char_tools[1][1] + "</h6>";
              final_card += "<ul class='d-none'>";
              $(char_tools_ctrl).each(function(ti, tv) {
                final_card += "<li>" + tv + "</li>";
              });
              final_card + "</ul>";
            final_card += "</div>";
          };
        final_card += "</div>";
        final_card += "</div>";
        /* Pie de tarjeta */
        final_card += "<div class='card-footer'>";
          final_card += "<span class='float-left text-muted font-italic'><strong>Origen:</strong> " + char_origin + "</span>";
          final_card += "<span class='float-right question' title='Monedas de oro'><i class='fas fa-coins'></i> " + char_money + " / " + starting_gold + "</span>";
        final_card += "</div>";
        /* Cerramos tarjeta */
        final_card += "</div>";
        final_card += "</div>";
        /* Adjuntamos la tarjeta a la landing zone */
        $("#charLanding").prepend(final_card);
        /*$("#charLanding .card-char").first().addClass("in");*/
        update_charcount();
      };
      /* Tiradas varias. */
      function start_random_dice_test(times, sides, atr) {
        let return_html = "<div class='card m-2 card-char' style='width: 32rem;'>";
        return_html += "<div class='card-header'>";
        return_html += "<button type='button' class='close char-close float-right' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
        return_html += "<h5 class='card-title char-name'>Matriz de características" + "</h5>";
        return_html += "<h6 class='card-subtitle text-muted'>" + times + " tiradas con 3d" + sides + "</h6>";
        return_html += "</div>";
        return_html += "<div class='card-body p-0'>";
        return_html += "<table class='table table-striped p-0 m-0'>";
        let attr = "";
        for (idt = 0; idt < times; idt++) {
          attr = generate_attributes(sides, atr);
          return_html += "<tr><td><strong>Matriz #" + (idt + 1) + "</strong></td><td>" + attr + "</td></tr>";
        };
        return_html += "</table></div></div>";
        $("#charLanding").prepend(return_html);
        update_charcount();
      };
      /* Crear una mazmorra */
      function generate_dungeon(width = 5, height = 5) {
        let dung_html = "<div class='card m-2 card-char' style='width: 32rem;'>";
        dung_html += "<div class='card-header'>";
        dung_html += "<button type='button' class='close char-close float-right' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
        dung_html += "<h5 class='card-title char-name'>Mazmorra procedural" + "</h5>";
        dung_html += "<h6 class='card-subtitle text-muted'>" + width + " de ancho por " + height + " de alto</h6>";
        dung_html += "</div>";
        dung_html += "<div class='card-body p-2 dungeon-card'>";
        let borders = generate_dungeon_floor(width, "wall");
        let floor = [];
        for (idg = 0; idg < height; idg++) {
          floor[idg] = paint_dungeon_floor(generate_dungeon_floor(width)) + "<br />";

        };
        dung_html += paint_dungeon_floor(borders) + "<br />";
        $(floor).each(function(idx, idv) {
          dung_html += idv;
        });
        dung_html += paint_dungeon_floor(borders) + "<br />";
        dung_html += "</div></div>";
        return dung_html;
      };
      /* Pintar mazmorra*/
      function paint_dungeon_floor(arr) {
        let return_html = "";
        $(arr).each(function(i, v) {
            return_html += "<img src='dung/" + v + ".png' class='dungeon-tile' />";
        });
        return return_html;
      };
    </script>
  </body>
</html>
