import { ProductForm } from "@/shared/components/shared";
import { Container } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";


export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    select: { name: true }
  });

  return product
    ? {
        title: `CRAVEMOOD | ${product.name}`,
        description: `${product.name} page`
      }
    : { title: "Product Not Found" };
}

export default async function ProductPage({ params: { id } }: { params: { id: string } }) 
{
    const product = await prisma.product.findFirst({ 
        where: { id: Number(id) },
        include: {
            ingredients: true,
            items: true,
            category: {
                include: {
                    products: {
                        include: {
                            items: true
                        }
                    }
                }
            }
        }
    });

    if (!product) {
        return notFound();
    }
    
    return (
        <Container className="flex flex-col my-10">
            <ProductForm product={product} />
        </Container>
    )
}