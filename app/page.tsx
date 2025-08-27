import { Container, Filters, Title, TopBar, ProductsGroupList } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All Pizzas" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList 
                categoryId={1}
                title="Pizza"
                items={[
                  {
                    id: 1,
                    name: "Cheeseburger",
                    imageUrl: 
                      "https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.avif",
                    price: 550,
                    items: [
                      { price: 550 },
                    ]
                  },
                  {
                    id: 2,
                    name: "Cheeseburger",
                    imageUrl: 
                      "https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.avif",
                    price: 550,
                    items: [
                      { price: 550 },
                    ]
                  },
                  {
                    id: 3,
                    name: "Cheeseburger",
                    imageUrl: 
                      "https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.avif",
                    price: 550,
                    items: [
                      { price: 550 },
                    ]
                  },
                  {
                    id: 4,
                    name: "Cheeseburger",
                    imageUrl: 
                      "https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.avif",
                    price: 550,
                    items: [
                      { price: 550 },
                    ]
                  },
                  {
                    id: 5,
                    name: "Cheeseburger",
                    imageUrl: 
                      "https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.avif",
                    price: 550,
                    items: [
                      { price: 550 },
                    ]
                  },
                  {
                    id: 6,
                    name: "Cheeseburger",
                    imageUrl: 
                      "https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.avif",
                    price: 550,
                    items: [
                      { price: 550 },
                    ]
                  },
                  {
                    id: 7,
                    name: "Cheeseburger",
                    imageUrl: 
                      "https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.avif",
                    price: 550,
                    items: [
                      { price: 550 },
                    ]
                  }
                ]}
              />
              <ProductsGroupList 
                categoryId={2}
                title="Burger"
                items={[
                  {
                    id: 1,
                    name: "Cheeseburger",
                    imageUrl: 
                      "https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.avif",
                    price: 550,
                    items: [
                      { price: 550 },
                    ]
                  },
                  {
                    id: 2,
                    name: "Cheeseburger",
                    imageUrl: 
                      "https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.avif",
                    price: 550,
                    items: [
                      { price: 550 },
                    ]
                  },
                  {
                    id: 3,
                    name: "Cheeseburger",
                    imageUrl: 
                      "https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.avif",
                    price: 550,
                    items: [
                      { price: 550 },
                    ]
                  },
                  {
                    id: 4,
                    name: "Cheeseburger",
                    imageUrl: 
                      "https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.avif",
                    price: 550,
                    items: [
                      { price: 550 },
                    ]
                  },
                  {
                    id: 5,
                    name: "Cheeseburger",
                    imageUrl: 
                      "https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.avif",
                    price: 550,
                    items: [
                      { price: 550 },
                    ]
                  },
                  {
                    id: 6,
                    name: "Cheeseburger",
                    imageUrl: 
                      "https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.avif",
                    price: 550,
                    items: [
                      { price: 550 },
                    ]
                  },
                  {
                    id: 7,
                    name: "Cheeseburger",
                    imageUrl: 
                      "https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.avif",
                    price: 550,
                    items: [
                      { price: 550 },
                    ]
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
