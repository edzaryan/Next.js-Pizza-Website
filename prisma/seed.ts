
import { Prisma } from "@prisma/client";
import { prisma } from "./prisma-client";
import { categories, ingredients, products } from "./constants";
import bcrypt from "bcrypt";
import { connect } from "http2";


const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
}

const generateProductItem = (
    { 
        productId, 
        pizzaType, 
        size 
    }: { 
        productId: number; 
        pizzaType?: 1 | 2;
        size?: 20 | 30 | 40;
    }) => {
        // Calculate price based on size (larger = more expensive)
        let basePrice = 190;
        if (size === 20) basePrice = 190; // Small
        if (size === 30) basePrice = 290; // Medium  
        if (size === 40) basePrice = 390; // Large
        
        return {
            productId,
            price: basePrice + randomDecimalNumber(0, 100), // Base price + small random variation
            pizzaType,
            size
        } as Prisma.ProductItemUncheckedCreateInput
}

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: "User",
                email: "user@example.com",
                password: bcrypt.hashSync("123456", 10),
                verified: new Date(),
                role: "USER",
            },
            {
                fullName: "Admin Admin",
                email: "admin@example.com",
                password: bcrypt.hashSync("123456", 10),
                verified: new Date(),
                role: "ADMIN",
            }
        ]
    });

    await prisma.category.createMany({
        data: categories
    });

    await prisma.ingredient.createMany({
        data: ingredients
    });

    await prisma.product.createMany({
        data: products
    });

    const pizza1 = await prisma.product.create({
        data: {
            name: "Pepperoni pizza",
            imageUrl: 
                "https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.jpg",
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5)
            }
        }
    });

    const pizza2 = await prisma.product.create({
        data: {
            name: "Cheese pizza",
            imageUrl: 
                "https://media.dodostatic.net/image/r:584x584/0198bf40eb1171aabe90b1b3ce07c0c5.avif",
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10)
            }
        }
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: "Chorizo ​​fresh",
            imageUrl: 
                "https://media.dodostatic.net/image/r:584x584/0198bf4f806371f19d529f9e9e7dba36.avif",
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 40)
            }
        }
    });

    await prisma.productItem.createMany({
        data: [
            // Пицца "Пепперони фреш"
            generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

            // Пицца "Сырная"
            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

            // Пицца "Чоризо фреш"
            generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

            // Остальные продукты
            generateProductItem({ productId: 1 }),
            generateProductItem({ productId: 2 }),
            generateProductItem({ productId: 3 }),
            generateProductItem({ productId: 4 }),
            generateProductItem({ productId: 5 }),
            generateProductItem({ productId: 6 }),
            generateProductItem({ productId: 7 }),
            generateProductItem({ productId: 8 }),
            generateProductItem({ productId: 9 }),
            generateProductItem({ productId: 10 }),
            generateProductItem({ productId: 11 }),
            generateProductItem({ productId: 12 }),
            generateProductItem({ productId: 13 }),
            generateProductItem({ productId: 14 }),
            generateProductItem({ productId: 15 }),
            generateProductItem({ productId: 16 }),
            generateProductItem({ productId: 17 }),
        ]
    });

    await prisma.cart.createMany({
        data: [
            { 
                userId: 1,
                totalAmount: 0,
                token: "11111"
            },
            {
                userId: 2,
                totalAmount: 0,
                token: "22222"
            }
        ]
    });

    await prisma.cartItem.create({
        data: {
            productItemId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
            }
        }
    });

    // Add 2nd cart item
    await prisma.cartItem.create({
        data: {
            productItemId: 3,
            cartId: 1,
            quantity: 1,
            ingredients: {
                connect: [{ id: 4 }, { id: 5 }]
            }
        }
    });

    // Add 3rd cart item
    await prisma.cartItem.create({
        data: {
            productItemId: 5,
            cartId: 1,
            quantity: 3,
            ingredients: {
                connect: [{ id: 1 }, { id: 6 }, { id: 7 }]
            }
        }
    });

    // Manually update cart total amount (productItem price + ingredients)
    // ProductItem 1 should have a price around 190-600, let's get it and calculate
    const cartWithItems = await prisma.cart.findFirst({
        where: { token: "11111" },
        include: {
            items: {
                include: {
                    productItem: true,
                    ingredients: true
                }
            }
        }
    });

    if (cartWithItems) {
        const totalAmount = cartWithItems.items.reduce((acc, item) => {
            const itemPrice = item.productItem.price;
            const ingredientsPrice = item.ingredients.reduce((sum, ing) => sum + ing.price, 0);
            return acc + (itemPrice + ingredientsPrice) * item.quantity;
        }, 0);

        await prisma.cart.update({
            where: { id: cartWithItems.id },
            data: { totalAmount }
        });
    }
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (error) {
        console.error(error);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });