// prisma/seed.ts
import "dotenv/config";
import { Prisma } from "@prisma/client";
import { prisma } from "./prisma-client";
import { categories, ingredients, products } from "./constants";
import bcrypt from "bcrypt";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  let basePrice = 190;
  if (size === 20) basePrice = 190;
  if (size === 30) basePrice = 290;
  if (size === 40) basePrice = 390;

  return {
    productId,
    price: basePrice + randomDecimalNumber(0, 100),
    pizzaType,
    size,
  } satisfies Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  // USERS
  await prisma.user.createMany({
    data: [
      {
        fullName: "Frank Anderson",
        email: "frankanderson@example.com",
        password: bcrypt.hashSync("123456", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Admin",
        email: "admin@example.com",
        password: bcrypt.hashSync("admin123", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  // CATEGORIES
  await prisma.category.createMany({ data: categories });

  // INGREDIENTS
  await prisma.ingredient.createMany({ data: ingredients });

  // PRODUCTS
  await prisma.product.createMany({ data: products });

  // PIZZA PRODUCTS WITH RELATIONS
  const pizza1 = await prisma.product.create({
    data: {
      name: "Pepperoni pizza",
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/0198bf57bc517218ab93c762f4b0193e.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5).map((i) => ({ id: i.id })),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Cheese pizza",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/0198bf40eb1171aabe90b1b3ce07c0c5.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10).map((i) => ({ id: i.id })),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Chorizo fresh",
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/0198bf4f806371f19d529f9e9e7dba36.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40).map((i) => ({ id: i.id })),
      },
    },
  });

  // PRODUCT ITEMS
  await prisma.productItem.createMany({
    data: [
      // Pizza 1
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // Pizza 2
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // Pizza 3
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),
    ],
  });

  // CARTS
  await prisma.cart.createMany({
    data: [
      { userId: 1, totalAmount: 0, token: "11111" },
      { userId: 2, totalAmount: 0, token: "22222" },
    ],
  });

  // CART ITEMS
  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }] },
    },
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 3,
      cartId: 1,
      quantity: 1,
      ingredients: { connect: [{ id: 4 }, { id: 5 }] },
    },
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 5,
      cartId: 1,
      quantity: 3,
      ingredients: { connect: [{ id: 1 }, { id: 6 }, { id: 7 }] },
    },
  });

  // STORIES
  await prisma.story.createMany({ 
        data: [ 
            { previewImageUrl: 'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496' }, 
            { previewImageUrl: 'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640' }, 
            { previewImageUrl: 'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020' }, 
            { previewImageUrl: 'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958' }, 
            { previewImageUrl: 'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737' }, 
            { previewImageUrl: 'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284' }
        ]
    });

  // STORY ITEMS
  await prisma.storyItem.createMany({ 
    data: [ 
        { storyId: 1, sourceUrl: 'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 1, sourceUrl: 'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 1, sourceUrl: 'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 1, sourceUrl: 'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 1, sourceUrl: 'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 2, sourceUrl: 'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 2, sourceUrl: 'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 2, sourceUrl: 'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 2, sourceUrl: 'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 2, sourceUrl: 'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 3, sourceUrl: 'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 3, sourceUrl: 'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 3, sourceUrl: 'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 3, sourceUrl: 'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 3, sourceUrl: 'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 4, sourceUrl: 'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 4, sourceUrl: 'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 4, sourceUrl: 'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 4, sourceUrl: 'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 4, sourceUrl: 'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 5, sourceUrl: 'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 5, sourceUrl: 'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 5, sourceUrl: 'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 5, sourceUrl: 'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 5, sourceUrl: 'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 6, sourceUrl: 'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 6, sourceUrl: 'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 6, sourceUrl: 'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 6, sourceUrl: 'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE' }, 
        { storyId: 6, sourceUrl: 'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE' }
      ] 
    });

  // RECALCULATE CART TOTAL
  const cart = await prisma.cart.findFirst({
    where: { id: 1 },
    include: {
      items: {
        include: { productItem: true, ingredients: true },
      },
    },
  });

  if (cart) {
    const total = cart.items.reduce((acc, item) => {
      const itemPrice = item.productItem.price;
      const ingPrice = item.ingredients.reduce((s, ing) => s + ing.price, 0);
      return acc + (itemPrice + ingPrice) * item.quantity;
    }, 0);

    await prisma.cart.update({
      where: { id: cart.id },
      data: { totalAmount: total },
    });
  }
}

async function main() {
  await up();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
