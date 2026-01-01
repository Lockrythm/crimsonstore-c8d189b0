import vampiricLiterature from "@/assets/products/vampiric-literature.jpg";
import draftingSet from "@/assets/products/drafting-set.jpg";
import alchemyBook from "@/assets/products/alchemy-book.jpg";
import bloodAmulet from "@/assets/products/blood-amulet.jpg";
import grimoire from "@/assets/products/grimoire.jpg";
import medicineBook from "@/assets/products/medicine-book.jpg";
import laptop from "@/assets/products/laptop.jpg";
import backpack from "@/assets/products/backpack.jpg";
import notebook from "@/assets/products/notebook.jpg";

export type ProductStatus = "pending" | "approved" | "rejected";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  sellerId: string;
  sellerName: string;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  status: ProductStatus;
  createdAt: string;
}

export const categories: Category[] = [
  { id: "1", name: "Vampiric Lore", slug: "vampiric-lore" },
  { id: "2", name: "Electronics", slug: "electronics" },
  { id: "3", name: "Alchemy", slug: "alchemy" },
  { id: "4", name: "Grimoires", slug: "grimoires" },
  { id: "5", name: "Accessories", slug: "accessories" },
  { id: "6", name: "Stationery", slug: "stationery" },
];

export const products: Product[] = [
  {
    id: "1",
    sellerId: "user1",
    sellerName: "DarkScholar",
    categoryId: "1",
    title: "Vampiric Literature & Lore",
    description: "A comprehensive collection of vampire mythology and literature spanning centuries.",
    price: 45.00,
    imageUrl: vampiricLiterature,
    status: "approved",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    sellerId: "user2",
    sellerName: "NightCrafter",
    categoryId: "5",
    title: "Gothic Drafting Set",
    description: "Professional drafting tools in elegant black velvet case. Perfect for architecture students.",
    price: 89.99,
    imageUrl: draftingSet,
    status: "approved",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    sellerId: "user3",
    sellerName: "AlchemistPrime",
    categoryId: "3",
    title: "Alchemy 101",
    description: "Introduction to alchemical principles and transmutation theory.",
    price: 32.50,
    imageUrl: alchemyBook,
    status: "approved",
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    sellerId: "user1",
    sellerName: "DarkScholar",
    categoryId: "5",
    title: "Blood Amulet (USB Drive)",
    description: "32GB USB drive disguised as a gothic blood crystal pendant. Style meets function.",
    price: 24.99,
    imageUrl: bloodAmulet,
    status: "approved",
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    sellerId: "user4",
    sellerName: "ShadowMage",
    categoryId: "4",
    title: "Grimoires & Textbooks",
    description: "Collection of occult reference materials and mystical study guides.",
    price: 67.00,
    imageUrl: grimoire,
    status: "approved",
    createdAt: "2024-01-11",
  },
  {
    id: "6",
    sellerId: "user5",
    sellerName: "MorticianMed",
    categoryId: "1",
    title: "Dark History of Medicine",
    description: "Exploring the macabre origins of modern medical practices.",
    price: 38.00,
    imageUrl: medicineBook,
    status: "approved",
    createdAt: "2024-01-10",
  },
  {
    id: "7",
    sellerId: "user6",
    sellerName: "TechVamp",
    categoryId: "2",
    title: "Gaming Laptop",
    description: "High-performance laptop with RGB lighting. RTX 4070, 16GB RAM.",
    price: 1299.00,
    imageUrl: laptop,
    status: "approved",
    createdAt: "2024-01-09",
  },
  {
    id: "8",
    sellerId: "user7",
    sellerName: "NightWalker",
    categoryId: "5",
    title: "Gothic Leather Backpack",
    description: "Premium black leather backpack with hidden compartments.",
    price: 156.00,
    imageUrl: backpack,
    status: "approved",
    createdAt: "2024-01-08",
  },
  {
    id: "9",
    sellerId: "user8",
    sellerName: "BatWriter",
    categoryId: "6",
    title: "Bat Emblem Notebook",
    description: "Leather-bound journal with silver bat clasp. 200 pages.",
    price: 28.00,
    imageUrl: notebook,
    status: "approved",
    createdAt: "2024-01-07",
  },
  {
    id: "10",
    sellerId: "user9",
    sellerName: "PendingUser",
    categoryId: "1",
    title: "Rare Vampire Manuscript",
    description: "Ancient text detailing vampire hunting techniques.",
    price: 199.99,
    imageUrl: vampiricLiterature,
    status: "pending",
    createdAt: "2024-01-20",
  },
];

export const getFeaturedItems = () => products.filter(p => p.status === "approved").slice(0, 4);
export const getFeaturedBooks = () => products.filter(p => p.status === "approved" && (p.categoryId === "1" || p.categoryId === "4")).slice(0, 4);
export const getMarketplaceItems = () => products.filter(p => p.status === "approved" && p.categoryId === "2" || p.categoryId === "5" || p.categoryId === "6");
export const getPendingItems = () => products.filter(p => p.status === "pending");
export const getApprovedItems = () => products.filter(p => p.status === "approved");
