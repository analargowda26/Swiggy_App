const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Restaurant = require("./models/Restaurant");
const MenuItem = require("./models/MenuItem");

dotenv.config();

const sampleRestaurants = [
  {
    name: "McDonald's",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
    cuisine: ["American", "Fast Food", "Burgers"],
    rating: 4.2,
    deliveryTime: "20-25 mins",
    foodType: "non-veg",
    address: "MG Road, Bangalore",
  },
  {
    name: "KFC",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800",
    cuisine: ["American", "Fast Food", "Chicken"],
    rating: 4.3,
    deliveryTime: "25-30 mins",
    foodType: "non-veg",
    address: "Koramangala, Bangalore",
  },
  {
    name: "Domino's Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    cuisine: ["Italian", "Pizza", "Fast Food"],
    rating: 4.1,
    deliveryTime: "30-35 mins",
    foodType: "non-veg",
    address: "Indiranagar, Bangalore",
  },
  {
    name: "Subway",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    cuisine: ["American", "Sandwiches", "Healthy"],
    rating: 4.0,
    deliveryTime: "20-25 mins",
    foodType: "non-veg",
    address: "Brigade Road, Bangalore",
  },
  {
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
    cuisine: ["American", "Fast Food", "Burgers"],
    rating: 4.2,
    deliveryTime: "25-30 mins",
    foodType: "non-veg",
    address: "Whitefield, Bangalore",
  },
  {
    name: "Pizza Hut",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
    cuisine: ["Italian", "Pizza", "Fast Food"],
    rating: 4.0,
    deliveryTime: "30-35 mins",
    foodType: "non-veg",
    address: "Jayanagar, Bangalore",
  },
  {
    name: "Starbucks",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800",
    cuisine: ["Cafe", "Coffee", "Beverages"],
    rating: 4.4,
    deliveryTime: "15-20 mins",
    foodType: "veg",
    address: "UB City, Bangalore",
  },
  {
    name: "Taco Bell",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
    cuisine: ["Mexican", "Fast Food", "Tacos"],
    rating: 3.9,
    deliveryTime: "25-30 mins",
    foodType: "non-veg",
    address: "Electronic City, Bangalore",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://anala:anala@scooplabs.erb5owr.mongodb.net/swiggy"
    );
    console.log("MongoDB connected");

    // Clear old data
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});
    console.log("Old data cleared");

    // Add restaurants
    const restaurants = await Restaurant.insertMany(sampleRestaurants);
    console.log("Sample restaurants added");

    // Menu items for McDonald's
    const mcdonaldsMenuItems = [
      {
        restaurantId: restaurants[0]._id,
        name: "Big Mac",
        description:
          "Two 100% beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun",
        price: 350,
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400",
        category: "Burgers",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[0]._id,
        name: "McChicken",
        description: "Crispy chicken patty with lettuce and mayo",
        price: 180,
        image:
          "https://images.unsplash.com/photo-1562447945-f37d54c6a5ca?w=400",
        category: "Burgers",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[0]._id,
        name: "McVeggie Burger",
        description: "Delicious veggie patty with lettuce, tomato and mayo",
        price: 140,
        image:
          "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400",
        category: "Burgers",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[0]._id,
        name: "McAloo Tikki Burger",
        description: "Spiced potato patty with onions and tomato",
        price: 60,
        image:
          "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400",
        category: "Burgers",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[0]._id,
        name: "French Fries - Regular",
        description: "World famous golden french fries",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
        category: "Sides",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[0]._id,
        name: "French Fries - Large",
        description: "Large serving of crispy golden fries",
        price: 140,
        image:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
        category: "Sides",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[0]._id,
        name: "McFlurry Oreo",
        description: "Vanilla soft serve with Oreo cookie pieces",
        price: 120,
        image:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
        category: "Desserts",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[0]._id,
        name: "Chicken McNuggets - 6 Pcs",
        description: "Crispy chicken nuggets",
        price: 180,
        image:
          "https://images.unsplash.com/photo-1562967914-608f82629710?w=400",
        category: "Sides",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[0]._id,
        name: "Apple Pie",
        description: "Warm apple pie with cinnamon",
        price: 80,
        image:
          "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=400",
        category: "Desserts",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[0]._id,
        name: "Soft Drink - Coca Cola",
        description: "Refreshing Coca Cola",
        price: 80,
        image:
          "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400",
        category: "Beverages",
        foodType: "veg",
      },
    ];

    // Menu items for KFC
    const kfcMenuItems = [
      {
        restaurantId: restaurants[1]._id,
        name: "Zinger Burger",
        description: "Spicy crispy chicken fillet with lettuce and mayo",
        price: 200,
        image:
          "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400",
        category: "Burgers",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[1]._id,
        name: "Veg Zinger Burger",
        description: "Crispy veg patty with lettuce and mayo",
        price: 180,
        image:
          "https://images.unsplash.com/photo-1585238341710-4a1b89999980?w=400",
        category: "Burgers",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[1]._id,
        name: "Bucket - 9 Pcs Chicken",
        description: "Signature crispy fried chicken pieces",
        price: 650,
        image:
          "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400",
        category: "Chicken",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[1]._id,
        name: "Hot Wings - 4 Pcs",
        description: "Spicy chicken wings",
        price: 200,
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400",
        category: "Chicken",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[1]._id,
        name: "Popcorn Chicken",
        description: "Bite-sized crispy chicken popcorn",
        price: 150,
        image:
          "https://images.unsplash.com/photo-1562967914-608f82629710?w=400",
        category: "Snacks",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[1]._id,
        name: "Veg Strips",
        description: "Crispy vegetable strips",
        price: 130,
        image:
          "https://images.unsplash.com/photo-1619740455993-6b78c726f1ff?w=400",
        category: "Snacks",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[1]._id,
        name: "Coleslaw",
        description: "Fresh cabbage slaw with creamy dressing",
        price: 80,
        image:
          "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400",
        category: "Sides",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[1]._id,
        name: "French Fries",
        description: "Crispy seasoned french fries",
        price: 90,
        image:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
        category: "Sides",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[1]._id,
        name: "Corn on the Cob",
        description: "Buttery sweet corn",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400",
        category: "Sides",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[1]._id,
        name: "Chocolate Mousse",
        description: "Rich chocolate mousse cake",
        price: 110,
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
        category: "Desserts",
        foodType: "veg",
      },
    ];

    // Menu items for Domino's
    const dominosMenuItems = [
      {
        restaurantId: restaurants[2]._id,
        name: "Margherita Pizza",
        description: "Classic pizza with cheese and tomato sauce",
        price: 300,
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
        category: "Pizza",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[2]._id,
        name: "Farmhouse Pizza",
        description: "Delicious pizza loaded with vegetables",
        price: 400,
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
        category: "Pizza",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[2]._id,
        name: "Paneer Tikka Pizza",
        description: "Pizza with paneer tikka and capsicum",
        price: 450,
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
        category: "Pizza",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[2]._id,
        name: "Mexican Green Wave Pizza",
        description: "Pizza with jalapeños, capsicum, onion, and tomato",
        price: 420,
        image:
          "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400",
        category: "Pizza",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[2]._id,
        name: "Chicken Dominator",
        description: "Pizza loaded with chicken toppings",
        price: 550,
        image:
          "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400",
        category: "Pizza",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[2]._id,
        name: "Pepperoni Pizza",
        description: "Classic pepperoni pizza",
        price: 500,
        image:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
        category: "Pizza",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[2]._id,
        name: "Garlic Breadsticks",
        description: "Freshly baked breadsticks with garlic seasoning",
        price: 120,
        image:
          "https://images.unsplash.com/photo-1573140401552-388e3b0f7a35?w=400",
        category: "Sides",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[2]._id,
        name: "Stuffed Garlic Bread",
        description: "Garlic bread stuffed with cheese",
        price: 150,
        image:
          "https://images.unsplash.com/photo-1573140401552-388e3b0f7a35?w=400",
        category: "Sides",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[2]._id,
        name: "Pasta Italiano",
        description: "Creamy white sauce pasta",
        price: 180,
        image:
          "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
        category: "Pasta",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[2]._id,
        name: "Choco Lava Cake",
        description: "Warm chocolate cake with molten center",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
        category: "Desserts",
        foodType: "veg",
      },
    ];

    // Menu items for Subway
    const subwayMenuItems = [
      {
        restaurantId: restaurants[3]._id,
        name: "Veggie Delite Sub",
        description: "Loaded with fresh vegetables and sauces",
        price: 180,
        image:
          "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400",
        category: "Subs",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[3]._id,
        name: "Paneer Tikka Sub",
        description: "Grilled paneer tikka with veggies",
        price: 220,
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
        category: "Subs",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[3]._id,
        name: "Aloo Patty Sub",
        description: "Spiced potato patty sub with vegetables",
        price: 160,
        image:
          "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400",
        category: "Subs",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[3]._id,
        name: "Corn & Peas Sub",
        description: "Sweet corn and peas with creamy sauce",
        price: 190,
        image:
          "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400",
        category: "Subs",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[3]._id,
        name: "Chicken Teriyaki Sub",
        description: "Grilled chicken with teriyaki sauce and veggies",
        price: 280,
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
        category: "Subs",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[3]._id,
        name: "Chicken Tikka Sub",
        description: "Indian style chicken tikka sub",
        price: 260,
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
        category: "Subs",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[3]._id,
        name: "Tuna Sub",
        description: "Tuna salad with lettuce, tomato, and mayo",
        price: 300,
        image:
          "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400",
        category: "Subs",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[3]._id,
        name: "Cookies - Chocolate Chip",
        description: "Freshly baked chocolate chip cookies",
        price: 60,
        image:
          "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
        category: "Desserts",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[3]._id,
        name: "Nachos",
        description: "Crispy nachos with salsa",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400",
        category: "Sides",
        foodType: "veg",
      },
    ];

    // Menu items for Burger King
    const burgerKingMenuItems = [
      {
        restaurantId: restaurants[4]._id,
        name: "Whopper",
        description:
          "Flame-grilled beef patty with lettuce, tomato, mayo, pickles, and onions",
        price: 250,
        image:
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400",
        category: "Burgers",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[4]._id,
        name: "Chicken Royale",
        description: "Crispy chicken fillet with lettuce and mayo",
        price: 200,
        image:
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400",
        category: "Burgers",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[4]._id,
        name: "Veg Whopper",
        description: "Flame-grilled veg patty with all the toppings",
        price: 180,
        image:
          "https://images.unsplash.com/photo-1585238341710-4a1b89999980?w=400",
        category: "Burgers",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[4]._id,
        name: "Paneer King Burger",
        description: "Crispy paneer patty with special sauce",
        price: 190,
        image:
          "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400",
        category: "Burgers",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[4]._id,
        name: "Crispy Veg Burger",
        description: "Crispy vegetable patty burger",
        price: 120,
        image:
          "https://images.unsplash.com/photo-1585238341710-4a1b89999980?w=400",
        category: "Burgers",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[4]._id,
        name: "Onion Rings",
        description: "Crispy fried onion rings",
        price: 90,
        image:
          "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400",
        category: "Sides",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[4]._id,
        name: "French Fries",
        description: "Golden crispy fries",
        price: 80,
        image:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
        category: "Sides",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[4]._id,
        name: "Chocolate Shake",
        description: "Thick chocolate milkshake",
        price: 120,
        image:
          "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
        category: "Beverages",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[4]._id,
        name: "Vanilla Shake",
        description: "Creamy vanilla milkshake",
        price: 110,
        image:
          "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400",
        category: "Beverages",
        foodType: "veg",
      },
    ];

    // Menu items for Pizza Hut
    const pizzaHutMenuItems = [
      {
        restaurantId: restaurants[5]._id,
        name: "Pan Pizza - Margherita",
        description: "Classic pizza with tomato sauce and cheese",
        price: 350,
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
        category: "Pizza",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[5]._id,
        name: "Veggie Supreme",
        description: "Loaded with mushrooms, olives, peppers, and onions",
        price: 420,
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
        category: "Pizza",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[5]._id,
        name: "Triple Cheese Pizza",
        description: "Three types of cheese on a crispy crust",
        price: 450,
        image:
          "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400",
        category: "Pizza",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[5]._id,
        name: "Paneer Special Pizza",
        description: "Indian style paneer pizza",
        price: 480,
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
        category: "Pizza",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[5]._id,
        name: "Pepperoni Pizza",
        description: "Loaded with pepperoni and cheese",
        price: 500,
        image:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
        category: "Pizza",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[5]._id,
        name: "Chicken Wings - 6 Pcs",
        description: "Spicy buffalo chicken wings",
        price: 300,
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400",
        category: "Sides",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[5]._id,
        name: "Garlic Bread",
        description: "Buttery garlic bread",
        price: 110,
        image:
          "https://images.unsplash.com/photo-1573140401552-388e3b0f7a35?w=400",
        category: "Sides",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[5]._id,
        name: "Breadsticks with Cheese Dip",
        description: "Crispy breadsticks with cheese sauce",
        price: 140,
        image:
          "https://images.unsplash.com/photo-1573140401552-388e3b0f7a35?w=400",
        category: "Sides",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[5]._id,
        name: "Brownie with Ice Cream",
        description: "Warm brownie topped with vanilla ice cream",
        price: 150,
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
        category: "Desserts",
        foodType: "veg",
      },
    ];

    // Menu items for Starbucks
    const starbucksMenuItems = [
      {
        restaurantId: restaurants[6]._id,
        name: "Caffe Latte",
        description: "Espresso with steamed milk",
        price: 280,
        image:
          "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400",
        category: "Coffee",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[6]._id,
        name: "Cappuccino",
        description: "Espresso with foamy steamed milk",
        price: 260,
        image:
          "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
        category: "Coffee",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[6]._id,
        name: "Caramel Macchiato",
        description: "Espresso with vanilla, steamed milk, and caramel",
        price: 320,
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
        category: "Coffee",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[6]._id,
        name: "Mocha Frappuccino",
        description: "Blended coffee with chocolate and whipped cream",
        price: 350,
        image:
          "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
        category: "Coffee",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[6]._id,
        name: "Green Tea Latte",
        description: "Matcha green tea with steamed milk",
        price: 290,
        image:
          "https://images.unsplash.com/photo-1536013597213-c49c6e1d2b8c?w=400",
        category: "Tea",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[6]._id,
        name: "Chocolate Croissant",
        description: "Buttery croissant with chocolate filling",
        price: 180,
        image:
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
        category: "Bakery",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[6]._id,
        name: "Blueberry Muffin",
        description: "Freshly baked muffin with blueberries",
        price: 150,
        image:
          "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400",
        category: "Bakery",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[6]._id,
        name: "Cheesecake",
        description: "Rich and creamy cheesecake",
        price: 220,
        image:
          "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400",
        category: "Desserts",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[6]._id,
        name: "Panini - Veggie",
        description: "Grilled veggie panini sandwich",
        price: 240,
        image:
          "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400",
        category: "Food",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[6]._id,
        name: "Spinach & Corn Sandwich",
        description: "Toasted sandwich with spinach and corn",
        price: 200,
        image:
          "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400",
        category: "Food",
        foodType: "veg",
      },
    ];

    // Menu items for Taco Bell
    const tacoBellMenuItems = [
      {
        restaurantId: restaurants[7]._id,
        name: "Crunchy Taco",
        description:
          "Crispy taco shell with seasoned beef, lettuce, and cheese",
        price: 120,
        image:
          "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
        category: "Tacos",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[7]._id,
        name: "Soft Taco - Veggie",
        description: "Soft flour tortilla with beans, lettuce, and cheese",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
        category: "Tacos",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[7]._id,
        name: "Black Bean Taco",
        description: "Taco filled with seasoned black beans and veggies",
        price: 110,
        image:
          "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
        category: "Tacos",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[7]._id,
        name: "Burrito Supreme",
        description:
          "Flour tortilla filled with beef, beans, cheese, and sour cream",
        price: 250,
        image:
          "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400",
        category: "Burritos",
        foodType: "non-veg",
      },
      {
        restaurantId: restaurants[7]._id,
        name: "Bean Burrito",
        description: "Burrito filled with refried beans and cheese",
        price: 180,
        image:
          "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400",
        category: "Burritos",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[7]._id,
        name: "Veggie Burrito Bowl",
        description: "Bowl with rice, beans, veggies, and cheese",
        price: 220,
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
        category: "Bowls",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[7]._id,
        name: "Nachos Supreme",
        description: "Tortilla chips topped with cheese, beans, and jalapenos",
        price: 180,
        image:
          "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400",
        category: "Sides",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[7]._id,
        name: "Cheese Quesadilla",
        description: "Grilled tortilla with melted cheese",
        price: 160,
        image:
          "https://images.unsplash.com/photo-1618040996337-2c3838f25b17?w=400",
        category: "Sides",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[7]._id,
        name: "Mexican Rice",
        description: "Seasoned rice with tomatoes and spices",
        price: 90,
        image:
          "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400",
        category: "Sides",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[7]._id,
        name: "Cinnamon Twists",
        description: "Sweet crispy cinnamon dessert",
        price: 70,
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
        category: "Desserts",
        foodType: "veg",
      },
    ];

    await MenuItem.insertMany([
      ...mcdonaldsMenuItems,
      ...kfcMenuItems,
      ...dominosMenuItems,
      ...subwayMenuItems,
      ...burgerKingMenuItems,
      ...pizzaHutMenuItems,
      ...starbucksMenuItems,
      ...tacoBellMenuItems,
    ]);
    console.log("Sample menu items added");

    mongoose.connection.close();
    console.log("Database seeded successfully with global food brands!");
  } catch (error) {
    console.error("Error:", error);
  }
};

seedDB();