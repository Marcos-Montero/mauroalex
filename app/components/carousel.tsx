"use client";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { BlogEntry } from "@prisma/client";

export const CarouselBlogEntries = ({
  blogEntries,
}: {
  blogEntries: BlogEntry[];
}) => {
  return (
    <Carousel
      className="w-full max-w-xl flex items-center cursor-pointer"
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        {blogEntries.map((blog, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="border-none">
                <Link href={"blog/" + blog.id}>
                  <CardContent className="flex aspect-square items-center justify-center p-6 bg-black text-white outline-none border-none">
                    <span className="text-4xl font-semibold">{blog.title}</span>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};