/* ==========================================================================
   LinguaQuest - логика приложения
   Экраны: вход / регистрация, маршрут курса, урок, результат,
   награды, магазин, профиль, настройки.
   Жизней нет: ошибка ничего не отнимает, задание просто возвращается
   в конец урока, чтобы его закрепить.
   ========================================================================== */

const App = (() => {
  const $app = document.getElementById("app");
  const esc = Exercises.esc;

  // Плоский список всех уроков курса по порядку (для блокировки и навигации)
  const FLAT = [];
  COURSE.units.forEach((unit, ui) => unit.lessons.forEach((lesson, li) => FLAT.push({ unit, lesson, ui, li, gi: FLAT.length })));
  const TOTAL = FLAT.length;

  let page = "learn";   // активная вкладка
  let lesson = null;    // состояние текущего урока

  const d = () => Store.data();
  const coinIcon = (size = 20) => SVG.icon("coin").replace("<svg", `<svg style="width:${size}px;height:${size}px"`);

  /* ======================================================================
     Тема, звук, озвучка
     ====================================================================== */
  function applyTheme(theme) {
    const mode = theme === "system" ? (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark") : theme;
    document.documentElement.dataset.theme = mode;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = mode === "light" ? "#f3f5fb" : "#0c0f1f";
  }
  matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
    const t = d() ? d().settings.theme : Store.device().theme;
    if (t === "system") applyTheme("system");
  });

  function applySettings() {
    loadCustomWords();
    const s = d().settings;
    applyTheme(s.theme);
    Sound.setEnabled(s.sound);
    Speech.setEnabled(s.speech);
    Speech.setVoice(s.voice);
    Speech.setRate(s.rate);
  }
  // Голоса в Chrome загружаются асинхронно: применяем выбранный, когда список появится
  Speech.onVoices(() => {
    if (!d()) return;
    Speech.setVoice(d().settings.voice);
    // Если открыты настройки, перерисовываем их с актуальным списком голосов
    if (page === "settings" && !lesson && document.getElementById("voiceSelect")) renderPage();
  });

  // say - озвучка по нажатию кнопки; auto - автоматическая (уважает настройку)
  // Номер версии (совпадает с версией кэша в sw.js): виден на экране входа и в настройках
  const APP_VERSION = "11";
  const say = (text, slow) => (d() && d().settings.speech ? Speech.speak(text, { slow }) : Promise.resolve());
  const auto = (text) => { if (d() && d().settings.speech && d().settings.autoSpeak) Speech.speak(text); };

  /* ======================================================================
     Прогресс по урокам
     ====================================================================== */
  const isDone = (id) => !!d().completed[id];
  const currentIndex = () => {
    const i = FLAT.findIndex((x) => !isDone(x.lesson.id));
    return i === -1 ? TOTAL : i;
  };
  const unitDone = (ui) => COURSE.units[ui].lessons.filter((l) => isDone(l.id)).length;
  const lessonsDone = () => FLAT.filter((x) => isDone(x.lesson.id)).length;
  const unitsDone = () => COURSE.units.filter((u, ui) => unitDone(ui) === u.lessons.length).length;

  /* ======================================================================
     Модальные окна
     ====================================================================== */
  const $modal = document.getElementById("modal");
  const $modalCard = document.getElementById("modalCard");
  let modalOnClose = null;

  function openModal(html, bind, onClose) {
    $modalCard.innerHTML = html;
    $modal.hidden = false;
    modalOnClose = onClose || null;
    bind && bind($modalCard);
    const first = $modalCard.querySelector("button");
    first && first.focus({ preventScroll: true });
  }
  function closeModal() {
    if ($modal.hidden) return;
    $modal.hidden = true;
    $modalCard.innerHTML = "";
    const cb = modalOnClose;
    modalOnClose = null;
    cb && cb();
  }
  $modal.addEventListener("click", (e) => { if (e.target.hasAttribute("data-close")) closeModal(); });

  function confirmModal({ pic = "", title, text, ok = "Да", cancel = "Отмена", okClass = "btn--rose" }) {
    // Результат: true - кнопка OK, false - кнопка отмены, null - окно просто закрыли (Esc, клик мимо)
    return new Promise((resolve) => {
      let result = null;
      openModal(
        `${pic}<h2>${title}</h2><p class="modal__text">${text}</p>
         <button class="btn ${okClass}" data-ok>${ok}</button>
         <button class="btn btn--ghost" data-cancel>${cancel}</button>`,
        (card) => {
          card.querySelector("[data-ok]").onclick = () => { result = true; closeModal(); };
          card.querySelector("[data-cancel]").onclick = () => { result = false; closeModal(); };
        },
        () => resolve(result)
      );
    });
  }

  /* ======================================================================
     Экран входа и регистрации
     Режимы: "login" - вход, "register" - регистрация,
     "code" - вход по коду синхронизации (перенос профиля с другого устройства)
     ====================================================================== */
  function renderAuth(mode = null, prefill = "") {
    cards = null;
    applyTheme(Store.device().theme || "dark");
    const users = Store.listUsers();
    // При первом открытии на новом устройстве сразу показываем регистрацию,
    // но если человек сам выбрал вкладку "Вход", не перекидываем его
    if (!mode) mode = users.length ? "login" : "register";
    const isLogin = mode === "login";
    const isCode = mode === "code";

    const formHTML = isCode ? `
          <form class="auth__form" id="codeForm" novalidate>
            <p class="field__hint auth__code-hint">Профили хранятся отдельно на каждом устройстве. Чтобы перенести свой профиль сюда, откройте на другом устройстве Настройки, раздел «Синхронизация», и создайте код.</p>
            <div class="field">
              <label for="fCode">Код синхронизации</label>
              <input class="input auth__code" id="fCode" name="code" placeholder="XXXX-XXXX-XXXX-XXXX" maxlength="19" autocomplete="off" autocapitalize="characters" spellcheck="false" required>
            </div>
            <div class="field">
              <label for="fName">Имя профиля на этом устройстве</label>
              <input class="input" id="fName" name="name" autocomplete="username" maxlength="20" value="${esc(prefill)}" placeholder="Например, alex" required>
            </div>
            <div class="field">
              <label for="fPass">Пароль для этого устройства</label>
              <input class="input" id="fPass" name="pass" type="password" autocomplete="new-password" placeholder="Не короче 4 символов" required>
            </div>
            <p class="field__error" id="authError" role="alert"></p>
            <button class="btn btn--block" type="submit" id="authSubmit">Перенести профиль</button>
            <button class="btn btn--ghost btn--block" type="button" data-mode="login">Назад ко входу</button>
          </form>` : `
          <form class="auth__form" id="authForm" novalidate>
            <div class="field">
              <label for="fName">Имя пользователя</label>
              <input class="input" id="fName" name="name" autocomplete="username" maxlength="20" value="${esc(prefill)}" placeholder="Например, alex" required>
            </div>
            <div class="field">
              <label for="fPass">Пароль</label>
              <input class="input" id="fPass" name="pass" type="password" autocomplete="${isLogin ? "current-password" : "new-password"}" placeholder="${isLogin ? "Ваш пароль" : "Не короче 6 символов"}" required>
            </div>
            ${isLogin ? "" : `
            <div class="field">
              <label for="fPass2">Повторите пароль</label>
              <input class="input" id="fPass2" name="pass2" type="password" autocomplete="new-password" placeholder="Ещё раз пароль" required>
            </div>`}
            <p class="field__error" id="authError" role="alert"></p>
            <button class="btn btn--block" type="submit" id="authSubmit">${isLogin ? "Войти" : "Создать профиль"}</button>
            <p class="field__hint">${isLogin ? "Входите с тем же именем и паролем на любом устройстве: прогресс подтянется сам." : "Имя уникальное: если его уже занял кто-то другой, выберите другое. Нужен интернет."}</p>
            <button class="link-btn" type="button" data-mode="code">Вход по коду синхронизации (старый способ)</button>
          </form>`;

    $app.innerHTML = `
      <section class="auth screen-enter">
        <div class="auth__hero">
          <div class="brand">${SVG.logo()}<span>LinguaQuest</span></div>
          <h1 class="auth__title">Английский с нуля, <em>в своём темпе</em></h1>
          <p class="auth__sub">Короткие уроки, озвучка слов и маршрут из ${COURSE.units.length} глав. Без жизней и штрафов: ошибайтесь и учитесь.</p>
          <div class="auth__showcase">
            <div class="auth__mascot">${SVG.mascot({ mood: "wave" })}</div>
            <div class="auth__perks">
              <span class="tag">${SVG.icon("book")} ${TOTAL} уроков от алфавита до уровня C2</span>
              <span class="tag">${SVG.icon("words")} 13 типов заданий и справочник</span>
              <span class="tag">${SVG.icon("trophy")} ${ACHIEVEMENTS.length} наград за успехи</span>
            </div>
          </div>
        </div>

        <div class="auth__panel">
          ${isCode ? `<h2 class="auth__code-title">Вход по коду синхронизации</h2>` : `
          <div class="tabs" data-active="${isLogin ? 0 : 1}" role="tablist">
            <span class="tabs__pill"></span>
            <button class="tabs__btn ${isLogin ? "is-active" : ""}" data-mode="login" role="tab" aria-selected="${isLogin}">Вход</button>
            <button class="tabs__btn ${!isLogin ? "is-active" : ""}" data-mode="register" role="tab" aria-selected="${!isLogin}">Регистрация</button>
          </div>`}
          ${formHTML}

          ${users.length && !isCode ? `
          <div class="auth__profiles">
            <div class="auth__profiles-title">Профили на этом устройстве</div>
            ${users.slice(0, 5).map((u) => `
              <button class="profile-pick" type="button" data-user="${esc(u.username)}">
                <span class="avatar" style="background:${esc(u.color)}">${esc(u.username[0].toUpperCase())}</span>
                <span>${esc(u.username)}<small>${Number(u.xp) || 0} XP, дней подряд: ${Number(u.streak) || 0}</small></span>
              </button>`).join("")}
          </div>` : ""}
          <p class="app-version">Версия ${APP_VERSION}</p>
        </div>
      </section>`;

    $app.querySelectorAll("[data-mode]").forEach((b) =>
      b.addEventListener("click", () => {
        const nameInput = $app.querySelector("#fName");
        renderAuth(b.dataset.mode, nameInput ? nameInput.value : "");
      })
    );
    $app.querySelectorAll(".profile-pick").forEach((b) =>
      b.addEventListener("click", () => {
        renderAuth("login", b.dataset.user);
        $app.querySelector("#fPass").focus();
      })
    );

    const err = $app.querySelector("#authError");
    const btn = $app.querySelector("#authSubmit");

    if (isCode) {
      const form = $app.querySelector("#codeForm");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        Sound.unlock();
        err.textContent = "";
        const code = Sync.clean(form.code.value);
        if (!Sync.isValid(code)) { err.textContent = "Код состоит из 16 букв и цифр, например ABCD-EFGH-JKLM-NPQR"; return; }
        btn.disabled = true;
        btn.textContent = "Ищем профиль...";
        try {
          const remote = await Sync.download(code);
          if (!remote) throw new Error("По этому коду ничего не найдено. Проверьте код");
          // Создаём профиль на этом устройстве и кладём в него данные из облака
          await Store.register(form.name.value || remote.username || "", form.pass.value);
          const local = d();
          const merged = keepLocal(Sync.merge(local, remote.data), local);
          merged.sync = { code, lastSync: Date.now() };
          Store.setData(merged);
          lastSyncAt = Date.now();
          afterLogin(false);
          Toast.show({ title: "Профиль перенесён", text: "Прогресс теперь общий с другим устройством", icon: SVG.mascot({ mood: "love" }) });
        } catch (ex) {
          err.textContent = navigator.onLine ? ex.message : "Нужен интернет, чтобы найти профиль по коду";
          btn.disabled = false;
          btn.textContent = "Перенести профиль";
        }
      });
      setTimeout(() => { const c = $app.querySelector("#fCode"); c && c.focus({ preventScroll: true }); }, 50);
      return;
    }

    const form = $app.querySelector("#authForm");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      Sound.unlock();
      const name = form.name.value;
      const pass = form.pass.value;
      err.textContent = "";
      if (!isLogin && pass !== form.pass2.value) {
        err.textContent = "Пароли не совпадают";
        return;
      }
      btn.disabled = true;
      btn.textContent = "Секунду...";
      try {
        if (isLogin) await doLogin(name, pass);
        else await doRegister(name, pass);
      } catch (ex) {
        err.textContent = ex.message;
        btn.disabled = false;
        btn.textContent = isLogin ? "Войти" : "Создать профиль";
      }
    });

    setTimeout(() => {
      const target = prefill ? $app.querySelector("#fPass") : $app.querySelector("#fName");
      target && target.focus({ preventScroll: true });
    }, 50);
  }

  /* ---------- Аккаунт: регистрация и вход по имени и паролю ---------- */
  const cleanName = (n) => String(n || "").trim().replace(/\s+/g, " ");
  const snapshot = (x) => ({ gems: Number(x.gems) || 0, freezes: Number(x.freezes) || 0, xp: Number(x.xp) || 0 });
  const cloudLinked = () => { const s = Store.user() && Store.cloudSession(); return !!(s && s.refresh); };

  // Регистрация: имя проверяется на сервере, занятое имя взять нельзя
  async function doRegister(rawName, pass) {
    const name = Store.checkNew(cleanName(rawName), pass, 6);
    if (!navigator.onLine) throw new Error("Для регистрации нужен интернет: так мы проверяем, что имя свободно");
    if (!(await Cloud.available(name))) throw new Error("Это имя уже занято, выберите другое");
    const s = await Cloud.signUp(name, pass);
    await Cloud.createProfile(s, name, {});
    await Store.register(name, pass);
    Store.setCloudSession(Object.assign(s, { base: snapshot(d()) }));
    afterLogin(true);
  }

  // Вход: сначала профиль на этом устройстве, иначе аккаунт из облака
  async function doLogin(rawName, pass) {
    const name = cleanName(rawName);
    if (Store.hasLocal(name)) {
      try {
        await Store.login(name, pass);
      } catch (ex) {
        // Пароль могли сменить на другом устройстве: проверяем в облаке
        if (!navigator.onLine) throw ex;
        let s;
        try { s = await Cloud.signIn(name, pass); } catch (e2) { throw new Error("Неверное имя или пароль"); }
        await Store.loginVerified(name, pass);
        Store.setCloudSession(Object.assign({}, Store.cloudSession() || {}, s));
        afterLogin(false);
        return;
      }
      afterLogin(false);
      linkCloud(name, pass);
      return;
    }
    if (!navigator.onLine) throw new Error("Нет интернета. Чтобы войти в аккаунт на этом устройстве, подключитесь к сети");
    let s;
    try {
      s = await Cloud.signIn(name, pass);
    } catch (e) {
      // Аккаунта с таким именем нет: скорее всего, профиль на другом устройстве ещё не подключён к облаку
      if (e.code === "invalid_credentials" && (await Cloud.available(name).catch(() => false))) {
        throw new Error("Аккаунта с таким именем пока нет. Если вы занимались на другом устройстве, откройте там Настройки, раздел «Аккаунт», и нажмите «Подключить». Или зарегистрируйтесь");
      }
      throw e;
    }
    const remote = await Cloud.load(s);
    await Store.register((remote && remote.username) || name, pass);
    if (remote && remote.data && typeof remote.data === "object" && Object.keys(remote.data).length) {
      const data = Store.migrateData(JSON.parse(JSON.stringify(remote.data)));
      data.sync = null; // код синхронизации старого способа у каждого устройства свой
      Store.setData(data);
    }
    Store.setCloudSession(Object.assign(s, { base: snapshot(d()) }));
    afterLogin(false);
  }

  // Создать облачный аккаунт для уже существующего профиля и отправить в него прогресс
  async function createCloudFor(name, pass) {
    const s = await Cloud.signUp(name, pass);
    await Cloud.createProfile(s, Store.user().username, d());
    Store.setCloudSession(Object.assign(s, { base: snapshot(d()), lastSync: Date.now() }));
    Toast.show({ title: "Аккаунт подключён", text: "Теперь можно входить с любого устройства по имени и паролю", icon: SVG.mascot({ mood: "love" }) });
  }

  // После входа по паролю тихо подключаем облачный аккаунт (или создаём его для старого профиля)
  async function linkCloud(name, pass) {
    if (!navigator.onLine) return;
    const had = Store.cloudSession();
    try {
      const s = await Cloud.signIn(name, pass);
      Store.setCloudSession(Object.assign({}, had || {}, s, { expired: false }));
      syncNow();
      return;
    } catch (e) {
      if (e.code !== "invalid_credentials") return;
    }
    try {
      if (!(await Cloud.available(name))) {
        if (!had || !had.conflict) {
          Store.setCloudSession(Object.assign({}, had || {}, { conflict: true }));
          Toast.show({ title: "Имя занято в облаке", text: `Имя «${esc(name)}» уже занято другим аккаунтом, поэтому прогресс хранится только на этом устройстве`, icon: SVG.mascot({ mood: "worried" }), duration: 6000 });
        }
        return;
      }
      if (pass.length < 6) { askNewPassword(); return; }
      await createCloudFor(name, pass);
    } catch (e) { /* попробуем при следующем входе */ }
  }

  // Подключение аккаунта из настроек или после входа со старым коротким паролем
  function askNewPassword(needCurrent = false) {
    const name = Store.user().username;
    openModal(`
      <div class="modal__pic">${SVG.mascot({ mood: "hello", hat: d().hat })}</div>
      <h2>Вход с любого устройства</h2>
      <p class="modal__text">Подключите аккаунт, и в профиль «${esc(name)}» можно будет войти на телефоне или другом компьютере по имени и паролю. Пароль должен быть не короче 6 символов.</p>
      <form class="auth__form modal__form" id="cloudForm" novalidate>
        ${needCurrent ? `<div class="field"><label for="cPass">Текущий пароль</label><input class="input" id="cPass" type="password" autocomplete="current-password"></div>` : ""}
        <div class="field"><label for="cNew">${needCurrent ? "Пароль для входа (можно оставить текущий, если он от 6 символов)" : "Новый пароль, от 6 символов"}</label><input class="input" id="cNew" type="password" autocomplete="new-password" placeholder="Не короче 6 символов"></div>
        <p class="field__error" id="cErr" role="alert"></p>
        <button class="btn btn--block" type="submit" id="cBtn">Подключить</button>
        <button class="btn btn--ghost btn--block" type="button" data-close-btn>Позже</button>
      </form>`, (card) => {
      const f = card.querySelector("#cloudForm");
      const err = card.querySelector("#cErr");
      const btn = card.querySelector("#cBtn");
      card.querySelector("[data-close-btn]").onclick = closeModal;
      f.addEventListener("submit", async (e) => {
        e.preventDefault();
        err.textContent = "";
        const cur = needCurrent ? card.querySelector("#cPass").value : null;
        const pass = card.querySelector("#cNew").value || cur || "";
        if (needCurrent && !(await Store.checkPassword(cur))) { err.textContent = "Неверный текущий пароль"; return; }
        if (pass.length < 6) { err.textContent = "Пароль должен быть не короче 6 символов"; return; }
        if (!navigator.onLine) { err.textContent = "Нужен интернет"; return; }
        btn.disabled = true;
        btn.textContent = "Подключаем...";
        try {
          // Может быть, аккаунт с этим паролем уже есть (создан на другом устройстве)
          let linked = false;
          try {
            const s = await Cloud.signIn(name, pass);
            Store.setCloudSession(Object.assign({}, Store.cloudSession() || {}, s, { conflict: false, expired: false }));
            linked = true;
          } catch (x) { if (x.code !== "invalid_credentials") throw x; }
          if (!linked) {
            if (!(await Cloud.available(name))) throw new Error("Это имя уже занято другим аккаунтом. Если это ваш аккаунт, введите пароль от него");
            await createCloudFor(name, pass);
          }
          if (cur !== pass) await Store.setPassword(pass);
          closeModal();
          syncNow({ silent: false });
          if (page === "settings") renderPage();
        } catch (x) {
          err.textContent = x.message;
          btn.disabled = false;
          btn.textContent = "Подключить";
        }
      });
      setTimeout(() => { const i = card.querySelector("input"); i && i.focus(); }, 60);
    });
  }

  function afterLogin(isNew) {
    applySettings();
    Store.setDevice({ theme: d().settings.theme });
    const s = Store.checkStreak();
    page = "learn";
    renderShell();
    const name = Store.user().username;
    if (isNew) Toast.show({ title: `Добро пожаловать, ${esc(name)}!`, text: "Вот 50 монет на старт", icon: SVG.mascot({ mood: "love" }) });
    else Toast.show({ title: `С возвращением, ${esc(name)}!`, text: d().streak ? `Дней подряд: ${d().streak}` : "Начнём новую серию сегодня", icon: SVG.mascot({ mood: "hello" }) });
    streakToasts(s);
    syncNow();
    maybeWeekReport();
    resumeReminders();
  }

  function streakToasts(s) {
    if (s.usedFreezes) Toast.show({ title: "Заморозка спасла серию", text: `Использовано: ${s.usedFreezes}`, icon: SVG.icon("freeze") });
    if (s.lost) Toast.show({ title: "Серия прервалась", text: `Было дней подряд: ${s.lost}. Начните новую сегодня`, icon: SVG.mascot({ mood: "cry" }) });
  }

  /* ======================================================================
     Оболочка: меню, шапка, правая колонка
     ====================================================================== */
  const NAV = [
    { id: "learn", label: "Маршрут", icon: "navLearn" },
    { id: "words", label: "Словарь", icon: "navWords" },
    { id: "reference", label: "Справочник", icon: "navRef" },
    { id: "games", label: "Игры", icon: "navGames" },
    { id: "achievements", label: "Награды", icon: "navAwards" },
    { id: "shop", label: "Магазин", icon: "navShop" },
    { id: "profile", label: "Профиль", icon: "navProfile" },
    { id: "settings", label: "Настройки", icon: "navSettings" }
  ];

  // На телефоне внизу 4 главных пункта, остальные в меню "Ещё"
  const BOTTOM_MAIN = ["learn", "words", "reference", "games"];
  function bottomNavItems() {
    const more = !BOTTOM_MAIN.includes(page);
    return NAV.filter((n) => BOTTOM_MAIN.includes(n.id)).map((n) => `<button class="nav-item ${page === n.id ? "is-active" : ""}" data-nav="${n.id}" aria-label="${n.label}">${SVG.icon(n.icon)}<span>${n.label}</span></button>`).join("") +
      `<button class="nav-item ${more ? "is-active" : ""}" data-more aria-label="Ещё">${SVG.icon("navMore")}<span>Ещё</span></button>`;
  }
  function openMoreMenu() {
    openModal(`<h2>Ещё</h2><div class="more-menu">${NAV.filter((n) => !BOTTOM_MAIN.includes(n.id)).map((n) => `<button class="more-menu__item" data-go-more="${n.id}">${SVG.icon(n.icon)}<span>${n.label}</span></button>`).join("")}</div>`, (card) => {
      card.querySelectorAll("[data-go-more]").forEach((b) => b.addEventListener("click", () => { closeModal(); go(b.dataset.goMore); }));
    });
  }

  function navItems() {
    return NAV.map((n) => `<button class="nav-item ${page === n.id ? "is-active" : ""}" data-nav="${n.id}" aria-label="${n.label}" ${page === n.id ? 'aria-current="page"' : ""}>${SVG.icon(n.icon)}<span>${n.label}</span></button>`).join("");
  }

  function statsChips() {
    const data = d();
    const activeToday = data.lastActiveDay === Store.dayKey();
    return `
      <button class="stat-chip stat-chip--streak ${activeToday ? "" : "is-dim"}" data-open="streak" title="Дней подряд">${SVG.icon("streak")}<span>${data.streak}</span></button>
      <button class="stat-chip stat-chip--gems" data-open="gems" title="Монеты">${SVG.icon("coin")}<span>${data.gems}</span></button>
      <button class="stat-chip stat-chip--xp" data-open="xp" title="Опыт за сегодня">${SVG.icon("bolt")}<span>${Store.todayXP()}</span></button>`;
  }

  // Слово дня: одно и то же весь день, выбирается из слов курса
  function wordOfDay() {
    const words = FLAT.flatMap((x) => x.lesson.words).filter((w) => w.en.length > 2);
    const key = Store.dayKey();
    let h = 0;
    for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return words[h % words.length];
  }

  function railHTML() {
    const data = d();
    const today = Store.todayXP();
    const goal = data.dailyGoal;
    const user = Store.user();
    const wod = wordOfDay();
    const tips = [
      "Нажмите на черепаху в заданиях на слух, чтобы прослушать фразу медленно.",
      "Цифры 1-4 на клавиатуре выбирают вариант ответа, Enter проверяет.",
      "Повторяйте слова каждый день: карточка «Повторение» покажет, что пора освежить.",
      "Знаете тему? Сдайте тест главы и откройте её сразу.",
      "Понемногу каждый день полезнее, чем долго раз в неделю.",
      "Ошибка не страшна: задание вернётся в конце урока, и вы его закрепите."
    ];
    return `
      <div class="rail__stats" data-stats>${statsChips()}</div>
      <div class="card widget reveal">
        <div class="widget__head"><span class="widget__title">Цель на сегодня</span><span class="tag">${today} / ${goal} XP</span></div>
        <div class="progress"><div class="progress__fill" style="width:${Math.min(100, (today / goal) * 100)}%"></div></div>
        <p class="widget__body">${today >= goal ? "Цель выполнена. Отличная работа!" : `Осталось ${goal - today} XP, это примерно один урок.`}</p>
      </div>
      <div class="card widget reveal">
        <div class="widget__head"><span class="widget__title">Слово дня</span>
          ${Speech.isEnabled() ? `<button class="speak-btn" data-say-word="${esc(wod.en)}" aria-label="Прослушать">${SVG.icon("speaker")}</button>` : ""}
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          ${wod.pic ? `<div style="width:56px;flex:none">${SVG.pic(wod.pic)}</div>` : ""}
          <div><div style="font-family:var(--font-display);font-size:22px;font-weight:700">${esc(wod.en)}</div><div class="widget__body">${esc(wod.ru)}</div></div>
        </div>
      </div>
      <div class="card widget reveal">
        <div style="display:flex;gap:12px;align-items:center">
          <div style="width:60px;flex:none">${SVG.mascot({ mood: "think", hat: data.hat })}</div>
          <p class="widget__body">${tips[(Math.random() * tips.length) | 0]}</p>
        </div>
      </div>
      <div class="card widget reveal">
        <div style="display:flex;gap:12px;align-items:center">
          <span class="avatar" style="background:${user.color}">${esc(user.username[0].toUpperCase())}</span>
          <div style="flex:1;min-width:0"><div style="font-weight:800">${esc(user.username)}</div><div class="widget__body">${data.xp} XP всего</div></div>
          <button class="btn btn--ghost btn--sm" data-act="switch">Сменить</button>
        </div>
      </div>`;
  }

  function renderShell() {
    cards = null; // экран карточек закрыт
    $app.innerHTML = `
      <div class="shell">
        <aside class="sidebar">
          <div class="brand">${SVG.logo()}<span>LinguaQuest</span></div>
          ${navItems()}
        </aside>
        <div class="center">
          <header class="topbar">
            <div class="brand">${SVG.logo()}<span>LinguaQuest</span></div>
            <div style="display:flex;gap:6px" data-stats>${statsChips()}</div>
          </header>
          <div class="main" id="main"></div>
        </div>
        <aside class="rail" id="rail">${railHTML()}</aside>
      </div>
      <nav class="bottom-nav" aria-label="Навигация">${bottomNavItems()}</nav>`;

    $app.querySelectorAll("[data-nav]").forEach((b) => b.addEventListener("click", () => go(b.dataset.nav)));
    $app.querySelectorAll("[data-more]").forEach((b) => b.addEventListener("click", openMoreMenu));
    bindShellCommon($app);
    renderPage();
  }

  // Общие обработчики: чипы статистики, смена профиля, слово дня
  function bindShellCommon(root) {
    root.querySelectorAll("[data-open]").forEach((b) => b.addEventListener("click", () => openStatModal(b.dataset.open)));
    root.querySelectorAll('[data-act="switch"]').forEach((b) => b.addEventListener("click", switchProfile));
    bindSayWords(root);
  }

  // Кнопки прослушивания: привязываем один раз, даже если функцию вызвали повторно
  function bindSayWords(root) {
    root.querySelectorAll("[data-say-word]").forEach((b) => {
      if (b.dataset.sayBound) return;
      b.dataset.sayBound = "1";
      b.addEventListener("click", () => say(b.dataset.sayWord));
    });
  }

  function refreshStats() {
    if (!d()) return;
    document.querySelectorAll("[data-stats]").forEach((el) => {
      el.innerHTML = statsChips();
      bindShellCommon(el);
    });
  }

  function bumpStat(kind) {
    document.querySelectorAll(`.stat-chip--${kind}`).forEach((el) => {
      el.classList.remove("bump");
      void el.offsetWidth;
      el.classList.add("bump");
    });
  }

  function go(p) {
    if (page === p) return;
    page = p;
    Sound.play("tap");
    document.querySelectorAll("[data-nav]").forEach((b) => {
      const on = b.dataset.nav === p;
      b.classList.toggle("is-active", on);
      on ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current");
    });
    document.querySelectorAll("[data-more]").forEach((b) => b.classList.toggle("is-active", !BOTTOM_MAIN.includes(p)));
    renderPage();
    window.scrollTo({ top: 0 });
  }

  function renderPage() {
    const main = document.getElementById("main");
    if (!main) return;
    const pages = { learn: learnPage, words: wordsPage, reference: referencePage, games: gamesPage, achievements: achievementsPage, shop: shopPage, profile: profilePage, settings: settingsPage };
    main.innerHTML = `<div class="screen-enter">${pages[page]()}</div>`;
    const binders = { learn: bindLearn, words: bindWords, reference: bindReference, games: bindGames, profile: bindProfile, shop: bindShop, settings: bindSettings };
    binders[page] && binders[page](main);
    bindShellCommon(main);
    Reveal.observe(document);
  }

  function switchProfile() {
    Store.save();
    Store.logout();
    renderAuth();
  }

  /* Окна по клику на чипы статистики */
  function openStatModal(kind) {
    const data = d();
    const info = {
      streak: {
        pic: SVG.badge("spark", ["#ff9a3d", "#ff6b4a"]),
        title: `Дней подряд: ${data.streak}`,
        text: `Пройдите хотя бы один урок в день, чтобы серия росла. Рекорд: ${data.bestStreak}. Заморозок в запасе: ${data.freezes}.`,
        btn: "Вперёд"
      },
      gems: {
        pic: SVG.badge("coin", ["#ffb547", "#e39b16"]),
        title: `Монет: ${data.gems}`,
        text: "Монеты выдаются за каждый пройденный урок. Тратьте их в магазине на заморозку серии и наряды для Лингви.",
        btn: "Понятно",
        extra: `<button class="btn btn--ghost" data-shop>В магазин</button>`
      },
      xp: {
        pic: SVG.badge("bolt", ["#ffb547", "#ff6b4a"]),
        title: `Сегодня: ${Store.todayXP()} XP`,
        text: `Цель на день: ${data.dailyGoal} XP. Всего набрано: ${data.xp} XP. Цель меняется в настройках.`,
        btn: "Понятно"
      }
    }[kind];
    openModal(`
      <div class="modal__pic">${info.pic}</div>
      <h2>${info.title}</h2>
      <p class="modal__text">${info.text}</p>
      <button class="btn" data-close-btn>${info.btn}</button>${info.extra || ""}`,
      (card) => {
        card.querySelector("[data-close-btn]").onclick = closeModal;
        const shop = card.querySelector("[data-shop]");
        if (shop) shop.onclick = () => { closeModal(); if (!lesson) go("shop"); };
      });
  }

  /* ======================================================================
     Маршрут курса: карточка "дальше" и главы с уроками
     ====================================================================== */
  function ring(done, total) {
    const r = 21, c = 2 * Math.PI * r;
    const off = c * (1 - done / total);
    return `<div class="ring" aria-label="Пройдено ${done} из ${total}">
      <svg viewBox="0 0 52 52"><circle class="bg" cx="26" cy="26" r="${r}"/><circle class="fg" cx="26" cy="26" r="${r}" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/></svg>
      <span>${done}/${total}</span></div>`;
  }

  function learnPage() {
    const cur = currentIndex();
    const finished = cur >= TOTAL;
    const next = finished ? null : FLAT[cur];

    const nextUp = finished
      ? `<section class="next-up reveal">
          <div class="next-up__text">
            <span class="next-up__kicker">Маршрут пройден</span>
            <div class="next-up__title">Все ${TOTAL} уроков позади!</div>
            <p class="next-up__meta">Повторяйте любимые темы, чтобы слова не забывались.</p>
          </div>
          <div class="next-up__mascot">${SVG.mascot({ mood: "party" })}</div>
        </section>`
      : `<section class="next-up reveal">
          <div class="next-up__text">
            <span class="next-up__kicker">${cur === 0 ? "Начните путешествие" : "Продолжить"}</span>
            <div class="next-up__title">${esc(next.lesson.title)}</div>
            <p class="next-up__meta">Глава ${next.ui + 1}: ${esc(next.unit.title)}. Урок ${next.li + 1} из ${next.unit.lessons.length}</p>
            <button class="btn" data-start="${next.gi}">${cur === 0 ? "Начать первый урок" : "Продолжить урок"}</button>
          </div>
          <div class="next-up__mascot">${SVG.mascot({ mood: "determined", hat: d().hat })}</div>
        </section>`;

    const chapters = COURSE.units.map((u, ui) => {
      const style = `--u1:${u.colors[0]};--u2:${u.colors[1]};--u3:${u.colors[2]}`;
      const done = unitDone(ui);
      const total = u.lessons.length;
      const isDoneUnit = done === total;
      const isActive = !isDoneUnit && next && next.ui === ui;
      const lessons = u.lessons.map((l, li) => {
        const entry = FLAT.find((x) => x.lesson.id === l.id);
        const ldone = isDone(l.id);
        const isCur = entry.gi === cur;
        const locked = entry.gi > cur;
        const state = ldone ? SVG.icon("check") : locked ? SVG.icon("lock") : SVG.nodeGlyph("star");
        const sub = ldone ? "Пройден, можно повторить" : isCur ? "Следующий" : "Откроется позже";
        return `
          <button class="lesson-card ${ldone ? "is-done" : ""} ${isCur ? "is-current" : ""} ${locked ? "is-locked" : ""}" data-gi="${entry.gi}" ${locked ? 'aria-disabled="true"' : ""}>
            <span class="lesson-card__top"><span class="lesson-card__num">${String(li + 1).padStart(2, "0")}</span><span class="lesson-card__state">${state}</span></span>
            <span><span class="lesson-card__title">${esc(l.title)}</span><br><span class="lesson-card__sub">${sub}</span></span>
          </button>`;
      }).join("");
      // Заголовок уровня перед первой главой каждого уровня
      const lv = LEVELS.find((l) => l.units[0] === u.id);
      const lvDone = lv ? lv.units.every((id) => { const x = COURSE.units.findIndex((cu) => cu.id === id); return unitDone(x) === COURSE.units[x].lessons.length; }) : false;
      const levelHead = lv ? `
        <div class="level-head reveal ${lvDone ? "is-done" : ""}">
          <span class="level-badge">${lv.id}</span>
          <div><div class="level-head__title">${esc(lv.title)}${lvDone ? " (пройден)" : ""}</div><div class="level-head__desc">${esc(lv.desc)}</div></div>
        </div>` : "";
      return `${levelHead}
        <section class="chapter reveal ${isDoneUnit ? "is-done" : ""} ${isActive ? "is-active" : ""}" style="${style}">
          <span class="chapter__dot">${isDoneUnit ? SVG.icon("check") : ui + 1}</span>
          <div class="card chapter__card">
            <div class="chapter__head">
              <div class="chapter__icon">${SVG.unitIcon(u.icon, "")}</div>
              <div class="chapter__info">
                <span class="chapter__num">Глава ${ui + 1} <span class="level-chip">${u.level || ""}</span></span>
                <span class="chapter__title">${esc(u.title)}</span>
                <span class="chapter__desc">${esc(u.desc)}</span>
              </div>
              ${FLAT.find((x) => x.ui === ui).gi > cur ? `<button class="btn btn--ghost btn--sm chapter__test" data-test="${ui}" title="Сдайте тест, чтобы открыть главу сразу">Тест</button>` : ""}
              ${ring(done, total)}
            </div>
            <div class="chapter__lessons">${lessons}</div>
          </div>
        </section>`;
    }).join("");

    return `
      <div class="journey">
        ${nextUp}
        ${placementCard()}
        ${homeRow()}
        ${chapters}
        <div class="journey-end reveal">
          <div class="journey-end__mascot">${SVG.mascot({ mood: finished ? "happy" : "wink", hat: finished ? "crown" : d().hat })}</div>
          <h3>${finished ? "Курс пройден!" : "Финиш маршрута"}</h3>
          <p>${finished ? "Вы прошли все уроки." : `Впереди ещё ${TOTAL - cur} уроков. Шаг за шагом, и вы здесь.`}</p>
        </div>
      </div>`;
  }

  function bindLearn(main) {
    main.querySelectorAll("[data-start]").forEach((b) => b.addEventListener("click", () => startLesson(Number(b.dataset.start))));
    main.querySelectorAll("[data-review]").forEach((b) => b.addEventListener("click", startReview));
    main.querySelectorAll("[data-yesterday]").forEach((b) => b.addEventListener("click", startYesterday));
    main.querySelectorAll("[data-cards]").forEach((b) => b.addEventListener("click", startCards));
    main.querySelectorAll("[data-placement]").forEach((b) => b.addEventListener("click", startPlacement));
    main.querySelectorAll("[data-placement-skip]").forEach((b) => b.addEventListener("click", () => { d().placementDone = true; Store.save(); renderPage(); }));
    main.querySelectorAll("[data-test]").forEach((b) => b.addEventListener("click", () => confirmTest(Number(b.dataset.test))));
    main.querySelectorAll(".lesson-card").forEach((b) =>
      b.addEventListener("click", () => {
        if (b.classList.contains("is-locked")) {
          Sound.play("tap");
          Toast.show({ title: "Урок пока закрыт", text: "Сначала пройдите уроки выше по маршруту", icon: SVG.icon("lock").replace("<svg", '<svg style="color:var(--muted)"') });
          return;
        }
        startLesson(Number(b.dataset.gi));
      })
    );
  }

  /* ======================================================================
     Урок
     ====================================================================== */
  // Общее начало любой сессии: урок, повторение или тест главы
  function beginSession(mode, queue, extra) {
    lesson = Object.assign({
      mode,
      queue,
      idx: 0,
      total: queue.length,
      solved: 0,
      correctAnswers: 0,
      mistakes: 0,
      startedAt: Date.now(),
      ctrl: null,
      phase: "answer",
      skipped: 0,
      errors: [] // ошибки сессии для "работы над ошибками" и итогов
    }, extra);
    Sound.unlock();
    renderLesson();
  }

  const speakingOn = () => d().settings.speaking !== false;

  function startLesson(gi) {
    const entry = FLAT[gi];
    if (!entry || gi > currentIndex()) return;
    const replay = isDone(entry.lesson.id);
    const queue = Exercises.build(entry.unit, entry.lesson, { isReplay: replay, speaking: speakingOn() });
    beginSession("lesson", queue, { entry, replay, colors: entry.unit.colors });
  }

  /* ---------- Интервальное повторение слов ---------- */
  // Все слова курса по ключу (en в нижнем регистре)
  const WORDS = Object.create(null);
  FLAT.forEach((x) => x.lesson.words.forEach((w) => { if (w.en.length > 1 && !WORDS[w.en.toLowerCase()]) WORDS[w.en.toLowerCase()] = Object.assign({ ui: x.ui }, w); }));
  // Через сколько дней снова показать слово на каждом уровне знания
  const INTERVALS = [0, 1, 2, 4, 7, 15, 30];
  const DAY = 86400000;

  function rememberWords(words) {
    const st = d().wordStats;
    words.forEach((w) => {
      const k = w.en.toLowerCase();
      if (w.en.length > 1 && !st[k]) st[k] = { lvl: 1, due: Date.now() + DAY, wrong: 0, seen: 1 };
      if (w.en.length > 1 && WORDS[k]) logDay("w", k);
    });
  }

  /* ---------- Журнал дня: что изучалось сегодня ---------- */
  function logDay(kind, value) {
    const data = d();
    const day = Store.dayKey();
    const rec = data.dayLog[day] || (data.dayLog[day] = { w: [], l: [] });
    if (!rec[kind].includes(value) && rec[kind].length < 200) rec[kind].push(value);
  }

  // Последний день занятий до сегодняшнего (обычно вчера, но если был перерыв, то раньше)
  function prevStudyDay() {
    const today = Store.dayKey();
    const log = d().dayLog;
    const days = Object.keys(log).filter((k) => k < today && (log[k].w.length || log[k].l.length)).sort();
    return days.length ? days[days.length - 1] : null;
  }

  function dayLabel(day) {
    const diff = Math.round((new Date(Store.dayKey() + "T00:00:00") - new Date(day + "T00:00:00")) / DAY);
    if (diff === 1) return "вчера";
    if (diff === 2) return "позавчера";
    return new Date(day + "T00:00:00").toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
  }

  // Слова и уроки последнего дня занятий
  function yesterdayStuff() {
    const day = prevStudyDay();
    if (!day) return null;
    const rec = d().dayLog[day];
    const lessons = rec.l.map((id) => FLAT.find((x) => x.lesson.id === id)).filter(Boolean);
    const fromLessons = lessons.flatMap((x) => x.lesson.words.map((w) => w.en.toLowerCase()));
    const keys = [...new Set(rec.w.concat(fromLessons))].filter((k) => WORDS[k]);
    return { day, keys, lessons };
  }

  // Повторение вчерашнего: правило урока, затем задания по тем же словам и фразам
  function startYesterday() {
    const y = yesterdayStuff();
    if (!y || y.keys.length < 3) {
      Toast.show({ title: "Вчера ничего не изучалось", text: "Пройдите урок сегодня, и завтра здесь можно будет его вспомнить", icon: SVG.mascot({ mood: "think" }) });
      return;
    }
    const keys = Exercises.shuffle(y.keys).slice(0, 10);
    const words = keys.map((k) => WORDS[k]);
    const ls = y.lessons.map((x) => x.lesson);
    const fakeLesson = {
      id: "yesterday", title: "Вчерашнее", words,
      sentences: ls.flatMap((l) => l.sentences || []),
      gaps: ls.flatMap((l) => l.gaps || [])
    };
    // Отвлекающие варианты берём из тех же глав
    const units = [...new Set(y.lessons.map((x) => x.unit))];
    const fakeUnit = { lessons: [fakeLesson].concat(units.flatMap((u) => u.lessons)) };
    let queue = Exercises.build(fakeUnit, fakeLesson, { isReplay: true, speaking: speakingOn() }).filter((e) => e.type !== "teach");
    // Напоминание правила последнего вчерашнего урока с грамматикой
    const withRule = y.lessons.slice().reverse().find((x) => typeof GRAMMAR === "object" && GRAMMAR[x.lesson.id]);
    if (withRule) queue = [{ type: "grammar", g: GRAMMAR[withRule.lesson.id] }].concat(queue);
    const last = y.lessons[y.lessons.length - 1];
    beginSession("review", queue, { colors: last ? last.unit.colors : ["#7c5cff", "#3ec7ff"], reviewKeys: keys, yesterday: y.day });
  }

  // Слово, которое проверяло упражнение (для статистики)
  function exerciseWord(ex) {
    const en = (ex.word && ex.word.en) || (ex.type === "listen" || ex.type === "dictation" ? ex.target : null);
    return en && WORDS[en.toLowerCase()] ? en.toLowerCase() : null;
  }

  function trackAnswer(ex, correct) {
    const k = exerciseWord(ex);
    if (!k) return;
    const st = d().wordStats;
    // В тесте не добавляем в словарь слова, которые ещё не изучались
    if (!st[k] && lesson && lesson.mode === "test") return;
    const s = st[k] || (st[k] = { lvl: 0, due: Date.now(), wrong: 0, seen: 0 });
    s.seen++;
    if (lesson && lesson.mode === "lesson") logDay("w", k);
    if (correct) {
      s.lvl = Math.min(INTERVALS.length - 1, s.lvl + 1);
      s.due = Date.now() + INTERVALS[s.lvl] * DAY;
    } else {
      s.lvl = 0;
      s.wrong++;
      s.due = Date.now();
    }
  }

  // Слова, которые пора повторить: сначала просроченные и слабые
  function dueWords() {
    const st = d().wordStats;
    const now = Date.now();
    return Object.keys(st)
      .filter((k) => WORDS[k] && st[k].due <= now)
      .sort((a, b) => st[a].lvl - st[b].lvl || st[b].wrong - st[a].wrong);
  }

  function startReview() {
    const st = d().wordStats;
    let keys = dueWords();
    // Если просроченных мало, добавляем самые трудные слова
    if (keys.length < 6) {
      const extra = Object.keys(st).filter((k) => WORDS[k] && !keys.includes(k)).sort((a, b) => st[b].wrong - st[a].wrong || st[a].lvl - st[b].lvl);
      keys = keys.concat(extra).slice(0, 6);
    }
    keys = keys.slice(0, 8);
    if (keys.length < 4) {
      Toast.show({ title: "Пока нечего повторять", text: "Пройдите пару уроков, и слова появятся здесь", icon: SVG.mascot({ mood: "idle" }) });
      return;
    }
    const queue = Exercises.buildReview(keys.map((k) => WORDS[k]));
    beginSession("review", queue, { colors: ["#ff6b4a", "#ffb547"], reviewKeys: keys });
  }

  /* ---------- Тест для пропуска глав ---------- */
  const TEST_MAX_MISTAKES = 2;

  async function confirmTest(ui) {
    const u = COURSE.units[ui];
    const ok = await confirmModal({
      pic: `<div class="modal__pic">${SVG.mascot({ mood: "determined" })}</div>`,
      title: `Тест: ${esc(u.title)}`,
      text: `12 заданий по всей главе. Если ошибок будет не больше ${TEST_MAX_MISTAKES}, откроются эта глава и все главы до неё.`,
      ok: "Начать тест",
      okClass: "",
      cancel: "Не сейчас"
    });
    if (ok) beginSession("test", Exercises.buildTest(u), { testUnit: ui, colors: u.colors });
  }

  /* ---------- Стартовый тест уровня ----------
     6 этапов (A1...C2) по 3 задания. Две ошибки на этапе - тест заканчивается,
     и открываются все уровни ниже этого этапа. */
  function placementCard() {
    if (d().placementDone || lessonsDone() > 0) return "";
    return `
      <section class="card placement-card reveal">
        <div class="placement-card__fox">${SVG.mascot({ mood: "surprised" })}</div>
        <div class="placement-card__text">
          <div class="widget__title">Уже знаете английский?</div>
          <p class="widget__body">Пройдите тест уровня за 5 минут: 18 заданий от A1 до C2. Подходящие главы откроются сразу, без повторения того, что вы уже знаете.</p>
          <div class="placement-card__actions">
            <button class="btn btn--sm" data-placement>Пройти тест уровня</button>
            <button class="btn btn--sm btn--ghost" data-placement-skip>Начать с нуля</button>
          </div>
        </div>
      </section>`;
  }

  function startPlacement() {
    const queue = [];
    LEVELS.forEach((lv, stage) => {
      const units = COURSE.units.filter((u) => lv.units.includes(u.id));
      const pool = [];
      units.forEach((u) => u.lessons.forEach((l) => {
        Exercises.build(u, l, { isReplay: true })
          .filter((e) => e.type === "gap" || e.type === "build" || (e.type === "choose" && !e.letters))
          .forEach((e) => pool.push(e));
      }));
      // На старших уровнях больше заданий на грамматику
      const gaps = Exercises.shuffle(pool.filter((e) => e.type === "gap"));
      const rest = Exercises.shuffle(pool.filter((e) => e.type !== "gap"));
      const pick = (stage >= 2 ? gaps.slice(0, 2).concat(rest) : rest.slice(0, 2).concat(gaps, rest.slice(2))).slice(0, 3);
      pick.forEach((e) => { e.stage = stage; queue.push(e); });
    });
    beginSession("placement", queue, { colors: ["#8f7bff", "#5b8cff"], stageWrong: {}, passed: 0 });
  }

  function finishPlacement(passed) {
    const L = lesson;
    const data = d();
    data.placementDone = true;
    let opened = 0;
    const passedIds = LEVELS.slice(0, passed).flatMap((lv) => lv.units);
    FLAT.filter((x) => passedIds.includes(x.unit.id)).forEach((x) => {
      if (!data.completed[x.lesson.id]) {
        data.completed[x.lesson.id] = { times: 1, perfect: false, at: Date.now(), viaTest: true };
        opened++;
        const words = new Set(data.words);
        x.lesson.words.forEach((w) => { if (w.en.length > 1) words.add(w.en.toLowerCase()); });
        data.words = [...words];
        rememberWords(x.lesson.words);
      }
    });
    const xp = 10 + L.correctAnswers * RULES.xpPerCorrect;
    const s = settle(xp, 10, L);
    lesson = null;
    const next = LEVELS[Math.min(passed, LEVELS.length - 1)];
    const title = passed === 0 ? "Начнём с основ!" : passed >= LEVELS.length ? "Уровень C2: впечатляет!" : `Ваш уровень: ${LEVELS[passed - 1].id}`;
    const subtitle = passed === 0
      ? "Тест показал, что лучше начать с уровня A1. Это быстро, а основа будет крепкой."
      : passed >= LEVELS.length
        ? `Открыты все уроки (${opened}). Повторяйте темы и играйте в игры, чтобы держать форму.`
        : `Открыто уроков: ${opened}. Продолжайте с уровня ${next.id}: ${next.title.toLowerCase()}.`;
    renderResult(Object.assign(s, {
      xp, coins: 10, perfect: L.mistakes === 0, title, subtitle,
      mood: passed >= 3 ? "cool" : passed > 0 ? "cheer" : "hello",
      again: null
    }));
  }

  /* ---------- Свои слова ---------- */
  // Добавляет слова пользователя в общий словарь WORDS (для повторения и игр)
  function loadCustomWords() {
    Object.keys(WORDS).forEach((k) => { if (WORDS[k].custom) delete WORDS[k]; });
    (d().customWords || []).forEach((w) => {
      const k = w.en.toLowerCase();
      if (!WORDS[k]) WORDS[k] = { en: w.en, ru: w.ru, ui: -1, custom: true };
    });
  }

  function addCustomWord(en, ru) {
    en = en.trim().replace(/\s+/g, " ");
    ru = ru.trim().replace(/\s+/g, " ");
    if (en.length < 2 || !ru) return "Заполните оба поля";
    if (!/^[a-zA-Z' .-]+$/.test(en)) return "Английское слово пишите латиницей";
    const k = en.toLowerCase();
    const data = d();
    if (WORDS[k] && !WORDS[k].custom) {
      // Слово уже есть в курсе: просто добавляем его в изученные
      if (!data.words.includes(k)) data.words.push(k);
      if (!data.wordStats[k]) data.wordStats[k] = { lvl: 0, due: Date.now(), wrong: 0, seen: 0 };
      Store.save();
      return null;
    }
    if (data.customWords.some((w) => w.en.toLowerCase() === k)) return "Это слово уже есть в вашем словаре";
    data.customWords.push({ en, ru, added: Date.now() });
    delete data.deletedWords[k];
    WORDS[k] = { en, ru, ui: -1, custom: true };
    if (!data.words.includes(k)) data.words.push(k);
    data.wordStats[k] = { lvl: 0, due: Date.now(), wrong: 0, seen: 0 };
    Store.save();
    return null;
  }

  function removeCustomWord(k) {
    const data = d();
    data.customWords = data.customWords.filter((w) => w.en.toLowerCase() !== k);
    data.deletedWords[k] = Date.now();
    data.words = data.words.filter((x) => x !== k);
    delete data.wordStats[k];
    delete WORDS[k];
    Store.save();
  }

  /* ---------- Задания дня ---------- */
  const QUESTS = [
    { id: "lessons2", title: "Пройдите 2 урока", goal: 2, icon: "book", value: (q) => q.lessons },
    { id: "xp30", title: "Наберите 30 XP", goal: 30, icon: "bolt", value: () => Store.todayXP() },
    { id: "correct15", title: "Дайте 15 верных ответов", goal: 15, icon: "target", value: (q) => q.correct },
    { id: "review1", title: "Повторите слова один раз", goal: 1, icon: "streak", value: (q) => q.reviews },
    { id: "perfect1", title: "Урок без единой ошибки", goal: 1, icon: "star", value: (q) => q.perfect },
    { id: "lessons1", title: "Пройдите 1 урок", goal: 1, icon: "book", value: (q) => q.lessons }
  ];
  const QUEST_REWARD = 15;

  // Счётчики дня: при смене даты обнуляются
  function daily() {
    const q = d().daily;
    const today = Store.dayKey();
    if (q.day !== today) Object.assign(q, { day: today, lessons: 0, correct: 0, reviews: 0, perfect: 0, claimed: [] });
    return q;
  }

  // Три задания на сегодня (одинаковые весь день)
  function todayQuests() {
    let h = 0;
    for (const c of Store.dayKey()) h = (h * 33 + c.charCodeAt(0)) >>> 0;
    const lessonQuest = h % 2 ? QUESTS[0] : QUESTS[5];
    const others = QUESTS.filter((q) => q !== QUESTS[0] && q !== QUESTS[5]);
    const a = others[h % others.length];
    const b = others[(h + 1 + (h >> 3) % (others.length - 1)) % others.length];
    return [lessonQuest, a, b === a ? others[(others.indexOf(a) + 1) % others.length] : b];
  }

  // Выдаёт награды за выполненные задания
  function claimQuests() {
    const q = daily();
    const done = [];
    for (const quest of todayQuests()) {
      if (q.claimed.includes(quest.id)) continue;
      if (quest.value(q) >= quest.goal) {
        q.claimed.push(quest.id);
        d().gems += QUEST_REWARD;
        d().gemsEarned += QUEST_REWARD;
        done.push(quest);
      }
    }
    if (done.length) Store.save();
    return done;
  }

  // Карточка "Вспомнить вчерашнее" (если вчера или в прошлый раз что-то изучалось)
  function yesterdayCard() {
    const y = yesterdayStuff();
    if (!y || y.keys.length < 3) return "";
    const label = dayLabel(y.day);
    const doneToday = daily().yesterdayDone === Store.dayKey();
    const titles = y.lessons.slice(-2).map((x) => esc(x.lesson.title)).join(", ");
    return `
        <div class="card review-card yesterday-card reveal">
          <div class="widget__title">${label === "вчера" ? "Вспомнить вчерашнее" : "Вспомнить прошлое занятие"}</div>
          <div><div class="review-card__count">${y.keys.length}</div><div class="widget__body">${doneToday ? "Уже вспомнили сегодня. Можно ещё раз" : `слов, которые вы учили ${label}`}</div>${titles ? `<div class="yesterday-card__lessons">${titles}</div>` : ""}</div>
          <button class="btn btn--sm ${doneToday ? "btn--ghost" : ""}" data-yesterday>${SVG.icon("repeat")}Вспомнить</button>
          <div class="review-card__fox">${SVG.mascot({ mood: "think", hat: d().hat })}</div>
        </div>`;
  }

  function homeRow() {
    const q = daily();
    const quests = todayQuests();
    const due = dueWords().length;
    const total = Object.keys(d().wordStats).length;
    return `
      <div class="home-row">
        <div class="card widget reveal">
          <div class="widget__head"><span class="widget__title">Задания дня</span><span class="tag">${q.claimed.length} / 3</span></div>
          <div class="quest-list">
            ${quests.map((quest) => {
              const val = Math.min(quest.goal, quest.value(q));
              const isDoneQ = q.claimed.includes(quest.id);
              return `<div class="quest ${isDoneQ ? "is-done" : ""}">
                <span class="quest__icon">${SVG.icon(isDoneQ ? "check" : quest.icon)}</span>
                <div><div class="quest__title">${quest.title}</div><div class="progress"><div class="progress__fill" style="width:${(val / quest.goal) * 100}%"></div></div></div>
                <span class="quest__reward">${coinIcon(16)}${QUEST_REWARD}</span>
              </div>`;
            }).join("")}
          </div>
        </div>
        <div class="card review-card reveal">
          <div class="widget__title">Повторение слов</div>
          <div><div class="review-card__count">${due}</div><div class="widget__body">${total ? (due ? "слов пора повторить" : "Всё повторено. Новые слова появятся завтра") : "Слова появятся после первого урока"}</div></div>
          <div class="review-card__btns">
            <button class="btn btn--sm" data-review ${total < 4 ? "disabled" : ""}>${SVG.icon("repeat")}Повторить</button>
            <button class="btn btn--sm btn--ghost" data-cards ${total < 3 ? "disabled" : ""}>${SVG.icon("words")}Карточки</button>
          </div>
          <div class="review-card__fox">${SVG.mascot({ mood: "readlaugh", hat: d().hat })}</div>
        </div>
        ${yesterdayCard()}
      </div>`;
  }

  function renderLesson() {
    const L = lesson;
    const c = L.colors || ["#ff6b4a", "#ffb547"];
    $app.innerHTML = `
      <div class="lesson screen-enter" style="--u1:${c[0]};--u2:${c[1]}">
        <div class="lesson__top">
          <button class="icon-btn" data-act="quit" aria-label="Выйти из урока">${SVG.icon("close")}</button>
          <div class="progress" role="progressbar" aria-label="Прогресс урока"><div class="progress__fill" id="lessonProgress"></div></div>
          <span class="lesson__count" id="lessonCount"></span>
          ${L.entry && typeof GRAMMAR === "object" && GRAMMAR[L.entry.lesson.id] ? `<button class="icon-btn" data-act="hint" aria-label="Подсказка по грамматике" title="Подсказка">${SVG.icon("book")}</button>` : ""}
        </div>
        <div class="lesson__body" id="exRoot"></div>
        <footer class="lesson__foot" id="foot">
          <div class="lesson__foot-inner">
            <div class="foot-left" id="footLeft" aria-live="polite"></div>
            <button class="btn" id="mainBtn" disabled>Проверить</button>
          </div>
        </footer>
      </div>`;
    $app.querySelector('[data-act="quit"]').addEventListener("click", quitLesson);
    const hint = $app.querySelector('[data-act="hint"]');
    if (hint) hint.addEventListener("click", () => showGrammar(L.entry.lesson.id));
    $app.querySelector("#mainBtn").addEventListener("click", onMain);
    showExercise();
  }

  // Окно с правилом урока (кнопка "Подсказка")
  function showGrammar(id) {
    const g = GRAMMAR[id];
    if (!g) return;
    openModal(`<h2>${esc(g.title)}</h2><div class="modal__rule">${Exercises.grammarCard(g)}</div><button class="btn" data-close-btn>Понятно</button>`, (card) => {
      card.querySelector("[data-close-btn]").onclick = closeModal;
      Exercises.bindSpeak(card, { speak: say });
    });
  }

  function updateLessonProgress() {
    const el = document.getElementById("lessonProgress");
    const cnt = document.getElementById("lessonCount");
    if (el) el.style.width = `${(lesson.solved / lesson.total) * 100}%`;
    if (cnt) cnt.textContent = `${Math.min(lesson.solved, lesson.total)} / ${lesson.total}`;
  }

  const HINTS = {
    teach: "Запомните слово и нажмите «Дальше»",
    notice: "Посмотрите ответы и нажмите «Дальше»",
    grammar: "Прочитайте правило и нажмите «Дальше»",
    choose: "Выберите вариант или нажмите 1-4",
    firstLetter: "Послушайте слово и выберите первую букву",
    picture: "Выберите подходящую картинку",
    match: "Соедините слова и переводы",
    type: "Напишите ответ и нажмите Enter",
    build: "Соберите фразу из слов",
    listen: "Послушайте и выберите вариант",
    dictation: "Послушайте и напишите",
    gap: "Выберите правильную форму",
    speak: "Нажмите на микрофон и скажите фразу",
    dialog: "Выберите подходящий ответ",
    story: "Прочитайте текст и ответьте на вопрос"
  };

  function showExercise() {
    const L = lesson;
    const ex = L.queue[L.idx];
    const root = document.getElementById("exRoot");
    const foot = document.getElementById("foot");
    const btn = document.getElementById("mainBtn");
    const left = document.getElementById("footLeft");
    L.phase = "answer";
    foot.className = "lesson__foot";
    btn.className = "btn";
    btn.textContent = ex.type === "teach" || ex.type === "grammar" || ex.type === "notice" ? "Дальше" : "Проверить";
    btn.disabled = true;
    // Для заданий на слух можно пропустить (нет наушников или звука)
    left.innerHTML = ex.type === "listen" || ex.type === "dictation"
      ? `<button class="btn btn--ghost btn--sm" id="skipBtn">Не могу слушать</button>`
      : ex.type === "speak"
      ? `<button class="btn btn--ghost btn--sm" id="skipBtn">Не могу говорить</button>`
      : `<span class="foot-hint">${HINTS[ex.type] || ""}</span>`;
    const skip = document.getElementById("skipBtn");
    if (skip) skip.addEventListener("click", skipExercise);
    // Останавливаем озвучку и микрофон прошлого задания
    Speech.stop();
    SpeechRec.abort();
    const token = (L.renderToken = (L.renderToken || 0) + 1);

    L.ctrl = Exercises.render(ex, root, {
      // Ответ от прошлого задания (например, распознанная речь) сюда не попадёт
      onReady: (v) => { if (lesson === L && L.renderToken === token && L.phase === "answer") btn.disabled = !v; },
      speak: say,
      auto,
      sfx: (n) => Sound.play(n),
      hat: d().hat
    });
    updateLessonProgress();
    window.scrollTo({ top: 0 });
    // Фокус на заголовок задания, чтобы клавиатура и экранный диктор не теряли место
    setTimeout(() => {
      if (lesson !== L || L.renderToken !== token || root.contains(document.activeElement)) return;
      const h = root.querySelector("h2");
      if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
    }, 150);
  }

  function skipExercise() {
    lesson.skipped++;
    lesson.solved++;
    nextExercise();
  }

  const PRAISE = ["Отлично!", "Верно!", "Так держать!", "Великолепно!", "Супер!", "Точно в цель!"];

  function onMain() {
    const L = lesson;
    if (!L) return;
    const btn = document.getElementById("mainBtn");
    if (btn.disabled) return;

    if (L.phase === "feedback") {
      nextExercise();
      return;
    }

    const res = L.ctrl.check();
    const ex = L.queue[L.idx];

    // Задания без проверки (карточка слова, пары) засчитываются сразу
    if (res.silent) {
      if (res.mistakes) L.mistakes += res.mistakes;
      L.solved++;
      if (ex.type === "match") {
        Sound.play("correct");
        L.correctAnswers++;
      }
      nextExercise();
      return;
    }

    L.phase = "feedback";
    const data = d();
    data.totalAnswers++;
    trackAnswer(ex, res.correct);
    // Точность по дням для статистики
    const acc = data.accByDay[Store.dayKey()] || (data.accByDay[Store.dayKey()] = { c: 0, t: 0 });
    acc.t++;
    if (res.correct) acc.c++;
    const foot = document.getElementById("foot");
    const left = document.getElementById("footLeft");

    if (res.correct) {
      data.correctAnswers++;
      daily().correct++;
      L.correctAnswers++;
      L.solved++;
      Sound.play("correct");
      const r = btn.getBoundingClientRect();
      Confetti.burst({ x: (r.left + r.width / 2) / innerWidth, y: r.top / innerHeight, count: 24, spread: 50, power: 9 });
      foot.className = "lesson__foot is-correct";
      left.innerHTML = `
        <div class="feedback">
          <div class="feedback__fox">${SVG.mascot({ mood: Math.random() < 0.5 ? "wink" : "cheer", hat: d().hat })}</div>
          <div>
            <div class="feedback__title">${res.typo ? "Почти идеально!" : PRAISE[(Math.random() * PRAISE.length) | 0]}</div>
            ${res.typo ? `<div class="feedback__text">Есть опечатка. Правильно: <b>${esc(res.solution)}</b></div>` : ""}
          </div>
        </div>`;
      btn.className = "btn btn--teal";
    } else {
      L.mistakes++;
      Sound.play("wrong");
      // В уроке и повторении ошибка возвращается в конец; в тесте просто считается
      const isTest = L.mode === "test" || L.mode === "placement";
      if (L.mode === "placement") L.stageWrong[ex.stage] = (L.stageWrong[ex.stage] || 0) + 1;
      if (!isTest) {
        // Запоминаем ошибку (без повторов) и перед первым возвратом показываем экран с правильными ответами
        const item = Exercises.errorItem(ex, res);
        if (!L.errors.some((e) => e.en === item.en && e.ru === item.ru)) L.errors.push(item);
        if (!L.noticeAdded) {
          L.queue.push({ type: "notice", errors: L.errors });
          L.total++;
          L.noticeAdded = true;
        }
        L.queue.push(ex);
        L.total++;
      } else {
        L.solved++;
      }
      foot.className = "lesson__foot is-wrong";
      left.innerHTML = `
        <div class="feedback">
          <div class="feedback__fox">${SVG.mascot({ mood: "worried", hat: d().hat })}</div>
          <div>
            <div class="feedback__title">Не совсем</div>
            <div class="feedback__text">Правильно: <b>${esc(res.solution)}</b>.${L.mode === "placement" ? "" : isTest ? ` Ошибок: ${L.mistakes}. Допускается не больше ${TEST_MAX_MISTAKES}.` : " Задание вернётся в конце."}</div>
          </div>
        </div>`;
      btn.className = "btn btn--rose";
    }
    btn.textContent = "Продолжить";
    btn.disabled = false;
    btn.focus({ preventScroll: true });
    updateLessonProgress();
    Store.save();
  }

  function nextExercise() {
    const L = lesson;
    L.idx++;
    updateLessonProgress();
    // Тест уровня: после каждого этапа решаем, идти ли дальше
    if (L.mode === "placement") {
      const prev = L.queue[L.idx - 1], next = L.queue[L.idx];
      if (prev && (!next || next.stage !== prev.stage)) {
        if ((L.stageWrong[prev.stage] || 0) >= 2) { finishPlacement(prev.stage); return; }
        L.passed = prev.stage + 1;
      }
      if (!next) { finishPlacement(L.passed); return; }
      showExercise();
      return;
    }
    // Тест заканчивается досрочно, если ошибок уже слишком много
    if (L.mode === "test" && L.mistakes > TEST_MAX_MISTAKES) {
      finishTest(false);
      return;
    }
    if (L.idx >= L.queue.length) {
      if (L.mode === "review") finishReview();
      else if (L.mode === "test") finishTest(true);
      else finishLesson();
      return;
    }
    showExercise();
  }

  async function quitLesson() {
    const what = lesson.mode === "test" ? "теста" : lesson.mode === "review" ? "повторения" : "этого урока";
    const keep = await confirmModal({
      pic: `<div class="modal__pic">${SVG.mascot({ mood: "sad", hat: d().hat })}</div>`,
      title: "Уже уходите?",
      text: `Если выйти сейчас, прогресс ${what} не сохранится.`,
      ok: "Продолжить",
      okClass: "",
      cancel: "Выйти"
    });
    if (keep === false) exitLesson();
  }

  function exitLesson() {
    lesson = null;
    Speech.stop();
    SpeechRec.abort();
    renderShell();
  }

  // Общие начисления в конце любой сессии
  function settle(xp, coins, L) {
    const data = d();
    const goalBefore = Store.todayXP();
    Store.addXP(xp);
    data.gems += coins;
    data.gemsEarned += coins;
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 4) data.flags.night = 1;
    if (hour >= 4 && hour < 8) data.flags.morning = 1;
    const secs = Math.round((Date.now() - L.startedAt) / 1000);
    data.minutes += secs / 60;
    const streakUp = Store.markActive();
    Store.save();
    const quests = claimQuests();
    const unlocked = checkAchievements();
    return {
      secs,
      streakUp,
      quests,
      unlocked,
      goalReached: goalBefore < data.dailyGoal && Store.todayXP() >= data.dailyGoal,
      accuracy: Math.round((L.correctAnswers / Math.max(1, L.correctAnswers + L.mistakes)) * 100)
    };
  }

  /* Завершение урока: награды, серия, достижения */
  function finishLesson() {
    const L = lesson;
    const data = d();
    const id = L.entry.lesson.id;
    const firstTime = !isDone(id);
    const perfect = L.mistakes === 0; // пропуск задания на слух или говорение не считается ошибкой
    const factor = firstTime ? 1 : RULES.xpReplayFactor;
    const xp = Math.max(1, Math.round((L.correctAnswers * RULES.xpPerCorrect + RULES.xpLessonBonus + (perfect ? RULES.xpPerfectBonus : 0)) * factor));
    const coins = Math.round((RULES.gemsPerLesson + (perfect ? RULES.gemsPerfectBonus : 0)) * factor);

    const prev = data.completed[id] || { times: 0, perfect: false };
    data.completed[id] = { times: prev.times + 1, perfect: prev.perfect || perfect, at: Date.now() };
    logDay("l", id);
    if (perfect) { data.perfectCount++; daily().perfect++; }
    daily().lessons++;
    // Выученные слова (буквы алфавита не считаем) попадают в повторение
    const words = new Set(data.words);
    L.entry.lesson.words.forEach((w) => { if (w.en.length > 1) words.add(w.en.toLowerCase()); });
    data.words = [...words];
    rememberWords(L.entry.lesson.words);

    const s = settle(xp, coins, L);
    const unitFinished = firstTime && unitDone(L.entry.ui) === L.entry.unit.lessons.length;
    lesson = null;
    const title = unitFinished ? "Глава пройдена!" : perfect ? "Безупречно!" : s.accuracy >= 80 ? "Урок пройден!" : "Хорошая работа!";
    renderResult(Object.assign(s, {
      xp, coins, perfect, title,
      subtitle: `${L.entry.unit.title}: ${L.entry.lesson.title}`,
      mood: unitFinished ? "party" : perfect ? "cheer" : "happy",
      errors: L.errors,
      again: () => startLesson(L.entry.gi), againLabel: "Пройти ещё раз"
    }));
  }

  function finishReview() {
    const L = lesson;
    const data = d();
    const perfect = L.mistakes === 0; // пропуск задания на слух или говорение не считается ошибкой
    const xp = L.correctAnswers * RULES.xpPerCorrect + 5;
    const coins = 5;
    daily().reviews++;
    if (L.yesterday) daily().yesterdayDone = Store.dayKey();
    data.reviewsTotal = (data.reviewsTotal || 0) + 1;
    const s = settle(xp, coins, L);
    lesson = null;
    renderResult(Object.assign(s, {
      xp, coins, perfect,
      title: L.yesterday ? "Вчерашнее вспомнили!" : "Слова повторены!",
      subtitle: L.yesterday
        ? `Слов из занятия (${dayLabel(L.yesterday)}): ${L.reviewKeys.length}. Теперь можно идти дальше`
        : `Повторено слов: ${L.reviewKeys.length}. Осталось к повторению: ${dueWords().length}`,
      mood: L.yesterday ? "cheer" : "readlaugh",
      errors: L.errors,
      again: L.yesterday ? startYesterday : startReview, againLabel: L.yesterday ? "Ещё раз" : "Повторить ещё"
    }));
  }

  function finishTest(passed) {
    const L = lesson;
    const data = d();
    const ui = L.testUnit;
    const u = COURSE.units[ui];
    if (!passed) {
      lesson = null;
      renderResult({
        xp: 0, coins: 0, perfect: false, secs: Math.round((Date.now() - L.startedAt) / 1000),
        accuracy: Math.round((L.correctAnswers / Math.max(1, L.correctAnswers + L.mistakes)) * 100),
        streakUp: false, goalReached: false, unlocked: [], quests: [], failed: true,
        title: "Тест не сдан",
        subtitle: `Ошибок: ${L.mistakes}. Можно пройти уроки по порядку или попробовать ещё раз.`,
        mood: "cry",
        again: () => beginSession("test", Exercises.buildTest(u), { testUnit: ui, colors: u.colors }), againLabel: "Попробовать снова"
      });
      return;
    }
    // Открываем все уроки до конца этой главы включительно
    let opened = 0;
    FLAT.filter((x) => x.ui <= ui).forEach((x) => {
      if (!data.completed[x.lesson.id]) {
        data.completed[x.lesson.id] = { times: 1, perfect: false, at: Date.now(), viaTest: true };
        opened++;
        const words = new Set(data.words);
        x.lesson.words.forEach((w) => { if (w.en.length > 1) words.add(w.en.toLowerCase()); });
        data.words = [...words];
        rememberWords(x.lesson.words);
      }
    });
    const xp = 20 + L.correctAnswers * RULES.xpPerCorrect;
    const coins = 20;
    const s = settle(xp, coins, L);
    lesson = null;
    renderResult(Object.assign(s, {
      xp, coins, perfect: L.mistakes === 0,
      title: "Тест сдан!",
      subtitle: `Открыто уроков: ${opened}. Глава «${u.title}» пройдена.`,
      mood: "party",
      again: null
    }));
  }

  function renderResult(r) {
    const data = d();
    const mm = Math.floor(r.secs / 60);
    const ss = String(r.secs % 60).padStart(2, "0");
    const small = (name) => SVG.icon(name).replace("<svg", '<svg style="width:18px;height:18px"');
    $app.innerHTML = `
      <section class="result screen-enter">
        <div class="result__inner">
          <div class="result__mascot">${SVG.mascot({ mood: r.mood, hat: data.hat })}</div>
          <h1 class="result__title">${esc(r.title)}</h1>
          <p style="color:var(--text-2);font-weight:500">${esc(r.subtitle)}</p>
          <div class="result__stats">
            <div class="result-stat" style="animation-delay:80ms">${SVG.icon("bolt")}<div class="result-stat__value">+${r.xp}</div><div class="result-stat__label">опыт</div></div>
            <div class="result-stat" style="animation-delay:180ms">${SVG.icon("target")}<div class="result-stat__value">${r.accuracy}%</div><div class="result-stat__label">точность</div></div>
            <div class="result-stat" style="animation-delay:280ms">${SVG.icon("clock")}<div class="result-stat__value">${mm}:${ss}</div><div class="result-stat__label">время</div></div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">
            ${r.coins ? `<span class="tag">${small("coin")} +${r.coins} монет</span>` : ""}
            ${r.streakUp ? `<span class="tag">${small("streak")} Дней подряд: ${data.streak}</span>` : ""}
            ${r.goalReached ? `<span class="tag">${small("target")} Цель дня выполнена</span>` : ""}
            ${r.perfect ? `<span class="tag">${small("star")} Без ошибок</span>` : ""}
            ${r.quests.map((q) => `<span class="tag">${small("quest")} ${esc(q.title)}: +${QUEST_REWARD}</span>`).join("")}
          </div>
          ${r.errors && r.errors.length ? `
          <details class="result__errors card">
            <summary>Ваши ошибки: ${r.errors.length}. Посмотреть правильные ответы</summary>
            ${Exercises.errorList(r.errors)}
          </details>` : ""}
          <div class="result__actions">
            <button class="btn btn--block" data-act="continue">Продолжить</button>
            ${r.again ? `<button class="btn btn--ghost btn--block" data-act="again">${r.againLabel}</button>` : ""}
          </div>
        </div>
      </section>`;
    if (r.failed) Sound.play("wrong");
    else {
      Sound.play("complete");
      Confetti.celebrate();
    }
    $app.querySelector('[data-act="continue"]').addEventListener("click", () => { page = r.backPage || "learn"; renderShell(); });
    const again = $app.querySelector('[data-act="again"]');
    if (again) again.addEventListener("click", r.again);
    const errBox = $app.querySelector(".result__errors");
    if (errBox) Exercises.bindSpeak(errBox, { speak: say });
    $app.querySelector('[data-act="continue"]').focus({ preventScroll: true });

    // Новые достижения показываем по очереди
    r.unlocked.forEach((a, i) => {
      setTimeout(() => {
        Sound.play("achievement");
        Toast.show({ title: `Награда: ${a.title}`, text: a.desc, icon: SVG.badge(a.badge, a.colors), duration: 4200 });
      }, 1200 + i * 900);
    });
  }

  /* ======================================================================
     Мини-игры: "60 секунд", "Пары на скорость", "Звуки" и справочник звуков
     ====================================================================== */
  let game = null;

  // Слова для игр: изученные, а если их мало, то из первых открытых уроков
  function gameWords(min = 10) {
    const keys = Object.keys(WORDS).filter((k) => d().words.includes(k));
    if (keys.length < min) {
      FLAT.slice(0, Math.max(currentIndex() + 1, 8)).forEach((x) => x.lesson.words.forEach((w) => {
        const k = w.en.toLowerCase();
        if (WORDS[k] && !keys.includes(k)) keys.push(k);
      }));
    }
    return keys.map((k) => WORDS[k]);
  }

  // Без слов с одинаковым переводом: иначе в парах правильный ответ засчитается как ошибка
  function uniqueRu(words) {
    const seen = new Set();
    return words.filter((w) => { const k = w.ru.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
  }

  const GAMES = [
    { id: "speed", title: "60 секунд", desc: "Переведите как можно больше слов за минуту", icon: "bolt", record: (r) => (r.speed ? `Рекорд: ${r.speed} слов` : "Рекорда пока нет") },
    { id: "pairs", title: "Пары на скорость", desc: "Три раунда по 5 пар. Ошибка добавляет 3 секунды", icon: "target", record: (r) => (r.pairs ? `Рекорд: ${r.pairs} сек` : "Рекорда пока нет") },
    { id: "sounds", title: "Звуки", desc: "Услышьте разницу: ship или sheep, think или sink", icon: "speaker", record: (r) => (r.sounds ? `Рекорд: ${r.sounds} из 10` : "Рекорда пока нет"), needsAudio: true }
  ];

  function gamesPage() {
    const r = d().records;
    const audioOk = Speech.isEnabled();
    return `
      <div class="page">
        <div class="page__head"><h1>Игры</h1><p>Короткие тренировки на скорость и слух. Дают опыт и монеты.</p></div>
        <div class="games">
          ${GAMES.map((g) => `
            <div class="card game-card reveal">
              <span class="game-card__icon">${SVG.icon(g.icon)}</span>
              <div class="game-card__main">
                <div class="game-card__title">${g.title}</div>
                <div class="game-card__desc">${g.desc}</div>
                <span class="tag">${SVG.icon("trophy")}${g.record(r)}</span>
              </div>
              <button class="btn btn--sm" data-game="${g.id}" ${g.needsAudio && !audioOk ? "disabled title=\"Нужна озвучка\"" : ""}>Играть</button>
            </div>`).join("")}
        </div>

        <h2>Трудные звуки</h2>
        <p class="page__lead">Нажмите на слово, чтобы услышать разницу. Потом проверьте себя в игре «Звуки».</p>
        <div class="sound-groups">
          ${SOUND_PAIRS.map((g) => `
            <div class="card sound-group reveal">
              <div class="sound-group__title">${esc(g.group)}</div>
              <div class="sound-group__tip">${esc(g.tip)}</div>
              <div class="sound-pairs">
                ${g.pairs.map((p) => `
                  <div class="sound-pair">
                    <button class="sound-word" data-say-word="${esc(p[0])}"><b>${esc(p[0])}</b><small>${esc(p[1])}</small></button>
                    <span class="sound-vs">или</span>
                    <button class="sound-word" data-say-word="${esc(p[2])}"><b>${esc(p[2])}</b><small>${esc(p[3])}</small></button>
                  </div>`).join("")}
              </div>
            </div>`).join("")}
        </div>
      </div>`;
  }

  function bindGames(main) {
    main.querySelectorAll("[data-game]").forEach((b) => b.addEventListener("click", () => startGame(b.dataset.game)));
  }

  // Экран игры: верхняя панель с таймером и область игры
  function renderGameShell(title) {
    $app.innerHTML = `
      <div class="lesson screen-enter">
        <div class="lesson__top">
          <button class="icon-btn" data-act="quit-game" aria-label="Выйти из игры">${SVG.icon("close")}</button>
          <div class="progress"><div class="progress__fill" id="gameBar"></div></div>
          <span class="lesson__count" id="gameInfo"></span>
        </div>
        <div class="lesson__body" id="gameRoot"><h2 class="ex-title">${esc(title)}</h2></div>
      </div>`;
    $app.querySelector('[data-act="quit-game"]').addEventListener("click", () => {
      if (game && game.timer) clearInterval(game.timer);
      game = null;
      Speech.stop();
      page = "games";
      renderShell();
    });
  }

  function startGame(kind) {
    Sound.unlock();
    if (kind === "speed") startSpeed();
    if (kind === "pairs") startPairs();
    if (kind === "sounds") startSounds();
  }

  /* --- 60 секунд --- */
  function startSpeed() {
    const words = Exercises.shuffle(gameWords(10));
    game = { kind: "speed", words, i: 0, score: 0, mistakes: 0, left: 60, startedAt: Date.now(), timer: null, lock: false };
    renderGameShell("60 секунд");
    nextSpeed();
    game.timer = setInterval(() => {
      if (!game) return;
      game.left--;
      updateSpeedBar();
      if (game.left <= 0) endGame();
    }, 1000);
    updateSpeedBar();
  }
  function updateSpeedBar() {
    const bar = document.getElementById("gameBar");
    const info = document.getElementById("gameInfo");
    if (bar) bar.style.width = `${(game.left / 60) * 100}%`;
    if (info) info.textContent = `${game.left} с`;
  }
  function nextSpeed() {
    const g = game;
    if (g.i >= g.words.length) { g.words = Exercises.shuffle(g.words); g.i = 0; }
    const w = g.words[g.i++];
    const pool = Object.values(WORDS).filter((x) => x.ru !== w.ru && x.en !== w.en);
    const opts = Exercises.shuffle([w, ...Exercises.shuffle(pool).slice(0, 3)]);
    const root = document.getElementById("gameRoot");
    root.innerHTML = `
      <div class="game-score">Верно: <b>${g.score}</b></div>
      <div class="game-word">${esc(w.en)}</div>
      <div class="options options--grid">${opts.map((o, i) => `<button class="option" data-i="${i}"><span class="option__key">${i + 1}</span><span>${esc(o.ru)}</span></button>`).join("")}</div>`;
    g.lock = false;
    root.querySelectorAll(".option").forEach((b, i) => b.addEventListener("click", () => {
      if (g.lock || !game) return;
      g.lock = true;
      if (opts[i] === w) {
        g.score++;
        b.classList.add("is-correct");
        Sound.play("match");
        setTimeout(() => game === g && nextSpeed(), 220);
      } else {
        g.mistakes++;
        b.classList.add("is-wrong");
        root.querySelectorAll(".option")[opts.indexOf(w)].classList.add("is-correct");
        Sound.play("wrong");
        setTimeout(() => game === g && nextSpeed(), 700);
      }
    }));
  }

  /* --- Пары на скорость --- */
  function startPairs() {
    game = { kind: "pairs", round: 0, words: uniqueRu(Exercises.shuffle(gameWords(15))), mistakes: 0, startedAt: Date.now(), penalty: 0, timer: null, score: 0 };
    renderGameShell("Пары на скорость");
    game.timer = setInterval(() => {
      const info = document.getElementById("gameInfo");
      if (info && game) info.textContent = `${Math.round((Date.now() - game.startedAt) / 1000) + game.penalty} с`;
    }, 250);
    nextPairsRound();
  }
  function nextPairsRound() {
    const g = game;
    if (g.round >= 3) { endGame(); return; }
    // Если слов не хватает, добираем из общего списка без повторов и одинаковых переводов
    const pairs = uniqueRu(g.words.slice(g.round * 5).concat(Exercises.shuffle(gameWords(15)))).slice(0, 5);
    g.round++;
    document.getElementById("gameBar").style.width = `${((g.round - 1) / 3) * 100}%`;
    const left = Exercises.shuffle(pairs), right = Exercises.shuffle(pairs);
    const root = document.getElementById("gameRoot");
    root.innerHTML = `
      <div class="game-score">Раунд <b>${g.round}</b> из 3</div>
      <div class="match">
        <div class="match__col">${left.map((p) => `<button class="option" data-side="en" data-key="${esc(p.en)}">${esc(p.en)}</button>`).join("")}</div>
        <div class="match__col">${right.map((p) => `<button class="option" data-side="ru" data-key="${esc(p.en)}">${esc(p.ru)}</button>`).join("")}</div>
      </div>`;
    let picked = { en: null, ru: null }, done = 0;
    root.querySelectorAll(".option").forEach((b) => b.addEventListener("click", () => {
      const side = b.dataset.side;
      if (picked[side]) picked[side].classList.remove("is-selected");
      picked[side] = b;
      b.classList.add("is-selected");
      if (!picked.en || !picked.ru) return;
      const a = picked.en, c = picked.ru;
      picked = { en: null, ru: null };
      if (a.dataset.key === c.dataset.key) {
        Sound.play("match");
        [a, c].forEach((x) => { x.classList.remove("is-selected"); x.classList.add("is-matched"); x.disabled = true; });
        g.score++;
        if (++done === pairs.length) setTimeout(() => game === g && nextPairsRound(), 300);
      } else {
        Sound.play("wrong");
        g.mistakes++;
        g.penalty += 3;
        [a, c].forEach((x) => { x.classList.remove("is-selected"); x.classList.add("is-wrong"); });
        setTimeout(() => [a, c].forEach((x) => x.classList.remove("is-wrong")), 420);
      }
    }));
  }

  /* --- Звуки --- */
  function startSounds() {
    const all = SOUND_PAIRS.flatMap((g) => g.pairs.map((p) => ({ p, tip: g.tip })));
    game = { kind: "sounds", rounds: Exercises.shuffle(all).slice(0, 10), i: 0, score: 0, mistakes: 0, startedAt: Date.now(), timer: null };
    renderGameShell("Звуки");
    nextSound();
  }
  function nextSound() {
    const g = game;
    if (g.i >= g.rounds.length) { endGame(); return; }
    const { p, tip } = g.rounds[g.i++];
    const targetIdx = Math.random() < 0.5 ? 0 : 2;
    const target = p[targetIdx];
    document.getElementById("gameBar").style.width = `${((g.i - 1) / g.rounds.length) * 100}%`;
    document.getElementById("gameInfo").textContent = `${g.i} / ${g.rounds.length}`;
    const root = document.getElementById("gameRoot");
    root.innerHTML = `
      <div class="ex-head"><span class="ex-kicker">${esc(tip)}</span><h2 class="ex-title">Какое слово прозвучало?</h2></div>
      <div class="listen-row">
        <button class="speak-btn speak-btn--xl" data-again aria-label="Прослушать ещё раз">${SVG.icon("speaker")}</button>
        <button class="speak-btn speak-btn--slow" data-slow aria-label="Медленно">${SVG.icon("turtle")}</button>
      </div>
      <div class="options options--grid">
        ${[0, 2].map((k, i) => `<button class="option sound-option" data-k="${k}"><span class="option__key">${i + 1}</span><span><b>${esc(p[k])}</b><br><small>${esc(p[k + 1])}</small></span></button>`).join("")}
      </div>`;
    const play = (slow) => say(target, slow);
    setTimeout(() => play(false), 250);
    root.querySelector("[data-again]").addEventListener("click", () => play(false));
    root.querySelector("[data-slow]").addEventListener("click", () => play(true));
    let lock = false;
    root.querySelectorAll(".sound-option").forEach((b) => b.addEventListener("click", () => {
      if (lock) return;
      lock = true;
      const ok = Number(b.dataset.k) === targetIdx;
      b.classList.add(ok ? "is-correct" : "is-wrong");
      if (!ok) root.querySelector(`[data-k="${targetIdx}"]`).classList.add("is-correct");
      if (ok) { g.score++; Sound.play("correct"); } else { g.mistakes++; Sound.play("wrong"); }
      setTimeout(() => game === g && nextSound(), ok ? 650 : 1300);
    }));
  }

  /* --- Итог игры: награды и рекорды --- */
  function endGame() {
    const g = game;
    if (!g) return;
    if (g.timer) clearInterval(g.timer);
    game = null;
    const data = d();
    const r = data.records;
    let xp = 0, coins = 0, title = "", subtitle = "", record = false;
    if (g.kind === "speed") {
      xp = g.score;
      coins = Math.min(15, Math.floor(g.score / 2));
      record = g.score > (r.speed || 0);
      if (record) r.speed = g.score;
      title = record ? "Новый рекорд!" : "Время вышло!";
      subtitle = `Верных переводов за минуту: ${g.score}`;
    } else if (g.kind === "pairs") {
      const secs = Math.round((Date.now() - g.startedAt) / 1000) + g.penalty;
      xp = 15;
      coins = 10;
      record = !r.pairs || secs < r.pairs;
      if (record) r.pairs = secs;
      title = record ? "Новый рекорд!" : "Все пары найдены!";
      subtitle = `Время: ${secs} сек${g.penalty ? ` (штраф ${g.penalty} сек)` : ""}`;
    } else {
      xp = g.score * 2;
      coins = g.score >= 8 ? 10 : 5;
      record = g.score > (r.sounds || 0);
      if (record) r.sounds = g.score;
      title = g.score >= 9 ? "Отличный слух!" : record ? "Новый рекорд!" : "Хорошая тренировка!";
      subtitle = `Верно: ${g.score} из ${g.rounds.length}`;
    }
    const s = settle(xp, coins, { startedAt: g.startedAt, correctAnswers: g.score, mistakes: g.mistakes });
    renderResult(Object.assign(s, {
      xp, coins, perfect: g.mistakes === 0 && g.score > 0, title, subtitle,
      mood: record ? "cool" : g.kind === "sounds" && g.score < 5 ? "worried" : "cheer",
      again: () => startGame(g.kind), againLabel: "Сыграть ещё", backPage: "games"
    }));
  }

  /* ======================================================================
     Справочник: грамматика, звуки, правила чтения, почему так пишется
     ====================================================================== */
  let refTab = "grammar";
  let refQuery = "";

  const refTable = (t) => `<div class="ref-table-wrap"><table class="rule__table"><thead><tr>${t.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
    <tbody>${t.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  const sayChip = (w) => `<button class="say-chip" data-say-word="${esc(w)}">${SVG.icon("speaker")}${esc(w)}</button>`;

  function referencePage() {
    const tabs = [["grammar", "Грамматика"], ["sounds", "Звуки"], ["reading", "Правила чтения"], ["why", "Почему так"]];
    return `
      <div class="page">
        <div class="page__head"><h1>Справочник</h1><p>Как устроен английский и почему именно так. Нажимайте на английские слова, чтобы послушать.</p></div>
        <div class="segmented ref-tabs" role="tablist">${tabs.map(([id, label]) => `<button role="tab" aria-selected="${refTab === id}" class="${refTab === id ? "is-active" : ""}" data-ref-tab="${id}">${label}</button>`).join("")}</div>
        <div id="refBody">${refBody()}</div>
      </div>`;
  }

  function refBody() {
    if (refTab === "grammar") {
      const q = refQuery.trim().toLowerCase();
      const list = REF_GRAMMAR.filter((a) => !q || (a.title + " " + a.intro + " " + a.sections.map((s) => s.h + " " + (s.text || "")).join(" ")).toLowerCase().includes(q));
      return `
        <div class="search">${SVG.icon("search")}<input class="input" id="refSearch" type="search" placeholder="Поиск: артикли, времена, предлоги..." value="${esc(refQuery)}" aria-label="Поиск по грамматике"></div>
        <div class="ref-list" id="refList">${list.length ? list.map((a) => `
          <details class="card ref-article">
            <summary><span class="level-chip">${a.level}</span><span class="ref-article__title">${esc(a.title)}</span></summary>
            <p class="ref-article__intro">${a.intro}</p>
            ${a.sections.map((s) => `<div class="ref-section"><h3>${esc(s.h)}</h3>${s.text ? `<p>${s.text}</p>` : ""}${s.table ? refTable(s.table) : ""}</div>`).join("")}
            ${a.examples ? `<div class="rule__examples">${a.examples.map(([en, ru]) => `<div class="rule__ex"><button class="speak-btn" data-say-word="${esc(en)}" aria-label="Прослушать">${SVG.icon("speaker")}</button><div><b>${esc(en)}</b><small>${esc(ru)}</small></div></div>`).join("")}</div>` : ""}
          </details>`).join("") : `<div class="card empty"><div class="empty__fox">${SVG.mascot({ mood: "think" })}</div><p>Ничего не найдено</p></div>`}</div>`;
    }
    if (refTab === "sounds") {
      return REF_SOUNDS.map((g) => `
        <h2 class="ref-h2">${esc(g.group)}</h2>
        <p class="page__lead ref-lead">${esc(g.note)}</p>
        <div class="sound-cards">${g.items.map((s) => `
          <div class="card sound-card">
            <div class="sound-card__ipa">/${s.ipa}/</div>
            <div class="sound-card__like">${esc(s.like)}</div>
            <p class="sound-card__how">${esc(s.how)}</p>
            <div class="sound-card__words">${s.words.map(sayChip).join("")}</div>
          </div>`).join("")}</div>`).join("");
    }
    if (refTab === "reading") {
      return `<div class="ref-list">${REF_READING.map((r, i) => `
        <div class="card ref-rule">
          <h3><span class="ref-rule__num">${i + 1}</span>${esc(r.title)}</h3>
          <p>${r.text}</p>
          ${r.table ? refTable(r.table) : ""}
          ${r.words ? `<div class="sound-card__words">${r.words.map(sayChip).join("")}</div>` : ""}
        </div>`).join("")}</div>`;
    }
    return `
      <div class="card ref-why">
        <div class="ref-why__fox">${SVG.mascot({ mood: "readlaugh" })}</div>
        ${REF_WHY.map((s) => `<div class="ref-section"><h3>${esc(s.h)}</h3><p>${s.text}</p></div>`).join("")}
      </div>`;
  }

  function bindReference(main) {
    main.querySelectorAll("[data-ref-tab]").forEach((b) => b.addEventListener("click", () => {
      refTab = b.dataset.refTab;
      main.querySelectorAll("[data-ref-tab]").forEach((x) => { x.classList.toggle("is-active", x === b); x.setAttribute("aria-selected", x === b); });
      const body = main.querySelector("#refBody");
      body.innerHTML = refBody();
      bindRefBody(body);
    }));
    bindRefBody(main.querySelector("#refBody"));
  }

  function bindRefBody(body) {
    bindSayWords(body);
    const input = body.querySelector("#refSearch");
    if (input) input.addEventListener("input", () => {
      refQuery = input.value;
      const tmp = document.createElement("div");
      tmp.innerHTML = refBody();
      const list = body.querySelector("#refList");
      list.replaceWith(tmp.querySelector("#refList"));
      bindSayWords(body);
    });
  }

  /* ======================================================================
     Словарь: все изученные слова с озвучкой, поиском и фильтрами
     ====================================================================== */
  let dictFilter = "all";
  let dictQuery = "";

  function wordsPage() {
    const data = d();
    const st = data.wordStats;
    const learned = Object.keys(WORDS).filter((k) => data.words.includes(k) || st[k]);
    const due = dueWords().length;
    if (!learned.length) {
      return `
        <div class="page">
          <div class="page__head"><h1>Словарь</h1></div>
          <div class="card empty reveal">
            <div class="empty__fox">${SVG.mascot({ mood: "sleep" })}</div>
            <h3>Здесь пока пусто</h3>
            <p>Пройдите первый урок со словами, и они появятся в словаре. Или добавьте своё слово.</p>
            <button class="btn" data-go="learn">К маршруту</button>
          </div>
          ${addWordForm()}
        </div>`;
    }
    const weak = learned.filter((k) => st[k] && st[k].wrong > 0).length;
    return `
      <div class="page">
        <div class="page__head">
          <h1>Словарь</h1>
          <p>Изучено слов: ${learned.length}. Пора повторить: ${due}.</p>
        </div>
        ${addWordForm()}
        <div class="dict-tools">
          <div class="search">${SVG.icon("search")}<input class="input" id="dictSearch" type="search" placeholder="Поиск по-английски или по-русски" value="${esc(dictQuery)}" aria-label="Поиск слова"></div>
          <div class="chips-row">
            <button class="filter-chip ${dictFilter === "all" ? "is-active" : ""}" data-filter="all">Все (${learned.length})</button>
            <button class="filter-chip ${dictFilter === "due" ? "is-active" : ""}" data-filter="due">К повторению (${due})</button>
            <button class="filter-chip ${dictFilter === "weak" ? "is-active" : ""}" data-filter="weak">Трудные (${weak})</button>
            <button class="btn btn--sm btn--ghost" data-cards style="margin-left:auto">${SVG.icon("words")}Карточки</button>
            <button class="btn btn--sm" data-review>${SVG.icon("repeat")}Повторить</button>
          </div>
        </div>
        <div id="dictList"></div>
      </div>`;
  }

  function addWordForm() {
    return `
      <form class="card add-word reveal" id="addWord" autocomplete="off">
        <div class="widget__title">Добавить своё слово</div>
        <div class="add-word__row">
          <input class="input" name="en" placeholder="Слово по-английски" aria-label="Слово по-английски" maxlength="40" spellcheck="false">
          <input class="input" name="ru" placeholder="Перевод" aria-label="Перевод" maxlength="60">
          <button class="btn btn--sm" type="submit">${SVG.icon("plus")}Добавить</button>
        </div>
        <p class="field__error" id="addWordError" role="alert"></p>
      </form>`;
  }

  function renderDictList() {
    const box = document.getElementById("dictList");
    if (!box) return;
    const data = d();
    const st = data.wordStats;
    const now = Date.now();
    const q = dictQuery.trim().toLowerCase();
    let keys = Object.keys(WORDS).filter((k) => data.words.includes(k) || st[k]);
    if (dictFilter === "due") keys = keys.filter((k) => st[k] && st[k].due <= now);
    if (dictFilter === "weak") keys = keys.filter((k) => st[k] && st[k].wrong > 0);
    if (q) keys = keys.filter((k) => k.includes(q) || WORDS[k].ru.toLowerCase().includes(q));
    if (!keys.length) {
      box.innerHTML = `<div class="card empty"><div class="empty__fox">${SVG.mascot({ mood: "idle" })}</div><p>Ничего не найдено</p></div>`;
      return;
    }
    // Группируем по главам
    const groups = {};
    keys.forEach((k) => (groups[WORDS[k].ui] = groups[WORDS[k].ui] || []).push(k));
    box.innerHTML = Object.keys(groups).sort((a, b) => a - b).map((ui) => `
      <div class="dict-group">
        <div class="dict-group__title">${Number(ui) < 0 ? "Мои слова" : esc(COURSE.units[ui].title)}</div>
        ${groups[ui].map((k) => {
          const w = WORDS[k];
          const s = st[k] || { lvl: 1, wrong: 0 };
          const weakW = s.wrong > 0 && s.lvl <= 2;
          const bars = Array.from({ length: 6 }, (_, i) => `<i class="${i < s.lvl ? "on" : ""}"></i>`).join("");
          return `
            <div class="card word-row">
              <div class="word-row__pic">${w.pic && SVG.hasPic(w.pic) ? SVG.pic(w.pic) : `<span>${esc(w.en[0].toUpperCase())}</span>`}</div>
              <div><div class="word-row__en">${esc(w.en)}</div><div class="word-row__ru">${esc(w.ru)}</div></div>
              <div class="strength ${weakW ? "is-weak" : ""}" title="Насколько хорошо слово запомнено">${bars}</div>
              ${w.custom ? `<button class="icon-btn" data-remove-word="${esc(k)}" aria-label="Удалить слово ${esc(w.en)}" title="Удалить">${SVG.icon("close")}</button>` : Speech.canSay(w.en) ? `<button class="speak-btn" data-say-word="${esc(w.en)}" aria-label="Прослушать ${esc(w.en)}">${SVG.icon("speaker")}</button>` : "<span></span>"}
            </div>`;
        }).join("")}
      </div>`).join("");
    bindSayWords(box);
    box.querySelectorAll("[data-remove-word]").forEach((b) => b.addEventListener("click", () => { removeCustomWord(b.dataset.removeWord); renderPage(); }));
  }

  /* ======================================================================
     Карточки слов: вижу слово, вспоминаю перевод, переворачиваю
     ====================================================================== */
  let cards = null;
  let cardsDir = "en"; // какой стороной показывать: "en" - английский, "ru" - русский

  function cardsDeck() {
    const data = d();
    const st = data.wordStats;
    const learned = Object.keys(WORDS).filter((k) => data.words.includes(k) || st[k]);
    // Сначала слова, которые пора повторить, потом трудные, потом случайные
    const due = dueWords();
    const weak = learned.filter((k) => !due.includes(k) && st[k] && st[k].wrong > 0).sort((a, b) => st[a].lvl - st[b].lvl);
    const rest = Exercises.shuffle(learned.filter((k) => !due.includes(k) && !weak.includes(k)));
    return [...new Set(due.concat(weak, rest))].slice(0, 15);
  }

  function startCards() {
    const keys = cardsDeck();
    if (keys.length < 3) {
      Toast.show({ title: "Мало слов для карточек", text: "Пройдите пару уроков, и слова появятся здесь", icon: SVG.mascot({ mood: "idle" }) });
      return;
    }
    Sound.unlock();
    cards = { queue: keys.slice(), total: keys.length, done: 0, known: 0, forgot: 0, flipped: false, again: {}, errors: [], startedAt: Date.now() };
    $app.innerHTML = `
      <div class="lesson screen-enter">
        <div class="lesson__top">
          <button class="icon-btn" data-act="quit-cards" aria-label="Закрыть карточки">${SVG.icon("close")}</button>
          <div class="progress"><div class="progress__fill" id="cardsBar"></div></div>
          <span class="lesson__count" id="cardsInfo"></span>
        </div>
        <div class="lesson__body" id="cardsRoot"></div>
      </div>`;
    $app.querySelector('[data-act="quit-cards"]').addEventListener("click", () => {
      cards = null;
      Speech.stop();
      Store.save();
      page = "words";
      renderShell();
    });
    showCard();
  }

  function showCard() {
    const c = cards;
    const k = c.queue[0];
    const w = WORDS[k];
    c.flipped = false;
    c.revealed = false;
    document.getElementById("cardsBar").style.width = `${(c.done / c.total) * 100}%`;
    document.getElementById("cardsInfo").textContent = `${c.done} / ${c.total}`;
    const front = cardsDir === "en";
    const pic = w.pic && SVG.hasPic(w.pic) ? SVG.pic(w.pic, "flash__pic") : "";
    const enSide = `${pic}<div class="flash__word">${esc(w.en)}</div>${Speech.canSay(w.en) ? `<button class="speak-btn" type="button" data-say-word="${esc(w.en)}" aria-label="Прослушать">${SVG.icon("speaker")}</button>` : ""}`;
    const ruSide = `<div class="flash__word">${esc(w.ru)}</div>`;
    const root = document.getElementById("cardsRoot");
    root.innerHTML = `
      <div class="flash-head">
        <h2 class="ex-title">${front ? "Вспомните перевод" : "Вспомните английское слово"}</h2>
        <button class="filter-chip" type="button" data-dir>${front ? "EN → RU" : "RU → EN"}</button>
      </div>
      <div class="flash" tabindex="0" role="button" aria-label="Перевернуть карточку">
        <div class="flash__inner">
          <div class="flash__face flash__front">${front ? enSide : ruSide}<span class="flash__hint">Нажмите, чтобы перевернуть</span></div>
          <div class="flash__face flash__back">${front ? ruSide : enSide}<div class="flash__sub">${esc(front ? w.en : w.ru)}</div></div>
        </div>
      </div>
      <div class="flash-actions">
        <button class="btn btn--rose" data-forgot disabled>Не помню</button>
        <button class="btn btn--teal" data-known disabled>Помню</button>
      </div>
      <p class="foot-hint flash-keys">Пробел - перевернуть, 1 - не помню, 2 - помню</p>`;
    const card = root.querySelector(".flash");
    card.addEventListener("click", (e) => { if (!e.target.closest("[data-say-word]")) flipCard(); });
    card.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); flipCard(); } });
    root.querySelectorAll("[data-say-word]").forEach((b) => b.addEventListener("click", () => say(b.dataset.sayWord)));
    root.querySelector("[data-dir]").addEventListener("click", () => { cardsDir = front ? "ru" : "en"; showCard(); });
    root.querySelector("[data-forgot]").addEventListener("click", () => answerCard(false));
    root.querySelector("[data-known]").addEventListener("click", () => answerCard(true));
    if (front) auto(w.en);
  }

  function flipCard() {
    if (!cards) return;
    const root = document.getElementById("cardsRoot");
    const card = root.querySelector(".flash");
    cards.flipped = !cards.flipped;
    cards.revealed = true; // ответ уже видели: можно отвечать, даже если карточку перевернули обратно
    card.classList.toggle("is-flipped", cards.flipped);
    Sound.play("tap");
    root.querySelectorAll("[data-forgot], [data-known]").forEach((b) => (b.disabled = false));
    // После переворота озвучиваем английское слово, если оно на обороте
    if (cards.flipped && cardsDir === "ru") auto(WORDS[cards.queue[0]].en);
  }

  function answerCard(known) {
    const c = cards;
    if (!c || !c.revealed) return;
    const k = c.queue.shift();
    const st = d().wordStats;
    const s = st[k] || (st[k] = { lvl: 0, due: Date.now(), wrong: 0, seen: 0 });
    s.seen++;
    if (known) {
      s.lvl = Math.min(INTERVALS.length - 1, s.lvl + 1);
      s.due = Date.now() + INTERVALS[s.lvl] * DAY;
      c.known++;
      c.done++;
      Sound.play("correct");
    } else {
      s.lvl = 0;
      s.wrong++;
      s.due = Date.now();
      c.forgot++;
      if (!c.errors.some((e) => e.en === WORDS[k].en)) c.errors.push({ en: WORDS[k].en, ru: WORDS[k].ru });
      // Забытое слово вернётся в конце (один раз), иначе засчитываем как пройденное
      if (!c.again[k]) { c.again[k] = 1; c.queue.push(k); c.total++; }
      c.done++;
      Sound.play("wrong");
    }
    Store.save({ silent: true });
    if (c.queue.length) showCard();
    else finishCards();
  }

  function finishCards() {
    const c = cards;
    cards = null;
    const xp = c.known + 3;
    const coins = 3;
    daily().reviews++;
    const s = settle(xp, coins, { startedAt: c.startedAt, correctAnswers: c.known, mistakes: c.forgot });
    renderResult(Object.assign(s, {
      xp, coins, perfect: c.forgot === 0,
      title: c.forgot === 0 ? "Всё помните!" : "Карточки пройдены",
      subtitle: `Вспомнили: ${c.known}. Забытые слова попадут в повторение`,
      mood: c.forgot === 0 ? "cool" : "readlaugh",
      errors: c.errors,
      backPage: "words",
      again: startCards, againLabel: "Ещё карточки"
    }));
  }

  function bindWords(main) {
    const form = main.querySelector("#addWord");
    if (form) form.addEventListener("submit", (e) => {
      e.preventDefault();
      const err = addCustomWord(form.en.value, form.ru.value);
      if (err) { main.querySelector("#addWordError").textContent = err; return; }
      Sound.play("match");
      Toast.show({ title: "Слово добавлено", text: `${esc(form.en.value.trim())}: попадёт в повторение`, icon: SVG.icon("check") });
      renderPage();
      const f2 = document.querySelector("#addWord input[name=en]");
      if (f2) f2.focus();
    });
    main.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => go(b.dataset.go)));
    main.querySelectorAll("[data-review]").forEach((b) => b.addEventListener("click", startReview));
    main.querySelectorAll("[data-yesterday]").forEach((b) => b.addEventListener("click", startYesterday));
    main.querySelectorAll("[data-cards]").forEach((b) => b.addEventListener("click", startCards));
    main.querySelectorAll("[data-filter]").forEach((b) =>
      b.addEventListener("click", () => {
        dictFilter = b.dataset.filter;
        main.querySelectorAll("[data-filter]").forEach((x) => x.classList.toggle("is-active", x === b));
        renderDictList();
      })
    );
    const input = main.querySelector("#dictSearch");
    if (input) input.addEventListener("input", () => { dictQuery = input.value; renderDictList(); });
    renderDictList();
  }

  /* ======================================================================
     Достижения
     ====================================================================== */
  function metric(name) {
    const data = d();
    switch (name) {
      case "lessons":
      case "allLessons": return lessonsDone();
      case "units": return unitsDone();
      case "bestStreak": return data.bestStreak;
      case "xp": return data.xp;
      case "perfect": return data.perfectCount;
      case "words": return data.words.length;
      case "gemsEarned": return data.gemsEarned;
      case "night": return data.flags.night;
      case "morning": return data.flags.morning;
      default: return 0;
    }
  }
  const goalOf = (a) => (a.metric === "allLessons" ? TOTAL : a.goal);

  function checkAchievements() {
    const data = d();
    const fresh = [];
    for (const a of ACHIEVEMENTS) {
      if (data.achievements[a.id]) continue;
      if (metric(a.metric) >= goalOf(a)) {
        data.achievements[a.id] = Date.now();
        fresh.push(a);
      }
    }
    if (fresh.length) Store.save();
    return fresh;
  }

  function achievementsPage() {
    const data = d();
    const got = ACHIEVEMENTS.filter((a) => data.achievements[a.id]).length;
    return `
      <div class="page">
        <div class="page__head">
          <h1>Награды</h1>
          <p>Получено ${got} из ${ACHIEVEMENTS.length}. Значки выдаются за уроки, серии и точность.</p>
        </div>
        ${leaderboard()}
        <div class="badges">
          ${ACHIEVEMENTS.map((a, i) => {
            const have = !!data.achievements[a.id];
            const goal = goalOf(a);
            const val = Math.min(goal, metric(a.metric));
            return `
              <div class="card badge reveal ${have ? "" : "is-locked"}" style="transition-delay:${(i % 6) * 40}ms">
                ${SVG.badge(a.badge, a.colors)}
                <div class="badge__name">${esc(a.title)}</div>
                <div class="badge__desc">${esc(a.desc)}</div>
                ${have
                  ? `<span class="tag">${new Date(data.achievements[a.id]).toLocaleDateString("ru-RU")}</span>`
                  : `<div class="badge__progress"><div class="progress"><div class="progress__fill" style="width:${(val / goal) * 100}%"></div></div><div class="badge__desc" style="margin-top:4px">${val} / ${goal}</div></div>`}
              </div>`;
          }).join("")}
        </div>
      </div>`;
  }

  /* ======================================================================
     Магазин
     ====================================================================== */
  function buy(itemId) {
    const data = d();
    const item = SHOP_ITEMS.find((i) => i.id === itemId);
    if (!item || data.gems < item.price) return false;
    if (itemId === "freeze") {
      if (data.freezes >= 2) return false;
      data.freezes++;
    } else if (item.hat) {
      if (data.owned.includes(item.id)) return false;
      data.owned.push(item.id);
      data.hat = item.hat;
    }
    data.gems -= item.price;
    Store.save();
    Sound.play("coin");
    refreshStats();
    bumpStat("gems");
    Toast.show({ title: "Покупка совершена", text: item.title, icon: SVG.shopPic(item.pic) });
    return true;
  }

  function shopPage() {
    const data = d();
    return `
      <div class="page">
        <div class="page__head">
          <h1>Магазин</h1>
          <p>На счету: <b style="color:var(--amber)">${data.gems}</b> монет. Монеты даются за каждый урок.</p>
        </div>
        <div class="shop-list">
          ${SHOP_ITEMS.map((item) => {
            let btn;
            const afford = data.gems >= item.price;
            const price = `<span class="price">${coinIcon(18)}${item.price}</span>`;
            if (item.id === "freeze") {
              const max = data.freezes >= 2;
              btn = `<button class="btn btn--sm" data-buy="${item.id}" ${max || !afford ? "disabled" : ""}>${max ? `Есть ${data.freezes}` : price}</button>`;
            } else {
              const owned = data.owned.includes(item.id);
              const worn = data.hat === item.hat;
              btn = owned
                ? `<button class="btn btn--sm ${worn ? "btn--ghost" : "btn--blue"}" data-wear="${item.hat}">${worn ? "Снять" : "Надеть"}</button>`
                : `<button class="btn btn--sm" data-buy="${item.id}" ${!afford ? "disabled" : ""}>${price}</button>`;
            }
            return `
              <div class="card shop-item reveal">
                ${SVG.shopPic(item.pic)}
                <div class="shop-item__main">
                  <div class="shop-item__name">${esc(item.title)}</div>
                  <div class="shop-item__desc">${esc(item.desc)}</div>
                </div>
                ${btn}
              </div>`;
          }).join("")}
        </div>
      </div>`;
  }

  function bindShop(main) {
    main.querySelectorAll("[data-buy]").forEach((b) => b.addEventListener("click", () => { if (buy(b.dataset.buy)) renderPage(); }));
    main.querySelectorAll("[data-wear]").forEach((b) =>
      b.addEventListener("click", () => {
        const data = d();
        data.hat = data.hat === b.dataset.wear ? null : b.dataset.wear;
        Store.save();
        Sound.play("tap");
        renderPage();
      })
    );
  }

  /* ======================================================================
     Напоминания о занятии
     Состояние (включено, время, день последнего занятия) кладём в Cache Storage,
     чтобы его видел service worker: он проверяет его при фоновой синхронизации
     (работает в установленном приложении Chrome/Android). Пока приложение открыто,
     хотя бы в фоне, проверяем раз в минуту сами.
     ====================================================================== */
  const REMIND_CACHE = "lq-remind";
  const remindUrl = (name) => new URL("__remind/" + name, location.href).href;
  const canNotify = () => "Notification" in window && "serviceWorker" in navigator && location.protocol.startsWith("http");
  let remindJSON = "";

  function lastActiveDay() {
    const days = Object.keys(d().xpByDay).filter((k) => d().xpByDay[k] > 0).sort();
    return days.length ? days[days.length - 1] : "";
  }

  // Записываем состояние для service worker (только если оно изменилось)
  async function writeRemindState() {
    if (!canNotify() || !d()) return;
    const s = d().settings;
    const state = { on: !!s.remind && Notification.permission === "granted", at: s.remindAt, active: lastActiveDay(), name: Store.user().username };
    const json = JSON.stringify(state);
    if (json === remindJSON) return;
    remindJSON = json;
    try {
      const c = await caches.open(REMIND_CACHE);
      await c.put(remindUrl("state"), new Response(json, { headers: { "Content-Type": "application/json" } }));
    } catch (e) { /* хранилище недоступно - напоминания просто не придут */ }
  }

  // service worker может ещё устанавливаться: ждём не дольше 5 секунд
  function swReady() {
    return Promise.race([navigator.serviceWorker.ready, new Promise((_, rej) => setTimeout(() => rej(new Error("Приложение ещё загружается, попробуйте через минуту")), 5000))]);
  }

  async function registerPeriodic(on) {
    try {
      const reg = await swReady();
      if (!("periodicSync" in reg)) return;
      if (!on) { await reg.periodicSync.unregister("lq-remind"); return; }
      const p = await navigator.permissions.query({ name: "periodic-background-sync" });
      if (p.state === "granted") await reg.periodicSync.register("lq-remind", { minInterval: 60 * 60 * 1000 });
    } catch (e) { /* фоновая проверка не поддерживается */ }
  }

  async function showReminder(test) {
    const reg = await swReady();
    const streak = d().streak;
    await reg.showNotification(test ? "Так будет выглядеть напоминание" : "Время английского", {
      body: streak ? `Сохраните серию: дней подряд ${streak}. Хватит 5 минут` : "Лиса ждёт: один короткий урок, и цель дня ближе",
      icon: "assets/mascot/icon-192.png",
      badge: "assets/mascot/icon-192.png",
      tag: "lq-remind"
    });
  }

  // Проверка раз в минуту, пока приложение открыто
  async function remindTick() {
    if (!canNotify() || !d() || !d().settings.remind || Notification.permission !== "granted") return;
    const now = new Date();
    const today = Store.dayKey();
    const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    if (hhmm < d().settings.remindAt || Store.todayXP() > 0 || !document.hidden) return;
    try {
      const c = await caches.open(REMIND_CACHE);
      const r = await c.match(remindUrl("notified"));
      if (r && (await r.text()) === today) return;
      await c.put(remindUrl("notified"), new Response(today));
      await showReminder(false);
    } catch (e) { /* не получилось - попробуем через минуту */ }
  }

  // Профиль удалён: выключаем напоминания этого профиля
  async function clearReminders() {
    if (!canNotify()) return;
    remindJSON = "";
    try {
      const c = await caches.open(REMIND_CACHE);
      await c.put(remindUrl("state"), new Response(JSON.stringify({ on: false }), { headers: { "Content-Type": "application/json" } }));
    } catch (e) { /* нечего выключать */ }
    registerPeriodic(false);
  }

  // После входа: если напоминание включено, ещё раз просим браузер о фоновой проверке
  function resumeReminders() {
    if (!canNotify() || !d() || !d().settings.remind || Notification.permission !== "granted") return;
    writeRemindState();
    registerPeriodic(true);
  }

  function initReminders() {
    if (!canNotify()) return;
    Store.onSave(() => writeRemindState());
    setInterval(remindTick, 60 * 1000);
  }

  async function setReminder(on) {
    const s = d().settings;
    if (on) {
      let perm = Notification.permission;
      if (perm === "default") perm = await Notification.requestPermission();
      if (perm !== "granted") {
        s.remind = false;
        Store.save();
        Toast.show({ title: "Уведомления запрещены", text: "Разрешите уведомления для этого сайта в настройках браузера и включите снова", icon: SVG.mascot({ mood: "worried" }) });
        return false;
      }
    }
    s.remind = on;
    Store.save();
    await writeRemindState();
    await registerPeriodic(on);
    return true;
  }

  function remindRow() {
    const s = d().settings;
    const ok = canNotify();
    const denied = ok && Notification.permission === "denied";
    const hint = !ok ? "Этот браузер не умеет показывать уведомления. На iPhone сначала установите приложение на экран «Домой»"
      : denied ? "Уведомления для этого сайта запрещены в настройках браузера"
      : "Если к этому времени вы ещё не занимались сегодня, придёт уведомление. Надёжнее всего, когда приложение установлено на телефон";
    return `
          <div class="setting-row">
            <div class="setting-row__label">Напоминание о занятии<small>${hint}</small></div>
            <div class="remind-ctl">
              <input class="input remind-time" type="time" id="remindAt" value="${esc(s.remindAt)}" aria-label="Время напоминания" ${!ok || denied ? "disabled" : ""}>
              <label class="switch"><input type="checkbox" id="remindOn" ${s.remind && ok && !denied ? "checked" : ""} ${!ok || denied ? "disabled" : ""} aria-label="Напоминание о занятии"><span></span></label>
            </div>
          </div>
          ${s.remind && ok && !denied ? `
          <div class="setting-row">
            <div class="setting-row__label">Проверить напоминание<small>Показать пример уведомления сейчас</small></div>
            <button class="btn btn--sm btn--ghost" data-act="test-remind">${SVG.icon("bell")}Показать</button>
          </div>` : ""}`;
  }

  /* ======================================================================
     Неделя в цифрах: итоги недели и сравнение с предыдущей
     ====================================================================== */
  // Понедельник недели, в которую попадает дата
  function mondayOf(date) {
    const x = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
    return x;
  }

  // Статистика за 7 дней, начиная с понедельника start (будущие дни не считаются)
  function weekStats(start) {
    const data = d();
    let xp = 0, days = 0, c = 0, t = 0;
    const words = new Set(), lessonsSet = new Set();
    for (let i = 0; i < 7; i++) {
      const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      const k = Store.dayKey(day);
      const v = data.xpByDay[k] || 0;
      xp += v;
      if (v > 0) days++;
      const a = data.accByDay[k];
      if (a) { c += a.c; t += a.t; }
      const log = data.dayLog[k];
      if (log) { log.w.forEach((w) => words.add(w)); log.l.forEach((l) => lessonsSet.add(l)); }
    }
    const st = data.wordStats;
    const hard = [...words].filter((k) => WORDS[k] && st[k] && st[k].wrong > 0).sort((a, b) => st[b].wrong - st[a].wrong).slice(0, 5);
    return { xp, days, words: words.size, lessons: lessonsSet.size, accuracy: t ? Math.round((c / t) * 100) : null, hard };
  }

  // Русское склонение: plural(5, "урок", "урока", "уроков") -> "уроков"
  function plural(n, one, few, many) {
    const a = Math.abs(n) % 100, b = a % 10;
    if (a > 10 && a < 20) return many;
    if (b === 1) return one;
    if (b >= 2 && b <= 4) return few;
    return many;
  }

  // Строка сравнения с прошлой неделей: стрелка и разница
  function deltaTag(now, before, unit = "") {
    if (!before && !now) return "";
    const diff = now - before;
    if (diff === 0) return `<span class="delta">как на прошлой неделе</span>`;
    return `<span class="delta ${diff > 0 ? "is-up" : "is-down"}">${diff > 0 ? "▲" : "▼"} ${Math.abs(diff)}${unit} к прошлой неделе</span>`;
  }

  function weekReportHTML(cur, prev, title) {
    const rows = [
      { icon: "bolt", value: cur.xp, label: "XP", delta: deltaTag(cur.xp, prev.xp) },
      { icon: "streak", value: `${cur.days} из 7`, label: plural(cur.days, "день", "дня", "дней") + " с занятиями", delta: deltaTag(cur.days, prev.days) },
      { icon: "book", value: cur.lessons, label: plural(cur.lessons, "урок", "урока", "уроков"), delta: deltaTag(cur.lessons, prev.lessons) },
      { icon: "words", value: cur.words, label: plural(cur.words, "слово", "слова", "слов") + " в работе", delta: deltaTag(cur.words, prev.words) },
      { icon: "target", value: cur.accuracy === null ? "-" : `${cur.accuracy}%`, label: "точность", delta: cur.accuracy !== null && prev.accuracy !== null ? deltaTag(cur.accuracy, prev.accuracy, "%") : "" }
    ];
    return `
      <div class="widget__head"><span class="widget__title">${title}</span></div>
      <div class="week-report">
        ${rows.map((r) => `
          <div class="week-report__item">
            <span class="week-report__icon">${SVG.icon(r.icon)}</span>
            <div><div class="week-report__value">${r.value} <small>${r.label}</small></div>${r.delta}</div>
          </div>`).join("")}
      </div>
      ${cur.hard.length ? `<div class="week-report__hard"><span>Трудные слова недели:</span> ${cur.hard.map((k) => `<button class="say-chip" data-say-word="${esc(WORDS[k].en)}">${SVG.icon("speaker")}${esc(WORDS[k].en)} <small>${esc(WORDS[k].ru)}</small></button>`).join("")}</div>` : ""}`;
  }

  // Карточка "Эта неделя" в профиле
  function weekCard() {
    const mon = mondayOf(new Date());
    const prevMon = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() - 7);
    return `<div class="card reveal">${weekReportHTML(weekStats(mon), weekStats(prevMon), "Неделя в цифрах")}</div>`;
  }

  // В начале новой недели один раз показываем итоги прошлой
  function maybeWeekReport() {
    const data = d();
    const mon = mondayOf(new Date());
    const key = Store.dayKey(mon);
    if (data.weekReport === key) return;
    const lastMon = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() - 7);
    const last = weekStats(lastMon);
    data.weekReport = key;
    Store.save({ silent: true });
    if (!last.xp) return; // на прошлой неделе не занимались - нечего показывать
    const before = weekStats(new Date(lastMon.getFullYear(), lastMon.getMonth(), lastMon.getDate() - 7));
    const better = last.xp >= before.xp;
    setTimeout(() => {
      if (!$modal.hidden || lesson || game || cards) return;
      openModal(`
        <div class="modal__pic">${SVG.mascot({ mood: better ? "party" : "determined", hat: data.hat })}</div>
        <h2>Итоги прошлой недели</h2>
        <p class="modal__text">${better ? "Отличная неделя! Вы занимались больше, чем неделей раньше." : "Неделя была спокойнее предыдущей. Небольшой урок сегодня поможет вернуть темп."}</p>
        <div class="modal__week">${weekReportHTML(last, before, "Прошлая неделя")}</div>
        <button class="btn" data-close-btn>Вперёд</button>`, (card) => {
        card.querySelector("[data-close-btn]").onclick = closeModal;
        card.querySelectorAll("[data-say-word]").forEach((b) => b.addEventListener("click", () => say(b.dataset.sayWord)));
      });
    }, 900);
  }

  /* ======================================================================
     Профиль
     ====================================================================== */
  function profilePage() {
    const data = d();
    const user = Store.user();
    const week = Store.weekXP();
    const maxXP = Math.max(20, ...week.map((w) => w.xp));
    const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const accuracy = data.totalAnswers ? Math.round((data.correctAnswers / data.totalAnswers) * 100) : 0;
    const stats = [
      { icon: "streak", value: data.streak, label: `Дней подряд (рекорд ${data.bestStreak})` },
      { icon: "bolt", value: data.xp, label: "Всего опыта" },
      { icon: "book", value: `${lessonsDone()}/${TOTAL}`, label: "Уроков пройдено" },
      { icon: "words", value: data.words.length, label: "Слов изучено" },
      { icon: "target", value: `${accuracy}%`, label: "Точность ответов" },
      { icon: "clock", value: Math.round(data.minutes), label: "Минут занятий" }
    ];
    return `
      <div class="page">
        <div class="profile-head reveal">
          <span class="avatar avatar--lg" style="background:${user.color}">${esc(user.username[0].toUpperCase())}</span>
          <div class="profile-head__info">
            <div class="profile-head__name">${esc(user.username)}</div>
            <div class="profile-head__meta">С нами с ${new Date(user.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}</div>
            <div class="profile-head__meta">Наград: ${Object.keys(data.achievements).length}. Монет: ${data.gems}</div>
          </div>
          <button class="btn btn--sm btn--ghost" data-act="switch">Сменить профиль</button>
        </div>

        <h2>Статистика</h2>
        <div class="stats-grid">
          ${stats.map((s) => `
            <div class="card stat-card reveal">${SVG.icon(s.icon)}
              <div class="stat-card__value">${s.value}</div><div class="stat-card__label">${s.label}</div>
            </div>`).join("")}
        </div>

        <div class="card reveal">
          <div class="widget__head"><span class="widget__title">Опыт за неделю</span><span class="tag">${week.reduce((a, w) => a + w.xp, 0)} XP</span></div>
          <div class="week-chart">
            ${week.map((w, i) => `
              <div class="week-chart__col">
                <span class="week-chart__val">${w.xp || ""}</span>
                <div class="week-chart__bar ${w.xp ? "" : "is-empty"}" style="height:${Math.max(6, Math.round((w.xp / maxXP) * 100))}px;animation-delay:${i * 60}ms"></div>
                <span class="week-chart__day">${days[w.date.getDay()]}</span>
              </div>`).join("")}
          </div>
        </div>

        ${weekCard()}

        ${statsExtra()}

        <h2>Главы</h2>
        <div class="card skills-list reveal">
          ${COURSE.units.map((u, ui) => {
            const done = unitDone(ui);
            return `
              <div class="skill-row">
                <div class="skill-row__icon" style="background:linear-gradient(135deg,${u.colors[0]},${u.colors[1]})">${SVG.unitIcon(u.icon, "")}</div>
                <div class="skill-row__main">
                  <div class="skill-row__top"><span>${esc(u.title)}</span><span>${done}/${u.lessons.length}</span></div>
                  <div class="progress"><div class="progress__fill" style="width:${(done / u.lessons.length) * 100}%;background:linear-gradient(90deg,${u.colors[0]},${u.colors[1]})"></div></div>
                </div>
              </div>`;
          }).join("")}
        </div>
      </div>`;
  }

  function bindProfile(main) {
    main.querySelectorAll("[data-review]").forEach((b) => b.addEventListener("click", startReview));
    main.querySelectorAll("[data-yesterday]").forEach((b) => b.addEventListener("click", startYesterday));
    main.querySelectorAll("[data-cards]").forEach((b) => b.addEventListener("click", startCards));
  }

  /* ======================================================================
     Синхронизация прогресса между устройствами (см. sync.js)
     ====================================================================== */
  let syncTimer = null;
  let syncBusy = false;
  let lastSyncAt = 0;
  const syncCode = () => (d() && d().sync && d().sync.code) || null;

  // Настройки и сам код синхронизации у каждого устройства свои
  function keepLocal(merged, local) {
    merged.sync = local.sync;
    merged.settings = local.settings;
    return merged;
  }

  // Забрать данные другого устройства, объединить и отправить общий результат
  // Синхронизация с облачным аккаунтом: забрать, объединить, отправить
  async function cloudSyncNow({ silent = true } = {}) {
    if (syncBusy) return;
    syncBusy = true;
    const local = d();
    try {
      const s = await Cloud.fresh(Store.cloudSession());
      if (d() !== local) return;
      Store.setCloudSession(Object.assign({}, Store.cloudSession(), s));
      const remote = await Cloud.load(s);
      if (d() !== local) return;
      if (!remote) await Cloud.createProfile(s, Store.user().username, {});
      const rd = remote && remote.data && typeof remote.data === "object" && Object.keys(remote.data).length ? Store.migrateData(JSON.parse(JSON.stringify(remote.data))) : null;
      // После загрузки из файла отправляем его данные как есть
      if (rd && !s.force) {
        const changed = Sync.differs(local, rd);
        const merged = keepLocal(Sync.merge(local, rd, s.base), local);
        if (JSON.stringify(merged) !== JSON.stringify(local)) {
          Store.setData(merged);
          loadCustomWords();
        }
        if (changed) {
          if (!lesson && !game && !cards) renderShell();
          Toast.show({ title: "Прогресс обновлён", text: "Подтянуты данные с другого устройства", icon: SVG.icon("repeat").replace("<svg", '<svg style="color:var(--teal)"') });
        }
      }
      const sent = d();
      const base = snapshot(sent);
      await Cloud.save(s, sent);
      if (d() !== sent) return;
      Store.setCloudSession(Object.assign({}, Store.cloudSession(), { base, force: false, lastSync: Date.now() }));
      lastSyncAt = Date.now();
      if (!silent) Toast.show({ title: "Синхронизировано", icon: SVG.icon("check").replace("<svg", '<svg style="color:var(--teal)"') });
    } catch (e) {
      if (e.code === "no_session") {
        // Сессия устарела: при следующем входе по паролю подключится снова
        Store.setCloudSession(Object.assign({}, Store.cloudSession(), { refresh: null, access: null, expired: true }));
        if (!silent) Toast.show({ title: "Войдите заново", text: "Выйдите из профиля и войдите по имени и паролю", icon: SVG.icon("close") });
      } else if (!silent) {
        Toast.show({ title: "Не получилось синхронизировать", text: navigator.onLine ? esc(e.message) : "Нет интернета, попробуем позже", icon: SVG.icon("close") });
      }
    } finally {
      syncBusy = false;
      const st = document.getElementById("syncStatus");
      if (st) st.textContent = syncStatusText();
    }
  }

  async function syncNow({ silent = true } = {}) {
    if (cloudLinked()) return cloudSyncNow({ silent });
    const code = syncCode();
    if (!code || syncBusy) return;
    syncBusy = true;
    try {
      const local = d();
      const remote = await Sync.download(code);
      // Пока шла загрузка, пользователь мог сменить профиль или отключить синхронизацию
      if (d() !== local || syncCode() !== code) return;
      // После загрузки из файла отправляем его данные как есть, без объединения
      const force = !!(local.sync && local.sync.force);
      if (remote && !force) {
        const changed = Sync.differs(local, remote.data);
        const merged = keepLocal(Sync.merge(local, remote.data, local.sync && local.sync.base), local);
        if (JSON.stringify(merged) !== JSON.stringify(local)) {
          Store.setData(merged);
          loadCustomWords();
        }
        if (changed) {
          if (!lesson && !game && !cards) renderShell();
          Toast.show({ title: "Прогресс обновлён", text: "Подтянуты данные с другого устройства", icon: SVG.icon("repeat").replace("<svg", '<svg style="color:var(--teal)"') });
        }
      }
      const sent = d();
      // Запоминаем, что именно ушло в облако: это основа для следующего объединения
      const base = { gems: sent.gems, freezes: sent.freezes, xp: sent.xp };
      await Sync.upload(code, sent, Store.user() && Store.user().username);
      if (d() !== sent || !d().sync) return;
      d().sync.lastSync = Date.now();
      d().sync.base = base;
      d().sync.force = false;
      Store.save({ silent: true });
      lastSyncAt = Date.now();
      if (!silent) Toast.show({ title: "Синхронизировано", icon: SVG.icon("check").replace("<svg", '<svg style="color:var(--teal)"') });
    } catch (e) {
      if (!silent) Toast.show({ title: "Не получилось синхронизировать", text: navigator.onLine ? esc(e.message) : "Нет интернета, попробуем позже", icon: SVG.icon("close") });
    } finally {
      syncBusy = false;
      const st = document.getElementById("syncStatus");
      if (st) st.textContent = syncStatusText();
    }
  }

  function syncStatusText() {
    const cs = cloudLinked() && Store.cloudSession();
    const t = cs ? cs.lastSync : d() && d().sync && d().sync.lastSync;
    return t ? `Последняя синхронизация: ${new Date(t).toLocaleString("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}` : "Ещё не синхронизировалось";
  }

  // После каждого сохранения отправляем изменения (с задержкой, чтобы не спамить)
  Store.onSave(() => {
    if (!syncCode() && !cloudLinked()) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => syncNow(), 4000);
  });
  // Вернулись в приложение - забираем свежие данные с другого устройства
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && (syncCode() || cloudLinked()) && Date.now() - lastSyncAt > 30000) syncNow();
  });

  function accountSection() {
    const name = esc(Store.user().username);
    if (cloudLinked()) {
      return `
        <h2>Аккаунт</h2>
        <div class="card settings-list reveal">
          <div class="setting-row">
            <div class="setting-row__label">Вы вошли как «${name}»<small>Прогресс сохраняется в облаке. На телефоне или другом компьютере просто войдите с тем же именем и паролем</small></div>
            <span class="tag tag--ok">${SVG.icon("check")}Подключён</span>
          </div>
          <div class="setting-row">
            <div class="setting-row__label">Обмен прогрессом<small id="syncStatus">${syncStatusText()}</small></div>
            <button class="btn btn--sm btn--blue" data-act="sync-now">${SVG.icon("repeat")}Синхронизировать</button>
          </div>
        </div>`;
    }
    const cs = Store.cloudSession();
    return `
      <h2>Аккаунт</h2>
      <div class="card settings-list reveal">
        <div class="setting-row">
          <div class="setting-row__label">Вход с любого устройства<small>${cs && cs.conflict ? `Имя «${name}» уже занято другим аккаунтом. Если это ваш аккаунт, подключите его с паролем от него` : cs && cs.expired ? "Сессия устарела. Подключите аккаунт снова" : "Подключите аккаунт, чтобы входить в этот профиль на телефоне и других устройствах по имени и паролю"}</small></div>
          <button class="btn btn--sm" data-act="cloud-connect">Подключить</button>
        </div>
      </div>`;
  }

  function syncSection() {
    // С подключённым аккаунтом код синхронизации не нужен
    if (cloudLinked()) return accountSection();
    const code = syncCode();
    if (code) {
      return `
        ${accountSection()}
        <h2>Синхронизация по коду</h2>
        <div class="card settings-list reveal">
          <div class="setting-row">
            <div class="setting-row__label">Код синхронизации<small>Введите его на другом устройстве (телефон, планшет, второй компьютер). Никому его не показывайте</small></div>
            <div class="sync-code"><span>${esc(Sync.pretty(code))}</span><button class="btn btn--sm btn--ghost" data-act="sync-copy">Копировать</button></div>
          </div>
          <div class="setting-row">
            <div class="setting-row__label">Обмен прогрессом<small id="syncStatus">${syncStatusText()}</small></div>
            <button class="btn btn--sm btn--blue" data-act="sync-now">${SVG.icon("repeat")}Синхронизировать</button>
          </div>
          <div class="setting-row">
            <div class="setting-row__label">Отключить синхронизацию<small>Прогресс на этом устройстве останется</small></div>
            <button class="btn btn--sm btn--ghost" data-act="sync-off">Отключить</button>
          </div>
        </div>`;
    }
    return `
      ${accountSection()}
      <h2>Синхронизация по коду</h2>
      <div class="card settings-list reveal">
        <div class="setting-row">
          <div class="setting-row__label">Старый способ: код синхронизации<small>Создайте код на этом устройстве и введите его на другом</small></div>
          <button class="btn btn--sm" data-act="sync-create">Создать код</button>
        </div>
        <div class="setting-row">
          <div class="setting-row__label">Уже есть код?<small>Введите код с другого устройства, и прогресс объединится</small></div>
          <div class="sync-join">
            <input class="input" id="syncInput" placeholder="XXXX-XXXX-XXXX-XXXX" maxlength="19" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="Код синхронизации">
            <button class="btn btn--sm btn--blue" data-act="sync-join">Подключить</button>
          </div>
        </div>
        <p class="sync-note">Прогресс хранится на бесплатном сервисе textdb.dev под вашим секретным кодом. Пароль не передаётся. Нужен интернет в момент синхронизации.</p>
      </div>`;
  }

  function bindSync(main) {
    const rerender = () => { const y = scrollY; renderPage(); window.scrollTo({ top: y }); };
    const on = (sel, fn) => { const el = main.querySelector(sel); if (el) el.addEventListener("click", fn); };
    on('[data-act="sync-create"]', async (e) => {
      const btn = e.currentTarget;
      btn.disabled = true;
      const code = Sync.makeCode();
      try {
        await Sync.upload(code, d(), Store.user().username);
        d().sync = { code, lastSync: Date.now() };
        Store.save({ silent: true });
        Toast.show({ title: "Код создан", text: "Введите его на другом устройстве в Настройках", icon: SVG.icon("check") });
        rerender();
      } catch (err) {
        btn.disabled = false;
        Toast.show({ title: "Не получилось создать код", text: navigator.onLine ? esc(err.message) : "Нужен интернет", icon: SVG.icon("close") });
      }
    });
    on('[data-act="sync-join"]', async (e) => {
      const input = main.querySelector("#syncInput");
      const code = Sync.clean(input.value);
      if (!Sync.isValid(code)) {
        Toast.show({ title: "Неверный код", text: "Код состоит из 16 букв и цифр", icon: SVG.icon("close") });
        return;
      }
      const btn = e.currentTarget;
      btn.disabled = true;
      try {
        const remote = await Sync.download(code);
        if (!remote) throw new Error("По этому коду ничего не найдено. Проверьте код");
        const r = remote.data;
        const ok = await confirmModal({
          pic: `<div class="modal__pic">${SVG.mascot({ mood: "love" })}</div>`,
          title: "Объединить прогресс?",
          text: `На другом устройстве: ${Number(r.xp) || 0} XP, уроков ${Object.keys(r.completed || {}).length}. Здесь: ${Number(d().xp) || 0} XP, уроков ${lessonsDone()}. Пройденные уроки, слова и награды объединятся.`,
          ok: "Объединить",
          okClass: "",
          cancel: "Отмена"
        });
        if (!ok) { btn.disabled = false; return; }
        const local = d();
        const merged = keepLocal(Sync.merge(local, r), local);
        merged.sync = { code, lastSync: Date.now() };
        Store.setData(merged);
        loadCustomWords();
        await Sync.upload(code, d(), Store.user().username);
        lastSyncAt = Date.now();
        Toast.show({ title: "Устройства связаны", text: "Прогресс теперь общий", icon: SVG.icon("check") });
        renderShell();
        go("settings");
      } catch (err) {
        btn.disabled = false;
        Toast.show({ title: "Не получилось подключиться", text: navigator.onLine ? esc(err.message) : "Нужен интернет", icon: SVG.icon("close") });
      }
    });
    on('[data-act="sync-now"]', () => syncNow({ silent: false }));
    on('[data-act="cloud-connect"]', () => askNewPassword(true));
    on('[data-act="sync-copy"]', async () => {
      const code = Sync.pretty(syncCode());
      try { await navigator.clipboard.writeText(code); Toast.show({ title: "Код скопирован", text: code, icon: SVG.icon("check") }); }
      catch (e) { Toast.show({ title: "Скопируйте код вручную", text: code, icon: SVG.icon("check") }); }
    });
    on('[data-act="sync-off"]', async () => {
      const ok = await confirmModal({
        pic: `<div class="modal__pic">${SVG.mascot({ mood: "worried" })}</div>`,
        title: "Отключить синхронизацию?",
        text: "Это устройство перестанет обмениваться прогрессом. Код можно будет ввести снова.",
        ok: "Отключить",
        cancel: "Оставить"
      });
      if (!ok) return;
      d().sync = null;
      Store.save({ silent: true });
      rerender();
    });
  }

  /* Расширенная статистика: календарь занятий, точность, трудные слова */
  function statsExtra() {
    const data = d();
    // Календарь за 15 недель: колонки - недели, строки - дни (пн..вс)
    const today = new Date(Store.dayKey() + "T00:00:00");
    const offset = (today.getDay() + 6) % 7; // пн = 0
    const start = Store.shiftDay(Store.dayKey(), -(14 * 7 + offset));
    const cells = [];
    let activeDays = 0;
    for (let i = 0; i < 15 * 7; i++) {
      const key = Store.shiftDay(start, i);
      const future = i > 14 * 7 + offset;
      const xp = data.xpByDay[key] || 0;
      if (xp) activeDays++;
      const lvl = future ? -1 : xp === 0 ? 0 : xp < 15 ? 1 : xp < 30 ? 2 : xp < 60 ? 3 : 4;
      cells.push(`<i class="heat__cell lvl-${lvl}" title="${key}: ${xp} XP"></i>`);
    }
    // Точность за 7 дней
    const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const acc = Store.weekXP().map((w) => {
      const a = data.accByDay[w.key];
      return { day: days[w.date.getDay()], val: a && a.t ? Math.round((a.c / a.t) * 100) : null };
    });
    // Трудные слова: больше всего ошибок
    const st = data.wordStats;
    const hard = Object.keys(st).filter((k) => WORDS[k] && st[k].wrong > 0).sort((a, b) => st[b].wrong - st[a].wrong).slice(0, 8);
    return `
      <div class="card reveal">
        <div class="widget__head"><span class="widget__title">Календарь занятий</span><span class="tag">${activeDays} дн. за 15 недель</span></div>
        <div class="heat">
          <div class="heat__days"><span>Пн</span><span></span><span>Ср</span><span></span><span>Пт</span><span></span><span>Вс</span></div>
          <div class="heat__grid">${cells.join("")}</div>
        </div>
        <div class="heat__legend"><span>Меньше</span><i class="heat__cell lvl-0"></i><i class="heat__cell lvl-1"></i><i class="heat__cell lvl-2"></i><i class="heat__cell lvl-3"></i><i class="heat__cell lvl-4"></i><span>Больше</span></div>
      </div>

      <div class="card reveal">
        <div class="widget__head"><span class="widget__title">Точность ответов за неделю</span></div>
        <div class="acc-row">
          ${acc.map((a) => `<div class="acc-day"><div class="acc-day__val ${a.val === null ? "is-empty" : a.val >= 80 ? "is-good" : a.val >= 50 ? "is-mid" : "is-low"}">${a.val === null ? "-" : a.val + "%"}</div><span>${a.day}</span></div>`).join("")}
        </div>
      </div>

      <div class="card reveal">
        <div class="widget__head"><span class="widget__title">Самые трудные слова</span>${hard.length ? `<button class="btn btn--sm" data-review>${SVG.icon("repeat")}Повторить</button>` : ""}</div>
        ${hard.length
          ? `<div class="hard-words">${hard.map((k) => `<button class="hard-word" data-say-word="${esc(WORDS[k].en)}"><b>${esc(WORDS[k].en)}</b><small>${esc(WORDS[k].ru)}</small><span class="tag">ошибок: ${st[k].wrong}</span></button>`).join("")}</div>`
          : `<p class="widget__body">Пока ни одной ошибки. Так держать!</p>`}
      </div>`;
  }

  /* Рейтинг профилей на этом устройстве (по опыту за 7 дней) */
  function leaderboard() {
    const me = Store.user().username;
    const users = Store.listUsers().sort((a, b) => b.weekXP - a.weekXP || b.xp - a.xp);
    if (users.length < 2) {
      return `<div class="card reveal leader-empty"><div class="leader-empty__fox">${SVG.mascot({ mood: "hello" })}</div><div><div class="widget__title">Рейтинг на устройстве</div><p class="widget__body">Создайте ещё профили на этом устройстве (например, для семьи или друга), и здесь появится соревнование по опыту за неделю.</p></div></div>`;
    }
    return `
      <div class="card reveal">
        <div class="widget__head"><span class="widget__title">Рейтинг на устройстве</span><span class="tag">опыт за 7 дней</span></div>
        <div class="leader">
          ${users.map((u, i) => `
            <div class="leader__row ${u.username === me ? "is-me" : ""}">
              <span class="leader__place">${i + 1}</span>
              <span class="avatar" style="background:${u.color}">${esc(u.username[0].toUpperCase())}</span>
              <span class="leader__name">${esc(u.username)}${u.username === me ? " (вы)" : ""}<small>всего ${u.xp} XP, дней подряд: ${u.streak}</small></span>
              <b class="leader__xp">${u.weekXP} XP</b>
            </div>`).join("")}
        </div>
      </div>`;
  }

  /* ======================================================================
     Настройки
     ====================================================================== */
  function voiceOptions() {
    const s = d().settings;
    const list = Speech.getVoices();
    if (!list.length) return `<option value="">Английских голосов нет</option>`;
    const cur = Speech.currentVoice();
    return list.map((v, i) => {
      const nice = /Natural|Neural|Online|Premium|Enhanced|Google/i.test(v.name);
      const label = `${v.name.replace(/^Microsoft\s+/i, "").replace(/\s*-\s*English.*$/i, "")} (${v.lang})${nice ? ", естественный" : ""}${i === 0 ? ", рекомендуем" : ""}`;
      const selected = s.voice ? v.voiceURI === s.voice : cur && v.voiceURI === cur.voiceURI;
      return `<option value="${esc(v.voiceURI)}" ${selected ? "selected" : ""}>${esc(label)}</option>`;
    }).join("");
  }

  function settingsPage() {
    const data = d();
    const s = data.settings;
    const seg = (name, items, value) =>
      `<div class="segmented" role="radiogroup">${items.map((it) => `<button type="button" role="radio" aria-checked="${it.v === value}" class="${it.v === value ? "is-active" : ""}" data-${name}="${it.v}">${it.icon ? SVG.icon(it.icon) : ""}${it.label}</button>`).join("")}</div>`;
    const rates = [{ v: 0.75, label: "Медленно" }, { v: 0.9, label: "Обычно" }, { v: 1.05, label: "Быстро" }];
    const curRate = rates.reduce((a, b) => (Math.abs(b.v - s.rate) < Math.abs(a.v - s.rate) ? b : a)).v;
    return `
      <div class="page">
        <div class="page__head"><h1>Настройки</h1><p>Изменения сохраняются сразу.</p></div>

        <h2>Озвучка</h2>
        <div class="card settings-list reveal">
          <div class="setting-row">
            <div class="setting-row__label">Озвучка слов<small>${Speech.hasRecorded() ? "Все слова и фразы курса записаны заранее приятным американским голосом и работают без интернета" : "Произношение через синтез речи браузера"}</small></div>
            <label class="switch"><input type="checkbox" data-set="speech" ${s.speech ? "checked" : ""} aria-label="Озвучка слов"><span></span></label>
          </div>
          <div class="setting-row">
            <div class="setting-row__label">Проверить звук<small>Прослушать пример фразы</small></div>
            <button class="btn btn--sm btn--blue" data-act="test-voice" aria-label="Прослушать голос">${SVG.icon("speaker")}Прослушать</button>
          </div>
          <div class="setting-row">
            <div class="setting-row__label">Скорость речи<small>Как быстро говорит голос</small></div>
            ${seg("rate", rates, curRate)}
          </div>
          <div class="setting-row">
            <div class="setting-row__label">Озвучивать автоматически<small>Произносить новые слова сами. Если выключить, звук будет только по кнопке и в заданиях на слух</small></div>
            <label class="switch"><input type="checkbox" data-set="autoSpeak" ${s.autoSpeak ? "checked" : ""} aria-label="Озвучивать автоматически"><span></span></label>
          </div>
          <div class="setting-row">
            <div class="setting-row__label">Задания на говорение<small>${SpeechRec.supported ? "Произносите фразы в микрофон. Работает в Chrome и Edge, нужен интернет" : "Этот браузер не умеет распознавать речь. Откройте приложение в Chrome или Edge"}</small></div>
            <label class="switch"><input type="checkbox" data-set="speaking" ${s.speaking !== false && SpeechRec.supported ? "checked" : ""} ${SpeechRec.supported ? "" : "disabled"} aria-label="Задания на говорение"><span></span></label>
          </div>
          ${Speech.getVoices().length ? `
          <div class="setting-row">
            <div class="setting-row__label">Запасной голос<small>Нужен только для фраз без записи. Обычно не используется</small></div>
            <div class="voice-pick"><select class="select" id="voiceSelect" aria-label="Запасной голос">${voiceOptions()}</select></div>
          </div>` : ""}
        </div>

        <h2>Оформление и цели</h2>
        <div class="card settings-list reveal">
          <div class="setting-row">
            <div class="setting-row__label">Тема<small>Тёмная, светлая или как в системе</small></div>
            ${seg("theme", [{ v: "dark", label: "Тёмная", icon: "moon" }, { v: "light", label: "Светлая", icon: "sun" }, { v: "system", label: "Авто", icon: "monitor" }], s.theme)}
          </div>
          <div class="setting-row">
            <div class="setting-row__label">Звуковые эффекты<small>Сигналы правильных и неправильных ответов</small></div>
            <label class="switch"><input type="checkbox" data-set="sound" ${s.sound ? "checked" : ""} aria-label="Звуковые эффекты"><span></span></label>
          </div>
          <div class="setting-row">
            <div class="setting-row__label">Цель на день<small>Сколько XP набирать ежедневно</small></div>
            ${seg("goal", RULES.dailyGoals.map((g) => ({ v: g, label: String(g) })), data.dailyGoal)}
          </div>
          ${remindRow()}
        </div>

        ${syncSection()}

        <h2>Резервная копия</h2>
        <div class="card settings-list reveal">
          <div class="setting-row">
            <div class="setting-row__label">Сохранить прогресс в файл<small>Пригодится, если очистится браузер или нужно перенести прогресс на другой компьютер</small></div>
            <button class="btn btn--sm btn--ghost" data-act="export">${SVG.icon("download")}Скачать</button>
          </div>
          <div class="setting-row">
            <div class="setting-row__label">Загрузить прогресс из файла<small>Заменит текущий прогресс этого профиля данными из копии</small></div>
            <button class="btn btn--sm btn--ghost" data-act="import">${SVG.icon("upload")}Загрузить</button>
            <input type="file" id="importFile" accept=".json,application/json" hidden>
          </div>
        </div>

        <h2>Профиль</h2>
        <div class="card settings-list reveal">
          <div class="setting-row">
            <div class="setting-row__label">Сменить профиль<small>Вернуться к экрану входа</small></div>
            <button class="btn btn--sm btn--ghost" data-act="switch">${SVG.icon("logout")}Выйти</button>
          </div>
          <div class="setting-row">
            <div class="setting-row__label">Удалить профиль<small>Весь прогресс этого профиля будет стёрт с устройства. Версия приложения ${APP_VERSION}</small></div>
            <button class="btn btn--sm btn--rose" data-act="delete">Удалить</button>
          </div>
        </div>
      </div>`;
  }

  function bindSettings(main) {
    bindSync(main);
    const rerender = () => { const y = scrollY; renderPage(); window.scrollTo({ top: y }); };
    main.querySelectorAll("[data-theme]").forEach((b) =>
      b.addEventListener("click", () => {
        d().settings.theme = b.dataset.theme;
        Store.setDevice({ theme: b.dataset.theme });
        Store.save();
        applyTheme(b.dataset.theme);
        rerender();
      })
    );
    main.querySelectorAll("[data-goal]").forEach((b) =>
      b.addEventListener("click", () => {
        d().dailyGoal = Number(b.dataset.goal);
        Store.save();
        const rail = document.getElementById("rail");
        rail.innerHTML = railHTML();
        bindShellCommon(rail);
        Reveal.observe(document);
        rerender();
      })
    );
    main.querySelectorAll("[data-rate]").forEach((b) =>
      b.addEventListener("click", () => {
        d().settings.rate = Number(b.dataset.rate);
        Speech.setRate(d().settings.rate);
        Store.save();
        rerender();
        say("This is how fast I speak.");
      })
    );
    main.querySelectorAll("[data-set]").forEach((inp) =>
      inp.addEventListener("change", () => {
        d().settings[inp.dataset.set] = inp.checked;
        Store.save();
        applySettings();
        if (inp.dataset.set === "sound" && inp.checked) Sound.play("correct");
      })
    );
    const sel = main.querySelector("#voiceSelect");
    if (sel) {
      sel.addEventListener("change", () => {
        d().settings.voice = sel.value || null;
        Speech.setVoice(d().settings.voice);
        Store.save();
      });
    }
    main.querySelector('[data-act="test-voice"]').addEventListener("click", () => say("Hello! Nice to meet you. How are you today?"));
    // Напоминания
    const remindOn = main.querySelector("#remindOn");
    if (remindOn) remindOn.addEventListener("change", async () => {
      const ok = await setReminder(remindOn.checked);
      if (ok && remindOn.checked) Toast.show({ title: "Напоминание включено", text: `Каждый день в ${d().settings.remindAt}, если ещё не было занятий`, icon: SVG.icon("bell") });
      rerender();
    });
    const remindAt = main.querySelector("#remindAt");
    if (remindAt) remindAt.addEventListener("change", () => {
      if (!/^\d\d:\d\d$/.test(remindAt.value)) return;
      d().settings.remindAt = remindAt.value;
      Store.save();
    });
    const testRemind = main.querySelector('[data-act="test-remind"]');
    if (testRemind) testRemind.addEventListener("click", () => showReminder(true).catch((e) => Toast.show({ title: "Не удалось показать уведомление", text: esc(e.message || "Проверьте разрешения браузера"), icon: SVG.mascot({ mood: "worried" }) })));

    // Резервная копия: скачивание файла
    main.querySelector('[data-act="export"]').addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(Store.exportData(), null, 1)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `linguaquest-${Store.user().username}-${Store.dayKey()}.json`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
      Toast.show({ title: "Копия сохранена", text: "Файл в папке загрузок", icon: SVG.icon("download") });
    });
    // Резервная копия: загрузка файла
    const fileInput = main.querySelector("#importFile");
    main.querySelector('[data-act="import"]').addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", async () => {
      const f = fileInput.files[0];
      fileInput.value = "";
      if (!f) return;
      let obj;
      try { obj = JSON.parse(await f.text()); } catch (e) { obj = null; }
      if (!obj || obj.app !== "LinguaQuest") {
        Toast.show({ title: "Не получилось загрузить", text: "Это не файл резервной копии LinguaQuest", icon: SVG.icon("close") });
        return;
      }
      const ok = await confirmModal({
        pic: `<div class="modal__pic">${SVG.mascot({ mood: "determined" })}</div>`,
        title: "Загрузить копию?",
        text: `Прогресс из файла (${esc(String(obj.username || "без имени"))}, ${Number(obj.data && obj.data.xp) || 0} XP) заменит текущий прогресс профиля.`,
        ok: "Загрузить",
        okClass: "",
        cancel: "Отмена"
      });
      if (!ok) return;
      try {
        Store.importData(obj);
        if (cloudLinked()) Store.setCloudSession(Object.assign({}, Store.cloudSession(), { force: true }));
        applySettings();
        renderShell();
        Toast.show({ title: "Прогресс загружен", icon: SVG.icon("check") });
      } catch (e) {
        Toast.show({ title: "Ошибка загрузки", text: esc(e.message), icon: SVG.icon("close") });
      }
    });
    main.querySelector('[data-act="delete"]').addEventListener("click", async () => {
      const ok = await confirmModal({
        pic: `<div class="modal__pic">${SVG.mascot({ mood: "cry" })}</div>`,
        title: "Удалить профиль?",
        text: cloudLinked()
          ? `Профиль «${esc(Store.user().username)}» будет удалён с этого устройства. Аккаунт и прогресс в облаке сохранятся: войти снова можно по имени и паролю.`
          : `Профиль «${esc(Store.user().username)}» и весь его прогресс будут удалены с этого устройства. Это нельзя отменить.`,
        ok: "Удалить навсегда",
        cancel: "Оставить"
      });
      if (ok) {
        Store.deleteCurrent();
        clearReminders();
        renderAuth();
        Toast.show({ title: "Профиль удалён", icon: SVG.icon("close") });
      }
    });
  }

  /* ======================================================================
     Клавиатура: Enter - проверить/продолжить, 1-9 - выбор варианта, Esc - закрыть окно
     ====================================================================== */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$modal.hidden) {
      closeModal();
      return;
    }
    // Карточки: пробел переворачивает, 1 - не помню, 2 - помню
    if (cards && $modal.hidden && document.getElementById("cardsRoot")) {
      if (e.target.tagName === "INPUT") return;
      if (e.key === " ") { e.preventDefault(); flipCard(); }
      else if (e.key === "1") answerCard(false);
      else if (e.key === "2") answerCard(true);
      return;
    }
    // Цифры 1-4 в играх "60 секунд" и "Звуки"
    if (game && $modal.hidden && /^[1-4]$/.test(e.key)) {
      const btns = document.querySelectorAll("#gameRoot .options .option");
      if (btns[Number(e.key) - 1]) btns[Number(e.key) - 1].click();
      return;
    }
    if (!lesson || !$modal.hidden) return;
    const inText = e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT";
    if (e.key === "Enter" && !e.shiftKey) {
      // Enter на сфокусированной кнопке варианта не перехватываем
      if (!inText && e.target.tagName === "BUTTON" && e.target.id !== "mainBtn") return;
      e.preventDefault();
      onMain();
      return;
    }
    if (!inText && lesson.phase === "answer" && /^[1-9]$/.test(e.key) && lesson.ctrl && lesson.ctrl.select) {
      const btns = document.querySelectorAll("#exRoot .option, #exRoot .pic-card");
      const i = Number(e.key) - 1;
      if (btns[i]) lesson.ctrl.select(i);
    }
  });

  // Прогресс изменился в другой вкладке: показываем свежие данные
  Store.onExternal(() => {
    loadCustomWords();
    if (!lesson && !game && !cards) renderShell();
  });

  // Сохраняем прогресс при закрытии вкладки
  window.addEventListener("beforeunload", () => Store.save());
  document.addEventListener("visibilitychange", () => { if (document.hidden) Store.save(); });

  /* ======================================================================
     Запуск
     ====================================================================== */
  function init() {
    Background.init();
    initReminders();
    // Офлайн-кэш и установка на телефон работают, только если сайт открыт по http(s)
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      navigator.serviceWorker.register("sw.js").then((reg) => {
        // Проверяем обновления при каждом возвращении в приложение
        document.addEventListener("visibilitychange", () => { if (!document.hidden) reg.update().catch(() => {}); });
      }).catch(() => {});
      // Новая версия приложения установилась: перезагружаемся, как только пользователь не в уроке
      let hadController = !!navigator.serviceWorker.controller;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!hadController) { hadController = true; return; } // первая установка, перезагрузка не нужна
        const reloadWhenFree = () => {
          if (lesson || game || cards || !$modal.hidden) { setTimeout(reloadWhenFree, 3000); return; }
          Store.save({ silent: true });
          location.reload();
        };
        reloadWhenFree();
      });
    }
    if (Store.restore()) {
      applySettings();
      const s = Store.checkStreak();
      renderShell();
      streakToasts(s);
      syncNow();
      maybeWeekReport();
      resumeReminders();
      // Старый профиль без аккаунта: один раз рассказываем про вход с любого устройства
      if (!Store.cloudSession()) {
        Store.setCloudSession({ hinted: true });
        setTimeout(() => Toast.show({ title: "Новое: вход с любого устройства", text: "Подключите аккаунт в Настройках, раздел «Аккаунт»", icon: SVG.mascot({ mood: "hello" }), duration: 6000 }), 1500);
      }
    } else {
      renderAuth();
    }
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", App.init);
