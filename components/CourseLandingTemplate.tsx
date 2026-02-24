import type { CourseAIContent } from "./course-template/types";
import HeroSection           from "./course-template/HeroSection";
import TransformationSection from "./course-template/TransformationSection";
import ModulesSection        from "./course-template/ModulesSection";
import BonusSection          from "./course-template/BonusSection";
import TestimonialsSection   from "./course-template/TestimonialsSection";
import PricingSection        from "./course-template/PricingSection";
import FAQSection            from "./course-template/FAQSection";
import FinalCTASection       from "./course-template/FinalCTASection";

export type { CourseAIContent };

export default function CourseLandingTemplate({ data }: { data: CourseAIContent }) {
  return (
    <div className="antialiased">
      <HeroSection           data={data} />
      <TransformationSection data={data} />
      <ModulesSection        data={data} />
      {data.bonus_section.description?.trim() && <BonusSection data={data} />}
      <TestimonialsSection   data={data} />
      <PricingSection        data={data} />
      <FAQSection            data={data} />
      <FinalCTASection       data={data} />
    </div>
  );
}
