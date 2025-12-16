import { Recipe } from "./types";

export const dummyRecipes: Recipe[] = [
  {
    id: "1",
    title: "Creamy Garlic Butter Chicken",
    description:
      "Tender chicken breasts cooked in a rich garlic butter sauce. Perfect for quick weeknight dinners.",
    imageUrl: "https://images.unsplash.com/photo-1604908177522-f8a0c69f4b67",
    cookingTime: 25,
    serving: 2,
    difficulty: "easy",
    category: "Chicken",
    createdAt: "2024-12-01T10:30:00Z",
    user: {
      id: "u1",
      name: "Emily Carter",
      avatarUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  },
  {
    id: "2",
    title: "Spicy Thai Basil Fried Rice",
    description:
      "A classic Thai street food dish made with basil, chili, and aromatic rice.",
    imageUrl: "https://images.unsplash.com/photo-1605478580704-d56b89339e2f",
    cookingTime: 20,
    serving: 1,
    difficulty: "medium",
    category: "Asian",
    createdAt: "2024-12-02T08:20:00Z",
    user: {
      id: "u2",
      name: "Liam Johnson",
      avatarUrl: "https://randomuser.me/api/portraits/men/14.jpg",
    },
  },
  {
    id: "3",
    title: "Classic Italian Margherita Pizza",
    description:
      "Homemade pizza topped with fresh mozzarella, tomatoes, and basil leaves.",
    imageUrl: "https://images.unsplash.com/photo-1548365328-7e0a4c4f7a31",
    cookingTime: 30,
    serving: 4,
    difficulty: "medium",
    category: "Italian",
    createdAt: "2024-12-03T15:10:00Z",
    user: {
      id: "u3",
      name: "Mia Hernandez",
      avatarUrl: "https://randomuser.me/api/portraits/women/22.jpg",
    },
  },
  {
    id: "4",
    title: "Beef Ramen Bowl",
    description:
      "A warm and comforting ramen bowl loaded with beef, veggies, and soy-seasoned broth.",
    imageUrl: "https://images.unsplash.com/photo-1601924582971-c9dc4376a18f",
    cookingTime: 40,
    serving: 2,
    difficulty: "hard",
    category: "Asian",
    createdAt: "2024-12-04T09:45:00Z",
    user: {
      id: "u4",
      name: "Ethan Wilson",
      avatarUrl: "https://randomuser.me/api/portraits/men/18.jpg",
    },
  },
  {
    id: "5",
    title: "Avocado Toast with Poached Egg",
    description:
      "Toasted sourdough topped with smashed avocado and a perfectly poached egg.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    cookingTime: 10,
    serving: 1,
    difficulty: "easy",
    category: "Breakfast",
    createdAt: "2024-12-05T12:00:00Z",
    user: {
      id: "u5",
      name: "Sophia Lee",
      avatarUrl: "https://randomuser.me/api/portraits/women/27.jpg",
    },
  },
  {
    id: "6",
    title: "Vegetarian Burrito Bowl",
    description:
      "A healthy bowl loaded with rice, beans, corn, salsa, and guacamole.",
    imageUrl: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85",
    cookingTime: 20,
    serving: 2,
    difficulty: "easy",
    category: "Mexican",
    createdAt: "2024-12-06T11:15:00Z",
    user: {
      id: "u6",
      name: "Noah Kim",
      avatarUrl: "https://randomuser.me/api/portraits/men/31.jpg",
    },
  },
  {
    id: "7",
    title: "Butter Paneer Curry",
    description:
      "Rich tomato-based curry with soft paneer cubes, inspired by Indian flavors.",
    imageUrl: "https://images.unsplash.com/photo-1608759265518-9b962be5d1d4",
    cookingTime: 35,
    serving: 3,
    difficulty: "medium",
    category: "Indian",
    createdAt: "2024-12-07T14:50:00Z",
    user: {
      id: "u7",
      name: "Aria Patel",
      avatarUrl: "https://randomuser.me/api/portraits/women/34.jpg",
    },
  },
  {
    id: "8",
    title: "Salmon Teriyaki",
    description:
      "Glazed salmon with a sweet and savory teriyaki sauce served over rice.",
    imageUrl: "https://images.unsplash.com/photo-1621996346565-083a4cbb18f1",
    cookingTime: 25,
    serving: 2,
    difficulty: "medium",
    category: "Japanese",
    createdAt: "2024-12-08T17:30:00Z",
    user: {
      id: "u8",
      name: "Oliver Chen",
      avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  },
  {
    id: "9",
    title: "Chocolate Lava Cake",
    description:
      "A rich molten chocolate cake with a gooey center. Perfect dessert for any occasion.",
    imageUrl: "https://images.unsplash.com/photo-1599785209798-e5c3d3df6b4c",
    cookingTime: 15,
    serving: 2,
    difficulty: "hard",
    category: "Dessert",
    createdAt: "2024-12-09T19:05:00Z",
    user: {
      id: "u9",
      name: "Ava Brown",
      avatarUrl: "https://randomuser.me/api/portraits/women/41.jpg",
    },
  },
  {
    id: "10",
    title: "Grilled Shrimp Skewers",
    description:
      "Juicy shrimp marinated in garlic and lemon, grilled to perfection.",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754",
    cookingTime: 15,
    serving: 4,
    difficulty: "easy",
    category: "Seafood",
    createdAt: "2024-12-10T09:40:00Z",
    user: {
      id: "u10",
      name: "Daniel Silva",
      avatarUrl: "https://randomuser.me/api/portraits/men/52.jpg",
    },
  },
];
