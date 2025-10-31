import { Container, Filters, Title, TopBar, ProductsGroupList, Stories } from "@/shared/components/shared";
import { GetSearchParams } from "@/shared/lib/find-pizzas";
import { findPizzas } from "@/shared/lib/find-pizzas";
import { Suspense } from "react";


export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
  const resolvedSearchParams = await searchParams;
  const categories = await findPizzas(resolvedSearchParams);

  return (
    <>
      <Container className="mt-12 mb-2">
        <Title text="Your Favorites, All in One Place" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={categories.filter(category => category.products.length > 0)} />

      <Stories />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-10">
              {
                categories.map(category => (
                  category.products.length > 0 && (
                    <ProductsGroupList 
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
                ))
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
