"use client";
import { CreateSlide} from "@/widgets/settings/createSlide";
import { SlideList } from "@/widgets/settings/slideList";
const slides = [
    {
        id: "1",
        titleKey: "slide1.title",
        textKey: "",
        image: "/images/main.png",
    },
    {
        id: "2",
        titleKey: "slide5.title",
        textKey: "",
        image: "/images/deer.jpg"
    },
    {
        id: "3",
        titleKey: "slide4.title",
        textKey: "slide4.text",
        image: "/images/house2.jpg"
    },
    {
        id: "4",
        titleKey: "slide6.title",
        textKey: "slide6.text",
        image: "/images/house3.jpg"
    },
    {
        id: "5",
        titleKey: "slide3.title",
        textKey: "slide3.text",
        image: "/images/bicycles.png",
    },
];

export default function AdminMainPage() {

    return (
        <div className="relative w-6/8 flex gap-3">
            <CreateSlide />
            <SlideList slides={slides} />
        </div>
    );
}