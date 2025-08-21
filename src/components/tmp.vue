<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <div class="grid grid-cols-[auto,1fr,auto] h-20 items-center gap-6">
    <!-- Logo + Name -->
    <RouterLink to="/" class="flex items-center gap-2">
      <span class="inline-grid place-items-center h-10 w-10 rounded-lg bg-[#0d6b4d] text-white shadow">
        <BuildingLibraryIcon class="h-5 w-5" />
      </span>
      <span class="font-semibold tracking-tight text-slate-900">Nour Essalam</span>
    </RouterLink>

    <!-- Nav -->
    <nav class="hidden md:flex items-center justify-center gap-8 text-[15px] font-medium">
      <RouterLink to="/" :class="isActive('/') ? 'text-[#0d6b4d] underline underline-offset-8 decoration-2' : 'text-slate-600 hover:text-[#0d6b4d]'">Accueil</RouterLink>
      <RouterLink to="/" :class="isActive('/') ? 'text-[#0d6b4d] underline underline-offset-8 decoration-2' : 'text-slate-600 hover:text-[#0d6b4d]'">Présentation</RouterLink>
      <RouterLink to="/recap" :class="isActive('/recap') ? 'text-[#0d6b4d] underline underline-offset-8 decoration-2' : 'text-slate-600 hover:text-[#0d6b4d]'">Suivi</RouterLink>
    </nav>

    <!-- Contact + Mobile Button -->
    <div class="flex items-center justify-end gap-3">
      <button @click="mobileOpen = !mobileOpen" class="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:text-[#0d6b4d] hover:bg-slate-50 ring-1 ring-slate-200">
        <Bars3Icon v-if="!mobileOpen" class="h-6 w-6" />
        <XMarkIcon v-else class="h-6 w-6" />
      </button>
      <div class="hidden lg:flex items-center gap-6 text-sm text-slate-600">
        <div class="hidden xl:block h-6 w-px bg-slate-200 mr-6"></div>
        <a href="tel:+33143910692" class="inline-flex items-center gap-2 hover:text-[#0d6b4d]">
          <PhoneIcon class="h-4 w-4" />
          <span>{{ phone }}</span>
        </a>
        <a href="mailto:vitry-sur-seine.nour-essalam@al-muminune.org" class="inline-flex items-center gap-2 hover:text-[#0d6b4d]">
          <EnvelopeIcon class="h-4 w-4" />
          <span>{{ email }}</span>
        </a>
      </div>
    </div>
  </div>