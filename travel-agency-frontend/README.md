# Travel Agency — React Frontend

A full React frontend for the [TravelAgency Laravel API](https://github.com/Una1n/TravelAgency).

## Project structure

```
src/
├── api/
│   └── client.js           ← All API calls in one place
├── components/
│   ├── ui/
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Pagination.jsx
│   │   ├── Select.jsx
│   │   ├── Spinner.jsx
│   │   ├── Textarea.jsx
│   │   └── Toast.jsx
│   ├── Header.jsx
│   ├── TourCard.jsx
│   └── TravelCard.jsx
├── context/
│   └── AuthContext.jsx      ← Token + user global state
├── hooks/
│   └── useToast.js
├── pages/
│   ├── admin/
│   │   ├── AdminPanel.jsx
│   │   ├── AdminTours.jsx
│   │   ├── AdminTravels.jsx
│   │   └── AdminUsers.jsx
│   ├── LoginPage.jsx
│   ├── ToursPage.jsx
│   └── TravelsPage.jsx
├── App.jsx                  ← Root shell + routing
├── index.js
└── theme.js                 ← Colours + fonts
```

## Setup

1. Make sure the Laravel backend is running on `http://localhost:8000`
2. Copy `.env` and set the API URL if needed:
   ```
   REACT_APP_API_URL=http://localhost:8000/api/v1
   ```
3. Install and run:
   ```bash
   npm install
   npm start
   ```

## Default credentials

```
admin@example.com / password
```

## Features

| Feature | Who |
|---|---|
| Browse public travels | Everyone |
| View tours per travel | Everyone |
| Filter tours by price, date, sort | Everyone |
| Login / logout | Everyone |
| Create travel | Admin |
| Edit travel | Admin + Editor |
| Create tour | Admin |
| Create user | Admin |
