# React Pizza

Навчальний pet-project інтернет-магазину піци, створений на React.  
Проєкт демонструє побудову багатосторінкового застосунку з каталогом піц, сторінками окремих товарів, сторінками соусів, конструктором піци та кошиком із підрахунком суми замовлення.

## Demo

[Live Demo](https://ara-bara.github.io/react-pizza)

## Features

- каталог піц на головній сторінці
- сторінка окремого продукту
- сторінки соусів
- конструктор піци з вибором інгредієнтів
- додавання товарів у кошик
- зміна кількості товарів у кошику
- видалення товарів із кошика
- автоматичний підрахунок subtotal
- автоматична знижка при сумі замовлення від 1000 грн
- scroll to top при переходах між сторінками
- фільтрація та сортування товарів

## Tech Stack

- React
- React Router DOM
- JavaScript
- SCSS / CSS Modules
- Bootstrap
- Normalize.css

## Project Structure

```bash
src
├── assets
├── components
│   ├── Catalog
│   ├── Footer
│   ├── Header
│   ├── Sauce
│   ├── Slider
│   └── UI
├── hooks
│   ├── useCart.js
│   ├── useFilterSort.js
│   └── useScrollToTop.js
├── pages
│   ├── Home
│   ├── PizzaConstructor
│   ├── ProductPage
│   ├── SaucePage
│   └── SaucesPage
├── styles
├── App.js
└── index.js
