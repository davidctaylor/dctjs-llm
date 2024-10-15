export const PageHelp = () => {
  return (
    <div className="flex flex-col h-full gap-y-2 overflow-y-scroll">
      <p>
        The page uses a LLM (Large Language Model) to generate Web pages and
        display content using a library of UI components.
      </p>

      <h2 className="font-medium pt-6">Create Page</h2>
      <p>
        The starting point for using this application can be to create the
        initial web page or article. As an example, the following input will use
        Generative AI to create a web page containing an image and content
        describing a number of Colorado state parks.
      </p>
      <p className="bg-slate-50 rounded-lg p-4">
        As expert on Colorado state parks, create an article of no more that 500
        words with a paragraph for each of the parks 'Mesa Verde', 'Great Sand
        Dunes' and 'Rocky Mountain National Park' with the title 'Colorful
        Colorado State parks'. Style your response using Markdown. Update the
        page with a hero imageRef /images/co-state-parks.webp
      </p>

      <h2 className="font-medium pt-6">Page Sections</h2>
      <p>
        The page comprosized of a main content and multiple section elements.
        Section also have title and content properties and act as containers for
        the following components;
      </p>
      <ul className="list-disc list-inside">
        <li>Accordion</li>
        <li>Card</li>
        <li>Carousel</li> <li>Link (Call to Action)</li>
      </ul>

      <p>
        As an example, the following input will create a section with a Carousel
        containing Card components
      </p>

      <p className="bg-slate-50 rounded-lg p-4">
        Create a section with a Carousel, the title of the Carousel shall be
        "Colorado State Parks Image gallery". Add a Card with the image url
        "/images/mesa-verde.jpg" and the href
        "https://www.nps.gov/meve/index.htm". Add a Card with the image url
        "/images/great-sand-dunes.jpg" and the href
        "https://www.nps.gov/grsa/index.htm". Add a Card with the image url
        "/images/rockies.jpg" and the href
        "https://www.rockymountainnationalpark.com/", Add a Card with the image
        url "/images/garden.jpg" and the href "https://gardenofgods.com/"
      </p>

      <p>
        As an example, the following input will create a section with a
        Accordion components and a Call To Action link
      </p>
      <p className="bg-slate-50 rounded-lg p-4">
        Create a new section with the heading "Frequently asked questions". As
        an expert on Colorado state parks generate three common questions and
        answers for visitors to state parks. Use these to create Accordions with
        the question in the accordion 'heading' and the answer in accordion
        content' Add a CTA with the label "click me!" and the href
        "http://123.com"
      </p>
    </div>
  );
};
