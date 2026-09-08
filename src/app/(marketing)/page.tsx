import type { Metadata } from "next";

import { Hero } from "@/shared/components/hero";
import { CtaSection, Section } from "@/shared/components/sections";
import { ContentPlaceholder } from "@/shared/components/sections/content-placeholder";
import { Container } from "@/shared/components/ui/container";
import { routes } from "@/shared/constants/routes";
import { createPageMetadata } from "@/infra/seo";

export const metadata: Metadata = createPageMetadata({
  path: routes.home,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Container>
        <Section
          title="Interior categories"
          description="Category collections will appear here from the CMS."
        >
          <ContentPlaceholder
            title="Categories"
            description="No categories have been published yet."
          />
        </Section>
        <Section
          title="Featured projects"
          description="Selected project work will appear here from the CMS."
        >
          <ContentPlaceholder
            title="Projects"
            description="No featured projects have been published yet."
          />
        </Section>
        <Section
          title="Design ideas"
          description="Editorial design ideas will appear here from the CMS."
        >
          <ContentPlaceholder
            title="Design ideas"
            description="No design ideas have been published yet."
          />
        </Section>
        <Section title="Services" description="Service offerings will appear here from the CMS.">
          <ContentPlaceholder title="Services" description="No services have been published yet." />
        </Section>
        <Section
          title="Featured products"
          description="Product selections will appear here from the catalog API."
        >
          <ContentPlaceholder
            title="Products"
            description="No featured products have been published yet."
          />
        </Section>
        <Section
          title="Testimonials"
          description="Client remarks will appear here when provided by the CMS."
        >
          <ContentPlaceholder
            title="Testimonials"
            description="No testimonials have been published yet."
          />
        </Section>
        <Section
          title="How it works"
          description="Process steps will appear here from the CMS."
        >
          <ContentPlaceholder
            title="Process"
            description="No process content has been published yet."
          />
        </Section>
      </Container>
      <CtaSection
        title="Estimate a project"
        description="The price calculator will use backend pricing rules when that service is connected."
        href={routes.calculator}
        label="Open calculator"
      />
      <CtaSection
        title="Request a quote"
        description="Quote requests will be sent to the lead service when the API is connected."
        href={routes.quote}
        label="Get a quote"
      />
      <Container>
        <Section title="Journal" description="Articles will appear here from the CMS.">
          <ContentPlaceholder title="Journal" description="No articles have been published yet." />
        </Section>
      </Container>
    </>
  );
}
