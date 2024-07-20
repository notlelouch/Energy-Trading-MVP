# Energy-Trading-MVP

energy-trading-platform/
├── backend/
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   └── dto/
│   │   │   ├── users/
│   │   │   │   ├── users.module.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   ├── users.controller.ts
│   │   │   │   └── dto/
│   │   │   ├── energy-listings/
│   │   │   │   ├── energy-listings.module.ts
│   │   │   │   ├── energy-listings.service.ts
│   │   │   │   ├── energy-listings.controller.ts
│   │   │   │   └── dto/
│   │   │   ├── purchases/
│   │   │   │   ├── purchases.module.ts
│   │   │   │   ├── purchases.service.ts
│   │   │   │   ├── purchases.controller.ts
│   │   │   │   └── dto/
│   │   │   ├── transactions/
│   │   │   │   ├── transactions.module.ts
│   │   │   │   ├── transactions.service.ts
│   │   │   │   ├── transactions.controller.ts
│   │   │   │   └── dto/
│   │   │   ├── consumption/
│   │   │   │   ├── consumption.module.ts
│   │   │   │   ├── consumption.service.ts
│   │   │   │   ├── consumption.controller.ts
│   │   │   │   └── dto/
│   │   │   └── revenue-distribution/
│   │   │       ├── revenue-distribution.module.ts
│   │   │       ├── revenue-distribution.service.ts
│   │   │       ├── revenue-distribution.controller.ts
│   │   │       └── dto/
│   ├── test/
│   ├── nest-cli.json
│   ├── tsconfig.json
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── index.svelte
│   │   │   ├── login.svelte
│   │   │   ├── signup.svelte
│   │   │   ├── profile.svelte
│   │   │   ├── list-energy.svelte
│   │   │   ├── buy-energy.svelte
│   │   │   ├── my-listings.svelte
│   │   │   ├── my-purchases.svelte
│   │   │   ├── transaction-history.svelte
│   │   │   └── [dynamic].svelte (for dynamic routes)
│   │   ├── components/
│   │   │   ├── Header.svelte
│   │   │   ├── Footer.svelte
│   │   │   ├── Sidebar.svelte
│   │   │   ├── EnergyListing.svelte
│   │   │   └── PurchaseFlow.svelte
│   │   ├── stores/
│   │   │   ├── authStore.js
│   │   │   ├── energyStore.js
│   │   │   └── transactionStore.js
│   │   ├── lib/
│   │   │   ├── api.js
│   │   │   └── utils.js
│   │   ├── app.html
│   │   ├── global.css
│   │   └── main.js
│   ├── static/
│   ├── svelte.config.js
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── .gitignore
├── README.md
└── package.json
