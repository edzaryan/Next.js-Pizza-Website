"use client"
import { Api } from "@/shared/services/api-client";
import { IStory } from "@/shared/services/story";
import { useState, useEffect } from "react";
import ReactStories from "react-insta-stories";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import { Container } from ".";

interface Props {
    className?: string;
}

export const Stories = ({ className }: Props) => {
    const [stories, setStories] = useState<IStory[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedStory, setSelectedStory] = useState<IStory | undefined>(undefined);

    useEffect(() => {
        async function fetchStories() {
            const data = await Api.stories.getAll();
            setStories(data);
        }
        fetchStories();
    }, []);

    const onClickStory = (story: IStory, index: number) => {
        if (story?.items?.length > 0) {
            setSelectedStory(story);
            setOpen(true);
        } else {
            console.warn("No items for this story");
        }
    }

    return (
        <>
            <Container className={cn("flex items-center justify-between gap-2 my-10", className)}>
                {stories.length === 0 &&
                    Array(6).fill(0).map((_, i) =>
                        <div key={i} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />
                    )}

                {stories.map((story, index) => (
                    <div
                        key={story.id}
                        onClick={() => onClickStory(story, index)} // Pass index here if needed for tracking
                        className="relative rounded-xl cursor-pointer overflow-hidden group"
                    >
                        <Image
                            src={story.previewImageUrl}
                            alt="Preview image of story"
                            width={200}
                            height={250}
                            className="rounded-xl w-full transition-transform group-hover:scale-101"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                    </div>
                ))}

                {open && (
                    <div className="fixed left-0 top-0 bottom-0 right-0 bg-black/80 flex items-center justify-center z-30" onClick={() => setOpen(false)}>
                        <div 
                            className="relative rounded-[10px] overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute right-3 top-6 z-[1000] grid place-items-center w-8 h-8
                                            rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-100
                                            transition-all duration-200 ease-in-out cursor-pointer"
                            >
                                <X className="w-5 h-5 text-gray-600 hover:text-gray-800 transition-colors" />
                            </button>

                            <ReactStories
                                onAllStoriesEnd={() => setOpen(false)}
                                stories={selectedStory?.items.map(story => ({ url: story.sourceUrl })) || []}
                                defaultInterval={3000}
                                width={520}
                                height={800}
                                keyboardNavigation
                            />
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
};